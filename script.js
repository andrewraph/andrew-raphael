document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------
     WORLD CLOCKS 
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
          `<span class="colon ${colonVisible ? 'on' : ''}">:</span>`
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
     HORIZONTAL SCROLL 
  ------------------------- */

  const gallery = document.querySelector('.gallery-track');
  const mq = window.matchMedia('(min-width: 900px)');

  let wheelHandler = null;

  function enableDesktopScroll() {
    if (!gallery) return;

    if (wheelHandler) return; 

    wheelHandler = (e) => {
      gallery.scrollLeft += e.deltaY;
      e.preventDefault();
    };

    window.addEventListener('wheel', wheelHandler, { passive: false });
  }

  function disableDesktopScroll() {
    if (wheelHandler) {
      window.removeEventListener('wheel', wheelHandler);
      wheelHandler = null;
    }
  }

  function handleModeChange(e) {
    if (e.matches) {
      enableDesktopScroll();
    } else {
      disableDesktopScroll();
    }
  }

  // init state
  handleModeChange(mq);

  // listen for resize / orientation changes
  mq.addEventListener('change', handleModeChange);

  /* -------------------------
     ELSEWHERE TOGGLE
  ------------------------- */

  const elsewhereToggle = document.querySelector('.elsewhere-toggle');
  const elsewhereContent = document.querySelector('.elsewhere-content');

  if (elsewhereToggle && elsewhereContent) {

    elsewhereToggle.addEventListener('click', (e) => {

      e.preventDefault();

      if (elsewhereContent.classList.contains('open')) {
  elsewhereContent.classList.remove('open');
} else {
  elsewhereContent.classList.add('open');
}

    });

  }

});
