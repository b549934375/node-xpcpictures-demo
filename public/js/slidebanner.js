//获取头部幻灯的ul
var home_imglist_ul = document.getElementById("home_imglist_ul");
//获取头部幻灯ul下的所有li
var home_imglists = home_imglist_ul.getElementsByTagName("li");
//点控
var dot_control = document.getElementById("dot_control");
//获取幻灯左边点击按钮
var prevBtn = document.getElementById("prevBtn");
//获取幻灯右边点击按钮
var nextBtn = document.getElementById("nextBtn");
//获取移动端头部导航按钮
var navbarToggleBtn = document.getElementById("navbarToggleBtn");
//设置移动端导航按钮点击状态标志
var flagNavbarToggleBtn = true;

// imgPre();
// function imgPre(){
// 	var $img = $(home_imglist_ul).find("img");
// 	var imgNum =  $img.length, i = 0;
// 	$img.each(function(){
// 		var img = new Image();
// 		img.src = $(this).attr("src");
// 		img.onload = function(){
// 		  i++;
// 		  // console.log(i,imgNum);
// 		  if(i >= imgNum){
// 		    	render();
// 		   }
// 		}
// 	});
// }
		/*
	 * 动态添加点控
	 * 根据幻灯的张数，添加点控的数量
	 * <li id="0" class=" " onclick="dotControl(this.id)"></li>
	 */
	var liStringBuf = "";
	for(var i = 0; i < home_imglists.length; i++){
		liStringBuf = liStringBuf + '<li id="'+i+'" class="" onclick="dotControl(this.id)"></li>';
	}
	//为点控ol添li子内容
	dot_control.innerHTML = liStringBuf;


	//第一个点控制为active状态
	dot_control.getElementsByTagName("li")[0].classList.add("dot_control_active");

	/*全局定时器第一 
	 * timerSlide = setInterval("nextSlide()",6000);
	 * timerNumberAdd = setInterval("numberAdd(30, 17, 8)",60);
	 */
	var timerSlide = null;
	var timerNumberAdd = null;

	//为幻灯右边点击按钮添加点击事件
	nextBtn.onclick = nextSlide;

	//nextSlide() 切换幻灯片
	function nextSlide(){
		//清除定时器
		clearInterval(timerSlide);
		
		var current = null;
		//找到当前显示的是哪一张幻灯
		for(var i = 0; i < home_imglists.length; i++){
			if(home_imglists[i].className == ("slideActive")){
				current = i;
			}
		}//for
		
		/*
		 * 实现幻灯的切换
		 * 如果当前页是最后一页，则下一页是第一页（从头开始）
		 * 对应的点控为active状态
		 */
		if(current == home_imglists.length-1){
			//out
			home_imglists[current].className = "slideItem";
			home_imglists[current].getElementsByTagName("div")[1].className = "slogan-wrap content_hidden";
			dot_control.getElementsByTagName("li")[current].classList.remove("dot_control_active");
			//in
			home_imglists[0].className ="slideActive";
			home_imglists[0].getElementsByTagName("div")[1].className = "slogan-wrap content_active";
			dot_control.getElementsByTagName("li")[0].classList.add("dot_control_active");
		}else{
			//out
			home_imglists[current].className = "slideItem";
			home_imglists[current].getElementsByTagName("div")[1].className = "slogan-wrap content_hidden";
			dot_control.getElementsByTagName("li")[current].classList.remove("dot_control_active");
			//in
			home_imglists[current+1].className = "slideActive";
			home_imglists[current+1].getElementsByTagName("div")[1].className = "slogan-wrap content_active";
			dot_control.getElementsByTagName("li")[current+1].classList.add("dot_control_active");
		}
		
		//重新启用定时器执行更换幻灯
		timerSlide = setInterval("nextSlide()",6000);
		
	}  //nextSlide() end

	//为幻灯左边按钮添加点击事件
	prevBtn.onclick = prevSlide;

	//向前切换一张幻灯
	function prevSlide(){
		//清除定时器
		clearInterval(timerSlide);
		
		var current = null;
		//找到当前显示的是哪一张幻灯
		for(var i = 0; i < home_imglists.length; i++){
			if(home_imglists[i].className == ("slideActive")){
				current = i;
			}
		}//for
		
		/*
		 * 实现幻灯的切换
		 * 如果当前页是最后一页，则下一页是第一页（从头开始）
		 * 对应的点控为active状态
		 */
		if(current == 0){
			//out
			home_imglists[current].className = "slideItem";
			home_imglists[current].getElementsByTagName("div")[1].className = "slogan-wrap content_hidden";
			dot_control.getElementsByTagName("li")[current].classList.remove("dot_control_active");
			//in
			home_imglists[home_imglists.length-1].className ="slideActive";
			home_imglists[home_imglists.length-1].getElementsByTagName("div")[1].className = "slogan-wrap content_active";
			dot_control.getElementsByTagName("li")[home_imglists.length-1].classList.add("dot_control_active");
		}else{
			//out
			home_imglists[current].className = "slideItem";
			home_imglists[current].getElementsByTagName("div")[1].className = "slogan-wrap content_hidden";
			dot_control.getElementsByTagName("li")[current].classList.remove("dot_control_active");
			//in
			home_imglists[current-1].className = "slideActive";
			home_imglists[current-1].getElementsByTagName("div")[1].className = "slogan-wrap content_active";
			dot_control.getElementsByTagName("li")[current-1].classList.add("dot_control_active");
		}
		
		//重新启用定时器执行更换幻灯
		timerSlide = setInterval("nextSlide()",6000);
		
	}//prevBtn.onclick end

	/*
		添加鼠标移到幻灯上是，幻灯停止切换，移开后又开始重新计时开始切换

	home_imglist_ul.addEventListener('mouseover', function(event){
		//清除定时器
		clearInterval(timerSlide);
	});
	home_imglist_ul.addEventListener('mouseout', function(event){
		//重新启用定时器执行更换幻灯
		timerSlide = setInterval("nextSlide()",1000);
		// nextSlide();
	});
	*/

	//addNumber() 实现数字增加
	function numberAdd(endMemberNum, endWorksNum, endSkillsNum){
		//获取features_title_members所在的元素
		var membersStartNum = document.getElementById("features_title_members").innerHTML;
		//获取features_title_works所在的元素
		var worksStartNum = document.getElementById("features_title_works").innerHTML;
		//获取features_title_skills所在的元素
		var skillsStartNum = document.getElementById("features_title_skills").innerHTML;
		
		//判断features_title_members内的数字是否达到endMemberNum，如果数字增加到endMemberNum时停止增加
		if(membersStartNum < endMemberNum){
			membersStartNum++;
			document.getElementById("features_title_members").innerHTML = membersStartNum;
		}
		
		//判断features_title_works内的数字是否达到endWorksNum，如果数字增加到endWorksNum时停止增加
		if(worksStartNum < endWorksNum){
			worksStartNum++;
			document.getElementById("features_title_works").innerHTML = worksStartNum;
		}
		
		//判断features_title_skills内的数字是否达到endSkillsNum，如果数字增加到endSkillsNum时停止增加
		if(skillsStartNum < endSkillsNum){
			skillsStartNum++;
			document.getElementById("features_title_skills").innerHTML = skillsStartNum;
		}
		
	}//numberAdd() end


	//dotControl()点击事假
	function dotControl(id){
		//清除定时器
		clearInterval(timerSlide);
		var current = null;
		//找到当前显示的是哪一张幻灯
		for(var i = 0; i < home_imglists.length; i++){
			if(home_imglists[i].className == ("slideActive")){
				current = i;
			}
		}//for
		//out
		home_imglists[current].className = "slideItem";
		home_imglists[current].getElementsByTagName("div")[1].className = "slogan-wrap content_hidden";
		dot_control.getElementsByTagName("li")[current].classList.remove("dot_control_active");
		
		//in
		home_imglists[id].className = "slideActive";
		home_imglists[id].getElementsByTagName("div")[1].className = "slogan-wrap content_active";
		dot_control.getElementsByTagName("li")[id].classList.add("dot_control_active");
		
		//重新启用定时器执行更换幻灯
		timerSlide = setInterval("nextSlide()",6000);
	}

	/*顶部导航平滑滚动
	 */
	 window.onload = function() {
	 	timerSlide = setInterval("nextSlide()",6000);
	 }














