
/****
 * Main app logic
 */

//requires
var express  = require('express'),
  	http     = require('http'),
		helpers  = require('./app/helpers/helpers'),
		app = express(),
		config = require('./config/config')(app, express);


//require all controllers with the models
require("fs").readdirSync("./app/controllers").forEach(function(file) {
	var model;
	try{
		model = require('./app/models/' + file)(app, helpers);
	} catch(err) {
		model = false;
	}
	require('./app/controllers/' + file)(app, model, helpers);
});

//require static routes
require('./config/routes')(app, helpers);

//start server
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port: ' + port);
