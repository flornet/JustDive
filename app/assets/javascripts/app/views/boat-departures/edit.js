#= require ../boat-departures.js

JustDive.Views.BoatDepartures.Edit = JustDive.CrudFormView.extend({
	templateName: 			'app/templates/boat-departures/edit',
	classNames:   			[''],
	_boatDepartureData:		{
								boat_id: null,
								departure_date:	null
							},
							
	getCrudController: 		function() {
								return JustDive.Controllers.Routed.BoatDeparture;
						    },
							
	toggleFullView:			function () {
								this.get('parentView').toggleFullView();
							},
							
	didInsertElement:		function () {
								var that = this;
								that._super();
								$(that.get('element')).find('.dropdown-menu select, .dropdown-menu input').click(function (e) {
									e.stopPropagation();
							    });								
							},
							
	toggleEditMode:			function (event) {
								if (event) event.preventDefault();
								if (this.get('isEditing') !== true) {
									this._toggleShow();
								} else {
									this._toggleHide();
								}
							},
							
	_toggleShow:			function() {
								var _boatDepartureData = {
															boat_id: this.get('boatDeparture').get('boat_id'),
															departure_date: this.get('boatDeparture').get('departure_date')
														};
								this.set('_boatDepartureData', _boatDepartureData);
								this._addListener();
								this.setEditing();
							},
							
	_toggleHide:			function(revert) {
								if (revert !== false) {
									this._revert();
								}
								this._removeListener();
								this.setShowing();
							},
	
	_addListener:			function () {
								var that = this;
								// Creating custom listener
								$('html').on('click.dropdown.custom-toggle touchstart.dropdown.custom-toggle', function(e) {
									if ($(e.target).attr('type') === 'submit') {
										that._toggleHide(false);
									} else {
										that._toggleHide();
									}
								});
							},	
							
	_removeListener:		function () {
								// Removing custom listener
								$('html').off('click.dropdown.custom-toggle touchstart.dropdown.custom-toggle');
							},
							
	_revert:				function() {
								// Reverting BoatDeparture with the backup data
								var boatDeparture = this.get('boatDeparture');
								if (boatDeparture === null) { // Dirty fix for lost listeners @TODO: FIX
									this._removeListener();
								} else {
									boatDeparture.set('boat_id', this.get('_boatDepartureData').boat_id);
									boatDeparture.set('departure_date', this.get('_boatDepartureData').departure_date);
									this.set('boatDeparture', boatDeparture);
								}
							}
							  
});