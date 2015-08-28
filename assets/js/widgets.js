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
	up:function(){
		var data = this.props.data;
		data.rank < (data.max || 10) && this.props.ch( (parseInt(data.rank)+1) , data.id)
	},
	down:function(){
		var data = this.props.data;
		data.rank > (data.min || 0) && this.props.ch( (parseInt(data.rank)-1) , data.id)
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
				<div className="labels">
				<span onClick={this.down}  className="from">-</span>
				<span className="value">{data.rank || 0} {data.unit}</span>
				<span onClick={this.up} className="to">+</span>

				</div>
			</div>
		)
	}
})

var Progressbar = React.createClass({

  render: function() {

    var completed = +this.props.completed;
    if (completed < 0) {completed = 0};
    if (completed > 100) {completed = 100};

    colorRange =['#c5c5c5', '#0BD318', '#0BD318'];

    console.log();

    var style = {
      backgroundColor: this.props.color || colorRange[~~((completed)/(101/colorRange.length))],
      width: completed + '%',
      transition: "width 200ms",
      height: this.props.height || 10
    };

    return (
      <div className="progressbar-container" >
        <div className="progressbar-progress" style={style}>{this.props.children}</div>
      </div>
    );
  }
});

Star = React.createClass({
	getInitialState : function(){
		return{
			active: typeof this.props.active === 'undefined' ? false : this.props.active
		};
	},
	isActive: function(){
		each = function (v, i) {
			if(v.id == this.props.follows){
				this.setState({active:true})
			}
		}
		cb = function(res){
			res.forEach(each.bind(this))
		}
		io.socket.get('/api/user/'+this.props.follower+"/follows", cb.bind(this));
	},

	toggle:function(){
		route = '/api/user/'+this.props.follower+'/follows/' + this.props.follows
		active = typeof this.props.active === 'undefined' ? this.state.active : this.props.active
		if(active){
			io.socket.delete(route,{}, function(res){})
		}else{
			io.socket.post(route,{}, function(res){})
		}
		if(typeof this.props.active === 'undefined'){
			this.setState({active: !this.state.active});
		}else{
			this.props.onclick(this.props.follows);
		}
	},
	componentWillMount: function(){
		if(typeof this.props.active === 'undefined'){
			this.isActive();
		}
	},
	render: function(){
		active = typeof this.props.active === 'undefined' ? this.state.active : this.props.active
		return(<i onClick={this.toggle} className={"fa fa-2 fa-star" + (active ? "" : "-o")}></i>);
	}
});