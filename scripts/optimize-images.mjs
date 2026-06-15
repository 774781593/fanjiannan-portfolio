import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = path.join(root, "public", "assets");
const outputRoot = path.join(root, "public", "assets-optimized");
const manifestPath = path.join(root, "src", "lib", "asset-manifest.ts");
const supported = new Set([".png", ".jpg", ".jpeg"]);
const minSavingRatio = 0.92;
const webpQuality = 92;
const webpEffort = 4;
const minSourceSize = 24 * 1024;

async function listImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listImages(fullPath)));
      continue;
    }

    if (supported.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

function toPublicPath(filePath, baseRoot, extOverride) {
  const relative = path.relative(baseRoot, filePath).split(path.sep).join("/");
  const withExt = extOverride ? relative.replace(/\.[^.]+$/, extOverride) : relative;
  return `/assets/${withExt}`;
}

function toOptimizedFile(filePath) {
  const relative = path.relative(sourceRoot, filePath);
  return path.join(outputRoot, relative).replace(/\.[^.]+$/, ".webp");
}

await fs.mkdir(outputRoot, { recursive: true });

const manifest = {};
const images = await listImages(sourceRoot);
let generated = 0;
let originalBytes = 0;
let optimizedBytes = 0;

for (const image of images) {
  const stat = await fs.stat(image);
  if (stat.size < minSourceSize) {
    continue;
  }

  const target = toOptimizedFile(image);
  await fs.mkdir(path.dirname(target), { recursive: true });

  try {
    let shouldGenerate = true;
    try {
      const outputStat = await fs.stat(target);
      shouldGenerate = outputStat.mtimeMs < stat.mtimeMs;
    } catch {
      shouldGenerate = true;
    }

    if (shouldGenerate) {
      await sharp(image, { animated: true })
        .rotate()
        .webp({ quality: webpQuality, effort: webpEffort, smartSubsample: true })
        .toFile(target);
    }

    const outputStat = await fs.stat(target);
    if (outputStat.size >= stat.size * minSavingRatio) {
      await fs.rm(target, { force: true });
      continue;
    }

    const sourceUrl = toPublicPath(image, sourceRoot);
    const optimizedRelative = path.relative(outputRoot, target).split(path.sep).join("/");
    manifest[sourceUrl] = `/assets-optimized/${optimizedRelative}`;
    generated += 1;
    originalBytes += stat.size;
    optimizedBytes += outputStat.size;
  } catch (error) {
    console.warn(`Skipping ${image}: ${error.message}`);
  }
}

const manifestSource = `export const optimizedAssetMap: Record<string, string> = ${JSON.stringify(
  manifest,
  null,
  2
)};
`;

await fs.writeFile(manifestPath, manifestSource, "utf8");

const savedMb = ((originalBytes - optimizedBytes) / 1024 / 1024).toFixed(2);
console.log(
  `Generated ${generated} optimized images. Estimated transferred image savings: ${savedMb} MB.`
);
