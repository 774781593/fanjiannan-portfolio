import { optimizedAssetMap } from "./asset-manifest";

const assetVersion = process.env.NEXT_PUBLIC_ASSET_VERSION || "local";

export function assetUrl(src: string) {
  if (!src.startsWith("/assets/") || src.includes("?")) {
    return src;
  }

  const optimizedSrc = optimizedAssetMap[src] ?? src;

  return `${optimizedSrc}?v=${assetVersion}`;
}
