/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-20 12:13:56
 * @version $Id$
 */



(function(window, $) {

	$.fn.parallax = function(imgClsToAdd) {
		return this.each(function() {
			var $el = $(this);
			$el.on('layout', transform);
			var imageSrc = $el.data('image');
			$el.css({
				position: 'relative',
				overflow: 'hidden',
				zIndex: 0
			});
			var image = new Image();
			image.src = imageSrc;
			var $image = $(image);
			loadImage(image, function(err, image) {
				if (err) console.err(err);
				else {
					$(window).resize(transform);
					$(window).scroll(transform);
					transform();
				}
			});
			$image.appendTo($el).css({
				width: '100%',
				position: 'absolute',
				left: 0,
				top: 0,
				zIndex: -1
			});
			if (imgClsToAdd !== undefined) {
				$image.addClass(imgClsToAdd);
			}
			function transform() {
				if (imgClsToAdd) {
					$image = $el.find('.' + imgClsToAdd).eq(0);
				}
				var width = $image.width();
				var height = $image.height();
				var elHeight = $el.height();

				var scrollTop = $(window).scrollTop();
				var offsetTop = $el.offset().top;
				var range = window.innerHeight + elHeight;
				var translateRange = elHeight - height;

				var offset = offsetTop - scrollTop + elHeight;
				var translateY = translateRange / range * offset;
				$image.css('-webkit-transform', 'translateY(' + translateY + 'px)');
				$image.css('transform', 'translateY(' + translateY + 'px)');
				$image.css('-moz-transform', 'translateY(' + translateY + 'px)');
				$image.css('-o-transform', 'translateY(' + translateY + 'px)');
			}

	    });
	};
	function loadImage(image, callback) {
		$(image).on('error', err);
		!!image.complete ? testWhenComplete() : $(image).one('load', testWhenComplete);
		function testWhenComplete() {
			!!image.width ? callback(undefined, image) : err();
		}
		function err() {
			callback(new Error('image load error: ' + image.src));
		}
	}
})(window, $);
