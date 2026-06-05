# Mac setup

## Copy these folders/files

Copy the project folder to your Mac, but skip generated/cache folders:

- keep: `src`
- keep: `public`
- keep: `figma`
- keep: `多个切图`
- keep: `package.json`
- keep: `package-lock.json`
- keep: `next.config.mjs`
- keep: `tailwind.config.ts`
- keep: `postcss.config.mjs`
- keep: `tsconfig.json`
- keep: `.eslintrc.json`
- keep: `start-mac.sh`

Do not copy:

- `node_modules`
- `.next`
- `.chrome-*`
- `.edge-profile`
- `preview-*.png`
- `next-dev*.log`

## Run on Mac

Install Node.js 20 LTS first, then in Terminal:

```bash
cd /path/to/po
chmod +x start-mac.sh
./start-mac.sh
```

Open:

```text
http://127.0.0.1:3003
http://127.0.0.1:3003/projects/b-system
```

## If you want production preview

```bash
npm install
npm run build
npm run start -- -H 127.0.0.1 -p 3003
```

## Notes

All portfolio images and MiSans/PingFang-related local assets are loaded from `public/assets` and the project files. Keep the Chinese folder names unchanged when copying.
