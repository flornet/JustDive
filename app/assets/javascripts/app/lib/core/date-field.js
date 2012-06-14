JustDive.DateField = Ember.View.extend(Ember.TextSupport,
  /** @scope JustDive.DateField.prototype */ {

  classNames: ['ember-date-field span2 datepicker'],
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
  
  /**
    The size attribute of the input element.

    @type String
    @default "16"
  */
  size: "16",

  didInsertElement: function() {
	$(this.get('element')).datepicker({
										format: 	"yyyy-mm-dd",
										weekStart: 	1
									});
  }
});