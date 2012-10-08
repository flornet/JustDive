JustDive.TimeField = Ember.View.extend(Ember.TextSupport,
  /** @scope JustDive.TimeField.prototype */ {

  classNames: ['ember-time-field timepicker-default'],
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
	$(this.get('element')).timepicker({
										showMeridian: false,
										disableFocus: true
									});
  }
});