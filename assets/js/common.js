$(document).ready(function (){
	var $header = $('#header');
	var $gnb=$("#gnb > ul");
	$gnb.find(" li ul").hide();	//depth2의 ul 태그는 자동으로 숨기고 시작

	//언어선택
  $('#lang button').on('mouseenter click', function () {
		var $btn = $(this);
    $(this).next().stop().slideDown().parent().addClass('active');

    $('#lang').on('mouseleave', function () {
      $(this).find('ul').stop().slideUp().parent().removeClass('active');
    });

		//언어선택이 열린채로 포커스가 나가면 닫아주자
		$(this).on('keydown', function (e) {
      if (e.shiftKey && e.keyCode === 9) $('#lang').mouseleave();
    });
    $('#lang ul li:last a').on('keydown', function (e) {
      if ( !e.shiftKey && e.keyCode === 9 ) $('#lang').mouseleave();
    });
  });

	//1)depth1 <a>에 마우스 진입:mouseenter, focus
	$gnb.find("> li > a").on("mouseenter focus",function  () {
		//초기화
		$gnb.find("> li.on").removeClass("on").children("ul").hide();
		//$header.removeClass('active');

		//현재설정
		$(this).parent().has('ul').closest($header).addClass('active');	//#header 너비의 100% 흰색바 생성을 위한 클래스명 추가
		$(this).next().show().parent().addClass("on");
	});

	//2)nav에서 마우스 떠나기:mouseleave
	$gnb.on("mouseleave",function  () {
		$header.removeClass('active');
		$gnb.find("> li.on").removeClass("on").children("ul").hide();
	});

	//3)blur: shift탭을 눌러서 gnb에서 포커스가 나가던지, 탭을 눌러 gnb에서 포커스가 나가던지, 
	$("#gnb a:first , #gnb a:last").on("blur",function  () {
		setTimeout(function  () {
			if ( !$("#gnb a").is(":focus") ) {
				$gnb.mouseleave();
			}1
		}, 10);
	});

	// top 이동
	$('.btn_top').on('click', function () {
		fullpage_api.moveTo(1); //본문1의 위치로 자동 이동시키기
		// 접근성을 위해 문서의 처음으로 포커스 강제 이동
		$('.logo a').focus();
	});
});