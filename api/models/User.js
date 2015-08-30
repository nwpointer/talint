var User = {

  attributes: {
    username  : { type: 'string', unique: true },
    firstname : { type: 'string' },
	lastname  : { type: 'string' },
    title     : { type: 'string' },
    role      : {
        type: "string", 
        defaultsTo: "user",
        enum: ["user", "admin"] 
    },
    email     : { type: 'email',  unique: true },
    phone     : { type: 'string' },
    linkdin   : { type: 'string' },
    biography : { type: 'string', size:260 },
    availability: {type:'integer' }, //also likely to change
    location : { type: 'string' },
    // link model  
    passports : { collection: 'Passport', via: 'user' },
    skillset:{
    	model: 'skillsets'
    },
    follows: {
        collection: 'user',
        via : 'followers'
    },
    followers:{
        collection: 'user',
        via: 'follows'
    },
    fake: { 
        type: 'json',
        defaultsTo: 'fake={Skills:{"Human Resources":[{id:85 , name:"Human Resources", rank:0, min:0, max:10, unit:"/10"},{id:86 , name:"Recruitment & Talent Acquisition", rank:0, min:0, max:10, unit:"/10"},{id:87 , name:"Compensation Program Management", rank:0, min:0, max:10, unit:"/10"},],"Sales, Marketing & PR":[{id:88 , name:"Account Management", rank:0, min:0, max:10, unit:"/10"},{id:89 , name:"Customer Relationship Management (CRM)", rank:0, min:0, max:10, unit:"/10"},{id:90 , name:"Advertising", rank:0, min:0, max:10, unit:"/10"},{id:91 , name:"Public Relations", rank:0, min:0, max:10, unit:"/10"},{id:92 , name:"Sales", rank:0, min:0, max:10, unit:"/10"},{id:93 , name:"Marketing", rank:0, min:0, max:10, unit:"/10"},{id:94 , name:"Web Analytics", rank:0, min:0, max:10, unit:"/10"},],"Accounting & Finance":[{id:95 , name:"Book Keeping", rank:0, min:0, max:10, unit:"/10"},{id:96 , name:"Accounting", rank:0, min:0, max:10, unit:"/10"},{id:97 , name:"Finance", rank:0, min:0, max:10, unit:"/10"},{id:98 , name:"Public Accounting", rank:0, min:0, max:10, unit:"/10"},],"Business Administration & Management":[{id:99 , name:"Business Process Mapping", rank:0, min:0, max:10, unit:"/10"},{id:100 , name:"Enterprise Resource Planning (ERP)", rank:0, min:0, max:10, unit:"/10"},{id:101 , name:"Business Administration", rank:0, min:0, max:10, unit:"/10"},{id:102 , name:"Personnel Management", rank:0, min:0, max:10, unit:"/10"},{id:103 , name:"Program Management", rank:0, min:0, max:10, unit:"/10"},{id:104 , name:"Project Management", rank:0, min:0, max:10, unit:"/10"},{id:105 , name:"Purchasing", rank:0, min:0, max:10, unit:"/10"},],"Energy":[{id:106 , name:"Energy Management", rank:0, min:0, max:10, unit:"/10"},{id:107 , name:"Energy Program Management", rank:0, min:0, max:10, unit:"/10"},],"IT, Computer Sciences & Software Engineering":[{id:108 , name:"Web Development", rank:0, min:0, max:10, unit:"/10"},{id:109 , name:"Software Project Management", rank:0, min:0, max:10, unit:"/10"},{id:110 , name:"Databases (General)", rank:0, min:0, max:10, unit:"/10"},{id:111 , name:"Schemas (General)", rank:0, min:0, max:10, unit:"/10"},{id:112 , name:"Indexes (General)", rank:0, min:0, max:10, unit:"/10"},{id:113 , name:"Information Security", rank:0, min:0, max:10, unit:"/10"},{id:114 , name:"Mobile Application Development", rank:0, min:0, max:10, unit:"/10"},{id:115 , name:"Systems Administration", rank:0, min:0, max:10, unit:"/10"},{id:116 , name:"Software Quality Assurance (QA)", rank:0, min:0, max:10, unit:"/10"},{id:117 , name:"Enterprise Architecture", rank:0, min:0, max:10, unit:"/10"},],},Languages:[{id:0, name:"English", rank:0, unit: "/10"},{id:1, name:"Spanish", rank:0, unit: "/10"},{id:2, name:"French", rank:0, unit: "/10"},{id:3, name:"German", rank:0, unit: "/10"},{id:4, name:"Italian", rank:0, unit: "/10"},{id:5, name:"Portugese", rank:0, unit: "/10"},{id:6, name:"Arabic", rank:0, unit: "/10"},{id:7, name:"Chinese (Mandarin)", rank:0, unit: "/10"},{id:8, name:"Chinese (Cantonese)", rank:0, unit: "/10"},{id:9, name:"Japanese", rank:0, unit: "/10"},{id:10, name:"Thai", rank:0, unit: "/10"},{id:11, name:"Vietnamese", rank:0, unit: "/10"},{id:12, name:"Swedish", rank:0, unit: "/10"},{id:13, name:"Finnish", rank:0, unit: "/10"},{id:14, name:"Danish", rank:0, unit: "/10"},{id:15, name:"Dutch", rank:0, unit: "/10"},{id:16, name:"Greek", rank:0, unit: "/10"},{id:17, name:"Russian", rank:0, unit: "/10"},{id:18, name:"Hindi", rank:0, unit: "/10"},{id:19, name:"Korean", rank:0, unit: "/10"},{id:20, name:"Urdu", rank:0, unit: "/10"},{id:21, name:"Persian", rank:0, unit: "/10"},{id:22, name:"Turkish", rank:0, unit: "/10"},{id:23, name:"Polish", rank:0, unit: "/10"},{id:24, name:"Romanian", rank:0, unit: "/10"},{id:25, name:"Serbo-Croatian", rank:0, unit: "/10"},{id:26, name:"Swahili", rank:0, unit: "/10"},{id:27, name:"Nepali", rank:0, unit: "/10"},{id:28, name:"Czech", rank:0, unit: "/10"},{id:29, name:"Pashto", rank:0, unit: "/10"},{id:30, name:"Kurdish", rank:0, unit: "/10"},{id:31, name:"Hungarian", rank:0, unit: "/10"},],Industries:[{id:32, name:"Accounting & Finance", rank:0, unit:"yrs."},{id:33, name:"Agriculture", rank:0, unit:"yrs."},{id:34, name:"Aviation or Aerospace", rank:0, unit:"yrs."},{id:35, name:"Banking", rank:0, unit:"yrs."},{id:36, name:"Biomedical", rank:0, unit:"yrs."},{id:37, name:"Biotechnology", rank:0, unit:"yrs."},{id:38, name:"Chemical", rank:0, unit:"yrs."},{id:39, name:"Civil Engineering", rank:0, unit:"yrs."},{id:40, name:"Clothing & Accessories", rank:0, unit:"yrs."},{id:41, name:"Communications", rank:0, unit:"yrs."},{id:42, name:"Computer Hardware", rank:0, unit:"yrs."},{id:43, name:"Constrution", rank:0, unit:"yrs."},{id:44, name:"Consulting", rank:0, unit:"yrs."},{id:45, name:"Consumer Electronics", rank:0, unit:"yrs."},{id:46, name:"Education (K-12)", rank:0, unit:"yrs."},{id:47, name:"Energy", rank:0, unit:"yrs."},{id:48, name:"Entertainment", rank:0, unit:"yrs."},{id:49, name:"Food & Beverage Service", rank:0, unit:"yrs."},{id:50, name:"Gaming and Digital Entertainment", rank:0, unit:"yrs."},{id:51, name:"Government", rank:0, unit:"yrs."},{id:52, name:"Health Care", rank:0, unit:"yrs."},{id:53, name:"Health Insurance", rank:0, unit:"yrs."},{id:54, name:"Hospitality", rank:0, unit:"yrs."},{id:55, name:"Industrial Engineering", rank:0, unit:"yrs."},{id:56, name:"Insurance", rank:0, unit:"yrs."},{id:57, name:"IT", rank:0, unit:"yrs."},{id:58, name:"Law enforcement", rank:0, unit:"yrs."},{id:59, name:"Legal", rank:0, unit:"yrs."},{id:60, name:"Management Consulting", rank:0, unit:"yrs."},{id:61, name:"Manufacturing", rank:0, unit:"yrs."},{id:62, name:"Mechanical Engineering", rank:0, unit:"yrs."},{id:63, name:"Media", rank:0, unit:"yrs."},{id:64, name:"Mental Health", rank:0, unit:"yrs."},{id:65, name:"Military", rank:0, unit:"yrs."},{id:66, name:"Real Estate", rank:0, unit:"yrs."},{id:67, name:"Restaurant", rank:0, unit:"yrs."},{id:68, name:"Shipping", rank:0, unit:"yrs."},{id:69, name:"Software", rank:0, unit:"yrs."},{id:70, name:"Sports & Outdoors", rank:0, unit:"yrs."},{id:71, name:"Telecommunications", rank:0, unit:"yrs."},{id:72, name:"Transportation", rank:0, unit:"yrs."},{id:73, name:"Utilities", rank:0, unit:"yrs."},{id:74, name:"Vetinary", rank:0, unit:"yrs."},],Education:[{id:75, name:"GED", rank:0, min:0, max:1, unit:""},{id:76, name:"High School", rank:0, min:0, max:1, unit:""},{id:77, name:"Associates", rank:0, min:0, max:1, unit:""},{id:78, name:"Bachelors", rank:0, min:0, max:1, unit:""},{id:79, name:"PhD", rank:0, min:0, max:1, unit:""},{id:80, name:"Masters", rank:0, min:0, max:1, unit:""},{id:81, name:"MD", rank:0, min:0, max:1, unit:""},],Training:[{id:82, name:"ID8", rank:0, min:0, max:1, unit:""},{id:83, name:"RAIN", rank:0, min:0, max:1, unit:""},{id:84, name:"Other accellerator", rank:0, min:0, max:1, unit:""}]}'
    },
    savedSearches:{
        type: 'json',
        defaultsTo: '[]'
    }
  }
};

module.exports = User;
