JustDive.Ui.Adapter = JustDive.Ui.AbstractAdapter.extend({
	init: 			function() {
	
						$.ajaxSetup({
							_indicator: null,
							beforeSend:function(){
								if (this._indicator === null) {
									this._indicator = $("#loading");
								}
								this._indicator.show();
							},
							complete:function(){
								if (this._indicator === null) {
									this._indicator = $("#loading");
								}
								this._indicator.hide();
							}
						});
						/*
						document.addEventListener("touchstart", this.touchHandler, true);
						document.addEventListener("touchmove", this.touchHandler, true);
						document.addEventListener("touchend", this.touchHandler, true);
						document.addEventListener("touchcancel", this.touchHandler, true); 
						*/
					}
/*,
					
	touchHandler: 	function(event) {
						var touches = event.changedTouches,
							first 	= touches[0],
							type 	= "";

						switch(event.type) {
							case "touchstart": type = "mousedown"; break;
							case "touchmove":  type = "mousemove"; break;        
							case "touchend":   type = "mouseup"; break;
							default: return;
						}
						var simulatedEvent = document.createEvent("MouseEvent");
						simulatedEvent.initMouseEvent(type, true, true, window, 1,
														first.screenX, first.screenY,
														first.clientX, first.clientY, false,
														false, false, false, 0/*left*/

/*														, null);
						first.target.dispatchEvent(simulatedEvent);
						event.preventDefault();
					}
*/
});