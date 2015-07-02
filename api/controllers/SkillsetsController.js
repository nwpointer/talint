/**
 * SkillsetsController
 *
 * @description :: Server-side logic for managing skillsets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	setrank : function(req, res){
		args = req.params.all();

		try{
			Skillsets.findOne(args.setId).exec(function(err,set){
				set.setRank(args.skillId, args.rankId, function(newset){
					// res.json({});
					res.json(newset);
				});
			});
		}
		catch(err){
			res.json({err:err});
		}
		// res.json(args);

	}
	
};

