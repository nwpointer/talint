RecursiveMenu = React.createClass({

	select: function(v){
		this.props.ch(v, this.props.active.length);
	},

	render:function(){
		data = this.props.data;
		ch = this.props.ch;
		active = this.props.active;

		options = Object.keys(data).map(function(v,i){
			return (isIndex(v) ? {id:data[v].id,name:data[v].name} : {id:v,name:v})
		})
		content = Object.keys(data).map(function(k,i){;
			return(<RecursiveMenu data={data[k]} name={k} key={k} ch={ch} active={tail(active)} />);
		})

		return(
			<nav className="recursiveMenu">
				<Menu type={this.props.type} options={options} ch={this.select} value={head(active)} name={this.props.name} />
				<ContentSwitch active={head(active)}>
					{ !Array.isArray(data) ? content : ""}
				</ContentSwitch>
			</nav>
		)
	}
})