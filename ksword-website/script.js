(() => {
  const english = document.documentElement.lang.toLowerCase().startsWith('en');
  const repo = 'KSwordDEV/KSword';
  const api = `https://api.github.com/repos/${repo}/commits?sha=main&per_page=20`;
  const snapshot = 'main/848b6bb';
  const fallback = [
    ['848b6bb49fcfd8f8d12741ddbb4b4f5c54e66f9c', 'Update license information and project description', '2026-08-16T06:29:38Z'],
    ['f5de4e5fa52479c9e99750ced7e9e4cbdace8308', 'Clarify licensing wording for source-available and third-party attributions', '2026-08-16T06:27:42Z'],
    ['1cd1a8961a7dc4a36a6d2939c366ce2a43b95b9f', 'Update LICENSE to KSword Community Source License v1.6', '2026-08-16T06:17:01Z'],
    ['db2b6562709d6d83e509a6a89509d4e26caa2884', 'feat(ui): add adaptive table search scopes', '2026-08-16T06:14:55Z'],
    ['629fcadafe5c4e456f8788dce65cfbd8b4d81f68', 'feat(process): show target thread message hooks', '2026-08-15T16:18:02Z'],
    ['d5138325cef820e8d9dfc86fb09031bfb5ba2f12', 'feat(taskbar): polish notification presentation and handle filters', '2026-08-15T16:00:38Z'],
    ['1145b37f3f972a34ed84e82308cab8139ae10811', 'fix(process): use a flat list for header sorting', '2026-08-15T14:31:06Z'],
    ['72f1030ae5d3964c420f18531f95ae2ec6c185b8', 'feat(ui): add table header sorting and refine the bugcheck panel', '2026-08-15T14:12:59Z'],
    ['dabe6fb77993849803ed845377468c59589e2a80', 'feat(driver): add fail-closed physical bugcheck panel', '2026-08-14T16:59:19Z'],
    ['a9c65a20bd804bcbc06c790c4691e20a8e204cd2', 'feat(process): detect DLL hijacking candidates', '2026-08-13T21:59:37Z'],
    ['ecaeaa335726199bb8d571b33132baea4939c4f3', 'feat(startup): detect IFEO image hijacks', '2026-08-13T20:51:17Z'],
    ['78d899a395ff68f300a9cdb46cfdc0144ea2182b', 'feat(scanner): detect EXIT GhostSystemDriver attack chain', '2026-08-13T20:04:32Z'],
    ['61edf8a6126f7ee622efc87cd8fbcde0cd50b84c', 'feat(minidump): add triage crash context', '2026-08-13T14:45:54Z']
  ].map(([sha, message, date]) => ({ sha, message, date, htmlUrl: 'https://github.com/' + repo + '/commit/' + sha }));

  const copy = english ? {
    description: 'KSword is a source-available Windows ARK, kernel-debugging, and system-forensics suite whose homepage tracks current main-branch development.',
    latest: 'latest update',
    core: 'core capabilities',
    latestHtml: '<p><strong>${snapshot} development snapshot</strong> (as of 2026-08-16): the repository received 653 commits in the last month. Current main work adds kernel-tamper detection, crash-dump forensics, DLL/IFEO startup-chain detection, MFT/IRP and raw-storage parsing, R0 WFP capture controls, process protection, and Light utilities.</p><p><strong>5.1.4.0</strong> remains the latest stable release; <code>5.1.4.1-Alpha</code> and <code>5.1.5.0-pre</code> are prereleases. <a href="development.html">Read the main-branch snapshot →</a>　<a href="changelog.html">View the complete changelog →</a></p>',
    features: [
      ['Processes, objects, and protection', 'Compare R3/R0 process, thread, CID, and handle views with near-Task-Manager columns, custom views, process-instance identity binding, and renewable process protection.'],
      ['Drivers, kernel, and dynamic capabilities', 'Inspect drivers, hooks, callbacks, IDT, code integrity, VBS/HVCI, page protection, HAL/WDF/i8042, descriptor tables, IOCTLs, PDB/DynData, and kernel disassembly.'],
      ['Crash dumps and system forensics', 'Analyze dump context, triage data, symbols, pool tags, crash timelines, secondary records, captured memory, and BlackBox evidence with a fail-closed bugcheck panel.'],
      ['Files, disks, and raw storage', 'Combine MFT/IRP parsing, R0 directory mode, five-tier deletion actions, recovery, physical-sector reads, storage-stack evidence, and read-only-by-default raw-filesystem forensics.'],
      ['Networking and security detection', 'Use R0 WFP packet capture and controls, connection management, DNS/HTTPS/WFP/NIDS auditing, plus DLL hijack, IFEO image hijack, and EXIT GhostSystemDriver-chain detection.'],
      ['Light and system utilities', 'KswordARKLight now covers network, window, performance-bus, system, service, privilege, disk, and driver-recovery modules with confirmation, identity, and rollback boundaries for risky actions.'],
      ['UI and runtime behavior', 'Use adaptive search scopes, table sorting, frozen rows and columns, smooth scrolling, taskbar notification filters, DWM/transparent backgrounds, dynamic themes, and long-running diagnostics.']
    ],
    timelineTitle: 'Latest Updates',
    syncing: '${snapshot} · Syncing GitHub…',
    synced: 'Synced with GitHub',
    offline: 'GitHub unavailable · Showing ${snapshot} snapshot',
    locale: 'en-CA'
  } : {
    description: 'KSword 是面向 Windows 的源码公开 ARK、内核调试与系统取证工具集；主页同步 main 分支最新开发能力。',
    latest: '最新更新',
    core: '核心功能',
    latestHtml: '<p><strong>${snapshot} 开发快照</strong>（截至 2026-08-16）：近一个月主仓库共有 653 个提交。主线新增或强化了内核篡改检测、崩溃转储取证、DLL/IFEO 启动链检测、MFT/IRP 与原始存储解析、R0 WFP 抓包控制、进程保护和 Light 工具模块。</p><p>稳定版仍是 <strong>5.1.4.0</strong>；<code>5.1.4.1-Alpha</code> 与 <code>5.1.5.0-pre</code> 属于预发行版本。<a href="development.html">查看主线开发快照 →</a>　<a href="changelog.html">查看完整更新日志 →</a></p>',
    features: [
      ['进程、对象与保护', '对照 R3/R0 进程、线程、CID 和句柄视图；支持更接近任务管理器的列、自定义视图、进程实例身份绑定和可续期的进程保护。'],
      ['驱动、内核与动态能力', '检查驱动、Hook、回调、IDT、代码完整性、VBS/HVCI、页保护、HAL/WDF/i8042、描述符表、IOCTL、PDB/DynData 与内核反汇编。'],
      ['崩溃转储与系统取证', '分析转储上下文、triage 数据、符号、Pool Tag、崩溃时间线、二级记录、捕获内存和 BlackBox 证据，并提供故障闭合的 BugCheck 面板。'],
      ['文件、磁盘与原始存储', '整合 MFT/IRP 解析、R0 目录、五档删除操作、文件恢复、物理扇区读取、存储栈和默认只读的原始文件系统取证。'],
      ['网络与安全检测', '提供 R0 WFP 报文捕获和控制、连接管理、DNS/HTTPS/WFP/NIDS 审计，并检测 DLL 劫持、IFEO 镜像劫持和 EXIT GhostSystemDriver 攻击链。'],
      ['Light 与系统工具', 'KswordARKLight 接入网络、窗口、性能总线、系统工具、服务、权限、磁盘和驱动恢复等模块；高风险动作保留确认、身份校验和回滚边界。'],
      ['界面与运行时', '支持自适应搜索范围、表头排序、冻结行列、平滑滚动、任务栏通知筛选、DWM/透明背景、动态主题和长期运行稳定性诊断。']
    ],
    timelineTitle: '最新更新记录',
    syncing: '${snapshot} · 正在同步 GitHub…',
    synced: '已同步 GitHub',
    offline: 'GitHub 暂不可用 · 显示 ${snapshot} 快照',
    locale: 'zh-CN'
  };

  function updateHomepage() {
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = copy.description;
    const sections = [...document.querySelectorAll('.section')];
    const latest = sections.find(section => section.querySelector('h2')?.textContent.trim().toLowerCase() === copy.latest);
    const prose = latest?.querySelector('.prose');
    if (prose) prose.innerHTML = copy.latestHtml;
    const core = sections.find(section => section.querySelector('h2')?.textContent.trim().toLowerCase() === copy.core);
    const rows = core?.querySelector('.rows');
    if (rows) rows.innerHTML = copy.features.map(([title, text]) => `<article><h3>${title}</h3><p>${text}</p></article>`).join('');
  }

  function initGallery() {
    const gallery = document.querySelector('[data-gallery]');
    if (!gallery) return;
    const items = [...gallery.querySelectorAll('[data-gallery-item]')];
    if (!items.length) return;
    const count = document.querySelector('.gallery-count');
    const buttons = [...document.querySelectorAll('[data-gallery-index]')];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let active = 0;
    let frame = 0;
    const pad = value => String(value).padStart(2, '0');
    const select = index => {
      active = (index + items.length) % items.length;
      if (count) count.textContent = `${pad(active + 1)} / ${pad(items.length)}`;
      buttons.forEach((button, i) => button.setAttribute('aria-current', i === active ? 'true' : 'false'));
    };
    const go = index => {
      const targetIndex = (index + items.length) % items.length;
      const target = items[targetIndex];
      gallery.scrollTo({ left: target.offsetLeft - gallery.offsetLeft - (gallery.clientWidth - target.offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' });
      select(targetIndex);
    };
    document.querySelector('[data-gallery-prev]')?.addEventListener('click', () => go(active - 1));
    document.querySelector('[data-gallery-next]')?.addEventListener('click', () => go(active + 1));
    buttons.forEach((button, index) => button.addEventListener('click', () => go(index)));
    gallery.addEventListener('keydown', event => {
      const keys = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: items.length - 1 };
      if (!(event.key in keys)) return;
      event.preventDefault();
      go(keys[event.key]);
    });
    gallery.addEventListener('scroll', () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = gallery.scrollLeft + gallery.clientWidth / 2;
        let nearest = 0;
        let distance = Infinity;
        items.forEach((item, index) => {
          const next = Math.abs(center - (item.offsetLeft - gallery.offsetLeft + item.offsetWidth / 2));
          if (next < distance) { nearest = index; distance = next; }
        });
        select(nearest);
      });
    }, { passive: true });
    select(0);
  }

  function initTimeline() {
    const list = document.querySelector('[data-git-timeline-list]');
    const status = document.querySelector('[data-git-timeline-status]');
    const panel = list?.closest('.git-timeline-inner');
    if (!list || !panel) return;
    const media = window.matchMedia('(min-width: 821px)');
    let commits = fallback;
    panel.querySelector('.section-number').textContent = 'MAIN / LATEST UPDATES';
    const title = panel.querySelector('#git-timeline-title');
    if (title) title.textContent = copy.timelineTitle;
    const dateText = value => {
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat(copy.locale, { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
    };
    const item = commit => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const code = document.createElement('code');
      const span = document.createElement('span');
      const time = document.createElement('time');
      a.href = commit.htmlUrl; a.target = '_blank'; a.rel = 'noreferrer';
      code.textContent = commit.sha.slice(0, 7); span.textContent = commit.message;
      time.dateTime = commit.date || ''; time.textContent = dateText(commit.date);
      a.append(code, span, time); li.append(a); return li;
    };
    const render = () => list.replaceChildren(...commits.slice(0, media.matches ? 13 : 7).map(item));
    const normalize = payload => Array.isArray(payload) ? payload.flatMap(entry => {
      const sha = String(entry?.sha || '').toLowerCase();
      const message = String(entry?.commit?.message || '').split(/\r?\n/, 1)[0].trim();
      const date = entry?.commit?.committer?.date || entry?.commit?.author?.date || '';
      const htmlUrl = String(entry?.html_url || '');
      return /^[0-9a-f]{40}$/.test(sha) && message && htmlUrl ? [{ sha, message, date, htmlUrl }] : [];
    }) : [];
    const refresh = async () => {
      if (status) status.textContent = copy.syncing;
      render();
      try {
        const response = await fetch(api, { cache: 'no-store', headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' } });
        if (!response.ok) throw new Error(`GitHub API ${response.status}`);
        const live = normalize(await response.json());
        if (!live.length) throw new Error('No valid commits');
        commits = live; render();
        if (status) status.textContent = `${copy.synced} · ${dateText(new Date().toISOString())}`;
      } catch (error) {
        commits = fallback; render();
        if (status) status.textContent = copy.offline;
        console.warn('KSword Git timeline:', error);
      }
    };
    media.addEventListener?.('change', render);
    void refresh();
  }

  updateHomepage();
  initGallery();
  initTimeline();
})();
