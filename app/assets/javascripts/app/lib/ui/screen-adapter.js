JustDive.UiScreenAdapter = JustDive.UiAbstractAdapter.extend({
	init: function() {
		$("#loading").hide();
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
		$(window).bind('resize', function() {
			if ( $(window).width() > 980 ) {
				$("#content").height(($(window).height()-40)+"px")
				$("#sidebar").height(($(window).height()-58)+"px")
				$("body").css("padding-top","40px")
			}
			else {
				$("#content").height(($(window).height()-50)+"px")
				$("#sidebar").height(($(window).height()-68)+"px")
				$("body").css("padding-top","0px")            
			}

			$("#sidebar").css("overflow", "auto")
			$("body").css("padding-bottom","0px")
			$(".navbar").css("margin-bottom","0px")
		});
		*/
	}
});