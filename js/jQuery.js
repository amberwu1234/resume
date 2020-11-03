$(function(){
    
    window.onload = function(){ 
        $('.loading').fadeOut(1500);
    }

  /*漢堡選單互動區------------------------------*/
    /*選單出現------------*/
    $('.control').click(function(){
        $('.navMain').toggleClass('active');
    })

      /*漢堡選單圖示變化---------------*/
    $('.control').click(function(){
        $(this).children('span').toggleClass('active');

        /*選單出現後，其他頁面被色塊覆蓋*/
        $('.headerMain').toggleClass('active');
    })


    $('.menuMain > li > a').click(function(){
        /*點選父曾項目，展開子層，其他未點選的子層關閉---------------*/
        $(this).parent().children().addClass('active').parent().siblings().children().removeClass('active');

        /*點選父層的項目變色，其他無點選的取消變色---------------*/
        $(this).addClass('active').parent().siblings().children().removeClass('active');
    })
    

    $('.menuSub > li > a').click(function(){
        $(this).addClass('active').parent().siblings().children().removeClass('active');
    })


    /*PC選單互動區-------------------*/
    $('.menuMain > li').hover(
        function () {
            /*滑鼠觸碰父選單，父選單裝飾出現，以及子選單出現*/
            $(this).children().addClass('activePC').parent().siblings().children().removeClass('activePC');
        },
        function () {
            /*滑鼠離開觸碰父選單，子選單消失*/
            /*滑鼠離開觸碰父選單，父選單裝飾消失*/
            $(this).children('.menuSub').removeClass('activePC');
            $(this).children('a').removeClass('activePC');
        }
    );
    
    
    /*scroll事件-------------------*/
    $(window).scroll(function(){
        let nowPostion = $(window).scrollTop();
        /*PC選單scroll事件，.headerMain背景色漸變------------*/
        if( nowPostion > 0){
            $('.headerMain').addClass('activePC');
        }else{
            $('.headerMain').removeClass('activePC');
        }

        /*回到最上方按鈕-------------------------------*/
        if(nowPostion >= 1000){
            $('.scrollTopButton').addClass('activeScroll');
        }else{
            $('.scrollTopButton').removeClass('activeScroll');
        }

        $('.scrollTopButton').click(function(){
            $(this).addClass('active');
            $('html,body').stop().animate({scrollTop: 0 },1000)
            $(this).removeClass('active');
        })
    })

    
    /*圖片輪播slider區域-----------------------------------*/
    let imagesArray = [
        "pic/photo/a1.jpg",
        "pic/photo/a2.jpg",
        "pic/photo/a3.jpg",
        "pic/photo/a4.jpg"
    ];

    let imageSum = imagesArray.length;

    /*圓點的索引值*/
    let dotIdx = 0; 

    // 使圓點數量與輪播總數相同
    $('.dot').append('<li></li>'.repeat(imageSum));
    
    /*圓點起始值*/
    $('.dot li').eq(0).addClass('active') ;

    console.log(dotIdx)


    $('.dot li').click(function(){
        dotIdx = $(this).index(); /*圓點的索引值*/
        move()
    })


    $('.bannerMain .arrowNext').click(function(){
        dotIdx++;
        move()
    })

    $('.bannerMain .arrowPrev').click(function(){
        if( dotIdx <= 0 ){
            dotIdx = imageSum;
        }
        dotIdx--;
        move()
    })

    function move(){
        if( dotIdx >= imageSum ){
            dotIdx = 0;
        }

        $('.slider').css({
            "background-image" : "url( '"+imagesArray[dotIdx]+ "' )"
        })

        $('.dot li').eq(dotIdx).addClass('active').siblings().removeClass('active');  
    }

    /*自動撥放/停止設定-----------------------*/
    timeGo();
    function timeGo(){
        timeAuto = setInterval(function(){
            if( dotIdx < imageSum ){
                dotIdx++;
            }else{
                dotIdx = 0;
            }
            move()
        },3500);
    }



});


