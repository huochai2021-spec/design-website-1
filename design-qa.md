# Desktop Design QA

## Scope

- Target viewport: 1440 × 900 desktop Web.
- Mobile and tablet are intentionally out of scope.
- User annotation applied: the Wall of Portfolios platform header and left profile sidebar are absent; the inner Priyanka portfolio fills the viewport.
- Source decomposition: `SITE_BREAKDOWN.md`.

## Visual review

| Area | Evidence | Result |
| --- | --- | --- |
| Full-screen home hero | `qa-home-standalone.png` | Passed |
| Home works/cards/about/contact | `qa-home-works.png`, `qa-home-cards.png`, `qa-home-about.png`, `qa-home-contact.png` | Passed |
| About interests + hover state | `qa-about-top.png`, `qa-about-interest.png` | Passed |
| Sidequests removal + preserved Contact | `qa-sidequests-contact-only.png` | Passed |
| Project detail title + cover | `qa-detail-standalone.png` | Passed |

The black/yellow/red palette, local display/body/handwritten fonts, scrapbook composition, polaroid framing, long-form case studies, card states and desktop spacing were checked in the browser at the target viewport.

## Route and content review

- All 9 application routes load directly with no broken images.
- Home: 15 images and 1 interactive audio player.
- Works: all 5 project cards link to their detail routes.
- About: 27 images, interest-star hover state, looping photography marquee, 3 Spotify embeds and resume PDF link.
- Sidequests navigation entry and showcase sections are absent. The direct `/sidequests` route retains the complete Contact section and footer.
- Each detail page renders a cover followed by its full 3319px-wide case-study composite.
- Malargal video loaded at 24.8 seconds; Miora video loaded at 211.33 seconds.

## Interaction review

- Works navigation and project-card clicks were exercised in the browser.
- Project chain verified: Malargal → Miora → Pareidolia → Yatra → Coimbatore Public Library.
- “Back to All Works” is present on every detail page.
- Contact navigation sets `#contact` and aligns the contact section with the viewport.
- About hover changes the interests section to its revealed state.
- Custom audio successfully played and paused from the UI.
- Native media controls, external contact links, Spotify embeds and resume link are present.
- Custom yellow cursor remains aligned after removal of the platform shell.

## Runtime review

- Browser console: no error-level entries during route traversal.
- `npm run build`: passed.
- `npm run test:sites`: 4/4 tests passed.
- Missing/broken image audit: 0 across all routes.

final result: passed
