import { AGES, CLIMATES, FEATURES, HEATING, HOME_TYPES, buildPlan, scheduleText } from "./planner.js";

const form = document.querySelector("#home-form");
const ageSelect = document.querySelector("#age");
const climateSelect = document.querySelector("#climate");
const heatingSelect = document.querySelector("#heating");
const submit = form?.querySelector(".submit");
const emptyState = document.querySelector("#home-empty");
const planWrap = document.querySelector("#home-body-wrap");
const planBody = document.querySelector("#home-body");
const planMeta = document.querySelector("#home-meta");
const nextMonth = document.querySelector("#next-month");
const totalCount = document.querySelector("#total-count");
const monthCount = document.querySelector("#month-count");
const doneCount = document.querySelector("#done-count");
const progressLabel = document.querySelector("#progress-label");
const progressBar = document.querySelector("#progress-bar");
const printButton = document.querySelector("#print-plan");
const copyButton = document.querySelector("#copy-plan");
const resetButton = document.querySelector("#reset-plan");
const exampleButton = document.querySelector("#fill-example");
const error = document.querySelector("#form-error");
const toast = document.querySelector("#toast");

const PROFILE_KEY = "houserhythm:profile:v1";
const DONE_KEY = "houserhythm:done:v1";
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

function selectedValue(name, fallback) {
  return form?.querySelector(`input[name="${name}"]:checked`)?.value || fallback;
}

function selectedFeatures() {
  return [...(form?.querySelectorAll('input[name="feature"]:checked') || [])].map((input) => input.value);
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
    homeType: selectedValue("home-type", "house"),
    age: ageSelect?.value || "21-50",
    climate: climateSelect?.value || "mild",
    heating: heatingSelect?.value || "forced-air",
    features: selectedFeatures(),
  };
}

function makeTask(task, month) {
  const row = document.createElement("article");
  row.className = "month-task";
  row.dataset.taskId = task.id;

  const label = document.createElement("label");
  label.className = "task-check";
  const input = document.createElement("input");
  input.type = "checkbox";
  input.dataset.taskId = task.id;
  input.checked = state.done.has(task.id);
  input.setAttribute("aria-label", `Mark ${task.title} as done`);
  const box = document.createElement("span");
  box.className = "task-box";
  box.setAttribute("aria-hidden", "true");
  label.append(input, box);

  const main = document.createElement("div");
  main.className = "month-task__main";
  const head = document.createElement("div");
  head.className = "month-task__head";
  const title = document.createElement("h4");
  title.textContent = task.title;
  const category = document.createElement("span");
  category.className = "month-task__category";
  category.textContent = task.categoryLabel;
  head.append(title, category);
  const why = document.createElement("p");
  why.textContent = task.why;
  const detail = document.createElement("details");
  const summary = document.createElement("summary");
  summary.textContent = "What to do";
  const action = document.createElement("p");
  action.textContent = task.action;
  detail.append(summary, action);
  main.append(head, why, detail);

  input.addEventListener("change", () => {
    if (input.checked) state.done.add(task.id);
    else state.done.delete(task.id);
    row.classList.toggle("is-done", input.checked);
    saveDone();
    updateProgress();
    track("home_task_checked", {
      month: month.month,
      category: task.category,
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
  const done = state.result.months
    .flatMap((month) => month.tasks)
    .filter((task) => state.done.has(task.id)).length;
  const total = state.result.total;
  if (progressLabel) progressLabel.textContent = `${done} of ${total} done`;
  if (doneCount) doneCount.textContent = String(done);
  if (progressBar) {
    progressBar.style.width = `${total ? (done / total) * 100 : 0}%`;
    progressBar.parentElement?.setAttribute("aria-valuenow", String(done));
    progressBar.parentElement?.setAttribute("aria-valuemax", String(total));
  }
}

function render(result, { scroll = true, trigger = "form" } = {}) {
  state.result = result;
  planBody.replaceChildren();
  for (const month of result.months) {
    const card = document.createElement("section");
    card.className = "month-card";
    card.dataset.month = String(month.month);
    const head = document.createElement("header");
    head.className = "month-card__head";
    head.innerHTML = `<div><span>${month.season}</span><h3>${month.label}</h3></div><b>${month.tasks.length} task${month.tasks.length === 1 ? "" : "s"}</b>`;
    const tasks = document.createElement("div");
    tasks.className = "month-card__tasks";
    for (const task of month.tasks) tasks.append(makeTask(task, month));
    card.append(head, tasks);
    planBody.append(card);
  }
  if (nextMonth) nextMonth.textContent = result.months[0]?.label || "—";
  if (totalCount) totalCount.textContent = String(result.total);
  if (monthCount) monthCount.textContent = String(result.months.filter((month) => month.tasks.length > 0).length);
  if (planMeta) {
    const type = HOME_TYPES.find((item) => item.id === result.homeType)?.label || result.homeType;
    const climate = CLIMATES.find((item) => item.id === result.climate)?.label || result.climate;
    planMeta.textContent = `${type} · ${result.age} years · ${climate}`;
  }
  emptyState.hidden = true;
  planWrap.hidden = false;
  for (const button of [printButton, copyButton, resetButton]) if (button) button.disabled = false;
  updateProgress();
  saveProfile(readForm());
  if (scroll) {
    planWrap.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }
  if (trigger !== "reset") track("home_schedule_generated", {
    home_type: result.homeType,
    age: result.age,
    climate: result.climate,
    heating: result.heating,
    features: result.features.length,
    task_count: result.total,
    trigger,
  });
}

function run({ scroll = true, trigger = "form" } = {}) {
  clearError();
  render(buildPlan(readForm()), { scroll, trigger });
  showToast("Year plan built.");
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
  track("home_schedule_printed", { task_count: state.result.total, done: state.done.size });
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
  showToast(ok ? "Year plan copied." : "Couldn’t copy — select the plan instead.");
  if (ok) track("home_plan_copied", { task_count: state.result.total });
});

resetButton?.addEventListener("click", () => {
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
  showToast("Checklist cleared.");
  track("home_schedule_reset");
});

exampleButton?.addEventListener("click", () => {
  const house = form?.querySelector('input[name="home-type"][value="house"]');
  if (house) house.checked = true;
  ageSelect.value = "21-50";
  climateSelect.value = "mild";
  heatingSelect.value = "forced-air";
  for (const input of form?.querySelectorAll('input[name="feature"]') || []) input.checked = ["trees", "deck"].includes(input.value);
  run({ trigger: "example" });
});

const profile = loadProfile();
if (profile) {
  const type = form?.querySelector(`input[name="home-type"][value="${CSS.escape(profile.homeType || "house")}"]`);
  if (type) type.checked = true;
  if (ageSelect) ageSelect.value = profile.age || "21-50";
  if (climateSelect) climateSelect.value = profile.climate || "mild";
  if (heatingSelect) heatingSelect.value = profile.heating || "forced-air";
  const features = new Set(profile.features || []);
  for (const input of form?.querySelectorAll('input[name="feature"]') || []) input.checked = features.has(input.value);
}

state.done = loadDone();

if (document.body.dataset.autoRun === "true" && !profile) {
  window.setTimeout(() => run({ scroll: false, trigger: "preset" }), 350);
}
