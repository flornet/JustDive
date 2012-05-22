JustDive.resourceAdapters.local = JustDive.CoreObject.create({
  localStoreId: null,
  localStore: null,
  data: null,
  
  request: function(params) {
	switch(params.type) {
		case "GET":
					return this._get(params);
		case "POST":
					return this._post(params);
		case "PUT":
					return this._put(params);
		case "DELETE":
					return this._delete(params);
		default:
				return {
				  fail: function(f) { f(error); return this; },
				  done: function() { return this; },
				  always: function(f) { f(); return this; }
				};
	}
  },
  
  _get: function(params) {
	var url_parts = params.url.split('/'),
		store, data,
		json = null;
	if (url_parts[0] == "") {
		url_parts.splice(0, 1);
	}
	store_id = url_parts[0];
	store = localStorage.getItem(store_id)
	data = (store && JSON.parse(store)) || {};
	
	if (url_parts[1] === undefined) {
	// fetch all
		json = [];
		for (entry in data){
			json.push(data[entry]);
		}
	} else {
	// fetch a specific entry
	//...
	}

	return {
          fail: function(f) { 
			f(error); 
			return this; 
		  },
          done: function(f) { 
			f(json); 
			return this; 
		  },
          always: function(f) { 
			f(); 
			return this; 
		  }
        };
  },
  
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