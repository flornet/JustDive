/**
An adapter for performing resource requests

The default implementation is a thin wrapper around jQuery.ajax(). It is mixed in to both Ember.Resource
and Ember.ResourceController.

To override Ember.ResourceAdapter entirely, define your own version and include it before this module.

To override a portion of this adapter, reopen it directly or reopen a particular Ember.Resource or
Ember.ResourceController. You can override `_resourceRequest()` entirely, or just provide an implementation of
`_prepareResourceRequest(params)` to adjust request params before `jQuery.ajax(params)`.
*/
if (Ember.SyncedResourceAdapter === undefined) {
  Ember.SyncedResourceAdapter = Ember.Mixin.create({
    /**
@private

Performs an XHR request with `jQuery.ajax()`. Calls `_prepareResourceRequest(params)` if defined.
*/
    _resourceRequest: function(params) {
      params.url = this._resourceUrl();
      params.dataType = 'json';

      if (this._prepareResourceRequest !== undefined) {
        this._prepareResourceRequest(params);
      }

      return jQuery.ajax(params);
    }
  });
}

/**
A model class for RESTful resources

Extend this class and define the following properties:

* `resourceIdField` -- the id field for this resource ('id' by default)
* `resourceUrl` -- the base url of the resource (e.g. '/contacts');
will append '/' + id for individual resources (required)
* `resourceName` -- the name used to contain the serialized data in this
object's JSON representation (required only for serialization)
* `resourceProperties` -- an array of property names to be returned in this
object's JSON representation (required only for serialization)

Because `resourceName` and `resourceProperties` are only used for
serialization, they aren't required for read-only resources.

You may also wish to override / define the following methods:

* `serialize()`
* `serializeProperty(prop)`
* `deserialize(json)`
* `deserializeProperty(prop, value)`
* `validate()`
*/
Ember.SyncedResource = Ember.Object.extend(Ember.SyncedResourceAdapter, Ember.Copyable, {
  resourceIdField: 'id',
  resourceUrl: Ember.required(),
  resourceLocalStorageId: Ember.required(),

  /**
Duplicate properties from another resource

* `source` -- an Ember.Resource object
* `props` -- the array of properties to be duplicated;
defaults to `resourceProperties`
*/
  duplicateProperties: function(source, props) {
    var prop;

    if (props === undefined) props = this.resourceProperties;

    for(var i = 0; i < props.length; i++) {
      prop = props[i];
      this.set(prop, source.get(prop));
    }
  },

  /**
Create a copy of this resource

Needed to implement Ember.Copyable

REQUIRED: `resourceProperties`
*/
  copy: function(deep) {
    var c = this.constructor.create();
    c.duplicateProperties(this);
    c.set(this.resourceIdField, this.get(this.resourceIdField));
    return c;
  },

  /**
Generate this resource's JSON representation

Override this or `serializeProperty` to provide custom serialization

REQUIRED: `resourceProperties` and `resourceName` (see note above)
*/
  serialize: function() {
    var name = this.resourceName,
        props = this.resourceProperties,
        prop,
        ret = {};

    ret[name] = {};
    for(var i = 0; i < props.length; i++) {
      prop = props[i];
      ret[name][prop] = this.serializeProperty(prop);
    }
    return ret;
  },

  /**
Generate an individual property's JSON representation

Override to provide custom serialization
*/
  serializeProperty: function(prop) {
    return this.get(prop);
  },

  /**
Set this resource's properties from JSON

Override this or `deserializeProperty` to provide custom deserialization
*/
  deserialize: function(json) {
    Ember.beginPropertyChanges(this);
    for(var prop in json) {
      if (json.hasOwnProperty(prop)) this.deserializeProperty(prop, json[prop]);
    }
    Ember.endPropertyChanges(this);
    return this;
  },

  /**
Set an individual property from its value in JSON

Override to provide custom serialization
*/
  deserializeProperty: function(prop, value) {
    this.set(prop, value);
  },

  /**
Request resource and deserialize

REQUIRED: `id`
*/
  findResource: function() {
    var self = this;

    return this._resourceRequest({type: 'GET'})
      .done(function(json) {
        self.deserialize(json);
      });
  },

  /**
Create (if new) or update (if existing) record

Will call validate() if defined for this record

If successful, updates this record's id and other properties
by calling `deserialize()` with the data returned.

REQUIRED: `properties` and `name` (see note above)
*/
  saveResource: function() {
    var self = this;

    if (this.validate !== undefined) {
      var error = this.validate();
      if (error) {
        return {
          fail: function(f) { f(error); return this; },
          done: function() { return this; },
          always: function(f) { f(); return this; }
        };
      }
    }

    return this._resourceRequest({type: this.isNew() ? 'POST' : 'PUT',
                                  data: this.serialize()})
      .done(function(json) {
        // Update properties
        if (json) self.deserialize(json);
      });
  },

  /**
Delete resource
*/
  destroyResource: function() {
    return this._resourceRequest({type: 'DELETE'});
  },

  /**
Is this a new resource?
*/
  isNew: function() {
    return (this._resourceId() === undefined);
  },

  /**
@private

The URL for this resource, based on `resourceUrl` and `_resourceId()` (which will be
undefined for new resources).
*/
  _resourceUrl: function() {
    var url = this.resourceUrl,
        id = this._resourceId();

    if (id !== undefined)
      url += '/' + id;

    return url;
  },

  /**
@private

The id for this resource.
*/
  _resourceId: function() {
    return this.get(this.resourceIdField);
  }
});