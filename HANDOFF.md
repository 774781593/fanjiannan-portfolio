# FanJiannan Portfolio Handoff

Last updated: 2026-06-16 14:00 +08:00

This document is for continuing, maintaining, or redeploying the portfolio website in `F:\po`.

## Current Status

The portfolio is implemented, optimized, committed, and deployed.

Main repository:

```text
https://github.com/774781593/fanjiannan-portfolio
```

Important branches:

```text
master  = source code
deploy  = static Cloudflare Pages build output
```

Latest known commits:

```text
master: 9538db9 Limit detail page motion
deploy: 9122a87 Deploy limited detail motion
```

Production hosting:

```text
Cloudflare Pages project: fanjiannan-portfolio
Pages default URL: https://fanjiannan-portfolio.pages.dev
Custom domain being configured: fanjiannan.com
```

Cloudflare custom domain state may take time to propagate after DNS/name server changes.

## Project Root

```text
F:\po
```

Core pages:

```text
/
/projects/b-system
/projects/web-design
/projects/app-design
/projects/dashboard
/projects/c4d-practice
/projects/graphic
```

Local preview URL, when server is running:

```text
http://127.0.0.1:3003/
```

Preview scripts:

```text
F:\po\start-preview.cmd
F:\po\start-network-preview.cmd
F:\po\start-production-preview.cmd
```

## Tech Stack

```text
Next.js 15
React 19
Tailwind CSS
Framer Motion
Static export for Cloudflare Pages
```

Useful commands:

```bash
npm run build
npm run build:cloudflare
npm run deploy:cloudflare
npm run dev
npm run start
```

`npm run build:cloudflare` runs the image optimizer first, then builds static output into `out`.

## Key Files

```text
src/app/page.tsx
src/app/layout.tsx
src/app/globals.css
src/app/projects/[slug]/page.tsx
src/components/LayeredProjectPage.tsx
src/components/PortfolioMotion.tsx
src/components/CarouselSwiper.tsx
src/components/SiteNav.tsx
src/lib/assets.ts
src/lib/asset-manifest.ts
scripts/optimize-images.mjs
scripts/build-static.mjs
```

Important asset folders:

```text
public/assets
public/assets-optimized
public/_headers
多个切图
figma
```

Do not delete `public`, `src`, `scripts`, `多个切图`, or `figma` unless the user explicitly asks.

## Design Rules

The user wants the website to match the Figma source, not a redesign.

Strict rules:

- Do not add new content or modules unless explicitly asked.
- Do not invent layout.
- Do not change source order.
- Do not replace images unless fixing a missing/broken asset.
- Do not rely on screenshots when Figma source is available.
- Preserve the existing visual design and only adjust implementation.
- Keep image aspect ratios. Do not stretch, crop, or cover images accidentally.
- For Figma typography, preserve numeric weights such as `305`, `330`, `380`, `520`, and `630`.

Figma source:

```text
https://www.figma.com/design/foBs8jZMuCUzvnw4pCX0Ue/2025Portflio-gogogo?node-id=0-1&m=dev
```

Known Figma frame mapping:

```text
189:3316 = home
80:3049  = B-system
80:1885  = web-design / SOTHIS
193:3925 = web-design / Xinxin official website
185:193  = app-design
193:4031 = dashboard / large-screen
80:3231  = C4D practice
80:3484  = graphic design
119:203  = thanks page
```

## Current Motion Behavior

The global motion system is in:

```text
src/components/PortfolioMotion.tsx
src/app/globals.css
```

Project detail pages are mostly rendered by:

```text
src/components/LayeredProjectPage.tsx
```

Current motion rules:

- Home page keeps portfolio-style motion.
- Project opening screens keep the same selection-frame intro motion.
- `dashboard`, `c4d-practice`, and `graphic` keep motion only in the opening/hero area.
- In those three pages, content after the first 1080px is static.
- This was intentional per user request because later detail sections felt too animated.

Implementation detail:

```ts
const staticAfterHeroSlugs = new Set(["dashboard", "c4d-practice", "graphic"]);
```

Do not remove this unless the user wants those detail-section animations back.

## Image Optimization

The site has a custom WebP optimization flow.

Scripts:

```text
scripts/optimize-images.mjs
scripts/build-static.mjs
```

Generated optimized images:

```text
public/assets-optimized
```

Mapping file:

```text
src/lib/asset-manifest.ts
```

Runtime asset resolver:

```text
src/lib/assets.ts
```

The build currently reports about:

```text
Generated 104 optimized images.
Estimated transferred image savings: about 251 MB.
```

Keep source image quality. Do not lower quality aggressively unless the user asks.

## Deployment Workflow

Source branch:

```bash
git add <changed files>
git commit -m "Message"
git push origin master
```

One-command deploy helper:

```bash
npm run deploy:cloudflare
```

Static build:

```bash
npm run build:cloudflare
```

Deploy branch lives in a local worktree:

```text
F:\po\.deploy-static
```

Sync `out` into `.deploy-static`, preserving `.git`:

```powershell
$src=(Resolve-Path -LiteralPath 'F:\po\out').Path
$dst=(Resolve-Path -LiteralPath 'F:\po\.deploy-static').Path
robocopy $src $dst /MIR /XD .git /XF .git /NFL /NDL /NJH /NJS /NP
```

Then:

```bash
git -C F:\po\.deploy-static add -A
git -C F:\po\.deploy-static commit -m "Deploy message"
git -C F:\po\.deploy-static push origin deploy
```

GitHub access on this machine may need Clash proxy:

```text
127.0.0.1:7897
```

Working push command that succeeded:

```bash
git -c safe.directory=F:/po/.deploy-static -c http.proxy=http://127.0.0.1:7897 -c https.proxy=http://127.0.0.1:7897 push origin deploy
```

For `master`, this also works:

```bash
git -c http.proxy=http://127.0.0.1:7897 -c https.proxy=http://127.0.0.1:7897 push origin master
```

## Domain and DNS Notes

Domains involved:

```text
fanjiannan.com  bought on Spaceship
fanjiannan.cn   bought on Tencent Cloud, may require real-name/approval
```

Cloudflare assigned name servers for `fanjiannan.com`:

```text
justin.ns.cloudflare.com
lucy.ns.cloudflare.com
```

Spaceship should use those two custom name servers and remove old Spaceship name servers:

```text
launch1.spaceship.net
launch2.spaceship.net
```

Cloudflare Pages custom domain flow:

```text
Workers & Pages -> fanjiannan-portfolio -> Custom domains -> fanjiannan.com
```

If Cloudflare says "Initializing" or "Waiting for nameservers", wait for DNS propagation. This can take minutes to 48 hours.

## Cache and Disk Cleanup

Safe project-local cleanup targets:

```text
.next
out
portfolio-edgeone-out.zip
portfolio-edgeone-upload.zip
.chrome-cloudflare-profile-copy*
```

Usually keep:

```text
node_modules
public
src
scripts
多个切图
figma
.deploy-static
.chrome-cloudflare
```

`.deploy-static` is needed for deployment.

`.chrome-cloudflare` may contain browser login state for Cloudflare.

Codex may create large temporary runtime caches under a mojibake user folder:

```text
C:\Users\瀛熷洯\AppData\Local\OpenAI\Codex\runtimes\cua_node\.staging-*
```

These are Codex runtime staging caches, not portfolio files. They can be deleted after checking the path carefully.

PowerShell cleanup pattern:

```powershell
$base='C:\Users\瀛熷洯\AppData\Local\OpenAI\Codex\runtimes\cua_node'
$resolvedBase=(Resolve-Path -LiteralPath $base).Path
$targets=Get-ChildItem -LiteralPath $resolvedBase -Force -Directory -Filter '.staging-*'
foreach($target in $targets){
  $resolvedTarget=(Resolve-Path -LiteralPath $target.FullName).Path
  if(-not $resolvedTarget.StartsWith($resolvedBase,[System.StringComparison]::OrdinalIgnoreCase)){
    throw "Refusing to delete outside base: $resolvedTarget"
  }
  Remove-Item -LiteralPath $resolvedTarget -Recurse -Force
}
```

## Known Warnings

`npm run build` shows Next.js warnings about raw `<img>` usage. These are not current blockers because the project intentionally uses absolute positioned image layers and a custom optimization manifest.

Do not rewrite the whole image system to `next/image` unless specifically planned and tested, because it may alter layout.

## Common Problems

### GitHub Push Fails

If direct GitHub push fails:

```text
Failed to connect to github.com port 443
```

Use the Clash proxy:

```bash
git -c http.proxy=http://127.0.0.1:7897 -c https.proxy=http://127.0.0.1:7897 push origin master
```

For `.deploy-static`, also add:

```bash
-c safe.directory=F:/po/.deploy-static
```

### Remote Deploy Branch Rejects Push

If `deploy` rejects because remote has different history, fetch first and inspect.

The deploy branch is a static build artifact branch, so `--force-with-lease` may be appropriate after confirming the remote branch only contains old build output.

Previously used:

```bash
git -c safe.directory=F:/po/.deploy-static -c http.proxy=http://127.0.0.1:7897 -c https.proxy=http://127.0.0.1:7897 push --force-with-lease origin deploy
```

### Images Missing Online

Check:

```text
public/assets
public/assets-optimized
src/lib/asset-manifest.ts
out/assets
out/assets-optimized
```

Then rebuild:

```bash
npm run build:cloudflare
```

Commit and push `deploy` again.

## Last Completed User Request

The latest user request was to remove animations from:

- dashboard detail content after the opening screen
- C4D detail content after the opening screen
- graphic detail content after the opening screen

This is done and deployed.

## New Session Starter Prompt

Use this if continuing in a fresh Codex chat:

```text
Read F:\po\HANDOFF.md first.

This is a Next.js portfolio site in F:\po. The user wants strict Figma-source fidelity, not redesign. Source branch is master. Static deployment branch is deploy in F:\po\.deploy-static. Cloudflare Pages deploys from deploy. GitHub may need proxy 127.0.0.1:7897.

Main file for project detail pages:
F:\po\src\components\LayeredProjectPage.tsx

Run build:
npm run build

Run static build:
npm run build:cloudflare
```
