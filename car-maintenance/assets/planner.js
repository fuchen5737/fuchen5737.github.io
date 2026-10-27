export const DRIVING_PROFILES = [
  { id: "mixed", label: "Mixed driving", note: "A normal mix of city streets and highway." },
  { id: "highway", label: "Mostly highway", note: "Long, steady commutes and road trips." },
  { id: "city", label: "Mostly city", note: "Short trips, stop-and-go, lots of idling." },
  { id: "severe", label: "Severe duty", note: "Towing, dust, mountains, extreme heat or cold." },
];

export const POWERTRAINS = [
  { id: "gas", label: "Gas" },
  { id: "hybrid", label: "Hybrid" },
  { id: "ev", label: "Electric" },
];

const ALL = ["gas", "hybrid", "ev"];
const GAS_HYBRID = ["gas", "hybrid"];

const T = (id, title, category, miles, months, severeMiles, severeMonths, applies, why, action, note = "", diy = true) => ({
  id,
  title,
  category,
  miles,
  months,
  severeMiles,
  severeMonths,
  applies,
  why,
  action,
  note,
  diy,
});

export const TASKS = [
  T("oil", "Oil and filter change", "Engine", 7500, 12, 5000, 6, GAS_HYBRID,
    "Oil breaks down with heat, short trips, and time. The filter holds the grit.",
    "Replace engine oil and oil filter. Reset the oil-life monitor if your car has one.",
    "Follow the owner’s manual for oil spec and any longer factory interval.", false),
  T("tires", "Tire rotation", "Tires", 6000, 6, 5000, 6, ALL,
    "Front and rear tires wear differently. Rotating them evens out the wear.",
    "Rotate front to rear and check pressures, including the spare.",
    "Directional tires can only move front-to-back on the same side."),
  T("brakes", "Brake inspection", "Brakes", 12000, 12, 10000, 12, ALL,
    "Pads, rotors, and fluid are safety items. Noise or a soft pedal means inspect now.",
    "Check pad thickness, rotor condition, brake lines, and parking brake.",
    "EVs use regenerative braking and can rust pads from low use; inspect anyway.", false),
  T("cabin-filter", "Cabin air filter", "Filters", 15000, 12, 10000, 12, ALL,
    "A clogged cabin filter cuts airflow and can make the vents smell.",
    "Replace the cabin air filter. Most are behind the glovebox or under the hood."),
  T("engine-air-filter", "Engine air filter", "Filters", 15000, 12, 10000, 12, GAS_HYBRID,
    "The engine needs clean air. A dirty filter hurts fuel economy and power.",
    "Replace or clean the engine air filter, depending on the element type."),
  T("wipers", "Wiper blades", "Visibility", 12000, 12, 12000, 12, ALL,
    "Sun and grit harden the rubber. Streaks show up first in rain and at night.",
    "Replace wiper blades and top up washer fluid."),
  T("battery", "12V battery check", "Electrical", 12000, 12, 12000, 12, ALL,
    "A weak 12V battery can strand you, even on an EV. Heat and age are the main killers.",
    "Test the battery and charging system. Clean terminals if needed.",
    "Most 12V batteries last about 3–5 years.", false),
  T("coolant", "Coolant inspection", "Fluids", 30000, 36, 20000, 24, ALL,
    "Coolant controls heat and protects the radiator, hoses, and heater core.",
    "Check the level and condition. Pressure-test the system if you see a leak.",
    "EVs and hybrids also have battery/inverter cooling systems; use the specified coolant.", false),
  T("brake-fluid", "Brake fluid service", "Fluids", 30000, 36, 20000, 24, ALL,
    "Brake fluid absorbs moisture, which can lower the boiling point and corrode parts.",
    "Test the fluid or replace it on the manual interval. Bleed the system properly.",
    "Do not mix DOT ratings. Check the cap or owner’s manual.", false),
  T("transmission", "Transmission fluid", "Drivetrain", 60000, 60, 30000, 36, GAS_HYBRID,
    "Transmission fluid carries heat and clutch material. Towing and city heat shorten its life.",
    "Inspect the fluid condition. Service it if the manual lists an interval; use the specified fluid.",
    "Some transmissions are “lifetime fill.” Get a professional opinion before flushing.", false),
  T("spark-plugs", "Spark plugs", "Engine", 60000, 60, 45000, 48, GAS_HYBRID,
    "Worn plugs can cause misfires, rough idle, and lower fuel economy.",
    "Replace spark plugs and inspect ignition coils.",
    "Intervals vary a lot: 30,000 miles on copper, 100,000 on some iridium plugs.", false),
  T("serpentine", "Serpentine belt", "Engine", 60000, 60, 45000, 48, GAS_HYBRID,
    "A cracked belt can leave you without power steering or charging.",
    "Inspect the belt and tensioner. Replace at the first sign of cracking or glazing.", "", false),
  T("timing-belt", "Timing belt", "Engine", 90000, 84, 60000, 60, GAS_HYBRID,
    "On interference engines, a broken timing belt can destroy the engine.",
    "Replace the belt, tensioner, and water pump if equipped as a kit.",
    "Only if your engine uses a belt, not a chain. Check the manual.", false),
  T("suspension", "Suspension and steering check", "Steering", 30000, 24, 20000, 24, ALL,
    "Worn bushings, struts, and tie rods affect tire wear and stopping distance.",
    "Inspect struts, shocks, ball joints, tie rods, and boot seals.",
    "Ask for a road test over bumps and a tire-wear check.", false),
  T("underbody", "Underbody and brake-line check", "Exterior", 12000, 12, 12000, 12, ALL,
    "Road salt, debris, and scrapes can start rust and hide brake-line damage.",
    "Inspect brake lines, fuel lines, exhaust, boots, and underbody panels.",
    "More important in states that salt roads.", false),
  T("fuel-filter", "Fuel filter", "Fuel", 30000, 36, 20000, 24, GAS_HYBRID,
    "A restricted fuel filter can cause hard starts and weak acceleration.",
    "Replace the filter if it is serviceable. Many modern cars have a lifetime in-tank filter.",
    "Not every car has a replaceable external filter.", false),
  T("ev-drive-fluid", "EV drive-unit fluid", "Drivetrain", 60000, 60, 45000, 48, ["ev"],
    "Some EVs use oil in the reduction gear or drive unit that still needs service.",
    "Check the owner’s manual for the drive-unit fluid interval and specification.",
    "Many EVs are low-maintenance, but not maintenance-free.", false),
  T("ev-charge-check", "Charging cable and port check", "Electrical", 12000, 12, 12000, 12, ["ev"],
    "A damaged cable or dirty port can overheat and slow charging.",
    "Inspect the charging cable, connector pins, and port. Clean only as the manual allows.",
    "Stop using a cable with exposed copper, melted plastic, or burn marks."),
  T("hybrid-coolant", "Hybrid inverter coolant", "Fluids", 60000, 60, 45000, 48, ["hybrid"],
    "The inverter and battery cooling loop protects expensive hybrid electronics.",
    "Inspect the level and condition. Service it per the manual with the specified coolant.",
    "Use only the factory-specified hybrid coolant.", false),
];

export const HABITS = [
  { id: "pressure", title: "Check tire pressures", cadence: "Monthly", note: "Use the door-jamb spec, not the tire sidewall." },
  { id: "fluids", title: "Look for leaks and warning lights", cadence: "Monthly", note: "A fresh spot on the driveway is information." },
  { id: "wash", title: "Wash the underside", cadence: "After winter", note: "Salt is the quiet killer of brake and fuel lines." },
];

function normalize(input) {
  const currentMiles = Number(input.currentMiles);
  const annualMiles = Number(input.annualMiles);
  const months = Math.max(1, Math.min(24, Number(input.months) || 12));
  const driving = DRIVING_PROFILES.some((item) => item.id === input.driving) ? input.driving : "mixed";
  const powertrain = POWERTRAINS.some((item) => item.id === input.powertrain) ? input.powertrain : "gas";
  if (!Number.isFinite(currentMiles) || currentMiles < 0 || currentMiles > 500000) {
    return { error: "Enter a current mileage between 0 and 500,000." };
  }
  if (!Number.isFinite(annualMiles) || annualMiles < 1000 || annualMiles > 80000) {
    return { error: "Enter annual mileage between 1,000 and 80,000." };
  }
  return { currentMiles, annualMiles, months, driving, powertrain };
}

function addMonths(date, months) {
  const copy = new Date(date.getTime());
  const day = copy.getDate();
  copy.setMonth(copy.getMonth() + months);
  if (copy.getDate() < day) copy.setDate(0);
  return copy;
}

function addDays(date, days) {
  const copy = new Date(date.getTime());
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function buildSchedule(input, now = new Date()) {
  const data = normalize(input);
  if (data.error) return data;
  const severe = data.driving === "severe";
  const horizon = addMonths(now, data.months);
  const all = TASKS
    .filter((task) => task.applies.includes(data.powertrain))
    .map((task) => {
      const miles = severe ? task.severeMiles || task.miles : task.miles;
      const months = severe ? task.severeMonths || task.months : task.months;
      const dueMiles = data.currentMiles + miles;
      const byMiles = addDays(now, (miles / data.annualMiles) * 365.25);
      const byMonths = addMonths(now, months);
      const dueDate = byMiles.getTime() <= byMonths.getTime() ? byMiles : byMonths;
      return {
        ...task,
        dueMiles: Math.round(dueMiles),
        dueDate,
        miles,
        months,
        intervalLabel: `${miles.toLocaleString("en-US")} mi / ${months} mo`,
        urgency: dueDate.getTime() - now.getTime() <= 30 * 86400000 ? "soon" : "later",
        severe,
      };
    })
    .sort((a, b) => a.dueDate - b.dueDate || a.dueMiles - b.dueMiles);
  const items = all.filter((item) => item.dueDate.getTime() <= horizon.getTime());
  const later = all.filter((item) => item.dueDate.getTime() > horizon.getTime()).slice(0, 6);
  return {
    ...data,
    horizon,
    items,
    later,
    dueSoon: items.filter((item) => item.urgency === "soon").length,
    next: items[0] || null,
    total: items.length,
  };
}

export function formatMiles(value) {
  return Number(value).toLocaleString("en-US");
}

export function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function scheduleText(result, done = new Set()) {
  if (!result || result.error) return "";
  const lines = [
    `Milemark service plan — ${formatMiles(result.currentMiles)} miles`,
    `Driving: ${result.driving} · Powertrain: ${result.powertrain}`,
    "",
  ];
  for (const item of result.items) {
    const mark = done.has(item.id) ? "[x]" : "[ ]";
    lines.push(`${mark} ${item.title} — due ${formatDate(item.dueDate)} or ${formatMiles(item.dueMiles)} mi`);
  }
  return lines.join("\n");
}
