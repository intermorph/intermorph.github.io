var lastScrollTop = 0;
var delta = 5; // Determines the minimum amount of scroll before acting
var navbarHeight = document.getElementById('header').offsetHeight; // Height of your header

window.addEventListener("scroll", function() {
  var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  // Ensure sufficient scroll
  if (Math.abs(lastScrollTop - currentScroll) <= delta)
    return;

  if (currentScroll > lastScrollTop && currentScroll > navbarHeight) {
    // Scroll Down
    document.getElementById('header').classList.add('hide');
  } else {
    // Scroll Up
    if (currentScroll + window.innerHeight < document.documentElement.scrollHeight) {
      document.getElementById('header').classList.remove('hide');
    }
  }

  lastScrollTop = currentScroll;
}, false);