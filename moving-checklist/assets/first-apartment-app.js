import { buildApartmentChecklist, checklistText, formatMoney } from "./first-apartment.js";

const form = document.querySelector("#fa-form");
const moveDate = document.querySelector("#fa-move-date");
const budgetInput = document.querySelector("#fa-budget");
const roommatesInput = document.querySelector("#fa-roommates");
const furnishedSelect = document.querySelector("#fa-furnished");
const petsSelect = document.querySelector("#fa-pets");
const kitchenSelect = document.querySelector("#fa-kitchen");
const submit = form?.querySelector(".submit");
const empty = document.querySelector("#fa-empty");
const plan = document.querySelector("#fa-plan");
const planBody = document.querySelector("#fa-plan-body");
const summaryTotal = document.querySelector("#fa-total");
const summaryPer = document.querySelector("#fa-per-person");
const summaryCount = document.querySelector("#fa-item-count");
const budgetStatus = document.querySelector("#fa-budget-status");
const progressLabel = document.querySelector("#fa-progress");
const progressBar = document.querySelector("#fa-meter");
const printButton = document.querySelector("#fa-print");
const copyButton = document.querySelector("#fa-copy");
const clearButton = document.querySelector("#fa-clear");
const exampleButton = document.querySelector("#fa-example");
const error = document.querySelector("#fa-error");
const toast = document.querySelector("#toast");

const PROFILE_KEY = "lastbox:apartment:profile:v1";
const DONE_KEY = "lastbox:apartment:done:v1";
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
    moveDate: moveDate?.value || "",
    budget: budgetInput?.value || "",
    roommates: roommatesInput?.value || 0,
    furnished: furnishedSelect?.value || "unfurnished",
    pets: petsSelect?.value || "none",
    kitchen: kitchenSelect?.value || "none",
  };
}

function makeItem(item) {
  const row = document.createElement("article");
  row.className = "fa-item";
  row.dataset.itemId = item.id;

  const label = document.createElement("label");
  label.className = "fa-check";
  const input = document.createElement("input");
  input.type = "checkbox";
  input.dataset.itemId = item.id;
  input.checked = state.done.has(item.id);
  input.setAttribute("aria-label", `Mark ${item.title} as done`);
  const box = document.createElement("span");
  box.className = "fa-box";
  box.setAttribute("aria-hidden", "true");
  label.append(input, box);

  const main = document.createElement("div");
  main.className = "fa-item__main";
  const head = document.createElement("div");
  head.className = "fa-item__head";
  const title = document.createElement("h4");
  title.textContent = item.title;
  const room = document.createElement("span");
  room.className = "fa-item__room";
  room.textContent = item.roomLabel;
  head.append(title, room);
  const meta = document.createElement("div");
  meta.className = "fa-item__meta";
  meta.innerHTML = `${item.quantity ? `<span>${item.quantity} people</span>` : ""}<span>${item.cost ? formatMoney(item.cost * (item.quantity ? state.result.people : 1)) : "No cost"}</span>`;
  main.append(head, meta);
  if (item.note) {
    const note = document.createElement("p");
    note.className = "fa-item__note";
    note.textContent = item.note;
    main.append(note);
  }

  input.addEventListener("change", () => {
    if (input.checked) state.done.add(item.id);
    else state.done.delete(item.id);
    row.classList.toggle("is-done", input.checked);
    saveDone();
    updateProgress();
    track("apartment_item_checked", {
      category: item.room,
      phase: item.phase,
      checked: input.checked,
      done_total: state.done.size,
    });
  });

  row.classList.toggle("is-done", input.checked);
  row.append(label, main);
  return row;
}

function updateProgress() {
  if (!state.result) return;
  const done = state.result.phases
    .flatMap((phase) => phase.items)
    .filter((item) => state.done.has(item.id)).length;
  const total = state.result.itemCount;
  if (progressLabel) progressLabel.textContent = `${done} of ${total} done`;
  if (progressBar) {
    progressBar.style.width = `${total ? (done / total) * 100 : 0}%`;
    progressBar.parentElement?.setAttribute("aria-valuenow", String(done));
    progressBar.parentElement?.setAttribute("aria-valuemax", String(total));
  }
}

function render(result, { scroll = true, trigger = "form" } = {}) {
  state.result = result;
  planBody.replaceChildren();
  for (const phase of result.phases) {
    const group = document.createElement("section");
    group.className = "fa-group";
    group.innerHTML = `<header class="fa-group__head"><div><span>${phase.items.length} items</span><h3>${phase.label}</h3><p>${phase.note}</p></div></header>`;
    const list = document.createElement("div");
    list.className = "fa-items";
    for (const item of phase.items) list.append(makeItem(item));
    group.append(list);
    planBody.append(group);
  }
  if (summaryTotal) summaryTotal.textContent = formatMoney(result.total);
  if (summaryPer) summaryPer.textContent = `${formatMoney(result.perPerson)} / person`;
  if (summaryCount) summaryCount.textContent = String(result.itemCount);
  if (budgetStatus) {
    if (result.budget === null) {
      budgetStatus.textContent = "No budget set — add one to see the gap.";
      budgetStatus.className = "fa-budget";
    } else {
      const diff = result.budget - result.total;
      budgetStatus.textContent = diff >= 0 ? `${formatMoney(diff)} under budget` : `${formatMoney(Math.abs(diff))} over budget`;
      budgetStatus.className = `fa-budget ${diff >= 0 ? "is-under" : "is-over"}`;
    }
  }
  const moveLabel = result.moveDate ? new Date(`${result.moveDate}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Move-in date not set";
  document.querySelector("#fa-meta").textContent = `${moveLabel} · ${result.people} ${result.people === 1 ? "person" : "people"} · ${result.furnished}`;
  empty.hidden = true;
  plan.hidden = false;
  for (const button of [printButton, copyButton, clearButton]) if (button) button.disabled = false;
  updateProgress();
  saveProfile(readForm());
  if (scroll) {
    plan.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }
  track("apartment_checklist_generated", {
    people: result.people,
    furnished: result.furnished,
    pets: result.pets,
    kitchen: result.kitchen,
    has_budget: result.budget !== null,
    item_count: result.itemCount,
    trigger,
  });
}

function run({ scroll = true, trigger = "form" } = {}) {
  clearError();
  const result = buildApartmentChecklist(readForm());
  if (result.error) {
    showError(result.error);
    budgetInput?.focus();
    return;
  }
  render(result, { scroll, trigger });
  showToast("First apartment list built.");
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
  track("apartment_list_printed", { item_count: state.result.itemCount, done: state.done.size });
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
  showToast(ok ? "List copied." : "Couldn’t copy — select the list instead.");
  if (ok) track("apartment_list_copied", { item_count: state.result.itemCount });
});

clearButton?.addEventListener("click", () => {
  if (!state.done.size) {
    showToast("Nothing checked yet.");
    return;
  }
  state.done.clear();
  saveDone();
  if (state.result) {
    planBody.replaceChildren();
    render(state.result, { scroll: false, trigger: "reset" });
  }
  showToast("Checks cleared.");
  track("apartment_checklist_reset");
});

exampleButton?.addEventListener("click", () => {
  moveDate.value = "2027-06-01";
  budgetInput.value = "1200";
  roommatesInput.value = "1";
  furnishedSelect.value = "unfurnished";
  petsSelect.value = "none";
  kitchenSelect.value = "none";
  run({ trigger: "example" });
});

const profile = loadProfile();
if (profile) {
  moveDate.value = profile.moveDate || "";
  budgetInput.value = profile.budget ?? "";
  roommatesInput.value = profile.roommates ?? "0";
  furnishedSelect.value = profile.furnished || "unfurnished";
  petsSelect.value = profile.pets || "none";
  kitchenSelect.value = profile.kitchen || "none";
}

state.done = loadDone();
