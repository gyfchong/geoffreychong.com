// DDIGITAL.ready() is very similar to $(document).ready() except it waits until our main JavaScript has run
(function(NAMESPACE) {
	var stack = [],
		isReady = false;

	NAMESPACE.ready = function(callback) {
		if (typeof callback === 'function') {
			if (isReady) {
				callback();
			} else {
				stack.push(callback);
			}
		}
	};

	NAMESPACE.triggerReady = function() {
		isReady = true;

		while (stack.length) {
			stack.shift().call();
		}
	};

}(GCHONG));
