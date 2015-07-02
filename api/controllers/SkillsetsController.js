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

	},

	all: function(req,res){
		Skillsets.find().exec(function(err, records){
			records = {skillsets:records};
			return res.view(records);
		});
	},

	one: function(req,res){
		id = req.allParams();

		Skillsets.findOne(id).populate('skills').exec(function(err, records){
			Skills.find().exec(function(err,skills){
				records.skillLibrary = skills;
				return res.view(records);
			});
		});
	}	
	
};

