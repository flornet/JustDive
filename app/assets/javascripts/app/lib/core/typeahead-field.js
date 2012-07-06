JustDive.Typeahead = Ember.View.extend(Ember.TextSupport,
  /** @scope JustDive.DateField.prototype */ {

  classNames: ['ember-typeahead-field span3 typeahead'],
  tagName: "input",
  attributeBindings: ['type', 'value', 'readonly', 'size', 'action', 'target'],

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
		action 		= self.get('action'),
		keys 		= self.get('target').split('.'),
		jqEl 		= $(self.get('element')),
		source 		= new Array(),
		target 		= window[keys.shift()];
	for (var i = 0, l = keys.length; i < l; i++) {
		target = target[keys[i]];

		// exit early if `null` or `undefined`
		if (target == null)
			break;
	}

	dataSource.forEach(function (item) {
		source.push({
			id: 		item.get('id'),
			fullname: 	item.get('fullname') + ' (' + item.get('email') + ')'
		});
	});

	jqEl.typeahead({
		source: 		source,
        display: 		'fullname',
        val: 			'id',
		itemSelected: 	function(item, val, text) {
			if ((action !== null) && (action !== undefined) && (target !== null) && (target !== undefined)) {
				target[action](item, val, text, self._parentView._parentView);
				self.set('value', '');
				jqEl.focus();
			}
		}
	});
  }
});

