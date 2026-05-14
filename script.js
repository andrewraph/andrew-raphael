/* -------------------------
   WAIT FOR DOM
------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------
     WORLD CLOCKS (NO LAYOUT SHIFT)
  ------------------------- */

  function formatTime(timeZone, label) {

    const now = new Date();

    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone
    };

    const time = new Intl.DateTimeFormat('en-GB', options).format(now);

    const colonVisible = now.getSeconds() % 2 === 0;

    return `
      <span class="tz-label">${label}</span>
      <span class="tz-time">
        ${time.replace(
          ':',
          `<span class="colon ${colonVisible?'on':''}">:</span>`
        )}
      </span>
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
     CLEAN DESKTOP HORIZONTAL SCROLL
     (NO FIGHTING / NO SMOOTHING ENGINE)
  ------------------------- */

  const gallery = document.querySelector('.gallery-track');

  if (gallery && window.innerWidth > 900) {

    window.addEventListener(
      'wheel',
      (e) => {

        // pure axis conversion only
        gallery.scrollLeft += e.deltaY;

        e.preventDefault();

      },
      { passive: false }
    );

  }

});
