/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	all: function(req, res){
		// try to get all the users, return to view
		User.find({}).exec(function findCB(err, found){
			return res.view({users:found});
		});
	},

	profile: function(req, res){

		var id = req.param('id');

		User.findOne(id).exec(function findCB(err, found){
			if(err){
				return res.serverError(err);
			}else{
				if( found ){
					found.owns = (id == req.session.passport.user) ? true : false;
					return res.view(found);
				}
				else{
					return res.send("user not found");
				}
			}
		});
	},

	edit: function(req, res){

		var id = req.param('id');

		User.findOne(id).exec(function findCB(err, found){
			if(err){
				return res.serverError(err);
			}else{
				if( found ){
					return res.view(found);
				}
				else{
					return res.send("user not found");
				}
			}
		});
	},

	update: function(req, res){
		values = req.allParams();

		var id = values.id;
		delete values.id;
		delete values.username;

		User.update(id).set(values).then(function(newUser){
			if (newUser){
				return res.redirect("/user/"+id);
			}else{
				res.serverError("user account could not be updated");

			}
		});
	},

	addition: function(req, res){
		return res.json({hi:'add'});
	}

};

