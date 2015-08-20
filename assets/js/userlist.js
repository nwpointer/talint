// var options = {
//   valueNames: [ 'name', 'email', 'location', 'availability', 'match' ]
// };

initUserList = function(){
	var options = {
	  valueNames: [ 'name', 'email', 'location', 'availability', 'match' ]
	};
	userList = new List('users', options)
	//console.log(tempuserlist)
	//window.userList = new List('users', options);	
}

initUserList();

