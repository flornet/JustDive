JustDive.LayoutState = Ember.LayoutState.extend({
	enter: function(stateManager, transition) {
		this._super(stateManager, transition);
		var leftPanel = this.get('leftPanel');
		if (leftPanel !== undefined) {
			this.get('view').set('leftPanel', this.get('leftPanel').create());
		}
	},
});