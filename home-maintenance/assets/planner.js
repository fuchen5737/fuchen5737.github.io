export const HOME_TYPES = [
  { id: "house", label: "House" },
  { id: "townhouse", label: "Townhouse" },
  { id: "condo", label: "Condo" },
];

export const AGES = [
  { id: "new", label: "New (0–5 years)" },
  { id: "6-20", label: "6–20 years" },
  { id: "21-50", label: "21–50 years" },
  { id: "50+", label: "50+ years" },
];

export const CLIMATES = [
  { id: "cold", label: "Cold & snowy" },
  { id: "mild", label: "Mild" },
  { id: "hot-dry", label: "Hot & dry" },
  { id: "humid", label: "Humid" },
];

export const HEATING = [
  { id: "forced-air", label: "Forced air" },
  { id: "boiler", label: "Boiler / radiators" },
  { id: "heat-pump", label: "Heat pump" },
  { id: "none", label: "No central heat" },
];

export const FEATURES = [
  { id: "trees", label: "Mature trees" },
  { id: "pool", label: "Pool" },
  { id: "fireplace", label: "Fireplace" },
  { id: "basement", label: "Basement" },
  { id: "deck", label: "Deck or porch" },
  { id: "garage", label: "Garage" },
];

export const CATEGORY_LABELS = {
  safety: "Safety",
  hvac: "Heating & cooling",
  plumbing: "Plumbing",
  exterior: "Exterior",
  interior: "Interior",
  appliance: "Appliances",
  pool: "Pool",
  garden: "Garden",
  garage: "Garage",
  fireplace: "Fireplace",
};

const T = (id, month, title, category, why, action, opts = {}) => ({
  id,
  month,
  title,
  category,
  why,
  action,
  ...opts,
});

export const TASKS = [
  T("warranty-new", 1, "Review the builder warranty", "interior",
    "New homes have warranty windows and maintenance requirements that are easy to miss.",
    "Find the warranty document, note the claim deadlines, and log the builder’s contact information.", { ages: ["new"] }),
  T("smoke-jan", 1, "Test smoke and CO detectors", "safety",
    "Detectors are the cheapest life-safety device in the house. Batteries and sensors age.",
    "Press the test button on every alarm, replace weak batteries, and check the expiry date.", { diy: true }),
  T("filter-jan", 1, "Change the furnace filter", "hvac",
    "A clogged filter makes the blower work harder and can shorten equipment life.",
    "Replace the filter with the size and MERV rating listed on the furnace or manual.", { heating: "forced-air" }),
  T("pipes-jan", 1, "Check exposed pipes for freezing", "plumbing",
    "A burst pipe can do more damage in an hour than a new furnace costs.",
    "Open cabinet doors under sinks on exterior walls, keep the heat above 55°F, and insulate vulnerable runs.", { climates: ["cold"] }),
  T("humidifier-jan", 1, "Clean the humidifier", "interior",
    "A dirty humidifier can spread mineral dust and mold.",
    "Descale the tank, replace the wick or filter, and follow the manual's cleaning schedule.", { climates: ["cold"] }),

  T("dryer-feb", 2, "Clean the dryer vent", "safety",
    "Lint is fuel. A restricted vent also makes the dryer run longer and hotter.",
    "Pull the dryer out, clean the duct and outside flap, and check that the transition hose is not crushed.", { diy: true }),
  T("attic-feb", 2, "Look for attic leaks and ice dams", "exterior",
    "Winter is when roof leaks and ice dams show themselves.",
    "Inspect the attic for stains, frost, and blocked soffit vents. Fix air leaks before adding insulation.", { homeTypes: ["house", "townhouse"], climates: ["cold"] }),
  T("sump-feb", 2, "Test the sump pump", "plumbing",
    "A pump that has sat all winter may not start when the spring melt arrives.",
    "Pour water into the pit and confirm the float turns the pump on and off.", { features: ["basement"] }),
  T("filter-feb", 2, "Check the furnace filter", "hvac",
    "Winter is the heaviest run time for most heating systems.",
    "Inspect the filter; replace it if it is gray or matted.", { heating: "forced-air" }),

  T("gutters-mar", 3, "Clear the spring gutters", "exterior",
    "Overflowing gutters push water into the fascia, foundation, and basement.",
    "Remove leaves and grit, flush the downspouts, and make sure water runs away from the house.", { homeTypes: ["house", "townhouse"], features: ["trees"] }),
  T("roof-mar", 3, "Do a spring roof check", "exterior",
    "Winter storms loosen flashing, shingles, and seals.",
    "From the ground, look for missing shingles, lifted flashing, and granules in the gutters. Use binoculars; stay off the roof.", { homeTypes: ["house", "townhouse"] }),
  T("ac-mar", 3, "Book the AC tune-up", "hvac",
    "The first hot week is the wrong time to discover the AC is low on charge.",
    "Clean the condenser, check the refrigerant lines, and replace the filter before cooling season."),
  T("screens-mar", 3, "Repair window screens", "exterior",
    "Small tears become mosquito doors when the windows open.",
    "Patch or re-screen torn panels and check that storm windows release.", { diy: true }),
  T("deck-mar", 3, "Clean the deck", "exterior",
    "Winter leaves grit, mildew, and loose fasteners.",
    "Sweep, wash with a deck-safe cleaner, and look for popped nails or soft boards.", { features: ["deck"] }),

  T("filter-apr", 4, "Change the furnace filter", "hvac",
    "Spring pollen and dust load the filter quickly.",
    "Replace the filter and note the date on the edge.", { heating: "forced-air" }),
  T("grading-new", 4, "Check new-home grading and drainage", "exterior",
    "New landscaping settles, and the first year is when drainage problems show up.",
    "Look for low spots, soil against the siding, and downspouts that dump next to the foundation.", { ages: ["new"], homeTypes: ["house", "townhouse"] }),
  T("drainage-apr", 4, "Check grading and downspouts", "exterior",
    "Water should leave the foundation, not sit against it.",
    "Look for low spots, disconnected downspouts, and soil that has settled against the foundation.", { homeTypes: ["house", "townhouse"] }),
  T("irrigation-apr", 4, "Start the irrigation system", "garden",
    "A broken head or valve can waste hundreds of gallons before you notice.",
    "Turn the system on zone by zone, check for geysers and misdirected heads, and adjust the controller.", { climates: ["hot-dry", "mild"] }),
  T("pool-open", 4, "Open the pool", "pool",
    "Opening early is cheaper than clearing a green pool in June.",
    "Remove the cover, clean the water line, start the pump, and test the chemistry before swimming.", { features: ["pool"] }),
  T("chimney-apr", 4, "Book a chimney sweep", "fireplace",
    "Creosote builds up even with occasional fires.",
    "Have the flue cleaned and inspected before the next burn season.", { features: ["fireplace"] }),

  T("deck-may", 5, "Seal or stain the deck", "exterior",
    "UV and moisture break down wood and composite surfaces.",
    "Clean, let it dry, and apply the manufacturer's sealer or stain.", { features: ["deck"] }),
  T("paint-may", 5, "Touch up exterior paint", "exterior",
    "Small paint failures let water into siding and trim.",
    "Scrape loose paint, prime bare spots, and touch up the trim before summer heat.", { homeTypes: ["house", "townhouse"] }),
  T("condensate-may", 5, "Clear the AC condensate line", "hvac",
    "A clogged condensate line can trip the system or leak into the house.",
    "Find the drain line, check for algae, and flush it according to the manual."),
  T("sewer-50", 5, "Camera-inspect the sewer line", "plumbing",
    "Older clay and cast-iron lines can crack, root, or sag without a visible symptom.",
    "Book a camera inspection if the line has never been scoped or the house is 50+ years old.", { ages: ["50+"] }),
  T("pool-may", 5, "Check pool chemistry", "pool",
    "pH and sanitizer drift as the pool gets used.",
    "Test pH, chlorine, alkalinity, and stabilizer; adjust one thing at a time.", { features: ["pool"] }),
  T("garage-may", 5, "Lubricate the garage door", "garage",
    "Dry hinges and springs strain the opener and make noise.",
    "Use garage-door lubricant on hinges, rollers, and the track; do not grease the springs unless specified.", { features: ["garage"] }),

  T("dryer-jun", 6, "Clean the dryer vent again", "safety",
    "Summer lint plus heat is a fire risk.",
    "Check the transition duct and outside flap; clean if airflow is weak.", { diy: true }),
  T("coils-jun", 6, "Clean refrigerator coils", "appliance",
    "Dusty coils make the compressor work harder and run hotter.",
    "Unplug the fridge, vacuum the coils or clean the front grille, and leave space for airflow."),
  T("smoke-jun", 6, "Test smoke and CO detectors", "safety",
    "A midyear test catches dead batteries before the heating season.",
    "Test every alarm and replace any battery that chirps or fails."),
  T("attic-jun", 6, "Check attic ventilation", "exterior",
    "A hot attic shortens shingle life and can back up moisture.",
    "Confirm soffit and ridge vents are open and not buried in insulation.", { climates: ["hot-dry", "humid"] }),
  T("pool-jun", 6, "Inspect the pool filter", "pool",
    "A dirty filter cuts flow and turns clear water cloudy.",
    "Backwash or clean the filter, check the pressure gauge, and look for leaks.", { features: ["pool"] }),

  T("filter-jul", 7, "Change the furnace filter", "hvac",
    "Summer dust and pet hair still reach the filter.",
    "Replace the filter; write the date on it.", { heating: "forced-air" }),
  T("weatherstrip-jul", 7, "Check weatherstripping", "interior",
    "Worn seals let hot air in and cool air out.",
    "Run a hand around doors and windows; replace cracked or flattened seals.", { diy: true }),
  T("gutters-jul", 7, "Clear summer gutters", "exterior",
    "Summer storms fill gutters with leaves and grit.",
    "Clear debris and confirm downspouts flow away from the house.", { homeTypes: ["house", "townhouse"], features: ["trees"] }),
  T("pool-jul", 7, "Check pool water level", "pool",
    "Low water can starve the pump; high water can flood the deck.",
    "Keep the water at the skimmer midpoint and check for leaks.", { features: ["pool"] }),
  T("deck-jul", 7, "Inspect the deck", "exterior",
    "Loose railings and soft boards are safety issues.",
    "Check railings, stairs, joists, and fasteners. Replace anything soft or loose.", { features: ["deck"] }),

  T("ac-aug", 8, "Check the AC before the last heat wave", "hvac",
    "August is hard on condensers and filters.",
    "Clean the outdoor unit, check the condensate drain, and replace the filter."),
  T("roof-aug", 8, "Look at the roof and gutters", "exterior",
    "Summer storms and sun damage show up before fall.",
    "Check for missing shingles, loose flashing, and granule buildup in gutters.", { homeTypes: ["house", "townhouse"] }),
  T("safety-aug", 8, "Run a home safety sweep", "safety",
    "Back-to-school season is a good reset for safety habits.",
    "Test detectors, check fire extinguishers, clear exits, and secure medicines and cleaning products."),
  T("pool-aug", 8, "Inspect pool equipment", "pool",
    "Pumps and heaters work hardest in the heat.",
    "Look for leaks, unusual noise, and a pressure rise; clean the filter.", { features: ["pool"] }),

  T("panel-50", 9, "Have the electrical panel inspected", "safety",
    "Older panels and aluminum wiring can hide overheating and unsafe breakers.",
    "Ask a licensed electrician to inspect the panel, grounding, and any added circuits.", { ages: ["50+"] }),
  T("furnace-sep", 9, "Book the furnace tune-up", "hvac",
    "The first cold night is not the time to find a cracked heat exchanger.",
    "Clean the burners, check the flue, and replace the filter before heating season."),
  T("chimney-sep", 9, "Inspect the fireplace", "fireplace",
    "Birds, creosote, and cracked mortar build up between seasons.",
    "Check the cap, damper, firebox, and flue; book a sweep if it has been more than a year.", { features: ["fireplace"] }),
  T("gutters-sep", 9, "Clear the fall gutters", "exterior",
    "The first fall rain will find every blocked downspout.",
    "Clear leaves, flush the downspouts, and check the gutter slope.", { homeTypes: ["house", "townhouse"], features: ["trees"] }),
  T("weatherstrip-sep", 9, "Replace door seals", "interior",
    "Cold air enters through the easiest gap.",
    "Replace worn door sweeps and weatherstripping before the heat comes on.", { climates: ["cold", "mild"] }),
  T("pool-close", 9, "Close the pool", "pool",
    "Closing at the right chemistry saves spring cleanup.",
    "Balance the water, clean the filter, lower the water, and cover it properly.", { features: ["pool"] }),

  T("irrigation-oct", 10, "Winterize the irrigation", "garden",
    "Water left in the lines freezes and cracks valves and heads.",
    "Blow out the zones with the manufacturer's procedure or call a pro.", { climates: ["cold"] }),
  T("hoses-oct", 10, "Drain hoses and shut off outdoor water", "plumbing",
    "A frozen hose bib can split the pipe inside the wall.",
    "Disconnect hoses, shut off the interior valve, and drain the outdoor line.", { climates: ["cold"] }),
  T("filter-oct", 10, "Change the furnace filter", "hvac",
    "The heating season starts with a clean filter.",
    "Replace the filter and note the date.", { heating: "forced-air" }),
  T("roof-oct", 10, "Do a fall roof check", "exterior",
    "Catch loose flashing before snow and ice find it.",
    "From the ground, check shingles, flashing, and gutters; book repairs before winter.", { homeTypes: ["house", "townhouse"] }),
  T("fireplace-oct", 10, "Test the fireplace", "fireplace",
    "A stuck damper or cracked firebox is a safety problem.",
    "Test the damper, inspect the firebox, and confirm the chimney is clear.", { features: ["fireplace"] }),

  T("pipes-nov", 11, "Insulate vulnerable pipes", "plumbing",
    "Exposed pipes in crawlspaces and garages freeze first.",
    "Insulate hot and cold runs, seal drafts, and keep the garage door closed in freezing weather.", { climates: ["cold"] }),
  T("sump-nov", 11, "Test the sump pump again", "plumbing",
    "Winter melt and fall rain can both fill the pit.",
    "Pour water into the pit, test the float, and check the discharge line for ice.", { features: ["basement"] }),
  T("fans-nov", 11, "Reverse ceiling fans", "interior",
    "Clockwise in winter pushes warm air down without a draft.",
    "Flip the direction switch and clean the blades.", { diy: true }),
  T("lights-nov", 11, "Check holiday lights and cords", "safety",
    "Damaged cords and hot bulbs cause fires.",
    "Inspect cords, replace broken bulbs, use outdoor-rated timers, and do not overload outlets."),

  T("smoke-dec", 12, "Test smoke and CO detectors", "safety",
    "Heating season is when CO risk rises.",
    "Test every alarm, replace batteries, and confirm the CO alarm is not expired."),
  T("filter-dec", 12, "Change the furnace filter", "hvac",
    "A clogged filter is the most common heating-season service call.",
    "Replace the filter and check the blower area for dust.", { heating: "forced-air" }),
  T("pipes-dec", 12, "Check for frozen pipes", "plumbing",
    "A pipe can freeze overnight when the temperature drops.",
    "Open cabinets, keep a trickle running on the coldest nights, and know where the main shutoff is.", { climates: ["cold"] }),
  T("humidifier-dec", 12, "Run the humidifier correctly", "interior",
    "Too much humidity causes condensation and mold; too little causes dry air.",
    "Keep indoor humidity around 30–50% in winter and clean the unit often.", { climates: ["cold"] }),
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function normalize(input) {
  const homeType = HOME_TYPES.some((item) => item.id === input.homeType) ? input.homeType : "house";
  const age = AGES.some((item) => item.id === input.age) ? input.age : "21-50";
  const climate = CLIMATES.some((item) => item.id === input.climate) ? input.climate : "mild";
  const heating = HEATING.some((item) => item.id === input.heating) ? input.heating : "forced-air";
  const features = Array.isArray(input.features) ? input.features.filter((id) => FEATURES.some((item) => item.id === id)) : [];
  return { homeType, age, climate, heating, features };
}

function matches(task, data) {
  if (task.homeTypes && !task.homeTypes.includes(data.homeType)) return false;
  if (task.ages && !task.ages.includes(data.age)) return false;
  if (task.climates && !task.climates.includes(data.climate)) return false;
  if (task.heating && task.heating !== data.heating) return false;
  if (task.features && !task.features.some((id) => data.features.includes(id))) return false;
  return true;
}

export function buildPlan(input, now = new Date()) {
  const data = normalize(input);
  const startMonth = now.getMonth();
  const year = now.getFullYear();
  const months = [];
  for (let offset = 0; offset < 12; offset += 1) {
    const monthIndex = (startMonth + offset) % 12;
    const monthNumber = monthIndex + 1;
    const monthYear = year + Math.floor((startMonth + offset) / 12);
    const tasks = TASKS
      .filter((task) => task.month === monthNumber && matches(task, data))
      .map((task) => ({ ...task, categoryLabel: CATEGORY_LABELS[task.category] || task.category }));
    months.push({
      month: monthNumber,
      year: monthYear,
      label: `${MONTHS[monthIndex]} ${monthYear}`,
      season: monthNumber <= 2 || monthNumber === 12 ? "Winter" : monthNumber <= 5 ? "Spring" : monthNumber <= 8 ? "Summer" : "Fall",
      tasks,
    });
  }
  const total = months.reduce((sum, month) => sum + month.tasks.length, 0);
  return { ...data, months, total, startMonth: monthNumberLabel(startMonth) };
}

function monthNumberLabel(index) {
  return MONTHS[index];
}

export function scheduleText(result, done = new Set()) {
  if (!result) return "";
  const lines = ["House Rhythm — 12-month home maintenance plan", ""];
  for (const month of result.months) {
    lines.push(month.label.toUpperCase());
    for (const task of month.tasks) {
      lines.push(`${done.has(task.id) ? "[x]" : "[ ]"} ${task.title} (${task.categoryLabel})`);
    }
    lines.push("");
  }
  return lines.join("\n");
}
