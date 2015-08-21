// /**
//  * ownsProfile
//  *
//  * @module      :: Policy
//  * @description :: TODO: You might write a short summary of how this policy works and what it represents here.
//  * @help        :: http://sailsjs.org/#!/documentation/concepts/Policies
//  */
module.exports = function(req, res, next) {

	if(req.session.authenticated){
		userId = req.session.passport.user
		User.findOne(userId).exec(function(err, user){
			if(!err && user && user.role == "admin"){
				return next();
			}else{
				return res.redirect('/notAllowed');
			}
		});
	}else{
		console.log('grupm');
		return res.redirect('/notAllowed');
	}

};