JustDive.LayoutState = Ember.LayoutState.extend({
	enter: function(stateManager, transition) {
		this._super(stateManager, transition);
		var leftPanel 	= this.get('leftPanel'),
			leftNav 	= this.get('leftNav');
		if (leftPanel !== undefined) {
			this.get('view').set('leftPanel', this.get('leftPanel').create());
		}
		if (leftNav !== undefined) {
			this.get('view').set('leftNav', this.get('leftNav').create());
		}
	}
});