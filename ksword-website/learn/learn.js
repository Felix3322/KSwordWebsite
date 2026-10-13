/* KSword 文档中心
 * 一套信息架构同时收编：官网自有页面 + KSwordDEV/KSword@main 的 docs/ markdown。
 * 无框架、无外部依赖；markdown 解析器就在本文件里。
 */
(function () {
  'use strict';

  var REPO = 'KSwordDEV/KSword';
  var BRANCH = 'main';
  var RAW = 'https://raw.githubusercontent.com/' + REPO + '/' + BRANCH + '/';
  var BLOB = 'https://github.com/' + REPO + '/blob/' + BRANCH + '/';
  var API = 'https://api.github.com/repos/' + REPO + '/commits?per_page=1&path=';

  /* ── 信息架构 ──────────────────────────────────────
   * p    : 主仓库中的 markdown 路径（在本页内渲染）
   * site : 官网自有页面（相对 learn/ 的链接，点击离开阅读器）
   */
  var GROUPS = [
    {
      id: 'start',
      zh: '开始使用', en: 'Get started',
      zhDesc: '第一次接触 KSword：它是什么、装什么、从哪个界面开始。',
      enDesc: 'What KSword is, what to install, and where to start.',
      items: [
        { site: '../docs/index.html', zh: '安装与开始使用', en: 'Install and get started' },
        { p: 'docs/README.md', zh: '文档总索引', en: 'Documentation index' },
        { p: 'docs/使用与兼容性.md', zh: '使用与兼容性', en: 'Usage and compatibility' },
        { p: 'docs/构建与发布.md', zh: '构建、发行与报告接入', en: 'Build, release and report intake' },
        { p: 'docs/readme_zh.md', zh: '项目说明（中文）', en: 'Project README (Chinese)' },
        { p: 'README.md', zh: '项目说明（English）', en: 'Project README (English)' },
        { p: 'docs/CLI使用文档.md', zh: 'KswordCLI 使用文档', en: 'KswordCLI reference' }
      ]
    },
    {
      id: 'automation',
      zh: 'MCP 自动化', en: 'MCP automation',
      zhDesc: '真实 GUI 对象桥、CLI/IOCTL、安装权限与回执边界。',
      enDesc: 'The real GUI object bridge, CLI/IOCTL tools, privileges and receipt boundaries.',
      items: [
        { p: 'tools/ksword_mcp/README.md', zh: 'MCP 工具与配置', en: 'MCP tools and configuration' },
        { p: 'tools/ksword_mcp/INSTALL_FOR_AGENTS.md', zh: 'MCP 安装与分层验收', en: 'MCP installation and layered validation' },
        { p: 'docs/MCP设置页-20261012.md', zh: 'MCP 设置与会话启停', en: 'MCP settings and session lifecycle' },
        { p: 'docs/MCP-UAC与安装验收-20261012.md', zh: 'MCP UAC 与安装验收', en: 'MCP UAC and installation validation' },
        { p: 'docs/MCP复选框字段修复-20261013.md', zh: 'MCP 布尔字段与勾选语义', en: 'MCP boolean fields and checkbox semantics' },
        { p: 'docs/KSword-MCP接入可行性评估.md', zh: 'MCP 接入设计与边界', en: 'MCP integration design and boundaries' }
      ]
    },
    {
      id: 'cli',
      zh: 'CLI 分域手册', en: 'CLI command families',
      zhDesc: '原生帮助、R3 后端与结构化状态；写操作保留各命令确认与回读。',
      enDesc: 'Native help, R3 backends and structured status; mutations retain command-specific confirmation and readback.',
      items: [
        { p: 'docs/cli/coverage.md', zh: 'R3 66 项覆盖清单', en: '66-item R3 coverage manifest' },
        { p: 'docs/cli/process.md', zh: '进程、线程与令牌', en: 'Processes, threads and tokens' },
        { p: 'docs/cli/file.md', zh: '文件与 PE 分析', en: 'Files and PE analysis' },
        { p: 'docs/cli/registry.md', zh: '注册表浏览、搜索与修改', en: 'Registry browsing, search and changes' },
        { p: 'docs/cli/service.md', zh: '服务查询与控制', en: 'Service queries and control' },
        { p: 'docs/cli/startup.md', zh: '启动项查询与控制', en: 'Startup queries and control' },
        { p: 'docs/cli/network.md', zh: '网络查询与控制', en: 'Network queries and control' },
        { p: 'docs/cli/privilege.md', zh: '权限查询与作用域执行', en: 'Privileges and scoped execution' },
        { p: 'docs/cli/driver.md', zh: '驱动 R3 枚举', en: 'R3 driver enumeration' },
        { p: 'docs/cli/hardware.md', zh: '硬件与遥测', en: 'Hardware and telemetry' },
        { p: 'docs/cli/window.md', zh: '窗口与剪贴板', en: 'Windows and clipboard' },
        { p: 'docs/cli/monitor.md', zh: 'ETW 与事件日志', en: 'ETW and event logs' },
        { p: 'docs/cli/system.md', zh: '系统工具与原始 IOCTL', en: 'System tools and raw IOCTLs' },
        { p: 'docs/cli/kernel.md', zh: '内核对象与命名空间', en: 'Kernel objects and namespaces' },
        { p: 'docs/cli/security.md', zh: 'CI、VBS 与安全证据', en: 'CI, VBS and security evidence' }
      ]
    },
    {
      id: 'concepts',
      zh: '功能与概念', en: 'Features and concepts',
      zhDesc: '每个模块做什么、界面怎么组织、术语怎么理解。',
      enDesc: 'What each module does, how the UI is organised, and what the terms mean.',
      items: [
        { p: 'docs/功能技术文档.md', zh: '功能技术文档', en: 'Feature technical reference' },
        { p: 'docs/Issue-216-内存区域Dump核对.md', zh: 'R3/R0 内存区域 Dump', en: 'R3/R0 memory-region dumps' },
        { p: 'docs/Issue-223-复杂报告子页.md', zh: '复杂报告与规范文档', en: 'Complex reports and canonical documents' },
        { p: 'docs/权限工作台.md', zh: '权限工作台（中文）', en: 'Permission workbench (Chinese)' },
        { p: 'docs/PermissionWorkbench.md', zh: '权限工作台（English）', en: 'Permission workbench (English)' },
        { p: 'docs/窗口控件检查.md', zh: '窗口控件检查', en: 'Window-control inspection' },
        { p: 'docs/内核池分配分析.md', zh: '内核池分配分析', en: 'Kernel pool-allocation analysis' },
        { p: 'docs/反编译后端.md', zh: '反编译后端', en: 'Decompilation backends' },
        { p: 'docs/StorageController.md', zh: '存储控制器', en: 'Storage controllers' },
        { p: 'docs/内存编辑器组件清单.md', zh: '内存快照、汇编与编辑器', en: 'Memory snapshots, assembly and editors' },
        { p: 'docs/PFN物理内存归因.md', zh: 'PFN 物理内存归因', en: 'PFN physical memory attribution' },
        { p: 'docs/窗口输入控制.md', zh: '窗口与输入控制', en: 'Windows and input control' },
        { p: 'docs/SOS救援桌面.md', zh: 'SOS 救援桌面', en: 'SOS rescue desktop' },
        { p: 'docs/DWM窗口序列注入.md', zh: 'DWM 窗口排序', en: 'DWM window ordering' },
        { p: 'docs/Ksword_UI表格详情页面分类.md', zh: 'UI 表格与详情页分类', en: 'UI table and detail taxonomy' },
        { p: 'docs/内核知识中心.md', zh: '内核知识中心', en: 'Kernel knowledge center' },
        { p: 'docs/功能悬停提示词典.md', zh: '功能悬停提示词典', en: 'Hover tooltip dictionary' }
      ]
    },
    {
      id: 'hvm',
      zh: '虚拟化 · HVM / R-1', en: 'Virtualization · HVM / R-1',
      zhDesc: 'Intel VMX/EPT 与实验性 AMD SVM/NPT：实现、嵌套运行与验证边界。',
      enDesc: 'Intel VMX/EPT and experimental AMD SVM/NPT: implementation, nesting and validation boundaries.',
      items: [
        { site: '../hvm-topology.html', zh: 'Nested HVM 拓扑变化演示', en: 'Nested HVM topology demo' },
        { p: 'docs/next/amd-nested-svm-implementation.md', zh: 'AMD 嵌套 SVM（实验）', en: 'AMD nested SVM (experimental)' },
        { p: 'docs/next/amd-nested-entry-progress.md', zh: 'AMD 入口与验收进展', en: 'AMD entry and validation progress' },
        { p: 'tools/hvm_lab/README.md', zh: 'HVM 实验工具与证据', en: 'HVM lab tools and evidence' },
        { p: 'docs/next/嵌套虚拟化架构.md', zh: '嵌套虚拟化架构', en: 'Nested virtualization architecture' },
        { p: 'docs/虚拟化能力路线图.md', zh: '虚拟化能力路线图', en: 'Virtualization capability roadmap' },
        { p: 'docs/虚拟化规范要点.md', zh: '虚拟化规范要点（Intel SDM）', en: 'Specification notes (Intel SDM)' },
        { p: 'docs/next/嵌套下的跨核TLB失效.md', zh: '嵌套下的跨核 TLB 失效', en: 'Cross-core TLB invalidation under nesting' },
        { p: 'docs/next/EPT切换后端设计.md', zh: 'EPT 切换后端设计', en: 'EPTP switching backend design' },
        { p: 'docs/next/隐蔽Hook安全边界决策.md', zh: '隐蔽 Hook 安全边界决策', en: 'Stealth hook security boundary' },
        { p: 'docs/next/用户态退虚拟化决策.md', zh: '用户态退虚拟化决策', en: 'User-mode devirtualization decision' },
        { p: 'docs/next/VTL1证明报告判据.md', zh: 'VTL1 证明报告判据', en: 'VTL1 attestation criteria' }
      ]
    },
    {
      id: 'driver',
      zh: '驱动与 R0 审计', en: 'Driver and R0 audit',
      zhDesc: 'R0 协议、动态偏移、内存取证与实验后端的设计约束。',
      enDesc: 'R0 protocol, dynamic offsets, memory forensics, and experimental backend constraints.',
      items: [
        { p: 'docs/driver_ioctl_audit.md', zh: '驱动 IOCTL 审计', en: 'Driver IOCTL audit' },
        { p: 'docs/offset-profile-diagnosis-20261009.md', zh: '偏移 Profile 诊断与回执', en: 'Offset-profile diagnostics and receipts' },
        { p: 'docs/PDB特征码回退增量适配.md', zh: 'PDB 与特征码回退边界', en: 'PDB and signature-fallback boundaries' },
        { p: 'docs/动态偏移功能接入步骤.md', zh: '动态偏移接入步骤', en: 'Dynamic offset integration steps' },
        { p: 'docs/系统内存审计.md', zh: '系统内存审计', en: 'System memory audit' },
        { p: 'docs/高级取证与实验后端设计.md', zh: '高级取证与实验后端设计', en: 'Advanced forensics backend design' },
        { p: 'docs/RXPF实验机制.md', zh: 'RXPF 实验机制', en: 'RXPF experimental mechanism' }
      ]
    },
    {
      id: 'pdb',
      zh: 'PDB / R0 审计准备', en: 'PDB / R0 audit prep',
      zhDesc: '十一份分域审计准备，从符号清单一直到接入验收矩阵。',
      enDesc: 'Eleven domain audits, from symbol inventory through the integration acceptance matrix.',
      items: [
        { p: 'docs/pdb_r0_audit_prep/01_pdb_inventory_and_extractor.md', zh: '01 · PDB 清单与提取器', en: '01 · PDB inventory and extractor' },
        { p: 'docs/pdb_r0_audit_prep/02_multimodule_dyndata_schema.md', zh: '02 · 多模块 DynData 结构', en: '02 · Multi-module DynData schema' },
        { p: 'docs/pdb_r0_audit_prep/03_win32k_gui_audit.md', zh: '03 · win32k / GUI 审计', en: '03 · win32k GUI audit' },
        { p: 'docs/pdb_r0_audit_prep/04_network_stack_audit.md', zh: '04 · 网络栈审计', en: '04 · Network stack audit' },
        { p: 'docs/pdb_r0_audit_prep/05_storage_bitlocker_filesystem_audit.md', zh: '05 · 存储 / BitLocker / 文件系统', en: '05 · Storage, BitLocker, file system' },
        { p: 'docs/pdb_r0_audit_prep/06_filter_file_section_audit.md', zh: '06 · 过滤器与文件 Section', en: '06 · Filter and file section audit' },
        { p: 'docs/pdb_r0_audit_prep/07_ntos_core_ark_audit.md', zh: '07 · ntos 核心 ARK 审计', en: '07 · ntos core ARK audit' },
        { p: 'docs/pdb_r0_audit_prep/08_security_ci_vbs_hyperv_audit.md', zh: '08 · CI / VBS / Hyper-V 审计', en: '08 · CI, VBS, Hyper-V audit' },
        { p: 'docs/pdb_r0_audit_prep/09_device_input_gpu_pnp_audit.md', zh: '09 · 设备 / 输入 / GPU / PnP', en: '09 · Device, input, GPU, PnP' },
        { p: 'docs/pdb_r0_audit_prep/10_acceptance_risk_and_integration_plan.md', zh: '10 · 验收风险与接入计划', en: '10 · Acceptance risk and integration plan' },
        { p: 'docs/pdb_r0_audit_prep/11_pdb_r0_integration_acceptance_matrix.md', zh: '11 · PDB/R0 接入验收矩阵', en: '11 · PDB/R0 integration matrix' }
      ]
    },
    {
      id: 'testing',
      zh: '测试与验收', en: 'Testing and acceptance',
      zhDesc: '靶机怎么搭、验收判据是什么、哪些结论已经有证据、哪些还没有。',
      enDesc: 'How the target is built, what the criteria are, and which conclusions actually have evidence.',
      items: [
        { p: 'docs/next/VM测试机搭建.md', zh: 'VM 测试机搭建', en: 'Building the VM target' },
        { p: 'docs/next/测试机操作手册.md', zh: '测试机操作手册', en: 'Target machine operator manual' },
        { p: 'docs/next/自动化测试.md', zh: '自动化测试', en: 'Automated test suite' },
        { p: 'docs/next/KSword_Next_Roadmap_Acceptance.md', zh: '下一阶段验收规范', en: 'Next-phase acceptance spec' },
        { p: 'docs/next/最终报告.md', zh: '验收最终报告', en: 'Acceptance final report' },
        { p: 'docs/next/实现映射.md', zh: '实现映射', en: 'Implementation mapping' },
        { p: 'docs/next/使用与限制说明.md', zh: '使用与限制说明', en: 'Usage and limitations' },
        { p: 'docs/第二规划R0R3验收矩阵.md', zh: '第二规划 R0/R3 验收矩阵', en: 'Phase-two R0/R3 acceptance matrix' }
      ]
    },
    {
      id: 'ui',
      zh: '共享 UI 与工作台设计', en: 'Shared UI and workspace design',
      zhDesc: '共享框架、主线实现记录与验证边界；设计文档保留原状态。',
      enDesc: 'Shared frameworks, main-branch records and validation boundaries; designs retain their stated status.',
      items: [
        { p: 'docs/默认标准主题-20261012.md', zh: '应用级标准控件主题', en: 'Application-wide standard widget theme' },
        { p: 'docs/参数表单框架接入.md', zh: '参数工作区接入', en: 'Parameter workspace integration' },
        { p: 'docs/设置与二级工具页面布局-20261010.md', zh: '设置与二级工具布局', en: 'Settings and secondary-tool layouts' },
        { p: 'docs/详情共享框架接入-20261011.md', zh: '共享详情框架', en: 'Shared detail framework' },
        { p: 'docs/UI结果Tab连体布局-20261012.md', zh: '结果 Tab 与工具区衔接', en: 'Joined result tabs and tool areas' },
        { p: 'docs/统一组件验收记录.md', zh: '统一组件验收记录', en: 'Shared-component validation record' },
        { p: 'docs/共享UI组件重构验收记录.md', zh: '共享 UI 重构验收', en: 'Shared UI refactor validation' },
        { p: 'docs/内存工作台重写设计.md', zh: '内存工作台重写设计', en: 'Memory-workbench rewrite design' }
      ]
    },
    {
      id: 'extend',
      zh: '扩展开发', en: 'Extending KSword',
      zhDesc: '写插件、加语言包时必须遵守的接口与命名约定。',
      enDesc: 'Interfaces and naming rules for plugins and language packs.',
      items: [
        { p: 'docs/文档与官网维护.md', zh: '文档与官网维护', en: 'Documentation and website maintenance' },
        { p: 'CONTRIBUTING.md', zh: '贡献与模块边界', en: 'Contributing and module boundaries' },
        { p: 'docs/插件系统规范.md', zh: '插件系统规范', en: 'Plugin system specification' },
        { p: 'docs/多语言语言包规范.md', zh: '多语言语言包规范', en: 'Language pack specification' }
      ]
    },
    {
      id: 'planning',
      zh: '规划与对照', en: 'Planning and comparisons',
      zhDesc: '阶段清单与同类工具功能对照，用来判断差距而不是宣传覆盖率。',
      enDesc: 'Phase manifests and feature comparisons — for judging gaps, not advertising coverage.',
      items: [
        { p: 'docs/next_phase_manifests/driver_kernel_integrity.md', zh: '驱动与内核完整性', en: 'Driver and kernel integrity' },
        { p: 'docs/next_phase_manifests/driver_unload_pdb_research.md', zh: '驱动卸载与 PDB 研究', en: 'Driver unload and PDB research' },
        { p: 'docs/next_phase_manifests/dyndata_v3.md', zh: 'DynData v3', en: 'DynData v3' },
        { p: 'docs/next_phase_manifests/memory_evidence.md', zh: '内存证据', en: 'Memory evidence' },
        { p: 'docs/next_phase_manifests/mutation_transaction.md', zh: '变更事务', en: 'Mutation transaction' },
        { p: 'docs/next_phase_manifests/process_thread_crossview.md', zh: '进程 / 线程 Cross-view', en: 'Process and thread cross-view' },
        { p: 'docs/next_phase_manifests/r3_integration.md', zh: 'R3 接入', en: 'R3 integration' },
        { p: 'docs/OpenArk功能对照与TODO.md', zh: 'OpenArk 功能对照与 TODO', en: 'OpenArk feature comparison' },
        { p: 'docs/SKT64旧版功能对照.md', zh: 'SKT64 旧版功能对照', en: 'SKT64 legacy feature comparison' }
      ]
    },
    {
      id: 'cks',
      zh: 'CKS 管理与研究', en: 'CKS management and research',
      zhDesc: '管理步骤与免重置研究分开；启动前登记和修复安装候选仍未验证。',
      enDesc: 'Management and reset-free research stay separate; pre-boot enrollment and repair-install candidates remain unverified.',
      items: [
        { p: 'docs/CKS管理.md', zh: 'CKS 管理', en: 'CKS management' },
        { p: 'docs/CKS新版免重置启用研究.md', zh: 'CKS 新版免重置研究（未验证）', en: 'Reset-free CKS research (unverified)' },
        { p: 'docs/CKS本机登记链深入研究.md', zh: 'CKS 本机登记链与候选边界', en: 'Local CKS enrollment chain and candidate limits' }
      ]
    },
    {
      id: 'security',
      zh: '安全研究', en: 'Security research',
      zhDesc: '具体样本与攻击链的分析记录及对应检测判据。',
      enDesc: 'Sample-level analysis of attack chains and the detection criteria derived from them.',
      items: [
        { p: 'docs/security/EXIT_GhostSystemDriver_IDA91_分析与检测.md', zh: 'EXIT GhostSystemDriver 分析与检测', en: 'EXIT GhostSystemDriver analysis' }
      ]
    },
    {
      id: 'project',
      zh: '项目信息', en: 'Project information',
      zhDesc: '版本、许可证、归属与联系方式。',
      enDesc: 'Releases, licence, credits, and contact.',
      items: [
        { site: '../changelog.html', zh: '更新日志', en: 'Release history' },
        { site: '../development.html', zh: 'main 开发快照', en: 'Main development snapshot' },
        { site: '../docs/license.html', zh: '许可证说明', en: 'Licence overview' },
        { site: '../docs/credits.html', zh: '第三方与致谢', en: 'Third-party credits' },
        { site: '../docs/contact.html', zh: '联系方式', en: 'Contact' }
      ]
    }
  ];

  GROUPS.splice(4, 0, {
  "id": "monitoring",
  "zh": "监控与调试器",
  "en": "Monitoring and debuggers",
  "zhDesc": "会话、覆盖、真实机制与适配器边界。",
  "enDesc": "Sessions, coverage, actual mechanisms and adapter boundaries.",
  "items": [
    {
      "p": "APIMonitor_x64/README.md",
      "zh": "WinAPI x64 监控",
      "en": "WinAPI x64 monitoring"
    },
    {
      "p": "APIMonitor_x86/README.md",
      "zh": "WinAPI x86 监控",
      "en": "WinAPI x86 monitoring"
    },
    {
      "p": "tools/syscall_monitor/README.md",
      "zh": "Syscall 采集与工具",
      "en": "Syscall capture and tools"
    },
    {
      "p": "DebuggerBackend/README.md",
      "zh": "公共调试后端与 Shadow 策略",
      "en": "Shared debugger backend and Shadow policies"
    },
    {
      "p": "CheatEnginePlugin/README.md",
      "zh": "CE 后端适配器",
      "en": "CE backend adapter"
    },
    {
      "p": "TitanEnginePlugin/README.md",
      "zh": "TitanEngine 适配器",
      "en": "TitanEngine adapter"
    },
    {
      "p": "X96dbgIntegration/README.md",
      "zh": "x64dbg/x96dbg 集成",
      "en": "x64dbg/x96dbg integration"
    },
    {
      "p": "docs/ksword-x64dbg-backend.md",
      "zh": "x64dbg 后端细节",
      "en": "x64dbg backend details"
    },
    {
      "p": "docs/ksword-debugger-vm-validation.md",
      "zh": "调试器验证证据",
      "en": "Debugger validation evidence"
    }
  ]
});

  var STR = {
    zh: {
      docs: '文档', home: '首页', onThisPage: '本文内容', filter: '筛选文档标题…',
      loading: '正在读取 main 分支…', source: '源文件', edit: '在 GitHub 上查看 ↗',
      updated: '最近更新', prev: '上一篇', next: '下一篇', noMatch: '没有匹配的文档。',
      noHeadings: '本文没有二级标题。',
      failTitle: '读取失败',
      failBody: '无法从 raw.githubusercontent.com 读取该文件。可能是网络受限、文件已改名或分支已变动。',
      hubTitle: 'KSword 文档',
      hubLead: '官网自有页面与主仓库 <code>docs/</code> 收在同一套目录里。目录核对日期 2026-10-13，基线 main a996d38d。Markdown 直接读取 <code>KSwordDEV/KSword@main</code>；主线文档不代表旧发布包已包含相应功能；历史实验、路线图和设计记录保留原日期与验证状态，不能视为当前支持承诺。',
      hubCount: '篇',
      hubSite: '官网页面',
      site: '官网'
    },
    en: {
      docs: 'Docs', home: 'Home', onThisPage: 'In this article', filter: 'Filter by title…',
      loading: 'Loading from main…', source: 'Source', edit: 'View on GitHub ↗',
      updated: 'Last updated', prev: 'Previous', next: 'Next', noMatch: 'No matching document.',
      noHeadings: 'This article has no level-2 headings.',
      failTitle: 'Could not load',
      failBody: 'Failed to read the file from raw.githubusercontent.com. The network may be restricted, or the file may have been renamed or moved.',
      hubTitle: 'KSword documentation',
      hubLead: 'Site pages and the main repository <code>docs/</code> share one table of contents. The index was verified on 2026-10-13 against main a996d38d. Markdown loads from <code>KSwordDEV/KSword@main</code>; main-branch documentation does not establish availability in older packages. Historical experiments, roadmaps and designs retain their original dates and validation status and are not current support guarantees. Most source documents are in Chinese.',
      hubCount: 'articles',
      hubSite: 'site pages',
      site: 'Site'
    }
  };

  var FLAT = [];
  GROUPS.forEach(function (g) {
    g.items.forEach(function (it) {
      it.group = g;
      if (it.p) { FLAT.push(it); }
    });
  });

  /* ── Markdown ─────────────────────────────────────── */

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function inline(text) {
    var stash = [];
    var out = esc(text);

    out = out.replace(/`([^`]+)`/g, function (m, code) {
      stash.push('<code>' + code + '</code>');
      return '\u0001' + (stash.length - 1) + '\u0001';
    });

    out = out.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g, function (m, alt, src) {
      stash.push('<img alt="' + alt + '" loading="lazy" src="' + src + '"/>');
      return '\u0001' + (stash.length - 1) + '\u0001';
    });

    out = out.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g, function (m, label, href) {
      stash.push('<a href="' + href + '">' + label + '</a>');
      return '\u0001' + (stash.length - 1) + '\u0001';
    });

    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    out = out.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
    out = out.replace(/~~([^~]+)~~/g, '<del>$1</del>');

    out = out.replace(/\u0001(\d+)\u0001/g, function (m, i) { return stash[Number(i)]; });
    return out;
  }

  var slugSeen = {};
  function slug(text) {
    var base = String(text)
      .replace(/<[^>]+>/g, '')
      .replace(/[`*_~]/g, '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w一-鿿-]/g, '');
    if (!base) { base = 'section'; }
    if (Object.prototype.hasOwnProperty.call(slugSeen, base)) {
      slugSeen[base] += 1;
      return base + '-' + slugSeen[base];
    }
    slugSeen[base] = 0;
    return base;
  }

  function isListLine(line) { return /^(\s*)([-*+]|\d+[.)])\s+/.test(line); }
  function isFence(line) { return /^\s*(```|~~~)/.test(line); }
  function isHr(line) { return /^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line); }
  function isHeading(line) { return /^\s{0,3}#{1,6}\s+/.test(line); }
  function isQuote(line) { return /^\s*>/.test(line); }
  function isTableDelim(line) { return /^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/.test(line) && line.indexOf('-') !== -1 && line.indexOf('|') !== -1; }
  function blank(line) { return /^\s*$/.test(line); }

  function splitRow(row) {
    var s = row.trim();
    if (s.charAt(0) === '|') { s = s.slice(1); }
    if (s.charAt(s.length - 1) === '|') { s = s.slice(0, -1); }
    var cells = [];
    var buf = '';
    var i = 0;
    while (i < s.length) {
      var ch = s.charAt(i);
      if (ch === '\\' && s.charAt(i + 1) === '|') { buf += '|'; i += 2; continue; }
      if (ch === '|') { cells.push(buf); buf = ''; i += 1; continue; }
      buf += ch;
      i += 1;
    }
    cells.push(buf);
    return cells.map(function (c) { return c.trim(); });
  }

  function render(md, headings) {
    var lines = String(md).replace(/\r\n?/g, '\n').split('\n');
    return blocks(lines, headings, true);
  }

  function blocks(lines, headings, top) {
    var html = '';
    var i = 0;

    while (i < lines.length) {
      var line = lines[i];

      if (blank(line)) { i += 1; continue; }

      if (isFence(line)) {
        var mark = line.trim().slice(0, 3);
        var body = [];
        i += 1;
        while (i < lines.length && lines[i].trim().indexOf(mark) !== 0) { body.push(lines[i]); i += 1; }
        i += 1;
        html += '<pre><code>' + esc(body.join('\n')) + '</code></pre>';
        continue;
      }

      if (isHeading(line)) {
        var hm = line.match(/^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/);
        var level = hm[1].length;
        var content = inline(hm[2]);
        if (top && (level === 2 || level === 3)) {
          var id = slug(hm[2]);
          headings.push({ level: level, text: hm[2].replace(/[`*_~]/g, ''), id: id });
          html += '<h' + level + ' id="' + id + '">' + content + '</h' + level + '>';
        } else {
          html += '<h' + level + '>' + content + '</h' + level + '>';
        }
        i += 1;
        continue;
      }

      if (isHr(line)) { html += '<hr/>'; i += 1; continue; }

      if (isQuote(line)) {
        var q = [];
        while (i < lines.length && isQuote(lines[i])) {
          q.push(lines[i].replace(/^\s*>\s?/, ''));
          i += 1;
        }
        html += '<blockquote>' + blocks(q, headings, false) + '</blockquote>';
        continue;
      }

      if (line.indexOf('|') !== -1 && i + 1 < lines.length && isTableDelim(lines[i + 1])) {
        var head = splitRow(line);
        var align = splitRow(lines[i + 1]).map(function (c) {
          if (/^:.*:$/.test(c)) { return 'center'; }
          if (/:$/.test(c)) { return 'right'; }
          return '';
        });
        i += 2;
        var rows = [];
        while (i < lines.length && !blank(lines[i]) && lines[i].indexOf('|') !== -1) {
          rows.push(splitRow(lines[i]));
          i += 1;
        }
        var t = '<div class="learn-table-scroll"><table><thead><tr>';
        head.forEach(function (c, ci) {
          t += '<th' + (align[ci] ? ' style="text-align:' + align[ci] + '"' : '') + '>' + inline(c) + '</th>';
        });
        t += '</tr></thead><tbody>';
        rows.forEach(function (r) {
          t += '<tr>';
          for (var ci = 0; ci < head.length; ci += 1) {
            var cell = r[ci] === undefined ? '' : r[ci];
            t += '<td' + (align[ci] ? ' style="text-align:' + align[ci] + '"' : '') + '>' + inline(cell) + '</td>';
          }
          t += '</tr>';
        });
        html += t + '</tbody></table></div>';
        continue;
      }

      if (isListLine(line)) {
        var baseIndent = line.match(/^(\s*)/)[1].length;
        var ordered = /^\s*\d+[.)]\s+/.test(line);
        var chunk = [];
        while (i < lines.length) {
          var cur = lines[i];
          if (blank(cur)) {
            var nxt = lines[i + 1];
            if (nxt !== undefined && !blank(nxt) &&
                (isListLine(nxt) || nxt.match(/^(\s*)/)[1].length > baseIndent)) {
              chunk.push('');
              i += 1;
              continue;
            }
            break;
          }
          var indent = cur.match(/^(\s*)/)[1].length;
          if (isListLine(cur) && indent <= baseIndent) {
            if (indent < baseIndent) { break; }
            chunk.push(cur);
            i += 1;
            continue;
          }
          if (indent > baseIndent) { chunk.push(cur); i += 1; continue; }
          break;
        }
        html += renderList(chunk, baseIndent, ordered, headings);
        continue;
      }

      var para = [];
      while (i < lines.length && !blank(lines[i]) && !isHeading(lines[i]) && !isFence(lines[i]) &&
             !isHr(lines[i]) && !isQuote(lines[i]) && !isListLine(lines[i])) {
        if (lines[i].indexOf('|') !== -1 && isTableDelim(lines[i + 1] || '')) { break; }
        para.push(lines[i].trim());
        i += 1;
      }
      if (para.length) { html += '<p>' + inline(para.join(' ')) + '</p>'; }
      else { i += 1; }
    }

    return html;
  }

  function renderList(chunk, baseIndent, ordered, headings) {
    var items = [];
    var cur = null;
    chunk.forEach(function (line) {
      var indent = line.match(/^(\s*)/)[1].length;
      if (isListLine(line) && indent === baseIndent) {
        if (cur) { items.push(cur); }
        cur = [line.replace(/^(\s*)([-*+]|\d+[.)])\s+/, '')];
      } else if (cur) {
        cur.push(line.length > baseIndent + 2 ? line.slice(baseIndent + 2) : line.trim());
      }
    });
    if (cur) { items.push(cur); }

    var tag = ordered ? 'ol' : 'ul';
    var html = '<' + tag + '>';
    items.forEach(function (body) {
      var inner = blocks(body, headings, false);
      var single = inner.match(/^<p>([\s\S]*)<\/p>$/);
      if (single && single[1].indexOf('<p>') === -1) { inner = single[1]; }
      html += '<li>' + inner + '</li>';
    });
    return html + '</' + tag + '>';
  }

  /* ── 路径 ─────────────────────────────────────────── */

  function resolvePath(from, rel) {
    if (/^[a-z]+:/i.test(rel) || rel.charAt(0) === '#') { return null; }
    var dir = from.split('/').slice(0, -1);
    var parts = rel.split('/');
    parts.forEach(function (p) {
      if (p === '.' || p === '') { return; }
      if (p === '..') { dir.pop(); return; }
      dir.push(p);
    });
    return dir.join('/');
  }

  function docUrl(path, lang) {
    return '?doc=' + encodeURIComponent(path) + (lang === 'en' ? '&lang=en' : '');
  }
  function hubUrl(lang) { return lang === 'en' ? '?lang=en' : './'; }

  function siteUrl(relative) {
    return lang === 'en' ? relative.replace(/^\.\.\//, '../en/') : relative;
  }

  /* ── 应用 ─────────────────────────────────────────── */

  var el = {
    toc: document.querySelector('[data-learn-toc]'),
    filter: document.querySelector('[data-learn-filter]'),
    crumbGroup: document.querySelector('[data-crumb-group]'),
    crumbSep: document.querySelector('[data-crumb-sep]'),
    crumbDoc: document.querySelector('[data-crumb-doc]'),
    crumbHome: document.querySelector('[data-crumb-home]'),
    crumbDocs: document.querySelector('[data-crumb-docs]'),
    title: document.querySelector('[data-learn-title]'),
    meta: document.querySelector('[data-learn-meta]'),
    body: document.querySelector('[data-learn-body]'),
    rail: document.querySelector('[data-learn-rail]'),
    railWrap: document.querySelector('[data-learn-rail-wrap]'),
    railTitle: document.querySelector('[data-learn-rail-title]'),
    pager: document.querySelector('[data-learn-pager]'),
    foot: document.querySelector('[data-learn-foot]'),
    lang: document.querySelectorAll('[data-learn-lang]')
  };
  if (!el.body) { return; }

  var lang = 'zh';
  var currentPath = null;
  var tocLinks = {};

  function t(key) { return STR[lang][key]; }

  function buildToc() {
    el.toc.innerHTML = '';
    tocLinks = {};
    GROUPS.forEach(function (g) {
      var box = document.createElement('div');
      box.className = 'learn-group';
      box.setAttribute('data-open', 'false');

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = g[lang];
      btn.addEventListener('click', function () {
        box.setAttribute('data-open', box.getAttribute('data-open') === 'true' ? 'false' : 'true');
      });

      var ul = document.createElement('ul');
      g.items.forEach(function (it) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.textContent = it[lang];
        if (it.site) {
          a.href = siteUrl(it.site);
          a.className = 'is-site';
        } else {
          a.href = docUrl(it.p, lang);
          a.addEventListener('click', function (e) {
            e.preventDefault();
            navigate(it.p);
          });
          tocLinks[it.p] = { a: a, group: box };
        }
        li.appendChild(a);
        ul.appendChild(li);
      });

      box.appendChild(btn);
      box.appendChild(ul);
      el.toc.appendChild(box);
    });
    applyFilter(el.filter ? el.filter.value : '');
    markActive();
  }

  function applyFilter(q) {
    var query = String(q || '').trim().toLowerCase();
    var anyVisible = false;
    Array.prototype.forEach.call(el.toc.querySelectorAll('.learn-group'), function (box) {
      var hit = 0;
      Array.prototype.forEach.call(box.querySelectorAll('li'), function (li) {
        var show = !query || li.textContent.toLowerCase().indexOf(query) !== -1;
        li.style.display = show ? '' : 'none';
        if (show) { hit += 1; }
      });
      var groupHit = !query || hit > 0 ||
        box.querySelector('button').textContent.toLowerCase().indexOf(query) !== -1;
      box.style.display = groupHit ? '' : 'none';
      if (groupHit) { anyVisible = true; }
      if (query && groupHit) { box.setAttribute('data-open', 'true'); }
    });
    var empty = el.toc.querySelector('.learn-toc-empty');
    if (empty) { empty.parentNode.removeChild(empty); }
    if (!anyVisible) {
      var p = document.createElement('p');
      p.className = 'learn-toc-empty';
      p.textContent = t('noMatch');
      el.toc.appendChild(p);
    }
  }

  function markActive() {
    Object.keys(tocLinks).forEach(function (p) {
      var entry = tocLinks[p];
      if (p === currentPath) {
        entry.a.setAttribute('aria-current', 'page');
        entry.group.setAttribute('data-open', 'true');
      } else {
        entry.a.removeAttribute('aria-current');
      }
    });
  }

  function findItem(path) {
    for (var i = 0; i < FLAT.length; i += 1) {
      if (FLAT[i].p === path) { return { item: FLAT[i], index: i }; }
    }
    return null;
  }

  function setChrome() {
    el.crumbHome.textContent = t('home');
    el.crumbHome.href = siteUrl('../index.html');
    el.crumbDocs.textContent = t('docs');
    el.crumbDocs.href = hubUrl(lang);
    el.railTitle.textContent = t('onThisPage');
    if (el.filter) { el.filter.placeholder = t('filter'); }
    Array.prototype.forEach.call(el.lang, function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-learn-lang') === lang ? 'true' : 'false');
    });
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    var nav = document.querySelector('.site-header nav');
    var labels = lang === 'en'
      ? ['Home', 'Changelog', 'Development', 'HVM topology', 'Docs', '中文', 'GitHub ↗']
      : ['首页', '更新日志', '开发快照', 'HVM 拓扑', '文档', 'English', 'GitHub ↗'];
    var targets = [siteUrl('../index.html'), siteUrl('../changelog.html'),
      siteUrl('../development.html'), siteUrl('../hvm-topology.html'), hubUrl(lang),
      hubUrl(lang === 'en' ? 'zh' : 'en'), 'https://github.com/KSwordDEV/KSword'];
    if (nav) Array.prototype.forEach.call(nav.querySelectorAll('a'), function (a, i) {
      if (labels[i]) { a.textContent = labels[i]; a.href = targets[i]; }
    });
    var bar = document.querySelector('.learn-bar-title span');
    if (bar) { bar.textContent = '/ ' + t('docs'); }
    if (el.filter) { el.filter.setAttribute('aria-label', lang === 'en' ? 'Filter documents' : '筛选文档'); }
  }

  function buildRail(headings) {
    el.rail.innerHTML = '';
    if (!headings.length) {
      var p = document.createElement('p');
      p.className = 'learn-rail-empty';
      p.textContent = t('noHeadings');
      el.rail.appendChild(p);
      return;
    }
    var ol = document.createElement('ol');
    headings.forEach(function (h) {
      var li = document.createElement('li');
      if (h.level === 3) { li.className = 'is-sub'; }
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.text;
      li.appendChild(a);
      ol.appendChild(li);
    });
    el.rail.appendChild(ol);
    watchHeadings(headings);
  }

  var railObserver = null;
  function watchHeadings(headings) {
    if (railObserver) { railObserver.disconnect(); }
    if (!window.IntersectionObserver) { return; }
    var links = {};
    Array.prototype.forEach.call(el.rail.querySelectorAll('a'), function (a) {
      links[decodeURIComponent(a.getAttribute('href').slice(1))] = a;
    });
    railObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        var a = links[entry.target.id];
        if (!a) { return; }
        Object.keys(links).forEach(function (k) { links[k].removeAttribute('aria-current'); });
        a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-90px 0px -70% 0px' });
    headings.forEach(function (h) {
      var node = document.getElementById(h.id);
      if (node) { railObserver.observe(node); }
    });
  }

  function buildPager(index) {
    el.pager.innerHTML = '';
    var prev = index > 0 ? FLAT[index - 1] : null;
    var next = index >= 0 && index < FLAT.length - 1 ? FLAT[index + 1] : null;

    [['prev', prev, ''], ['next', next, 'is-next']].forEach(function (spec) {
      var a = document.createElement('a');
      a.className = spec[2];
      if (!spec[1]) {
        a.className += ' is-empty';
        a.href = '#';
        a.innerHTML = '<span></span><strong></strong>';
      } else {
        a.href = docUrl(spec[1].p, lang);
        a.innerHTML = '<span></span><strong></strong>';
        a.querySelector('span').textContent = t(spec[0]);
        a.querySelector('strong').textContent = spec[1][lang];
        a.addEventListener('click', function (e) { e.preventDefault(); navigate(spec[1].p); });
      }
      el.pager.appendChild(a);
    });
  }

  function rewriteLinks(from) {
    Array.prototype.forEach.call(el.body.querySelectorAll('a[href]'), function (a) {
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#') { return; }
      if (/^[a-z]+:/i.test(href)) {
        a.target = '_blank';
        a.rel = 'noreferrer';
        return;
      }
      var hash = href.indexOf('#') !== -1 ? href.slice(href.indexOf('#')) : '';
      var resolved = resolvePath(from, href.split('#')[0]);
      if (!resolved) { return; }
      if (/\.md$/i.test(resolved)) {
        a.href = docUrl(resolved, lang) + hash;
        a.addEventListener('click', function (e) {
          e.preventDefault();
          navigate(resolved, hash.slice(1));
        });
      } else {
        a.href = BLOB + resolved;
        a.target = '_blank';
        a.rel = 'noreferrer';
      }
    });
    Array.prototype.forEach.call(el.body.querySelectorAll('img[src]'), function (img) {
      var src = img.getAttribute('src');
      if (/^[a-z]+:/i.test(src) || src.charAt(0) === '/') { return; }
      var resolved = resolvePath(from, src);
      if (resolved) { img.src = RAW + resolved; }
    });
  }

  var cache = {};

  function fetchDoc(path) {
    if (cache[path]) { return Promise.resolve(cache[path]); }
    return fetch(RAW + path.split('/').map(encodeURIComponent).join('/'), { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) { throw new Error('HTTP ' + res.status); }
        return res.text();
      })
      .then(function (text) { cache[path] = text; return text; });
  }

  function fetchUpdated(path) {
    return fetch(API + encodeURIComponent(path))
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) {
        if (!data || !data.length || !data[0].commit) { return null; }
        return data[0].commit.committer.date.slice(0, 10);
      })
      .catch(function () { return null; });
  }

  function setMeta(path, updated) {
    el.meta.innerHTML = '';
    var src = document.createElement('span');
    src.appendChild(document.createTextNode(t('source') + '：'));
    var code = document.createElement('code');
    code.textContent = path;
    src.appendChild(code);
    el.meta.appendChild(src);

    if (updated) {
      var up = document.createElement('span');
      up.textContent = t('updated') + '：' + updated;
      el.meta.appendChild(up);
    }

    var link = document.createElement('span');
    var a = document.createElement('a');
    a.href = BLOB + path;
    a.target = '_blank';
    a.rel = 'noreferrer';
    a.textContent = t('edit');
    link.appendChild(a);
    el.meta.appendChild(link);
  }

  /* ── 文档中心首页 ─────────────────────────────────── */

  function showHub(replace) {
    currentPath = null;
    var url = hubUrl(lang);
    if (replace) { history.replaceState({ hub: true }, '', url); }
    else { history.pushState({ hub: true }, '', url); }

    document.title = t('hubTitle') + ' — KSword';
    el.title.textContent = t('hubTitle');
    el.crumbGroup.textContent = '';
    el.crumbSep.style.display = 'none';
    el.crumbDoc.textContent = '';
    el.meta.innerHTML = '';
    el.railWrap.style.display = 'none';
    el.foot.style.display = 'none';
    markActive();

    var html = '<p class="learn-hub-lead">' + t('hubLead') + '</p><div class="learn-hub">';
    GROUPS.forEach(function (g) {
      var docCount = g.items.filter(function (x) { return x.p; }).length;
      var siteCount = g.items.length - docCount;
      var badge = [];
      if (docCount) { badge.push(docCount + ' ' + t('hubCount')); }
      if (siteCount) { badge.push(siteCount + ' ' + t('hubSite')); }

      html += '<section class="learn-hub-card"><h2>' + esc(g[lang]) + '</h2>' +
        '<p class="learn-hub-desc">' + esc(g[lang === 'en' ? 'enDesc' : 'zhDesc']) + '</p><ul>';
      g.items.forEach(function (it) {
        if (it.site) {
          html += '<li><a class="is-site" href="' + esc(siteUrl(it.site)) + '">' + esc(it[lang]) +
            '<em>' + t('site') + '</em></a></li>';
        } else {
          html += '<li><a data-hub-doc="' + esc(it.p) + '" href="' + esc(docUrl(it.p, lang)) + '">' +
            esc(it[lang]) + '</a></li>';
        }
      });
      html += '</ul><p class="learn-hub-count">' + badge.join(' · ') + '</p></section>';
    });
    html += '</div>';
    el.body.innerHTML = html;

    Array.prototype.forEach.call(el.body.querySelectorAll('[data-hub-doc]'), function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        navigate(a.getAttribute('data-hub-doc'));
      });
    });
    window.scrollTo(0, 0);
  }

  function navigate(path, anchor, replace) {
    currentPath = path;
    var found = findItem(path);
    var item = found ? found.item : null;

    var url = docUrl(path, lang) + (anchor ? '#' + anchor : '');
    if (replace) { history.replaceState({ p: path }, '', url); }
    else { history.pushState({ p: path }, '', url); }

    el.railWrap.style.display = '';
    el.foot.style.display = '';
    el.crumbSep.style.display = '';

    el.title.textContent = item ? item[lang] : path.split('/').pop().replace(/\.md$/i, '');
    el.crumbGroup.textContent = item ? item.group[lang] : t('docs');
    el.crumbDoc.textContent = el.title.textContent;
    document.title = el.title.textContent + ' — KSword ' + t('docs');
    markActive();
    buildPager(found ? found.index : -1);
    setMeta(path, null);

    el.body.innerHTML = '<p class="learn-state">' + t('loading') + '</p>';
    el.rail.innerHTML = '';

    fetchDoc(path).then(function (md) {
      if (currentPath !== path) { return; }
      slugSeen = {};
      var headings = [];
      var body = String(md).replace(/^﻿/, '');
      var firstH1 = body.match(/^\s*#\s+(.+)$/m);
      if (firstH1 && !item) { el.title.textContent = firstH1[1].replace(/[`*_~]/g, ''); }
      body = body.replace(/^\s*#\s+.+\n/, '');
      el.body.innerHTML = render(body, headings);
      rewriteLinks(path);
      buildRail(headings);
      if (anchor) {
        var target = document.getElementById(anchor);
        if (target) { target.scrollIntoView(); return; }
      }
      window.scrollTo(0, 0);
    }).catch(function (err) {
      if (currentPath !== path) { return; }
      el.body.innerHTML = '<div class="learn-state" data-kind="error"><strong>' + t('failTitle') +
        '</strong><p>' + t('failBody') + '</p><p><code>' + esc(RAW + path) + '</code></p><p><code>' +
        esc(String(err && err.message ? err.message : err)) + '</code></p></div>';
      el.rail.innerHTML = '';
    });

    fetchUpdated(path).then(function (date) {
      if (currentPath === path && date) { setMeta(path, date); }
    });
  }

  function readQuery() {
    var params = new URLSearchParams(window.location.search);
    var l = params.get('lang');
    if (l === 'en' || l === 'zh') { lang = l; }
    var q = params.get('doc');
    return q && /\.md$/i.test(q) ? q : null;
  }

  if (el.filter) {
    el.filter.addEventListener('input', function () { applyFilter(el.filter.value); });
  }
  Array.prototype.forEach.call(el.lang, function (b) {
    b.addEventListener('click', function () {
      lang = b.getAttribute('data-learn-lang');
      setChrome();
      buildToc();
      if (currentPath) { navigate(currentPath, null, true); } else { showHub(true); }
    });
  });
  window.addEventListener('popstate', function () {
    var path = readQuery();
    setChrome();
    buildToc();
    if (path) { navigate(path, (window.location.hash || '').slice(1), true); } else { showHub(true); }
  });

  var initial = readQuery();
  setChrome();
  buildToc();
  if (initial) { navigate(initial, (window.location.hash || '').slice(1), true); } else { showHub(true); }
})();
