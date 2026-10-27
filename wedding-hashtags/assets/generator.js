const STORY_STOP = new Set([
  "we", "met", "at", "a", "an", "the", "and", "our", "in", "on", "of", "to",
  "for", "with", "first", "date", "love", "story", "my", "his", "her", "their",
  "that", "this", "it", "was", "were", "is", "are", "had", "has", "have",
]);

export const STYLES = [
  { id: "classic", label: "Classic", blurb: "Clean, timeless, easy to read." },
  { id: "funny", label: "Funny", blurb: "A little roast, a lot of love." },
  { id: "punny", label: "Punny", blurb: "Wordplay with the last name." },
  { id: "short", label: "Short", blurb: "Initials, years, and tiny tags." },
];

export const STYLE_LABELS = {
  classic: "Classic",
  funny: "Funny",
  punny: "Punny",
  short: "Short",
  story: "Your story",
  date: "The date",
  place: "The place",
};

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

function capWord(word) {
  const chars = [...word];
  if (!chars.length) return "";
  return chars[0].toUpperCase() + chars.slice(1).join("");
}

export function cleanWord(value) {
  const tokens = String(value ?? "").normalize("NFC").match(/[\p{L}\p{N}]+/gu) || [];
  return tokens.map(capWord).join("");
}

function firstWord(value) {
  const tokens = String(value ?? "").normalize("NFC").match(/[\p{L}\p{N}]+/gu) || [];
  return tokens.length ? capWord(tokens[0]) : "";
}

function pluralLast(last) {
  if (!last) return "";
  if (/(s|x|z|ch|sh)$/i.test(last)) return `${last}es`;
  return `${last}s`;
}

function storyWord(value) {
  const tokens = String(value ?? "").normalize("NFC").match(/[\p{L}\p{N}]+/gu) || [];
  const kept = tokens.filter((word) => !STORY_STOP.has(word.toLowerCase())).slice(0, 3);
  return (kept.length ? kept : tokens.slice(0, 2)).map(capWord).join("");
}

function dateParts(value) {
  if (!value) return {};
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return {};
  return {
    year: String(date.getFullYear()),
    month: date.toLocaleString("en-US", { month: "long" }),
  };
}

export function normalizeHashtag(raw) {
  if (!raw) return "";
  const body = String(raw).replace(/^#+/, "").replace(/[^\p{L}\p{N}_]/gu, "");
  return body ? `#${body}` : "";
}

function isUsable(tag) {
  if (!tag || tag === "#") return false;
  const length = [...tag].length;
  if (length < 4 || length > 42) return false;
  if (tag.includes("undefined") || tag.includes("null") || tag.includes("NaN")) return false;
  return true;
}

const T = (style, make) => ({ style, make });

const TEMPLATES = [
  // Classic
  T("classic", (c) => c.last && `The${c.lastPlural}`),
  T("classic", (c) => `${c.p1}And${c.p2}`),
  T("classic", (c) => c.p1p2.length <= 18 && c.p1p2),
  T("classic", (c) => `${c.p1}Weds${c.p2}`),
  T("classic", (c) => `${c.p1}EverAfter`),
  T("classic", (c) => c.last && `Forever${c.last}`),
  T("classic", (c) => `${c.initials}SayIDo`),
  T("classic", (c) => c.last && c.year && `${c.last}Wedding${c.year}`),
  T("classic", (c) => c.last && `A${c.last}Affair`),
  T("classic", (c) => c.year && `${c.p1}And${c.p2}${c.year}`),
  T("classic", (c) => c.last && `${c.p1}${c.last}`),
  T("classic", (c) => c.last && `The${c.last}Wedding`),
  T("classic", (c) => `${c.p1}And${c.p2}Vows`),
  T("classic", (c) => c.last && `${c.last}${c.year}`),
  T("classic", (c) => `${c.p1}Marries${c.p2}`),
  T("classic", (c) => c.last && `The${c.last}Union`),
  T("classic", (c) => c.last && `A${c.last}Wedding`),
  T("classic", (c) => c.last && `${c.last}LoveStory`),
  T("classic", (c) => `${c.p1}And${c.p2}Forever`),

  // Funny
  T("funny", (c) => `${c.p1}PutARingOnIt`),
  T("funny", (c) => (c.last ? `HappilyEver${c.last}` : `HappilyEver${c.p1}`)),
  T("funny", (c) => `${c.p1}GotLucky`),
  T("funny", (c) => c.last && `The${c.last}Takeover`),
  T("funny", (c) => `${c.p1}FinallyDidIt`),
  T("funny", () => "YouMayNowScroll"),
  T("funny", () => "NoMoreSwiping"),
  T("funny", () => "LastFirstKiss"),
  T("funny", (c) => `${c.p1}InLawLoading`),
  T("funny", (c) => c.last && `WeddingCrash${c.last}`),
  T("funny", (c) => `${c.p1}And${c.p2}PlusTax`),
  T("funny", (c) => c.last && `ByeBye${c.last}`),
  T("funny", (c) => `${c.p1}SaidYes`),
  T("funny", (c) => `${c.p1}OffTheMarket`),
  T("funny", (c) => c.last && `The${c.last}Party`),
  T("funny", (c) => `${c.p2}StoleMyHeart`),
  T("funny", (c) => c.last && `${c.p1}GotThe${c.last}`),
  T("funny", (c) => `Catch${c.p1}IfYouCan`),
  T("funny", (c) => `${c.p1}MadeItOfficial`),
  T("funny", (c) => c.last && `The${c.last}Era`),
  T("funny", (c) => c.last && `CakeBefore${c.last}`),
  T("funny", (c) => c.last && `OpenBar${c.last}`),
  T("funny", (c) => `${c.p1}And${c.p2}PlusOne`),

  // Punny
  T("punny", (c) => c.last && `${c.last}lyEverAfter`),
  T("punny", (c) => c.last && `Happily${c.last}`),
  T("punny", (c) => c.last && `${c.last}InLove`),
  T("punny", (c) => c.last && `${c.last}Vows`),
  T("punny", (c) => c.last && `MeetThe${c.lastPlural}`),
  T("punny", (c) => c.last && `${c.last}PartyOfTwo`),
  T("punny", (c) => `${c.p1}And${c.p2}TheKnot`),
  T("punny", (c) => `${c.p1}Plus${c.p2}`),
  T("punny", (c) => c.last && `GameOf${c.lastPlural}`),
  T("punny", (c) => c.last && `The${c.last}Story`),
  T("punny", (c) => `${c.p1}${c.p2}EverAfter`),
  T("punny", (c) => c.last && `LoveAnd${c.last}`),
  T("punny", (c) => c.last && `${c.p1}Ever${c.last}`),
  T("punny", (c) => c.last && `The${c.last}Chapter`),
  T("punny", (c) => c.last && `${c.last}EverAfterParty`),
  T("punny", (c) => c.last && `${c.last}lyInLove`),
  T("punny", (c) => c.last && `${c.last}TheKnot`),

  // Short
  T("short", (c) => c.initials),
  T("short", (c) => c.last && `Team${c.last}`),
  T("short", (c) => `${c.p1}x${c.p2}`),
  T("short", (c) => c.last && c.year && `${c.last}${c.year}`),
  T("short", (c) => `${c.initials}Do`),
  T("short", (c) => c.year && `Vows${c.year}`),
  T("short", (c) => `${c.initials}${c.year}`),
  T("short", (c) => `${c.p1}${c.p2}`),
  T("short", (c) => `${c.p1}Weds${c.p2}`),
  T("short", (c) => c.last && c.year && `${c.last}${c.year.slice(-2)}`),
  T("short", (c) => c.year && `${c.initials}${c.year.slice(-2)}`),

  // Story
  T("story", (c) => c.story && `${c.p1}${c.story}`),
  T("story", (c) => c.story && `${c.story}EverAfter`),
  T("story", (c) => c.story && c.last && `From${c.story}To${c.last}`),
  T("story", (c) => c.story && `${c.story}Vows`),
  T("story", (c) => c.story && `LoveAt${c.story}`),
  T("story", (c) => c.story && `${c.p1}And${c.story}`),
  T("story", (c) => c.story && `${c.story}ToSayIDo`),
  T("story", (c) => c.story && `The${c.story}Story`),
  T("story", (c) => c.story && `${c.p2}${c.story}`),
  T("story", (c) => c.story && `Our${c.story}`),
  T("story", (c) => c.story && `${c.story}Forever`),
  T("story", (c) => c.story && `${c.story}SayIDo`),
  T("story", (c) => c.story && `${c.story}PlusOne`),

  // Date
  T("date", (c) => c.month && c.year && `${c.month}${c.year}`),
  T("date", (c) => c.month && `${c.p1}${c.month}${c.year}`),
  T("date", (c) => c.year && `${c.p1}And${c.p2}${c.year}`),
  T("date", (c) => c.month && `${c.month}ToRemember`),
  T("date", (c) => c.month && `${c.month}${c.p1}`),
  T("date", (c) => c.year && `${c.year}Wedding`),
  T("date", (c) => c.year && `${c.p1}${c.year}`),
  T("date", (c) => c.month && `${c.month}Vows`),
  T("date", (c) => c.month && `${c.month}${c.p1}${c.p2}`),
  T("date", (c) => c.month && c.last && `${c.month}${c.last}`),
];

export function generateHashtags(input = {}, options = {}) {
  const limit = options.limit ?? 24;
  const seed = (options.seed ?? Date.now()) >>> 0;
  const rng = mulberry32(seed);

  const p1 = firstWord(input.p1);
  const p2 = firstWord(input.p2);
  if (!p1 || !p2) return [];

  const last = cleanWord(input.last);
  const requestedStyle = STYLES.some((style) => style.id === input.style) ? input.style : "classic";
  const { year = "", month = "" } = dateParts(input.date);
  const story = storyWord(input.detail);
  const initials = `${[...p1][0]}${[...p2][0]}`.toUpperCase();

  const ctx = {
    p1,
    p2,
    p1p2: `${p1}${p2}`,
    last,
    lastPlural: pluralLast(last),
    initials,
    year,
    month,
    story,
  };

  const all = [];
  const seen = new Set();
  for (const template of TEMPLATES) {
    const tag = normalizeHashtag(template.make(ctx));
    if (!isUsable(tag)) continue;
    const key = tag.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    all.push({ tag, style: template.style });
  }

  const primary = all.filter((item) => item.style === requestedStyle);
  const extras = all.filter((item) => ["story", "date"].includes(item.style));
  const others = all.filter(
    (item) => item.style !== requestedStyle && !["story", "date"].includes(item.style),
  );

  const out = [
    ...shuffle(primary, rng).slice(0, 12),
    ...shuffle(extras, rng).slice(0, 4),
    ...shuffle(others, rng).slice(0, 8),
  ];

  const used = new Set(out.map((item) => item.tag.toLowerCase()));
  if (out.length < limit) {
    const remaining = all.filter((item) => !used.has(item.tag.toLowerCase()));
    out.push(...shuffle(remaining, rng).slice(0, limit - out.length));
  }

  const final = [];
  const finalSeen = new Set();
  for (const item of out) {
    const key = item.tag.toLowerCase();
    if (finalSeen.has(key)) continue;
    finalSeen.add(key);
    final.push(item);
    if (final.length >= limit) break;
  }
  return final;
}
