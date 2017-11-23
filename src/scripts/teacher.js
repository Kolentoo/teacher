$(function () {

    _IsIOS();
    signStatus();
    commonTab();
    dateSet();
    weekChoose();
    signSure();
    $('body').show();
});


// 设备判断
function _IsIOS() {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/iPhone\sOS/i) == "iphone os") {
        $('body').children('div').addClass('pf').removeClass('sy');
        return true;
    } else {
        $('body').children('div').removeClass('pf').addClass('sy');
    }
}


// 签到状态操作
function signStatus(){
    let attend=[];
    let leave=[];
    let absent=[];
    
    $('.sign-list').each((a,b)=>{
        if($(b).children('.p3').text()=='已出勤'||$(b).children('.p3').text()=='出勤'){
            attend.push(1)
        }else if($(b).children('.p3').text()=='已请假'){
            leave.push(2);
        }else if($(b).children('.p3').text()=='旷课'){
            absent.push(3);
        }
    });
    let attendLength = attend.length;
    let leaveLength = leave.length;
    let absentLength = absent.length;
    $('.attend-list').children('i').text(attendLength);
    $('.leave-list').children('i').text(leaveLength);
    $('.absent-list').children('i').text(absentLength);
}

// 全局切换
function commonTab(){
    $('.hd-list').on('click',function(){
        let o = $(this);
        let oindex = o.index();
        let os = o.siblings();
        os.removeClass('on');
        o.addClass('on');
        let item1 = $('.bd').find('.item').eq(oindex);
        let item2 = item1.siblings();
        item2.addClass('hide');
        item1.removeClass('hide');
    });
}


// 选择当前星期
function weekChoose(){
    let weekd = new Date().getDay();
    $('.hd-list').each((x,y)=>{
        let wn = $(y).find('.week-num').text();
        if(wn == weekd){
            $(y).click();
        }
    });
}

// 周历操作
function dateSet(){

    let a = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() == 0 ? new Date()
                    .getDate() - 6 : new Date().getDate() - new Date().getDay() + 1)
    let tmonday = new Date(a.setDate(a.getDate()));
    let tsunday = new Date(a.setDate(a.getDate() + 6)); 

    mondaySum(tmonday);
    function mondaySum(value){
        let str1 = value.toLocaleDateString();
        let str2 = str1.replace(/\//g,'.');
        $('.start').text(str2);
    }  

    sundaySum(tsunday);
    function sundaySum(value){
        let str1 = value.toLocaleDateString();
        let str2 = str1.replace(/\//g,'.');
        $('.end').text(str2);
    }    

    let prev = $('.date-title').find('.arrow-prev');
    let next = $('.date-title').find('.arrow-next');
    prev.on('click',()=>{
        let prevMonday = new Date(tmonday.setDate(tmonday.getDate() - 7));
        let prevSunday = new Date(tsunday.setDate(tsunday.getDate() - 7));
        weekChoose();
        mondaySum(prevMonday);
        sundaySum(prevSunday);
    });
    next.on('click',()=>{
        let nextMonday = new Date(tmonday.setDate(tmonday.getDate() + 7));
        let nextSunday = new Date(tsunday.setDate(tsunday.getDate() + 7));
        weekChoose();
        mondaySum(nextMonday);
        sundaySum(nextSunday);
    });




}

// 确认签到
function signSure(){
    $('.sign-btn').on('click',()=>{
        $('.sign-ok').removeClass('hide');
        $('.sign-btn').addClass('hide');
    });
}























