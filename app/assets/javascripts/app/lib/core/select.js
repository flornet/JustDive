JustDive.Select = Ember.Select.extend({
	value: Ember.computed(function(key, value){
	   var content = this.get('content'),
			 self = this,
			 optionValuePath = this.get('optionValuePath');

	   if (value != undefined){
			content.forEach(function(item, idx){
			   if (item.id && item.id == value)
			   {
					self.set('selection', item);
					return;
			   }
			});

			return value;
	   }

		return this.get('selection')?
			this.get('selection').id :
			null;
	}).property('selection').cacheable()
});