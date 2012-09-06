#= require ../boat-departures.js

JustDive.Views.BoatDepartures.Detail = JustDive.CrudFormView.extend({
	templateName: 			'app/templates/boat-departures/detail',
	classNames:   			['boat-departure-details'],
	_draggables:			null,	//jQuery objects array
	_droppables:			null,	//jQuery objects array
	_created:				false,
	getCrudController: 		function() {
								return JustDive.Controllers.Routed.BoatDeparture;
						    },
  
	didInsertElement: 		function() {
								this._super();
								this._enableDragAndDrop();
							},
							
	toggleFullView:			function () {
								$(this.get('element')).toggleClass('full-view');
							},
							
	_enableDragAndDrop:		function() {
								var boatDeparture = this.boatDeparture,
									that = this;
								// First run
								that._createDragAndDrop();
								
								// Before change observer
								boatDeparture.addBeforeObserver('availableParticipants', function() {
									that._destroyDragAndDrop();
								});
								boatDeparture.addBeforeObserver('diveGroups', function() {
									that._destroyDragAndDrop();
								});
								
								// After change observer
								boatDeparture.addObserver('availableParticipants', function() {
									that._createDragAndDrop();
								});
								boatDeparture.addObserver('diveGroups', function() {
									that._createDragAndDrop();
								});
							},
							
	_destroyDragAndDrop:	function() {
								if (this._created === true) {
									this._created = false;
									Ember.run.later(function () {
										if (this._draggables) this._draggables.draggable("destroy");
										if (this._droppables) this._droppables.droppable("destroy");
									}, 1); // Tricky: http://alexkvak.com/dthis-data-draggable-is-undefined-bug-on-destroying-jquery-ui-s-draggableselectable.html
								}
							},
	
	_createDragAndDrop:		function() {
								var that = this;
								if (that._created === false) {
									that._created = true;
									Ember.run.next(function () {
										that._draggables = $(that.get('element')).find('.draggable');
										that._droppables = $(that.get('element')).find('.droppable');
										that._draggables.draggable({
																_droppableParent:	null,
																//helper: 			'clone', // Replaced by https://gist.github.com/2018290
																helper:				function() {
																						var clone;
																						clone = $(this).clone();
																						clone.find('script[id^=metamorph]').remove();
																						clone.find('*').each(function() {
																						  var $this;
																						  $this = $(this);
																						  return $.each($this[0].attributes, function(index, attr) {
																							if (!(attr && (attr.name.indexOf('data-bindattr') || attr.name.indexOf('data-ember')))) {
																							  return;
																							}
																							return $this.removeAttr(attr.name);
																						  });
																						});
																						if (clone.attr('id') && clone.attr('id').indexOf('ember') !== -1) {
																						  clone.removeAttr('id');
																						}
																						clone.find('[id^=ember]').removeAttr('id');
																						return clone;
																					},
																appendTo: 			'body',
																addClasses: 		false,
																revert: 			'invalid',
																revertDuration:		0,
																scope: 				'participants',
																cursor:				'move',
																create: 			function(event, ui) {
																						this._droppableParent = $(this).parentsUntil(".droppables-container", ".droppable" );
																					},
																start: 				function(event, ui) {
																						this._droppableParent.droppable("disable");
																					},
																stop: 				function(event, ui) {
																						this._droppableParent.droppable("enable");
																					}
															});
										that._droppables.droppable({
																hoverClass: 	'droppable-over',
																activeClass:	'droppable-highlight',
																accept:			'.participant',
																drop: 			function(event, ui) {
																					var diverId = ui.draggable.attr('data-diver-id'),
																						diveGroupParticipantId = ui.draggable.attr('data-dive-group-participant-id'),
																						diveGroupId = $(this).attr('data-dive-group-id');
																					if ($(this).hasClass('available-participants')) {
																						// Delete
																						JustDive.Controllers.Routed.DiveGroupParticipant.destroy(diveGroupParticipantId);
																					} else {
																						if (diveGroupParticipantId === undefined) {
																							// Create
																							JustDive.Controllers.Routed.DiveGroupParticipant.create(diverId, diveGroupId);
																						} else {
																							// Update
																							JustDive.Controllers.Routed.DiveGroupParticipant.update(diveGroupParticipantId, diveGroupId);
																						}
																					}
																				},
																scope:			'participants'
															});
										
									});
									//that.rerender();
								}
							}
});