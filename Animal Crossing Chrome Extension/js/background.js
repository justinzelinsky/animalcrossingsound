$(document).ready(function() {

    var on = false;
    var music = document.getElementById("acMusic");

    function turnon() {
        music.src = getCurrentSong();
        music.play();
    }

    function getCurrentSong() {
        var curr = new Date();
        var hour = curr.getHours();
        var period = hour < 12 ? "a" : "p";
        if (hour == 0) {
            hour = 12;
            period = "a";
        }
        if (hour > 12) {
            hour -= 12;
        }

        var song = "songs/" + hour + "-" + period + "m\.mp3";
        return song;
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
