// One-time script: fetches AI cyberpunk portraits from Pollinations.ai (free, no key)
// and saves them to /public/avatars/{slug}.jpg. Re-run to regenerate missing ones;
// existing files are skipped unless --force is passed.
//
// Usage:
//   node scripts/download-avatars.mjs          # skip existing
//   node scripts/download-avatars.mjs --force  # re-download all

import { mkdir, writeFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "avatars");
const FORCE = process.argv.includes("--force");
const SIZE = 512;

const STYLE =
  "cyberpunk portrait, neon glow, purple and cyan accents, dark background, cinematic lighting, digital painting, 3/4 view, highly detailed, character concept art, sharp focus";

// Keep this list in sync with lib/dashboard/mock-data.ts.
const AGENTS = [
  { name: "Aria Chen", role: "Research Analyst" },
  { name: "Marcus Silva", role: "SEO Content Agent" },
  { name: "Priya Kapoor", role: "SDR Prospecting Agent" },
  { name: "Elena Rossi", role: "Support Triage" },
  { name: "Kenji Watanabe", role: "Ops Watcher" },
  { name: "Amara Okafor", role: "Codegen Assistant" },
  { name: "Diego Herrera", role: "Data Analyst" },
  { name: "Noor Al-Amin", role: "Recruiting Sourcer" },
  { name: "Lena Park", role: "Research" },
  { name: "Julian Cruz", role: "Marketing" },
  { name: "Zara Malik", role: "Sales" },
  { name: "Theo Rasmussen", role: "Development" },
  { name: "Isla Fernández", role: "Support" },
  { name: "Kwame Boateng", role: "Operations" },
  { name: "Sana Yoshida", role: "Marketing" },
  { name: "Mateo Bianchi", role: "Development" },
  { name: "Freya Lindberg", role: "Operations" },
  { name: "Rohan Desai", role: "Marketing" },
  { name: "Camille Dupont", role: "Research" },
  { name: "Yusuf Kaya", role: "Support" },
];

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function hashSeed(input) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % 1_000_000;
}

function urlFor(name, role) {
  const prompt = `${STYLE}, subject: ${role}`;
  const seed = hashSeed(`${name}|${role}`);
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${SIZE}&height=${SIZE}&seed=${seed}&nologo=true&model=flux`;
}

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function fetchWithRetry(url, attempts = 3) {
  for (let i = 1; i <= attempts; i++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 90_000);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 1024) throw new Error(`suspiciously small (${buf.length}B)`);
      return buf;
    } catch (err) {
      console.warn(`  attempt ${i}/${attempts} failed: ${err.message}`);
      if (i === attempts) throw err;
      await new Promise((r) => setTimeout(r, 2000 * i));
    }
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Writing to ${OUT_DIR}`);
  console.log(`${AGENTS.length} agents · force=${FORCE}\n`);

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (const agent of AGENTS) {
    const slug = slugify(agent.name);
    const outPath = join(OUT_DIR, `${slug}.jpg`);

    if (!FORCE && (await exists(outPath))) {
      console.log(`⇢ skip  ${slug}.jpg (exists)`);
      skipped++;
      continue;
    }

    const url = urlFor(agent.name, agent.role);
    process.stdout.write(`… fetch ${slug} (${agent.role}) `);

    try {
      const buf = await fetchWithRetry(url);
      await writeFile(outPath, buf);
      console.log(`✓ ${(buf.length / 1024).toFixed(0)}KB`);
      ok++;
    } catch (err) {
      console.log(`✗ ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone. ok=${ok} skipped=${skipped} failed=${failed}`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
