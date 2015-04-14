/* ==========================================================================
 * Geoffrey Chong
 * ========================================================================== */

//= require_self
//= require_tree ./modules

window.GCHONG = window.GCHONG || {};
GCHONG.IS_RESPONSIVE = true;
GCHONG.IS_EDIT = GCHONG.IS_EDIT || false;

/* Stop console.log errors */
if (typeof console === 'undefined') {
	window.console = {};
	console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {};
}

(function(NAMESPACE) {

	'use strict';

	DD.bp.options({
		breakpoints: [
			{
				name: 'xxs',
				px: 359
			},
			{
				name: 'xs',
				px: 480
			},
			{
				name: 's',
				px: 640
			},
			{
				name: 'm',
				px: 768
			},
			{
				name: 'l',
				px: 1024
			},
			{
				name: 'xl',
				px: 1244
			},
			{
				name: 'xxl',
				px: 1410
			}
		]
	});

	NAMESPACE.INIT = {
		visual: function() {
			

		},
		functional: function() {
			
		}
	};

	NAMESPACE.init = function() {
		NAMESPACE.INIT.visual();
		NAMESPACE.INIT.functional();
		NAMESPACE.triggerReady();
	};

	$(document).ready(function() {
		NAMESPACE.init();
	});

}(GCHONG));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBHZW9mZnJleSBDaG9uZ1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLy89IHJlcXVpcmVfc2VsZlxuLy89IHJlcXVpcmVfdHJlZSAuL21vZHVsZXNcblxud2luZG93LkdDSE9ORyA9IHdpbmRvdy5HQ0hPTkcgfHwge307XG5HQ0hPTkcuSVNfUkVTUE9OU0lWRSA9IHRydWU7XG5HQ0hPTkcuSVNfRURJVCA9IEdDSE9ORy5JU19FRElUIHx8IGZhbHNlO1xuXG4vKiBTdG9wIGNvbnNvbGUubG9nIGVycm9ycyAqL1xuaWYgKHR5cGVvZiBjb25zb2xlID09PSAndW5kZWZpbmVkJykge1xuXHR3aW5kb3cuY29uc29sZSA9IHt9O1xuXHRjb25zb2xlLmxvZyA9IGNvbnNvbGUuZXJyb3IgPSBjb25zb2xlLmluZm8gPSBjb25zb2xlLmRlYnVnID0gY29uc29sZS53YXJuID0gY29uc29sZS50cmFjZSA9IGNvbnNvbGUuZGlyID0gY29uc29sZS5kaXJ4bWwgPSBjb25zb2xlLmdyb3VwID0gY29uc29sZS5ncm91cEVuZCA9IGNvbnNvbGUudGltZSA9IGNvbnNvbGUudGltZUVuZCA9IGNvbnNvbGUuYXNzZXJ0ID0gY29uc29sZS5wcm9maWxlID0gZnVuY3Rpb24oKSB7fTtcbn1cblxuKGZ1bmN0aW9uKE5BTUVTUEFDRSkge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRERC5icC5vcHRpb25zKHtcblx0XHRicmVha3BvaW50czogW1xuXHRcdFx0e1xuXHRcdFx0XHRuYW1lOiAneHhzJyxcblx0XHRcdFx0cHg6IDM1OVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bmFtZTogJ3hzJyxcblx0XHRcdFx0cHg6IDQ4MFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bmFtZTogJ3MnLFxuXHRcdFx0XHRweDogNjQwXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRuYW1lOiAnbScsXG5cdFx0XHRcdHB4OiA3Njhcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdG5hbWU6ICdsJyxcblx0XHRcdFx0cHg6IDEwMjRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdG5hbWU6ICd4bCcsXG5cdFx0XHRcdHB4OiAxMjQ0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRuYW1lOiAneHhsJyxcblx0XHRcdFx0cHg6IDE0MTBcblx0XHRcdH1cblx0XHRdXG5cdH0pO1xuXG5cdE5BTUVTUEFDRS5JTklUID0ge1xuXHRcdHZpc3VhbDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcblxuXHRcdH0sXG5cdFx0ZnVuY3Rpb25hbDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcblx0XHR9XG5cdH07XG5cblx0TkFNRVNQQUNFLmluaXQgPSBmdW5jdGlvbigpIHtcblx0XHROQU1FU1BBQ0UuSU5JVC52aXN1YWwoKTtcblx0XHROQU1FU1BBQ0UuSU5JVC5mdW5jdGlvbmFsKCk7XG5cdFx0TkFNRVNQQUNFLnRyaWdnZXJSZWFkeSgpO1xuXHR9O1xuXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXHRcdE5BTUVTUEFDRS5pbml0KCk7XG5cdH0pO1xuXG59KEdDSE9ORykpO1xuIl0sImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=