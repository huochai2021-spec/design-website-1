# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

## Durable project decisions

- Implement and verify the desktop Web experience only. Mobile and tablet layouts are intentionally out of scope.
- Per the user's browser annotations, omit the outer Wall of Portfolios header and profile sidebar; LiJing's portfolio fills the desktop viewport.
- Order the top navigation as LiJing, 项目, 关于我, 联系.
- The site interface and editable HTML copy use Chinese, while all established font-family declarations remain unchanged. Original project names and text baked into media assets remain intact.
- The standalone About teaser collage and its “了解更多” hotspot are omitted from the home page; the full About page and its navigation entry remain available.
- The home hero uses the user-supplied LiJing portrait inside the taped Polaroid collage. Keep the subject in her original warm color, remove the original studio background so only the person remains against black, and do not restore the original Priyanka portrait.
- Keep the home-hero handwritten annotations and the home Works subtitle in their original English copy, even though the surrounding navigation and interface remain Chinese. Remove all white directional arrows from the home-hero annotations. Use a compact handwritten LiJing signature at the upper-right of the Polaroid so it does not cover the face.
- The yellow television in the home hero uses the user-supplied Shin-chan artwork, center-cropped around the main character inside the screen; preserve the original television shell and transparent outer canvas.
- Replace the home-hero car-plate sticker with the user-supplied crocheted-cat photo as a transparent-background cutout, positioned at the former plate location without overlapping the central portrait.
- Replace the home-hero shell with the supplied classical painting, preserving its gold frame and removing the surrounding wall; keep it as a small lower-left collage accent, and use a restrained additional 15° turn for all home-hero hover rotations.
- The first Works card is the 星投 AdPilot AI Agent UI/UX project. Use `public/assets/adpilot/40.png` for its cover and show `40.png` through `50.png` consecutively on its detail page, without inserting unrelated legacy case-study media.
- The second Works card is the 5E 广告投放管理 backend product-design project. Use `public/assets/5e-ad-management/51.png` for its cover and show `51.png` through `60.png` consecutively on its detail page, without inserting unrelated legacy case-study media.
- The third Works card is the 5E 对战平台 social-product UX project. Use `public/assets/5e-battle-platform/61.png` for its cover and show `61.png` through `73.png` consecutively on its detail page, without inserting unrelated legacy case-study media.
- Omit the Yatra and 哥印拜陀公共图书馆 projects from the Works grid and their detail routes.
- Show the three remaining project cards in a single centered vertical column, capped at 900px wide, on both the home page and the full Projects page.
- Keep each project category button exactly 40px below its description.
- In the home hero, keep the portrait and shell at their existing scale. Reduce the flowers, stamp, Spotify card, heart seal, television, camera, license plate, and audio player to the lighter reference proportions. Match the original collage with individually tilted resting states; every hero object and the audio player rotate a further 15 degrees on hover, while handwritten annotations have their own smaller hover turn.
- Keep the pink home-hero Spotify quote card compact and slightly right of the portrait (`left: 66%`, `width: 12%`) so it does not cover the person.
- Position the home-hero handwritten note “Something I’m passionate about!” immediately left of the camera, with a small clear gap before the camera body.
- The home-hero audio player uses the supplied `you-are-my-defense.m4a` file and reads its duration from audio metadata instead of a fixed timestamp.
- Omit the Sidequests navigation entry and all Sidequests showcase sections. Preserve the Contact section and footer on the direct `/sidequests` route.
- Omit the entire introductory hero screen from the About me page, including its filmstrip, title, copy, arrows, and hover prompt; start the page directly with the “我的兴趣” section.
- Omit the “我拍下的瞬间” photography marquee section from the About me page.
- The seven “My Interests” Polaroid frames use the seven latest user-supplied photographs in their supplied order. Fit each photo to the frame width with `object-fit: cover` and crop vertically as needed; group all frames toward the center, move the travel card right to clear the card behind it, place the paper-games card toward the upper right and the music card further left, and raise both lower cards. Use the same Bakbak One title font for “My Interests” and “On Repeat”; use English captions, in order: Entertainment, Exhibitions, Adventure, Cycling, Music!, Portraits, Cool Girl. Remove the former red hover-prompt star. Allow only light frame-edge overlap without obscuring photo content.
- On the About page, remove the handwritten note beneath the “On Repeat” heading while preserving three always-visible local music cards, each linking to a corresponding NetEase Cloud Music search, and omit the entire closing portrait/resume section.
- The “On Repeat” cards, in order, are 方大同的《特别的人》, 刘昊霖与 Kidult 的《Landing Guy》, and 五月天的《拥抱》.
- Keep a clear 46px vertical gap between the “On Repeat” heading and its three music cards.
- Use the English labels “Selected Work” (home) and “Works” (full index). The contact heading reads “Looking for a fresh perspective?” with the supporting sentence “I’m ready to bring my ideas and curiosity to your team.”
- Contact only shows the email `jlmsulrich@163.com` and a “电话/微信” row for `18701460361`; each row is a button that copies its value and briefly confirms “已复制 ✓”. Omit LinkedIn and Instagram.
- Use the user-supplied Dot Cursor behavior site-wide: a yellow head with a matching yellow canvas trail, an outlined enlarged state over controls, and no effect for touch or reduced-motion users.
- On the home Works section, omit the “查看更多” link and place a centered “Download Resume ↓” button beneath the project grid; it downloads the local `public/assets/resume/lijing-uiux-resume.pdf` file.
- All source imagery, GIFs, audio, video, and the resume PDF must be served locally; Spotify embeds may remain live integrations.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
