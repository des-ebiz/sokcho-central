$(function () {
    //함수실행
    comFn();
    
    //메인에서만 배경 체인지
    if( $('body').hasClass('Main') ){
        sliderFn();
    }
    
    $(window).load(function() {
        //푸드 높이값 지정
        if( $('body').hasClass('Food') ){
            foodFn();
        }
        
        //리사이즈
        $(window).resize(function() {
            comFn();
            if( $('body').hasClass('Main') ){
                viewFn();
                menuFn();
            }else if( $('body').hasClass('Food') ){
                foodFn();
            }

        }).resize();
    });
});

//common
function comFn(){
    var ht = $(window).height();
    var menuH = $(".header").outerHeight();
    var content = $(".contents");
    var mainVisual = $(".Main .bg-visual");
    var visualTxt = $('.visual-txt');
    var visualTxtH = visualTxt.height();
    
    mainVisual.css({'height' : (ht/2) +'px'});	
    content.css({'margin-top' : menuH +'px'});	
    visualTxt.css({'margin-top' : -(visualTxtH/2) +'px'});
    
    if( $('.wrapper div').hasClass('topbn-wrap') ){
        //console.log('yes')
        var topBn = $('.topbn-wrap').height();
        
        scrollHd(topBn);
        
        $(window).scroll(function(){
            scrollHd(topBn);
        });
    }else{
        
    }
}

function scrollHd(topBn){
    $(".header").css({'margin-top' : topBn +'px'});
    
    if ( $(window).scrollTop() <= topBn ) {
        $(".header").css({'position' : 'absolute', 'padding-top' : '0'});
        $('.topbn-wrap').css({'position' : 'relative'});
    }else{
        $(".header").css({'position' : 'fixed', 'padding-top' : '0'});
        $('.topbn-wrap').css({'position' : 'fixed'});
    }
}

//메뉴
function menuFn(){
    var ht = $(window).height();
    var menuH = $(".header").height();
    var visualH = $(".visual").height();
    var topBnH = $('.topbn-wrap').height();
    var menu = $('.menu li');
    var contents = $('.scr-move');
    var mainTop = $('.header .logo a'); 
    var time = 1000;
    
    menu.find('a').on('click', function(e){
        if( $(this).parent().hasClass('page-move') ){
            //console.log('page move')
        }else{
            e.preventDefault();
            var target = $(this).attr('href');
            var offsetTop = $(target).offset().top;

            $('html, body').stop().animate({
                scrollTop : (offsetTop-(menuH+topBnH))
            }, time);

            return false;
        }
    });

    //scroll menu class
    $(window).scroll(function(){
        var scltop = $(window).scrollTop();
        
        $.each(contents, function(idx, item){
            var target = contents.eq(idx);
            var i = target.index();
            var targetTop = target.offset().top;
            var menuHT = menuH+topBnH+1; 
            
            if ( scltop < (visualH-topBnH) ) {
                menu.removeClass('on'); 
                //console.log(visualH)
            }
            if ( (targetTop-menuHT) <= scltop ) {
                menu.removeClass('on');
                $('.menu li.itme-'+(idx+1)).addClass('on');
            }
            //console.log(scltop, targetTop)
        })

    });
    
    //top
    mainTop.on('click', function(e){
        e.preventDefault();
        $("html, body").stop().animate({
            scrollTop : 0
        }, time);
    });

};

//메인 비주얼
function sliderFn() {
    var slider = $(".visual .bg-visual");
    slider.bxSlider({
        mode: 'fade',
        auto: true,
        autoControls: false,
        pager: false,
        speed: 800,
        duration: 5000
    });

}

//view function
function viewFn(){
    var viewTxt = $('.Main .view .area .list > li dl dd');
    var viewTxtLen = viewTxt.length;
    var viewTxtH = [], viewTxtMaxH = 0;
    
    viewTxt.css({'height' : 'auto'});
    
    //배열로받기
    for( var i = 0 ; i < viewTxtLen ; i++ ){
        viewTxtH[i] = viewTxt.eq(i).height();
    }
    
    //값
    viewTxtMaxH = viewTxtH[0];
    for( var i = 0 ; i < viewTxtH.length ; i++ ){
        if (viewTxtMaxH < viewTxtH[i]) {
            viewTxtMaxH = viewTxtH[i];
        }
    }
        
    //console.log(viewTxtH, viewTxtMaxH)
    viewTxt.css({'height' : viewTxtMaxH+'px'});
}

//food Function
function foodFn(){
    
    //텍스트 높이값 동일하게
    var maxLiH = 0;
    var foodList = $('.food-list-box .list li dd > p');
    var foodListLen = foodList.length;
    
    for( var i = 0 ; i < foodListLen ; i++ ){
        //console.log($('.food-list-box .list li:nth-child('+ (i+1) +') dd > p').height())
        if( i == 0 ){
                foodList.css({'height' : 'auto'});
                //console.log(tourConLi.find('.txt-box').height())
        }else{
            if( maxLiH <=  $('.food-list-box .list li:nth-child('+ (i+1) +') dd > p').height() ){
                maxLiH = $('.food-list-box .list li:nth-child('+ (i+1) +') dd > p').height()
            }
        }
    }
    foodList.css({'height' : maxLiH + 'px'});
    //console.log(maxLiH)
    maxLiH = 0;
}




