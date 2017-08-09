$(function() {
	var numFlag = true;
	$(window).on("scroll", function() {
		if ($(this).scrollTop() > 1) {
			$(".header-wrap").addClass("bg-color");
		}
		else {
			$(".header-wrap").removeClass("bg-color");
		}
		increaseNum();
	});
	increaseNum();

	function increaseNum() {
		if ($(".data-list").length && $(window).scrollTop() + $(window).height() > $(".data-list").offset().top && $(window).scrollTop() < $(".data-list").offset().top) {
			if (numFlag) {
				$(".numincrease").increasenum();
				numFlag = false;
			}
			
		}
	}
	selectTitle();
    function selectTitle(){
        $(".nav-list li").each(function(){
            if(location.href.indexOf( $(this).find("a").attr("href")) != -1){
                $(this).find("a").addClass("selected");
            }
           
        })
    }

    $(".video-poster").on("click", function(e) {
    	if (e.target.nodeName.toLowerCase() != "video") {
    		// var videoSrc = $(this).data("videoSrc");
    		$(".video-poster").each(function(elem) {
    			if ($(this).find("video").length) {
    				$(this).find("video").remove();
    			}
    		});
    		var videoSrc = $(this).data("videosrc");
    		var video = '<video src="'+ videoSrc +'" controls="" -webkit-playsinline playsinline></video>'
    		
    		$(this).append(video).find("video").css("zIndex", 1).get(0).play();
    	}
    });

});