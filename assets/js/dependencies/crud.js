// sails.io based crud interface

// todo add error messages

crud = function(model){
	this.model = model;
	this.prefix = "/api/";
	self = this;

	this.create = function(data,cb){
		var url = this.prefix + this.model;
		cb = cb || function(body, res){ location.href = "/" + self.model;};
		io.socket.post(url, data, cb);
	};
	// read: function(){

	// },
	this.update = function(id,data,cb){
		var url = this.prefix + this.model + "/" + id;
		cb = cb || function(body, res){ location.href = "/" + self.model + "/" + id;};
		io.socket.put(url, data, function(data, res){
			cb(data,res);
		});
	};
	this.destroy = function(id,data,cb){
		var url = this.prefix + this.model + "/" + id;
		cb = cb || function(body, res){ location.href = "/" + self.model;};
		io.socket.delete(url, data, function(data, res){
			cb(data,res);
		});
	}; 
};



