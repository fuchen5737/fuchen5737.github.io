export const PUPPY_AGES = [
  { id: "8-12w", label: "8–12 weeks" },
  { id: "3-6m", label: "3–6 months" },
  { id: "6-12m", label: "6–12 months" },
  { id: "adult", label: "1 year or older" },
];

export const PUPPY_SIZES = [
  { id: "small", label: "Small (under 20 lb)" },
  { id: "medium", label: "Medium (20–50 lb)" },
  { id: "large", label: "Large (50+ lb)" },
];

export const PUPPY_HOMES = [
  { id: "apartment", label: "Apartment" },
  { id: "house", label: "House" },
];

export const PHASES = [
  { id: "before", label: "Before pickup", note: "Buy the basics and make one safe room." },
  { id: "day", label: "First 24 hours", note: "Water, potty, rest, and a quiet crate." },
  { id: "week", label: "First week", note: "A routine, a vet visit, and very short outings." },
  { id: "month", label: "First month", note: "Training, socialization, and the vet plan." },
];

const I = (id, title, phase, category, opts = {}) => ({ id, title, phase, category, ...opts });

export const ITEMS = [
  I("crate", "Crate with room to stand and turn around", "before", "Supplies", { note: "A crate is a bedroom, not a punishment. Add a soft bed and leave the door open during the day." }),
  I("bed", "Washable dog bed", "before", "Supplies"),
  I("bowls", "Food and water bowls", "before", "Supplies", { quantity: "2" }),
  I("puppy-food", "Puppy food", "before", "Supplies", { ages: ["8-12w", "3-6m", "6-12m"], note: "Ask the breeder or shelter what the puppy is eating and transition slowly." }),
  I("adult-food", "Adult dog food", "before", "Supplies", { ages: ["adult"] }),
  I("treats", "Small training treats", "before", "Supplies"),
  I("collar", "Collar or harness with ID tag", "before", "Supplies", { note: "Check the fit every few weeks; puppies grow fast." }),
  I("leash", "Leash", "before", "Supplies"),
  I("pads", "Potty pads", "before", "Supplies", { homes: ["apartment"] }),
  I("cleaner", "Enzyme cleaner", "before", "Supplies", { note: "Regular cleaner does not remove the scent that invites a repeat." }),
  I("poop-bags", "Poop bags", "before", "Supplies"),
  I("toys", "Puppy toys", "before", "Supplies", { quantity: "3" }),
  I("chews", "Puppy-safe chew toys", "before", "Supplies", { note: "Match the chew to the puppy’s size; avoid cooked bones and hard antlers." }),
  I("brush", "Brush and grooming basics", "before", "Supplies"),
  I("toothbrush", "Dog toothbrush and toothpaste", "before", "Supplies", { note: "Never use human toothpaste." }),
  I("carrier", "Travel carrier or car restraint", "before", "Supplies"),
  I("first-aid", "Dog first-aid kit", "before", "Health"),
  I("gate", "Baby gate", "before", "Home", { kids: true, cats: true }),
  I("cat-space", "Separate cat-only room and elevated cat space", "before", "Home", { cats: true, note: "The cat needs an escape route and a quiet place to eat." }),
  I("kid-toys", "A box for the child’s toys", "before", "Home", { kids: true, note: "Keep toys and puppy chews separate to prevent possessive behavior." }),

  I("safe-room", "Puppy-proof one room", "before", "Home", { note: "Cords, plants, trash, medications, shoes, and small objects off the floor." }),
  I("water", "Fresh water", "day", "Routine"),
  I("potty", "Potty break outside or on the pad", "day", "Routine", { note: "Go out immediately after waking, eating, playing, and before bed." }),
  I("crate-intro", "First positive crate session", "day", "Training", { note: "Feed a treat inside, close the door for seconds, then open it before the puppy fusses." }),
  I("rest", "Quiet rest time", "day", "Routine", { note: "Puppies need sleep — often 16–20 hours a day for young puppies." }),
  I("intro-kids", "Calm introduction to children", "day", "Home", { kids: true, note: "Sit on the floor, keep voices low, and let the puppy approach first." }),
  I("intro-cat", "Scent swap with the cat", "day", "Home", { cats: true, note: "No face-to-face meeting yet; swap bedding and reward calm behavior." }),

  I("schedule", "Write the feeding and potty schedule", "week", "Routine", { note: "Puppies do better with the same order every day." }),
  I("vet", "First vet visit", "week", "Health", { note: "Bring vaccine and deworming records from the breeder or shelter." }),
  I("vaccines", "Book the vaccine series", "week", "Health", { ages: ["8-12w", "3-6m", "6-12m"], note: "Do not take an unvaccinated puppy to busy dog areas." }),
  I("flea", "Flea, tick, and parasite prevention", "week", "Health", { note: "Use a product labeled for the puppy’s age and weight; ask the vet." }),
  I("microchip", "Microchip and registration", "week", "Health"),
  I("insurance", "Decide on pet insurance or a vet fund", "week", "Health"),
  I("potty-routine", "Potty every 1–2 hours", "week", "Training", { ages: ["8-12w"], note: "Take the puppy out after every nap, meal, and play session." }),
  I("name", "Practice the name", "week", "Training", { note: "Say the name, mark with a treat, repeat five times. Keep it short." }),
  I("crate-routine", "Short crate sessions", "week", "Training", { note: "Build up from seconds to minutes while you are still in the room." }),
  I("bite", "Redirect puppy biting", "week", "Training", { note: "Offer a chew toy and pause play; do not punish with your hand." }),
  I("alone", "First short alone time", "week", "Training", { note: "Start with a minute, then build. A camera can help you see the difference between fussing and panic." }),
  I("social", "One calm, vaccinated social visit", "week", "Training", { note: "Carry the puppy or meet one healthy, vaccinated dog in a private yard." }),
  I("groom", "Touch paws, ears, and mouth", "week", "Training", { note: "Pair each touch with a treat; make the vet exam easier later." }),
  I("sleep", "Set the sleep spot", "week", "Routine", { note: "Decide where the puppy sleeps before the first night and keep it consistent." }),

  I("training", "Enroll in a puppy class", "month", "Training", { note: "Look for a positive-reinforcement class with vaccinated puppies." }),
  I("walk", "Start short leash walks", "month", "Training", { note: "Keep walks short and away from busy dog traffic until the vaccine series is complete." }),
  I("recall", "Practice recall in the house", "month", "Training", { note: "One cue, high-value treat, never punish a dog for coming to you." }),
  I("groom-visit", "First grooming or nail trim", "month", "Health"),
  I("teeth", "Start brushing teeth", "month", "Health", { note: "A few seconds at a time; build the habit early." }),
  I("weight", "Track weight and body condition", "month", "Health", { sizes: ["small", "medium", "large"], note: "Ask the vet for a healthy weight range for the adult size." }),
  I("spay", "Plan spay/neuter timing", "month", "Health", { note: "Ask the vet; timing varies by size and breed." }),
  I("budget", "Set a monthly pet budget", "month", "Money", { note: "Food, vet care, insurance, grooming, and training add up." }),
  I("routine", "Lock in the daily routine", "month", "Routine", { note: "Feeding, potty, exercise, training, rest, repeat." }),
];

function normalize(input) {
  const age = PUPPY_AGES.some((item) => item.id === input.age) ? input.age : "8-12w";
  const size = PUPPY_SIZES.some((item) => item.id === input.size) ? input.size : "medium";
  const home = PUPPY_HOMES.some((item) => item.id === input.home) ? input.home : "house";
  return { age, size, home, kids: Boolean(input.kids), cats: Boolean(input.cats) };
}

function matches(item, data) {
  if (item.ages && !item.ages.includes(data.age)) return false;
  if (item.sizes && !item.sizes.includes(data.size)) return false;
  if (item.homes && !item.homes.includes(data.home)) return false;
  if (item.kids && !data.kids) return false;
  if (item.cats && !data.cats) return false;
  return true;
}

export function buildPuppyChecklist(input) {
  const data = normalize(input);
  const phases = PHASES.map((phase) => ({
    ...phase,
    items: ITEMS.filter((item) => item.phase === phase.id && matches(item, data)).map((item) => ({
      ...item,
      sizeNote: item.id === "crate" ? PUPPY_SIZES.find((size) => size.id === data.size)?.label : "",
    })),
  })).filter((phase) => phase.items.length);
  const total = phases.reduce((sum, phase) => sum + phase.items.length, 0);
  return { ...data, phases, total };
}

export function checklistText(result, done = new Set()) {
  if (!result) return "";
  const lines = ["Good Dog Name — new puppy checklist", `${PUPPY_AGES.find((item) => item.id === result.age)?.label} · ${PUPPY_SIZES.find((item) => item.id === result.size)?.label} · ${result.home}`, ""];
  for (const phase of result.phases) {
    lines.push(phase.label.toUpperCase());
    for (const item of phase.items) lines.push(`${done.has(item.id) ? "[x]" : "[ ]"} ${item.title}`);
    lines.push("");
  }
  return lines.join("\n");
}
