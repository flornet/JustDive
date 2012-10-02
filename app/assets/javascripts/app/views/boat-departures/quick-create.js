#= require ../boat-departures.js

JustDive.Views.BoatDepartures.QuickCreate = JustDive.View.extend({
  templateName:    			'app/templates/boat-departures/quick-create',
  classNames:   			[''],
  init:						function() {
								this._super();
								this.createEmptyBoatDeparture();
							},
							
  didInsertElement:			function () {
								this._super();
								$(this.get('element')).find('select, input').click(function (e) {
									e.stopPropagation();
							    });
							},
							
  createEmptyBoatDeparture: function () {
								var boatDeparture = JustDive.Models.BoatDeparture.create({dive_event_id: this.get('diveEvent').get('id')});
								boatDeparture.set('departureDate',this.get('day').get('id'));
								this.set('boatDeparture', boatDeparture);
							},
							
  submit:					function (event) {
								if (event) event.preventDefault();
								JustDive.Controllers.Routed.BoatDeparture.create(this.get('boatDeparture'), this.get('diveEvent'));
								this.createEmptyBoatDeparture();
							}
});