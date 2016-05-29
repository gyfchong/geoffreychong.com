// Module
/* ==========================================================================
 * Easter Eggs
 * ========================================================================== */

(function(NAMESPACE, $) {

	'use strict';

	NAMESPACE.easterEggs = (function() {

		// Credit to Taiyo Totsuka for the idea
		var advocate = function() {
			var $displayPic = $('.js-image'),
				originalImageSrc = $displayPic.attr('src'),
				swapElements = $('[data-ee-swap]');

			swapElements.each(function() {
				var	$el = $(this),
					originalObject = { image: originalImageSrc, text: $el.text() },
					swapString = $el.data().eeSwap,
					swapObject = { image: 'assets/img/' + swapString + '.jpg', text: swapString };

					$el
						.on('mouseenter', function(){ swapTo($el, swapObject) })
						.on('mouseleave', function() { swapTo($el, originalObject) });
			});

			var swapTo = function($el,object) {
				$el.text(object.text);
				$displayPic.attr('src', object.image);
			};
		}

		return {
			advocate: advocate
		};

	}());

}(GCHONG, jQuery));
