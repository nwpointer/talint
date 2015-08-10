 var App = React.createClass({
  getInitialState: function(){
    return{
      active: {
        req:0,
        skill:1,
        qualification:0,
      },
      requirements:{
        skills:[
          {id: 0, name:"math", rank:3, unit: "/10"},
          {id: 1, name:"html5", rank:5, unit: "/10"}
        ],
        qualifications:[
          {id: 2, name:"formal education", rank:1, unit:'years'},
          {id: 3, name:"industry experience", rank:9, unit:'years'}
        ]
      }
    };
  },

  ///////////////////////////////////////
  menuClicked: function(index){
    this.acitvate("req", index);
  },

  skillClicked: function(index){
    // console.log(index);
    this.acitvate("skill", index);
    console.log(index);
  },

  qualificationsClicked: function(index){
    // console.log(index);
    this.acitvate("qualification", index);
    // console.log(this.state);
  },

  acitvate: function(field, index){
    var state = this.state;
    state.active[field] = parseInt(index);
    this.setState(state);
  },
  ///////////////////////////////////////

  reqUpdate:function(set, newState){
    var state = (this.state);
    state.requirements[set] = newState;
    this.setState(state);
    // state=this.state;
    // state.requirements[set] = newState;
    // this.setState(state);
  },

  reqDelete: function(set, i){
    var state=this.state;
    state.requirements[set][i].rank = 0;
    this.setState(state);
  },

  reqSelect:function(set, i){
    // console.log("select", set, skillId);
    var state=this.state;
    self = this;
    state.active.req = Object.keys(state.requirements).map(function(el){
      return el
    }).indexOf(set);
    this.setState(state);
    this.acitvate(set.slice(0,-1), i);
  },

  render: function(){
    var active = this.state.active
    var req = this.state.requirements;
    var menuItems = Object.keys(this.state.requirements);

    console.log(this.state.active);

    updateMatchList(calcuateMatch(merge(arrayToMapObj(req.skills), arrayToMapObj(req.qualifications)), userSkills), "#users");



    return(
      <div className="discover">
        <Menu class="menu" items={menuItems} active={active.req} onSelect={this.menuClicked} />
        <ContentSwitch class="filter" active={active.req}>
          <form name="skills">
            <Select name="name" active={active.skill} options={req.skills} onSelect={this.skillClicked} />
            <RangeList name="skills" active={active.skill} data={req.skills} onChange={this.reqUpdate} />
          </form>
          <Form name="qualifications" onChange={this.formUpdate}>
            <Select name="name" active={active.qualification} options={req.qualifications} onSelect={this.qualificationsClicked} />
            <RangeList name="qualifications" active={active.qualification} data={req.qualifications} onChange={this.reqUpdate} />
          </Form>
        </ContentSwitch>
        <section className="requirements">
          <RequirementsList req={req.skills} set="skills" 
            onClick={this.reqSelect}
            onChange={this.reqDelete}
          />
          <RequirementsList req={req.qualifications} set="qualifications" 
            onClick={this.reqSelect}
            onChange={this.reqDelete}
            />
        </section>
      </div>
    )
  }
});

var Form = React.createClass({
  render: function(){
    return(
      <form id={this.props.name} >
        {this.props.children}
      </form>
    )
  }
});

var RequirementsList = React.createClass({
  select: function(v,i,e){
    this.props.onClick(this.props.set, i);
  },

  remove: function(v,i,e){
    this.props.onChange(this.props.set, i);
  },

  render: function(){
    var self = this;
    
    var reqs = this.props.req.map(function(value,i){
      select = self.select.bind(this,value,i);
      remove = self.remove.bind(this,value,i);
      if(value.rank > 0){
      return (
        <li>
          <span onClick={select} value={i}>
            {value.name} : {value.rank} {value.unit} 
          </span>
          <span className="delete" onClick={remove} > x</span>
        </li>
      );
      }
    });
    return(
      <ul>
        {reqs}
      </ul>
    );
  }
});


 var Range = React.createClass({
  render: function(){
    var min= this.props.min || 0;
    var max= this.props.max || 10;
    return(
      <input name={this.props.name} defaultValue={this.props.value} type="range" min={min} max={max} />
    );
  }
});


var LinkList = React.createClass({
  render: function(){
    var self= this;
    var links = this.props.items.map(function(item,i){
      var select = self.props.onSelect.bind(self, i);
      var style = self.props.active == i ? "focused" : "";
      return (
        <a className={style} onClick={select}>{item}</a>
      );
    });
    return(
      <nav className={this.props.class}>
        {links}
      </nav>
    )
  }
});

var Select = React.createClass({
  handleChange: function(e){
    this.props.onSelect(e.target.value);
  },
  render: function(){
  
    var options = this.props.options.map(function(value,i){
      return (
        <option value={i}>{value.name}</option>
      );
    });

    return(
      <select name={this.props.name} value={this.props.active} onChange={this.handleChange}>
        <option disabled value='-1'>Please Choose</option>
        {options}
      </select>
    );
  }
 });

var Menu = React.createClass({
  getInitialState: function(){
    return {mode: this.props.mode || 'link'}
  },

  render: function(){
    var self = this;
    var items = this.props.items;
    switch(self.state.mode){
      case 'select':
        return(
          <Select 
            class={this.props.class}
            options={items}
            onSelect={this.props.onSelect}
            active={this.props.active}
          />
        );
      default:
        return(
          <LinkList 
            class={this.props.class} 
            items={items} 
            onSelect={this.props.onSelect} 
            active={this.props.active} 
          /> 
        );
    }
    
  }
 });
var RangeSwitch = React.createClass({ 
  render: function(){       
    var ranges = this.props.ranges.map(function(value,i){
      var rank = value.rank || 0;
      return (
        <input type="range" value={rank} max="10" />
      );
    });
    active = ranges[this.props.active];
    return(
      <div className={this.props.class}> 
        {active} 
      </div>
    );  
  }
});

var RangeList = React.createClass({
  getInitialState: function() {
    return {
      active: this.props.active, 
      ranges: this.props.data
    };
  },
  handleChange: function(event) {
    state = this.state;
    for(e in state.ranges){
      if(state.ranges[e].name == event.target.name){
        state.ranges[e].rank = event.target.value;
        this.setState(state);
        if(this.props.onChange){
          this.props.onChange(this.props.name, state.ranges);
        }
      }
    }
  },

  render: function() {
    var value = this.state.value;
    self = this;
    ranges = this.state.ranges.map(function(entry, i){
      handleChange = self.handleChange;
      return(
          <input
            max="10" 
            type="range"
            name={entry.name} 
            key={i} 
            value={entry.rank}
            onChange={handleChange}
          />
      )
    }); 
    return(
      <div >
        {ranges[this.props.active]}
      </div>
    );
  }
});

var ContentSwitch = React.createClass({
  render: function(){
    active = this.props.children[this.props.active];
    return(
      <section className={this.props.class}>
        {active}
      </section>
    );
  }
 });