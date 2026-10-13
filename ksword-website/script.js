(() => {
  const english = document.documentElement.lang.toLowerCase().startsWith('en');
  const repo = 'KSwordDEV/KSword';
  const api = `https://api.github.com/repos/${repo}/commits?sha=main&per_page=20`;
  const snapshot = 'main / a996d38d';
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
    ],
    [
        "a722116df30cf7f837a6f7ef7efcc109a370d004",
        "fix(mcp): collect fixture garbage before the handle baseline",
        "2026-10-13T13:27:42-04:00"
    ],
    [
        "4f970d056b611ed140b4bb8a0d48a4b8af3ec940",
        "fix(mcp): release fixture references before checking native handles",
        "2026-10-13T13:19:09-04:00"
    ],
    [
        "814039bf14a976d48166abde61bdd72924055bc8",
        "feat(mcp): add CLI and IOCTL tools with npm and Python packages",
        "2026-10-13T13:12:32-04:00"
    ],
    [
        "67bec7f9f1ca84e07e116087f2513052e5268c59",
        "feat(cli): add confirmed raw KSword driver IOCTL command",
        "2026-10-13T12:28:14-04:00"
    ],
    [
        "da9a5efc2da1fd2c23731202d1a62168b171af8c",
        "fix(ci): exclude symbol bundles from manual release templates",
        "2026-10-13T11:23:12-04:00"
    ],
    [
        "521c127d0689c86c5fef653e40b1a307473a6d9a",
        "fix(ci): handle Unicode JSON paths and link split startup test sources",
        "2026-10-13T10:19:49-04:00"
    ],
    [
        "c2c591adc8dc83390ad788b821c727472b94d350",
        "Merge remote-tracking branch 'origin/main'",
        "2026-10-13T09:44:41-04:00"
    ],
    [
        "da3b191aacdc381fc9375cafb378348a3dca5cbf",
        "feat(memory): add R3 and R0 region dump export",
        "2026-10-13T09:44:41-04:00"
    ],
    [
        "f00f7ced0ca8c9823719a629558fe92ff7a027ff",
        "Add AI agent installation instructions for KSwordMCP",
        "2026-10-13T09:37:17-04:00"
    ]
].map(([sha, message, date]) => ({ sha, message, date, htmlUrl: 'https://github.com/' + repo + '/commit/' + sha }));

  const copy = english ? {
    "description": "KSword is a Windows x64 ARK, kernel analysis, and system forensics suite with memory workspaces, R3/R0 region dumps, MCP and CLI automation, structured reports, and a Light evidence workspace.",
    "latest": "latest update",
    "core": "core capabilities",
    "latestHtml": "<p><strong><a href=\"https://github.com/KSwordDEV/KSword/commit/a996d38d91c85a9d99744454880a58b7b223f7f7\" rel=\"noreferrer\" target=\"_blank\">main / a996d38d</a> development snapshot</strong> (content checked: 2026-10-13). New work includes MCP GUI and CLI/IOCTL tools, R3/R0 memory-region dump export, structured process reports and a restored PEB workspace, registry and privilege workflows, shared UI components, and Taskbar page navigation. CKS management includes research pages; reset-free enrollment remains unverified.</p><p>The <a href=\"https://github.com/KSwordDEV/KSword/releases/tag/mcp-preview-20261012\" rel=\"noreferrer\" target=\"_blank\">October 12 MCP/UAC prerelease</a> has downloadable 7z/ZIP packages and separate symbols. Later main changes have their own scope. <a href=\"https://github.com/KSwordDEV/KSword/releases\" rel=\"noreferrer\" target=\"_blank\">All releases and CI builds →</a>　<a href=\"development.html\">Development snapshot and validation limits →</a>　<a href=\"changelog.html\">Release changelog →</a>　<a href=\"https://github.com/KSwordDEV/MCP\" rel=\"noreferrer\" target=\"_blank\">MCP installation →</a></p>",
    "features": [
        [
            "MCP and CLI automation",
            "Connect an AI client through the local stdio sidecar and Qt object bridge for page discovery, snapshots and native control actions. Settings provide session controls, configuration previews, activity logs and an installation prompt. CLI discovery/help and confirmed CLI/IOCTL calls complement the GUI; raw requests are bounded to 1 MiB per direction. Startup defaults to fail; auto startup and UAC require an explicit policy. Dispatched actions still need business-state readback."
        ],
        [
            "Hardware virtualization and R-1",
            "Intel VT-x/EPT residency, nested VMX dispatch with composed shadow EPT, split views, EPTP-switching hooks, execution domains, and R-1 memory/process controls are implemented. AMD SVM/VMCB/NPT and nested SVM use a separate experimental path; full inner-OS startup and broad performance acceptance remain incomplete. Admission checks all-CPU self-tests, the outer environment, and lifecycle state."
        ],
        [
            "Memory snapshots, assembly, and backends",
            "Hex, disassembly, text, and byte differences share a snapshot, with x86/x64 Intel assembly, patch previews, local undo/redo, and explicit writes. Choose R3, standard R0, a private page-table window, or DDMA where supported. Writes compare original bytes, verify actual readback, and bind to the target/session. DDMA needs explicit scratch sectors and depends on hardware and the storage stack. The R3/R0 memory-region menu now exports raw dumps with progress and cancellation. Partial or short reads fail explicitly, and failed/cancelled exports leave no half-written file; kernel-backed export still requires matching driver capabilities."
        ],
        [
            "Processes, objects, and injection traces",
            "Compare R3/R0 process, thread, CID, and handle views with identities bound to PID and creation time. Thread stacks, modules, tokens, protection fields, and injection-trace checks distinguish findings, unexplained differences, and collection gaps. A view discrepancy alone does not establish malicious hiding. The gear button opens process-list settings; activity history defaults to the latest 50 samples, with all-history and stop-recording modes. Evidence details separate overview, field watch and registered reports. Section cards, inline offset/type details, search and complete copy/export share one canonical document; the PEB workspace keeps its professional editor layout."
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
            "Registry and privilege workspaces",
            "Typed registry editing, document workspaces and verified change transactions join account/group, LSA assignment, token comparison, access diagnostics, logon-session and identity-launch tools. Permission snapshots support comparison; CLI and Light reuse shared R3 backends while each edition retains its own feature scope."
        ],
        [
            "Networking and security auditing",
            "Packet capture/filtering, connection management, per-process throttling, request building, HTTPS/WFP/NIDS, and R0 network-stack inventories. Investigate with startup and DLL/IFEO checks, AppLocker, WDAC, Defender/ASR, VBS/HVCI, and driver-trust evidence. Registry browsing, bounded searches, mutation transactions and shared R3 CLI/Light backends complement object-permission review. CKS management presents current-state, enrollment and research workflows with explicit version and verification limits."
        ],
        [
            "Window inspection and port diagnostics",
            "Window details offer separate Win32/UIA control trees and a visual selection overlay. Native input order and DWM display order have distinct controls. Network port diagnostics identify ownership and release occupancy against the verified object identity, with collection and operation limits visible."
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
            "Seventeen main docks and three auxiliary panels, a dedicated KVM workspace, global page search/navigation, light/dark themes, and window notifications. Settings use a separate dialog and scanning belongs to the file workflow; pages, logs, and evidence expose actual capabilities and operation results. Shared parameter/detail layouts, task progress and text editors preserve captured data and expose empty/error states. Taskbar discovers the actual page catalog and offers search, direct navigation and adjustable overview blur."
        ],
        [
            "SOS rescue desktop",
            "With Taskbar running, physical-keyboard S O S Enter requests UAC on the original desktop, then starts a new elevated KSword instance on a restricted private Win32 desktop. Use its return button or Ctrl+Alt+Shift+F10 to return. Existing windows and unsaved sessions stay on the original desktop; this is separate from the Windows UAC secure desktop."
        ]
    ],
    "timelineTitle": "Latest Patches",
    "syncing": "main / a996d38d · Syncing GitHub…",
    "synced": "Synced with GitHub",
    "offline": "GitHub unavailable · Showing main / a996d38d snapshot",
    "locale": "en-CA"
} : {
    "description": "KSword 是 Windows x64 ARK、内核分析与系统取证工具集，提供内存工作台、R3/R0 区域导出、MCP 与 CLI 自动化、结构化报告和 Light 证据工作台。",
    "latest": "最新更新",
    "core": "核心功能",
    "latestHtml": "<p><strong><a href=\"https://github.com/KSwordDEV/KSword/commit/a996d38d91c85a9d99744454880a58b7b223f7f7\" rel=\"noreferrer\" target=\"_blank\">main / a996d38d</a> 开发快照</strong>（内容核对：2026-10-13）。近期新增 MCP GUI 与 CLI/IOCTL 工具、R3/R0 内存区域 dump 导出、复杂进程报告与恢复的 PEB 工作区，并完善注册表与权限工作流、共享 UI 组件和 Taskbar 页面导航。CKS 管理附带研究页，免重置登记仍未验证。</p><p><a href=\"https://github.com/KSwordDEV/KSword/releases/tag/mcp-preview-20261012\" rel=\"noreferrer\" target=\"_blank\">10 月 12 日 MCP/UAC 预发行版</a>已提供 7z/ZIP 整包和独立符号附件；之后的主线改动按各自版本区分。<a href=\"https://github.com/KSwordDEV/KSword/releases\" rel=\"noreferrer\" target=\"_blank\">全部发行与 CI 构建 →</a>　<a href=\"development.html\">开发快照与验收边界 →</a>　<a href=\"changelog.html\">发行更新日志 →</a>　<a href=\"https://github.com/KSwordDEV/MCP\" rel=\"noreferrer\" target=\"_blank\">MCP 安装 →</a></p>",
    "features": [
        [
            "MCP 与 CLI 自动化",
            "通过本地 stdio sidecar 与 Qt 对象桥接入 AI 客户端，发现页面、读取快照并操作原生控件。设置提供会话启停、配置预览、操作日志和安装提示词；CLI 发现/help 与需要确认的 CLI/IOCTL 调用补充 GUI，原始请求的输入与输出各限 1 MiB。默认启动策略为 fail，自动启动及 UAC 按明确策略选择；动作派发后仍需回读业务状态。"
        ],
        [
            "硬件虚拟化与 R-1 层",
            "Intel VT-x/EPT 常驻、嵌套 VMX 分派与 shadow EPT 合成、分离视图、EPTP 切换 Hook、执行域及 R-1 内存/进程控制已经接入。AMD SVM/VMCB/NPT 与嵌套 SVM 使用独立实验路径；完整内层系统启动与广泛性能验收仍未完成。准入检查全 CPU 自检、外层环境与生命周期状态。"
        ],
        [
            "内存快照、汇编与多后端",
            "Hex、反汇编、文本与字节差异共用快照，支持 x86/x64 Intel 汇编、补丁预览、本地撤销/重做和显式写回。按能力选择 R3、标准 R0、私有页表窗口或 DDMA；写前比对、实际回读及目标/会话绑定保留。DDMA 需要显式暂存扇区，受硬件和驱动栈限制。 R3/R0 内存区域菜单新增原始 dump 导出、进度与取消；部分读取或短响应明确失败，失败/取消不残留半成品，内核后端仍依赖对应驱动能力。"
        ],
        [
            "进程、对象与注入痕迹",
            "对照 R3/R0 进程、线程、CID 和句柄视图，按 PID 与创建时间绑定实例。线程栈、模块、令牌、保护字段及注入痕迹检查区分异常证据、未解释差异与采集缺口；视图差异本身不等于恶意隐藏。 齿轮按钮打开进程列表设置；活动历史默认保留最近 50 次，可选全量留存或不记录。 证据详情分为概览、字段监视与已登记报告；分区卡片、偏移/类型行内详情、搜索和完整复制/导出共用规范文档。PEB 工作区保留专业编辑器布局。"
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
            "注册表与权限工作台",
            "注册表支持类型编辑、文档工作台与核验后的修改事务；权限工作台集中账号/用户组、LSA 分配、令牌比较、访问诊断、登录会话和身份启动。权限快照可对照，CLI 与 Light 复用共享 R3 后端，各版本继续保留自己的能力范围。"
        ],
        [
            "网络与安全审计",
            "抓包与过滤、连接管理、按进程限速、请求构造、HTTPS/WFP/NIDS 及 R0 网络栈清单。配合启动项、DLL/IFEO 检查、AppLocker、WDAC、Defender/ASR、VBS/HVCI 与驱动信任证据开展调查。 注册表浏览、有界搜索、修改事务与共享 R3 CLI/Light 后端补充对象权限审阅；CKS 管理分别呈现当前状态、登记工作流与研究候选，保留版本和验证边界。"
        ],
        [
            "窗口检查与端口诊断",
            "窗口详情提供独立 Win32/UIA 控件树与可视选区覆盖；原生输入顺序和 DWM 画面顺序分别控制。网络端口诊断识别占用来源，按核验后的对象身份解除占用，并显示采集与操作限制。"
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
            "17 个主 Dock 与 3 个辅助面板，独立 KVM 工作区、全局页面搜索与定位、深浅主题和窗口通知。设置使用独立对话框，文件扫描属于文件工作流；实际能力与操作结果通过页面状态、日志和证据展示。 共享参数/详情布局、任务进度和文本编辑器保留采集数据并区分空态/错误。Taskbar 读取实际页面目录，支持搜索、逐层直达和可调总览模糊。"
        ],
        [
            "SOS 救援桌面",
            "Taskbar 运行时，用真实键盘输入 S O S Enter，在原桌面批准 UAC 后，于限制访问的私有 Win32 桌面启动新的管理员 KSword。顶部返回按钮或 Ctrl+Alt+Shift+F10 可返回；原窗口和未保存会话留在原桌面，不会迁移。这与 Windows 的 UAC 安全桌面不同。"
        ]
    ],
    "timelineTitle": "实时 Patch",
    "syncing": "main / a996d38d · 正在同步 GitHub…",
    "synced": "已同步 GitHub",
    "offline": "GitHub 暂不可用 · 显示 main / a996d38d 快照",
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
