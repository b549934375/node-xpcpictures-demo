(function(window, $) {

	$.fn.increasenum = function(speed) {
		return this.each(function() {
			var startnum = $(this).data('startnum');
			var endnum = $(this).data('endnum');
			increase(this, startnum, endnum, speed ? speed : 20);

	    });
	};

	function increase(elem, startnum, endnum, speed) {
		elem.timer = setInterval(function() {
			if (startnum != endnum) {
				startnum++;
				$(elem).html(startnum);
			}
			else {
				clearInterval(elem.timer);
			}

		}, speed);
	}
})(window, $);
