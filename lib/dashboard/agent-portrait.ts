// AI-generated cyberpunk portraits, saved locally under /public/avatars/.
// Source images are generated once via scripts/download-avatars.mjs (Pollinations.ai, free).

export function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function localPortraitPath(name: string): string {
  return `/avatars/${slugifyName(name)}.jpg`;
}

// Kept for the download script — do not call from client code.
const STYLE =
  "cyberpunk portrait, neon glow, purple and cyan accents, dark background, cinematic lighting, digital painting, 3/4 view, highly detailed, character concept art, sharp focus";

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % 1_000_000;
}

export function pollinationsUrl(name: string, role?: string, size = 512): string {
  const subject = role ?? "operator";
  const prompt = `${STYLE}, subject: ${subject}`;
  const seed = hashSeed(`${name}|${role ?? ""}`);
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${size}&height=${size}&seed=${seed}&nologo=true&model=flux`;
}
