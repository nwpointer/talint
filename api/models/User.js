var User = {

  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' },
    skillset:{
    	model: 'skillsets'
    }
  }
};

module.exports = User;
