(function() {
	var ie = (function() {
			var undef,
				v = 3,
				div = document.createElement('div'),
				all = div.getElementsByTagName('i');

			while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);

			return v > 4 ? v : undef;
		}()),
		htmlElement = document.documentElement;

	if (ie) { htmlElement.className += ' is-ie'; }
	if (ie < 8) { htmlElement.className += ' lt-ie8'; }
	if (ie < 9) { htmlElement.className += ' lt-ie9'; }
	if (ie < 10) { htmlElement.className += ' lt-ie10'; }

	if (/MSIE 10/i.test(navigator.userAgent)) {
		htmlElement.className += ' is-ie is-ie10';
	}

	if (/rv:11.0/i.test(navigator.userAgent)) {
		htmlElement.className += ' is-ie is-ie11';
	}
}());
