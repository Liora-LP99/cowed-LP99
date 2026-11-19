# LP99 · 甜玉米 应援站

田栩宁 × 梓渝 CP 应援站的静态站点，纯 HTML / CSS / JS，没有任何构建依赖。

## 本地预览

直接双击 `index.html` 就能看。想用本地服务器：

```bash
cd sweetcorn-site
python3 -m http.server 8080
```

然后打开 http://localhost:8080

## 目录结构

```
sweetcorn-site/
├── index.html            页面结构（所有文案、区块顺序都在这里）
└── assets/
    ├── css/style.css     全部样式：配色、渐变、响应式
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

## 变成 Git 仓库

当前机器没装 git，所以打包时没有 `.git`，但已经放好 `.gitignore`。
在 Mac 上解压后执行：

```bash
cd sweetcorn-site
git init
git add .
git commit -m "init: LP99 甜玉米应援站"
git remote add origin <你的仓库地址>
git push -u origin main
```

## 部署

- 线上地址：https://37knvsgxns9mg66t9lq.traesite.cn
- 站点 ID：`37knvsgxns9mg66t9lq`

### 沿用原站点更新（推荐）

1. 在 Trae 中打开解压后的 `sweetcorn-site` 目录，确认根目录下有 `index.html`。
2. 让助手部署时明确说明：**部署到已有站点，站点 ID 为 `37knvsgxns9mg66t9lq`**，不要新建站点。
3. 部署完成后打开原网址刷新，确认最新改动生效。域名保持不变，只会多一个版本。

### 新建站点（会换域名）

如果只说「部署」而不指定站点，工具通常会新建一个站点并分配新的子域名，原网址不会更新。

### 注意

- 部署是快照：本地改了不重新部署，线上不会变。
- 必须登录同一账号，才能看到并复用这个站点。
- 图片目前是网络外链；等你换成本地图片后，记得把 `assets/img` 一起部署。
