export const STYLES = [
  { id: "cute", label: "Cute", note: "Soft, sweet, easy to say" },
  { id: "strong", label: "Strong", note: "Big energy, short bark" },
  { id: "funny", label: "Funny", note: "A name with a wink" },
  { id: "unique", label: "Unique", note: "Not every dog at the park" },
  { id: "classic", label: "Classic", note: "A name that never dates" },
];

export const GENDERS = [
  { id: "any", label: "Any" },
  { id: "boy", label: "Boy" },
  { id: "girl", label: "Girl" },
];

export const STYLE_LABELS = Object.fromEntries(STYLES.map((style) => [style.id, style.label]));

const N = (name, gender, styles, note) => ({ name, gender, styles, note });

export const NAMES = [
  // Boys and any-gender names
  N("Max", "boy", ["classic", "strong"], "the greatest"),
  N("Charlie", "any", ["classic", "cute"], "a friendly everydog"),
  N("Cooper", "boy", ["classic", "cute"], "barrel maker"),
  N("Milo", "boy", ["cute", "classic"], "soldier"),
  N("Archie", "boy", ["classic", "cute"], "genuinely bold"),
  N("Finn", "boy", ["classic", "unique"], "fair"),
  N("Leo", "boy", ["classic", "strong"], "lion"),
  N("Oscar", "boy", ["classic", "unique"], "deer friend"),
  N("Theo", "boy", ["classic", "cute"], "gift of God"),
  N("Gus", "boy", ["cute", "classic"], "a big soft presence"),
  N("Hank", "boy", ["classic", "strong"], "ruler of the home"),
  N("Lou", "any", ["cute", "classic"], "famous warrior"),
  N("Remy", "boy", ["unique", "cute"], "oarsman"),
  N("Beau", "boy", ["cute", "classic"], "handsome"),
  N("Arlo", "boy", ["unique", "cute"], "between two hills"),
  N("Ezra", "boy", ["unique", "classic"], "help"),
  N("Kai", "any", ["unique", "strong"], "sea"),
  N("Koa", "boy", ["unique", "strong"], "warrior"),
  N("Blue", "any", ["unique", "cute"], "a color and a mood"),
  N("Onyx", "any", ["unique", "strong"], "a dark stone"),
  N("Storm", "any", ["strong", "unique"], "weather with a bark"),
  N("River", "any", ["unique", "cute"], "flowing water"),
  N("Sage", "any", ["unique", "cute"], "a herb"),
  N("Bear", "boy", ["strong", "cute"], "a big cozy animal"),
  N("Duke", "boy", ["strong", "classic"], "leader"),
  N("Rex", "boy", ["strong", "classic"], "king"),
  N("Ace", "boy", ["strong", "classic"], "expert"),
  N("Rocky", "boy", ["strong", "classic"], "steady"),
  N("Thor", "boy", ["strong", "unique"], "thunder"),
  N("Atlas", "boy", ["strong", "unique"], "enduring"),
  N("Ranger", "boy", ["strong", "unique"], "guardian"),
  N("Scout", "any", ["cute", "strong"], "explorer"),
  N("Dash", "boy", ["strong", "cute"], "fast"),
  N("Ziggy", "any", ["funny", "cute"], "playful"),
  N("Bingo", "boy", ["funny", "classic"], "a game"),
  N("Waffles", "any", ["funny", "cute"], "a breakfast favorite"),
  N("Biscuit", "any", ["funny", "cute"], "a treat"),
  N("Pickles", "any", ["funny", "cute"], "a briny snack"),
  N("Noodle", "any", ["funny", "cute"], "soft and silly"),
  N("Meatball", "boy", ["funny", "cute"], "a round snack"),
  N("Taco", "any", ["funny", "cute"], "a handheld meal"),
  N("Nacho", "boy", ["funny", "cute"], "a snack"),
  N("Bean", "any", ["cute", "funny"], "small and cozy"),
  N("Peanut", "any", ["cute", "funny"], "small and nutty"),
  N("Muffin", "any", ["cute", "funny"], "a baked treat"),
  N("Pumpkin", "any", ["cute", "funny"], "a fall favorite"),
  N("Pepper", "any", ["cute", "funny"], "a spice"),
  N("Latte", "any", ["cute", "funny"], "coffee with milk"),
  N("Mocha", "any", ["cute", "funny"], "coffee and chocolate"),
  N("Espresso", "boy", ["strong", "funny"], "strong coffee"),
  N("Bagel", "any", ["funny", "cute"], "a breakfast ring"),
  N("Toast", "any", ["funny", "cute"], "a breakfast staple"),
  N("Nugget", "any", ["funny", "cute"], "a small bite"),
  N("Potato", "any", ["funny", "unique"], "a round vegetable"),
  N("Murphy", "boy", ["classic", "cute"], "sea warrior"),
  N("Liam", "boy", ["classic", "strong"], "strong-willed"),
  N("Noah", "boy", ["classic", "cute"], "rest"),
  N("Oliver", "boy", ["classic", "cute"], "olive tree"),
  N("Henry", "boy", ["classic", "strong"], "ruler of the home"),
  N("Jack", "boy", ["classic", "strong"], "God is gracious"),
  N("Otis", "boy", ["classic", "unique"], "wealthy"),
  N("Felix", "boy", ["classic", "unique"], "lucky"),
  N("Luca", "boy", ["classic", "unique"], "bringer of light"),
  N("Bruno", "boy", ["strong", "classic"], "brown"),
  N("Woody", "boy", ["cute", "funny"], "a woodworker"),
  N("Buzz", "boy", ["funny", "strong"], "a buzz"),
  N("Chewie", "any", ["funny", "cute"], "a chew toy"),
  N("Gizmo", "any", ["funny", "unique"], "a gadget"),
  N("Odin", "boy", ["strong", "unique"], "Norse god"),
  N("Loki", "boy", ["funny", "unique"], "trickster"),
  N("Phoenix", "any", ["strong", "unique"], "a mythical bird"),
  N("Wolf", "boy", ["strong", "unique"], "an animal"),
  N("Fox", "boy", ["strong", "unique"], "an animal"),
  N("Titan", "boy", ["strong", "unique"], "a giant"),
  N("Griffin", "boy", ["strong", "unique"], "a mythical creature"),

  // Girls and any-gender names
  N("Luna", "girl", ["cute", "unique"], "moon"),
  N("Nova", "any", ["unique", "cute"], "new"),
  N("Stella", "girl", ["classic", "cute"], "star"),
  N("Juno", "girl", ["strong", "unique"], "queen of the gods"),
  N("Cleo", "girl", ["classic", "unique"], "glory"),
  N("Zora", "girl", ["unique", "strong"], "dawn"),
  N("Suki", "girl", ["cute", "unique"], "beloved"),
  N("Yuki", "girl", ["cute", "unique"], "snow"),
  N("Mochi", "any", ["cute", "funny"], "sweet rice cake"),
  N("Tofu", "any", ["cute", "funny"], "soft and mild"),
  N("Nori", "any", ["cute", "unique"], "seaweed"),
  N("Hana", "girl", ["cute", "unique"], "flower"),
  N("Aiko", "girl", ["cute", "unique"], "beloved child"),
  N("Rumi", "girl", ["unique", "cute"], "beauty"),
  N("Freya", "girl", ["strong", "unique"], "Norse goddess"),
  N("Astrid", "girl", ["strong", "unique"], "divine beauty"),
  N("Ingrid", "girl", ["classic", "strong"], "fair"),
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
  N("Pixie", "girl", ["cute", "unique"], "a fairy"),
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
  N("Tiger", "boy", ["strong", "classic"], "an animal"),
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
