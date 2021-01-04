/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/

var timer;

function endAndStartTimer() {
  window.clearTimeout(timer);
  timer = window.setTimeout(function() {
    var scr = document.getElementById('matrix');
    console.log('ran');
    if(scr.style.display == 'none' || !scr.style.display) {
      scr.style.display = 'block'
    } else {
      scr.style.display = 'none';
    }
    
    // alert('Hello!');
  },3000); 
}

/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/

window.addEventListener('touchmove', endAndStartTimer())

var canvas = document.getElementById('matrix');
var ctx = canvas.getContext('2d');
var initFontSize = 22;
var fontSize = initFontSize;
var chars = generateChars(false);
var char_mode = 'bin';
var columns;
var drops; // Current position of last letter (for each column)
var drawnToBottom;
var initHeight = window.innerHeight;

/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/

// Generate Matrix code characters
function generateChars(kat) {
  
  var chars = '';
  
  // Get ALL half-width katakana characters by unicode value
  if (kat == true) {
	  for (var i = 0; i <= 55; i++) {
		chars += String.fromCharCode(i + 65382);
	  }
	  char_mode = 'kat';
  } else {
	  chars = '01';
	  char_mode = 'bin';
  }
  
  return chars.split('');
}

/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/

// Initialize default canvas state
function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight/2;

  columns = Math.round(canvas.width / fontSize);
  drops = [];

  // Set initial position on y coordinate for each column
  for (var i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  drawnToBottom = false;
}

/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/

// Resize canvas to fit window
window.onresize = function() {
  console.log(initHeight, " vs. ", window.innerHeight);
  fontSize = Math.round(initFontSize * (window.innerHeight / initHeight));
  console.log(fontSize);
  initCanvas();
};

/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/

function draw() {
  // Set nearly transparent background so character trail is visible
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
	
  // Set color and font of falling letters
  ctx.fillStyle = '#000000';
  ctx.font = 'bold ' + fontSize + 'px monospace';

  var dropCount = drops.length;
  var charCount = chars.length;

  for (var i = 0; i < dropCount; i++) {
    // Choose a random letter
    var text = chars[Math.floor(Math.random() * charCount)];
    // Get the y position of the letter
    var rowNum = drops[i] * fontSize;
		// Draw it!
    ctx.fillText(text, i * fontSize, rowNum);

    // Check if the canvas has been drawn to the bottom
    if (rowNum > canvas.height) drawnToBottom = true;

    // Randomly reset the y position of a column
    if ((!drawnToBottom && Math.random() > 0.925) || (drawnToBottom && Math.random() > 0.95)) drops[i] = 0;

    drops[i]++;
  }
}

/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/

initCanvas();
setInterval(draw, 45);
canvas.onclick = function() { if (char_mode == 'bin') {chars = generateChars(true);} else {chars = generateChars(false);} };

/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/