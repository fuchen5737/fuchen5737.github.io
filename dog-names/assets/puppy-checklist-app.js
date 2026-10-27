import { PUPPY_AGES, PUPPY_HOMES, PUPPY_SIZES, buildPuppyChecklist, checklistText } from "./puppy-checklist.js";

const form = document.querySelector("#pp-form");
const ageSelect = document.querySelector("#pp-age");
const sizeSelect = document.querySelector("#pp-size");
const homeSelect = document.querySelector("#pp-home");
const kidsInput = document.querySelector("#pp-kids");
const catsInput = document.querySelector("#pp-cats");
const submit = form?.querySelector(".submit");
const empty = document.querySelector("#pp-empty");
const plan = document.querySelector("#pp-plan");
const planBody = document.querySelector("#pp-plan-body");
const summaryTotal = document.querySelector("#pp-total");
const summaryDone = document.querySelector("#pp-done");
const summaryPhase = document.querySelector("#pp-next-phase");
const meta = document.querySelector("#pp-meta");
const progressLabel = document.querySelector("#pp-progress");
const progressBar = document.querySelector("#pp-meter");
const printButton = document.querySelector("#pp-print");
const copyButton = document.querySelector("#pp-copy");
const clearButton = document.querySelector("#pp-clear");
const exampleButton = document.querySelector("#pp-example");
const error = document.querySelector("#pp-error");
const toast = document.querySelector("#toast");

const PROFILE_KEY = "gooddog:puppy:profile:v1";
const DONE_KEY = "gooddog:puppy:done:v1";
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
    age: ageSelect?.value || "8-12w",
    size: sizeSelect?.value || "medium",
    home: homeSelect?.value || "house",
    kids: kidsInput?.checked || false,
    cats: catsInput?.checked || false,
  };
}

function makeItem(item) {
  const row = document.createElement("article");
  row.className = "pp-item";
  row.dataset.itemId = item.id;

  const label = document.createElement("label");
  label.className = "pp-check";
  const input = document.createElement("input");
  input.type = "checkbox";
  input.dataset.itemId = item.id;
  input.checked = state.done.has(item.id);
  input.setAttribute("aria-label", `Mark ${item.title} as done`);
  const box = document.createElement("span");
  box.className = "pp-box";
  box.setAttribute("aria-hidden", "true");
  label.append(input, box);

  const main = document.createElement("div");
  main.className = "pp-item__main";
  const head = document.createElement("div");
  head.className = "pp-item__head";
  const title = document.createElement("h4");
  title.textContent = item.title;
  const category = document.createElement("span");
  category.className = "pp-item__category";
  category.textContent = item.category;
  head.append(title, category);
  main.append(head);
  if (item.note) {
    const note = document.createElement("p");
    note.className = "pp-item__note";
    note.textContent = item.note;
    main.append(note);
  }
  if (item.sizeNote) {
    const size = document.createElement("p");
    size.className = "pp-item__size";
    size.textContent = `Size: ${item.sizeNote}`;
    main.append(size);
  }

  input.addEventListener("change", () => {
    if (input.checked) state.done.add(item.id);
    else state.done.delete(item.id);
    row.classList.toggle("is-done", input.checked);
    saveDone();
    updateProgress();
    track("puppy_item_checked", {
      category: item.category,
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
  const done = state.result.phases.flatMap((phase) => phase.items).filter((item) => state.done.has(item.id)).length;
  if (progressLabel) progressLabel.textContent = `${done} of ${state.result.total} done`;
  if (summaryDone) summaryDone.textContent = String(done);
  if (progressBar) {
    progressBar.style.width = `${state.result.total ? (done / state.result.total) * 100 : 0}%`;
    progressBar.parentElement?.setAttribute("aria-valuenow", String(done));
    progressBar.parentElement?.setAttribute("aria-valuemax", String(state.result.total));
  }
}

function render(result, { scroll = true, trigger = "form" } = {}) {
  state.result = result;
  planBody.replaceChildren();
  for (const phase of result.phases) {
    const group = document.createElement("section");
    group.className = "pp-group";
    group.innerHTML = `<header class="pp-group__head"><div><span>${phase.items.length} items</span><h3>${phase.label}</h3><p>${phase.note}</p></div></header>`;
    const list = document.createElement("div");
    list.className = "pp-items";
    for (const item of phase.items) list.append(makeItem(item));
    group.append(list);
    planBody.append(group);
  }
  if (summaryTotal) summaryTotal.textContent = String(result.total);
  if (summaryPhase) summaryPhase.textContent = result.phases[0]?.label || "—";
  if (meta) {
    const age = PUPPY_AGES.find((item) => item.id === result.age)?.label;
    const size = PUPPY_SIZES.find((item) => item.id === result.size)?.label;
    const home = PUPPY_HOMES.find((item) => item.id === result.home)?.label;
    meta.textContent = `${age} · ${size} · ${home}`;
  }
  empty.hidden = true;
  plan.hidden = false;
  for (const button of [printButton, copyButton, clearButton]) if (button) button.disabled = false;
  updateProgress();
  saveProfile(readForm());
  if (scroll) {
    plan.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }
  if (trigger !== "reset") track("puppy_checklist_generated", {
    age: result.age,
    size: result.size,
    home: result.home,
    kids: result.kids,
    cats: result.cats,
    item_count: result.total,
    trigger,
  });
}

function run({ scroll = true, trigger = "form" } = {}) {
  clearError();
  render(buildPuppyChecklist(readForm()), { scroll, trigger });
  showToast("Puppy checklist built.");
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
  track("puppy_list_printed", { item_count: state.result.total, done: state.done.size });
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
  showToast(ok ? "Checklist copied." : "Couldn’t copy — select the list instead.");
  if (ok) track("puppy_list_copied", { item_count: state.result.total });
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
  track("puppy_checklist_reset");
});

exampleButton?.addEventListener("click", () => {
  ageSelect.value = "8-12w";
  sizeSelect.value = "medium";
  homeSelect.value = "apartment";
  kidsInput.checked = false;
  catsInput.checked = true;
  run({ trigger: "example" });
});

const profile = loadProfile();
if (profile) {
  ageSelect.value = profile.age || "8-12w";
  sizeSelect.value = profile.size || "medium";
  homeSelect.value = profile.home || "house";
  kidsInput.checked = Boolean(profile.kids);
  catsInput.checked = Boolean(profile.cats);
}

state.done = loadDone();
