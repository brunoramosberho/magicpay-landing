// Magic SDK Docs — interactivity (tabs, copy, TOC, scroll-spy, FAQ, checklist, theme)
(function () {
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
        btn.classList.add('copied');
        const orig = btn.textContent;
        btn.textContent = 'Copiado';
        setTimeout(() => { btn.classList.remove('copied'); btn.textContent = orig; }, 1400);
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
  document.querySelectorAll('.checklist-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
      const status = item.querySelector('.checklist-status');
      if (status) status.textContent = item.classList.contains('checked') ? 'Done' : 'Pending';
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
