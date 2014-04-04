var on = false;

function turnon() {
	var audio = document.getElementById('audio_id');
	audio.src = getCurrentSong();
	audio.loop = true;
	audio.play();
}

function turnoff() {
	document.getElementById('audio_id').pause();
}

function getCurrentSong(){
	var curr = new Date();
	var hour = curr.getHours();
	var period = hour < 12 ? "a" : "p";
	if(hour == 0){
		hour = 12;
		period = "a"
	}
	if(hour > 12){
		hour -= 12;
	}

	var song = "songs/" + hour + "-" + period + "m\.mp3";
	console.log("current song is " + song);
	return song;
}

chrome.browserAction.onClicked.addListener(function(tab) {
	if(on) {
		turnoff();
		console.log("turning off music");
	} else {
		turnon();
		console.log("turning on music");
	}
	on = !on;
});

var loop = setInterval(function() {
	console.log("checking for new song");
	var song = getCurrentSong();
	var curr_song = document.getElementById('audio_id');

	if(song != curr_song.src && on){
		console.log("changing song");
		curr_song.src = song;
		curr_song.loop = true;
		curr_song.play();
	}
}, 60000);







