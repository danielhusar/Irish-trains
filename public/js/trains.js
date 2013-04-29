/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, indent:4, maxerr:50, multistr: true */

(function(window, document, $, undefined) {
	'use strict';

	var Trains = window.Trains = function(limit){
		this.limit = limit;
		this.loadStations();
		this.plugEvents();    
	};

	/**
	 * Plug click events
	 * @return {void}
	 */
	Trains.prototype.plugEvents = function(){

		var that = this;

		//reload
		$('[data-plugin="reload"]').on('click', function(event){
			var $this = $(this);
			that.loadStations();
			$this.addClass('rotate').on(window.helpers.transEndEventName, function() {
				$this.removeClass('rotate'); 
			});
			event.preventDefault();
		});

		//back
		$('[data-plugin="back"]').on('click', function(event){
			$('#wrap').removeClass('page-trains');
			$('#trains ul').html('');
			event.preventDefault();
		});

		//station trains
		$('#stations').on('click', '[data-station]', function(event){
			var station = $(this).data('station');
			$('#wrap').addClass('page-trains');
			$('nav h2 span').text(station);
			that.loadTrains(station.replace(/ /g, '_'));
			event.preventDefault();
		});
	};

	/**
	 * Load near stations
	 * @param  {number} limit of the stations to display
	 * @return {void}
	 */
	Trains.prototype.loadStations = function(){
		var limit = this.limit,
				$stations = $('#stations'),
				$stationsWrap = $stations.find('ul'),
				$li;

		$stations.addClass('loading');
		$stationsWrap.hide().html('');

		this.getPosition(function(position){
			$.getJSON('/json/stations/' + position.coords.latitude + '/' + position.coords.longitude, function(data){
				while(limit--){
					var station = data[limit];
					$li = $('<li />').attr('data-station', station.StationDesc)
														.html(station.StationDesc + 
																'<a href="#" class="btn btn-info btn-small"><i class="icon-white icon-circle-arrow-right"></i></a> \
																	<span>('+ Math.round(station.dist) +' km near)</span> \
																');
					$stationsWrap.prepend($li);
				}
				$stations.removeClass('loading');
				$stationsWrap.fadeIn();
			});
		});
	};

	/**
	 * Load trains by giver train station
	 * @param  {strin} station name, spaces are replaced by underscore
	 * @return {void} 
	 */
	Trains.prototype.loadTrains = function(station){
		var $trains = $('#trains'),
				$trainsWrap = $trains.find('ul'),
				$li;

		$trains.addClass('loading');
		$trainsWrap.hide().html('');

		$.getJSON('/json/trains/' + station, function(data){
			if(!!data.length){
				$.each(data, function(key, train){
					$li = $('<li />').html('<h5>'+ train.Origin +' ('+ train.Origintime +' ) - '+ train.Destination +' ('+ train.Destinationtime +')</h5> \
																	<span>Departure: '+ ((train.Schdepart !== '00:00') ? train.Schdepart : train.Expdepart) +'</span> \
																');
					$trainsWrap.append($li);

				});
			}else{
				$li = $('<li />').addClass('error')
													.html('Sorry, but theres no departures in next 90 minutes.');
				$trainsWrap.prepend($li);
			}
			$trains.removeClass('loading');
			$trainsWrap.fadeIn();
		});
	};

	/**
	 * Return the user location
	 * @param  {Function} callback function
	 * @return {void}
	 */
	Trains.prototype.getPosition = function(callback){
		navigator.geolocation.getCurrentPosition(callback);
	};

})(this, this.document, this.jQuery); 