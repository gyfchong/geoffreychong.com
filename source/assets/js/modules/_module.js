// Module
/* ==========================================================================
 * CONTACT MODULE
 * ========================================================================== */

(function(NAMESPACE, $) {

	'use strict';

	NAMESPACE.sections = (function() {

		var init = function() {
			var $containers = $('.o-section'),
				viewHeight = $(window).outerHeight();

			if ($containers.length) {

				$containers.each(function() {
					$(this).css({'min-height': viewHeight});
				})
			}

		};

		return {
			init: init
		};

	}());

}(GCHONG, jQuery));
