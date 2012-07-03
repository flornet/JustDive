(function() {
    Date.prototype.fromISOFormat = function(isoFormatDateString) {
		if ((isoFormatDateString !== undefined) && (isoFormatDateString !== null)) {
			var dateTimeParts = isoFormatDateString.split('T');
			var dateParts = dateTimeParts[0].split("-");
			this.setFullYear(dateParts[0]);
			this.setMonth(dateParts[1] - 1);
			this.setDate(dateParts[2]);
			if (dateTimeParts.length == 2) {
				var timeParts = dateTimeParts[1].split(":");
				this.setHours(timeParts[0]);
				if (timeParts[1] !== undefined)
					this.setMinutes(timeParts[1]);
				if (timeParts[2] !== undefined)
					this.setSeconds(timeParts[2].replace('Z',''));
			}
		}
    },
	Date.prototype.toISOFormat = function() {
		var month 	= (this.getMonth() + 1).toString(),
			day		= this.getDate().toString();
		if (month.length == 1) {
			month = '0' + month;
		}
		if (day.length == 1) {
			day = '0' + day;
		}
		return this.getFullYear() + '-' + month + '-' + day;
	},
	Date.prototype.addDays = function(days) {
	   var dat = new Date(this.valueOf())
	   dat.setDate(dat.getDate() + days);
	   return dat;
    }
})();

