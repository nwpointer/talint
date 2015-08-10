Menu = React.createClass({
	ch: function(e){
		this.props.ch((this.props.options[e.target.value].id).toString());
	},
	children : function(){
		props = this.props
		cl = this.props.selectedClass || "sel"
		ch = this.ch
		options = props.options.map(function(v,i){
			switch(type){
				case "list"  : return(
					<li className={v.name === props.value ? cl :""} onClick={ch} value={i}>{v.name}</li>
				); break;
				case "select": return(
					<option value={i}>{v.name}</option>
				); break;
			}
		});

		disabled = (function(){return(<option value="false" disabled>select {props.name}</option>)})();
		return type == "select" ? [disabled].concat(options) : options
	},
	render:function(){	
		props = this.props
		type = this.props.type || "select"
		switch(type){
			case "list"  : return(<ul className="list" children={this.children()} />); break;
			case "select": return(<select defaultValue={props.value} onChange={this.ch} children={this.children()} />); break;
		}	
	}
})

ContentSwitch = React.createClass({
	//key based content(children) switch
	render: function(){
		var content;
		var active = this.props.active;
		if(this.props.children){
			this.props.children.forEach(function(v,i){
				if(v.key === active) content = v;
			})
		}
		return(
			<section className={ this.props.className + " switch"}>
				<div className="container">{content}</div>
			</section>
		)
	}
})

Range = React.createClass({
	ch: function(e){
		v = e.target.value;
		i = this.props.data.id
		this.props.ch(v,i);
	},
	render: function(){
		data = this.props.data
		return(
			<div className="input">
				<input 
					type="range" value={data.rank || 0}
					max={data.max || 10} min={data.min || 0} 
					onChange={this.ch}
				/>
			</div>
		)
	}
})