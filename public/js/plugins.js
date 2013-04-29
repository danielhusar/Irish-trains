(function() {

	var helpers = window.helpers = {};
	var transEndEventNames = { 
		'WebkitTransition': 'webkitTransitionEnd', 
		'MozTransition': 'transitionend', 
		'OTransition': 'oTransitionEnd', 
		'msTransition': 'MSTransitionEnd', 
		'transition': 'transitionend' 
	}; 

	helpers.transEndEventName = transEndEventNames[Modernizr.prefixed('transition')];

	var method;
	var noop = function () {};
	var methods = [
			'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
			'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
			'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
			'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
			method = methods[length];

			// Only stub undefined methods.
			if (!console[method]) {
					console[method] = noop;
			}
	}
	
}());