import type { Options as AvataaarsOptions } from "@dicebear/avataaars";

/**
 * Customizable subset of DiceBear "avataaars" options.
 * All fields are single-choice for our picker UX (DiceBear expects arrays;
 * we wrap them at render time).
 */
export type AvatarLook = {
  skinColor: string;
  top: NonNullable<AvataaarsOptions["top"]>[number];
  hairColor: string;
  eyes: NonNullable<AvataaarsOptions["eyes"]>[number];
  eyebrows: NonNullable<AvataaarsOptions["eyebrows"]>[number];
  mouth: NonNullable<AvataaarsOptions["mouth"]>[number];
  accessories?: NonNullable<AvataaarsOptions["accessories"]>[number];
  facialHair?: NonNullable<AvataaarsOptions["facialHair"]>[number];
  clothing: NonNullable<AvataaarsOptions["clothing"]>[number];
  clothesColor: string;
};

export const SKIN_COLORS = [
  "614335", // deep
  "8d5524", // brown
  "ae5d29", // tan
  "d08b5b", // olive
  "edb98a", // light
  "f8d25c", // pale-yellow
  "fd9841", // orange
  "fdbcb4", // pink
  "ffdbb4", // very light
] as const;

export const HAIR_COLORS = [
  "0a0a0a", // black
  "2c1b18", // dark brown
  "4a312c", // brown
  "724133", // auburn
  "a55728", // dark blond
  "b58143", // caramel
  "c93305", // red
  "d6b370", // blond
  "e8e1e1", // silver
  "ecdcbf", // platinum
  "f59797", // pink
  "a45cff", // purple (brand-adjacent)
] as const;

export const CLOTHES_COLORS = [
  "8b5cf6", // brand purple
  "6d28d9", // deep purple
  "3b82f6", // blue
  "1f2937", // slate
  "0ea5e9", // sky
  "10b981", // emerald
  "f59e0b", // amber
  "ef4444", // red
  "111827", // near-black
  "e5e7eb", // light
] as const;

export const TOPS = [
  "shortFlat", "shortRound", "shortWaved", "shortCurly",
  "shaggy", "sides", "theCaesar", "shavedSides",
  "bigHair", "bob", "bun", "curly", "curvy",
  "dreads", "dreads01", "dreads02", "fro", "froBand",
  "longButNotTooLong", "miaWallace", "straight01", "straight02",
  "hat", "hijab", "turban", "winterHat1", "winterHat02",
] as const satisfies readonly AvatarLook["top"][];

export const EYES = [
  "default", "happy", "wink", "squint", "surprised", "hearts", "closed", "side", "eyeRoll",
] as const satisfies readonly AvatarLook["eyes"][];

export const EYEBROWS = [
  "default", "defaultNatural", "raisedExcited", "flatNatural", "angry", "sadConcerned",
] as const satisfies readonly AvatarLook["eyebrows"][];

export const MOUTHS = [
  "smile", "default", "twinkle", "serious", "tongue", "eating", "grimace", "disbelief", "concerned",
] as const satisfies readonly AvatarLook["mouth"][];

export const ACCESSORIES = [
  undefined, "prescription01", "prescription02", "round", "wayfarers", "sunglasses", "kurt", "eyepatch",
] as const satisfies readonly AvatarLook["accessories"][];

export const FACIAL_HAIR = [
  undefined, "beardLight", "beardMedium", "beardMajestic", "moustacheFancy", "moustacheMagnum",
] as const satisfies readonly AvatarLook["facialHair"][];

export const CLOTHING = [
  "hoodie", "shirtCrewNeck", "shirtVNeck", "shirtScoopNeck",
  "blazerAndShirt", "blazerAndSweater", "collarAndSweater", "graphicShirt", "overall",
] as const satisfies readonly AvatarLook["clothing"][];

function pick<T>(arr: readonly T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h;
}

/** Deterministic default look from a seed string (agent name). */
export function defaultLook(seed: string): AvatarLook {
  const h = hash(seed);
  return {
    skinColor: pick(SKIN_COLORS, h),
    top: pick(TOPS, h >> 3),
    hairColor: pick(HAIR_COLORS, h >> 6),
    eyes: pick(EYES, h >> 9),
    eyebrows: pick(EYEBROWS, h >> 12),
    mouth: pick(MOUTHS, h >> 15),
    accessories: pick(ACCESSORIES, h >> 18),
    facialHair: pick(FACIAL_HAIR, h >> 21),
    clothing: pick(CLOTHING, h >> 24),
    clothesColor: pick(CLOTHES_COLORS, h >> 27),
  };
}

/** Fully random look (used by the "Randomize" button in the customizer). */
export function randomLook(): AvatarLook {
  return defaultLook(Math.random().toString(36).slice(2));
}

/** Convert an AvatarLook into DiceBear avataaars options. */
export function lookToOptions(look: AvatarLook): Partial<AvataaarsOptions> {
  return {
    skinColor: [look.skinColor],
    top: [look.top],
    topProbability: 100,
    hairColor: [look.hairColor],
    eyes: [look.eyes],
    eyebrows: [look.eyebrows],
    mouth: [look.mouth],
    accessories: look.accessories ? [look.accessories] : undefined,
    accessoriesProbability: look.accessories ? 100 : 0,
    facialHair: look.facialHair ? [look.facialHair] : undefined,
    facialHairProbability: look.facialHair ? 100 : 0,
    clothing: [look.clothing],
    clothesColor: [look.clothesColor],
  };
}
