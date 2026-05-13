/* -------------------------
   LIVE WORLD CLOCKS
------------------------- */

function formatTime(timeZone, label) {

  const now = new Date();

  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone
  };

  let time = new Intl.DateTimeFormat('en-GB', options)
    .format(now)
    .replace(':', now.getSeconds() % 2 === 0 ? ':' : ' ');

  return `${label} ${time}`;
}

function updateClocks() {

  document.getElementById('chi').textContent =
    formatTime('America/Chicago', 'CHI');

  document.getElementById('nyc').textContent =
    formatTime('America/New_York', 'NYC');

  document.getElementById('la').textContent =
    formatTime('America/Los_Angeles', 'LA');

  document.getElementById('par').textContent =
    formatTime('Europe/Paris', 'PAR');

  document.getElementById('lon').textContent =
    formatTime('Europe/London', 'LON');

  document.getElementById('mil').textContent =
    formatTime('Europe/Rome', 'MIL');
}

updateClocks();
setInterval(updateClocks, 1000);


/* -------------------------
   HORIZONTAL SCROLL
------------------------- */

const gallery = document.querySelector('.gallery-track');

if (window.innerWidth > 900) {

  window.addEventListener(
    'wheel',
    (e) => {

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        gallery.scrollLeft += e.deltaY;
      }

    },
});
