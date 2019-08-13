document.addEventListener('DOMContentLoaded', () => {
  const animalCrossing = document.getElementById('acMusic');

  let on = false;

  const getCurrentSong = () => {
    const hours = new Date().getHours();
    return `assets/audio/${hours}.mp3`;
  };

  chrome.browserAction.onClicked.addListener(() => {
    if (on) {
      animalCrossing.pause();
    } else {
      animalCrossing.setAttribute('src', getCurrentSong());
      animalCrossing.play();
    }
    on = !on;
  });

  setInterval(() => {
    if (on) {
      const song = getCurrentSong();
      const playingSong = animalCrossing.getAttribute('src');

      if (song !== playingSong) {
        animalCrossing.setAttribute('src', song);
        animalCrossing.play();
      }
    }
  }, 60 * 1000);
});
