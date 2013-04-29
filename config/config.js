module.exports = function(app, express){
	
	var cons    	 = require('consolidate'),
  	  swig    	 = require('swig'),
			helpers 	 = require('../app/helpers/helpers'),
			path 			 = require('path'),
			config     = {};
			
  config.swig = {
		"root" 		 	: process.cwd() + "/app/views",
		"encoding" 	: "utf-8"
	};

	config.less = {
		"src"				: process.cwd() + "/public"
	};


	//development enviroment
	app.configure('development', function(){
		//errors handling
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
		app.use(express.logger('dev'));
		//swig settings
		config.swig.cache = false;
		config.swig.allowErrors = true;
		//less settings
		config.less.force = true;
	});

	//production enviroment
	app.configure('production', function(){
		//errors handling
		app.use(express.errorHandler());
		app.use(express.logger());
		//swig settings
		config.swig.cache = true;
		config.swig.allowErrors = false;
		//less settings
		config.less.compress = true;
		config.less.optimization = 2;
	});

	//settings
	app.set('port', process.env.PORT || 3000);
	app.engine('.html', cons.swig);
	app.set('view engine', 'html');
	app.set('views', process.cwd() + '/app/views');
	swig.init(config.swig);
	app.use(express.favicon(process.cwd() + '/public/img/icons/favicon.ico')); 
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(require('less-middleware')(config.less));
	app.use(express.static(path.join(process.cwd(), 'public')));


};