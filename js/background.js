document.addEventListener('DOMContentLoaded', function(event) {
    let on = false;
    const animalCrossing = document.getElementById('acMusic');
    
    function getCurrentSong() {
        const hours = new Date().getHours();
        return 'songs/' + hours + '.mp3';
    }

    chrome.browserAction.onClicked.addListener(function(tab) {
        if (on) {
            animalCrossing.pause();
        } else {
            animalCrossing.setAttribute('src', getCurrentSong());
            animalCrossing.play();
        }
        on = !on;
    });
    
    setInterval(function() {
        if (on) {
            const song = getCurrentSong();
            const playingSong = animalCrossing.getAttribute('src');
            if (song !== playingSong) {
                animalCrossing.setAttribute('src', song);
                animalCrossing.play();
            }
        }
    }, 60 * 1000); // every minute, check if we need to change the song
});
