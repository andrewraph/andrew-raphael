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
     GALLERY
  ------------------------- */

  const gallery = document.querySelector('.gallery-track');



  /* -------------------------
     SMOOTH DESKTOP SCROLL
  ------------------------- */

  if (gallery && window.innerWidth > 900) {

    let targetScroll = gallery.scrollLeft;
    let currentScroll = gallery.scrollLeft;

    window.addEventListener(
      'wheel',
      (e) => {

        targetScroll += e.deltaY * 0.9;

        e.preventDefault();

      },
      { passive: false }
    );

    function animateScroll() {

      currentScroll += (targetScroll - currentScroll) * 0.08;

      gallery.scrollLeft = currentScroll;

      requestAnimationFrame(animateScroll);

    }

    animateScroll();

  }



  /* -------------------------
     CLICK + DRAG
  ------------------------- */

  if (gallery) {

    let isDown = false;
    let startX;
    let scrollLeft;

    gallery.addEventListener('mousedown', (e) => {

      isDown = true;

      gallery.classList.add('dragging');

      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;

    });

    window.addEventListener('mouseup', () => {

      isDown = false;

      gallery.classList.remove('dragging');

    });

    gallery.addEventListener('mouseleave', () => {

      isDown = false;

      gallery.classList.remove('dragging');

    });

    gallery.addEventListener('mousemove', (e) => {

      if (!isDown) return;

      e.preventDefault();

      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 1.5;

      gallery.scrollLeft = scrollLeft - walk;

    });

  }

});
