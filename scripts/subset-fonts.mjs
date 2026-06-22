import fs from "node:fs/promises";
import path from "node:path";
import subsetFont from "subset-font";

const root = process.cwd();
const sourceFont = path.join(root, "public", "assets", "fonts", "MiSans", "MiSansVF.ttf");
const outputFont = path.join(root, "public", "assets", "fonts", "MiSans", "MiSansVF-subset.woff2");
const scanRoots = ["src", "public/_headers"];
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt"
]);

const fallbackText = `
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
0123456789
~!@#$%^&*()_+-=[]{}|;:'",.<>/?\\
，。！？、；：“”‘’（）《》【】—…·
空格首页作品集关于我设计项目端后台网页大屏练习平面移动应用系统管理数据可视化用户体验视觉交互
`;

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if ([".git", ".next", "node_modules", "out", ".deploy-static"].includes(entry.name)) continue;
      yield* walk(absolute);
    } else if (textExtensions.has(path.extname(entry.name).toLowerCase())) {
      yield absolute;
    }
  }
}

function collectVisibleCharacters(text) {
  const chars = new Set();
  for (const char of text) {
    if (char === "\r" || char === "\n" || char === "\t") {
      chars.add(" ");
      continue;
    }
    if (char >= " ") chars.add(char);
  }
  return chars;
}

const characters = collectVisibleCharacters(fallbackText);

for (const relativeRoot of scanRoots) {
  const absoluteRoot = path.join(root, relativeRoot);
  try {
    const stat = await fs.stat(absoluteRoot);
    if (stat.isDirectory()) {
      for await (const file of walk(absoluteRoot)) {
        const text = await fs.readFile(file, "utf8");
        for (const char of collectVisibleCharacters(text)) characters.add(char);
      }
    } else {
      const text = await fs.readFile(absoluteRoot, "utf8");
      for (const char of collectVisibleCharacters(text)) characters.add(char);
    }
  } catch {
    // Optional scan source.
  }
}

const text = [...characters].join("");
const source = await fs.readFile(sourceFont);
const subset = await subsetFont(source, text, {
  targetFormat: "woff2",
  preserveNameIds: [1, 2, 4, 6],
  noLayoutClosure: false
});

await fs.writeFile(outputFont, subset);

const sourceKb = source.length / 1024;
const subsetKb = subset.length / 1024;
const savings = 100 - (subset.length / source.length) * 100;

console.log(`MiSans subset characters: ${characters.size}`);
console.log(`MiSans source: ${sourceKb.toFixed(1)} KB`);
console.log(`MiSans subset: ${subsetKb.toFixed(1)} KB`);
console.log(`Estimated savings: ${savings.toFixed(1)}%`);
