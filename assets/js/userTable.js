var Table = Reactable.Table,
	Tr = Reactable.Tr,
	Td = Reactable.Td;

	usersStub = [
		        { name: 'Griffin Smith', age: 18, match:10 },
		        { age: 23,  name: 'Lee Salminen', match:40 },
		        { age: 28, position: 'Developer', match:100 },
		    ]

	// stress test
	// for(i=0;i<2000;i++){
	// 	usersStub.push({match:(~~(Math.random()*100))})
	// }

var UserTable = React.createClass({

	getInitialState:function () {
		return({
			users:this.props.users,
		    minMatch:30
		})
	},

	// componentWillMount:function(){
	// 	cb = function(res){
	// 		activeUserfollows = _.pluck(res, 'id');
	// 		update = function (v) {
	// 			console.log(v)
	// 			this.state.children[v.id].follows = parseInt(_.contains(activeUserfollows, parseInt(v.id)))
	// 		}
	// 		this.state.users.map(update.bind(this))
			
	// 		// if(this.isMounted()){
	// 		// 	user = this.state.users[0].follows = true
	// 		// 	//this.setState();
	// 		// }
	// 		console.log("update",this.state)
	// 	}
	// 	io.socket.get('/api/user/'+activeUserId+"/follows", cb.bind(this));
	// },

	star:function(f){
		console.log("hia", f);
		_.where(this.state.users, {id:f})[0].follows = !(_.where(this.state.users, {id:f})[0].follows)
		this.setState(this.state)

	},

	render:function () {
		minMatch = this.state.minMatch
		star = this.star
		rows = this.state.users.map(function(v,i){
			return(
				<Tr key={i} className={v.match < minMatch && "bad-match"}>
		            <Td column="name" value={v.name}>
		            	<a href={"/user/" + v.id}>{v.name}</a>
		            </Td>
		            <Td column="email" value={v.email}>
		            	<a href={"/user/" + v.id}>{v.email}</a>
		            </Td>
		            <Td column="location" data={v.location}></Td>
		            <Td column="availability" value={v.availability}>
		            	{v.availability && v.availability + "/5"}
		            </Td>
		            <Td column="match" value={v.match}>
		            	<Progressbar completed={v.match} />
		            </Td>
		            <Td column="" value={v.follows} >
		            	<Star onclick={star} active={v.follows} follower={activeUserId} follows={v.id} />
		            </Td>
		        </Tr>
			)
		})
		return(<div id="userTable">
			<Table sortable={true} className="table"
				   columns={["name","email", "location", "availability", "match", ""]}
				   defaultSort={{column:'match', direction:'desc'}}
			 >
				{rows}
			 </Table>
		</div>)
	}
})