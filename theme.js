/* ===== ARFELYA DARK / LIGHT THEME ===== */
(function () {

  // Baca tema tersimpan, default gelap
  var saved = localStorage.getItem('arfelya-theme') || 'dark';

  // Terapkan sebelum render untuk cegah flash
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');

  document.addEventListener('DOMContentLoaded', function () {

    // Terapkan class ke body
    if (saved === 'light') document.body.classList.add('theme-light');

    // Sisipkan tombol toggle ke semua .nav-inner yang ada
    document.querySelectorAll('.nav-inner').forEach(function (inner) {
      var btn = document.createElement('button');
      btn.className = 'theme-toggle-btn';
      btn.setAttribute('aria-label', 'Ganti tema');
      btn.onclick = toggleTheme;
      inner.appendChild(btn);
      updateBtn(btn);
    });

    // Scroll reveal
    initReveal();

    // Back-to-top
    var topBtn = document.createElement('button');
    topBtn.id = 'back-to-top';
    topBtn.innerHTML = '↑';
    topBtn.title = 'Kembali ke atas';
    topBtn.onclick = function () { window.scrollTo({ top: 0, behavior: 'smooth' }); };
    document.body.appendChild(topBtn);

    window.addEventListener('scroll', function () {
      topBtn.classList.toggle('visible', window.scrollY > 300);
    });

    // Hamburger mobile
    initHamburger();
  });

  function toggleTheme() {
    var isLight = document.body.classList.toggle('theme-light');
    saved = isLight ? 'light' : 'dark';
    localStorage.setItem('arfelya-theme', saved);
    document.querySelectorAll('.theme-toggle-btn').forEach(updateBtn);
  }

  function updateBtn(btn) {
    var isLight = document.body.classList.contains('theme-light');
    btn.innerHTML = isLight
      ? '<span class="tt-icon">🌙</span><span class="tt-label">Gelap</span>'
      : '<span class="tt-icon">☀️</span><span class="tt-label">Terang</span>';
  }

  function initReveal() {
    var els = document.querySelectorAll(
      'section, .promo-item, .product-card, .about-container, .card-panel, ' +
      '.form-container, .order-summary, .table-container-box, .promo-strip, .stats-bar'
    );
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.style.opacity = '1'; });
      return;
    }
    els.forEach(function (el) { el.classList.add('ar-reveal'); });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('ar-visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.07 });
    els.forEach(function (el) { obs.observe(el); });
  }

  function initHamburger() {
    var navInner = document.querySelector('.nav-inner');
    var navUl    = document.querySelector('nav ul');
    if (!navInner || !navUl) return;

    var hbtn = document.createElement('button');
    hbtn.className = 'ar-hamburger';
    hbtn.setAttribute('aria-label', 'Menu');
    hbtn.innerHTML = '<span></span><span></span><span></span>';
    navInner.insertBefore(hbtn, navInner.querySelector('.theme-toggle-btn'));

    hbtn.addEventListener('click', function () {
      hbtn.classList.toggle('open');
      navUl.classList.toggle('open');
    });
    navUl.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hbtn.classList.remove('open');
        navUl.classList.remove('open');
      });
    });
  }

  window.toggleTheme = toggleTheme;
})();