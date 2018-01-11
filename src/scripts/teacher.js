$(function () {

    
    _IsIOS();
    commonTab();
    weekChoose();
    personDetai();
    loginWake();
    login();
    loginTeach();
    setTimeout(function() {
        $('body').show();
    }, 100);
    
});

var panda = 'http://panda.dfth.com';
// var panda = 'http://pandatest.dfth.com';
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
        let oc = o.find('.cricle');
        let on = o.find('.notice-icon');
        oc.addClass('hide checked');
        on.addClass('hide checked');
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

// 课程类型判断
function lessonType(){
    $('.cricle').addClass('hide');
    $('.notice-icon').addClass('hide');
    $('.class-list').each((a,b)=>{
        let ctype = $(b).find('.ctype').text();
        let cstatus = $(b).find('.cstatus').text();
        let num = $(b).find('.snum');
        let numText = num.text();
        if (ctype ==0) {
            $(b).find('.ctext').text('');
            $(b).find('.ctext').removeClass('s1 s2 s3 s4 s5');
        }else if (ctype ==1) {
            $(b).find('.ctext').text('代');
            $(b).find('.ctext').removeClass('s2 s3 s4 s5');
            $(b).find('.ctext').addClass('s1');
        }else if (ctype ==2) {
            $(b).find('.ctext').text('被代');
            $(b).find('.ctext').removeClass('s1 s3 s4 s5');
            $(b).find('.ctext').addClass('s2');
        }else if (ctype ==3) {
            $(b).find('.ctext').text('补课');
            $(b).find('.ctext').removeClass('s1 s2 s4 s5');
            $(b).find('.ctext').addClass('s3');
        }else if (ctype ==4) {
            $(b).find('.ctext').text('代课审核');
            $(b).find('.ctext').removeClass('s1 s2 s3 s5');
            $(b).find('.ctext').addClass('s4');
        }else if (ctype ==5) {
            $(b).find('.ctext').text('停课');
            $(b).find('.ctext').removeClass('s1 s2 s3 s4');
            $(b).find('.ctext').addClass('s5');
        }

        if(numText==0){
            $(b).addClass('hidden');
        }

        if(cstatus=='yes'){
            $(b).removeClass('c-signing c-signoff').addClass('c-signed');
        }else if(cstatus=='no'){
            $(b).removeClass('c-signed c-signoff').addClass('c-signing');
            if($('.week-box').get(0)){
                let oindex = $(b).parents('.item').index();
                let oc = $('.week-box').find('.hd-list').eq(oindex).find('.cricle');
                oc.removeClass('hide');
            }
        }else if(cstatus=='overdue'){
            $(b).removeClass('c-signed c-signing').addClass('c-signoff');
            $(b).find('.ctext').text('超时');
            $(b).find('.ctext').removeClass('s1 s2 s3 s5');
            $(b).find('.ctext').addClass('s4');
            if($('.week-box').get(0)){
                let oindex = $(b).parents('.item').index();
                let oc = $('.week-box').find('.hd-list').eq(oindex).find('.cricle');
                let on = $('.week-box').find('.hd-list').eq(oindex).find('.notice-icon');
                oc.addClass('hide');
                on.removeClass('hide');
            }
        }else {
            $(b).removeClass('c-signed c-signing c-signoff');
        }
    });

    $(".ct").each((a,b)=>{
        if ($(b).find('.hidden').length!=$(b).find('.class-list').length) {
            $(b).find('.tips-txt').remove();
        }else{
            if ($(b).find('.tips-txt').length>0) {
            }else{
                $(b).append(`<p class="tips-txt tc">今日暂无课程~</p>`);
            }
        }
    });


}

// 信息填充
function personDetai(){

    let idGroup = [];
    let sGroup = [];
    if($('.user-index').get(0)){
        let cdata = sessionStorage.getItem('ckey');
        $.ajax({
            type:'GET',
            cache:'false',
            url:panda+'/api/v1/userinfo/user',
            headers:{'Authorization':cdata},
            dataType:'json',
            success:function(msg){
                $('.student-head').children('img').attr('src',msg.data.avatar);
                $('.student-txt').find('.s1').text(msg.data.uname);
                $('.student-txt').find('.s2').text(msg.data.school_name);
                $('.student-txt').find('.txt2').find('i').text(msg.data.job.full_name);
                let tid = sessionStorage.setItem('tid',msg.data.aid);
            },
            error:function(msg){
                console.log('信息获取出错');
            }    
        });
        let tidNum = sessionStorage.getItem('tid');
        let nowdays = new Date();
        let year = nowdays.getFullYear();
        let month = nowdays.getMonth()+1; 
        if(month==0){
            month=12;
            year=year-1;
        }
        if (month < 10) {
            month = "0" + month;
        }
        let firstDay = year + "-" + month + "-" + "01";//上个月的第一天
        let myDate = new Date(year, month, 0);
        let lastDay = year + "-" + month + "-" + myDate.getDate();//上个月的最后一天

        $.ajax({
            type:'GET',
            cache:'false',
            url:panda+'/api/v1/teacher/forms',
            headers:{'Authorization':cdata},
            // data:{'teach_uid':tidNum,'start_date':firstDay,'end_date':lastDay},
            data:{'aid':tidNum,'client':'m'},
            dataType:'json',
            success:function(msg){
                console.log(msg.data);
                // let sum1=0;
                // for(let i=0;i<msg.data.chuqi.length;i++){
                //     sum1+=parseInt(msg.data.chuqi[i]);
                // }

                // let sum2=0;
                // for(let i=0;i<msg.data.aingjia.length;i++){
                //     sum2+=parseInt(msg.data.aingjia[i]);
                // }

                // let sum3=0;
                // for(let i=0;i<msg.data.kuangke.length;i++){
                //     sum3+=parseInt(msg.data.kuangke[i]);
                // }
                $('.total-list').eq(0).children('.p1').text(msg.data.cq);
                $('.total-list').eq(1).children('.p1').text(msg.data.qj);
                $('.total-list').eq(2).children('.p1').text(msg.data.kc);
            },
            error:function(msg){
                console.log('信息获取出错');
            }    
        });

        let mydate = new Date();
        let today = "" + mydate.getFullYear() + "/";
        today += (mydate.getMonth()+1) + "/";
        today += mydate.getDate();
        $.ajax({
            type:'GET',
            cache:'false',
            url:panda+'/api/v1/teacher/syllabus',
            headers:{'Authorization':cdata},
            data:{'teach_uid':tidNum,'start_date':today,'end_date':today},
            dataType:'json',
            success:function(msg){
                // console.log(msg.data);
                let classCon = msg.data;
                for (let key in classCon) { 
                    let ctime = classCon[key].class_time;
                    let ctitle = classCon[key].course.title;
                    let pnum = classCon[key].studentCount;
                    let cname = classCon[key].teacher.uname;
                    let cfirst = cname.substr(0, 1);
                    let cclass = classCon[key].class_room.names.substr(0, 1);
                    let ctype = classCon[key].type;
                    let cstatus = classCon[key].check_status;
                    let did = classCon[key].id;
                    let st = classCon[key].schooltime; 
                    idGroup.push(did);
                    sGroup.push(st);
                    let idNum = sessionStorage.setItem('idGroup',idGroup);
                    let sNum = sessionStorage.setItem('sGroup',sGroup);
                    
                    $('.class-con').append(
                        `<li class="class-list">
                            <a class="block alink clearfix" id="alink">
                                <div class="class-detail fl">
                                    <p class="p1"><em>${ctime}</em><i>${ctitle}</i><span class="ctext"></span></p>
                                    <p class="p2"><em>${cfirst}老师</em><i>教室${cclass}</i><em class="num">(<em class="snum">${pnum}</em>人)</em></p>
                                </div>
                                <div class="class-status fr tc">
                                    <div class="signed">
                                        <img class="vm signed-pic" src="images/signed.png" alt="">
                                        <p class="p3">已签到</p>
                                    </div>
                                    <p class="signing">立即签到</p>
                                </div>
                            </a>
                            <i class="hide ctype">${ctype}</i>
                            <i class="hide cstatus">${cstatus}</i>
                        </li>`
                    );
                }

                lessonType();

                setTimeout(function() {
                    if($('.class-list').length<=$('.hidden').length){
                        $('.class-con').addClass('hide');
                        $('.class-result').removeClass('hide');
                    }
                }, 1);


                $('.class-list').on('click',function(){
                    let sList = $(this);
                    let sindex = sList.index();
                    let idResult = sessionStorage.getItem('idGroup');
                    let sResult = sessionStorage.getItem('sGroup');
                    console.log(idResult,sResult);
                    let ir = idResult.split(',');
                    let sr = sResult.split(',');
                    let sid = ir[sindex];
                    let sschoole = sr[sindex];
                    let s1 = sschoole.replace(' ','=');
                    let alink = sList.find('.alink');
                    let link = 'sign.html?id='+sid+'&schooltime='+s1;
                    $('.alink').attr('href',link);
                    // window.location.href='sign.html?id='+sid+'&schooltime='+s1;
                    setTimeout(function() {
                        $('.alink').click();
                        sessionStorage.removeItem('idGroup');
                        sessionStorage.removeItem('sGroup');
                    }, 500);
                    $.ajax({    
                        type:'GET',
                        cache:'false',
                        url:panda+'/api/v1/teacher/checkWork',
                        headers:{'Authorization':cdata},
                        data:{'id':sid,'schooltime':sschoole},
                        dataType:'json',
                        success:function(msg){
                            // console.log(msg);
                        },
                        error:function(msg){
                            // console.log(msg);
                        }    
                    });
                });
            },
            error:function(msg){
                console.log('信息获取出错');
            }    
        });
    }

    let cdata = sessionStorage.getItem('ckey');
    if($('.user-sign').get(0)){
        let durl = window.location.href;
        let dobj = durl.split('=');
        let dj1 = dobj[1];
        let dj2 = dobj[2];
        let dj3 = dj1.split('&');
        let dj5 = dobj[2]+' '+dobj[3];

        let did = dj3[0];
        let dtime = dj5;
        $.ajax({    
            type:'GET',
            cache:'false',
            url:panda+'/api/v1/teacher/checkWork',
            headers:{'Authorization':cdata},
            data:{'id':did,'schooltime':dtime},
            dataType:'json',
            success:function(msg){
                console.log(msg.data);
                let ssGroup = msg.data.students;
                let signStatus = msg.data.check_status;
                for(let key in ssGroup){
                    let cname = ssGroup[key].child_name;
                    let cnum = ssGroup[key].course_curr_num;
                    let ctype = ssGroup[key].checkin_types_name;
                    $('.sign-group').append(`
                        <li class="sign-list clearfix ">
                            <p class="p2 fl">${cname}</p>
                            <p class="p2 fl">${cnum}</p>
                            <p class="p2 fl p3">${ctype}</p>
                        </li>
                    `);
                }

                let attend=[];
                let leave=[];
                let absent=[];
                $('.sign-list').each((a,b)=>{
                    let status = $(b).find('.p3');
                    if(status.text()==='已请假'){
                        status.removeClass('attend absent').addClass('leave');
                    }else if(status.text()==='旷课'){
                        status.removeClass('attend leave').addClass('absent');
                    }else if(status.text()==='已出勤'){
                        status.removeClass('attend absent').addClass('attend');
                    }else{
                        status.removeClass('attend absent attend');
                    }
                    if($(b).children('.p3').text()=='已出勤'||$(b).children('.p3').text()=='出勤'){
                        attend.push(1);
                        let attendNum = sessionStorage.setItem('attend',attend);
                    }else if($(b).children('.p3').text()=='已请假'){
                        leave.push(2);
                        let leaveNum = sessionStorage.setItem('leave',leave);
                    }else if($(b).children('.p3').text()=='旷课'){
                        absent.push(3);
                        let absentNum = sessionStorage.setItem('absent',absent);
                    }
                });
                let attendLength = attend.length;
                let leaveLength = leave.length;
                let absentLength = absent.length;
                totalSum();
                function totalSum(){
                    $('.attend-list').children('i').text(attendLength);
                    $('.leave-list').children('i').text(leaveLength);
                    $('.absent-list').children('i').text(absentLength);
                }

                // 判断老师是否签到
                if(signStatus==='overdue'){
                    $('.sign-btn').addClass('hide');
                    $('.sign-ok').addClass('hide');
                    $('.sign-late').removeClass('hide');
                    $('.sign-early').addClass('hide');
                }else if(signStatus==='yes'){
                    $('.sign-btn').addClass('hide');
                    $('.sign-ok').removeClass('hide');
                    $('.sign-late').addClass('hide');
                    $('.sign-early').addClass('hide');
                }else if(signStatus==='no'){
                    $('.sign-btn').removeClass('hide');
                    $('.sign-ok').addClass('hide');
                    $('.sign-late').addClass('hide');
                    $('.sign-early').addClass('hide');
                }else{
                    $('.sign-btn').addClass('hide');
                    $('.sign-ok').addClass('hide');
                    $('.sign-late').addClass('hide');
                    $('.sign-early').removeClass('hide');
                }

                if($('.sign-list').length==0){
                    $('.sign-btn').addClass('hide');
                    $('.no-person').removeClass('hide');
                }

                // 考勤操作
                $('.sign-list').children('.p3').on('click',function(){
                    if($('.sign-ok').hasClass('hide')){
                        let o = $(this);
                        let oindex = o.parent('.sign-list').index();
                        if(o.text()=='调课'){
                            ssGroup[oindex].checkin_types_name='出勤';
                            ssGroup[oindex].checkin_types=1;
                            o.text('出勤');
                            o.removeClass('absent');
                            o.addClass('tk');
                        }else if(o.text()=='出勤'){ 
                            if(o.hasClass('tk')){
                                ssGroup[oindex].checkin_types_name='调课';
                                ssGroup[oindex].checkin_types=5;
                                o.text('调课');
                                o.removeClass('absent');
                            }else{
                                ssGroup[oindex].checkin_types_name='旷课';
                                ssGroup[oindex].checkin_types=3;
                                o.text('旷课');
                                o.addClass('absent');
                            }
                        }else if(o.text()=='旷课'){
                            ssGroup[oindex].checkin_types_name='出勤';
                            ssGroup[oindex].checkin_types=1;
                            o.text('出勤');
                            o.removeClass('absent');
                        }

                    }
                });

                // 确认签到
                $('.sign-btn').on('click',()=>{
                    let jsonGroup = JSON.stringify(ssGroup);
                    console.log(jsonGroup)
                    $.ajax({
                        type:'POST',
                        cache:'false',
                        url:panda+'/api/v1/teacher/checkWorkPost',
                        headers:{'Authorization':cdata},
                        data:{'class_id':did,'schooltime':dtime,'students':jsonGroup},
                        dataType:'json',
                        success:function(msg){
                            $('.sign-ok').removeClass('hide');
                            $('.sign-btn').addClass('hide');
                            $('.sign-list').each((a,b)=>{
                                if($(b).children('.p3').text()=='出勤'){
                                    $(b).children('.p3').addClass('attend');
                                }
                            });
                            let attend=[];
                            let leave=[];
                            let absent=[];
                            $('.sign-list').each((a,b)=>{
                                let status = $(b).find('.p3');
                                if(status.text()==='已请假'){
                                    status.removeClass('attend absent').addClass('leave');
                                }else if(status.text()==='旷课'){
                                    status.removeClass('attend leave').addClass('absent');
                                }else if(status.text()==='已出勤'){
                                    status.removeClass('attend absent').addClass('attend');
                                }else{
                                    status.removeClass('attend absent attend');
                                }
                                if($(b).children('.p3').text()=='已出勤'||$(b).children('.p3').text()=='出勤'){
                                    attend.push(1);
                                    let attendNum = sessionStorage.setItem('attend',attend);
                                }else if($(b).children('.p3').text()=='已请假'){
                                    leave.push(2);
                                    let leaveNum = sessionStorage.setItem('leave',leave);
                                }else if($(b).children('.p3').text()=='旷课'){
                                    absent.push(3);
                                    let absentNum = sessionStorage.setItem('absent',absent);
                                }
                            });
                            let attendLength = attend.length;
                            let leaveLength = leave.length;
                            let absentLength = absent.length;
                            $('.common-msg').removeClass('msg-off').addClass('msg-on');
                            setTimeout(function() {
                                $('.common-msg').removeClass('msg-on').addClass('msg-off');
                                $('.attend-list').children('i').text(attendLength);
                                $('.leave-list').children('i').text(leaveLength);
                                $('.absent-list').children('i').text(absentLength);
                            }, 3000);
                        },
                        error:function(msg){
                            console.log('信息获取出错');
                        }    
                    });
                });

            },
            error:function(msg){
                console.log('信息获取出错');
            }    
        });
    }

    //周历操作
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
        $('.class-con').html('');
        timeOperation();
        lessonType();
    });
    next.on('click',()=>{
        let nextMonday = new Date(tmonday.setDate(tmonday.getDate() + 7));
        let nextSunday = new Date(tsunday.setDate(tsunday.getDate() + 7));
        weekChoose();
        mondaySum(nextMonday);
        sundaySum(nextSunday);
        $('.class-con').html('');
        timeOperation();
        lessonType();
    });

    if($('.user-syllabus').get(0)){
        timeOperation();
    }

    function timeOperation(){
        let weekst1 = $('.start').text();
        let weekst2 = weekst1.replace(/\./g,'-');
        let weeken1 = $('.end').text();
        let weeken2 = weeken1.replace(/\./g,'-');
        $.ajax({
            type:'GET',
            cache:'false',
            url:panda+'/api/v1/teacher/syllabus',
            headers:{'Authorization':cdata},
            data:{'start_date':weekst2,'end_date':weeken2},
            dataType:'json',
            success:function(msg){
                let lessonGroup = msg.data;
                for(let key in lessonGroup){
                    for(let x in lessonGroup[key]){
                        let ltime = lessonGroup[key][x].class_time;
                        let ltitle = lessonGroup[key][x].title;
                        let lnum = lessonGroup[key][x].studentCount;
                        let ctype = lessonGroup[key][x].type;
                        let cstatus = lessonGroup[key][x].check_status;
                        let lteacher = lessonGroup[key][x].teacher.uname.substr(0, 1);
                        let lclass = lessonGroup[key][x].class_room.names.substr(0, 1);
                        let did = lessonGroup[key][x].id;
                        let st = lessonGroup[key][x].schooltime; 
                        // keyGroup.push(key);
                        // idGroup2.push(did);
                        // sGroup2.push(st);
                        // let idNum = sessionStorage.setItem('idGroup2',idGroup2);
                        // let sNum = sessionStorage.setItem('sGroup2',sGroup2);
                        // let keyNum = sessionStorage.setItem('keyGroup',keyGroup);
                        $('.class-con').html('');
                        setTimeout(function() {
                            $('.item').eq(key-1).find('.class-con').append(`
                                <li class="class-list">
                                    <a class="block alink clearfix">
                                        <div class="class-detail fl">
                                            <p class="p1"><em>${ltime}</em><i>${ltitle}</i><span class="ctext"></span></p></p>
                                            <p class="p2"><em>${lteacher}老师</em><i>教室${lclass}</i><em class="num">(<em class="snum">${lnum}</em></>人)</em></p>
                                        </div>
                                        <div class="class-status fr tc">
                                            <div class="signed">
                                                <img class="vm signed-pic" src="images/signed.png" alt="">
                                                <p class="p3">已签到</p>
                                            </div>
                                            <div class="sign-no">
                                                <img class="vm signed-pic" src="images/sign-no.png" alt="">
                                                <p class="p4">未签到</p>
                                            </div>
                                            <p class="signing">立即签到</p>
                                        </div>
                                    </a>    
                                    <i class="hide ctype">${ctype}</i>
                                    <i class="hide cstatus">${cstatus}</i>
                                    <i class="hide did">${did}</i>
                                    <i class="hide st">${st}</i>
                                </li>
                            `);
                            lessonType();
                        }, 1);
                    }

                }

                
                setTimeout(function() {
                $('.class-list').on('click',function(){
                    let sList = $(this);
                    let didText = sList.find('.did').text();
                    let stText = sList.find('.st').text();
                    let oindex = $(this).parents('.item').index();
                    console.log(didText,stText);
                    let s1 = stText.replace(' ','=');
                    let link = 'sign.html?id='+didText+'&schooltime='+s1;
                    // window.location.href='sign.html?id='+didText+'&schooltime='+s1;
                    $('.alink').attr('href',link);
                    setTimeout(function() {
                        $('.alink').click();
                    }, 500);
                    $.ajax({    
                        type:'GET',
                        cache:'false',
                        url:panda+'/api/v1/teacher/checkWork',
                        headers:{'Authorization':cdata},
                        data:{'id':didText,'schooltime':stText},
                        dataType:'json',
                        success:function(msg){
                            console.log(msg);
                        },
                        error:function(msg){
                            console.log(msg);
                        }    
                    });
                });
                }, 2);

            },
            error:function(msg){
                console.log('信息获取出错');
            }    
        });
    }
}

// 邮箱验证
function emailCheck(c){
    let email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(email.test($(c).val())){
        $(c).parents('.infor-item').removeClass('infor-wrong');
        return true;
    }else{
        $(c).parent('.infor-item').addClass('infor-wrong');
        $(c).parent('.infor-item').find('.hint').text('帐号格式错误');
        $('.refer').removeClass('refer-on');
        return false;
    }

}

// 手机号验证
function phoneCheck(a) {
    let phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
     if (phone.test($(a).val())) {
        $(a).parents('.infor-item').removeClass('infor-wrong');
        return true;
    } else {
        $(a).parent('.infor-item').addClass('infor-wrong');
        $(a).parent('.infor-item').find('.hint').text('帐号格式错误');
        $('.refer').removeClass('refer-on');
        return false;
    }
}  

// 登录验证
function loginCheck(){
    let loginName = $('.phone-number');
    let psd = $('.pass-word');
    emailCheck(loginName);
    phoneCheck(loginName);
    if($('.login').get(0)){
        if(loginName.val()){
            if(emailCheck(loginName)==true || phoneCheck(loginName)==true){
                loginName.parent('.infor-item').removeClass('infor-wrong');
                if(psd.val()){
                    psd.parent('.infor-item').removeClass('infor-wrong');
                    $('.refer').addClass('refer-on');
                }else{
                    psd.parent('.infor-item').addClass('infor-wrong');
                    psd.parent('.infor-item').find('.hint').text('密码不能为空');
                    $('.refer').removeClass('refer-on');
                }
            }else{
                loginName.parent('.infor-item').addClass('infor-wrong');
                $('.refer').removeClass('refer-on');
                return false;
            }
        }else{
            loginName.parent('.infor-item').addClass('infor-wrong');
            loginName.parent('.infor-item').find('.hint').text('帐号不能为空');
            $('.refer').removeClass('refer-on');
            return false;
        }
    }
}

// 登录唤醒
function loginWake(){
    if($('.login').get(0)){
        let input = $('.infor-item').find('input');
        input.on('input propertychange',()=>{
            loginCheck();
        });
    }
}

// 用户登录
function login(){
    if($('.login').get(0)){

        $('.refer').on('click',()=>{

            if($('.refer').hasClass('refer-on')){
                var uname = $('.phone-number').val();
                var psd = $('.pass-word').val();
                var curl = window.location.href;
                if(curl.indexOf("?")>0){
                    var keyGroup = curl.split('?');
                    var keyid1 = keyGroup[1];
                    var keyid2 = keyid1.split('=');
                    var keyid3 = keyid2[1];
                }else{
                    var keyid3 = '';
                }
                $.ajax({
                    type:'POST',
                    cache:'false',
                    url:panda+'/api/v1/admin/login',
                    data:{'username':uname,'password':psd,'grant_type':'password','client_id':'1','client_secret':'EjKXjo27hXenF8a2MgqHvpYv7IhtJ678GfOgnHc5','openid':keyid3},
                    dataType:'json',
                    success:function(msg){
                        if(msg.code==0){
                        console.log(msg)
                        let job = msg.jobCode.code;
                        console.log(job)
                        
                            let ckey = msg.token_type+' '+msg.access_token;
                            sessionStorage.setItem('ckey', ckey);
                            console.log(ckey);
                            console.log(job.indexOf('teachq'));
                            if(job.indexOf('teach')!=-1){
                                window.location.href='index.html';
                            }else{
                                window.location.href='tips.html?key=noteach';
                            }
                        }else{
                            $('.pass-word').parent('.infor-item').addClass('infor-wrong');
                            $('.pass-word').parent('.infor-item').find('.hint').text(msg.message);
                        }
                    },
                    error:function(msg){
                        console.log(msg);
                    }    
                });
            }else{
                return false;
            }
        });

        let curl = window.location.href;
        console.log(curl);
        if(curl.indexOf('tk=')>0){
            $('.loading').removeClass('hide');
            let tkGroup = curl.split('tk=');
            let tk = tkGroup[1];
            let ckeyNew = 'Bearer'+' '+tk;
            sessionStorage.setItem('ckey', ckeyNew);
            console.log('ok');
            window.location.href='index.html';
        }
        if(curl.indexOf('keyid=')>0){
            $('.loading').addClass('hide');
        }


    }

    
} 

// 登录判断
function loginTeach(){
    if($('.user-tips').get(0)){
        let curl = window.location.href;
        let keyGroup = curl.split('?');
        let keyid1 = keyGroup[1];
        let keyid2 = keyid1.split('=');
        let keyid3 = keyid2[1];
        if(keyid3=='noteach'){
            $('.user-tips').find('.p1').addClass('hide');
        }else{
            $('.user-tips').find('.p2').addClass('hide');
        }
    }
}

























