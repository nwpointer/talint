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

	render:function () {
		minMatch = this.state.minMatch
		rows = this.state.users.map(function(v,i){
			return(
				<Tr key={i} className={v.match < minMatch && "bad-match"}>
		            <Td column="name" value={v.name}>
		            	<a href={"user/" + v.id}>{v.name}</a>
		            </Td>
		            <Td column="email" value={v.email}>
		            	<a href={"user/" + v.id}>{v.email}</a>
		            </Td>
		            <Td column="location" data={v.location}></Td>
		            <Td column="availability" value={v.availability}>
		            	{v.availability && v.availability + "/5"}
		            </Td>
		            <Td column="match" value={v.match}>
		            	<Progressbar completed={v.match} />
		            </Td>
		        </Tr>
			)
		})
		return(<div>
			<Table sortable={true} className="table"
				   columns={["name","email", "location", "availability", "match"]}
				   defaultSort={{column:'match', direction:'desc'}}
			 >
				{rows}
			 </Table>
		</div>)
	}
})