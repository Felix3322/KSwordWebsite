# KSword Website

静态官网文件，无框架。

## 结构

- `index.html` / `en/index.html`：首页，含实时 patch 时间线与核心功能。
- `changelog.html` / `en/changelog.html`：正式与预发行 Release 历史。
- `development.html` / `en/development.html`：main 分支开发快照。
- `hvm-topology.html` / `en/hvm-topology.html`：Nested HVM 拓扑变化演示（七步交互）。
- `learn/`：文档中心。一套信息架构同时收编官网自有页面与主仓库 `docs/`；
  markdown 直接读取 `KSwordDEV/KSword@main`，因此始终反映主线当前版本。
  - `learn/index.html`：三栏外壳（目录树 / 正文 / 本文内容）与文档中心首页。
  - `learn/learn.js`：目录清单、markdown 解析器、路由；无外部依赖。
  - `learn/learn.css`：文档中心样式。
- `docs/`：官网自有文档页（安装与开始使用、许可证、鸣谢、联系方式）。
- `styles.css`：直角、无阴影、无渐变的基础样式。
- `script.js` / `en/script.js`：截图滚动、按钮与键盘控制、实时 patch 拉取。

## 约定

所有页面共用同一块页眉：wordmark + 维护者卡片 + 七项主导航（首页 / 更新日志 /
开发快照 / HVM 拓扑 / 文档 / 语言 / GitHub），当前页用 `aria-current="page"` 标注。

LOGO 直接引用 KSword 根目录 README 顶部图片。
截图直接引用 KSword 英文与中文 README 中的原始 GitHub 图片资源。
更新日志基于当前可见 Release、相邻 tag/patch 的 Git diff，以及相关 PR/commit patch 综合整理；
main 分支的未发布变化单独记录在开发快照页面。
