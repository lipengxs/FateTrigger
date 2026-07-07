import { access, copyFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const mediaDir = join(root, "public", "images", "media");
const heroDir = join(root, "public", "images", "hero");
const tilesDir = join(root, "public", "images", "tiles");

const youtubeAssets = [
  ["YoioapmsB-U", "official-trailer.jpg"],
  ["XfInajTQwbs", "closed-beta-trailer.jpg"],
  ["FwkM3ML_8aE", "gamescom-trailer.jpg"],
  ["NOIEXW5pYH4", "early-access-trailer.jpg"],
  ["Q_aFSJS7E6U", "cinematic-early-access-trailer.jpg"]
];

const tileAliases = [
  ["fate-trigger-hero.jpg", "official-trailer.jpg", heroDir],
  ["release.jpg", "gamescom-trailer.jpg", tilesDir],
  ["guides.jpg", "official-trailer.jpg", tilesDir],
  ["characters.jpg", "cinematic-early-access-trailer.jpg", tilesDir],
  ["weapons.jpg", "closed-beta-trailer.jpg", tilesDir],
  ["maps.jpg", "early-access-trailer.jpg", tilesDir],
  ["media.jpg", "official-trailer.jpg", tilesDir]
];

async function download(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "fatetriggerguide-media-fetcher/1.0" }
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return Buffer.from(await response.arrayBuffer());
}

async function saveVideoStill(videoId, fileName) {
  const targets = [
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  ];
  let lastError;

  for (const url of targets) {
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        const data = await download(url);
        if (data.length < 10000) throw new Error("downloaded file is unexpectedly small");
        await writeFile(join(mediaDir, fileName), data);
        console.log(`saved ${fileName} from ${url}`);
        return;
      } catch (error) {
        lastError = error;
        if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
      }
    }
  }

  try {
    await access(join(mediaDir, fileName));
    console.warn(`kept cached ${fileName}; latest download failed: ${lastError?.message || lastError}`);
    return;
  } catch {
    throw lastError;
  }
}

await mkdir(mediaDir, { recursive: true });
await mkdir(heroDir, { recursive: true });
await mkdir(tilesDir, { recursive: true });

for (const [videoId, fileName] of youtubeAssets) {
  await saveVideoStill(videoId, fileName);
}

for (const [destName, sourceName, dir] of tileAliases) {
  const source = join(mediaDir, sourceName);
  const dest = join(dir, destName);
  try {
    await access(source);
    await copyFile(source, dest);
    console.log(`linked ${destName} from ${sourceName}`);
  } catch (error) {
    console.warn(`skipped ${destName}: ${error?.message || error}`);
  }
}
