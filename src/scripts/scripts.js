$(function(){

    // 延迟加载
    if($('.pic-lazy').get(0)){
        $("img.lazy").lazyload({
            placeholder : "images/gray.gif", //用图片提前占位
                // placeholder,值为某一图片路径.此图片用来占据将要加载的图片的位置,待图片加载时,占位图则会隐藏
            effect: "fadeIn", // 载入使用何种效果
                // effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
            threshold: 200, // 提前开始加载
                // threshold,值为数字,代表页面高度.如设置为200,表示滚动条在离目标位置还有200的高度时就开始加载图片,可以做到不让用户察觉
            failurelimit : 10 // 图片排序混乱时
                // failurelimit,值为数字.lazyload默认在找到第一张不在可见区域里的图片时则不再继续加载,但当HTML容器混乱的时候可能出现可见区域内图片并没加载出来的情况,failurelimit意在加载N张可见区域外的图片,以避免出现这个问题.
        });
    }

    // 首页轮播和导航
    if($('.dfth-index').get(0)){
        $('.slides-banner').slidesjs({
            width: 984,
            height: 385,
            play: {
                auto: true,
                interval: 4000,
                swap: true
            },
            callback: {
                loaded: function(number) {
                },
                start: function(number) {
                    $('.slides-banner').find('.slidesjs-slide').eq(number-1).find('img').lazyload({effect: "fadeIn"});
                },
                complete: function(number) {
                }
            }
        });

        $('.slides-pro').slidesjs({
            width: 990,
            height: 430,
            play: {
                auto: true,
                interval: 40000,
                swap: true
            },
            callback: {
                loaded: function(number) {
                    $('.slidesjs-navigation').text('');
                    $('.slidesjs-previous').append(`<img class="slides-arrwo vm" src="images/arrow-left1.png" alt="">`);
                    $('.slidesjs-next').append(`<img class="slides-arrwo vm" src="images/arrow-right3.png" alt="">`);
                },
                start: function(number) {
                    $('.slides-pro').find('.slidesjs-slide').eq(number-1).find('img').lazyload({effect: "fadeIn"});
                },
                complete: function(number) {
                }
            }
        });

        $('.slidesjs-pagination-item').on('click',function(){
            $(".slidesjs-slide").find('img').lazyload({effect: "fadeIn"});
        });

        var bannerTop = $('.banner').height();
        $(window).scroll(function () {
            let w = $(window).scrollTop();
            if (w >= bannerTop) {
                    $(".navigation").addClass('nav-on');
                } else {
                    $(".navigation").removeClass('nav-on');
                }
        }).trigger("scroll");
    }

    if($('.dfth-art').get(0)){
        $('.slides-photo').slidesjs({
            width: 990,
            height: 430,
            play: {
                auto: true,
                interval: 40000,
                swap: true
            },
            callback: {
                loaded: function(number) {
                    $('.slidesjs-navigation').text('');
                    $('.slidesjs-previous').append(`<img class="slides-arrwo vm" src="images/arrow-left1.png" alt="">`);
                    $('.slidesjs-next').append(`<img class="slides-arrwo vm" src="images/arrow-right3.png" alt="">`);
                },
                start: function(number) {
                    $('.slides-photo').find('.slidesjs-slide').eq(number-1).find('img').lazyload({effect: "fadeIn"});
                },
                complete: function(number) {
                }
            }
        });
    }
    
    indexTab();
});

// 首页切换
function indexTab(){
    let tab = $('#j_tab');
    $('.hd-list').on('click',function(){
        let o = $(this);
        let oindex = o.index();
        let os = o.siblings();
        os.removeClass('on');
        o.addClass('on');
        $('.item').eq(oindex).removeClass('hide');
        $('.item').eq(oindex).siblings().addClass('hide');
        $('.item').eq(oindex).find('img').lazyload({effect: "fadeIn"});
    });
}
