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

  function initLiveGitTimeline() {
    const list = document.querySelector('[data-git-timeline-list]');
    const status = document.querySelector('[data-git-timeline-status]');
    const content = document.querySelector('[data-home-content]');
    const timelineInner = list?.closest('.git-timeline-inner');
    if (!list || !content || !timelineInner) return;

    const desktopQuery = window.matchMedia('(min-width: 821px)');
    const endpoint = 'https://api.github.com/repos/KSwordDEV/KSword/commits';
    const pageSize = 100;
    const mobileLimit = 12;
    let commits = [];
    let renderedCount = 0;
    let page = 1;
    let hasMore = true;
    let fetching = false;
    let initializedFromApi = false;
    let resizeTimer = 0;

    function formatDate(value) {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return '';
      return new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(date);
    }

    function createCommitItem(commit) {
      const sha = typeof commit?.sha === 'string' ? commit.sha : '';
      const message = String(commit?.commit?.message || '无提交说明').split(/\r?\n/, 1)[0];
      const date = commit?.commit?.committer?.date || commit?.commit?.author?.date || '';
      const htmlUrl = commit?.html_url || `https://github.com/KSwordDEV/KSword/commit/${sha}`;

      const item = document.createElement('li');
      const link = document.createElement('a');
      const code = document.createElement('code');
      const text = document.createElement('span');
      const time = document.createElement('time');

      link.href = htmlUrl;
      link.target = '_blank';
      link.rel = 'noreferrer';
      code.textContent = sha.slice(0, 7);
      text.textContent = message;
      time.dateTime = date;
      time.textContent = formatDate(date);

      link.append(code, text, time);
      item.append(link);
      return item;
    }

    async function fetchNextPage() {
      if (fetching || !hasMore) return;
      fetching = true;
      try {
        const url = new URL(endpoint);
        url.searchParams.set('sha', 'main');
        url.searchParams.set('per_page', String(pageSize));
        url.searchParams.set('page', String(page));

        const response = await fetch(url, {
          cache: 'no-store',
          headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });
        if (!response.ok) {
          throw new Error(`GitHub API ${response.status}`);
        }
        const batch = await response.json();
        if (!Array.isArray(batch)) {
          throw new Error('GitHub API 返回格式错误');
        }

        if (!initializedFromApi) {
          list.replaceChildren();
          initializedFromApi = true;
        }
        commits.push(...batch);
        page += 1;
        hasMore = batch.length === pageSize;
        if (status) status.textContent = `实时读取 main · ${formatDate(new Date().toISOString())}`;
      } catch (error) {
        hasMore = false;
        if (status) status.textContent = initializedFromApi ? '实时读取中断' : '实时读取失败 · 显示页面缓存';
        console.warn('KSword Git timeline:', error);
      } finally {
        fetching = false;
      }
    }

    function appendOne() {
      if (renderedCount >= commits.length) return false;
      list.append(createCommitItem(commits[renderedCount]));
      renderedCount += 1;
      return true;
    }

    async function fillToContentEnd() {
      if (!desktopQuery.matches) {
        while (renderedCount < mobileLimit) {
          if (!appendOne()) {
            if (!hasMore) break;
            await fetchNextPage();
            if (renderedCount >= commits.length && !hasMore) break;
          }
        }
        return;
      }

      // The rail itself stretches with the page grid. Add real commits until the
      // visible timeline content reaches the bottom of the homepage content.
      const targetHeight = Math.max(0, content.offsetHeight - 112);
      let safety = 0;
      while (timelineInner.scrollHeight < targetHeight && safety < 500) {
        safety += 1;
        if (appendOne()) continue;
        if (!hasMore) break;
        await fetchNextPage();
        if (renderedCount >= commits.length && !hasMore) break;
      }
    }

    async function start() {
      await fetchNextPage();
      await fillToContentEnd();
    }

    const scheduleFill = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => void fillToContentEnd(), 120);
    };

    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(scheduleFill);
      observer.observe(content);
    } else {
      window.addEventListener('resize', scheduleFill, { passive: true });
    }
    desktopQuery.addEventListener?.('change', scheduleFill);
    window.addEventListener('load', scheduleFill, { once: true });

    void start();
  }

  initGallery();
  initLiveGitTimeline();
})();
