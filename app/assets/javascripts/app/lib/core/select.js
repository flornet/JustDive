JustDive.Select = Ember.Select.extend({
	valueDidChange: Ember.observer(function() {
		var content = this.get('content'),
			value = this.get('value'),
			valuePath = this.get('optionValuePath').replace(/^content\.?/, ''),
			selectedValue = (valuePath ? this.getPath('selection.' + valuePath) : this.get('selection')),
			selection;

		if (value !== selectedValue) {
		  selection = content.find(function(obj) {
			return value === (valuePath ? obj.get(valuePath) : obj);
		  });
		  if ((selection === undefined) && (value !== undefined)) {
			selection = content.find(function(obj) {
				return value.toString() === (valuePath ? obj.get(valuePath) : obj);
			});
		  }

		  this.set('selection', selection);
		}
	  }, 'value')
});