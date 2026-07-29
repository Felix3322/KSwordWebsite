(() => {
  function initGallery() {
    const gallery = document.querySelector('[data-gallery]');
    if (!gallery) return;

    const items = [...gallery.querySelectorAll('[data-gallery-item]')];
    const count = document.querySelector('.gallery-count');
    if (items.length === 0) return;
    const indexButtons = [...document.querySelectorAll('[data-gallery-index]')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let activeIndex = 0;
    let scrollFrame = 0;

    const pad = number => String(number).padStart(2, '0');

    function update(index) {
      activeIndex = (index + items.length) % items.length;
      if (count) count.textContent = `${pad(activeIndex + 1)} / ${pad(items.length)}`;
      indexButtons.forEach((button, buttonIndex) => {
        button.setAttribute('aria-current', buttonIndex === activeIndex ? 'true' : 'false');
      });
    }

    function goTo(index) {
      const normalized = (index + items.length) % items.length;
      const target = items[normalized];
      const left = target.offsetLeft - gallery.offsetLeft - (gallery.clientWidth - target.offsetWidth) / 2;
      gallery.scrollTo({ left, behavior: reducedMotion ? 'auto' : 'smooth' });
      update(normalized);
    }

    document.querySelector('[data-gallery-prev]')?.addEventListener('click', () => goTo(activeIndex - 1));
    document.querySelector('[data-gallery-next]')?.addEventListener('click', () => goTo(activeIndex + 1));
    indexButtons.forEach((button, index) => button.addEventListener('click', () => goTo(index)));

    gallery.addEventListener('keydown', event => {
      const keys = {
        ArrowLeft: activeIndex - 1,
        ArrowRight: activeIndex + 1,
        Home: 0,
        End: items.length - 1
      };
      if (!(event.key in keys)) return;
      event.preventDefault();
      goTo(keys[event.key]);
    });

    gallery.addEventListener('scroll', () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const center = gallery.scrollLeft + gallery.clientWidth / 2;
        let nearest = 0;
        let distance = Infinity;
        items.forEach((item, index) => {
          const itemCenter = item.offsetLeft - gallery.offsetLeft + item.offsetWidth / 2;
          const nextDistance = Math.abs(center - itemCenter);
          if (nextDistance < distance) {
            nearest = index;
            distance = nextDistance;
          }
        });
        update(nearest);
      });
    }, { passive: true });

    update(0);
  }

  function initGitTimeline() {
    const list = document.querySelector('[data-git-timeline-list]');
    const status = document.querySelector('[data-git-timeline-status]');
    const timeline = list?.closest('.git-timeline-inner');
    if (!list || !timeline) return;

    const sectionNumber = timeline.querySelector('.section-number');
    const title = timeline.querySelector('#git-timeline-title');
    const desktopQuery = window.matchMedia('(min-width: 821px)');
    const sourcePage = 'https://github.com/KSwordDEV/KSword/commits/main';
    const readerEndpoint = `https://r.jina.ai/${sourcePage}`;
    const mobileLimit = 12;
    let commits = [];
    let requestStarted = false;

    if (sectionNumber) sectionNumber.textContent = 'MAIN / LATEST UPDATES';
    if (title) title.textContent = '最新更新记录';
    if (status) status.textContent = '正在获取最新更新记录…';

    function formatDate(value) {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return '';
      return new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(date);
    }

    function parseDateHeading(value) {
      if (!value) return '';
      const date = new Date(`${value} 00:00:00 UTC`);
      return Number.isNaN(date.getTime()) ? '' : date.toISOString();
    }

    function cleanMarkdownText(value) {
      return String(value || '')
        .replace(/\\([\\`*_{}\[\]()#+\-.!])/g, '$1')
        .replace(/<[^>]+>/g, '')
        .trim();
    }

    function parseCommitPage(markdown) {
      const parsed = [];
      const titles = new Map();
      const seen = new Set();
      let currentDate = '';

      for (const line of String(markdown || '').split(/\r?\n/)) {
        const dateHeading = line.match(/^#{2,4}\s+Commits on\s+(.+?)\s*$/i);
        if (dateHeading) {
          currentDate = parseDateHeading(dateHeading[1]);
          continue;
        }

        const links = line.matchAll(/\[([^\]]+)\]\((https:\/\/github\.com\/KSwordDEV\/KSword\/commit\/([0-9a-f]{7,40})(?:[?#][^)]*)?)\)/gi);
        for (const match of links) {
          const label = cleanMarkdownText(match[1]);
          const sha = match[3].toLowerCase();
          const htmlUrl = `https://github.com/KSwordDEV/KSword/commit/${sha}`;

          if (/^[0-9a-f]{7,40}$/i.test(label)) {
            if (seen.has(sha)) continue;
            const message = titles.get(sha);
            if (!message) continue;
            seen.add(sha);
            parsed.push({ sha, message, date: currentDate, htmlUrl });
            continue;
          }

          if (!label.startsWith('Image:') && !label.startsWith('Copy full SHA')) {
            titles.set(sha, label || '无提交说明');
          }
        }
      }

      return parsed;
    }

    function createCommitItem(commit) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      const code = document.createElement('code');
      const text = document.createElement('span');
      const time = document.createElement('time');

      link.href = commit.htmlUrl;
      link.target = '_blank';
      link.rel = 'noreferrer';
      code.textContent = commit.sha.slice(0, 7);
      text.textContent = commit.message;
      time.dateTime = commit.date;
      time.textContent = formatDate(commit.date);

      link.append(code, text, time);
      item.append(link);
      return item;
    }

    function renderCommits() {
      if (commits.length === 0) return;
      const visible = desktopQuery.matches ? commits : commits.slice(0, mobileLimit);
      list.replaceChildren(...visible.map(createCommitItem));
    }

    async function loadCommitsOnce() {
      if (requestStarted) return;
      requestStarted = true;

      try {
        const response = await fetch(readerEndpoint, {
          cache: 'no-store',
          headers: { Accept: 'text/plain' }
        });
        if (!response.ok) {
          throw new Error(`GitHub page reader ${response.status}`);
        }

        const markdown = await response.text();
        const parsed = parseCommitPage(markdown);
        if (parsed.length === 0) {
          throw new Error('未从 GitHub 提交网页解析到记录');
        }

        commits = parsed;
        renderCommits();
        if (status) {
          status.textContent = `最新记录 · ${formatDate(new Date().toISOString())}`;
        }
      } catch (error) {
        if (status) status.textContent = '获取失败 · 显示页面缓存';
        console.warn('KSword Git timeline:', error);
      }
    }

    const rerender = () => renderCommits();
    desktopQuery.addEventListener?.('change', rerender);

    void loadCommitsOnce();
  }

  initGallery();
  initGitTimeline();
})();