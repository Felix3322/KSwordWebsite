# KSword Website

静态官网文件，无框架。官网仓库为 `Felix3322/KSwordWebsite`，线上入口为 `https://ksword.dev/`。

最近内容核对：2026-10-13，对照 KSword `a996d38d` 已提交代码；运行包可能早于主线。

## 结构

- `index.html` / `en/index.html`：首页，含实时 patch 时间线与核心功能。
- `changelog.html` / `en/changelog.html`：正式与预发行 Release 历史。
- `development.html` / `en/development.html`：main 分支开发快照。
- `hvm-topology.html` / `en/hvm-topology.html`：Nested HVM 拓扑变化演示（七步交互）。
- `learn/`：文档中心。一套信息架构同时收编官网自有页面与主仓库 `docs/`；
  Markdown 直接读取 `KSwordDEV/KSword@main` 的文件内容；历史实验、设计和路线图仍需按原日期与证据范围解释。
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

## 检查与本地预览

在官网仓库根运行，无需安装依赖：

```powershell
node tools/check-site.mjs --source-root <KSword-checkout>
python tools/preview-site.py --source-root <KSword-checkout>
```

打开 `http://127.0.0.1:8765/`。可省略 `--source-root`，此时检查站内链接且文档仍读取线上 main。带本地源码预览时，只对本地 HTTP 响应切换 Markdown 来源，不改生产网页。

检查器验证所有 HTML 的资源与锚点、JS 语法、双语指南章节、首页静态/运行时文案一致性及文档中心的源码目标。浏览器验收还需检查语言入口、筛选、三栏导航、Markdown 表格、七步 HVM 交互和窄屏。

## 内容与发布

新增/改变主程序能力时，同步首页 HTML 和 `script.js` 的双语运行时文案；否则 JS 会把更新后的 HTML 覆盖为旧内容。文档中心目录集中在 `learn/learn.js`，站内文档按选择的语言跳转。主仓库详细技术内容直接引用，减少重复维护。

保存源码、合并和部署是不同状态。按既有静态网站托管流程发布，不能把源码提交成功当作线上更新成功。官网文档新引用的主仓库路径应先在 main 可用，再发布官网目录。
