var nodemailer = require('nodemailer');
var striptags = require('striptags');

module.exports.nodemailer = nodemailer;

transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'nwpointer@gmail.com',
        pass: 'RNs1120!!'
    }
});

module.exports = {
	lib:nodemailer,
	transporter: transporter,
	send: function (options, cb) {
		this.transporter.sendMail(options,cb);
	},

	render: function(view, data, mailOptions, cb){
		data.layout = sails.config.paths.layout + "/email.handlebars";
		sails.hooks.views.render(view, data, function(err, html){
			// mailOptions.text = striptags(html); // plaintext body striptags(html)
  			mailOptions.html = html; // html body
			email.send(mailOptions, function(err, info){
				if(err){
					throw err;
				}
				cb(info); 
			});
		});
	}
};