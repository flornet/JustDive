#= require ../boat-departures.js

JustDive.Views.BoatDepartures.List = JustDive.View.extend({
  templateName:    			'app/templates/boat-departures/list',
  classNames:   			['boat-departures-list swipe'],
  
  didInsertElement:			function() {
								this._super();
								//this._swipe();
							}
});