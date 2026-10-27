export const FURNISHED_OPTIONS = [
  { id: "unfurnished", label: "Unfurnished" },
  { id: "semi", label: "Semi-furnished" },
  { id: "furnished", label: "Furnished" },
];

export const PET_OPTIONS = [
  { id: "none", label: "No pets" },
  { id: "cat", label: "Cat" },
  { id: "dog", label: "Dog" },
];

export const KITCHEN_OPTIONS = [
  { id: "none", label: "Starting from zero" },
  { id: "partial", label: "A few basics" },
  { id: "full", label: "Already stocked" },
];

export const PHASES = [
  { id: "before", label: "Before move-in", note: "Paperwork, utilities, and the first cleaning." },
  { id: "day", label: "Move-in day", note: "Keys, photos, and the bed before the boxes." },
  { id: "week", label: "First week", note: "The small things that make it feel like home." },
  { id: "month", label: "First month", note: "Budget, maintenance, and the habits that stick." },
];

const ROOM_LABELS = {
  admin: "Paperwork",
  bedroom: "Bedroom",
  kitchen: "Kitchen",
  bath: "Bathroom",
  living: "Living",
  cleaning: "Cleaning",
  safety: "Safety",
  pets: "Pets",
  firstweek: "First week",
  money: "Money",
};

const I = (id, title, phase, room, cost, opts = {}) => ({ id, title, phase, room, cost, ...opts });

export const ITEMS = [
  I("lease", "Lease, addenda, and move-in rules", "before", "admin", 0),
  I("insurance", "Renter’s insurance policy", "before", "admin", 20, { note: "Liability coverage is often cheaper than one accident." }),
  I("utilities", "Set up electricity, gas, and water", "before", "admin", 0),
  I("internet", "Book internet installation", "before", "admin", 40),
  I("address", "Change your address", "before", "admin", 0),
  I("inspection", "Move-in inspection and date-stamped photos", "day", "admin", 0, { note: "Photograph walls, floors, appliances, and meters before furniture." }),
  I("parking", "Parking permit or guest pass", "before", "admin", 20),
  I("keys", "Collect keys, fobs, and mailbox key", "day", "admin", 0),
  I("budget", "Set a first-month budget", "month", "money", 0),
  I("rent", "Calendar the rent, utilities, and insurance due dates", "month", "money", 0),

  I("bed", "Bed frame and mattress", "day", "bedroom", 320, { furniture: true }),
  I("bedding", "Sheets, duvet, and mattress protector", "before", "bedroom", 70),
  I("pillows", "Pillows", "before", "bedroom", 30),
  I("nightstand", "Nightstand", "week", "bedroom", 50, { furniture: true }),
  I("lamp", "Bedside lamp", "week", "bedroom", 25),
  I("hangers", "Hangers", "week", "bedroom", 10),
  I("hamper", "Laundry hamper", "week", "bedroom", 20),
  I("curtains", "Blackout curtains", "week", "bedroom", 30),
  I("bedroom-trash", "Small bedroom trash can", "week", "bedroom", 10),

  I("plates", "Plates and bowls", "week", "kitchen", 25, { quantity: true }),
  I("mugs", "Mugs and glasses", "week", "kitchen", 15, { quantity: true }),
  I("utensils", "Utensils", "week", "kitchen", 15, { quantity: true }),
  I("cookware", "Cookware set", "week", "kitchen", 80, { kitchen: true }),
  I("pan", "Frying pan", "week", "kitchen", 25, { kitchen: true }),
  I("board", "Cutting board", "week", "kitchen", 15, { kitchen: true }),
  I("knife", "Chef’s knife", "week", "kitchen", 20, { kitchen: true }),
  I("can-opener", "Can opener", "week", "kitchen", 8, { kitchen: true }),
  I("containers", "Food storage containers", "week", "kitchen", 20, { kitchen: true }),
  I("dish-towels", "Dish towels", "week", "kitchen", 10),
  I("dish-soap", "Dish soap and sponge", "week", "kitchen", 8),
  I("trash", "Kitchen trash can and bags", "week", "kitchen", 25),
  I("broom", "Broom and dustpan", "week", "kitchen", 20),
  I("pantry", "Starter pantry and spices", "week", "kitchen", 40),

  I("shower-curtain", "Shower curtain and liner", "day", "bath", 20),
  I("bath-mat", "Bath mat", "week", "bath", 15),
  I("towels", "Towels", "week", "bath", 40, { quantity: true }),
  I("toilet-brush", "Toilet brush and plunger", "week", "bath", 20),
  I("toilet-paper", "Toilet paper", "week", "bath", 10),
  I("toiletries", "Soap, shampoo, and toiletries", "week", "bath", 15),
  I("first-aid", "First-aid kit", "week", "bath", 20),
  I("bath-trash", "Small bathroom trash can", "week", "bath", 10),

  I("sofa", "Sofa", "week", "living", 400, { furniture: true }),
  I("coffee-table", "Coffee table", "week", "living", 80, { furniture: true }),
  I("rug", "Living room rug", "week", "living", 60),
  I("floor-lamp", "Floor lamp", "week", "living", 30),
  I("shelf", "Bookshelf or storage unit", "week", "living", 60, { furniture: true }),

  I("cleaner", "All-purpose cleaner", "day", "cleaning", 10),
  I("glass-cleaner", "Glass cleaner", "week", "cleaning", 7),
  I("wipes", "Disinfecting wipes", "week", "cleaning", 8),
  I("mop", "Mop and bucket", "week", "cleaning", 25),
  I("vacuum", "Vacuum", "week", "cleaning", 120),
  I("paper-towels", "Paper towels", "week", "cleaning", 8),
  I("gloves", "Cleaning gloves", "week", "cleaning", 5),

  I("extinguisher", "Fire extinguisher", "day", "safety", 25),
  I("alarms", "Test smoke and CO alarms", "day", "safety", 0, { note: "Ask the landlord who maintains them; report a missing or expired alarm." }),
  I("flashlight", "Flashlight and batteries", "week", "safety", 20),
  I("contacts", "Emergency contacts and building maintenance number", "day", "safety", 0),
  I("locks", "Check door and window locks", "day", "safety", 0),

  I("pet-deposit", "Pet deposit and pet rent", "before", "pets", 200, { pets: true }),
  I("litter", "Litter box and litter", "day", "pets", 40, { pets: ["cat"] }),
  I("pet-food", "Pet food and bowls", "week", "pets", 30, { pets: true }),
  I("leash", "Leash, collar, and ID tag", "week", "pets", 25, { pets: ["dog"] }),
  I("vet-records", "Vet records and microchip info", "week", "pets", 0, { pets: true }),

  I("groceries", "First grocery run", "week", "firstweek", 75),
  I("laundry", "Laundry supplies", "week", "firstweek", 15),
  I("trash-schedule", "Find the trash and recycling schedule", "week", "firstweek", 0),
  I("neighbors", "Introduce yourself to a neighbor or the building manager", "month", "firstweek", 0),
];

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function normalize(input) {
  const roommates = Math.max(0, Math.min(5, Number(input.roommates) || 0));
  const budget = Number(input.budget);
  const furnished = FURNISHED_OPTIONS.some((item) => item.id === input.furnished) ? input.furnished : "unfurnished";
  const pets = PET_OPTIONS.some((item) => item.id === input.pets) ? input.pets : "none";
  const kitchen = KITCHEN_OPTIONS.some((item) => item.id === input.kitchen) ? input.kitchen : "none";
  if (input.budget !== "" && input.budget !== undefined && (!Number.isFinite(budget) || budget < 0 || budget > 20000)) {
    return { error: "Enter a budget between $0 and $20,000." };
  }
  return { roommates, budget: input.budget === "" || input.budget === undefined ? null : budget, furnished, pets, kitchen };
}

function matches(item, data) {
  if (item.furniture && data.furnished !== "unfurnished") return false;
  if (item.kitchen && data.kitchen === "full") return false;
  if (item.pets) {
    if (!data.pets || data.pets === "none") return false;
    if (Array.isArray(item.pets) && !item.pets.includes(data.pets)) return false;
  }
  return true;
}

export function buildApartmentChecklist(input) {
  const data = normalize(input);
  if (data.error) return data;
  const people = data.roommates + 1;
  const items = ITEMS
    .filter((item) => matches(item, data))
    .map((item) => ({
      ...item,
      roomLabel: ROOM_LABELS[item.room] || item.room,
      quantity: item.quantity ? String(people) : "",
      cost: item.cost,
    }));
  const phases = PHASES.map((phase) => ({
    ...phase,
    items: items.filter((item) => item.phase === phase.id),
  })).filter((phase) => phase.items.length);
  const total = items.reduce((sum, item) => sum + item.cost * (item.quantity ? people : 1), 0);
  return {
    ...data,
    people,
    phases,
    total: Math.round(total),
    perPerson: Math.round(total / people),
    itemCount: items.length,
  };
}

export function formatMoney(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function checklistText(result, done = new Set()) {
  if (!result || result.error) return "";
  const lines = [
    "Last Box — first apartment checklist",
    `${result.people} people · ${result.furnished} · estimated ${formatMoney(result.total)}`,
    "",
  ];
  for (const phase of result.phases) {
    lines.push(phase.label.toUpperCase());
    for (const item of phase.items) {
      lines.push(`${done.has(item.id) ? "[x]" : "[ ]"} ${item.title}${item.quantity ? ` — ${item.quantity}` : ""}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}
