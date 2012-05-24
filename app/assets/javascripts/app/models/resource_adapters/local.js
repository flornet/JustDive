JustDive.resourceAdapters.local = JustDive.CoreObject.create({
  store_id: null,
  data: null,
  allowed_requests: ["GET", "POST", "PUT", "DELETE"],
  
  request: function(params) {
	if (params.type !== undefined) {
		params.type = params.type.toUpperCase();
	}
	if (this.allowed_requests.indexOf(params.type) < 0) {
		return this._fail('Request "' + params.type + '" is not allowed.');
	}
	if (params.url.split('/').length == 0) {
		return this._fail('Empty URL is not allowed.');
	}
	if (params.dataType !== "json") {
		return this._fail('DataType "' + params.dataType + '" is not recognized.');
	}
	this._init(params);
	switch(params.type) {
		case "GET":
					return this._get(params);
		case "POST":
					return this._post(params);
		case "PUT":
					return this._put(params);
		case "DELETE":
					return this._delete(params);
	}
  },
  
  _init: function(params) {
	var url_parts = params.url.split('/'),
		serialized_data;
	if (url_parts[0] == "") {
		url_parts.splice(0, 1);
	}
	this.store_id = url_parts[0];
	serialized_data = localStorage.getItem(this.store_id)
	this.data = (serialized_data && JSON.parse(serialized_data)) || {};
  },
/**
@private

Processes a GET request

* `params` -- the array of request parameters

REQUIRED: `params.url` and `data`
*/ 
  _get: function(params) {
	var url_parts = params.url.split('/'),
		json = null;
	if (url_parts[0] == "") {
		url_parts.splice(0, 1);
	}
	
	if (url_parts[1] === undefined) {
	// fetch all
		json = [];
		for (entry in this.data){
			json.push(this.data[entry]);
		}
	} else {
		if (url_parts[2] === undefined){
			// fetch a specific entry
			if (!this.data || (this.data && !this.data[url_parts[1]])) {
				return this._fail('Entry "' + url_parts[1] + '" was not found.', 404);
			}
			json = this.data[url_parts[1]];
		} else {
			// too many parameters
			return this._fail('Request "' + params.url + '" was not understood.');
		}
	}
	return this._done(json);
  },

/**
@private

Processes a POST request

* `params` -- the array of request parameters

REQUIRED: `params.url` and `params.data`
*/ 
  _post: function(params) {
	var url_parts = params.url.split('/'),
		json = null, object_type, object;
	if (url_parts[0] == "") {
		url_parts.splice(0, 1);
	}
	
	if (params.data === undefined) {
		//error (missing Data)
		return this._fail('Data is missing');
	}

	if (url_parts[1] === undefined) {
		json = {};
		object_type = this.store_id.substring(0, this.store_id.length - 1); // Singularization (ie. divers => diver)
		if (params.data[object_type] === undefined) {
			return this._fail('Failed to create entry', 400);
		}
		
		object = params.data[object_type];
		object.id = this._guid();
		this.data[object.id] = object;
		if(!this._saveData()) {
			return this._fail('Failed to delete entry "' + url_parts[1] + '"', 500);
		} else {
			json = object;
		}
	} else {
		// too many parameters
		return this._fail('Request "' + params.url + '" was not understood.');
	}
	return this._done(json);
  },

/**
@private

Processes a PUT request

* `params` -- the array of request parameters

REQUIRED: `params.url` and `params.data`
*/ 
  _put: function(params) {
	var url_parts = params.url.split('/'),
		json = null;
	if (url_parts[0] == "") {
		url_parts.splice(0, 1);
	}
	
	console.log(params);
	return this._fail('Debug.');
	
	if (url_parts[1] === undefined) {
		//error (missing ID)
		return this._fail('Request "' + params.url + '" was not understood.');
	} else {
		if (url_parts[2] === undefined){
			json = {};
			// fetch a specific entry
			if (!this.data || (this.data && !this.data[url_parts[1]])) {
				return this._fail('Entry "' + url_parts[1] + '" was not found.', 404);
			}
			delete this.data[url_parts[1]];
			if(!this._saveData()) { // Updates the data stored in "localStore"
				return this._fail('Failed to delete entry "' + url_parts[1] + '"', 500);
			}
		} else {
			// too many parameters
			return this._fail('Request "' + params.url + '" was not understood.');
		}
	}
	return this._done(json);
  },
  
/**
@private

Processes a DELETE request

* `params` -- the array of request parameters

REQUIRED: `params.url`
*/ 
  _delete: function(params) {
	var url_parts = params.url.split('/'),
		json = null;
	if (url_parts[0] == "") {
		url_parts.splice(0, 1);
	}
	
	if (url_parts[1] === undefined) {
		//error (missing ID)
		return this._fail('Request "' + params.url + '" was not understood.');
	} else {
		if (url_parts[2] === undefined){
			json = {};
			// fetch a specific entry
			if (!this.data || (this.data && !this.data[url_parts[1]])) {
				return this._fail('Entry "' + url_parts[1] + '" was not found.', 404);
			}
			delete this.data[url_parts[1]];
			if(!this._saveData()) { // Updates the data stored in "localStore"
				return this._fail('Failed to delete entry "' + url_parts[1] + '"', 500);
			}
		} else {
			// too many parameters
			return this._fail('Request "' + params.url + '" was not understood.');
		}
	}
	return this._done(json);
  }, 
    
  _saveData: function() {
	if (this.data && this.store_id) {
		var serialize_data = JSON.stringify(this.data);
		localStorage.setItem(this.store_id, serialize_data);
		return true;
	} else {
		return false;
	}
  },
  
  _fail: function(statusText, status) {
	return {
          fail: function(f) { f({status: status || 400, statusText: statusText}); return this; },
          done: function(f) { return this; },
          always: function(f) { f(); return this; }
        };
  },
  
  _done: function(json) {
	return {
          fail: function(f) { return this; },
          done: function(f) { f(json); return this; },
          always: function(f) { f(); return this; }
        };
  },
  
  // Generate four random hex digits.
  _S4: function () {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  },

  // Generate a pseudo-GUID by concatenating random hexadecimal.
  _guid: function () {
     return (this._S4()+this._S4()+"-"+this._S4()+"-"+this._S4()+"-"+this._S4()+"-"+this._S4()+this._S4()+this._S4());
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
  }
});