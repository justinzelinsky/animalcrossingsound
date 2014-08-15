$(document).ready(function() {

    var on = false;
    var music = document.getElementById("acMusic");

    function turnon() {
        music.src = getCurrentSong();
        music.play();
    }

    function getCurrentSong(){
        return "songs/" + new Date().getHours() + ".mp3";
    }

    chrome.browserAction.onClicked.addListener(function(tab) {
        if (on) {
            music.pause();
            console.log("turning off music");
        } else {
            turnon();
        }
        on = !on;
    });

    var loop = setInterval(function() {
        var song = getCurrentSong();

        if (song != music.src && on) {
            music.src = song;
            music.loop = true;
            music.play();
        }
    }, 60000);
});
