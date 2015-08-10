Discover = React.createClass({
	getInitialState : function(){
		return {
			skillTree: window.skillTree,
			active:["Skills"]
		}
	},

	selectSkill: function(value, distanceFromTail){	
		if(Array.isArray(value)){
			activeCopy = value;
		}else{
			activeCopy = this.state.active.slice();
			for(i=0;i<distanceFromTail;i++){
				activeCopy.pop();
			}
			activeCopy.push(value);
		}
		this.setState({active:activeCopy});
	},

	deleteSkill:function(path){
		skill = traverse(this.state.skillTree, path);
		skill.rank = 0;
		this.setState({skillTree:this.state.skillTree});
	},

	updateRank: function(rank,id){
		update = function(value, field, id, obj){
			Object.keys(obj).forEach(function(k){
				// if array look for skill inside array with correct id
				if(Array.isArray(obj[k])){
					obj[k].forEach(function(skill){
						if(skill.id == id) skill[field] = value;
					})
				// else recurse down tree
				}else{
					obj[k] = update(value, field, id, obj[k]);
				}
			})
			return obj;
		};
		newSkillTree = update(rank, "rank", id, this.state.skillTree);
		this.setState({active:this.state.active, skillTree:newSkillTree});
	},

	render: function(){
		active = this.state.active;
		self = this;
		ranges = leaves(this.state.skillTree).map(function(v,i){
			return(
				<Range data={v} ch={self.updateRank} key={v.id}/>
			)
		})

		updateMatchList(
			calcuateMatch(
				arrayToMapObj(leaves(this.state.skillTree)), userSkills
			), "#users");

		return(
			<div className="discover">

				<section className="edit">
					<RecursiveMenu data={this.state.skillTree} ch={this.selectSkill} active={this.state.active} type="list" />
					
					<ContentSwitch className="skillRange" active={last(active)}>
						{ranges}
					</ContentSwitch>
				</section>

				<SkillDisplay data={this.state.skillTree} ch={this.selectSkill} dl={this.deleteSkill} />

			</div>
		)
		
	}
})