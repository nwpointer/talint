SkillDisplay = React.createClass({

	select: function(skill){
		this.props.ch(skill);
	},

	deleteSkill: function(path){
		this.props.dl(path);
	},


	render:function(){
		data= this.props.data;
		select =this.select;
		deleteSkill = this.deleteSkill;
		dl = this.props.dl;
		headers= this.props.headers;
		catagories = Object.keys(this.props.data).map(function(catagory){
			root={};
			root[catagory] = data[catagory];
			children = leaves(root).map(function(skill){
				var sel = select.bind(this, skill.path);
				var del = deleteSkill ? deleteSkill.bind(this, skill.path) : false;
				if(skill.rank){return(
					<li>
						<span className="type active" >{catagory[0]}</span>
						<span className="name" onClick={sel}>{skill.name}: {skill.rank} {skill.unit} </span>
						<span className="delete" onClick={del}>{dl ? "x" : ""}</span>
					</li>
				)}
			});
			return(
				<ul className="child">
					{children}
				</ul>
			);
		})
		return(
			<section className="skillDisplay">
				{catagories}
			</section>
		)
	}
})