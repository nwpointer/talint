dateFormat = require('dateformat');

dateFormat.masks.standard = "dddd/mmmm/yyyy";

dateFormat.formatRecord = function (attr, format) {
	// built to be passed to a mapper
	formater = function(n){
		date = n[attr].toDateString();
		if(format){ date = dateFormat(date, format);}
		n[attr] = date;
		return n;
	};
	return formater;	 	
};

module.exports = dateFormat;