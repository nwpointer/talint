var Handlebars=require('sails/node_modules/express-handlebars/node_modules/handlebars');

var sanitize = function(field){
	return Handlebars.escapeExpression(field);
};

var echo = function(str){
	return new Handlebars.SafeString(str);
};

var link = function(text, url){
	url = sanitize(url);
	text = sanitize(text);

	return echo("<a href='" + url + "'>" + text + "</a>");
};

Handlebars.registerHelper('link', function(text, url){
	return link(text, url);
});

Handlebars.registerHelper('profile', function(text, id) {
  return link(text, "/users/"+id);
});

Handlebars.registerHelper('get', function(obj, attr){
	return obj[attr];
});

Handlebars.registerHelper('json', function(obj) {
    return eval(obj);
});


Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

    var operators, result;
    
    if (arguments.length < 3) {
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    }
    
    if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
    }
    
    operators = {
        '==': function (l, r) { return l == r; },
        '===': function (l, r) { return l === r; },
        '!=': function (l, r) { return l != r; },
        '!==': function (l, r) { return l !== r; },
        '<': function (l, r) { return l < r; },
        '>': function (l, r) { return l > r; },
        '<=': function (l, r) { return l <= r; },
        '>=': function (l, r) { return l >= r; },
        'typeof': function (l, r) { return typeof l == r; }
    };
    
    if (!operators[operator]) {
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
    }
    
    result = operators[operator](lvalue, rvalue);
    
    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});