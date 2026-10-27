import { buildSchedule, formatDate, formatMiles, scheduleText, DRIVING_PROFILES, POWERTRAINS, HABITS } from "./planner.js";

const form = document.querySelector("#car-form");
const currentInput = document.querySelector("#current-miles");
const annualInput = document.querySelector("#annual-miles");
const drivingSelect = document.querySelector("#driving");
const powertrainSelect = document.querySelector("#powertrain");
const submit = form?.querySelector(".submit");
const emptyState = document.querySelector("#plan-empty");
const plan = document.querySelector("#plan-body-wrap");
const planBody = document.querySelector("#plan-body");
const planMeta = document.querySelector("#plan-meta");
const planStatus = document.querySelector("#plan-status");
const nextTitle = document.querySelector("#next-title");
const nextDate = document.querySelector("#next-date");
const dueCount = document.querySelector("#due-count");
const dueSoonCount = document.querySelector("#due-soon");
const doneCount = document.querySelector("#done-count");
const progressLabel = document.querySelector("#progress-label");
const progressBar = document.querySelector("#progress-bar");
const laterBody = document.querySelector("#later-body");
const habitsBody = document.querySelector("#habits-body");
const printButton = document.querySelector("#print-plan");
const copyButton = document.querySelector("#copy-plan");
const clearButton = document.querySelector("#clear-log");
const exampleButton = document.querySelector("#fill-example");
const error = document.querySelector("#form-error");
const toast = document.querySelector("#toast");

const PROFILE_KEY = "milemark:profile:v1";
const DONE_KEY = "milemark:done:v1";

const state = {
  result: null,
  done: new Set(),
  toastTimer: 0,
};

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
  currentInput?.removeAttribute("aria-invalid");
  annualInput?.removeAttribute("aria-invalid");
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
    // Keep the log for this session.
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
    // Not essential.
  }
}

function band(value, bands) {
  const n = Number(value);
  return bands.find((item) => n <= item.max)?.id || bands[bands.length - 1].id;
}

const MILE_BANDS = [
  { id: "under_30k", max: 30000 },
  { id: "30_60k", max: 60000 },
  { id: "60_100k", max: 100000 },
  { id: "100_150k", max: 150000 },
  { id: "150k_plus", max: 500000 },
];

const ANNUAL_BANDS = [
  { id: "under_7_5k", max: 7500 },
  { id: "7_5_12k", max: 12000 },
  { id: "12_20k", max: 20000 },
  { id: "20k_plus", max: 80000 },
];

function readForm() {
  return {
    currentMiles: currentInput?.value,
    annualMiles: annualInput?.value,
    driving: drivingSelect?.value || "mixed",
    powertrain: powertrainSelect?.value || "gas",
  };
}

function makeTaskRow(item) {
  const row = document.createElement("article");
  row.className = "task-row";
  row.dataset.taskId = item.id;

  const label = document.createElement("label");
  label.className = "task-check";
  const input = document.createElement("input");
  input.type = "checkbox";
  input.dataset.taskId = item.id;
  input.checked = state.done.has(item.id);
  input.setAttribute("aria-label", `Mark ${item.title} as done`);
  const box = document.createElement("span");
  box.className = "task-box";
  box.setAttribute("aria-hidden", "true");
  label.append(input, box);

  const main = document.createElement("div");
  main.className = "task-main";
  const top = document.createElement("div");
  top.className = "task-top";
  const h3 = document.createElement("h3");
  h3.textContent = item.title;
  const category = document.createElement("span");
  category.className = "task-category";
  category.textContent = item.category;
  if (item.urgency === "soon") {
    const soon = document.createElement("span");
    soon.className = "task-soon";
    soon.textContent = "Due soon";
    top.append(soon);
  }
  top.append(h3, category);
  const why = document.createElement("p");
  why.className = "task-why";
  why.textContent = item.why;
  const when = document.createElement("div");
  when.className = "task-when";
  when.innerHTML = `<span><b>${formatDate(item.dueDate)}</b></span><span>or ${formatMiles(item.dueMiles)} mi</span><span class="task-interval">${item.intervalLabel}</span>`;
  const detail = document.createElement("details");
  detail.className = "task-detail";
  const summary = document.createElement("summary");
  summary.textContent = "What to do";
  const action = document.createElement("p");
  action.textContent = item.action;
  detail.append(summary, action);
  if (item.note) {
    const note = document.createElement("p");
    note.className = "task-note";
    note.textContent = item.note;
    detail.append(note);
  }
  main.append(top, why, when, detail);

  input.addEventListener("change", () => {
    if (input.checked) state.done.add(item.id);
    else state.done.delete(item.id);
    row.classList.toggle("is-done", input.checked);
    saveDone();
    updateProgress();
    track("car_task_logged", {
      task_id: item.id,
      category: item.category,
      done: input.checked,
      done_total: state.done.size,
    });
  });

  row.classList.toggle("is-done", input.checked);
  row.append(label, main);
  return row;
}

function updateProgress() {
  if (!state.result) return;
  const total = state.result.total;
  const done = state.result.items.filter((item) => state.done.has(item.id)).length;
  if (progressLabel) progressLabel.textContent = `${done} of ${total} logged`;
  if (doneCount) doneCount.textContent = String(done);
  if (progressBar) {
    progressBar.style.width = `${total ? (done / total) * 100 : 0}%`;
    progressBar.parentElement?.setAttribute("aria-valuenow", String(done));
    progressBar.parentElement?.setAttribute("aria-valuemax", String(total));
  }
}

function render(result, { scroll = true, trigger = "form" } = {}) {
  state.result = result;
  planBody.replaceChildren(...result.items.map(makeTaskRow));
  if (laterBody) {
    laterBody.replaceChildren();
    for (const item of result.later) {
      const li = document.createElement("li");
      li.innerHTML = `<span>${item.title}</span><b>${formatMiles(item.dueMiles)} mi · ${formatDate(item.dueDate)}</b>`;
      laterBody.append(li);
    }
    laterBody.closest("section").hidden = result.later.length === 0;
  }
  if (habitsBody) {
    habitsBody.replaceChildren();
    for (const habit of HABITS) {
      const li = document.createElement("li");
      li.innerHTML = `<b>${habit.title}</b><span>${habit.cadence}</span><small>${habit.note}</small>`;
      habitsBody.append(li);
    }
  }
  if (nextTitle) nextTitle.textContent = result.next ? result.next.title : "Nothing due";
  if (nextDate) nextDate.textContent = result.next ? `${formatDate(result.next.dueDate)} · ${formatMiles(result.next.dueMiles)} mi` : "—";
  if (dueCount) dueCount.textContent = String(result.total);
  if (dueSoonCount) dueSoonCount.textContent = String(result.dueSoon);
  if (planMeta) planMeta.textContent = `${formatMiles(result.currentMiles)} mi · ${result.driving} · ${result.powertrain}`;
  if (planStatus) planStatus.textContent = `${result.total} services in the next 12 months.`;
  emptyState.hidden = true;
  plan.hidden = false;
  for (const button of [printButton, copyButton, clearButton]) if (button) button.disabled = false;
  updateProgress();
  if (scroll) {
    plan.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }
  saveProfile(readForm());
  track("car_schedule_generated", {
    current_miles: band(result.currentMiles, MILE_BANDS),
    annual_miles: band(result.annualMiles, ANNUAL_BANDS),
    driving: result.driving,
    powertrain: result.powertrain,
    tasks_due: result.total,
    tasks_later: result.later.length,
    trigger,
  });
}

function run({ scroll = true, trigger = "form" } = {}) {
  clearError();
  const result = buildSchedule(readForm());
  if (result.error) {
    showError(result.error);
    if (Number(currentInput?.value) < 0 || Number(currentInput?.value) > 500000) {
      currentInput?.setAttribute("aria-invalid", "true");
      currentInput?.focus();
    } else {
      annualInput?.setAttribute("aria-invalid", "true");
      annualInput?.focus();
    }
    return;
  }
  render(result, { scroll, trigger });
  showToast("Service plan built.");
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

for (const input of [currentInput, annualInput]) {
  input?.addEventListener("input", clearError);
}

printButton?.addEventListener("click", () => {
  if (!state.result) return;
  track("car_plan_printed", {
    tasks_due: state.result.total,
    tasks_done: state.done.size,
    powertrain: state.result.powertrain,
  });
  window.print();
});

copyButton?.addEventListener("click", async () => {
  if (!state.result) return;
  const text = scheduleText(state.result, state.done);
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
  showToast(ok ? "Plan copied." : "Couldn’t copy — select the plan instead.");
  if (ok) track("car_plan_copied", { tasks_due: state.result.total, tasks_done: state.done.size });
});

clearButton?.addEventListener("click", () => {
  if (!state.done.size) {
    showToast("Nothing logged yet.");
    return;
  }
  state.done.clear();
  saveDone();
  if (state.result) {
    planBody.replaceChildren(...state.result.items.map(makeTaskRow));
    updateProgress();
  }
  showToast("Service log cleared.");
  track("car_log_cleared");
});

exampleButton?.addEventListener("click", () => {
  currentInput.value = "72500";
  annualInput.value = "12000";
  drivingSelect.value = "mixed";
  powertrainSelect.value = "gas";
  run({ trigger: "example" });
});

const profile = loadProfile();
if (profile) {
  currentInput.value = profile.currentMiles || "72500";
  annualInput.value = profile.annualMiles || "12000";
  drivingSelect.value = profile.driving || "mixed";
  powertrainSelect.value = profile.powertrain || "gas";
}

state.done = loadDone();

const presetMiles = document.body.dataset.presetMiles;
if (presetMiles && !profile) {
  currentInput.value = presetMiles;
  annualInput.value = "12000";
  if (document.body.dataset.presetDriving) drivingSelect.value = document.body.dataset.presetDriving;
  window.setTimeout(() => run({ scroll: false, trigger: "preset" }), 350);
}
