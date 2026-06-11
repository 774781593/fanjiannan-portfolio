# Portfolio Project Handoff

Last updated: 2026-06-11 00:00 +08:00

This document is for continuing the same portfolio implementation in a new Codex account, new chat, or new folder without re-explaining the whole context.

## Project Goal

Build the user's Figma portfolio design as a runnable website.

Tech stack:

- Next.js
- React
- Tailwind CSS
- Framer Motion can be used later for animation, but visual restoration comes first.

Core rules from the user:

- Do not redesign.
- Do not optimize or invent layout.
- Do not change spacing, font size, color, blank space, layer order, radius, opacity, or material choices unless Figma says so.
- Do not replace assets unless Figma/source assets require it.
- Do not make the portfolio into a long-image website.
- Prioritize Figma source structure over screenshots.

## Workspace

Current project root:

```text
F:\po
```

Main local pages:

```text
http://127.0.0.1:3003/
http://127.0.0.1:3003/projects/b-system
http://127.0.0.1:3003/projects/app-design
http://127.0.0.1:3003/projects/web-design
http://127.0.0.1:3003/projects/dashboard
http://127.0.0.1:3003/projects/c4d-practice
http://127.0.0.1:3003/projects/graphic
```

Run/build:

```bash
npm run build
npm run start -- -H 127.0.0.1 -p 3003
```

Shortcut script:

```text
F:\po\start-production-preview.cmd
```

The script has been updated so it does not instantly close on failure. It checks for `.next\BUILD_ID`, builds if needed, starts port `3003`, and pauses when the server stops or fails.

## Figma Source

Figma file:

```text
https://www.figma.com/design/foBs8jZMuCUzvnw4pCX0Ue/2025Portflio-gogogo?node-id=0-1&m=dev
```

Important instruction:

- Do not rely on Figma selection. The MCP cannot reliably read the user's current selection.
- Instead, traverse Page 1 nodes, list all Frames, identify target Frames by name, size, content, and layer hierarchy, then use the target `node-id`.
- Only ask the user to choose if multiple Frames cannot be distinguished.

Known top-level Page 1 Frames:

```text
119:203  name 10   1920x1080
80:3484  name 9    1920x9833
80:3231  name 8    1920x6775
193:4031 name 7    1920x12492
80:3356  name 6    1920x8916
185:193  name 5.5  1920x11725
249:383  name 5    1920x1080
193:3925 name 4    1920x9605
80:1885  name 3    1920x8932
256:147  name 2.5  1920x6479
80:3049  name 2    1920x9211
189:3316 name 1    1920x3240
```

Current key target Frames:

```text
189:3316 = home page
80:3049  = B-system page
80:1885  = web-design / SOTHIS page
193:3925 = web-design / Xinxin official website page
185:193  = app-design page group
193:4031 = dashboard / large-screen design page
80:3231  = C4D practice page
80:3484  = graphic design page
```

When using Figma MCP:

- Use `get_metadata` for page/frame discovery when output is small.
- Use `use_figma` with `skillNames: "figma-use"` for lightweight traversal if metadata times out.
- Use `get_design_context` on the exact Frame id after identifying it.

## Key Files

```text
F:\po\src\components\LayeredProjectPage.tsx
F:\po\src\components\CarouselSwiper.tsx
F:\po\src\app\globals.css
F:\po\src\app\page.tsx
F:\po\src\data\projects.ts
F:\po\start-production-preview.cmd
```

Assets and fonts:

```text
F:\po\多个切图
F:\po\public\assets\slices
F:\po\public\assets\fonts\MiSans\MiSansVF.ttf
F:\po\public\assets\fonts\PingFangSC
F:\po\public\assets\fonts\Druk
```

## Fonts

Important user instruction:

- Figma uses MiSans Variable.
- `@font-face` for MiSans must use `font-weight: 100 900`.
- Do not convert Figma weights such as `305` into `300`, `400`, or `normal`.
- Preserve numeric weights like `305`, `330`, `380`, `450`, `520`, `630` when Figma reports them.

Current `globals.css` includes:

```css
@font-face {
  font-family: "MiSans";
  src: url("/assets/fonts/MiSans/MiSansVF.ttf") format("truetype");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

`Druk Wide` was also changed to `font-weight: 100 900`.

## Current Implementation Status

### Home

The home page is implemented in:

```text
F:\po\src\app\page.tsx
```

It uses cut images and text layers. The user repeatedly corrected positioning, especially:

- Hero background should use the user's cut background.
- The three text cuts on the home hero must align to the Figma layout.
- Top label aligns with the big `Portfolio` left edge.
- Welcome text aligns vertically inside the blue input/frame area.

### B-System

The B-system detail page is implemented in:

```text
F:\po\src\components\LayeredProjectPage.tsx
```

Important fixes already done:

- Requirement cards and avatar stack were adjusted.
- Avatar stack should overlap left-to-right, with the left avatar visually on top.
- Requirement cards should be one row where Figma shows one row.
- Design objective section had title/text restored.
- Architecture arrow was restored with the source asset.
- Design specification color table is code-generated, not a bitmap.
- User explicitly said the color table should not be image/cutout.
- Component library area uses source cut assets where requested.

Design specification table:

- Implemented as `BSystemSpecTable`.
- Uses SVG rects for color blocks and HTML text.
- This avoids seams and avoids using a bitmap.
- Do not replace this table with an image unless the user explicitly asks.

### App Design

The app-design page is in:

```text
F:\po\src\components\LayeredProjectPage.tsx
F:\po\src\components\CarouselSwiper.tsx
```

The bottom three app screenshots were converted into a carousel/swiper:

- Current slide centered and clear.
- Left/right slides visible at the sides with lower opacity.
- Prev/next buttons are present.
- Drag support is present.
- Transition time is around 240ms.
- Dark side overlays are shown during transition and use `pointer-events: none`.

User later asked:

- Carousel container height should be reduced.
- Empty bottom area under the carousel should be removed.
- `THANKS` should sit close under the image.

This was partially handled in the app frame height/position logic. Recheck visually if continuing.

### Web Design

The web-design page uses two Figma source Frames:

```text
80:1885  = SOTHIS page
193:3925 = Xinxin official website page
```

Recent corrections:

- Used Figma source traversal instead of selection.
- Read text metadata for both Frames.
- Adjusted web-design text weights/families based on Figma:
  - Frame `80:1885` uses MiSans weights like `330`, `520`, `630`, and Druk Wide `700`.
  - Frame `193:3925` uses PingFang SC and Helvetica mostly at `400`.
- Added white borders/radius to web-design screenshot layers where Figma source showed them.

Known Figma text details from traversal:

Frame `80:1885`:

```text
网页设计: MiSans Semibold, 150px, weight 520
公司S20网页设计: MiSans Semibold, 24px, weight 520
信芯网页设计: MiSans Semibold, 24px, weight 520
根据用户需求采用商务风格进行设计: MiSans Regular, 24px, weight 330
为公司产品S20提供后台支持: MiSans Regular, 24px, weight 330
SOTHIS S20: Druk Wide Bold, 96px, weight 700
页面原型、UI设计制作: MiSans Regular, 32px, weight 330
苹方: MiSans Bold, 128px, weight 630
PingFang Sans: MiSans Regular, 32px, weight 330
页面展示: MiSans Bold, 48px, weight 630
THANKS: MiSans, 48px, weight 380
```

Frame `193:3925`:

```text
DESIGN: Helvetica Regular, 18px, weight 400
2021: Helvetica Regular, 18px, weight 400
主中文文案: PingFang SC Regular, 30px, weight 400
创'芯引领 / 智慧生活: PingFang SC Regular, 76px, weight 400, color #c5cdfb
FONT: Helvetica Regular, 48px, weight 400
中文字体— / 苹方 / 中文说明: PingFang SC Regular, weight 400
英文字体— / DIN / 英文说明: PingFang SC, weight 400
Aa: Helvetica Regular, weight 400
DESGIN: PingFang SC Medium in source metadata but reported weight 400
首页展示 / 新闻中心 / 关于信芯: PingFang SC Regular, 48px, weight 400
HOME PAGE DISPLAY / NEWS CENTER / ABOUT XINXIN: PingFang SC, 24px, weight 400
```

### Dashboard / Large Screen

The dashboard page is implemented in:

```text
F:\po\src\components\LayeredProjectPage.tsx
```

Figma source Frame:

```text
193:4031 = dashboard / large-screen design page
```

Recent corrections:

- Header frame/selection box and central title alignment were adjusted from Figma source.
- The middle title must align to the Figma frame relationship, not just viewport visual center.
- Text blocks such as 制作背景 and 产品目标 were corrected toward Figma source typography and alignment.
- The product objective icon is an arrow, not a plus sign.
- Use Figma metadata/source hierarchy for any further corrections.

### C4D Practice

The C4D page is implemented in:

```text
F:\po\src\components\LayeredProjectPage.tsx
```

Figma source Frame:

```text
80:3231 = C4D practice page
```

Recent corrections:

- Detail display image/circle overlay positions were adjusted against the source.
- The wrong white square behind the detail composition was removed.
- Continue checking source layer hierarchy, image clipping, circle masks, and shadow styles if the user points out more differences.

### Graphic Design

The graphic page is implemented in:

```text
F:\po\src\components\LayeredProjectPage.tsx
```

Figma source Frame:

```text
80:3484 = graphic design page
119:203 = thanks page, not part of graphic
```

Important user correction:

- `感谢观看` / thanks content does not belong to the graphic page.

Recent corrections:

- The graphic page was rebuilt from source Frame `80:3484`.
- Text, image, color-dot, and poster sections are defined as layered HTML/image entries rather than a single long bitmap.
- Figma shows the graphic text line height as automatic. In code, the `graphicFrames` text entries should not carry explicit `lineHeight`; omit it so `TextLayerView` renders `lineHeight: "normal"`.
- Do not reintroduce `lineHeight: 20.011`, `24.013`, `32.018`, `48.026`, or `150.083` in `graphicFrames` unless Figma source explicitly changes away from automatic.

## Build and Runtime Notes

`npm run build` passes.

Known warnings:

- Next.js warns about `<img>` usage in several files. This is not currently treated as a blocker.

Recent runtime issue:

- The browser showed:

```text
Application error: a client-side exception has occurred...
ChunkLoadError: Loading chunk 419 failed
```

Cause:

- Browser was requesting an old `_next` chunk:

```text
page-f01d3de395148177.js
```

Current build created:

```text
page-b9b7949a2344a49f.js
```

Temporary compatibility fix applied:

- Copied the current chunk to the old requested name under:

```text
F:\po\.next\static\chunks\app\projects\[slug]\
```

If the same ChunkLoadError appears again:

1. Check the missing chunk filename in browser console.
2. Check current files in:

```text
F:\po\.next\static\chunks\app\projects\[slug]\
```

3. Rebuild and restart preview.
4. Hard refresh browser.
5. If needed, copy current page chunk to the old missing chunk filename as a temporary local preview compatibility fix.

## User Preferences

The user cares strongly about pixel-level alignment and will point out visual differences directly.

Important:

- Do not argue from screenshots if Figma source is available.
- Do not create fake content.
- Do not add decorative elements.
- Do not silently replace source materials.
- Do not build unless the user asks to build or needs to preview.
- When the user says "构建", run build and restart preview.
- Browser blue dashed outlines/blue comment markers are browser comment selection overlays, not design elements.

## Suggested Continuation Workflow

1. Read this file.
2. Run:

```bash
git status --short
```

3. If using Figma, traverse Page 1 Frames rather than selection.
4. Identify target Frame by name, size, and content.
5. Use `get_design_context` or lightweight Figma API traversal for exact source styles.
6. Make small scoped edits in `LayeredProjectPage.tsx`, `page.tsx`, or `globals.css`.
7. Build only when the user asks or when preview is needed:

```bash
npm run build
```

8. Restart preview:

```text
F:\po\start-production-preview.cmd
```

9. Reopen/hard-refresh:

```text
http://127.0.0.1:3003/projects/web-design
```

## Copy-Paste Prompt for a New Account

```text
You are continuing a local Next.js portfolio project in F:\po.

Read F:\po\HANDOFF.md first.

The user wants strict Figma source restoration, not redesign. Do not rely on Figma selection; traverse Page 1 Frames and identify target Frames by name, size, content, and hierarchy.

Figma file:
https://www.figma.com/design/foBs8jZMuCUzvnw4pCX0Ue/2025Portflio-gogogo?node-id=0-1&m=dev

Known key Frames:
189:3316 = home
80:3049 = B-system
80:1885 = web-design / SOTHIS
193:3925 = web-design / Xinxin official website
185:193 = app-design

Main files:
F:\po\src\components\LayeredProjectPage.tsx
F:\po\src\components\CarouselSwiper.tsx
F:\po\src\app\globals.css
F:\po\src\app\page.tsx
F:\po\src\data\projects.ts

MiSans Variable is loaded from:
F:\po\public\assets\fonts\MiSans\MiSansVF.ttf

Preserve Figma numeric font weights such as 305, 330, 380, 450, 520, 630. Do not normalize them to 300/400/normal.

Build command:
npm run build

Preview:
F:\po\start-production-preview.cmd
http://127.0.0.1:3003/
```
