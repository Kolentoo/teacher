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
                interval: 5000,
                swap: true
            },
            callback: {
                loaded: function(number) {
                    $('.slides-banner').find('.slidesjs-navigation').text('');
                    $('.slides-banner').find('.slidesjs-previous').append(`
                        <div class="arrow-bj"></div>
                        <div class="slides-arrow sa1"></div>
                    `);
                    $('.slides-banner').find('.slidesjs-next').append(`
                        <div class="arrow-bj"></div>
                        <div class="slides-arrow sa2"></div>
                    `);
                },
                start: function(number) {
                    $('.slidesjs-slide').eq(number-1).find('img').lazyload({effect: "fadeIn"});
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
                    $('.slides-pro').find('.slidesjs-navigation').text('');
                    $('.slides-pro').find('.slidesjs-previous').append(`<img class="slides-arrow vm" src="images/arrow-left1.png" alt="">`);
                    $('.slides-pro').find('.slidesjs-next').append(`<img class="slides-arrow vm" src="images/arrow-right3.png" alt="">`);
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

    // 表单动效
    if($('.listen-con').get(0)){
        $('.listen-con').addClass('listen-on');
    }

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
    listenWakeup();
    indexAm();
    scrollAm();
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

// 首页首屏动画
function indexAm(){
    let index = $('.dfth-index');
    setTimeout(()=> {
        index.find('.banner').find('.des-btn').addClass('des-btn-on');
    }, 500);
    setTimeout(()=> {
        index.find('.slides-des').find('.p1').addClass('p1-on');
    }, 700);
    setTimeout(()=> {
        index.find('.slides-des').find('h2').addClass('h2-on');
    }, 950);
    setTimeout(()=> {
        index.find('.author').addClass('author-on');
    }, 1150);
}

// 首页滚动动画
function scrollAm(){
    let bannerTop = $('.banner').height();
    let lessonTop = $('.lesson-box').offset().top;
    let galleryTop = $('.gallery-box').offset().top;
    $(window).scroll( ()=> {
        let w = $(window).scrollTop();
        if (w >= bannerTop) {
                $(".navigation").addClass('nav-on navigation-on');
            } else {
                $(".navigation").removeClass('nav-on navigation-on');
            }
        if(w >= lessonTop){
            setTimeout(()=> {
                $('.main-lesson').find('h3').addClass('h3-on');
            }, 200);
            setTimeout(()=> {
                $('.main-lesson').find('.p1').addClass('p1-on');
            }, 400);
            setTimeout(()=> {
                $('.main-lesson').find('.des-btn').addClass('des-btn-in');
            }, 600);
            setTimeout(()=> {
                $('.lesson-box').find('.main-pic').addClass('main-pic-on');
            }, 800);
            setTimeout(()=> {
                $('.lesson-list').eq(0).find('.other-pic').addClass('other-pic-on');
            }, 300);
            setTimeout(()=> {
                $('.lesson-list').eq(0).find('.lesson-title').addClass('lesson-title-on');
            }, 500);
            setTimeout(()=> {
                $('.lesson-list').eq(0).find('.lesson-des').addClass('lesson-des-on');
            }, 700);
            setTimeout(()=> {
                $('.lesson-list').eq(0).find('.lesson-btn').addClass('lesson-btn-on');
            }, 900);
            setTimeout(()=> {
                $('.lesson-list').eq(1).find('.other-pic').addClass('other-pic-on');
            }, 400);
            setTimeout(()=> {
                $('.lesson-list').eq(1).find('.lesson-title').addClass('lesson-title-on');
            }, 600);
            setTimeout(()=> {
                $('.lesson-list').eq(1).find('.lesson-des').addClass('lesson-des-on');
            }, 800);
            setTimeout(()=> {
                $('.lesson-list').eq(1).find('.lesson-btn').addClass('lesson-btn-on');
            }, 1000);
            setTimeout(()=> {
                $('.lesson-list').eq(2).find('.other-pic').addClass('other-pic-on');
            }, 500);
            setTimeout(()=> {
                $('.lesson-list').eq(2).find('.lesson-title').addClass('lesson-title-on');
            }, 700);
            setTimeout(()=> {
                $('.lesson-list').eq(2).find('.lesson-des').addClass('lesson-des-on');
            }, 900);
            setTimeout(()=> {
                $('.lesson-list').eq(2).find('.lesson-btn').addClass('lesson-btn-on');
            }, 1100);
        }
        if(w >= galleryTop){
            setTimeout(function() {
                $('.gallery-list').eq(0).find('.gallery-pic').addClass('gallery-on');
            }, 200);
            setTimeout(function() {
                $('.gallery-list').eq(1).find('.gallery-pic').addClass('gallery-on');
            }, 500);
            setTimeout(function() {
                $('.gallery-list').eq(2).find('.gallery-pic').addClass('gallery-on');
            }, 600);
            setTimeout(function() {
                $('.gallery-list').eq(3).find('.gallery-pic').addClass('gallery-on');
            }, 700);
            setTimeout(function() {
                $('.gallery-list').eq(4).find('.gallery-pic').addClass('gallery-on');
            }, 800);
            setTimeout(function() {
                $('.gallery-list').eq(5).find('.gallery-pic').addClass('gallery-on');
            }, 900);
            setTimeout(function() {
                $('.gallery-list').eq(6).find('.gallery-pic').addClass('gallery-on');
            }, 1000);
            setTimeout(function() {
                $('.gallery-list').eq(7).find('.gallery-pic').addClass('gallery-on');
            }, 1100);
            setTimeout(function() {
                $('.gallery-list').eq(8).find('.gallery-pic').addClass('gallery-on');
            }, 1200);
            setTimeout(function() {
                $('.gallery-list').eq(9).find('.gallery-pic').addClass('gallery-on');
            }, 1300);
            setTimeout(function() {
                $('.entry-pic').addClass('entry-pic-on');
            }, 1500);
            setTimeout(function() {
                $('.entry-btn').addClass('entry-btn-on');
            }, 1700);
            
        }
    }).trigger("scroll");
}

// 手机号验证
function phoneCheck(a) {
    let regPhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/; 
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
            return false;
        }
    } else {
        $(b).parent('.infor-item').addClass('infor-wrong');
        $(b).parent('.infor-item').find('.hint').text('姓名不能为空');    
        return false;
    }
}

// 验证码倒计时
function timeCatch() {
    let cbtn = $('.code-btn');
    let [btn1,btn2] = [cbtn.find('.p1'),cbtn.find('.p2')];

    btn1.on('click', ()=> {
        let uphone = $('.uphone');
        let uphoneVal = uphone.val();
        phoneCheck(uphone);
        if (phoneCheck(uphone) == false) {
            return false;
        } else if (phoneCheck(uphone) == true) {
            btn1.addClass('hide');
            btn2.removeClass('hide');
            btn2.find('i').text('60');
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

// 免费视听验证
function listenTest() {
    let uname = $('.uname');
    let uphone = $('.uphone');
    let ucode = $('.ucode');
    let uplace = $('.uplace');
    nameCheck(uname);
    phoneCheck(uphone);
    if (uname.val()) {
        if (nameCheck(uname) == false) {
            $('.refer').removeClass('refer-on');
            uname.parent('.infor-item').addClass('infor-wrong');
            uname.parent('.infor-item').find('.hint').text('姓名格式错误');
            return false;
        }else if(nameCheck(uname) == true){
            if(uphone.val()){
                if(phoneCheck(uphone) == false){
                    $('.refer').removeClass('refer-on');
                    uphone.parent('.infor-item').addClass('infor-wrong');
                    uphone.parent('.infor-item').find('.hint').text('手机号格式错误');
                    return false;
                }else if(phoneCheck(uphone) == true){
                    if(ucode.val()){
                        if(uplace.val()){
                            $('.refer').addClass('refer-on');
                            uplace.parent('.infor-item').removeClass('infor-wrong');
                            return true;
                        }else{
                            $('.refer').removeClass('refer-on');
                            uplace.parent('.infor-item').addClass('infor-wrong');
                            uplace.parent('.infor-item').find('.hint').text('上课区域不能为空');
                            return false;
                        }
                    }else{
                        $('.refer').removeClass('refer-on');
                        ucode.parent('.infor-item').addClass('infor-wrong');
                        ucode.parent('.infor-item').find('.hint').text('验证码不能为空');
                        return false;
                    }
                }
            }else{
                $('.refer').removeClass('refer-on');
                uphone.parent('.infor-item').addClass('infor-wrong');
                uphone.parent('.infor-item').find('.hint').text('手机号不能为空');
                return false;
            }
        }
    }else{
        $('.refer').removeClass('refer-on');
        uname.parent('.infor-item').addClass('infor-wrong');
        uname.parent('.infor-item').find('.hint').text('姓名不能为空');
        return false;
    }
}

// 视听申请唤醒
function listenWakeup() {
    let listenInput = $('.listen-box').find('input');
    listenInput.on('input propertychange', ()=> {
        listenTest();
    });
}
