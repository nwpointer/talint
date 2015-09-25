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
		this.setState({"skillTree":{"Skills":{"Human Resources":[{"id":85,"name":"Human Resources","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Human Resources","85"]},{"id":86,"name":"Recruitment & Talent Acquisition","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Human Resources","86"]},{"id":87,"name":"Compensation Program Management","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Human Resources","87"]}],"Sales, Marketing & PR":[{"id":88,"name":"Account Management","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Sales, Marketing & PR","88"]},{"id":89,"name":"Customer Relationship Management (CRM)","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Sales, Marketing & PR","89"]},{"id":90,"name":"Advertising","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Sales, Marketing & PR","90"]},{"id":91,"name":"Public Relations","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Sales, Marketing & PR","91"]},{"id":92,"name":"Sales","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Sales, Marketing & PR","92"]},{"id":93,"name":"Marketing","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Sales, Marketing & PR","93"]},{"id":94,"name":"Web Analytics","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Sales, Marketing & PR","94"]}],"Accounting & Finance":[{"id":95,"name":"Book Keeping","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Accounting & Finance","95"]},{"id":96,"name":"Accounting","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Accounting & Finance","96"]},{"id":97,"name":"Finance","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Accounting & Finance","97"]},{"id":98,"name":"Public Accounting","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Accounting & Finance","98"]}],"Business Administration & Management":[{"id":99,"name":"Business Process Mapping","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Business Administration & Management","99"]},{"id":100,"name":"Enterprise Resource Planning (ERP)","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Business Administration & Management","100"]},{"id":101,"name":"Business Administration","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Business Administration & Management","101"]},{"id":102,"name":"Personnel Management","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Business Administration & Management","102"]},{"id":103,"name":"Program Management","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Business Administration & Management","103"]},{"id":104,"name":"Project Management","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Business Administration & Management","104"]},{"id":105,"name":"Purchasing","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Business Administration & Management","105"]}],"Energy":[{"id":106,"name":"Energy Management","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Energy","106"]},{"id":107,"name":"Energy Program Management","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","Energy","107"]}],"IT, Computer Sciences & Software Engineering":[{"id":108,"name":"Web Development","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","IT, Computer Sciences & Software Engineering","108"]},{"id":109,"name":"Software Project Management","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","IT, Computer Sciences & Software Engineering","109"]},{"id":110,"name":"Databases (General)","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","IT, Computer Sciences & Software Engineering","110"]},{"id":111,"name":"Schemas (General)","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","IT, Computer Sciences & Software Engineering","111"]},{"id":112,"name":"Indexes (General)","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","IT, Computer Sciences & Software Engineering","112"]},{"id":113,"name":"Information Security","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","IT, Computer Sciences & Software Engineering","113"]},{"id":114,"name":"Mobile Application Development","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","IT, Computer Sciences & Software Engineering","114"]},{"id":115,"name":"Systems Administration","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","IT, Computer Sciences & Software Engineering","115"]},{"id":116,"name":"Software Quality Assurance (QA)","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","IT, Computer Sciences & Software Engineering","116"]},{"id":117,"name":"Enterprise Architecture","rank":0,"min":0,"max":10,"unit":"/10","path":["Skills","IT, Computer Sciences & Software Engineering","117"]}]},"Languages":[{"id":0,"name":"English","rank":0,"unit":"/10","path":["Languages","0"]},{"id":1,"name":"Spanish","rank":0,"unit":"/10","path":["Languages","1"]},{"id":2,"name":"French","rank":0,"unit":"/10","path":["Languages","2"]},{"id":3,"name":"German","rank":0,"unit":"/10","path":["Languages","3"]},{"id":4,"name":"Italian","rank":0,"unit":"/10","path":["Languages","4"]},{"id":5,"name":"Portugese","rank":0,"unit":"/10","path":["Languages","5"]},{"id":6,"name":"Arabic","rank":0,"unit":"/10","path":["Languages","6"]},{"id":7,"name":"Chinese (Mandarin)","rank":0,"unit":"/10","path":["Languages","7"]},{"id":8,"name":"Chinese (Cantonese)","rank":0,"unit":"/10","path":["Languages","8"]},{"id":9,"name":"Japanese","rank":0,"unit":"/10","path":["Languages","9"]},{"id":10,"name":"Thai","rank":0,"unit":"/10","path":["Languages","10"]},{"id":11,"name":"Vietnamese","rank":0,"unit":"/10","path":["Languages","11"]},{"id":12,"name":"Swedish","rank":0,"unit":"/10","path":["Languages","12"]},{"id":13,"name":"Finnish","rank":0,"unit":"/10","path":["Languages","13"]},{"id":14,"name":"Danish","rank":0,"unit":"/10","path":["Languages","14"]},{"id":15,"name":"Dutch","rank":0,"unit":"/10","path":["Languages","15"]},{"id":16,"name":"Greek","rank":0,"unit":"/10","path":["Languages","16"]},{"id":17,"name":"Russian","rank":0,"unit":"/10","path":["Languages","17"]},{"id":18,"name":"Hindi","rank":0,"unit":"/10","path":["Languages","18"]},{"id":19,"name":"Korean","rank":0,"unit":"/10","path":["Languages","19"]},{"id":20,"name":"Urdu","rank":0,"unit":"/10","path":["Languages","20"]},{"id":21,"name":"Persian","rank":0,"unit":"/10","path":["Languages","21"]},{"id":22,"name":"Turkish","rank":0,"unit":"/10","path":["Languages","22"]},{"id":23,"name":"Polish","rank":0,"unit":"/10","path":["Languages","23"]},{"id":24,"name":"Romanian","rank":0,"unit":"/10","path":["Languages","24"]},{"id":25,"name":"Serbo-Croatian","rank":0,"unit":"/10","path":["Languages","25"]},{"id":26,"name":"Swahili","rank":0,"unit":"/10","path":["Languages","26"]},{"id":27,"name":"Nepali","rank":0,"unit":"/10","path":["Languages","27"]},{"id":28,"name":"Czech","rank":0,"unit":"/10","path":["Languages","28"]},{"id":29,"name":"Pashto","rank":0,"unit":"/10","path":["Languages","29"]},{"id":30,"name":"Kurdish","rank":0,"unit":"/10","path":["Languages","30"]},{"id":31,"name":"Hungarian","rank":0,"unit":"/10","path":["Languages","31"]}],"Industries":[{"id":32,"name":"Accounting & Finance","rank":0,"unit":"yrs.","path":["Industries","32"]},{"id":33,"name":"Agriculture","rank":0,"unit":"yrs.","path":["Industries","33"]},{"id":34,"name":"Aviation or Aerospace","rank":0,"unit":"yrs.","path":["Industries","34"]},{"id":35,"name":"Banking","rank":0,"unit":"yrs.","path":["Industries","35"]},{"id":36,"name":"Biomedical","rank":0,"unit":"yrs.","path":["Industries","36"]},{"id":37,"name":"Biotechnology","rank":0,"unit":"yrs.","path":["Industries","37"]},{"id":38,"name":"Chemical","rank":0,"unit":"yrs.","path":["Industries","38"]},{"id":39,"name":"Civil Engineering","rank":0,"unit":"yrs.","path":["Industries","39"]},{"id":40,"name":"Clothing & Accessories","rank":0,"unit":"yrs.","path":["Industries","40"]},{"id":41,"name":"Communications","rank":0,"unit":"yrs.","path":["Industries","41"]},{"id":42,"name":"Computer Hardware","rank":0,"unit":"yrs.","path":["Industries","42"]},{"id":43,"name":"Constrution","rank":0,"unit":"yrs.","path":["Industries","43"]},{"id":44,"name":"Consulting","rank":0,"unit":"yrs.","path":["Industries","44"]},{"id":45,"name":"Consumer Electronics","rank":0,"unit":"yrs.","path":["Industries","45"]},{"id":46,"name":"Education (K-12)","rank":0,"unit":"yrs.","path":["Industries","46"]},{"id":47,"name":"Energy","rank":0,"unit":"yrs.","path":["Industries","47"]},{"id":48,"name":"Entertainment","rank":0,"unit":"yrs.","path":["Industries","48"]},{"id":49,"name":"Food & Beverage Service","rank":0,"unit":"yrs.","path":["Industries","49"]},{"id":50,"name":"Gaming and Digital Entertainment","rank":0,"unit":"yrs.","path":["Industries","50"]},{"id":51,"name":"Government","rank":0,"unit":"yrs.","path":["Industries","51"]},{"id":52,"name":"Health Care","rank":0,"unit":"yrs.","path":["Industries","52"]},{"id":53,"name":"Health Insurance","rank":0,"unit":"yrs.","path":["Industries","53"]},{"id":54,"name":"Hospitality","rank":0,"unit":"yrs.","path":["Industries","54"]},{"id":55,"name":"Industrial Engineering","rank":0,"unit":"yrs.","path":["Industries","55"]},{"id":56,"name":"Insurance","rank":0,"unit":"yrs.","path":["Industries","56"]},{"id":57,"name":"IT","rank":0,"unit":"yrs.","path":["Industries","57"]},{"id":58,"name":"Law enforcement","rank":0,"unit":"yrs.","path":["Industries","58"]},{"id":59,"name":"Legal","rank":0,"unit":"yrs.","path":["Industries","59"]},{"id":60,"name":"Management Consulting","rank":0,"unit":"yrs.","path":["Industries","60"]},{"id":61,"name":"Manufacturing","rank":0,"unit":"yrs.","path":["Industries","61"]},{"id":62,"name":"Mechanical Engineering","rank":0,"unit":"yrs.","path":["Industries","62"]},{"id":63,"name":"Media","rank":0,"unit":"yrs.","path":["Industries","63"]},{"id":64,"name":"Mental Health","rank":0,"unit":"yrs.","path":["Industries","64"]},{"id":65,"name":"Military","rank":0,"unit":"yrs.","path":["Industries","65"]},{"id":66,"name":"Real Estate","rank":0,"unit":"yrs.","path":["Industries","66"]},{"id":67,"name":"Restaurant","rank":0,"unit":"yrs.","path":["Industries","67"]},{"id":68,"name":"Shipping","rank":0,"unit":"yrs.","path":["Industries","68"]},{"id":69,"name":"Software","rank":0,"unit":"yrs.","path":["Industries","69"]},{"id":70,"name":"Sports & Outdoors","rank":0,"unit":"yrs.","path":["Industries","70"]},{"id":71,"name":"Telecommunications","rank":0,"unit":"yrs.","path":["Industries","71"]},{"id":72,"name":"Transportation","rank":0,"unit":"yrs.","path":["Industries","72"]},{"id":73,"name":"Utilities","rank":0,"unit":"yrs.","path":["Industries","73"]},{"id":74,"name":"Vetinary","rank":0,"unit":"yrs.","path":["Industries","74"]}],"Education":[{"id":75,"name":"GED","rank":0,"min":0,"max":1,"unit":"","path":["Education","75"]},{"id":76,"name":"High School","rank":0,"min":0,"max":1,"unit":"","path":["Education","76"]},{"id":77,"name":"Associates","rank":0,"min":0,"max":1,"unit":"","path":["Education","77"]},{"id":78,"name":"Bachelors","rank":0,"min":0,"max":1,"unit":"","path":["Education","78"]},{"id":79,"name":"PhD","rank":0,"min":0,"max":1,"unit":"","path":["Education","79"]},{"id":80,"name":"Masters","rank":0,"min":0,"max":1,"unit":"","path":["Education","80"]},{"id":81,"name":"MD","rank":0,"min":0,"max":1,"unit":"","path":["Education","81"]}],"Training":[{"id":82,"name":"ID8","rank":0,"min":0,"max":1,"unit":"","path":["Training","82"]},{"id":83,"name":"RAIN","rank":0,"min":0,"max":1,"unit":"","path":["Training","83"]},{"id":84,"name":"Other accellerator","rank":0,"min":0,"max":1,"unit":"","path":["Training","84"]}]},"active":["Skills","Human Resources","85"],"users":[{"name":" ","id":"1","email":"nwpointer@gmail.com","location":"","availability":"","match":0,"follows":false},{"name":"Nathan Pointr","id":"2","email":"testuser@gmail.com","location":"jhjhg","availability":"2","match":0,"follows":true}]})
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

		return(
			<div className="discover">
				<a className="suggest" href="#" onClick={this.clearSkills} >clear all</a>
				<a className="suggest" href="mailto:nwpointer@gmail">suggest a skill</a>
				<a className="suggest" href="#" data-remodal-target="modal">save search</a>
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