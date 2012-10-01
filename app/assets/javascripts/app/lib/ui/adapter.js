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
					}
});