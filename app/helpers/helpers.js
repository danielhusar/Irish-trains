/*
 * Generate template
 * @param(res) res
 * @param(template)
 *
 */
var http = require('http'),
		parser = require('xml2json');

/**
 * template helper
 */
exports.template = function(res, template, variables){
	variables.enviroment = (process.env.NODE_ENV == 'production') ? process.env.NODE_ENV : 'development';
	res.render(template, variables);
};


/**
 * export xml to json
 */
exports.xmlToJson = function(options, callback){
	var body = '';

	http.get( options, function( response ) {
    response.addListener('end', function(data) {
    		var json = (JSON.parse(parser.toJson(body)));
    		callback(json);
    });
    response.setEncoding('utf8');
    response.on('data', function(data) {
        body += data;
    });
	});

};

/**
 * calculate distance between two points on the map
 * @param  {object} loc1 location of the first object
 * @param  {object} loc2 location of the second object
 * @return {number}      distance in kilometers
 */
exports.distance = function(loc1, loc2){

	var pi80 = Math.PI / 180,
			r = 6372.797; //radius of Earth in km

	loc1.lat *= pi80;
	loc1.lng *= pi80;
	loc2.lat *= pi80;
	loc2.lng *= pi80;


	var dlat = loc2.lat - loc1.lat,
	    dlng = loc2.lng - loc1.lng,
	    a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(loc1.lat) * Math.cos(loc2.lat) * Math.sin(dlng / 2) * Math.sin(dlng / 2),
	    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
	    km = r * c;

	return km;
};