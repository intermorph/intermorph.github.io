function loadIframes() {
	
    // Retrieve placeholders and their data attributes for URLs
    var youtubePlaceholder = document.getElementById('youtube-placeholder');
    var spotifyPlaceholder = document.getElementById('spotify-placeholder');

    var youtubeURL = youtubePlaceholder.getAttribute('data-youtube');
    var spotifyURL = spotifyPlaceholder.getAttribute('data-spotify');

    // Create and load the YouTube iframe
    var youtubeIframe = document.createElement('iframe');
    youtubeIframe.src = youtubeURL;
    youtubeIframe.frameborder = "0";
    youtubeIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    youtubeIframe.setAttribute("allowfullscreen", "");
    youtubeIframe.style.visibility = "hidden"; // Initially hide the iframe
    youtubeIframe.onload = function() {
		document.getElementById('youtube-loading-gif').remove(); // Remove the GIF
        youtubeIframe.style.visibility = "visible"; // Show the iframe when it's loaded
    };
    youtubePlaceholder.appendChild(youtubeIframe);

    // Create and load the Spotify iframe
    var spotifyIframe = document.createElement('iframe');
    spotifyIframe.src = spotifyURL;
    spotifyIframe.frameborder = "0";
    spotifyIframe.setAttribute("allowtransparency", "true");
    spotifyIframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
    spotifyIframe.style.visibility = "hidden"; // Initially hide the iframe
    spotifyIframe.onload = function() {
		document.getElementById('spotify-loading-gif').remove(); // Remove the GIF
        spotifyIframe.style.visibility = "visible"; // Show the iframe when it's loaded
    };
    spotifyPlaceholder.appendChild(spotifyIframe);
	
}

window.onload = loadIframes;
