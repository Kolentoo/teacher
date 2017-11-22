$(function () {

    _IsIOS();
    signStatus();
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
    console.log(attend,leave,absent);
    $('.attend-list').children('i').text(attendLength);
    $('.leave-list').children('i').text(leaveLength);
    $('.absent-list').children('i').text(absentLength);
}






















