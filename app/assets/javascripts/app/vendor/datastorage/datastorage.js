var dataStorage = (function(cache, async) {
	var _ds = {
		data: {},
		dataQueue: [],
		cache: cache || false, //Time in seconds, ie 1 hour = 3600
		async: async || true, //true,
		init: function(){
			if(_ds.async){
				setInterval(function() {
					var first = _ds.dataQueue.shift();
					if (first && first.key && first.value) {
						_ds._save(first.key, first.value);
					}
				}, 15); //200 @TODO: tweak and display progress bar
			}
		},
		_save: function(key, value){
			localStorage[key] = JSON.stringify(value);
		},
		getData: function(key) {
			if (_ds.data[key] !== undefined) {
				return _ds.data[key];
			}
			else if (localStorage && localStorage[key] !== undefined) {
				var obj = JSON.parse(localStorage[key]);
				_ds.data[key] = obj;
				return obj;
			}
			return undefined;
		},
		putData: function(key, value) {
			
			if(_ds.cache){
				value.timestamp = Math.round(new Date().getTime() / 1000.0) + _ds.cache;
			}

			if(_ds.async){
				_ds.dataQueue.push({
					key: key,
					value: value
				});
			}
			else {
				_ds._save(key,value);
			}

			_ds.data[key] = value;
		},
		removeData: function(key) {
			delete _ds.data[key];
			delete localStorage[key];
		}
	};

	_ds.init();

	return {
		getData: _ds.getData,
		putData: _ds.putData,
		removeData: _ds.removeData
	};

})(false);