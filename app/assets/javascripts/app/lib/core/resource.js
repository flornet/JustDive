JustDive.Resource = JustDive.AbstractResource.extend({
	resourceAdapter: Ember.required(),
	
	init: function() {
		this._super();
		this._resourceRequest = this.resourceAdapter._resourceRequest;
	}
});