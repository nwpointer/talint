/**
 * InvitesController
 *
 * @description :: Server-side logic for managing invites
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 function test(n){
 	return n;
 }

module.exports = {

	send: function (req, res) {
		// res.send('hi');
		args = req.params.all();
		Invites.send(args.id, req, res);

	},

	all: function(req,res){
		Invites.find().exec(function(err, records){
			records = {invites:records};
			records.invites = _.map(records.invites, dateFormat.formatRecord("createdAt"));
			return res.view(records);
		});
	},

	one: function(req,res){
		id = req.allParams().id;
		Invites.findOne(id).exec(function(err, records){
			return res.view(records);
		});
	},

	cancel: function(req, res){
		id = req.allParams().id;
		Invites.update(id, {status: "revoked"}).exec(function(err, records){
			return res.redirect("/invites");
		});
	}	
};

