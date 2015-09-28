Discover = React.createClass({
	getInitialState : function(){
		//remove earlier version of localstorage

		if(window.useLocalStorage){
			if(localStorage.skillTree && JSON.parse(localStorage.skillTree).skillTree){
				localStorage.removeItem("skillTree");
			}
			return {
				skillTree: localStorage.skillTree ? JSON.parse(localStorage.skillTree) : window.skillTree,
				active: localStorage.active ? JSON.parse(localStorage.active) : [],
				users : this.props.users || []
			}
		}else{
			return {
				skillTree: window.skillTree,
				active:["Skills"],
				users : this.props.users || []
			}
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

	updateMatch: function(){
		Matches = calcuateMatch(
					arrayToMapObj(leaves(this.state.skillTree)), userSkills
				  )
		keys = Object.keys(Matches);
		users = this.state.users;
		//console.log(keys);
		keys.forEach(function(v,i){
			users[i].match = Matches[v].score;
		})
	},

	componentDidUpdate: function(){
		//JSON.stringify(this.state)
		
		if(!this.props.noStore){
			window.localStorage.setItem('skillTree', JSON.stringify(this.state.skillTree))
			window.localStorage.setItem('active', JSON.stringify(this.state.active))
		}
	},

	clearSkills: function(){
		localStorage.setItem('skillTree', JSON.stringify(emptySkilltree));
		location.href ='/user';
	},

	render: function(){
		active = this.state.active;
		self = this;
		ranges = leaves(this.state.skillTree).map(function(v,i){
			return(
				<Range data={v} ch={self.updateRank} key={v.id}/>
			)
		})

		table = function(){
			if(self.state.users && self.state.users.length){
				return(<UserTable users={self.state.users} />)
			}
		}

		if(this.state.users.length){
			this.updateMatch();
		}

		loadSearches = "/user/" + activeUserId + "/loadSearches";

		return(
			<div className="discover">
				<a className="suggest" href="#" onClick={this.clearSkills} >clear all</a>
				<a className="suggest" href="mailto:nwpointer@gmail">suggest a skill</a>
				<a className="suggest" href="#" data-remodal-target="modal">save search</a>
				<a className="suggest" href={loadSearches}>load search</a>
				<br />
				<section className="edit">
					<RecursiveMenu data={this.state.skillTree} ch={this.selectSkill} active={this.state.active} type="list" />
					
					<ContentSwitch className="skillRange" active={last(active)}>
						{ranges}
					</ContentSwitch>
				</section>

				<SkillDisplay data={this.state.skillTree} ch={this.selectSkill} dl={this.deleteSkill} />

				{table()}

			</div>
		)
		
	}
})