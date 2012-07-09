JustDive.Typeahead = Ember.View.extend(Ember.TextSupport,
  /** @scope JustDive.DateField.prototype */ {

  classNames: ['ember-typeahead-field span3 typeahead'],
  tagName: "input",
  attributeBindings: ['type', 'value', 'readonly', 'size', 'action', 'target'],
  
  /**
    When "itemSelected" gets trigged, we'll try to find the "parentView" and avoid "Ember._HandlebarsBoundView".
	This is the max _parenView depth to look for.

    @type Integer
    @default 5
  */
  _maxDepth: 5,
  
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
		target 		= window[keys.shift()],
		targetView 	= self._parentView;
	for (var i = 0, l = keys.length; i < l; i++) {
		target = target[keys[i]];
		// exit early if `null` or `undefined`
		if (target == null)
			break;
	}
	for (var i = 0, l = self._maxDepth; i < l; i++) {
		if (targetView.constructor.toString() === 'Ember._HandlebarsBoundView') {
			targetView = targetView._parentView;
		} else {
			// found
			break;
		}
	}

	dataSource.forEach(function (item) {
		source.push(item.formatForTypeahead());
	});

	jqEl.typeahead({
		source: 		source,
        item: 			'<li><a href="#"><span class="pull-right level"></span><span class="fullname"></span></a></li>',
		display: 		'fullname',
		extraDisplay:	'level',
        val: 			'id',
		itemSelected: 	function(item, val, text) {
							if ((action !== null) && (action !== undefined) && (target !== null) && (target !== undefined)) {
								target[action](item, val, text, targetView);
								self.set('value', '');
								jqEl.focus();
							}
						},
		render: 		function (items) {
							var that = this;

							items = $(items).map(function (i, item) {
								i = $(that.options.item).attr('data-value', item[that.options.val]);
								i.find('a .' + that.options.display).html(that.highlighter(item[that.options.display]));
								i.find('a .' + that.options.extraDisplay).html(item[that.options.extraDisplay]);
								return i[0];
							});

							items.first().addClass('active');
							this.$menu.html(items);
							return this;
						}
	});
  }
});

