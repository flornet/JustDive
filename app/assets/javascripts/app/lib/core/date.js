(function() {
    Date.prototype.fromISOFormat = function(isoFormatDateString) {
		if ((isoFormatDateString !== undefined) && (isoFormatDateString !== null)) {
			var dateParts = isoFormatDateString.split("-");
			this.setFullYear(dateParts[0]);
			this.setMonth(dateParts[1] - 1);
			this.setDate(dateParts[2]);
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

