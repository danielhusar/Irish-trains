/**
	FEEDS FROM IRISH TRAIN API
**/

/**
 * Main controller for the admin section
 * @param  {object} app     app object
 * @param  {object} model   model object that belong to the current controller
 * @param  {object} helpers helpers object
 * @return {void} 
 */

var _ = require('underscore'),
		options = {
			host: 'api.irishrail.ie',
			port: 80
		};

module.exports = function(app, model, helpers){

	app.get('/json/stations/:lat/:lng', function(req, res){

		options.path = '/realtime/realtime.asmx/getAllStationsXML';
		helpers.xmlToJson(options, function(data){
			var stations = data.ArrayOfObjStation.objStation || [],
					length = stations.length;

			while (length--) {
				station = stations[length];
				stations[length].dist = helpers.distance({
																									lat: req.params.lat, 
																									lng:  req.params.lng
																								 }, 
																								 {
																									lat: station.StationLatitude, 
																									lng: station.StationLongitude
																								 });
			}

			stations = _.sortBy(stations, function(station){ 
				return station.dist; 
			});

			res.writeHead(200, {'Content-Type': 'application/json'});
			res.write(JSON.stringify(stations) || '');
			res.end();
		});

	});


	app.get('/json/trains/:station', function(req, res){

		options.path = '/realtime/realtime.asmx/getStationDataByNameXML?StationDesc=' + req.params.station.replace(/_/g, '%20');
		helpers.xmlToJson(options, function(data){
			var trains = data.ArrayOfObjStationData.objStationData || [];
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.write(JSON.stringify(trains) || '');
			res.end();
		});

	});

};