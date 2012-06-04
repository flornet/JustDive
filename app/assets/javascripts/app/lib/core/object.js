JustDive.Object = Ember.Object.extend({
	getObjectSize: function(object) {
		var size = 0, key;
		for (key in object) {
			if (object.hasOwnProperty(key)) size++;
		}
		return size;
	}
});