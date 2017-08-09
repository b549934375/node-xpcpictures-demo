(function(window, $) {

	$.fn.creatorchange = function() {
		return this.each(function() {
			var random = Math.random() * 10; // 10s内随机开始
			var firstShowIndex = Math.floor(Math.random() * 3);
			$(this).find("a").eq(firstShowIndex).addClass("show");
			setTimeout(function() {
				changeCreator(this);
			}.bind(this), random * 1000);
	    });
	};

	function changeCreator(elem) {
		elem.index = $(elem).find(".show").index();
		var delay = 10000;  // 切换间隔时间10s
		nextShow(elem);
		elem.timer = setInterval(nextShow, delay, elem);
		$(elem).on("mouseover", function() {
			clearInterval(elem.timer);
		});
		$(elem).on("mouseout", function() {
			elem.timer = setInterval(nextShow, delay, elem);
		});
	}

	function nextShow(elem) {
		elem.index++;
		if (elem.index == $(elem).find("a").length) elem.index = 0;
		$(elem).find("a").eq(elem.index).addClass("show").siblings("a").removeClass("show");
	}
	
})(window, $);
