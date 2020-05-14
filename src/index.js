const animalCrossingAudio = document.createElement('audio');
animalCrossingAudio.loop = 'true';

document.body.appendChild(animalCrossingAudio);

const ONE_MINUTE = 60 * 1000;

let on = false;
let intervalId = null;

function getCurrentSong() {
  const hours = new Date().getHours();
  return chrome.runtime.getURL(`src/assets/audio/${hours}.mp3`);
}

function checkForNextSong() {
  const song = getCurrentSong();
  const playingSong = animalCrossingAudio.getAttribute('src');

  if (song !== playingSong) {
    animalCrossingAudio.setAttribute('src', song);
    animalCrossingAudio.play();
  }
}

chrome.browserAction.onClicked.addListener(function() {
  if (on) {
    animalCrossingAudio.pause();
    clearInterval(intervalId);
  } else {
    animalCrossingAudio.setAttribute('src', getCurrentSong());
    animalCrossingAudio.play();
    setInterval(checkForNextSong, ONE_MINUTE);
  }
  on = !on;
});


