$(document).ready(function() {
	window.waitForFinalEvent = (function() {
		var timers;
		timers = {};
		return function(callback, ms, uniqueId) {
			if (!uniqueId) {
				uniqueId = 'Don\'t call this twice without a uniqueId';
			}
			if (timers[uniqueId]) {
				clearTimeout(timers[uniqueId]);
			}
			timers[uniqueId] = setTimeout(callback, ms);
		};
	})();


	var setFooterHeight = function() {
		var headerHeight = $('.page-header').outerHeight();
		var footerHeight = $('.page-footer').outerHeight();
		$('main').css({
			paddingBottom: footerHeight + 'px',
			height: 'calc(100vh - ' + headerHeight + 'px)'
		});
		$('.page-footer').css({
			marginTop: -footerHeight + 'px'
		});
	};
	setFooterHeight();

	$(window).resize(function() {
		waitForFinalEvent((function() {
			setFooterHeight();
		}), 200, '');
	});
});
