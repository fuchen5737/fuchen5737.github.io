import { ACTIVITIES, TRIP_TYPES, WEATHERS, checklistText, generateChecklist } from "./planner.js";

const form = document.querySelector("#camp-form");
const nightsInput = document.querySelector("#nights");
const adultsInput = document.querySelector("#adults");
const kidsInput = document.querySelector("#kids");
const dogsInput = document.querySelector("#dogs");
const weatherSelect = document.querySelector("#weather");
const submit = form?.querySelector(".submit");
const emptyState = document.querySelector("#list-empty");
const listWrap = document.querySelector("#list-body-wrap");
const listBody = document.querySelector("#list-body");
const listMeta = document.querySelector("#list-meta");
const listStatus = document.querySelector("#list-status");
const nextItem = document.querySelector("#next-item");
const itemCount = document.querySelector("#item-count");
const categoryCount = document.querySelector("#category-count");
const progressLabel = document.querySelector("#progress-label");
const doneCount = document.querySelector("#done-count");
const progressBar = document.querySelector("#progress-bar");
const printButton = document.querySelector("#print-list");
const copyButton = document.querySelector("#copy-list");
const resetButton = document.querySelector("#reset-list");
const exampleButton = document.querySelector("#fill-example");
const error = document.querySelector("#form-error");
const toast = document.querySelector("#toast");

const PROFILE_KEY = "campready:profile:v1";
const DONE_KEY = "campready:done:v1";
const state = { result: null, done: new Set(), toastTimer: 0 };

function track(name, params) {
  if (typeof window.trackEvent === "function") window.trackEvent(name, params);
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function showError(message) {
  if (!error) return;
  error.hidden = false;
  error.textContent = message;
}

function clearError() {
  if (!error) return;
  error.hidden = true;
  error.textContent = "";
}

function selectedTrip() {
  return form?.querySelector('input[name="trip-type"]:checked')?.value || "tent";
}

function selectedActivities() {
  return [...(form?.querySelectorAll('input[name="activity"]:checked') || [])].map((input) => input.value);
}

function loadDone() {
  try {
    const raw = localStorage.getItem(DONE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : []);
  } catch {
    return new Set();
  }
}

function saveDone() {
  try {
    localStorage.setItem(DONE_KEY, JSON.stringify([...state.done]));
  } catch {
    // Keep for this session.
  }
}

function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveProfile(data) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
  } catch {
    // Not critical.
  }
}

function readForm() {
  return {
    tripType: selectedTrip(),
    nights: nightsInput?.value,
    adults: adultsInput?.value,
    kids: kidsInput?.value || 0,
    dogs: dogsInput?.value || 0,
    weather: weatherSelect?.value || "warm",
    activities: selectedActivities(),
  };
}

function makeItem(item) {
  const row = document.createElement("article");
  row.className = "pack-item";
  row.dataset.itemId = item.id;

  const label = document.createElement("label");
  label.className = "pack-check";
  const input = document.createElement("input");
  input.type = "checkbox";
  input.dataset.itemId = item.id;
  input.checked = state.done.has(item.id);
  input.setAttribute("aria-label", `Mark ${item.name} as packed`);
  const box = document.createElement("span");
  box.className = "pack-box";
  box.setAttribute("aria-hidden", "true");
  label.append(input, box);

  const main = document.createElement("div");
  main.className = "pack-main";
  const line = document.createElement("div");
  line.className = "pack-line";
  const name = document.createElement("h3");
  name.textContent = item.name;
  line.append(name);
  if (item.quantity) {
    const qty = document.createElement("span");
    qty.className = "pack-qty";
    qty.textContent = item.quantity;
    line.append(qty);
  }
  main.append(line);
  if (item.note) {
    const note = document.createElement("p");
    note.className = "pack-note";
    note.textContent = item.note;
    main.append(note);
  }

  input.addEventListener("change", () => {
    if (input.checked) state.done.add(item.id);
    else state.done.delete(item.id);
    row.classList.toggle("is-packed", input.checked);
    saveDone();
    updateProgress();
    track("camp_item_checked", {
      category: item.category,
      checked: input.checked,
      done_total: state.done.size,
    });
  });

  row.classList.toggle("is-packed", input.checked);
  row.append(label, main);
  return row;
}

function updateProgress() {
  if (!state.result) return;
  const done = state.result.categories
    .flatMap((category) => category.items)
    .filter((item) => state.done.has(item.id)).length;
  const total = state.result.total;
  if (progressLabel) progressLabel.textContent = `${done} of ${total} packed`;
  if (doneCount) doneCount.textContent = String(done);
  if (progressBar) {
    progressBar.style.width = `${total ? (done / total) * 100 : 0}%`;
    progressBar.parentElement?.setAttribute("aria-valuenow", String(done));
    progressBar.parentElement?.setAttribute("aria-valuemax", String(total));
  }
}

const NIGHT_BANDS = [
  { id: "1_2", max: 2 },
  { id: "3_4", max: 4 },
  { id: "5_7", max: 7 },
  { id: "8_plus", max: 21 },
];

const PEOPLE_BANDS = [
  { id: "1_2", max: 2 },
  { id: "3_4", max: 4 },
  { id: "5_6", max: 6 },
  { id: "7_plus", max: 18 },
];

function band(value, bands) {
  const n = Number(value);
  return bands.find((item) => n <= item.max)?.id || bands[bands.length - 1].id;
}

function render(result, { scroll = true, trigger = "form" } = {}) {
  state.result = result;
  listBody.replaceChildren();
  for (const category of result.categories) {
    const section = document.createElement("section");
    section.className = "pack-group";
    const head = document.createElement("header");
    head.className = "pack-group__head";
    head.innerHTML = `<div><h3>${category.label}</h3><p>${category.note}</p></div><span>${category.items.length} items</span>`;
    const items = document.createElement("div");
    items.className = "pack-group__items";
    for (const item of category.items) items.append(makeItem(item));
    section.append(head, items);
    listBody.append(section);
  }
  if (nextItem) {
    const first = result.categories[0]?.items[0];
    nextItem.textContent = first ? first.name : "—";
  }
  if (itemCount) itemCount.textContent = String(result.total);
  if (categoryCount) categoryCount.textContent = String(result.categories.length);
  if (listMeta) {
    const trip = TRIP_TYPES.find((item) => item.id === result.tripType)?.label || result.tripType;
    const weather = WEATHERS.find((item) => item.id === result.weather)?.label || result.weather;
    listMeta.textContent = `${trip} · ${result.nights} night${result.nights === 1 ? "" : "s"} · ${weather}`;
  }
  if (listStatus) listStatus.textContent = `${result.total} items in the pack list.`;
  emptyState.hidden = true;
  listWrap.hidden = false;
  for (const button of [printButton, copyButton, resetButton]) if (button) button.disabled = false;
  updateProgress();
  saveProfile(readForm());
  if (scroll) {
    listWrap.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }
  if (trigger !== "reset") track("camp_checklist_generated", {
    trip_type: result.tripType,
    weather: result.weather,
    nights: band(result.nights, NIGHT_BANDS),
    people: band(result.people, PEOPLE_BANDS),
    has_kids: result.kids > 0,
    has_dogs: result.dogs > 0,
    activities: result.activities.length,
    item_count: result.total,
    trigger,
  });
}

function run({ scroll = true, trigger = "form" } = {}) {
  clearError();
  const result = generateChecklist(readForm());
  if (result.error) {
    showError(result.error);
    return;
  }
  render(result, { scroll, trigger });
  showToast("Pack list built.");
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (submit?.disabled) return;
  if (submit) {
    submit.disabled = true;
    window.setTimeout(() => {
      submit.disabled = false;
    }, 420);
  }
  run();
});

printButton?.addEventListener("click", () => {
  if (!state.result) return;
  const done = state.result.categories.flatMap((category) => category.items).filter((item) => state.done.has(item.id)).length;
  track("camp_list_printed", { item_count: state.result.total, packed: done });
  window.print();
});

copyButton?.addEventListener("click", async () => {
  if (!state.result) return;
  const text = checklistText(state.result, state.done);
  let ok = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      ok = true;
    }
  } catch {
    ok = false;
  }
  if (!ok) {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    area.remove();
  }
  showToast(ok ? "Pack list copied." : "Couldn’t copy — select the list instead.");
  if (ok) track("camp_list_copied", { item_count: state.result.total });
});

resetButton?.addEventListener("click", () => {
  if (!state.done.size) {
    showToast("Nothing checked yet.");
    return;
  }
  state.done.clear();
  saveDone();
  if (state.result) {
    listBody.replaceChildren();
    render(state.result, { scroll: false, trigger: "reset" });
  }
  showToast("Checklist cleared.");
  track("camp_checklist_reset");
});

exampleButton?.addEventListener("click", () => {
  const tent = form?.querySelector('input[name="trip-type"][value="tent"]');
  if (tent) tent.checked = true;
  nightsInput.value = "2";
  adultsInput.value = "2";
  kidsInput.value = "0";
  dogsInput.value = "0";
  weatherSelect.value = "warm";
  for (const input of form?.querySelectorAll('input[name="activity"]') || []) input.checked = input.value === "hike";
  run({ trigger: "example" });
});

const profile = loadProfile();
if (profile) {
  const trip = form?.querySelector(`input[name="trip-type"][value="${CSS.escape(profile.tripType || "tent")}"]`);
  if (trip) trip.checked = true;
  if (nightsInput) nightsInput.value = profile.nights || "2";
  if (adultsInput) adultsInput.value = profile.adults || "2";
  if (kidsInput) kidsInput.value = profile.kids ?? "0";
  if (dogsInput) dogsInput.value = profile.dogs ?? "0";
  if (weatherSelect) weatherSelect.value = profile.weather || "warm";
  const selected = new Set(profile.activities || []);
  for (const input of form?.querySelectorAll('input[name="activity"]') || []) input.checked = selected.has(input.value);
}

state.done = loadDone();

const presetTrip = document.body.dataset.presetTrip;
if (presetTrip && !profile) {
  const radio = form?.querySelector(`input[name="trip-type"][value="${CSS.escape(presetTrip)}"]`);
  if (radio) radio.checked = true;
  if (document.body.dataset.presetKids) kidsInput.value = document.body.dataset.presetKids;
  if (document.body.dataset.presetWeather) weatherSelect.value = document.body.dataset.presetWeather;
  window.setTimeout(() => run({ scroll: false, trigger: "preset" }), 350);
}
