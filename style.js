/* ===== ARFELYA THEME + UX SYSTEM ===== */
(function () {
  /* ---------- 1. TEMA: terapkan sebelum render (cegah flash) ---------- */
  var saved = localStorage.getItem('arfelya-theme');
  if (saved === 'light') document.documentElement.classList.add('pre-light');

  document.addEventListener('DOMContentLoaded', function () {
    if (saved === 'light') {
      document.body.classList.add('light');
      document.documentElement.classList.remove('pre-light');
    }
    updateToggleUI();

    /* ---------- 2. INJECT ELEMEN GLOBAL (back-to-top + hamburger) ---------- */
    injectBackToTop();
    injectHamburger();

    /* ---------- 3. SCROLL REVEAL ---------- */
    initScrollReveal();

    /* ---------- 4. BACK-TO-TOP VISIBILITY ---------- */
    window.addEventListener('scroll', function () {
      var btn = document.getElementById('back-to-top');
      if (btn) btn.classList.toggle('visible', window.scrollY > 320);
    });
  });

  /* ---- Toggle tema ---- */
  function toggleTheme() {
    var isLight = document.body.classList.toggle('light');
    localStorage.setItem('arfelya-theme', isLight ? 'light' : 'dark');
    updateToggleUI();
  }

  function updateToggleUI() {
    var isLight = document.body.classList.contains('light');
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.querySelector('.toggle-icon').textContent  = isLight ? '☀️' : '🌙';
      btn.querySelector('.toggle-label').textContent = isLight ? 'Terang' : 'Gelap';
      btn.setAttribute('title', isLight ? 'Ganti ke tema gelap' : 'Ganti ke tema terang');
    });
  }

  /* ---- Inject tombol Back-to-Top ---- */
  function injectBackToTop() {
    var btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.title = 'Kembali ke atas';
    btn.innerHTML = '↑';
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(btn);
  }

  /* ---- Inject Hamburger untuk mobile ---- */
  function injectHamburger() {
    var navInner = document.querySelector('.nav-inner');
    var navUl    = document.querySelector('nav ul');
    if (!navInner || !navUl) return;

    var hbtn = document.createElement('button');
    hbtn.className = 'hamburger';
    hbtn.setAttribute('aria-label', 'Buka menu');
    hbtn.innerHTML = '<span></span><span></span><span></span>';

    /* sisipkan sebelum theme-toggle */
    var toggle = navInner.querySelector('.theme-toggle');
    navInner.insertBefore(hbtn, toggle || null);

    hbtn.addEventListener('click', function () {
      hbtn.classList.toggle('open');
      navUl.classList.toggle('open');
      hbtn.setAttribute('aria-label', navUl.classList.contains('open') ? 'Tutup menu' : 'Buka menu');
    });

    /* tutup saat klik link */
    navUl.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hbtn.classList.remove('open');
        navUl.classList.remove('open');
      });
    });
  }

  /* ---- Scroll Reveal (IntersectionObserver) ---- */
  function initScrollReveal() {
    /* Tandai elemen yang ingin di-reveal */
    var selectors = [
      'section', '.promo-item', '.product-card',
      '.about-container', '.card-panel', '.order-summary',
      '.stats-bar', '.table-container-box', '.promo-strip',
      '.page-header h1', '.section-title', '.form-container'
    ];
    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (!el.classList.contains('reveal')) {
          el.classList.add('reveal');
        }
      });
    });

    if (!('IntersectionObserver' in window)) {
      /* Fallback: langsung tampilkan semua */
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* Expose ke global */
  window.toggleTheme = toggleTheme;
})();