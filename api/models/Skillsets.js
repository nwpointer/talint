/**
* Skillsets.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	  	user: {
  	  		model: 'skillsets',
  	  	},
  	  	skills:{
  	  		collection: 'skills'
  	  	},
  	  	ranks: "json",
  	  	hasSkill: function(skillId, cb){
  	  		cb = cb || function(res){console.log(res);};
  	  		Skillsets.findOne(this.id)
  	  		.populate('skills')
  	  		.exec(function(err, skillset){
  	  			has = _.isObject(_.find(skillset.skills, function(skill) {
  				  return skill.id == skillId;
  				}));
  				cb(has);
  	  		});
  	  	},
  	  	setRank: function(skillId,val,cb) {
  	      cb = cb || function(res){console.log(res);};
  	  		newRanks = this.ranks;
  	  		newRanks[skillId] = val;

  	  		this.hasSkill(skillId, function(has){
  	  			if(has){
  	  				Skillsets.update(this.id, {ranks:newRanks}).exec(function(err, set){
  		  				if(err){
  		  					return;
  		  				}
  		  				cb(set);
  		  			});
  	  			}else{
  	  			   throw "user does not have this skill";
  	        }
  	  		});  		
  	  	}	
  }
};

