/**
 * SkillsController
 *
 * @description :: Server-side logic for managing skills
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	all: function(req,res){
		Skills.find().exec(function(err, records){
			records = {skills:records};
			records.quantifier_options = ['binary', 'range'];
			return res.view(records);
		});
	},

	one: function(req,res){
		id = req.allParams().id;
		Skills.findOne(id).exec(function(err, records){
			records.quantifier_options = ['binary', 'range'];
			records.qi = records.quantifier_options.indexOf(records.quantifier);
			return res.view(records);
		});
	},

	edit: function(req,res){
		id = req.allParams().id;
		Skills.find().exec(function(err, records){
			return res.view({skills:records});
		});
	},

	make: function(req,res){
		return res.view();
	} 	
};

