$(function() {
    var numFlag = true;
    $(window).on("scroll", function() {
        var header = $(".header-wrap");
        if ($(this).scrollTop() > 1 && !header.hasClass('bg-color')) {
            $(".header-wrap").addClass("bg-color");
        } else if ($(this).scrollTop() <=0 && header.hasClass('bg-color')) {
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
    
    // selectTitle();
    // function selectTitle() {
    //     $(".nav-list li").each(function(){
    //         var currentRouterStr = $(this).find("a").attr("href");
    //         if(currentRouterStr != "/" && location.href.indexOf(currentRouterStr) != -1){
    //             $(this).addClass("active");
    //         }
           
    //     })
    // }
    $(".video-list li .video-poster").on("click", function() {
        var _this = $(this);
        if (_this.data("mix") == 1) {
            _this.css("height", "auto").find("video").css({"zIndex": 1, "opacity": 1}).get(0).play();
            _this.find("video").on("ended", function() {
                _this.css("height", "600px").find("video").css({"zIndex": 1, "opacity": 0});
            });
        }
        else {
            var articleId = _this.data("articleid");
            var str = '<iframe src="http://www.xinpianchang.com/iframe/a'+ articleId +'?autoplay=1"  width="1066" height="600" frameborder="0" allowfullscreen=""></iframe>';
            
            $(".play-video-wrap").append(str).fadeIn();

        }
    });

    $(".play-close").on("click", function() {
        $(".play-video-wrap").fadeOut();
        $("iframe").remove();
    })

});