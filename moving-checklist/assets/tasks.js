export const MOVE_TYPES = [
  { id: "apartment", label: "Apartment", note: "Elevators, parking, building rules" },
  { id: "house", label: "House", note: "Utilities, garage, lawn, big furniture" },
  { id: "cross-country", label: "Cross-country", note: "Travel, car, mail, first nights" },
];

export const PHASES = [
  { id: "8w", label: "8 weeks out", note: "Set the plan" },
  { id: "6w", label: "6 weeks out", note: "Book and sort" },
  { id: "4w", label: "4 weeks out", note: "Pack the rooms" },
  { id: "2w", label: "2 weeks out", note: "Close the loops" },
  { id: "1w", label: "1 week out", note: "Pack the essentials" },
  { id: "day", label: "Move day", note: "Keys, meters, boxes" },
  { id: "after", label: "After the move", note: "Land and settle" },
];

const ALL = ["all"];

export const TASKS = [
  // 8 weeks
  { id: "budget", phase: "8w", offsetDays: -56, category: "Plan", types: ALL, title: "Set your moving budget", detail: "Include movers, deposits, supplies, and the first week of food." },
  { id: "movers", phase: "8w", offsetDays: -56, category: "Plan", types: ALL, title: "Book movers or a truck", detail: "Get three quotes; confirm insurance and the delivery window." },
  { id: "declutter", phase: "8w", offsetDays: -56, category: "Pack", types: ALL, title: "Start the declutter", detail: "One room at a time: keep, donate, sell, toss." },
  { id: "folder", phase: "8w", offsetDays: -56, category: "Admin", types: ALL, title: "Start a moving folder", detail: "Contracts, receipts, inventory, and a running to-do list in one place." },
  { id: "utilities", phase: "8w", offsetDays: -56, category: "Admin", types: ALL, title: "Set up utilities", detail: "Schedule shutoff at the old place and activation at the new one." },
  { id: "cleaners", phase: "8w", offsetDays: -56, category: "Home", types: ALL, title: "Book cleaners", detail: "A deep clean at the old place; a fresh start at the new one." },
  { id: "school", phase: "8w", offsetDays: -56, category: "Family", types: ALL, title: "Request school records", detail: "Ask for records and transfer forms before the office gets busy." },
  { id: "vet", phase: "8w", offsetDays: -56, category: "Pets", types: ALL, title: "Update vet and pet records", detail: "Get records, refill meds, and confirm travel rules for pets." },

  // 6 weeks
  { id: "supplies", phase: "6w", offsetDays: -42, category: "Pack", types: ALL, title: "Order boxes and supplies", detail: "Boxes, tape, markers, bubble wrap, and a box cutter." },
  { id: "measure", phase: "6w", offsetDays: -42, category: "Plan", types: ["house"], title: "Measure the big furniture", detail: "Doorways, stairs, and the new rooms: will the sofa actually fit?" },
  { id: "donate", phase: "6w", offsetDays: -42, category: "Pack", types: ALL, title: "Donate or sell the extras", detail: "Book a pickup now; don't wait until the last week." },
  { id: "address", phase: "6w", offsetDays: -42, category: "Admin", types: ALL, title: "Change your address", detail: "Mail forwarding, bank, insurance, subscriptions, and voter registration." },
  { id: "insurance", phase: "6w", offsetDays: -42, category: "Admin", types: ALL, title: "Check insurance", detail: "Renters or homeowners coverage for the move and the new place." },
  { id: "elevator", phase: "6w", offsetDays: -42, category: "Plan", types: ["apartment"], title: "Reserve the elevator or parking", detail: "Buildings need notice; trucks need a place to stop." },
  { id: "seasonal", phase: "6w", offsetDays: -42, category: "Pack", types: ALL, title: "Pack off-season clothes", detail: "The items you won't need for a month are the easiest boxes to start." },

  // 4 weeks
  { id: "room", phase: "4w", offsetDays: -28, category: "Pack", types: ALL, title: "Pack room by room", detail: "Label each box with the room and a one-line contents note." },
  { id: "confirm", phase: "4w", offsetDays: -28, category: "Plan", types: ALL, title: "Confirm the movers", detail: "Reconfirm arrival window, crew size, payment, and COI." },
  { id: "shutoff", phase: "4w", offsetDays: -28, category: "Admin", types: ALL, title: "Schedule utility shutoff", detail: "Water, gas, electric, internet, and trash." },
  { id: "mail", phase: "4w", offsetDays: -28, category: "Admin", types: ALL, title: "Forward your mail", detail: "USPS forwarding plus a list of anyone who still mails you." },
  { id: "subs", phase: "4w", offsetDays: -28, category: "Admin", types: ALL, title: "Update subscriptions", detail: "Delivery boxes, magazines, and anything tied to the old address." },
  { id: "help", phase: "4w", offsetDays: -28, category: "Family", types: ALL, title: "Arrange move-day help", detail: "Childcare, pet care, and a person who can answer the phone." },
  { id: "docs", phase: "4w", offsetDays: -28, category: "Admin", types: ALL, title: "Back up documents", detail: "IDs, lease, insurance, medical, and school records in one cloud folder." },

  // 2 weeks
  { id: "kitchen", phase: "2w", offsetDays: -14, category: "Pack", types: ALL, title: "Pack the kitchen", detail: "Keep one pot, one pan, and the coffee maker out until the last day." },
  { id: "label", phase: "2w", offsetDays: -14, category: "Pack", types: ALL, title: "Label every box", detail: "Room, priority, and a number that matches your inventory list." },
  { id: "essentials", phase: "2w", offsetDays: -14, category: "Pack", types: ALL, title: "Pack the essentials box", detail: "Chargers, toiletries, meds, snacks, sheets, and a change of clothes." },
  { id: "travel", phase: "2w", offsetDays: -14, category: "Plan", types: ["cross-country"], title: "Confirm travel and lodging", detail: "Flights, rental car, hotel, and the first night's keys." },
  { id: "returns", phase: "2w", offsetDays: -14, category: "Admin", types: ALL, title: "Return borrowed items", detail: "Tools, books, dishes, and anything that belongs to someone else." },
  { id: "fridge", phase: "2w", offsetDays: -14, category: "Home", types: ALL, title: "Eat down the fridge", detail: "Plan meals around what's left; defrost the freezer." },

  // 1 week
  { id: "suitcase", phase: "1w", offsetDays: -7, category: "Pack", types: ALL, title: "Pack the first-night suitcases", detail: "Treat the first 48 hours like a trip, not a move." },
  { id: "defrost", phase: "1w", offsetDays: -7, category: "Home", types: ALL, title: "Defrost and clean the fridge", detail: "Tape the doors, drain the lines, and leave it dry." },
  { id: "walkthrough", phase: "1w", offsetDays: -7, category: "Plan", types: ALL, title: "Do the final walkthrough", detail: "Open every closet, cabinet, and storage nook." },
  { id: "tech", phase: "1w", offsetDays: -7, category: "Admin", types: ALL, title: "Charge and pack devices", detail: "Chargers, power strips, router, and the tiny screws." },
  { id: "cash", phase: "1w", offsetDays: -7, category: "Plan", types: ALL, title: "Get cash for tips", detail: "Movers, cleaners, and the person who saves you at the door." },
  { id: "keys", phase: "1w", offsetDays: -7, category: "Admin", types: ALL, title: "Confirm keys and access", detail: "New keys, gate codes, parking passes, and building contacts." },

  // Move day
  { id: "meters", phase: "day", offsetDays: 0, category: "Admin", types: ALL, title: "Take meter readings", detail: "Photograph the meters at both places." },
  { id: "inventory", phase: "day", offsetDays: 0, category: "Pack", types: ALL, title: "Number the boxes", detail: "Match each box to the inventory and note any damage." },
  { id: "water", phase: "day", offsetDays: 0, category: "Pack", types: ALL, title: "Pack water and snacks", detail: "For the crew and for you; move day is longer than you think." },
  { id: "rooms", phase: "day", offsetDays: 0, category: "Plan", types: ALL, title: "Check every room", detail: "Closets, cabinets, garage, attic, and the outlet you forgot." },
  { id: "paperwork", phase: "day", offsetDays: 0, category: "Admin", types: ALL, title: "Sign and save the paperwork", detail: "Bill of lading, receipt, and the crew's contact." },
  { id: "lock", phase: "day", offsetDays: 0, category: "Admin", types: ALL, title: "Lock up and return keys", detail: "Old keys, fobs, mailbox keys, and the parking pass." },

  // After
  { id: "unpack", phase: "after", offsetDays: 1, category: "Home", types: ALL, title: "Unpack the essentials first", detail: "Beds, towels, toiletries, and the coffee maker." },
  { id: "damage", phase: "after", offsetDays: 2, category: "Admin", types: ALL, title: "Inspect and file claims", detail: "Photograph damage and note it before the boxes disappear." },
  { id: "car", phase: "after", offsetDays: 14, category: "Admin", types: ["cross-country"], title: "Register the car and license", detail: "New state rules, insurance, and the inspection window." },
  { id: "local", phase: "after", offsetDays: 14, category: "Family", types: ALL, title: "Find a local vet and doctor", detail: "Ask neighbors or the building group for a recommendation." },
  { id: "update", phase: "after", offsetDays: 14, category: "Admin", types: ALL, title: "Update bank, insurance, employer", detail: "Anything that still has the old address." },
  { id: "review", phase: "after", offsetDays: 14, category: "Admin", types: ALL, title: "Thank the crew", detail: "A short review helps the next person and takes two minutes." },
];

export function parseMoveDate(value) {
  if (!value) return null;
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function formatDue(date, today = new Date()) {
  const sameYear = date.getFullYear() === today.getFullYear();
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(sameYear ? {} : { year: "numeric" }),
  });
}

export function isPastDate(date, today = new Date()) {
  const a = new Date(date);
  const b = new Date(today);
  a.setHours(0, 0, 0, 0);
  b.setHours(0, 0, 0, 0);
  return a < b;
}

export function buildPlan(moveDateValue, moveType) {
  const moveDate = parseMoveDate(moveDateValue);
  if (!moveDate) return null;
  if (!MOVE_TYPES.some((type) => type.id === moveType)) return null;

  const tasks = TASKS
    .filter((task) => task.types.includes("all") || task.types.includes(moveType))
    .map((task) => ({
      ...task,
      due: addDays(moveDate, task.offsetDays),
    }));

  const groups = PHASES
    .map((phase) => ({
      ...phase,
      tasks: tasks
        .filter((task) => task.phase === phase.id)
        .sort((a, b) => a.due - b.due || a.title.localeCompare(b.title)),
    }))
    .filter((group) => group.tasks.length);

  return {
    moveDate,
    moveType,
    groups,
    total: tasks.length,
    tasks,
  };
}

export function countDone(plan, doneIds) {
  if (!plan) return 0;
  return plan.tasks.reduce((total, task) => total + (doneIds.has(task.id) ? 1 : 0), 0);
}

export function planKey(moveDateValue, moveType) {
  return `lastbox:${moveType}:${moveDateValue}`;
}
