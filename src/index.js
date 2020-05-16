const ONE_MINUTE = 60 * 1000;
let on = false;
let intervalId = null;

const animalCrossingAudio = document.createElement('audio');
animalCrossingAudio.setAttribute('loop', 'true');

document.body.appendChild(animalCrossingAudio);

function getSongForHour() {
  const hours = new Date().getHours();
  return chrome.runtime.getURL(`src/assets/audio/${hours}.mp3`);
}

function checkForNextSong() {
  const songForHour = getSongForHour();
  const currentSong = animalCrossingAudio.getAttribute('src');

  if (songForHour !== currentSong) {
    animalCrossingAudio.setAttribute('src', songForHour);
    animalCrossingAudio.play();
  }
}

chrome.browserAction.onClicked.addListener(function() {
  if (on) {
    animalCrossingAudio.pause();
    clearInterval(intervalId);
  } else {
    animalCrossingAudio.setAttribute('src', getSongForHour());
    animalCrossingAudio.play();

    intervalId = setInterval(checkForNextSong, ONE_MINUTE);
  }
  on = !on;
});


