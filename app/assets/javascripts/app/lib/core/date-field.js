JustDive.DateField = Ember.View.extend(Ember.TextSupport,
  /** @scope JustDive.DateField.prototype */ {

  classNames: ['ember-date-field span4 datepicker no-focus'],
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
										language: 	"fr",
										format: 	"yyyy-mm-dd",
										weekStart: 	1
									});
  }
});