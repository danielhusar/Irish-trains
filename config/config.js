module.exports = function(app, express){

	var cons = require('consolidate'),
			swig = require('swig'),
			helpers = require('../app/helpers/helpers'),
			path = require('path');

	//settings
	app.engine('html', swig.renderFile);
	app.set('view engine', 'html');
	app.set('views',process.cwd() + "/app/views");
	app.use(express.logger('dev'));
	app.use(app.router);
	app.use(require('less-middleware')(process.cwd() + '/public'));
	app.use(express.static(path.join(process.cwd(), 'public')));

};