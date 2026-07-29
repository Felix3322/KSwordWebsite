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
    const desktopTrim = 5;
    const mobileLimit = 7;
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
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\\([\\`*_{}\[\]()#+\-.!])/g, '$1')
        .replace(/<[^>]+>/g, '')
        .replace(/^\s*(?:[-*+]\s+)?#{1,6}\s*/, '')
        .replace(/\s+/g, ' ')
        .trim();
    }

    function getCommitTarget(value) {
      const decoded = String(value || '').replace(/&amp;/g, '&').trim();
      const match = decoded.match(/(?:https?:\/\/github\.com)?\/?KSwordDEV\/KSword\/commit\/([0-9a-f]{7,40})(?:[/?#]|$)/i);
      if (!match) return null;
      const sha = match[1].toLowerCase();
      return {
        sha,
        htmlUrl: `https://github.com/KSwordDEV/KSword/commit/${sha}`
      };
    }

    function parseCommitPage(markdown) {
      const parsed = [];
      const seen = new Set();
      let currentDate = '';
      let pendingTitle = '';

      function addCommit(target, message) {
        if (!target || seen.has(target.sha)) return;
        const titleText = cleanMarkdownText(message);
        if (!titleText || /^[0-9a-f]{7,40}$/i.test(titleText)) return;
        if (/^(?:Image:|Copy full SHA|Show description for)\b/i.test(titleText)) return;
        seen.add(target.sha);
        parsed.push({
          sha: target.sha,
          message: titleText,
          date: currentDate,
          htmlUrl: target.htmlUrl
        });
      }

      for (const rawLine of String(markdown || '').split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line) continue;

        const dateHeading = line.match(/(?:^|\s)#{2,4}\s+Commits on\s+(.+?)\s*$/i);
        if (dateHeading) {
          currentDate = parseDateHeading(dateHeading[1]);
          pendingTitle = '';
          continue;
        }

        const markdownLinks = [...line.matchAll(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)];
        let foundCommitLink = false;

        for (const linkMatch of markdownLinks) {
          const label = cleanMarkdownText(linkMatch[1]);
          const target = getCommitTarget(linkMatch[2]);
          if (!target) continue;
          foundCommitLink = true;

          if (/^[0-9a-f]{7,40}$/i.test(label)) {
            addCommit(target, pendingTitle);
          } else {
            pendingTitle = label;
            addCommit(target, label);
          }
        }

        if (foundCommitLink) continue;

        const htmlLink = line.match(/href=["']([^"']*\/?KSwordDEV\/KSword\/commit\/[0-9a-f]{7,40}[^"']*)["'][^>]*>(.*?)<\/a>/i);
        if (htmlLink) {
          const target = getCommitTarget(htmlLink[1]);
          const label = cleanMarkdownText(htmlLink[2]);
          if (/^[0-9a-f]{7,40}$/i.test(label)) {
            addCommit(target, pendingTitle);
          } else {
            pendingTitle = label;
            addCommit(target, label);
          }
          continue;
        }

        const heading = line.match(/^\s*(?:[-*+]\s+)?#{3,6}\s+(.+?)\s*$/);
        if (heading) {
          const candidate = cleanMarkdownText(heading[1]);
          if (candidate && !/^Commits on\b/i.test(candidate)) pendingTitle = candidate;
          continue;
        }

        const plainSha = cleanMarkdownText(line).match(/^([0-9a-f]{7,40})$/i);
        if (plainSha && pendingTitle) {
          const sha = plainSha[1].toLowerCase();
          addCommit({
            sha,
            htmlUrl: `https://github.com/KSwordDEV/KSword/commit/${sha}`
          }, pendingTitle);
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
      const desktopLimit = Math.max(0, commits.length - desktopTrim);
      const visible = desktopQuery.matches
        ? commits.slice(0, desktopLimit)
        : commits.slice(0, mobileLimit);
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
          console.debug('KSword Git timeline response preview:', markdown.slice(0, 2000));
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
