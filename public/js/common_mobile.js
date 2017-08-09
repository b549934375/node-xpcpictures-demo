$(function() {
	var numFlag = true;
	$(window).on("scroll", function() {
        var header = $(".header-bar"),
            navWrap = $(".nav-wrap");
        if ($(this).scrollTop() > 1 && !header.hasClass('bg-color') && navWrap.outerHeight(true) == 0) {
            $(".header-bar").addClass("bg-color");
        } else if ($(this).scrollTop() <= 0 && header.hasClass('bg-color')) {
            $(".header-bar").removeClass("bg-color");
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
	// selectTitle();
 //    function selectTitle(){
 //        $(".nav-list li").each(function(){
 //            if(location.href.indexOf( $(this).find("a").attr("href")) != -1){
 //                $(this).find("a").addClass("selected");
 //            }
           
 //        })
 //    }

    $(".video-poster").on("click", function(e) {
    	if (e.target.nodeName.toLowerCase() != "video") {
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

    FastClick.attach(document.body); 
    // $(".loading").remove();
    imgPre();
    function imgPre() {
        var img = new Image();
        img.src = $("#home_imglist_ul li").eq(0).find('img').attr("src");
        img.onload = function() {
           setTimeout(function() {
               $(".loading").addClass("loading-fade");
               setTimeout(function(){
                  $(".loading").remove();
               }, 1000);

           }, 500);
        }
    }
});