JustDive.ResourceController = JustDive.AbstractResourceController.extend({

	init: function() {
		this._super();
		this._resourceRequest = this.resourceType.resourceAdapter._resourceRequest;
	}
});