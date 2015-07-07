var User = {

  attributes: {
    username  : { type: 'string', unique: true },
    firstname : { type: 'string' },
	  lastname  : { type: 'string' },
    email     : { type: 'email',  unique: true },
    phone     : { type: 'string' },
    biography : { type: 'string' },
    availability: {type:'integer' }, //also likely to change
    location  : { model: 'locations', via:'users' },
    // link model  
    passports : { collection: 'Passport', via: 'user' },
    skillset:{
    	model: 'skillsets'
    }
  }
};

module.exports = User;
