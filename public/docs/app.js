// Magic SDK Docs — interactivity (tabs, copy, TOC, scroll-spy, FAQ, checklist, theme, i18n)
(function () {
  // --- Language toggle (es/en) ---
  // The HTML defaults to Spanish. Translatable elements carry `data-en="..."`
  // with the English replacement for innerHTML, or `data-en-<attr>="..."` for
  // specific attributes (title, aria-label, etc).
  var ATTR_PREFIX = 'data-en-';
  var COPY_LABEL = { es: 'Copiar', en: 'Copy' };
  var COPIED_LABEL = { es: 'Copiado', en: 'Copied' };

  function detectInitialLocale() {
    try {
      var stored = localStorage.getItem('magic-docs-lang');
      if (stored === 'es' || stored === 'en') return stored;
    } catch (e) {}
    var nav = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
    return nav.indexOf('es') === 0 ? 'es' : 'en';
  }

  var origCache = new WeakMap();
  function rememberOriginal(el, key, value) {
    var store = origCache.get(el);
    if (!store) { store = {}; origCache.set(el, store); }
    if (!(key in store)) store[key] = value;
    return store[key];
  }

  function applyLocale(locale) {
    // innerHTML swaps via data-en
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var es = rememberOriginal(el, '__html', el.innerHTML);
      el.innerHTML = locale === 'en' ? el.getAttribute('data-en') : es;
    });
    // Attribute swaps via data-en-<attr>
    document.querySelectorAll('*').forEach(function (el) {
      if (!el.attributes) return;
      for (var i = 0; i < el.attributes.length; i++) {
        var a = el.attributes[i];
        if (a.name === 'data-en' || a.name.indexOf(ATTR_PREFIX) !== 0) continue;
        var target = a.name.slice(ATTR_PREFIX.length);
        var es = rememberOriginal(el, target, el.getAttribute(target) || '');
        el.setAttribute(target, locale === 'en' ? a.value : es);
      }
    });
    document.documentElement.setAttribute('lang', locale);
    document.documentElement.setAttribute('data-lang', locale);
    var label = document.getElementById('lang-toggle-label');
    if (label) label.textContent = locale === 'en' ? 'ES' : 'EN';
    window.__magicDocsLocale = locale;
  }

  var initialLocale = detectInitialLocale();
  applyLocale(initialLocale);

  var langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      var next = (window.__magicDocsLocale || 'es') === 'en' ? 'es' : 'en';
      applyLocale(next);
      try { localStorage.setItem('magic-docs-lang', next); } catch (e) {}
    });
  }

  // --- Theme toggle (light/dark) ---
  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', next);
      try { localStorage.setItem('magic-docs-theme', next); } catch (e) {}
    });
  }

  // --- Code tabs ---
  document.querySelectorAll('.code-card').forEach(card => {
    const tabs = card.querySelectorAll('.code-tab');
    const panes = card.querySelectorAll('.code-pane');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const id = tab.dataset.tab;
        card.querySelector(`.code-pane[data-pane="${id}"]`).classList.add('active');
      });
    });
  });

  // --- Copy buttons ---
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.code-card');
      const active = card.querySelector('.code-pane.active') || card.querySelector('.code-pane');
      const text = active.innerText;
      navigator.clipboard.writeText(text).then(() => {
        const locale = window.__magicDocsLocale === 'en' ? 'en' : 'es';
        const orig = btn.innerHTML;
        btn.classList.add('copied');
        btn.textContent = COPIED_LABEL[locale];
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = orig;
        }, 1400);
      });
    });
  });

  // --- FAQ toggle ---
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      q.parentElement.classList.toggle('open');
    });
  });

  // --- Checklist ---
  var CHECKLIST_DONE = { es: 'Listo', en: 'Done' };
  var CHECKLIST_PENDING = { es: 'Pendiente', en: 'Pending' };
  document.querySelectorAll('.checklist-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
      const status = item.querySelector('.checklist-status');
      if (status) {
        const locale = window.__magicDocsLocale === 'en' ? 'en' : 'es';
        status.textContent = item.classList.contains('checked') ? CHECKLIST_DONE[locale] : CHECKLIST_PENDING[locale];
      }
    });
  });

  // --- Scroll spy for sidebar + TOC ---
  const sections = Array.from(document.querySelectorAll('section.doc-section[id]'));
  const subheads = Array.from(document.querySelectorAll('.main h3[id]'));
  const sidebarLinks = document.querySelectorAll('.sidebar-link[data-target]');
  const tocLinks = document.querySelectorAll('.toc-list a[data-target]');

  function setActive(id) {
    sidebarLinks.forEach(a => a.classList.toggle('active', a.dataset.target === id));
  }
  function setActiveTOC(id) {
    tocLinks.forEach(a => a.classList.toggle('active', a.dataset.target === id));
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) setActive(e.target.id);
    });
  }, { rootMargin: '-100px 0px -65% 0px', threshold: 0 });
  sections.forEach(s => obs.observe(s));

  const obs2 = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) setActiveTOC(e.target.id);
    });
  }, { rootMargin: '-100px 0px -75% 0px', threshold: 0 });
  subheads.forEach(s => obs2.observe(s));

  // --- Keyboard customizer ---
  var customizer = document.getElementById('kb-customizer');
  if (customizer) {
    var preview = document.getElementById('kb-preview-customizer');
    var presets = document.getElementById('kb-presets');
    var modeToggleButtons = customizer.querySelectorAll('.kb-mode-toggle button');

    var ids = ['kb-light-primary', 'kb-light-on-primary', 'kb-dark-primary', 'kb-dark-on-primary'];
    var inputs = {};
    ids.forEach(function (id) {
      inputs[id] = {
        color: document.getElementById(id),
        hex: document.getElementById(id + '-hex')
      };
    });

    function isValidHex(v) { return /^[0-9a-fA-F]{6}$/.test(v); }

    function applyColors() {
      var mode = customizer.classList.contains('kb-dark') ? 'dark' : 'light';
      var primary = inputs['kb-' + mode + '-primary'].color.value;
      var onPrimary = inputs['kb-' + mode + '-on-primary'].color.value;
      preview.style.setProperty('--kb-primary', primary);
      preview.style.setProperty('--kb-on-primary', onPrimary);
    }

    // Color picker -> hex input + apply
    ids.forEach(function (id) {
      inputs[id].color.addEventListener('input', function () {
        inputs[id].hex.value = inputs[id].color.value.replace('#', '').toUpperCase();
        clearActivePreset();
        applyColors();
      });
      inputs[id].hex.addEventListener('input', function () {
        var clean = inputs[id].hex.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6);
        if (clean !== inputs[id].hex.value) inputs[id].hex.value = clean;
        if (isValidHex(clean)) {
          inputs[id].color.value = '#' + clean;
          clearActivePreset();
          applyColors();
        }
      });
    });

    // Light/Dark preview toggle
    modeToggleButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var mode = btn.getAttribute('data-mode');
        modeToggleButtons.forEach(function (b) {
          var isActive = b === btn;
          b.classList.toggle('active', isActive);
          b.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        customizer.classList.toggle('kb-dark', mode === 'dark');
        applyColors();
      });
    });

    // Presets
    function clearActivePreset() {
      presets.querySelectorAll('.kb-preset.active').forEach(function (b) {
        b.classList.remove('active');
      });
    }
    presets.addEventListener('click', function (e) {
      var btn = e.target.closest('.kb-preset');
      if (!btn) return;
      var lightP = btn.getAttribute('data-primary');
      var lightOn = btn.getAttribute('data-on-primary') || '#FFFFFF';
      var darkP = btn.getAttribute('data-dark-primary') || lightP;
      var darkOn = btn.getAttribute('data-dark-on-primary') || lightOn;
      function setPair(idP, idOn, p, on) {
        inputs[idP].color.value = p;
        inputs[idP].hex.value = p.replace('#', '').toUpperCase();
        inputs[idOn].color.value = on;
        inputs[idOn].hex.value = on.replace('#', '').toUpperCase();
      }
      setPair('kb-light-primary', 'kb-light-on-primary', lightP, lightOn);
      setPair('kb-dark-primary', 'kb-dark-on-primary', darkP, darkOn);
      clearActivePreset();
      btn.classList.add('active');
      applyColors();
    });

    applyColors();
  }
})();
