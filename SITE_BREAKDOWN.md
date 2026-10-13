# Priyanka R 作品集网站：桌面端完整拆解

> 来源页面：`https://www.wallofportfolios.in/portfolios/priyanka-r/`
>
> 范围：仅桌面 Web。原页面由 Wall of Portfolios 外层站点和 `https://priyankaaa.framer.website/` 内嵌作品集两层组成。下文完整拆解两层来源结构；根据用户后续的浏览器批注，最终复刻移除外层顶栏与左侧资料栏，只保留并铺满内嵌作品集的全部页面、路由和交互。

> 最终范围补充：Sidequests 的来源内容仍保留在本拆解中供查阅，但成品已按批注移除 Sidequests 导航入口与全部展示段落；旧 `/sidequests` 地址只保留 Contact 和页脚。

## 1. 信息架构

### 外层：Wall of Portfolios

> 来源结构记录如下，但不进入最终成品。

- 顶部固定栏：Wall of Portfolios 标志、Search Roles、Submit Portfolio、Log in / Signup。
- 左侧固定作者档案：头像、Open to Work、Priyanka R、Communication Design Student、India、Less than 1 year、Experience Includes、The Madras Branding Company。
- 操作：Message、Bookmark、Profile、Portfolio；Portfolio 为当前激活页。
- 右侧主区域：嵌入 Priyanka 的作品集，拥有独立滚动。

### 内层：Priyanka R 作品集

| 路由 | 页面 | 主要去向 |
| --- | --- | --- |
| `/` | 首页 | Works、Sidequests、About me、Contact |
| `/works` | 全部作品 | 5 个作品详情 |
| `/sidequests` | 实验/副项目长页 | 原生视频、音频、GIF 与图片集 |
| `/aboutme` | 关于我 | 兴趣拼贴、摄影、Spotify、简历 |
| `/#contact` | 首页联系区 | Email、LinkedIn、Instagram、电话 |
| `/works/malargal-keatean` | Malargal keatean | 返回 Works、下一项 Miora |
| `/works/miora` | Miora | 返回 Works、下一项 Pareidolia |
| `/works/pareidolia` | Pareidolia | 返回 Works、下一项 Yatra |
| `/works/yatra` | Yatra | 返回 Works、下一项 Coimbatore Public Library |
| `/works/cbepubliclibrary` | Coimbatore Public Library | 返回 Works |

所有内层页面共享顶部导航：Works / Sidequests / Priyanka R / About me / Contact，并共享页尾版权。

## 2. 首页 `/`

### 首屏拼贴

- 黑色背景上的自由式 scrapbook / polaroid 拼贴。
- 中央人物照片，周围有鲜花、电视机、相机、贝壳、唱片/音乐卡、车牌、贴纸、箭头和手写注释。
- 注释文案：
  - Something made by me;)
  - Something we all need
  - Something said by my favorite artist
  - Something I love
  - Something I'm passionate about!
  - Something that makes me laugh
  - Something that needs travel
  - Something timeless…
  - Something pretty
- 一段 1:34 的音频，含播放/暂停、进度条和时间显示。

### My Works

标题为 “My Works”，副标题为 “A collection of ideas, experiments, and stories brought to life through design.”

四张两列卡片：

1. **Malargal keatean** — Publication。记录 Coimbatore 花市女性、茉莉编织、日常与传统的手工影像书。
2. **Miora** — Interaction Design。帮助父母保存、整理和回看孩子成长记忆的 app。
3. **Pareidolia** — Game Design。持续 50 天、把偶然污渍转化为想象机会的触觉创意游戏。
4. **Yatra** — Branding。强调日常旅程、舒适材料与可持续性的鞋履品牌。

交互：卡片默认黑底黄边，悬停时整卡填充亮黄、文字转黑；点击进入对应详情。

### About 摘要

- 拼贴人物视觉。
- “Hi, I'm Priyanka!”
- “A little too excited about everything!”
- 介绍：四年级 Communication Design 学生，热爱摄影、不断产生新想法。
- “Know more!” 点击进入 `/aboutme`。

### Contact

- “Looking for a fresh pair of eyes?”
- “I’d love to bring my ideas and curiosity to your team.”
- Email：`priyankarajalingam33@gmail.com`
- LinkedIn：`linkedin.com/priyankarajalingam`
- Instagram：`3amdesignz`
- Number：`9345265351`

交互：每一行悬停改变底色；Email 调起邮件客户端，LinkedIn 与 Instagram 打开外部页面。

## 3. Works `/works`

标题 “Works”，副标题与首页相同。包含首页的四项作品，另加：

5. **Coimbatore Public Library** — Environmental Graphics。通过趣味导视、标牌和环境图形重新设计图书馆导航体验。

每张卡片保留相同的黄边框悬停与详情跳转。

## 4. 五个作品详情页

详情页采用统一结构：固定导航 → 巨型黄字标题 → 描述 → 分类药丸 → 长篇视觉案例研究 → 返回/下一项目 → Contact → 页尾。

### Malargal keatean

- 分类：Publication。
- 内容：封面、The Starting Point、On Site Visit、花贩人物、Reflection、Flat Plan、手工书跨页与成品展示。
- 媒体：一段 0:24 原生视频，可播放、暂停、拖动、静音、全屏。
- 底部：`← Back to All Works`、`Miora →`。

### Miora

- 分类：Interaction Design。
- 内容：手机视觉、研究洞察、用户画像、用户旅程、品牌色、字体、图标、低保真线框、最终界面与手机 mockup。
- 媒体：一段 3:31 原生视频，具备标准视频控件。
- 底部：`← Back to All Works`、`Pareidolia →`。

### Pareidolia

- 分类：Game Design。
- 内容：概念、规则、材料实验、每日提示、游戏卡/包装与成品拍摄。
- 底部：`← Back to All Works`、`Yatra →`。

### Yatra

- 分类：Branding。
- 内容：品牌定位、标志、色彩/字体、材料与可持续性、鞋盒与应用 mockup。
- 底部：`← Back to All Works`、`Coimbatore Public Library →`。

### Coimbatore Public Library

- 分类：Environmental Graphics。
- 内容：图书馆现场、问题定义、研究、字体/色彩、导视系统、墙面与空间 mockup。
- 底部：仅 `← Back to All Works`，为作品链末页。

## 5. About me `/aboutme`

### Hero

- 复用首页风格的人像拼贴。
- 红色星形可悬停放大。
- 主文案同首页 About 摘要。
- Resume 按钮打开/下载 PDF 简历。

### What I’m into

多张 polaroid 拼贴，标签包括：Adventure、Photography、Travelling、Making stuff、Music!、Trying new food、Intense card games。

交互：红色星形悬停时会放大，并切换/隐藏部分拼贴照片，露出底层框架与标签。

### What I captured

横向连续摄影带，自动移动，展示街景、人物、自然与旅途影像。

### What’s on repeat

三个可操作 Spotify 播放卡：

- Imagine - Remastered 2010 — John Lennon
- Ey Sandakaara — Dhee, Santhosh Narayanan, Vivek
- Stop The Wedding! — Ashe

### 收尾

巨幅人物/皇冠视觉，文案：“I guess all these little things are what make me, me.”

## 6. Sidequests `/sidequests`

这是约 7,527px 高的桌面长页，按实验类型串联图像、GIF、音频和视频。

主要分组与页面内文案：

- Mixed Media — “something fun!”、“favourite tragedy”
- Poster Dump — “A little bit of everything”
- Digi Sketchbook — “Randoms!”、“my texture library”、“wanted to say these:)”、“characters i like”、“people i meet”、“few of my best works!”、“love the lyrics”、“had so much fun making this with my friends!”
- Motion Graphics
- 引语：“A jack of all trades is a mater of none, but oftentimes better than a master of one.”
- A film I made
- 一段 1:34 音频 — “this is what i strive for!”
- Randoms! — Blender、photography club、书封、coding、interactive system、projection mapping、5,500 sqft mural 等实验。

媒体规模：

- 36 张已加载图片/GIF。
- 13 个 MP4，其中 11 个显示原生控制栏，2 个为静音循环展示。
- 1 个 MP3，使用与首页一致的自定义音频控件。
- 所有视频都可独立播放/暂停、拖动进度、调节音量；循环视频保持 loop 行为。

## 7. 全局交互

- 自定义亮黄色圆形光标随鼠标移动。
- 导航点击为单页应用式切页，切页后回到顶部。
- Contact 导航滚动/跳转至首页联系区。
- 作品卡与联系行均有显著 hover 状态。
- About 中央胶片 hover/focus 时切换为人物黄色描边与红黄涂鸦版本；红色星形仅作为 Hover 提示。
- 原生视频/音频保留键盘和指针操作。
- Spotify 嵌入保留其自身播放与跳转。
- 简历 PDF 可打开并下载。

## 8. 视觉系统

- 背景：近纯黑 `#000000`。
- 主强调色：亮黄约 `#F4E54C`。
- 正文：暖白；注释/星形：红色。
- 标题：Bakbak One / 粗重展示体；正文与导航：DM Sans；手写注释：Nanum Brush Script。
- 构图：自由拼贴、旋转 polaroid、贴纸、手绘箭头、不规则留白。
- 卡片：大圆角、1–2px 黄描边、黑/黄反转 hover。
- 桌面基准视口：1440 × 900；本任务不实现移动端。

## 9. 复刻验收清单

- [x] 按批注移除外层 Wall of Portfolios 顶栏与左侧资料栏。
- [x] 内层 9 个路由全部可直接访问与互相跳转。
- [x] 首页四卡与 Works 五卡均可 hover/click。
- [x] 五个详情页案例研究完整，下一项目链无断点。
- [x] Malargal、Miora 视频可播放。
- [x] Sidequests 导航与展示内容已移除，直达地址仍保留 Contact 与页脚。
- [x] About 拼贴、星形 hover、摄影带、Spotify、Resume 可用。
- [x] Contact 内外链正确。
- [x] 桌面端在 1440 × 900 下完成视觉对照与交互 QA。
