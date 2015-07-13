// /**
//  * ownsProfile
//  *
//  * @module      :: Policy
//  * @description :: TODO: You might write a short summary of how this policy works and what it represents here.
//  * @help        :: http://sailsjs.org/#!/documentation/concepts/Policies
//  */
module.exports = function(req, res, next) {

	var targetProfile = req.param('id');
	var userId = req.session.passport.user;

	owns = targetProfile == userId;

	if(!owns){
		return res.redirect('/notAllowed');
	}  

	
	return next();

};