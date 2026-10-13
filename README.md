# LiJing 个人作品集 — 桌面端复刻

桌面 Web 复刻版本。按最终批注，成品不包含 Wall of Portfolios 的顶部平台导航和左侧作者资料栏，LiJing 的作品集本体铺满整个桌面视口；站点界面与可编辑文案均使用中文。

## 本地运行

```bash
npm install
npm run dev
```

默认地址：`http://127.0.0.1:5173/`

## 页面

- `/`
- `/works`
- `/aboutme`
- `/works/malargal-keatean`
- `/works/miora`
- `/works/pareidolia`
- `/works/yatra`
- `/works/cbepubliclibrary`

完整内容拆解见 `SITE_BREAKDOWN.md`，验收记录见 `design-qa.md`。

## 验证

```bash
npm run build
npm run test:sites
```

本项目仅实现桌面端；设计验收基准为 1440 × 900。

按照最终浏览器批注，Sidequests 导航与展示内容已移除；旧的 `/sidequests` 直达地址仅保留 Contact 与页脚。
