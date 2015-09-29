SkillDisplay = React.createClass({

	select: function(skill){
		this.props.ch(skill);
	},

	deleteSkill: function(path){
		this.props.dl(path);
	},

	// componentDidUpdate:function(){
	// 	$('[data-content]').popup();
	// },

	// componentDidMount: function(){
	// 	$('[data-content]').popup();
	// },

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
					<div className="ui label skilltag" data-content={skill.name} data-variation="mini inverted">
						<a href="#" className="" onClick={sel}>{skill.name}: {skill.rank} {skill.unit} </a>
						<i className="delete icon" onClick={del}></i>
					</div>
				)}
			});
			return(
				
					{children}
	
			);
		})
		return(
			<section className="skillDisplay">
				<br />
				{catagories}
				<br />
				<br />
			</section>
		)
	}
})