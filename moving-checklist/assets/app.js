import {
  buildPlan,
  countDone,
  formatDue,
  isPastDate,
  planKey,
  MOVE_TYPES,
} from "./tasks.js";

const form = document.querySelector("#move-form");
const dateInput = document.querySelector("#move-date");
const error = document.querySelector("#move-error");
const submitButton = form?.querySelector(".submit");
const plan = document.querySelector("#plan");
const planMeta = document.querySelector("#plan-meta");
const planGroups = document.querySelector("#plan-groups");
const planEmpty = document.querySelector("#plan-empty");
const progressWrap = document.querySelector("#progress");
const progressBar = document.querySelector("#progress-bar");
const progressLabel = document.querySelector("#progress-label");
const printButton = document.querySelector("#print-plan");
const resetButton = document.querySelector("#reset-plan");
const fillExample = document.querySelector("#fill-example");
const planStatus = document.querySelector("#plan-status");
const planTitle = document.querySelector("#plan-title");
const toast = document.querySelector("#toast");

const state = {
  plan: null,
  done: new Set(),
  key: "",
  resetArmed: false,
  resetTimer: 0,
  toastTimer: 0,
};

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
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
  dateInput?.removeAttribute("aria-invalid");
}

function selectedType() {
  return form?.querySelector('input[name="move-type"]:checked')?.value || "house";
}

function track(name, params) {
  if (typeof window.trackEvent === "function") window.trackEvent(name, params);
}

function loadDone(key, validIds) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id) => validIds.has(id)));
  } catch {
    return new Set();
  }
}

function saveDone() {
  try {
    localStorage.setItem(state.key, JSON.stringify([...state.done]));
  } catch {
    // The checklist still works for this session if storage is unavailable.
  }
}

function updateProgress() {
  if (!state.plan) return;
  const done = countDone(state.plan, state.done);
  const total = state.plan.total;
  const percent = total ? Math.round((done / total) * 100) : 0;
  if (progressBar) progressBar.style.width = `${percent}%`;
  if (progressLabel) progressLabel.textContent = `${done} / ${total} done`;
}

function taskDue(task) {
  const past = isPastDate(task.due) && !state.done.has(task.id);
  return `<span class="due${past ? " due--past" : ""}">${past ? "Overdue · " : ""}${formatDue(task.due)}</span>`;
}

function buildTask(task) {
  const checked = state.done.has(task.id);
  const li = document.createElement("li");
  li.className = `task${checked ? " is-done" : ""}`;
  li.dataset.taskId = task.id;

  const label = document.createElement("label");
  label.className = "task__check";
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = checked;
  input.dataset.taskId = task.id;
  input.setAttribute("aria-label", task.title);
  const box = document.createElement("span");
  box.className = "task__box";
  box.setAttribute("aria-hidden", "true");
  label.append(input, box);

  const body = document.createElement("div");
  body.className = "task__body";
  const h4 = document.createElement("h4");
  h4.textContent = task.title;
  const p = document.createElement("p");
  p.textContent = task.detail;
  const meta = document.createElement("div");
  meta.className = "task__meta";
  const cat = document.createElement("span");
  cat.className = "tag";
  cat.textContent = task.category;
  meta.append(cat);
  meta.insertAdjacentHTML("beforeend", taskDue(task));
  body.append(h4, p, meta);

  input.addEventListener("change", () => {
    if (input.checked) state.done.add(task.id);
    else state.done.delete(task.id);
    li.classList.toggle("is-done", input.checked);
    const due = meta.querySelector(".due");
    if (due) due.outerHTML = taskDue(task);
    saveDone();
    updateProgress();
    track("move_task_checked", {
      move_type: state.plan?.moveType,
      category: task.category,
      checked: input.checked,
    });
  });

  li.append(label, body);
  return li;
}

function renderPlan({ scroll = true } = {}) {
  if (!state.plan) return;
  const type = MOVE_TYPES.find((item) => item.id === state.plan.moveType);
  const dateLabel = state.plan.moveDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  planMeta.textContent = `${type.label} · ${dateLabel}`;
  planGroups.replaceChildren();
  for (const group of state.plan.groups) {
    const section = document.createElement("section");
    section.className = "phase";
    section.setAttribute("aria-label", group.label);
    const head = document.createElement("header");
    head.className = "phase__head";
    const h3 = document.createElement("h3");
    h3.textContent = group.label;
    const note = document.createElement("span");
    note.textContent = `${group.note} · ${group.tasks.length} tasks`;
    head.append(h3, note);
    const list = document.createElement("ul");
    list.className = "task-list";
    for (const task of group.tasks) list.append(buildTask(task));
    section.append(head, list);
    planGroups.append(section);
  }

  planEmpty.hidden = true;
  planGroups.hidden = false;
  progressWrap.hidden = false;
  printButton.disabled = false;
  resetButton.disabled = false;
  updateProgress();

  if (planStatus) {
    planStatus.textContent = `Move plan built with ${state.plan.total} tasks.`;
  }

  if (scroll) {
    const rect = plan.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.55) {
      planTitle.setAttribute("tabindex", "-1");
      planTitle.focus({ preventScroll: true });
      planTitle.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    }
  }
}

function runBuild({ scroll = true, trigger = "form" } = {}) {
  clearError();
  const dateValue = dateInput?.value || "";
  if (!dateValue) {
    showError("Add your move date to build the plan.");
    dateInput?.setAttribute("aria-invalid", "true");
    dateInput?.focus();
    return null;
  }
  const built = buildPlan(dateValue, selectedType());
  if (!built) {
    showError("That date or move type doesn’t look right. Try again.");
    dateInput?.focus();
    return null;
  }

  state.plan = built;
  state.key = planKey(dateValue, built.moveType);
  state.done = loadDone(state.key, new Set(built.tasks.map((task) => task.id)));
  renderPlan({ scroll });
  showToast(`Move plan built for ${formatDue(built.moveDate)}.`);
  const days = Math.round((built.moveDate - new Date()) / 86400000);
  const daysOut = days < 0 ? "past" : days < 14 ? "under_2_weeks" : days < 30 ? "2_4_weeks" : days < 90 ? "1_3_months" : "3_plus_months";
  track("move_plan_built", {
    move_type: built.moveType,
    tasks: built.total,
    days_out: daysOut,
    trigger,
  });
  return built;
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (submitButton?.disabled) return;
  if (submitButton) {
    submitButton.disabled = true;
    window.setTimeout(() => {
      submitButton.disabled = false;
    }, 420);
  }
  runBuild();
});

dateInput?.addEventListener("input", () => {
  clearError();
});

printButton?.addEventListener("click", () => {
  if (!state.plan) return;
  track("move_plan_printed", { tasks_total: state.plan.total, tasks_done: state.done.size });
  window.print();
});

function armReset() {
  if (!state.plan || !resetButton) return;
  if (!state.resetArmed) {
    state.resetArmed = true;
    resetButton.textContent = "Click again to clear";
    clearTimeout(state.resetTimer);
    state.resetTimer = window.setTimeout(() => {
      state.resetArmed = false;
      resetButton.textContent = "Reset progress";
    }, 3200);
    return;
  }
  clearTimeout(state.resetTimer);
  state.resetArmed = false;
  state.done.clear();
  saveDone();
  resetButton.textContent = "Reset progress";
  for (const input of planGroups.querySelectorAll('input[type="checkbox"]')) {
    input.checked = false;
    input.closest(".task")?.classList.remove("is-done");
  }
  // Re-render dates so overdue labels clear too.
  renderPlan({ scroll: false });
  if (planStatus) planStatus.textContent = "Progress cleared.";
  showToast("Progress cleared.");
  track("move_progress_reset", { tasks_total: state.plan.total });
}

resetButton?.addEventListener("click", armReset);

fillExample?.addEventListener("click", () => {
  if (!dateInput) return;
  dateInput.value = "2027-06-12";
  const house = form.querySelector('input[name="move-type"][value="house"]');
  if (house) house.checked = true;
  runBuild({ trigger: "example" });
});

const preset = document.body.dataset.presetType;
if (preset) {
  const radio = form?.querySelector(`input[name="move-type"][value="${CSS.escape(preset)}"]`);
  if (radio) radio.checked = true;
}
