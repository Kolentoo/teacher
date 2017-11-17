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

    // 轮播和导航
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

        let bannerTop = $('.banner').height();
        $(window).scroll( ()=> {
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
                interval: 4000,
                swap: true
            },
            callback: {
                loaded: function(number) {
                    $('.slides-photo').find('.slidesjs-navigation').text('');
                    $('.slides-photo').find('.slidesjs-previous').append(`<img class="slides-arrwo vm" src="images/arrow-left1.png" alt="">`);
                    $('.slides-photo').find('.slidesjs-next').append(`<img class="slides-arrwo vm" src="images/arrow-right3.png" alt="">`);
                },
                start: function(number) {
                    $('.slides-photo').find('.slidesjs-slide').eq(number-1).find('img').lazyload({effect: "fadeIn"});
                },
                complete: function(number) {
                }
            }
        });

        // 动画效果
        $('.listen-con').addClass('listen-on');
    }

    if($('.swiper-enviroment').get(0)){
        let prependNumber = 1;
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 5,	
            centeredSlides: true,
            paginationClickable: true,
            spaceBetween: 25,
            loop: true,
            freeMode: true,
            autoplay: 4000
        });
    }

    $('.back').on('click',()=>{
        $('body,html').animate({scrollTop:0},1000);
    });

    var bannerTop = $('.banner').height();
    $(window).scroll( ()=> {
        let w = $(window).scrollTop();
        if (w >= bannerTop) {
                $(".back").addClass('back-on');
            } else {
                $(".back").removeClass('back-on');
            }
    }).trigger("scroll");
    
    webTab(); 
    commonTop();
    commonBottom();
    timeCatch();
});

// 全局tab切换
function webTab(){
    $('.hd-list').on('click',()=>{
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

// 全局头部
function commonTop(){
    if($('.common-top').get(0)){
        $('.common-top').append(
            `<div class="menu-box clearfix">
                <a href="" class="logo block fl"><img class="vm g10" src="images/logo.png" alt=""></a>
                <ul class="menu-con clearfix">
                    <li class="menu-list fl"><a href="">首页</a></li>
                    <li class="menu-list fl"><a href="">美术教育</a></li>
                    <li class="menu-list fl"><a href="">授权合作</a></li>
                    <li class="menu-list fl"><a href="">创艺产品</a></li>
                    <li class="menu-list fl"><a href="">在线画廊</a></li>
                    <li class="menu-list fl"><a href="">品牌故事</a></li>
                    <li class="menu-list fl"><a href="">加入我们</a></li>
                    <li class="menu-list fl"><a href="">校区查询</a></li>
                    <li class="menu-list fl"><a href="">学员中心</a></li>
                </ul>
            </div>`
        );
    }
}

// 全局底部
function commonBottom(){
    if($('.bottom').get(0)){
        $('.bottom').append(
            `<div class="bottom-inner">
                <div class="bottom-con clearfix">
                    <div class="bottom-menu clearfix fl">
                        <ul class="menu-con fl">
                            <li class="menu-list first"><a href="">美术教育</a></li>
                            <li class="menu-list"><a href="">主修课程</a></li>
                            <li class="menu-list"><a href="">辅修课程</a></li>
                            <li class="menu-list"><a href="">辅修课程</a></li>
                            <li class="menu-list"><a href="">师资查询</a></li>
                        </ul>
                        <ul class="menu-con fl">
                            <li class="menu-list first"><a href="">创艺产品</a></li>
                            <li class="menu-list"><a href="">涂鸦涂本</a></li>
                            <li class="menu-list"><a href="">画笔画材</a></li>
                            <li class="menu-list"><a href="">超级粘土</a></li>
                            <li class="menu-list"><a href="">创艺宝盒</a></li>
                            <li class="menu-list"><a href="">DIY手工</a></li>
                        </ul>
                        <ul class="menu-con fl">
                            <li class="menu-list first"><a href="">公司</a></li>
                            <li class="menu-list"><a href="">校区查询</a></li>
                            <li class="menu-list"><a href="">品牌故事</a></li>
                            <li class="menu-list"><a href="">加入我们</a></li>
                            <li class="menu-list"><a href="">新闻动态</a></li>
                        </ul>
                    </div>
                    <div class="company-detail fr clearfix">
                        <p class="phone">400-895-6006</p>
                        <p class="address">徐汇区 吴兴路 281号紫江大厦 3楼（总部）</p>
                    </div>
                </div>
            </div>
            <div class="bottom-other clearfix">
                <p class="p1 fl">办学许可证：教民3101037020118号 沪ICP备08111589号<em>版权所有 上海凌尓艺文化传播有限公司</em></p>
                <div class="share fr">
                    <a href=""><img class="share-icon vm" src="images/wechat.png" alt=""></a>
                    <i>|</i>
                    <a href=""><img class="share-icon vm" src="images/weibo.png" alt=""></a>
                </div>
            </div>`
        );
    }
}

// 手机号验证
function check(a) {
    let regPhone = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/; 
    if (!$(a).val()) {
        $(a).parents('.infor-item').addClass('infor-wrong');
        $(a).parents('.infor-item').find('.hint').text('手机号不能为空');
        $('.refer').removeClass('refer-on');
        return false;
    } else if (!regPhone.test($(a).val())) {
        $(a).parents('.infor-item').addClass('infor-wrong');
        $(a).parents('.infor-item').find('.hint').text('手机号错误');
        $('.refer').removeClass('refer-on');
        return false;
    } else {
        $(a).parents('.infor-item').removeClass('infor-wrong');
        return true;
    }
}

// 姓名验证
function nameCheck(b) {
    let regName = /^[\u4e00-\u9fa5A-Za-z]*$/;
    if ($(b).val()) {
        if (regName.test($(b).val())) {
            $(b).parent('.infor-item').removeClass('infor-wrong');
            return true;
        } else {
            $(b).parent('.infor-item').addClass('infor-wrong');
            $(b).parent('.infor-item').find('.hint').text('姓名错误');
        }
    } else {
        $(b).parent('.infor-item').addClass('infor-wrong');
        $(b).parent('.infor-item').find('.hint').text('姓名不能为空');    
        return false;
    }
}

// 验证码倒计时
function timeCatch() {
    let btn1 = $('.code-btn').find('.p1');
    let btn2 = $('.code-btn').find('.p2');

    btn1.on('click', ()=> {
        let uphone = $('.uphone');
        let uphoneVal = uphone.val();
        check(uphone);
        if (check(uphone) == false) {
            return false;
        } else if (check(uphone) == true) {
            btn1.addClass('hide');
            btn2.removeClass('hide');
            let i = btn2.find('i').text();
            let itext = parseInt(i);
            let timeNum = setInterval(function () {
                if (itext == 0) {
                    clearInterval(timeNum);
                    btn1.removeClass('hide');
                    btn2.addClass('hide');
                }
                btn2.find('i').text(itext--);
            }, 1000);
        }


    });
}
