/* ==========================================================================
 * SCRIPT.JS
 * ========================================================================== */

window.GCHONG = window.GCHONG || {};

/* Stop console.log errors */
if (typeof console === 'undefined') {
	window.console = {};
	console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {};
}

(function(NAMESPACE, $) {

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
			NAMESPACE.easterEggs.advocate();
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

}(GCHONG, jQuery));
