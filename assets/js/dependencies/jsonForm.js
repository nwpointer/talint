// dependencies: crud.js, form2js

jsonForm = function(id, cb){

	this.id = id;
	this.el = document.getElementById(id);
	this.action = this.el.action;
	this.cb = cb;
	self = this;	

	this.getData = function(){
		formdata = form2js(this.id);
		return formdata;
	};

	this.processForm = function(e){
	    if (e.preventDefault) e.preventDefault();
	    self.cb(self.getData());
    	return false;
	}.bind(this);

	this.register = function(){
		el = this.el;
		if (el.attachEvent) {
		    el.attachEvent("submit", self.processForm);
		} else {
		    el.addEventListener("submit", self.processForm);
		}
	};
	this.register();
};