// Mobile nav toggle for the top bar. Progressive enhancement: if this doesn't
// run, the nav stays visible (the CSS only collapses it when <html> has .js).
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.classList.toggle('open', open);
  }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Close after choosing a destination.
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  // Close on outside click or Escape.
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });

  // Reset state when the viewport grows back past the breakpoint.
  var mq = window.matchMedia('(min-width: 801px)');
  function onChange() { if (mq.matches) setOpen(false); }
  if (mq.addEventListener) { mq.addEventListener('change', onChange); }
  else if (mq.addListener) { mq.addListener(onChange); }
})();
