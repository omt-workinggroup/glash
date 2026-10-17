(function () {
  var PHONE = '233548222377';

  var header = document.querySelector('.site-header');
  var nav = document.getElementById('site-nav');
  var toggle = document.querySelector('.nav-toggle');

  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function setNav(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  }
  toggle.addEventListener('click', function () {
    setNav(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setNav(false);
  });

  // Hero: one photo at a time
  var slides = document.querySelectorAll('.hero__frame img');
  var caption = document.querySelector('[data-caption]');
  var index = document.querySelector('[data-index]');
  var names = ['Honey curls', 'Fulani braids', 'Cornrows', 'Knotless'];
  var current = 0;
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (slides.length > 1 && !still) {
    setInterval(function () {
      if (document.hidden) return;
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
      caption.textContent = names[current];
      index.textContent = current + 1;
    }, 5000);
  }

  // Opening hours. Accra is on GMT all year, so UTC is local time.
  var now = new Date();
  var day = now.getUTCDay();
  var hour = now.getUTCHours() + now.getUTCMinutes() / 60;
  var opens = day === 0 ? 13 : 9;
  var isOpen = hour >= opens && hour < 20;

  var todayRow = document.querySelector('#hours [data-days="' + (day === 0 ? '0' : '1-6') + '"]');
  if (todayRow) todayRow.classList.add('is-today');

  var status = document.getElementById('hours-now');
  status.textContent = isOpen ? 'Open now' : 'Closed right now. WhatsApp messages are still answered.';
  status.classList.toggle('is-open', isOpen);
  status.hidden = false;

  document.getElementById('year').textContent = now.getUTCFullYear();

  // Booking form → prefilled WhatsApp message
  var form = document.getElementById('book-form');
  form.date.min = now.toISOString().slice(0, 10);

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = form.name.value.trim();
    var field = form.name.closest('.field');
    field.classList.toggle('has-error', !name);
    if (!name) {
      form.name.focus();
      return;
    }

    var lines = ['Hi, I\'d like to book an appointment.', '', 'Name: ' + name, 'Service: ' + form.service.value];
    if (form.date.value) lines.push('Day: ' + form.date.value);
    if (form.time.value) lines.push('Time: ' + form.time.value);
    if (form.notes.value.trim()) lines.push('Notes: ' + form.notes.value.trim());

    window.open('https://wa.me/' + PHONE + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
  });
})();
