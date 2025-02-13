// Select all the elements in the HTML page
// and assign them to a variable

let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');
let track_list = [
	{
	//   name: "The Time We Spent Together",
	//   artist: "ft-Our Obsession With Food",
	  path: "https://ia600809.us.archive.org/22/items/bad192f7-8615-4809-b392-4be387f34cd0/bad192f7-8615-4809-b392-4be387f34cd0.mp3"
	},
	{
	  
	  path: "https://ia902306.us.archive.org/22/items/spotify-mate.com-505-arctic-monkeys/SpotifyMate.com%20-%20505%20-%20Arctic%20Monkeys.mp3"
	},
	{
     
	  path: "https://ia902209.us.archive.org/29/items/spotify-mate.com-always-forever-cults/SpotifyMate.com%20-%20Always%20Forever%20-%20Cults.mp3",
	},
	{
		//path: "https://ia803401.us.archive.org/15/items/spotifydown.com-too-many-nights-feat.-don-toliver-with-future-metro-boomin/spotifydown.com%20-%20Too%20Many%20Nights%20%28feat.%20Don%20Toliver%20%26%20with%20Future%29%20-%20Metro%20Boomin.mp3",
		
	  path: "https://ia800608.us.archive.org/25/items/spotify-mate.com-nights-like-this-the-kid-laroi/SpotifyMate.com%20-%20NIGHTS%20LIKE%20THIS%20-%20The%20Kid%20LAROI.mp3",
	},
  ];
  function loadTrack(track_index) {
	clearInterval(updateTimer);
	resetValues();
	curr_track.src = track_list[track_index].path;
	curr_track.load();
  
	track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
	track_name.textContent = track_list[track_index].name;
	track_artist.textContent = track_list[track_index].artist;

  
	updateTimer = setInterval(seekUpdate, 1000);
	curr_track.addEventListener("ended", nextTrack);
  //   random_bg_color();

  }
  function resetValues() {
	track_index=active;
	curr_time.textContent = "00:00";
	total_duration.textContent = "00:00";
	seek_slider.value = 0;
  }
  
  
// Define the list of tracks that have to be played
  
  function seekTo() {
	let seekto = curr_track.duration * (seek_slider.value / 100);
	curr_track.currentTime = seekto;
  }
  
  function setVolume() {
	curr_track.volume = volume_slider.value / 100;
  }
  
  function seekUpdate() {
	let seekPosition = 0;
  
	if (!isNaN(curr_track.duration)) {
	  seekPosition = curr_track.currentTime * (100 / curr_track.duration);
  
	  seek_slider.value = seekPosition;
  
	  let currentMinutes = Math.floor(curr_track.currentTime / 60);
	  let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
	  let durationMinutes = Math.floor(curr_track.duration / 60);
	  let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
  
	  if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
	  if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
	  if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
	  if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
  
	  curr_time.textContent = currentMinutes + ":" + currentSeconds;
	  total_duration.textContent = durationMinutes + ":" + durationSeconds;
	}
  }
  
  function loadTrack(track_index) {
	// Clear the previous seek timer
	clearInterval(updateTimer);
	resetValues();
	
	// Load a new track
	curr_track.src = track_list[active].path;
	curr_track.load();
	
	// Update details of the track
	track_art.style.backgroundImage = 
		"url(" + track_list[track_index].image + ")";
	track_name.textContent = track_list[track_index].name;
	track_artist.textContent = track_list[track_index].artist;


	
	// Set an interval of 1000 milliseconds
	// for updating the seek slider
	updateTimer = setInterval(seekUpdate, 1000);
	
	// Move to the next track if the current finishes playing
	// using the 'ended' event
	curr_track.addEventListener("ended", nextTrack);
	
	// Apply a random background color
	//random_bg_color();
	}
	
	function random_bg_color() {
	// Get a random number between 64 to 256
	// (for getting lighter colors)
	let red = Math.floor(Math.random() * 256) + 64;
	let green = Math.floor(Math.random() * 256) + 64;
	let blue = Math.floor(Math.random() * 256) + 64;
	
	// Construct a color with the given values
	let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
	
	// Set the background to the new color
	document.body.style.background = bgColor;
	}
	
	// Function to reset all values to their default
	function resetValues() {
	curr_time.textContent = "00:00";
	total_duration.textContent = "00:00";
	seek_slider.value = 0;
	}
	function playpauseTrack() {
		// Switch between playing and pausing
		// depending on the current state
		if (!isPlaying) playTrack();
		else pauseTrack();
		}
		
		function playTrack() {
		// Play the loaded track
		curr_track.play();
		isPlaying = true;
		
		// Replace icon with the pause icon
		playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
		}
		
		function pauseTrack() {
		// Pause the loaded track
		curr_track.pause();
		isPlaying = false;
		
		// Replace icon with the play icon
		playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
		}
		
		function nextTrack() {
		// Go back to the first track if the
		// current one is the last in the track list
		if (track_index < track_list.length - 1)
			track_index += 1;
		else track_index = 0;
		
		// Load and play the new track
		loadTrack(track_index);
		playTrack();
		}
		
		function prevTrack() {
		// Go back to the last track if the
		// current one is the first in the track list
		if (track_index > 0)
			track_index -= 1;
		else track_index = track_list.length - 1;
		
		// Load and play the new track
		loadTrack(track_index);
		playTrack();
		}
		function seekTo() {
			// Calculate the seek position by the
			// percentage of the seek slider 
			// and get the relative duration to the track
			seekto = curr_track.duration * (seek_slider.value / 100);
			
			// Set the current track position to the calculated seek position
			curr_track.currentTime = seekto;
			}
			
			function setVolume() {
			// Set the volume according to the
			// percentage of the volume slider set
			curr_track.volume = volume_slider.value / 100;
			}
			
			function seekUpdate() {
			let seekPosition = 0;
			
			// Check if the current track duration is a legible number
			if (!isNaN(curr_track.duration)) {
				seekPosition = curr_track.currentTime * (100 / curr_track.duration);
				seek_slider.value = seekPosition;
			
				// Calculate the time left and the total duration
				let currentMinutes = Math.floor(curr_track.currentTime / 60);
				let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
				let durationMinutes = Math.floor(curr_track.duration / 60);
				let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
			
				// Add a zero to the single digit time values
				if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
				if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
				if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
				if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
			
				// Display the updated duration
				curr_time.textContent = currentMinutes + ":" + currentSeconds;
				total_duration.textContent = durationMinutes + ":" + durationSeconds;
			}
			}
			let items = document.querySelectorAll('.slider .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
	
	
	  
    let active = 0;
    function loadShow(){
        let stt = 0;
        items[active].style.transform = `none`;
        items[active].style.zIndex = 1;
        items[active].style.filter = 'none';
        items[active].style.opacity = 1;
        for(var i = active + 1; i < items.length; i++){
            stt++;
            items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
        stt = 0;
        for(var i = active - 1; i >= 0; i--){
            stt++;
            items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }

		
    }
    loadShow();
    next.onclick = function(){
        active = active + 1 < items.length ? active + 1 : active;
		curr_track.src = track_list[active].path;
        loadShow();
		loadTrack(active);
		curr_track.load();
		track_index=active;
		loadTrack(track_index);
		curr_track.load();
		isPlaying=true;
		resetValues();
		playTrack();

    }
    prev.onclick = function(){
        active = active - 1 >= 0 ? active - 1 : active;

        loadShow();
		curr_track.load();
		loadTrack(active);
		track_index=active;
		loadTrack(track_index);
		curr_track.load();
		isPlaying=true;
		resetValues();
		playTrack();

		
    }
  // Load the first track in the tracklist
 if(active==0){
	loadTrack(0);
 }

// Load the first track in the tracklist
loadTrack(track_index);
						

const envelope = document.querySelector('.envelope-wrapper');
        envelope.addEventListener('click', () => {
            envelope.classList.toggle('flap');
        });