$(function () {

    _IsIOS();
    commonTab();
    weekChoose();
    personDetai();

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

function lessonType(){
    $('.class-list').each((a,b)=>{
        let ctype = $(b).find('.ctype').text();
        let cstatus = $(b).find('.cstatus').text();
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

        if(cstatus=='yes'){
            $(b).removeClass('c-signing c-signoff').addClass('c-signed');
        }else if(cstatus=='no'){
            $(b).removeClass('c-signed c-signoff').addClass('c-signing');
            if($('.week-box').get(0)){
                let oindex = $(b).parents('.item').index();
                let oc = $('.week-box').find('.hd-list').eq(oindex).find('.cricle');
                // if(!oc.hasClass('checked')){
                    oc.removeClass('hide');
                // }
            }
        }else if(cstatus=='overdue'){
            $(b).removeClass('c-signed c-signing').addClass('c-signoff');
            $(b).find('.ctext').text('超时');
            $(b).find('.ctext').removeClass('s1 s2 s3 s5');
            $(b).find('.ctext').addClass('s4');
            if($('.week-box').get(0)){
                let oindex = $(b).parents('.item').index();
                let on = $('.week-box').find('.hd-list').eq(oindex).find('.notice-icon');
                // if(!on.hasClass('checked')){
                    on.removeClass('hide');
                // }
            }
        }else {
            // $(b).removeClass('c-signed c-signing c-signoff');
            $(b).removeClass('c-signed c-signoff').addClass('c-signing');
        }
    });

    $(".ct").each((a,b)=>{
        if ($(b).find('.class-list').length>0) {
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
        let curl = window.location.href;
        let cobj = curl.split('=');
        let key = cobj[1];
        let ckey = 'Bearer '+key;
        sessionStorage.setItem('ckey', ckey);
        let data = sessionStorage.getItem('ckey');
        console.log(data);
        let tid = [];
        $.ajax({
            type:'GET',
            cache:'false',
            url:'http://pandatest.dfth.com/api/v1/userinfo/user',
            headers:{'Authorization':ckey},
            dataType:'json',
            success:function(msg){
                // console.log(msg)
                $('.student-head').children('img').attr('src',msg.data.avatar);
                $('.student-txt').find('.s1').text(msg.data.uname);
                $('.student-txt').find('.s2').text(msg.data.school_name);
                $('.student-txt').find('.txt2').find('i').text(msg.data.job.full_name);
                tid.push(msg.data.aid);
            },
            error:function(msg){
                console.log('信息获取出错');
            }    
        });

        
        let nowdays = new Date();
        let year = nowdays.getFullYear();
        let month = nowdays.getMonth();
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
            url:'http://pandatest.dfth.com/api/v1/reportForms/teachFormsPic',
            headers:{'Authorization':ckey},
            data:{'teach_uid':tid[0],'start_date':firstDay,'end_date':lastDay},
            dataType:'json',
            success:function(msg){
                // console.log(msg.data)
                let sum1=0;
                for(let i=0;i<msg.data.chuqi.length;i++){
                    sum1+=parseInt(msg.data.chuqi[i]);
                }

                let sum2=0;
                for(let i=0;i<msg.data.aingjia.length;i++){
                    sum2+=parseInt(msg.data.aingjia[i]);
                }

                let sum3=0;
                for(let i=0;i<msg.data.kuangke.length;i++){
                    sum3+=parseInt(msg.data.kuangke[i]);
                }
                $('.total-list').eq(0).children('.p1').text(sum1);
                $('.total-list').eq(1).children('.p1').text(sum2);
                $('.total-list').eq(2).children('.p1').text(sum3);
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
            url:'http://pandatest.dfth.com/api/v1/teacher/syllabus',
            headers:{'Authorization':ckey},
            data:{'teach_uid':tid[0],'start_date':'2017/09/04','end_date':'2017/09/04'},
            dataType:'json',
            success:function(msg){
                console.log(msg.data);
                let classCon = msg.data;
                for (let key in classCon) { 
                    let ctime = classCon[key].class_time;
                    let ctitle = classCon[key].course.title;
                    let cname = classCon[key].teacher.uname;
                    let cfirst = cname.substr(0, 1);
                    let cclass = classCon[key].class_room.names.substr(0, 1);
                    let ctype = classCon[key].type;
                    let cstatus = classCon[key].check_status;
                    let did = classCon[key].id;
                    let st = classCon[key].schooltime; 
                    idGroup.push(did);
                    sGroup.push(st);
                    $('.class-con').append(
                        `<li class="class-list clearfix">
                            <div class="class-detail fl">
                                <p class="p1"><em>${ctime}</em><i>${ctitle}</i><span class="ctext"></span></p>
                                <p class="p2"><em>${cfirst}老师</em><i>教室${cclass}</i></p>
                            </div>
                            <div class="class-status fr tc">
                                <div class="signed">
                                    <img class="vm signed-pic" src="images/signed.png" alt="">
                                    <p class="p3">已签到</p>
                                </div>
                                <a class="signing">立即签到</a>
                            </div>
                            <i class="hide ctype">${ctype}</i>
                            <i class="hide cstatus">${cstatus}</i>
                        </li>`
                    );
                }

                lessonType();

                setTimeout(function() {
                    if($('.class-list').length==0){
                        $('.class-con').addClass('hide');
                        $('.class-result').removeClass('hide');
                    }                
                }, 1);

                $('.signing').on('click',function(){
                    let sList = $(this).parents('.class-list');
                    let sindex = sList.index();
                    let sid = idGroup[sindex];
                    let sschoole = sGroup[sindex];
                    $.ajax({    
                        type:'GET',
                        cache:'false',
                        url:'http://pandatest.dfth.com/api/v1/teacher/checkWork',
                        headers:{'Authorization':ckey},
                        data:{'id':sid,'schooltime':sschoole},
                        dataType:'json',
                        success:function(msg){
                            console.log(msg);
                            window.location.href='sign.html?id%'+sid+'&schooltime%'+sschoole;
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

    let cdata = sessionStorage.getItem('ckey');
    if($('.user-sign').get(0)){
        let durl = window.location.href;
        let dobj = durl.split('%');
        let dgroup = dobj[1];
        let dgroup1 = dgroup.split('&');

        let did = dgroup1[0];
        let dtime = dobj[2];
        $.ajax({    
            type:'GET',
            cache:'false',
            url:'http://pandatest.dfth.com/api/v1/teacher/checkWork',
            headers:{'Authorization':cdata},
            data:{'id':104,'schooltime':dtime},
            dataType:'json',
            success:function(msg){
                console.log(msg.data);
                let sGroup = msg.data.students;
                let signStatus = msg.data.check_status;
                for(let key in sGroup){
                    let cname = sGroup[key].child_name;
                    let cnum = sGroup[key].course_curr_num;
                    let ctype = sGroup[key].checkin_types_name;
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
                    $('.sign-btn').addClass('hide');
                    $('.sign-ok').addClass('hide');
                    $('.sign-late').removeClass('hide');
                    $('.sign-early').addClass('hide');
                }else{
                    $('.sign-btn').addClass('hide');
                    $('.sign-ok').addClass('hide');
                    $('.sign-late').addClass('hide');
                    $('.sign-early').removeClass('hide');
                }

                // 考勤操作
                $('.sign-list').children('.p3').on('click',function(){
                    let o = $(this);
                    let oindex = o.parent('.sign-list').index();
                    if(o.text()=='出勤'){
                        sGroup[oindex].checkin_types_name='旷课';
                        sGroup[oindex].checkin_types=3;
                        o.text('旷课');
                        o.addClass('absent');
                    }else if(o.text()=='旷课'){
                        sGroup[oindex].checkin_types_name='出勤';
                        sGroup[oindex].checkin_types=1;
                        o.text('出勤');
                        o.removeClass('absent');
                    }
                });

                // 确认签到
                $('.sign-btn').on('click',()=>{
                    $.ajax({
                        type:'GET',
                        cache:'false',
                        url:'http://pandatest.dfth.com/api/v1/teacher/checkWork',
                        headers:{'Authorization':cdata},
                        data:{'id':104,'schooltime':dtime,'students':sGroup},
                        dataType:'json',
                        success:function(msg){
                            console.log(sGroup);
                            $('.sign-ok').removeClass('hide');
                            $('.sign-btn').addClass('hide');
                            $('.sign-list').each((a,b)=>{
                                if($(b).children('.p3').text()=='出勤'){
                                    $(b).children('.p3').addClass('attend');
                                }
                            });
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
        console.log(weekst2,weeken2);
        $.ajax({
            type:'GET',
            cache:'false',
            url:'http://pandatest.dfth.com/api/v1/teacher/syllabus',
            headers:{'Authorization':cdata},
            data:{'start_date':weekst2,'end_date':weeken2},
            dataType:'json',
            success:function(msg){
                console.log(msg.data);
                let lessonGroup = msg.data;
                for(let key in lessonGroup){
                    for(let x in lessonGroup[key]){
                        let ltime = lessonGroup[key][x].class_time;
                        let ltitle = lessonGroup[key][x].title;
                        let ctype = lessonGroup[key][x].type;
                        let cstatus = lessonGroup[key][x].check_status;
                        let lteacher = lessonGroup[key][x].teacher.uname.substr(0, 1);
                        let lclass = lessonGroup[key][x].class_room.names.substr(0, 1);
                        $('.item').eq(key).find('.class-con').append(`
                            <li class="class-list clearfix">
                                <div class="class-detail fl">
                                    <p class="p1"><em>${ltime}</em><i>${ltitle}</i><span class="ctext"></span></p></p>
                                    <p class="p2"><em>${lteacher}老师</em><i>教室${lclass}</i></p>
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
                                    <a class="signing">立即签到</a>
                                </div>
                                <i class="hide ctype">${ctype}</i>
                                <i class="hide cstatus">${cstatus}</i>
                            </li>
                        `);
                    }

                }

                lessonType();

                $('.signing').on('click',function(){
                    let sList = $(this).parents('.class-list');
                    let sindex = sList.index();
                    let sid = idGroup[sindex];
                    let sschoole = sGroup[sindex];
                    let oindex = $(this).parents('.item').index();
                    $.ajax({    
                        type:'GET',
                        cache:'false',
                        url:'http://pandatest.dfth.com/api/v1/teacher/checkWork',
                        headers:{'Authorization':cdata},
                        data:{'id':sid,'schooltime':sschoole},
                        dataType:'json',
                        success:function(msg){
                            console.log(msg);
                            window.location.href='sign.html?id%'+sid+'&schooltime%'+sschoole;
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
}

























