# LP99 · 甜玉米 应援站

田栩宁 × 梓渝 CP 应援站的静态站点，纯 HTML / CSS / JS，没有任何构建依赖。

## 本地预览

直接双击 `index.html` 就能看。想用本地服务器：

```bash
python3 -m http.server 8080
```

然后打开 http://localhost:8080

## 目录结构

```
。
├── index.html            页面结构（所有文案、区块顺序都在这里）
└── assets/
    ├── css/style.css     全部样式：配色、渐变、响应式
    ├── img/              成员写真等本地图片
    └── js/site.js        交互与视频配置（顶部 VIDEOS 数组）
```

## 常改的地方

| 想改什么 | 去哪里 |
| --- | --- |
| 成员写真 / 图集图片 | `index.html` 搜 `member__visual`、`gallery__item` |
| 视频 | `assets/js/site.js` 顶部的 `VIDEOS`，支持 mp4 地址、B 站 `bvid`、任意 iframe |
| 演出场次 | `index.html` 搜 `show-list`，复制一条 `<li>` 改日期与场馆 |
| 应援口号 | `index.html` 搜 `slogans` |
| 主题色 / 渐变 | `assets/css/style.css` 顶部 `:root` 变量 |

## Git 与远程仓库

仓库已初始化，远程已配置：GitHub（`origin`）、Gitee（`gitee`）。

```bash
git add -A
git commit -m "说明这次改了什么"
git push              # GitHub
git push gitee main   # Gitee
```

## 部署

- GitHub Pages（自动）：https://liora-lp99.github.io/cowed-LP99/ ，push 到 GitHub 后自动更新
- 原 Trae 站点（手动）：https://37knvsgxns9mg66t9lq.traesite.cn ，站点 ID `37knvsgxns9mg66t9lq`

### 沿用原站点更新（手动）

1. 在 Trae 中打开项目根目录，确认根目录下有 `index.html`。
2. 让助手部署时明确说明：**部署到已有站点，站点 ID 为 `37knvsgxns9mg66t9lq`**，不要新建站点。
3. 部署完成后打开原网址刷新，确认最新改动生效。域名保持不变，只会多一个版本。

### 新建站点（会换域名）

如果只说「部署」而不指定站点，工具通常会新建一个站点并分配新的子域名，原网址不会更新。

### 注意

- 部署是快照：本地改了不重新部署，线上不会变。
- 必须登录同一账号，才能看到并复用这个站点。
- 成员写真已改为本地图片（`assets/img`），部署时会随站点一起上传。
