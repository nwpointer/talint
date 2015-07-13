/**
 * hasKey
 *
 * @module      :: Policy
 * @description :: TODO: You might write a short summary of how this policy works and what it represents here.
 * @help        :: http://sailsjs.org/#!/documentation/concepts/Policies
 */



module.exports = function(req, res, next) {

  var statusIsValid = function(status){
  	return (status != "accepted" && status != "expired" && status != "revoked");
  };

  var code = req.param('code');

  Invites.findOne({code:code}).exec(function(err, invite){
  	if(invite && statusIsValid(invite.status)){
  		// invite.status = "accepted";
  		// invite.save();
  		return next();
  	}else{
  		return res.redirect('/notAllowed');
  	}	
  });

};
