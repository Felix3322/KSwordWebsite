# KSword Website

静态官网文件，无框架。官网仓库为 `Felix3322/KSwordWebsite`，线上入口为 `https://ksword.dev/`。

最近内容核对：2026-10-14，对照 KSword `a996d38d` 已提交代码；运行包可能早于主线。

## 结构

- `index.html` / `en/index.html`：首页，含实时 patch 时间线与核心功能。
- `changelog.html` / `en/changelog.html`：正式与预发行 Release 历史。
- `development.html` / `en/development.html`：简明功能介绍。
- `hvm-topology.html` / `en/hvm-topology.html`：Nested HVM 拓扑变化演示（七步交互）。
- `learn/`：文档中心。一套信息架构同时收编官网自有页面与主仓库 `docs/`；
  Markdown 直接读取 `KSwordDEV/KSword@main` 的文件内容；历史实验、设计和路线图仍需按原日期与证据范围解释。
  - `learn/index.html`：三栏外壳（目录树 / 正文 / 本文内容）与文档中心首页。
  - `learn/learn.js`：目录清单、markdown 解析器、路由；无外部依赖。
  - `learn/learn.css`：文档中心样式。
- `docs/`：官网自有文档页（安装与开始使用、许可证、鸣谢、联系方式）。
- `styles.css`：与主程序一致的浅灰表面、蓝色选中态、紧凑工具行和圆角内容面。
- `script.js` / `en/script.js`：截图切换、放大查看，以及展开开发动态后读取最近提交。产品文案直接保存在双语 HTML 中。
- `site-info.json`：源码基线、内容日期和资源版本，供维护与检查使用。

## 约定

所有页面共用同一块页眉：wordmark + 文档搜索 + 七项主导航（首页 / 更新日志 /
功能介绍 / HVM 拓扑 / 文档 / 语言 / GitHub），当前页用 `aria-current="page"` 标注。

应用图标与主程序保持一致；首页共 14 张真实主程序截图，按进程、内存与 PE、内核筛选；包括反汇编、Hex、内存区域、PE 节区、PDB 结构字段、性能历史、对象目录、符号链接与原子表。PDB 字段目录与现场内存数据分别说明，支持键盘切换与原尺寸查看。
更新日志基于当前可见 Release、相邻 tag/patch 的 Git diff，以及相关 PR/commit patch 综合整理；
版本变化记录在更新日志，功能介绍保持简洁；维护基线存于 site-info.json。

## 检查与本地预览

在官网仓库根运行，无需安装依赖：

```powershell
node tools/check-site.mjs --source-root <KSword-checkout>
python tools/preview-site.py --source-root <KSword-checkout>
```

打开 `http://127.0.0.1:8765/`。可省略 `--source-root`，此时检查站内链接且文档仍读取线上 main。带本地源码预览时，只对本地 HTTP 响应切换 Markdown 来源，不改生产网页。

检查器验证所有 HTML 的资源与锚点、JS 语法、双语指南章节、资源版本一致性及文档中心的源码目标。浏览器验收还需检查语言入口、筛选、三栏导航、Markdown 表格、七步 HVM 交互和窄屏。

## 内容与发布

新增/改变主程序能力时，同步中英文 HTML；JavaScript 不重写产品介绍。基线与资源版本在 `site-info.json` 维护。文档中心目录集中在 `learn/learn.js`，站内文档按选择的语言跳转。发布内容或共享样式更新时，同步 HTML 资源 URL 与英文脚本适配器的版本参数，防止缓存的旧脚本覆盖新正文。主仓库详细技术内容直接引用，减少重复维护。

保存源码、合并和部署是不同状态。按既有静态网站托管流程发布，不能把源码提交成功当作线上更新成功。官网文档新引用的主仓库路径应先在 main 可用，再发布官网目录。


## 短地址

以下路径使用独立 HTML 页和共享 `redirect.js`，显示目标地址并倒计时 3 秒后用 `location.replace` 跳转。支持立即前往、取消自动跳转；禁用 JS 时仍可点击原始链接。`?lang=en` / `?lang=zh` 指定语言，未指定时跟随浏览器语言。查询参数不会转发到外部目标。

| 路径 | 目标 |
| --- | --- |
| `/github` | `https://github.com/KSwordDEV/KSword` |
| `/npm` | `https://www.npmjs.com/package/ksword-mcp` |
| `/pip`、`/pypi` | `https://pypi.org/project/ksword-mcp/` |
| `/plugins` | `https://github.com/KSwordDEV/Plugins` |
| `/mcp` | `https://github.com/KSwordDEV/MCP` |
| `/download`、`/releases` | `https://github.com/KSwordDEV/KSword/releases` |
| `/issues` | `https://github.com/KSwordDEV/KSword/issues` |

每条路由保存为 `<route>/index.html`，由静态托管处理不带尾斜杠的地址。改目标时同时修改页面中的 canonical、目标地址和“立即前往”链接，再验证倒计时、取消与手动跳转。
