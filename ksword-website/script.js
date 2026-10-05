(() => {
  const english = document.documentElement.lang.toLowerCase().startsWith('en');
  const repo = 'KSwordDEV/KSword';
  const api = `https://api.github.com/repos/${repo}/commits?sha=main&per_page=20`;
  const snapshot = 'main / e3be5c57';
  const fallback = [
    [
        "e3be5c5708829b6ff09471319a8ee6dcdf3ac20c",
        "进程历史记录次数限制+UacDesk退出机制重修",
        "2026-10-04T23:48:50+08:00"
    ],
    [
        "3e84608455514f0ab38bea72207626f81d2a4e4c",
        "Merge origin/main with FileDock updates and SOS rescue desktop",
        "2026-10-04T16:42:55+08:00"
    ],
    [
        "9764758056a56d55640e36d30b4fb69f00bc453a",
        "零碎的更改",
        "2026-10-04T16:29:10+08:00"
    ],
    [
        "8d2fd074f94c345d9623ae2b7d60ae41f4458bb3",
        "fix(filedock): preserve viewport across directory refresh",
        "2026-10-04T15:36:22+08:00"
    ],
    [
        "7d3cd01a7266f1520beef5e3eb47369d1c570a4c",
        "fix(filedock): defer Shell icons and MIME probing during directory load",
        "2026-10-04T15:06:51+08:00"
    ],
    [
        "31ade54bf1f53c307aa99418d2d97ecfac9804c0",
        "feat(filedock): refine context menu and add run-as identities",
        "2026-10-04T14:55:50+08:00"
    ],
    [
        "a4747f619299f201ff30fa88d9c0e0d51786f719",
        "feat(rescue): launch elevated KSword on an isolated desktop",
        "2026-10-03T16:27:24-04:00"
    ],
    [
        "db6f9fd96212aca8739cdd9e90ce3d3b0f39cd68",
        "记录内存改动推送与临时产物审查结论",
        "2026-10-03T13:28:59-04:00"
    ],
    [
        "862e4e58572042697601269caf40f78dd791e055",
        "fix(file): keep large FileDock listings responsive",
        "2026-10-04T00:11:23+08:00"
    ],
    [
        "6d5f60c78f664ff42191c6107381b250b68b389d",
        "Merge remote-tracking branch 'origin/main'",
        "2026-10-03T22:55:05+08:00"
    ],
    [
        "a142dffff204600f63f7dc51334cb807ba28a6c3",
        "fix(file): use managed opens for IRP delete presets",
        "2026-10-03T22:51:43+08:00"
    ],
    [
        "20f21ee08ae8dad79fe434c630f9a1bbfddfdafe",
        "chore(welcome): update prerelease version and donor information",
        "2026-10-03T21:56:39+08:00"
    ],
    [
        "9961263ad60c62ec3043729ecfce710905f423d3",
        "fix(file): remove safety policy prerequisites for file deletion",
        "2026-10-03T21:53:54+08:00"
    ]
].map(([sha, message, date]) => ({ sha, message, date, htmlUrl: 'https://github.com/' + repo + '/commit/' + sha }));

  const copy = english ? {
    "description": "KSword is a Windows x64 ARK, kernel analysis, and system forensics suite with memory assembly, access backends, API/callback monitoring, debugger plugins, and a Light evidence workspace.",
    "latest": "latest update",
    "core": "core capabilities",
    "latestHtml": "<p><strong><a href=\"https://github.com/KSwordDEV/KSword/commit/e3be5c5708829b6ff09471319a8ee6dcdf3ac20c\" rel=\"noreferrer\" target=\"_blank\">main / e3be5c57</a> development snapshot</strong> (content checked: 2026-10-05). This snapshot also adds an SOS rescue desktop, identity-specific file launching, and process-history retention controls. This refresh covers the shared memory/assembly editor, access backends, x86/x64 API agents, callback monitoring/unregister operations, debugger plugins, the experimental AMD path, and Light evidence workspace. Launcher and the driver no longer impose an OS build ceiling; the driver still requires build 16299 or later and validates individual capabilities and exact profiles.</p><p>Main-branch capabilities and published packages have separate version scopes. <a href=\"https://github.com/KSwordDEV/KSword/releases\" rel=\"noreferrer\" target=\"_blank\">Release and prerelease downloads →</a>　<a href=\"development.html\">Development snapshot and validation limits →</a>　<a href=\"hvm-topology.html\">Nested HVM topology →</a>　<a href=\"changelog.html\">Release changelog →</a></p>",
    "features": [
        [
            "Hardware virtualization and R-1",
            "Intel VT-x/EPT residency, nested VMX dispatch with composed shadow EPT, split views, EPTP-switching hooks, execution domains, and R-1 memory/process controls are implemented. AMD SVM/VMCB/NPT and nested SVM use a separate experimental path; full inner-OS startup and broad performance acceptance remain incomplete. Admission checks all-CPU self-tests, the outer environment, and lifecycle state."
        ],
        [
            "Memory snapshots, assembly, and backends",
            "Hex, disassembly, text, and byte differences share a snapshot, with x86/x64 Intel assembly, patch previews, local undo/redo, and explicit writes. Choose R3, standard R0, a private page-table window, or DDMA where supported. Writes compare original bytes, verify actual readback, and bind to the target/session. DDMA needs explicit scratch sectors and depends on hardware and the storage stack."
        ],
        [
            "Processes, objects, and injection traces",
            "Compare R3/R0 process, thread, CID, and handle views with identities bound to PID and creation time. Thread stacks, modules, tokens, protection fields, and injection-trace checks distinguish findings, unexplained differences, and collection gaps. A view discrepancy alone does not establish malicious hiding. The gear button opens process-list settings; activity history defaults to the latest 50 samples, with all-history and stop-recording modes."
        ],
        [
            "Drivers, kernel, and dynamic capabilities",
            "Driver/device stacks, SSDT/hooks, callback inventories and monitoring, identity-validated unregister operations, IDT, PDB/DynData, IOCTLs, and disassembly share the kernel workflow. Seventy-one bilingual knowledge articles link to live evidence. The OS build ceiling is removed; per-feature capabilities and exact profile checks still apply."
        ],
        [
            "API, syscall, and clipboard monitoring",
            "ETW, syscall, WMI, and WinAPI monitoring report session and coverage state; x86/x64 agents are selected for the target architecture. Clipboard process/global rules independently allow, log, or block reads, writes, and enumeration. Active protection is confirmed by hook readiness."
        ],
        [
            "Debuggers and plugins",
            "The plugin market, executable/UI plugins, and optional standalone 64-bit Cheat Engine and x64dbg integrations share a KSword backend. KSword tabs contain controls and logs while debuggers keep their own windows. Native, R0, HVM, hidden execution breakpoints, and optional Shadow execution-page writes follow capabilities and policy, with explicit fallback diagnostics."
        ],
        [
            "Files, disks, and raw storage",
            "A dual-pane manager, file metadata editing, streamed hashes and signature evidence, paged Hex/string searches, and PE/ELF/Mach-O scanning. R0 directories and deletion modes, NTFS recovery, Minifilter/FileObject/Section evidence, and raw-filesystem forensics complement the workflow; raw disk writes require unlocking. A selected .exe can offer System, TrustedInstaller, administrator, or standard-user launch identities according to token availability."
        ],
        [
            "Networking and security auditing",
            "Packet capture/filtering, connection management, per-process throttling, request building, HTTPS/WFP/NIDS, and R0 network-stack inventories. Investigate with startup and DLL/IFEO checks, AppLocker, WDAC, Defender/ASR, VBS/HVCI, and driver-trust evidence."
        ],
        [
            "Light investigation workspace",
            "The native Win32 edition adds lazy secondary pages, entity navigation, detailed process columns, evidence snapshots and row differences, JSON/TSV export, and optional user-path redaction. Cross-process leases distinguish a Light-started driver from one already running; available R3 browsing and export remain usable when kernel features are missing."
        ],
        [
            "Crash dumps and bugcheck evidence",
            "Inspect dump context, symbols, captured memory, triage, and BlackBox evidence. Bugcheck diagnostics use prepared visuals and pre-crash process/module caches. Optional Shield uses public callbacks for bounded buffering; it does not claim to prevent every crash or recover from arbitrary kernel faults."
        ],
        [
            "Workspace and interface",
            "Seventeen main docks and three auxiliary panels, a dedicated KVM workspace, global page search/navigation, light/dark themes, and window notifications. Settings use a separate dialog and scanning belongs to the file workflow; pages, logs, and evidence expose actual capabilities and operation results."
        ],
        [
            "SOS rescue desktop",
            "With Taskbar running, physical-keyboard S O S Enter requests UAC on the original desktop, then starts a new elevated KSword instance on a restricted private Win32 desktop. Use its return button or Ctrl+Alt+Shift+F10 to return. Existing windows and unsaved sessions stay on the original desktop; this is separate from the Windows UAC secure desktop."
        ]
    ],
    "timelineTitle": "Latest Patches",
    "syncing": "main / e3be5c57 · Syncing GitHub…",
    "synced": "Synced with GitHub",
    "offline": "GitHub unavailable · Showing main / e3be5c57 snapshot",
    "locale": "en-CA"
} : {
    "description": "KSword 是 Windows x64 ARK、内核分析与系统取证工具集，提供内存汇编、多后端访问、API 与回调监控、调试器插件和 Light 证据工作台。",
    "latest": "最新更新",
    "core": "核心功能",
    "latestHtml": "<p><strong><a href=\"https://github.com/KSwordDEV/KSword/commit/e3be5c5708829b6ff09471319a8ee6dcdf3ac20c\" rel=\"noreferrer\" target=\"_blank\">main / e3be5c57</a> 开发快照</strong>（内容核对：2026-10-05）。本次另补 SOS 救援桌面、文件右键身份启动和进程历史保留控制。本次同步统一内存编辑器与汇编、多后端访问、x86/x64 API Agent、回调监控与注销、调试器插件、AMD 实验路径和 Light 证据工作台。Launcher 与驱动已取消 OS build 上限，驱动仍要求 build 16299 或更高，具体功能继续按能力与精确 profile 校验。</p><p>主线能力与已发布安装包按各自版本区分。<a href=\"https://github.com/KSwordDEV/KSword/releases\" rel=\"noreferrer\" target=\"_blank\">正式版与预发行下载 →</a>　<a href=\"development.html\">开发快照与验收边界 →</a>　<a href=\"hvm-topology.html\">Nested HVM 拓扑 →</a>　<a href=\"changelog.html\">发行更新日志 →</a></p>",
    "features": [
        [
            "硬件虚拟化与 R-1 层",
            "Intel VT-x/EPT 常驻、嵌套 VMX 分派与 shadow EPT 合成、分离视图、EPTP 切换 Hook、执行域及 R-1 内存/进程控制已经接入。AMD SVM/VMCB/NPT 与嵌套 SVM 使用独立实验路径；完整内层系统启动与广泛性能验收仍未完成。准入检查全 CPU 自检、外层环境与生命周期状态。"
        ],
        [
            "内存快照、汇编与多后端",
            "Hex、反汇编、文本与字节差异共用快照，支持 x86/x64 Intel 汇编、补丁预览、本地撤销/重做和显式写回。按能力选择 R3、标准 R0、私有页表窗口或 DDMA；写前比对、实际回读及目标/会话绑定保留。DDMA 需要显式暂存扇区，受硬件和驱动栈限制。"
        ],
        [
            "进程、对象与注入痕迹",
            "对照 R3/R0 进程、线程、CID 和句柄视图，按 PID 与创建时间绑定实例。线程栈、模块、令牌、保护字段及注入痕迹检查区分异常证据、未解释差异与采集缺口；视图差异本身不等于恶意隐藏。 齿轮按钮打开进程列表设置；活动历史默认保留最近 50 次，可选全量留存或不记录。"
        ],
        [
            "驱动、内核与动态能力",
            "驱动/设备栈、SSDT/Hook、回调枚举与监控、验证身份后的注销、IDT、PDB/DynData、IOCTL 与反汇编整合到内核工作流。71 篇双语内核知识连接现场证据。OS build 上限已取消，逐功能能力与精确 profile 校验继续生效。"
        ],
        [
            "API、Syscall 与剪贴板监控",
            "ETW、Syscall、WMI 和 WinAPI 监控保留会话与覆盖状态；x86/x64 Agent 按目标位数自动选择。剪贴板进程/全局规则分别允许、记录或阻止读取、写入与枚举，实际保护状态依据 Hook 就绪确认。"
        ],
        [
            "调试器与插件",
            "插件市场、可执行/UI 插件，以及可选的独立 64 位 Cheat Engine 与 x64dbg 共享 KSword 后端。控制与日志留在 KSword Tab，调试器保留自己的窗口；原生、R0、HVM、隐藏执行断点和可选 Shadow 执行页写入按能力与策略选择，回退原因明确记录。"
        ],
        [
            "文件、磁盘与原始存储",
            "双面板管理器、文件元数据编辑、流式哈希与签名证据、按需 Hex/字符串搜索、PE/ELF/Mach-O 扫描。整合 R0 目录与删除模式、NTFS 恢复、Minifilter/FileObject/Section 证据和原始文件系统取证，原始磁盘写入需解锁。 单选 .exe 的右键菜单按令牌可用性提供 System、TrustedInstaller、管理员或普通用户身份启动。"
        ],
        [
            "网络与安全审计",
            "抓包与过滤、连接管理、按进程限速、请求构造、HTTPS/WFP/NIDS 及 R0 网络栈清单。配合启动项、DLL/IFEO 检查、AppLocker、WDAC、Defender/ASR、VBS/HVCI 与驱动信任证据开展调查。"
        ],
        [
            "Light 调查工作台",
            "原生 Win32 版本提供二级页懒加载、实体导航、进程详细列、证据快照与行级差异、JSON/TSV 导出和可选用户路径脱敏。跨进程驱动租约区分自身启动与预先运行的驱动，功能缺失时保留可用的 R3 浏览与导出。"
        ],
        [
            "崩溃转储与 BugCheck 证据",
            "分析转储上下文、符号、捕获内存、triage 与 BlackBox 证据；蓝屏诊断结合预生成画面和崩溃前进程/模块缓存。可选 Shield 通过公共回调提供有界缓冲，不宣称防止所有蓝屏或从任意内核错误恢复。"
        ],
        [
            "工作区与界面",
            "17 个主 Dock 与 3 个辅助面板，独立 KVM 工作区、全局页面搜索与定位、深浅主题和窗口通知。设置使用独立对话框，文件扫描属于文件工作流；实际能力与操作结果通过页面状态、日志和证据展示。"
        ],
        [
            "SOS 救援桌面",
            "Taskbar 运行时，用真实键盘输入 S O S Enter，在原桌面批准 UAC 后，于限制访问的私有 Win32 桌面启动新的管理员 KSword。顶部返回按钮或 Ctrl+Alt+Shift+F10 可返回；原窗口和未保存会话留在原桌面，不会迁移。这与 Windows 的 UAC 安全桌面不同。"
        ]
    ],
    "timelineTitle": "实时 Patch",
    "syncing": "main / e3be5c57 · 正在同步 GitHub…",
    "synced": "已同步 GitHub",
    "offline": "GitHub 暂不可用 · 显示 main / e3be5c57 快照",
    "locale": "zh-CN"
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
    panel.querySelector('.section-number').textContent = 'MAIN / LIVE PATCHES';
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
