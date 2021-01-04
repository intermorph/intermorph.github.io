/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/

// cool page to see if you are on a mobile or not: http://detectmobilebrowsers.com

/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

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
if (mobileCheck() == false){
	var initFontSize = 20;
} else{
	var initFontSize = 13;
}
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
  if (mobileCheck() == false){
	canvas.height = window.innerHeight/2;
  } else {
	canvas.height = window.innerHeight/3; 
  }

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
  if (mobileCheck() == false){
	  console.log(initHeight, " vs. ", window.innerHeight);
	  fontSize = Math.round(initFontSize * (window.innerHeight / initHeight));
	  console.log(fontSize);
	  initCanvas();
  }
};

/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/

function draw() {
  // Set nearly transparent background so character trail is visible
  ctx.fillStyle = 'rgba(255, 255, 255, 0.125)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
	
  // Set color and font of falling letters
  ctx.fillStyle = '#000000';
  ctx.font = 'bold ' + fontSize + 'px monospace';

  var dropCount = drops.length;
  var charCount = chars.length;

  for (var i = 0; i < dropCount; i++) {
	  
	 if (i == 0 || i == dropCount-1){
		 continue;
	 }
	  
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
if (mobileCheck() == false){
	canvas.onclick = function() { if (char_mode == 'bin') {chars = generateChars(true);} else {chars = generateChars(false);} };
}
/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/

// Remove hover on mobiles

if (mobileCheck() == false) {
	document.body.className += ' hasHover';
}

console.log(document.body.className);

/*-----------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------*/