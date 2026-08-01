(() => {
  const english = document.documentElement.lang.toLowerCase().startsWith('en');
  const repo = 'KSwordDEV/KSword';
  const api = `https://api.github.com/repos/${repo}/commits?sha=main&per_page=20`;
  const snapshot = 'main/f92f0fc';
  const fallback = [
    ['f92f0fc54cfee8b6b00ee1ed5cfa7d136b67bd47', 'refactor(system-time): remove upstream project wording', '2026-08-01T03:10:27Z'],
    ['c02d2e07416c18b3c59e1945877404941770a5ed', 'feat(process): confirm destructive termination actions', '2026-08-01T03:09:59Z'],
    ['2846c126493507b885b8e0c638c0301422a6a4dc', 'fix(ci): handle unavailable force-push base commits', '2026-08-01T02:22:46Z'],
    ['5c99f12f5bad876755d8e2f8e28f719f9331f5e5', 'i18n: translate system time controls and clocks', '2026-08-01T01:51:02Z'],
    ['2260e06f6171432086f5cb3ba8fe14919fce1b97', 'feat(titlebar): show system time and runtime', '2026-08-01T01:51:02Z'],
    ['a7127b366c0353e54c0ab170be54252c44183970', 'feat(system-time): add sync modes and calibrated clock', '2026-08-01T01:51:02Z'],
    ['2e318bf4c2bcd1f4580bcf53ac222cfd276fba92', 'fix(driver): harden system time counter mapping', '2026-08-01T01:51:02Z'],
    ['a371ff6954ac787b37735f0c21d0451cc2ec328e', 'fix(build): deploy Qt runtime with release output', '2026-08-01T01:51:01Z'],
    ['12f3d1147a7ffc57aa1a9a626193fc767be76eb2', 'fix: preserve buffered system time request', '2026-07-31T18:00:34Z'],
    ['5a46b703cf50ff1a02ff54b6abb9f9209eacd68e', 'fix(driver): link packet capture dependencies', '2026-07-31T17:17:04Z'],
    ['f8710df248ad2b564947202314062623cc6af378', 'fix(driver): include NDIS packet capture ABI', '2026-07-31T17:13:29Z'],
    ['a8c935b73cfad87fb841d8ee97898704a7baf356', 'fix(i18n): sync R0 traffic protocol diagnostics', '2026-07-31T17:11:55Z'],
    ['bcb8386086edefe3946232c89f57a99c7b22d33d', 'fix(network): capture R0 traffic at WFP packet layers', '2026-07-31T17:07:53Z']
  ].map(([sha, message, date]) => ({ sha, message, date, htmlUrl: `https://github.com/${repo}/commit/${sha}` }));

  const copy = english ? {
    description: 'KSword is an open-source Windows ARK, kernel-debugging, and system-forensics suite whose homepage tracks current main-branch development.',
    latest: 'latest update',
    core: 'core capabilities',
    latestHtml: `<p><strong>${snapshot} development snapshot</strong> (2026-08-01 UTC / 2026-07-31 in Toronto): system-wide time acceleration and slowdown now include selectable modes, Windows Time synchronization, a calibrated clock, and title-bar runtime. Network auditing reaches the R0 WFP IPv4/IPv6 packet layers, while structured binary scanning, raw-filesystem forensics, controlled HVM diagnostics, runtime PDB fallback, and stricter destructive-action confirmations have also landed.</p><p>These changes are on <code>main</code>; they are not a new Release. <a href="development.html">Read the full development snapshot →</a>　<a href="changelog.html">View formal release history →</a></p>`,
    features: [
      ['Process and object cross-view', 'Compare R3/R0 process, thread, CID, and handle views. Destructive tree or critical-process termination now requires explicit confirmation.'],
      ['Memory, PDB, and structured scanning', 'Inspect regions, PTE/VA translations, and kernel executable memory; resolve exact runtime PDB data after identity checks, and scan PE, ELF, and Mach-O files.'],
      ['Drivers, kernel, and HVM', 'Inspect drivers, hooks, callbacks, system threads, work queues, loaded-image/IDT baselines, descriptor and IOCTL decoding, kernel disassembly, and a controlled HVM self-test.'],
      ['Network and R0 packet auditing', 'Capture WFP IPv4/IPv6 packet-layer traffic from the driver and diagnose cursor gaps, drops, protocol mismatches, and related TCP/UDP/AFD/NSI/NDIS/WFP inventories.'],
      ['Files, storage, and raw filesystems', 'Combine recovery, signatures, PE analysis, file-use evidence, storage stacks, disk monitoring, and read-only raw-filesystem/deleted-entry forensics.'],
      ['System time and runtime state', 'Apply system-wide acceleration or slowdown, synchronize through Windows Time, view a calibrated clock, and show system time plus KSword runtime in the title bar.'],
      ['Audio and runtime diagnostics', 'Expanded Core Audio source inspection, restartable API Monitor sessions, disk-performance monitoring, and driver search reduce long-running failures and races.'],
      ['Security policy and recovery boundaries', 'Inspect AppLocker, WDAC, Code Integrity, Defender, ASR, VBS, and platform security; revalidate startup and permanent-delete targets and retain recovery transactions.']
    ],
    timelineTitle: 'Latest Updates',
    syncing: `${snapshot} · Syncing GitHub…`,
    synced: 'Synced with GitHub',
    offline: `GitHub unavailable · Showing ${snapshot} snapshot`,
    locale: 'en-CA'
  } : {
    description: 'KSword 是面向 Windows 的开源 ARK、内核调试与系统取证工具集；主页同步 main 分支最新开发能力。',
    latest: '最新更新',
    core: '核心功能',
    latestHtml: `<p><strong>${snapshot} 开发快照</strong>（2026-08-01 UTC，对应多伦多 2026-07-31）：新增系统级时间加速/减速、可选实现模式、Windows 时间服务同步、校准时钟和标题栏运行时长；网络审计扩展到 R0 WFP IPv4/IPv6 报文层；同时加入结构化二进制扫描、原始文件系统取证、受控 HVM 诊断、运行时 PDB 回退，以及更严格的破坏性操作确认。</p><p>这些内容位于 <code>main</code>，不是新的 Release。<a href="development.html">查看完整开发快照 →</a>　<a href="changelog.html">查看正式版本历史 →</a></p>`,
    features: [
      ['进程与对象 Cross-view', '对照 R3/R0 进程、线程、CID 和句柄视图；结束进程树、关键进程等破坏性终止动作现在要求明确确认。'],
      ['内存、PDB 与结构化扫描', '检查内存、PTE/VA 和内核可执行区域；通过身份校验后解析精确运行时 PDB，并扫描 PE、ELF 与 Mach-O。'],
      ['驱动、内核与 HVM', '检查驱动、Hook、回调、系统线程和工作队列，并提供已加载映像/IDT 基线、描述符与 IOCTL 解码、内核反汇编及受控 HVM 自检。'],
      ['网络与 R0 报文审计', '从驱动侧采集 WFP IPv4/IPv6 报文层流量，诊断游标缺口、丢包和协议问题，并关联 TCP/UDP/AFD/NSI/NDIS/WFP 视图。'],
      ['文件、存储与原始文件系统', '整合恢复、签名、PE、占用、存储栈和磁盘监控；原始文件系统浏览默认只读，可分析目录项与已删除条目。'],
      ['系统时间与运行状态', '支持系统级加速/减速、Windows 时间服务同步和校准时钟；标题栏可显示系统时间及 KSword 运行时长。'],
      ['音频与运行时诊断', '扩展 Core Audio 声音来源检查、可重启 API Monitor 会话、磁盘性能监控和驱动搜索，减少长期运行失效与竞态。'],
      ['安全策略与恢复边界', '检查 AppLocker、WDAC、Code Integrity、Defender、ASR、VBS 与平台安全；启动项和永久删除操作会重新验证目标并保留恢复事务。']
    ],
    timelineTitle: '最新更新记录',
    syncing: `${snapshot} · 正在同步 GitHub…`,
    synced: '已同步 GitHub',
    offline: `GitHub 暂不可用 · 显示 ${snapshot} 快照`,
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
