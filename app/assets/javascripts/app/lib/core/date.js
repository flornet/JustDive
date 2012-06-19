(function() {
    Date.prototype.fromISOFormat = function(isoFormatDateString) {
        var dateParts = isoFormatDateString.split("-");
		this.setFullYear(dateParts[0]);
		this.setMonth(dateParts[1]);
		this.setDate(dateParts[2]);
    }
})();

