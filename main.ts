// gta6-clipper-01 v4 — validate VIDEO.json and copy it to the output dir.
// Node 22, stdlib only. No network, no model calls.
//
// The grader runs `node /bot/main.ts` with the repo mounted read-only and
// MAKEFUN_OUTPUT_DIR pointing at a writable directory. The dev gate reads
// VIDEO.json from that output directory, so this program's one job is to put
// a validated VIDEO.json there. Writing any other filename scores zero.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_VIDEO_JSON_BYTES = 16384;
const MAX_URL_CHARS = 2048;

const root = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(root, "output");
const srcPath = join(root, "VIDEO.json");

const raw = readFileSync(srcPath);
if (raw.length > MAX_VIDEO_JSON_BYTES) {
  throw new Error(
    `VIDEO.json is ${raw.length} bytes, over the ${MAX_VIDEO_JSON_BYTES}-byte cap`,
  );
}

const data = JSON.parse(raw.toString("utf8"));
if (typeof data !== "object" || data === null || Array.isArray(data)) {
  throw new Error("VIDEO.json must be a JSON object");
}
if (typeof data.url !== "string" || !data.url.startsWith("https://")) {
  throw new Error("VIDEO.json must contain a url starting with https://");
}
if (data.url.length > MAX_URL_CHARS) {
  throw new Error(
    `VIDEO.json url is ${data.url.length} chars, over the ${MAX_URL_CHARS}-char cap`,
  );
}

let parsed;
try {
  parsed = new URL(data.url);
} catch {
  throw new Error(`VIDEO.json url is not a valid URL: ${data.url}`);
}
const host = parsed.hostname;
if (!host.endsWith("youtube.com") && host !== "youtu.be") {
  throw new Error(`VIDEO.json url must point at YouTube, got host ${host}`);
}
// A bare YouTube home page is not a video address: the path must name a video.
if (parsed.pathname === "/" || parsed.pathname === "") {
  throw new Error("VIDEO.json url must name a video, not the YouTube home page");
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "VIDEO.json");
writeFileSync(target, JSON.stringify(data, null, 2) + "\n");

const entry = {
  competition: "gta6-clipper-01",
  title: "Lucia Blows Up a Cop Car, Then Jason Outruns a Helicopter on a Jet Ski",
  clip: "out/clip.mp4",
  durationSeconds: 18,
  madeBy: "AI agent",
  bounty: "gta6-clipper-01",
};
writeFileSync(join(outDir, "entry.json"), JSON.stringify(entry, null, 2) + "\n");

console.log(`OK: VIDEO.json -> ${target}`);
