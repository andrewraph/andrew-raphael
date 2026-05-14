/* -------------------------
   WAIT FOR DOM
------------------------- */

document.addEventListener('DOMContentLoaded', () => {

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

    const parts = new Intl.DateTimeFormat('en-GB', options)
      .format(now)
      .split(':');

    const colonVisible = now.getSeconds() % 2 === 0;

    return `
      ${label}
      ${parts[0]}
      <span style="opacity:${colonVisible ? 1 : 0}">:</span>
      ${parts[1]}
    `;
  }

  function setClock(id, zone, label) {

    const el = document.getElementById(id);

    if (!el) return;

    el.innerHTML = formatTime(zone, label);

  }

  function updateClocks() {

    setClock('chi', 'America/Chicago', 'CHI');
    setClock('nyc', 'America/New_York', 'NYC');
    setClock('la', 'America/Los_Angeles', 'LA');
    setClock('par', 'Europe/Paris', 'PAR');
    setClock('lon', 'Europe/London', 'LON');
    setClock('mil', 'Europe/Rome', 'MIL');

  }

  updateClocks();
  setInterval(updateClocks, 1000);


  /* -------------------------
     SIMPLE DESKTOP SIDE SCROLL
  ------------------------- */

  const gallery = document.querySelector('.gallery-track');

  if (gallery && window.innerWidth > 900) {

    window.addEventListener(
      'wheel',
      (e) => {

        gallery.scrollLeft += e.deltaY;

        e.preventDefault();

      },
      { passive: false }
    );

  }

});
