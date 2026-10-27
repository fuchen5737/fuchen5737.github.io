export const TRIP_TYPES = [
  { id: "tent", label: "Tent camping", note: "A tent, a site, and whatever the weather brings." },
  { id: "car", label: "Car camping", note: "Sleep at the car; bring a few more comforts." },
  { id: "rv", label: "RV camping", note: "Hookups, tanks, leveling, and a rolling kitchen." },
  { id: "backcountry", label: "Backcountry", note: "Carry it in. Leave no trace." },
];

export const WEATHERS = [
  { id: "warm", label: "Warm & sunny" },
  { id: "cool", label: "Cool" },
  { id: "cold", label: "Cold" },
  { id: "wet", label: "Wet" },
];

export const ACTIVITIES = [
  { id: "hike", label: "Hiking" },
  { id: "swim", label: "Swimming" },
  { id: "fish", label: "Fishing" },
  { id: "cook", label: "Camp cooking" },
  { id: "fire", label: "Campfire" },
];

export const CATEGORIES = [
  { id: "shelter", label: "Shelter & sleep", note: "The things that decide whether you sleep." },
  { id: "kitchen", label: "Kitchen & food", note: "Cook, eat, clean, repeat." },
  { id: "clothing", label: "Clothing", note: "Dress for the weather, not the photo." },
  { id: "hygiene", label: "Health & hygiene", note: "Small kit, big difference." },
  { id: "safety", label: "Safety & tools", note: "The bag you hope stays closed." },
  { id: "extras", label: "Extras", note: "Comfort, fun, and the stuff you will be glad you brought." },
];

const people = (ctx) => String(ctx.people);
const tents = (ctx) => String(ctx.tents);
const nights = (ctx) => String(ctx.nights);
const pairs = (ctx) => String(Math.max(1, ctx.nights + 1));
const water = (ctx) => `${Math.max(2, Math.ceil(ctx.people * ctx.nights * 0.75))} gal`;

const I = (id, name, category, opts = {}) => ({ id, name, category, ...opts });

export const ITEMS = [
  I("tent", "Tent", "shelter", { trips: ["tent", "car", "backcountry"], quantity: tents, note: "Check the poles, stakes, and rain fly before you leave." }),
  I("footprint", "Tent footprint", "shelter", { trips: ["tent", "car", "backcountry"] }),
  I("stakes", "Extra stakes and guylines", "shelter", { trips: ["tent", "car", "backcountry"] }),
  I("mallet", "Mallet", "shelter", { trips: ["tent", "car"] }),
  I("sleeping-bag", "Sleeping bag", "shelter", { quantity: people }),
  I("sleeping-pad", "Sleeping pad", "shelter", { quantity: people }),
  I("pillow", "Pillow", "shelter", { quantity: people }),
  I("headlamp", "Headlamp", "shelter", { quantity: people, note: "Pack spare batteries or a charging cable." }),
  I("lantern", "Lantern", "shelter"),
  I("chair", "Camp chair", "shelter", { quantity: people, trips: ["tent", "car", "rv"] }),
  I("tarp", "Tarp and cord", "shelter", { weather: ["wet", "cool", "cold"] }),
  I("air-mattress", "Air mattress and pump", "shelter", { trips: ["car"] }),
  I("levelers", "Leveling blocks and chocks", "shelter", { trips: ["rv"] }),
  I("awning-mat", "Awning mat", "shelter", { trips: ["rv"] }),
  I("hammock", "Hammock", "shelter", { activities: ["hike", "fire"], trips: ["tent", "car"] }),

  I("stove", "Camp stove", "kitchen", { trips: ["tent", "car", "backcountry"] }),
  I("fuel", "Stove fuel", "kitchen", { trips: ["tent", "car", "backcountry"], quantity: (ctx) => String(Math.max(1, Math.ceil(ctx.nights / 2))) }),
  I("cookset", "Cookset and lid", "kitchen", { trips: ["tent", "car", "backcountry"] }),
  I("plates", "Plates and bowls", "kitchen", { quantity: people }),
  I("mugs", "Mugs", "kitchen", { quantity: people }),
  I("utensils", "Utensils", "kitchen", { quantity: people }),
  I("knife", "Pocket knife or multi-tool", "kitchen"),
  I("cooler", "Cooler and ice", "kitchen", { trips: ["tent", "car", "rv"] }),
  I("water", "Drinking water", "kitchen", { quantity: water, note: "Bring extra if the site has no potable water." }),
  I("bottles", "Water bottles", "kitchen", { quantity: people }),
  I("food", "Food and snacks", "kitchen", { quantity: (ctx) => `${ctx.nights + 1} days`, note: "Plan one extra meal in case the trip runs long." }),
  I("coffee", "Coffee or tea kit", "kitchen", { trips: ["tent", "car", "rv"] }),
  I("dish-soap", "Dish soap and sponge", "kitchen"),
  I("trash-bags", "Trash bags", "kitchen"),
  I("foil", "Foil or grill mat", "kitchen", { activities: ["cook", "fire"] }),
  I("fire-starter", "Fire starter and matches", "kitchen", { activities: ["fire", "cook"], note: "Check the fire rules and burn ban before you light anything." }),
  I("tablecloth", "Tablecloth", "kitchen", { trips: ["tent", "car", "rv"] }),
  I("dehydrated", "Dehydrated meals", "kitchen", { trips: ["backcountry"], quantity: (ctx) => String(ctx.people * Math.max(1, ctx.nights)) }),
  I("bear-can", "Bear canister", "kitchen", { trips: ["backcountry"], note: "Required in many backcountry areas. Check local rules." }),

  I("base-layer", "Base layers", "clothing", { quantity: people }),
  I("socks", "Socks", "clothing", { quantity: (ctx) => `${people(ctx)} × ${pairs(ctx)} pairs` }),
  I("underwear", "Underwear", "clothing", { quantity: (ctx) => `${people(ctx)} × ${pairs(ctx)} pairs` }),
  I("warm-layer", "Warm layer or fleece", "clothing", { quantity: people, weather: ["cool", "cold", "wet"] }),
  I("rain-jacket", "Rain jacket", "clothing", { quantity: people, weather: ["wet", "cool", "cold"] }),
  I("hat", "Sun hat", "clothing", { quantity: people, weather: ["warm"] }),
  I("beanie", "Beanie and gloves", "clothing", { quantity: people, weather: ["cold"] }),
  I("boots", "Hiking boots", "clothing", { quantity: people }),
  I("camp-shoes", "Camp shoes or sandals", "clothing", { quantity: people }),
  I("swimsuit", "Swimsuit", "clothing", { quantity: people, activities: ["swim"] }),
  I("towel", "Quick-dry towel", "clothing", { quantity: people, activities: ["swim", "hike"] }),
  I("dry-bag", "Dry bag", "clothing", { weather: ["wet"] }),

  I("toothbrush", "Toothbrush and toothpaste", "hygiene", { quantity: people }),
  I("soap", "Biodegradable soap", "hygiene"),
  I("sunscreen", "Sunscreen", "hygiene", { weather: ["warm", "cool"] }),
  I("bug-spray", "Insect repellent", "hygiene", { weather: ["warm", "cool", "wet"] }),
  I("first-aid", "First-aid kit", "hygiene", { note: "Add personal medications and a blister kit." }),
  I("meds", "Personal medications", "hygiene"),
  I("tp", "Toilet paper and trowel", "hygiene", { trips: ["tent", "car", "rv", "backcountry"] }),
  I("sanitizer", "Hand sanitizer", "hygiene"),
  I("wipes", "Baby wipes", "hygiene", { kids: true }),
  I("period", "Period products", "hygiene"),

  I("map", "Map and compass", "safety", { trips: ["tent", "backcountry"] }),
  I("whistle", "Whistle", "safety"),
  I("power-bank", "Power bank and cables", "safety"),
  I("multi-tool", "Multi-tool and repair kit", "safety"),
  I("duct-tape", "Duct tape", "safety"),
  I("emergency-blanket", "Emergency blanket", "safety"),
  I("water-filter", "Water filter or purification", "safety", { trips: ["backcountry"] }),
  I("beacon", "Satellite messenger or beacon", "safety", { trips: ["backcountry"], note: "Cell service is not a plan." }),
  I("bear-spray", "Bear spray", "safety", { trips: ["backcountry"], note: "Check local rules and carry it where it is legal and needed." }),
  I("fire-ext", "Fire extinguisher", "safety", { trips: ["rv"] }),
  I("co-detector", "Carbon monoxide detector", "safety", { trips: ["rv"] }),
  I("sewer-hose", "Sewer hose and gloves", "safety", { trips: ["rv"] }),
  I("power-cord", "Power cord and surge protector", "safety", { trips: ["rv"] }),
  I("water-hose", "Fresh-water hose", "safety", { trips: ["rv"] }),

  I("camera", "Camera", "extras"),
  I("book", "Book or cards", "extras"),
  I("binoculars", "Binoculars", "extras", { activities: ["hike"] }),
  I("fishing", "Fishing rod, tackle, and license", "extras", { activities: ["fish"], note: "A license is required in most places." }),
  I("poles", "Trekking poles", "extras", { activities: ["hike"] }),
  I("games", "Camp games", "extras", { kids: true }),
  I("nightlight", "Night light", "extras", { kids: true }),
  I("leash", "Leash and collar", "extras", { dogs: true }),
  I("dog-food", "Dog food and bowls", "extras", { dogs: true, quantity: (ctx) => `${ctx.dogs} dogs` }),
  I("dog-bags", "Waste bags", "extras", { dogs: true }),
  I("dog-towel", "Dog towel", "extras", { dogs: true }),
];

function normalize(input) {
  const tripType = TRIP_TYPES.some((item) => item.id === input.tripType) ? input.tripType : "tent";
  const weather = WEATHERS.some((item) => item.id === input.weather) ? input.weather : "warm";
  const nightsValue = Number(input.nights);
  const adultsValue = Number(input.adults);
  const kidsValue = Number(input.kids) || 0;
  const dogsValue = Number(input.dogs) || 0;
  if (!Number.isInteger(nightsValue) || nightsValue < 1 || nightsValue > 21) {
    return { error: "Enter a trip length between 1 and 21 nights." };
  }
  if (!Number.isInteger(adultsValue) || adultsValue < 1 || adultsValue > 10) {
    return { error: "Enter between 1 and 10 adults." };
  }
  if (kidsValue < 0 || kidsValue > 8 || dogsValue < 0 || dogsValue > 4) {
    return { error: "Check the kids and dogs counts." };
  }
  const activities = Array.isArray(input.activities) ? input.activities.filter((id) => ACTIVITIES.some((item) => item.id === id)) : [];
  return { tripType, weather, nights: nightsValue, adults: adultsValue, kids: kidsValue, dogs: dogsValue, activities };
}

function matches(item, ctx) {
  if (item.trips && !item.trips.includes(ctx.tripType)) return false;
  if (item.weather && !item.weather.includes(ctx.weather)) return false;
  if (item.activities && !item.activities.some((id) => ctx.activities.includes(id))) return false;
  if (item.kids && ctx.kids < 1) return false;
  if (item.dogs && ctx.dogs < 1) return false;
  return true;
}

export function generateChecklist(input) {
  const data = normalize(input);
  if (data.error) return data;
  const peopleCount = data.adults + data.kids;
  const tentCount = Math.max(1, Math.ceil(peopleCount / 4));
  const ctx = { ...data, people: peopleCount, tents: tentCount };
  const categories = CATEGORIES.map((category) => {
    const items = ITEMS
      .filter((item) => item.category === category.id && matches(item, ctx))
      .map((item) => ({
        id: item.id,
        name: item.name,
        note: item.note || "",
        quantity: typeof item.quantity === "function" ? item.quantity(ctx) : "",
      }));
    return { ...category, items };
  }).filter((category) => category.items.length > 0);
  const total = categories.reduce((sum, category) => sum + category.items.length, 0);
  return { ...ctx, categories, total };
}

export function checklistText(result, done = new Set()) {
  if (!result || result.error) return "";
  const lines = [
    `Camp Ready pack list — ${result.tripType}, ${result.nights} night${result.nights === 1 ? "" : "s"}`,
    `${result.adults} adult${result.adults === 1 ? "" : "s"} · ${result.kids} kid${result.kids === 1 ? "" : "s"} · ${result.weather}`,
    "",
  ];
  for (const category of result.categories) {
    lines.push(category.label.toUpperCase());
    for (const item of category.items) {
      const mark = done.has(item.id) ? "[x]" : "[ ]";
      lines.push(`${mark} ${item.name}${item.quantity ? ` — ${item.quantity}` : ""}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}
