(() => {
  const english = document.documentElement.lang.startsWith('en');
  const repo = 'KSwordDEV/KSword';
  const fallback = [
  [
    "a996d38d91c85a9d99744454880a58b7b223f7f7",
    "fix(ui): structure complex process reports with inline field details",
    "2026-10-13T19:04:10-04:00"
  ],
  [
    "0f882ef7b29f9bf69c40db6705777208acf80873",
    "chore(mcp): prepare 0.1.1 trusted publisher release",
    "2026-10-13T18:25:21-04:00"
  ],
  [
    "12a69822ebceba2cf3b10ff766b61f67b9bb0ed3",
    "chore(memory): sign issue #216 completion record",
    "2026-10-13T16:22:15-04:00"
  ],
  [
    "844b893e9670a282f3c3d9e5479acae21a61b3c8",
    "fix(ui): restore PEB workspace and stable detail projection identities",
    "2026-10-13T16:20:26-04:00"
  ]
].map(([sha, message, date]) => ({ sha, message, date }));
  const list = document.querySelector('[data-git-timeline-list]');
  const status = document.querySelector('[data-git-timeline-status]');
  const details = list?.closest('details');
  if (!list || !details) return;
  let loaded = false;
  function render(commits) {
    list.replaceChildren(...commits.slice(0, 4).map(commit => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = 'https://github.com/' + repo + '/commit/' + commit.sha;
      a.target = '_blank'; a.rel = 'noreferrer';
      const code = document.createElement('code'); code.textContent = commit.sha.slice(0, 7);
      const span = document.createElement('span'); span.textContent = commit.message;
      a.append(code, span); li.append(a); return li;
    }));
  }
  details.addEventListener('toggle', async () => {
    if (!details.open || loaded) return;
    loaded = true;
    if (status) status.textContent = english ? 'Loading…' : '正在读取…';
    try {
      const response = await fetch('https://api.github.com/repos/' + repo + '/commits?sha=main&per_page=4', { signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const payload = await response.json();
      if (!Array.isArray(payload)) throw new Error('Invalid commit list');
      const commits = payload.filter(c => /^[a-f0-9]{40}$/.test(c.sha) && c.commit?.message).map(c => ({ sha:c.sha, message:c.commit.message.split('\n')[0] }));
      if (!commits.length) throw new Error('Empty commit list');
      render(commits); if (status) status.textContent = '';
    } catch {
      render(fallback); if (status) status.textContent = english ? 'Showing saved activity.' : '当前显示已保存的记录。';
    }
  });
})();

(() => {
  const english = document.documentElement.lang.startsWith('en');
  const tabs = [...document.querySelectorAll('[data-showcase-tab]')];
  const panels = [...document.querySelectorAll('[data-showcase-panel]')];
  function selectTab(index, focus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.showcasePanel !== tabs[index].dataset.showcaseTab; });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(index));
    tab.addEventListener('keydown', event => {
      const next = {ArrowLeft: (index - 1 + tabs.length) % tabs.length, ArrowRight: (index + 1) % tabs.length, Home: 0, End: tabs.length - 1}[event.key];
      if (next === undefined) return;
      event.preventDefault(); selectTab(next, true);
    });
  });

  const dialog = document.querySelector('[data-image-viewer]');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const links = [...document.querySelectorAll('[data-screenshot]')];
  const screenshots = [...new Map(links.map(link => [link.dataset.screenshot, {
    id: link.dataset.screenshot, url: link.href, title: link.dataset.title, caption: link.dataset.caption
  }])).values()];
  const full = dialog.querySelector('[data-image-full]');
  const viewport = dialog.querySelector('[data-image-viewport]');
  const title = dialog.querySelector('#image-viewer-title');
  const caption = dialog.querySelector('[data-image-caption]');
  const count = dialog.querySelector('[data-image-count]');
  const original = dialog.querySelector('[data-image-original]');
  const zoom = dialog.querySelector('[data-image-zoom]');
  let current = 0;
  let opener = null;
  let oldOverflow = '';
  function setActual(actual) {
    dialog.classList.toggle('is-actual', actual);
    zoom.setAttribute('aria-pressed', String(actual));
    zoom.textContent = actual ? (english ? 'Fit to window' : '适应窗口') : (english ? 'Actual size' : '原始尺寸');
    viewport.scrollTop = 0; viewport.scrollLeft = 0;
  }
  function show(index) {
    current = (index + screenshots.length) % screenshots.length;
    const item = screenshots[current];
    setActual(false);
    title.textContent = item.title;
    caption.textContent = item.caption;
    count.textContent = (current + 1) + ' / ' + screenshots.length;
    original.href = item.url;
    full.alt = item.title + ' — ' + item.caption;
    full.src = item.url;
  }
  links.forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    show(screenshots.findIndex(item => item.id === link.dataset.screenshot));
    dialog.showModal();
    dialog.querySelector('[data-image-close]').focus();
  }));
  dialog.querySelector('[data-image-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-image-prev]').addEventListener('click', () => show(current - 1));
  dialog.querySelector('[data-image-next]').addEventListener('click', () => show(current + 1));
  zoom.addEventListener('click', () => setActual(!dialog.classList.contains('is-actual')));
  dialog.addEventListener('keydown', event => {
    if (dialog.classList.contains('is-actual') || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = oldOverflow;
    full.removeAttribute('src');
    if (opener?.isConnected) opener.focus({preventScroll:true});
  });
})();
