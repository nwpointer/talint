diff = function(reqs, skills, settings){
	
	var settings = settings || {};
	var ignoreOverQualification= settings.ignoreOverQualification || true;
	var quantifierName= settings.quantifiername || "rank";

	each = function(obj, f){
		for(k in Object.keys(obj)){
			var key = Object.keys(obj)[k];
			if(obj[key]){
				f(obj[key], key);
			}
		}
	}

	prune = function(obj){
		each(obj, function(member, memberId){
			if(member.rank == 0){
				obj[memberId] = undefined;
			}
		})
	}

	count=function(obj){
		var count = 0;
		each(obj, function(member){
			count++;
		});
		return count;
	}

	prune(reqs);
	prune(skills);

	var reqCount=count(reqs);
	var baseSkillValue = 100/reqCount;
	var sameness=0

	var skillCoverage = 0;

	each(reqs, function(req, skillId){
		match = function(a,b){
			match = a != 0 ? (b/a) : 1;
			match = ignoreOverQualification && match > 1 ? 1 : match
			return match;
		}
		if(skills[skillId]){
			skillCoverage++;
			reqRank= req.rank;
			skillRank= skills[skillId].rank;
			// console.log(match(1,1));
			var foo = match(reqRank,skillRank) * baseSkillValue;
			sameness += foo;
		}
	});

	return {
		skillCoverage: skillCoverage / reqCount,
		score: sameness < 100 ? sameness : 100
	}
}