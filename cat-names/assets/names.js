export const STYLES = [
  { id: "cute", label: "Cute" },
  { id: "strong", label: "Strong" },
  { id: "funny", label: "Funny" },
  { id: "unique", label: "Unique" },
  { id: "classic", label: "Classic" },
];

export const GENDERS = [
  { id: "any", label: "Any" },
  { id: "boy", label: "Boy" },
  { id: "girl", label: "Girl" },
];

export const STYLE_LABELS = Object.fromEntries(STYLES.map((style) => [style.id, style.label]));

export const CLANS = ["ThunderClan", "RiverClan", "ShadowClan", "WindClan", "SkyClan"];

const N = (name, gender, styles, note) => ({ name, gender, styles, note });

export const NAMES = [
  N("Milo", "boy", ["classic", "cute"], "soldier"),
  N("Leo", "boy", ["classic", "strong"], "lion"),
  N("Oliver", "boy", ["classic", "cute"], "olive tree"),
  N("Simba", "boy", ["unique", "strong"], "lion"),
  N("Loki", "boy", ["funny", "unique"], "trickster"),
  N("Jasper", "boy", ["classic", "unique"], "treasurer"),
  N("Felix", "boy", ["classic", "unique"], "lucky"),
  N("Oscar", "boy", ["classic", "unique"], "deer friend"),
  N("Max", "boy", ["classic", "strong"], "the greatest"),
  N("Charlie", "any", ["classic", "cute"], "friendly everycat"),
  N("Finn", "boy", ["classic", "unique"], "fair"),
  N("Theo", "boy", ["classic", "cute"], "gift of God"),
  N("Gus", "boy", ["cute", "classic"], "a big soft presence"),
  N("Lou", "any", ["cute", "classic"], "famous warrior"),
  N("Remy", "boy", ["unique", "cute"], "oarsman"),
  N("Beau", "boy", ["cute", "classic"], "handsome"),
  N("Arlo", "boy", ["unique", "cute"], "between two hills"),
  N("Kai", "any", ["unique", "strong"], "sea"),
  N("Blue", "any", ["unique", "cute"], "a color and a mood"),
  N("Onyx", "any", ["unique", "strong"], "a dark stone"),
  N("Shadow", "any", ["strong", "unique"], "a dark shape"),
  N("Ash", "any", ["unique", "strong"], "a tree"),
  N("Smokey", "boy", ["classic", "cute"], "smoky gray"),
  N("Bandit", "boy", ["funny", "strong"], "a little thief"),
  N("Tiger", "boy", ["strong", "classic"], "an animal"),
  N("Panther", "boy", ["strong", "unique"], "an animal"),
  N("Bear", "boy", ["strong", "cute"], "a big cozy animal"),
  N("Wolf", "boy", ["strong", "unique"], "an animal"),
  N("Fox", "boy", ["strong", "unique"], "an animal"),
  N("Salem", "boy", ["unique", "strong"], "peace"),
  N("Binx", "boy", ["funny", "unique"], "a playful name"),
  N("Chester", "boy", ["classic", "cute"], "fortress"),
  N("Percy", "boy", ["classic", "unique"], "piercer"),
  N("Basil", "any", ["unique", "cute"], "a herb"),
  N("Pepper", "any", ["cute", "funny"], "a spice"),
  N("Pickles", "any", ["funny", "cute"], "a briny snack"),
  N("Mochi", "any", ["cute", "funny"], "sweet rice cake"),
  N("Tofu", "any", ["cute", "funny"], "soft and mild"),
  N("Noodle", "any", ["funny", "cute"], "soft and silly"),
  N("Waffles", "any", ["funny", "cute"], "a breakfast favorite"),
  N("Biscuit", "any", ["funny", "cute"], "a treat"),
  N("Bean", "any", ["cute", "funny"], "small and cozy"),
  N("Peanut", "any", ["cute", "funny"], "small and nutty"),
  N("Nacho", "boy", ["funny", "cute"], "a snack"),
  N("Taco", "any", ["funny", "cute"], "a handheld meal"),
  N("Potato", "any", ["funny", "unique"], "a round vegetable"),
  N("Toast", "any", ["funny", "cute"], "a breakfast staple"),
  N("Bagel", "any", ["funny", "cute"], "a breakfast ring"),
  N("Latte", "any", ["cute", "funny"], "coffee with milk"),
  N("Espresso", "boy", ["strong", "funny"], "strong coffee"),
  N("Ziggy", "any", ["funny", "cute"], "playful"),
  N("Gizmo", "any", ["funny", "unique"], "a gadget"),
  N("Sushi", "any", ["cute", "funny"], "a rice roll"),
  N("Wasabi", "boy", ["strong", "funny"], "a spicy paste"),
  N("Nori", "any", ["cute", "unique"], "seaweed"),
  N("Kumo", "any", ["cute", "unique"], "cloud"),
  N("Yuki", "girl", ["cute", "unique"], "snow"),
  N("Hana", "girl", ["cute", "unique"], "flower"),
  N("Aiko", "girl", ["cute", "unique"], "beloved child"),
  N("Rumi", "girl", ["unique", "cute"], "beauty"),
  N("Suki", "girl", ["cute", "unique"], "beloved"),
  N("Luna", "girl", ["cute", "unique"], "moon"),
  N("Nova", "any", ["unique", "cute"], "new"),
  N("Stella", "girl", ["classic", "cute"], "star"),
  N("Cleo", "girl", ["classic", "unique"], "glory"),
  N("Juno", "girl", ["strong", "unique"], "queen of the gods"),
  N("Freya", "girl", ["strong", "unique"], "Norse goddess"),
  N("Astrid", "girl", ["strong", "unique"], "divine beauty"),
  N("Sigrid", "girl", ["strong", "unique"], "victory"),
  N("Maja", "girl", ["cute", "classic"], "May"),
  N("Saga", "girl", ["unique", "cute"], "story"),
  N("Alva", "girl", ["unique", "cute"], "elf"),
  N("Elsa", "girl", ["classic", "cute"], "pledged to God"),
  N("Agnes", "girl", ["classic", "strong"], "pure"),
  N("Clara", "girl", ["classic", "cute"], "bright"),
  N("Greta", "girl", ["classic", "strong"], "pearl"),
  N("Matilda", "girl", ["strong", "classic"], "mighty in battle"),
  N("Alma", "girl", ["classic", "unique"], "soul"),
  N("Vera", "girl", ["classic", "strong"], "faith"),
  N("Nadia", "girl", ["classic", "unique"], "hope"),
  N("Anya", "girl", ["cute", "unique"], "grace"),
  N("Mila", "girl", ["cute", "classic"], "gracious"),
  N("Nina", "girl", ["cute", "classic"], "dreamer"),
  N("Zara", "girl", ["unique", "cute"], "blossom"),
  N("Layla", "girl", ["classic", "unique"], "night"),
  N("Amira", "girl", ["unique", "strong"], "princess"),
  N("Aisha", "girl", ["unique", "strong"], "alive"),
  N("Nala", "girl", ["cute", "strong"], "successful"),
  N("Kira", "girl", ["unique", "strong"], "light"),
  N("Sasha", "any", ["cute", "strong"], "defender"),
  N("Mishka", "any", ["cute", "unique"], "little bear"),
  N("Daisy", "girl", ["cute", "classic"], "a flower"),
  N("Lily", "girl", ["cute", "classic"], "a flower"),
  N("Poppy", "girl", ["cute", "unique"], "a flower"),
  N("Violet", "girl", ["cute", "unique"], "a flower and a color"),
  N("Ruby", "girl", ["classic", "strong"], "a red gem"),
  N("Pearl", "girl", ["classic", "cute"], "a gem"),
  N("Opal", "girl", ["unique", "cute"], "a gem"),
  N("Skye", "any", ["unique", "cute"], "sky"),
  N("Sunny", "any", ["cute", "funny"], "bright"),
  N("Autumn", "girl", ["cute", "classic"], "season"),
  N("June", "girl", ["classic", "cute"], "month"),
  N("Mae", "girl", ["classic", "cute"], "May"),
  N("Sadie", "girl", ["classic", "cute"], "princess"),
  N("Molly", "girl", ["classic", "cute"], "beloved"),
  N("Lucy", "girl", ["classic", "cute"], "light"),
  N("Penny", "girl", ["cute", "classic"], "weaver"),
  N("Winnie", "girl", ["cute", "classic"], "peace"),
  N("Ellie", "girl", ["cute", "classic"], "light"),
  N("Nora", "girl", ["classic", "unique"], "honor"),
  N("Maisie", "girl", ["cute", "unique"], "pearl"),
  N("Pippa", "girl", ["cute", "unique"], "lover of horses"),
  N("Birdie", "girl", ["cute", "unique"], "a little bird"),
  N("Dot", "girl", ["cute", "funny"], "a small spot"),
  N("Lola", "girl", ["cute", "classic"], "strong woman"),
  N("Lulu", "girl", ["cute", "classic"], "pearl"),
  N("Dolly", "girl", ["cute", "classic"], "gift of God"),
  N("Zelda", "girl", ["strong", "unique"], "gray battle"),
  N("Xena", "girl", ["strong", "unique"], "guest"),
  N("Nyx", "girl", ["unique", "strong"], "night"),
  N("Vega", "any", ["unique", "cute"], "star"),
  N("Lyra", "girl", ["unique", "cute"], "harp"),
  N("Aria", "girl", ["cute", "unique"], "melody"),
  N("Aurora", "girl", ["cute", "unique"], "dawn"),
  N("Celeste", "girl", ["unique", "cute"], "heavenly"),
  N("Juniper", "girl", ["unique", "cute"], "young"),
  N("Wren", "any", ["unique", "cute"], "a small bird"),
  N("Raven", "any", ["strong", "unique"], "a bird"),
  N("Otter", "any", ["cute", "unique"], "an animal"),
  N("Orca", "any", ["strong", "unique"], "an animal"),
];

const WARRIOR_PREFIXES = [
  "Thunder", "River", "Shadow", "Wind", "Fire", "Storm", "Night", "Frost", "Leaf",
  "Bark", "Ash", "Ivy", "Holly", "Birch", "Cedar", "Moss", "Fern", "Reed", "Willow",
  "Sorrel", "Amber", "Dusk", "Dawn", "Snow", "Rain", "Cloud", "Sky", "Stone",
  "Boulder", "Flint", "Ember", "Soot", "Lichen", "Thistle", "Bramble", "Honey",
  "Clover", "Poppy", "Hazel", "Sparrow",
];

const WARRIOR_SUFFIXES = [
  "claw", "heart", "fur", "pelt", "star", "tail", "whisker", "ear", "foot", "nose",
  "flower", "leaf", "shade", "strike", "leap", "flight", "song", "wing", "fang",
  "tooth", "spot", "stripe", "patch", "storm", "breeze", "cloud", "pool", "stream",
  "river", "frost", "snow", "light", "shadow", "dusk", "dawn", "blaze", "flame",
  "spark", "feather", "seed", "berry",
];

function mulberry32(seed) {
  let a = seed >>> 0;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(items, rng) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateNames({ gender = "any", style = "cute", count = 24 } = {}, seed = Date.now()) {
  const safeGender = GENDERS.some((item) => item.id === gender) ? gender : "any";
  const safeStyle = STYLES.some((item) => item.id === style) ? style : "cute";
  const numeric = Number(count);
  const requested = Math.max(1, Math.min(48, Number.isFinite(numeric) ? numeric : 24));
  const rng = mulberry32(seed >>> 0);
  const genderPool = NAMES.filter(
    (name) => safeGender === "any" || name.gender === "any" || name.gender === safeGender,
  );
  const primary = genderPool.filter((name) => name.styles.includes(safeStyle));
  const rest = genderPool.filter((name) => !name.styles.includes(safeStyle));
  return [...shuffle(primary, rng), ...shuffle(rest, rng)].slice(0, requested);
}

const WARRIOR_BLOCKLIST = new Set(["nightlight"]);

function joinWarriorName(prefix, suffix) {
  const a = prefix.toLowerCase();
  const b = suffix.toLowerCase();
  if (/[aeiou]$/.test(a) && /^[aeiou]/.test(b)) return null;
  if (a.at(-1) === b[0] || a === b) return null;
  const name = `${prefix}${suffix}`;
  if (WARRIOR_BLOCKLIST.has(name.toLowerCase())) return null;
  return name;
}

export function generateWarriorNames(seed = Date.now(), count = 24) {
  const requested = Math.max(1, Math.min(48, Number(count) || 24));
  const rng = mulberry32(seed >>> 0);
  const prefixes = shuffle(WARRIOR_PREFIXES, rng);
  const suffixes = shuffle(WARRIOR_SUFFIXES, rng);
  const out = [];
  const seen = new Set();
  for (let attempt = 0; out.length < requested && attempt < requested * 20; attempt += 1) {
    const prefix = prefixes[out.length % prefixes.length];
    const suffix = suffixes[Math.floor(rng() * suffixes.length)];
    const name = joinWarriorName(prefix, suffix);
    if (!name || seen.has(name)) continue;
    seen.add(name);
    out.push(name);
  }
  return out;
}
