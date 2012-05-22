JustDive.Storage = JustDive.CoreObject.extend({
  localStoreId: null,
  localStore: null,
  data: null,
  
  // Generate four random hex digits.
  S4: function () {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  },

  // Generate a pseudo-GUID by concatenating random hexadecimal.
  guid: function () {
     return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  },

  init: function() {
    this._super();
	// Inits Local Storage (client side)
	if (this.localStoreId !== null) {
		this.localStore = localStorage.getItem(this.localStoreId);
	}
	this.data = (this.localStore && JSON.parse(this.localStore)) || {};
  },
  
  // Save the current state of the **Store** to *localStorage*.
  proxySave: function() {
      localStorage.setItem(this.localStoreId, JSON.stringify(this.data));
  },

    // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
    // have an id of it's own.
  proxyCreate: function (model) {
      if (!model.get('id')) model.set('id', this.guid());
      return this.update(model);
  },

    // Update a model by replacing its copy in `this.data`.
  proxyUpdate: function(model) {
      this.data[model.get('id')] = model.getProperties('id', 'firstname', 'lastname');
      this.save();
      return model;
  },

    // Retrieve a model from `this.data` by id.
  proxyFind: function(model) {
      return JustDive.Diver.create(this.data[model.get('id')]);
  },

    // Return the array of all models currently in storage.
  proxyFindAll: function() {
      var result = [];
      for (var key in this.data)
      {
        var diver = JustDive.Diver.create(this.data[key]);
        result.push(diver);
      }

      return result;
    },

    // Delete a model from `this.data`, returning it.
  proxyRemove: function(model) {
      delete this.data[model.get('id')];
      this.save();
      return model;
  }
});