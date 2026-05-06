// Magic SDK Docs — interactivity (tabs, copy, TOC, scroll-spy, FAQ, checklist)
(function () {
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
})();
