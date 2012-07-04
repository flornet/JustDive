JustDive.Typeahead = Ember.View.extend(Ember.TextSupport,
  /** @scope JustDive.DateField.prototype */ {

  classNames: ['ember-typeahead-field span3 typeahead'],
  tagName: "input",
  attributeBindings: ['type', 'value', 'readonly', 'size'],

  /**
    The value attribute of the input element. As the user inputs text, this
    property is updated live.

    @type String
    @default ""
  */
  value: "",

  /**
    The type attribute of the input element.

    @type String
    @default "text"
  */
  type: "text",

  didInsertElement: function() {
	var self		= this,
		dataSource 	= self.get('content'),
		loc 		= dataSource.get('length') || 0,
		source 		= new Array();
	
	while(--loc >= 0) {
		var curObject = dataSource.objectAt(loc);
		source.push({
			id: 		curObject.get('id'),
			fullname: 	curObject.get('fullname') + ' (' + curObject.get('email') + ')'
		});
	}
	
	$(self.get('element')).typeahead({
		source: 		source,
        display: 		'fullname',
        val: 			'id',
		itemSelected: 	function(item, val, text) {
			self.itemSelected(item, val, text);
			self.set('value', '');
			$(self.get('element')).focus();
		}
	});
  },
  
  itemSelected: function(item, val, text) {
	var destination = "#testCaseDestination";
	$(destination).append(item);
  }
});

