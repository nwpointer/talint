/**
* Invites.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var uuid = require('uuid');

module.exports = {

  attributes: {

  	firstname: "STRING",
  	lastname: "STRING",

  	status: { 
  		type: "string", 
  		defaultsTo: "new",
  		enum: ["new", "sent", "accepted", 'expired', 'revoked', "request"] 
  	},

  	email:"STRING",

  	code:"STRING",

	generateCode: function(){
		var code = uuid.v4();
		
		Invites.update(this.id, {code:code}).exec(function(err, newInvite){
			if(err){
				return;
			}
		});
	}
  },

  send: function(id, req, res){
  	Invites.findOne(id).exec(function(err, invite){
  		if(err){
  			return res.serverError(err);
  		}

  		// additional info
  		invite.company = "ssg";
  		invite.baseUrl = sails.getBaseurl();
  		invite.code = uuid.v4();;

  		mailOptions = {
  		    from: 'nwpointer@gmail', // sender address
  		    to: invite.email, // list of receivers
  		    subject: 'Your new talint account', // Subject line
  		};

  		// IMPROVE: could offera continuable function to the controller but this works for now

  		email.render('email/userInvite', invite, mailOptions, function(info){
  			Invites.update(id, {status:"sent", code:invite.code}).exec(function(err,update){
  				if(err){
  					return console.log(err);
  				}
  				res.redirect('/invites');
  			});
  		});
  	});
  },



};

