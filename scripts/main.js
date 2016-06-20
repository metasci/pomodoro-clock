

var $seshMore = $('#session-more');
var $seshLess = $('#session-less');
var $breakMore = $('#break-more');
var $breakLess = $('#break-less');

var $seshTime = $('#session-time');
var $breakTime = $('#break-time');

var $bg = $('.bg');
var $label = $('.time-label');
var $timer = $('.circle');
var $sec = $('.sec');
var $min = $('.min');
var $hour = $('.hour');
var $hourId = $('#hour');

var timeSet;
var timeRun = false;
var breakRun = false;
var interv = 1000;
var bgStart = 300;
var howHigh;
var audioBreak = new Audio('https://www.myinstants.com/media/sounds/01-power-up-mario.mp3');
var audioSesh = new Audio('https://www.myinstants.com/media/sounds/52ac54_super_mario_bros_stage_clear_sound_effect.mp3');



function timeDown() {
    if(bgStart > 0){$bg.animate({top: bgStart-=howHigh}, interv);}
    if($sec.html() > 0) {
        var second = $sec.html() <= 10 ? "0"+($sec.html()-1) : $sec.html()-1;
        $sec.html(second);
    }else if($min.html() > 0){
        var minute = $min.html() <= 10 ? "0"+($min.html()-1) : $min.html()-1;
        $min.html(minute);
        $sec.html(59);
    }else if($hourId.html() > 0){
        var hour = $hourId.html() <= 10 ? "0"+($hourId.html()-1) : $hourId.html()-1;
        $min.html(59);
        $sec.html(59);
        if(parseInt($hourId.html(), 10)-1 ===0){$hour.css('display', 'none');}
        $hourId.html($hourId.html()-1);
    }else {
        if(!breakRun){
            audioSesh.play();
            reset(false, 'BREAK!', '#ff704d', parseInt($breakTime.html(), 10), true);
        }else{
            audioBreak.play();
            reset(false, 'SESSION', '#b3ff66', parseInt($seshTime.html(), 10), false);
        }
    }
}

function reset(clear, label, color, time, breaker){
    if(clear){
        clearInterval(timeSet);
        timeRun = false;
    }
    breakRun = breaker;
    bgStart = 300;
    howHigh = 300/(time*60);
    $bg.animate({top: bgStart}, 1, function(){
        $label.html(label);
        $bg.css('background-color', color);
        setTimer(time);
    });
}


function setTimer(minutes) {
    if(minutes/60 >= 1){
        $hour.css('display', 'inline');
    }else{$hour.css('display', 'none');}
    var setHour = Math.floor(minutes/60) >=10 ? Math.floor(minutes/60) : '0'+Math.floor(minutes/60);
    $hourId.html(setHour);
    var setMin = minutes%60 >= 10 ? minutes%60 : '0'+minutes%60;
    $min.html(setMin);
    $sec.html('00');
}






$seshMore.on('click', function() {
    if(timeRun === false){
        $seshTime.html(parseInt($seshTime.html(), 10)+1);
        setTimer(parseInt($seshTime.html(), 10));
    }
});

$seshLess.on('click', function() {
    if($seshTime.html()>1 && timeRun === false){
        $seshTime.html($seshTime.html()-1);
        setTimer(parseInt($seshTime.html(), 10));
    }
});

$breakMore.on('click', function() {
    if(timeRun === false){
        $breakTime.html(parseInt($breakTime.html(), 10)+1);
    }
});

$breakLess.on('click', function() {
    
    if($breakTime.html()>1 && timeRun === false){
        $breakTime.html(parseInt($breakTime.html(), 10)-1);
    }
});



// start timer 
$timer.on('click', function() {
    if(timeRun === false){
        howHigh = 300/($seshTime.html()*60);
        timeSet = setInterval(timeDown, interv);
        timeRun = true;
    }else {
        clearInterval(timeSet);
        timeRun = false;
    }
});

