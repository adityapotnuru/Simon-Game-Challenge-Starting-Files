

var buttonArray=["green","red","yellow","blue"];
var gamePattern=[];
var userPattern=[];
var started=false;
var level=0; 


$(document).keypress(function(){
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function(){
    if(started){
        var userChosenColour=this.id;
        userPattern.push(userChosenColour);
        playSound(userChosenColour);
        buttonAnimation(userChosenColour);
        checkAnswer(userPattern.length-1);
    }
    else{
        wrong_ans();
    }

})

function playSound(key){
    var audio=new Audio("sounds/"+key+".mp3");
    audio.play();
}


function buttonAnimation(key){
    $("#"+key).addClass("pressed");
    setTimeout(function(){
        $("#"+key).removeClass("pressed");
    }, 100);
}

function checkAnswer(key){
    if(gamePattern[key]===userPattern[key]){
        console.log("success");
        if(userPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        wrong_ans();
    }
}


function nextSequence(){
    userPattern=[];
    level++;
    $("h1").text("Level:"+level);
    var randomNumber=Math.floor(Math.random()*4);
    buttonAnimation(buttonArray[randomNumber]);
    gamePattern.push(buttonArray[randomNumber]);
    buttonAnimation(buttonArray[randomNumber]);
    playSound(buttonArray[randomNumber]);
    console.log(gamePattern);
}



function wrong_ans(){
    $("h1").text("Game Over,Please Click any Key to Restart");
    gamePattern=[];
    
    var sound=new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");    
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    level=0;
    started=false;
}

