/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/

var canvas = document.getElementById("canvas1");
var context = canvas.getContext("2d");

var xVal = 0;

var initMinSize = 2;
var initMaxSize = 8;
var initNumCircles = 225;
var initMinSpeed = -4;
var initMaxSpeed = 2;
var initHeight = window.innerHeight;
var state = 0;

var circles = [],
    
    // SETTINGS 
    opacity = 1,                                      // the opacity of the circles 0 to 1
    colors = ['rgba(0, 0, 0,' + opacity + ')'],
    minSize = initMinSize,                                        // the minimum size of the circles in px
    maxSize = initMaxSize,                                       // the maximum size of the circles in px
    numCircles = initNumCircles,                                   // the number of circles
    minSpeed = initMinSpeed,                                     // the minimum speed, recommended: -maxspeed
    maxSpeed = initMaxSpeed,                                    // the maximum speed of the circles
    expandState = true;                                      // the direction of expansion

/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/

function buildArray() {
    'use strict';
    
    for (var i =0; i < numCircles ; i++){
        var color = Math.floor(Math.random() * (colors.length - 1 + 1)) + 1,
            left = Math.floor(Math.random() * (canvas.width - 0 + 1)) + 0,
            top = Math.floor(Math.random() * (canvas.height - 0 + 1)) + 0,
            size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize,
            leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10,
            topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10,
            expandState = expandState;
           
            while(leftSpeed == 0 || topSpeed == 0){
                leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10,
                topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10;
            }
        var circle = {color:color, left:left, top:top, size:size, leftSpeed:leftSpeed, topSpeed:topSpeed, expandState:expandState };
        circles.push(circle);
    }
}

/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/

function build(){
    'use strict';
    
    for(var h = 0; h < circles.length; h++){
        var curCircle = circles[h];
        context.fillStyle = colors[curCircle.color-1];
        context.beginPath();
        if(curCircle.left > canvas.width+curCircle.size){
            curCircle.left = 0-curCircle.size;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }else if(curCircle.left < 0-curCircle.size){
            curCircle.left = canvas.width+curCircle.size;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }else{
            curCircle.left = curCircle.left+curCircle.leftSpeed;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false); 
        }
        
        if(curCircle.top > canvas.height+curCircle.size){
            curCircle.top = 0-curCircle.size;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);

        }else if(curCircle.top < 0-curCircle.size){
            curCircle.top = canvas.height+curCircle.size;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }else{
            curCircle.top = curCircle.top+curCircle.topSpeed;
            if(curCircle.size != maxSize && curCircle.size != minSize && curCircle.expandState == false){
              curCircle.size = curCircle.size-0.1;
            }
            else if(curCircle.size != maxSize && curCircle.size != minSize && curCircle.expandState == true){
              curCircle.size = curCircle.size+0.1;
            }
            else if(curCircle.size == maxSize && curCircle.expandState == true){
              curCircle.expandState = false;
              curCircle.size = curCircle.size-0.1;
            }
            else if(curCircle.size == minSize && curCircle.expandState == false){
              curCircle.expandState = true;
              curCircle.size = curCircle.size+0.1;
            }
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false); 
        }
        
        context.closePath();
        context.fill();
        context.ellipse;
    }
}

/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/

window.requestAnimFrame = (function (callback) {
    'use strict';
	
	var reqAnim = window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, 1000/60);
		};
	
    return reqAnim;
	
})();

/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/

function animate() {
    'use strict';
    var canvas = document.getElementById("canvas1"),
        context = canvas.getContext("2d");

    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draw the next frame
    xVal++;
    build();

    //console.log("Prep: animate ==> requestAnimFrame");
    // request a new frame
    requestAnimFrame(function () {
        animate();
    });
}

/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/

window.onload = function () {
    'use strict';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;
    buildArray();
    animate();
};


window.onresize = function () {
	window.cancelAnimationFrame(xVal);
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;
    circles = []
	minSize = Math.round(initMinSize * (window.innerHeight / initHeight));
	maxSize = Math.round(initMaxSize * (window.innerHeight / initHeight));
	minSpeed = Math.round(initMinSpeed * (window.innerHeight / initHeight));
	maxSpeed = Math.round(initMaxSpeed * (window.innerHeight / initHeight));
    buildArray();
    animate();
};

canvas.onclick = function() { 

	window.cancelAnimationFrame(xVal);
	circles = []
	
	if (state == 0){
		
		minSpeed = initMinSpeed - 7;
		maxSpeed = initMaxSpeed + 7;
		//numCircles = initNumCircles - 40;
		state = 1;
	
	} else if (state == 1) {
		
		minSpeed = initMinSpeed - 14;
		maxSpeed = initMaxSpeed + 14;
		//numCircles = initNumCircles - 80;
		state = 2;
		
	} else if (state == 2) {
		
		minSpeed = initMinSpeed;
		maxSpeed = initMaxSpeed;
		//numCircles = initNumCircles;
		state = 0;
		
	}

	buildArray();
	animate();

};

canvas.onmouseover = function() {
	
	window.cancelAnimationFrame(xVal);
	circles = []
	colors = ['rgba(255, 255, 255,' + opacity + ')']
			 
	buildArray();
	animate();
	
};

canvas.onmouseout = function() {
	
	window.cancelAnimationFrame(xVal);
	circles = []
	colors = ['rgba(0, 0, 0,' + opacity + ')']
			 
	buildArray();
	animate();
	
};

/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/