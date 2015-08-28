/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	all: function(req, res){
		// try to get all the users, return to view
		User.find({}).populate('followers').exec(function findCB(err, found){
			_.each(found, function(v){
				followers = _.pluck(v.followers, 'id');
				v.follows = followers ? _.contains(followers, req.user.id) : false;
			})
			return res.view({users:found});
		});
	},

	favorites: function(req, res){
		var id = req.param('id');
		User.findOne(id).populate('follows').exec(function function_name (err, found) {
			if (err){
				return res.serverError(err);
			}else{
				res.view(found);
			}
		})
		//		
	},

	profile: function(req, res){

		var id = req.param('id');

		User.findOne(id).populate('skillset').exec(function findCB(err, found){
			if(err){
				return res.serverError(err);
			}else{
				if( found ){
					found.owns = (id == req.session.passport.user) ? true : false;

					try{
						Skillsets.find(found.skillset.id).populate('skills').exec(function(err, skillset){
							found.skillset = skillset;

							children = function(skills){
								children = [];
								for(i in skills){
									if(skills[i].parent){
										children.push(skills[i])
									}
								}
								return children;
							}
							parents = function(skills){
								parents = {};
								for(i in skills){
									if(!skills[i].parent){
										parents[skills[i].id] = skills[i]
									}
								}
								return parents
							}
						});
					}catch(err){}
					found.fake = (found.fake);
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

	editbio: function(req, res){

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

