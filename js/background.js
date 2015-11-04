$(document).ready(function() {
    var on = false;
    var music = $('#acMusic');

    function turnOn() {
        music.prop('src', getCurrentSong());
        music.trigger('play');
    }

    function getCurrentSong() {
        return 'songs/' + new Date().getHours() + '.mp3';
    }

    chrome.browserAction.onClicked.addListener(function(tab) {
        if (on) {
            music.trigger('pause');
        } else {
            turnOn();
        }
        on = !on;
    });

    var loop = setInterval(function() {
        var song = getCurrentSong();
        var musicSrc = music.prop('src');

        if (song !== musicSrc && on) {
            music.prop('src', song);
            music.prop('loop', true);
            music.trigger('play');
        }
    }, 60000);
});