import { generateNames, STYLE_LABELS } from "./names.js";

const form = document.querySelector("#name-form");
const submitButton = form?.querySelector(".submit");
const board = document.querySelector("#board");
const boardTitle = document.querySelector("#board-title");
const boardCount = document.querySelector("#board-count");
const tagGrid = document.querySelector("#tag-grid");
const tagEmpty = document.querySelector("#tag-empty");
const newNamesButton = document.querySelector("#new-names");
const copyAllButton = document.querySelector("#copy-all");
const shortlist = document.querySelector("#shortlist");
const shortlistCount = document.querySelector("#shortlist-count");
const shortlistChips = document.querySelector("#shortlist-chips");
const shortlistCopy = document.querySelector("#copy-shortlist");
const fillExample = document.querySelector("#fill-example");
const toast = document.querySelector("#toast");
const status = document.querySelector("#result-status");

const FAV_KEY = "gooddog:favorites";
const state = {
  results: [],
  favorites: new Set(),
  seed: Date.now() >>> 0,
  toastTimer: 0,
};

const ICON_STAR = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z"/></svg>`;
const ICON_COPY = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="9" y="9" width="11" height="11"/><path d="M5 15V4h11"/></svg>`;
const ICON_CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="m4 12 5 5L20 6"/></svg>`;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed.filter((name) => typeof name === "string") : []);
  } catch {
    return new Set();
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify([...state.favorites]));
  } catch {
    // Favorites still work for this session.
  }
}

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  area.remove();
  return ok;
}

function selectedValue(name, fallback) {
  return form?.querySelector(`input[name="${name}"]:checked`)?.value || fallback;
}

function track(name, params) {
  if (typeof window.trackEvent === "function") window.trackEvent(name, params);
}

function updateShortlist() {
  if (!shortlistChips || !shortlistCount) return;
  const names = [...state.favorites];
  shortlistCount.textContent = `${names.length} saved`;
  shortlistChips.replaceChildren();
  if (!names.length) {
    const empty = document.createElement("p");
    empty.className = "shortlist__empty";
    empty.textContent = "Tap the star on a name to keep it here.";
    shortlistChips.append(empty);
  } else {
    for (const name of names) {
      const chip = document.createElement("span");
      chip.className = "fav-chip";
      chip.append(document.createTextNode(name));
      const remove = document.createElement("button");
      remove.type = "button";
      remove.setAttribute("aria-label", `Remove ${name} from shortlist`);
      remove.textContent = "×";
      remove.addEventListener("click", () => {
        state.favorites.delete(name);
        saveFavorites();
        updateShortlist();
        syncCardStars();
        showToast(`${name} removed from shortlist.`);
      });
      chip.append(remove);
      shortlistChips.append(chip);
    }
  }
  if (shortlistCopy) shortlistCopy.disabled = names.length === 0;
}

function syncCardStars() {
  for (const card of tagGrid?.querySelectorAll(".dog-tag") || []) {
    const name = card.dataset.name;
    const star = card.querySelector(".star");
    if (!star) continue;
    const saved = state.favorites.has(name);
    star.classList.toggle("is-favorite", saved);
    star.setAttribute("aria-pressed", String(saved));
    star.setAttribute("aria-label", saved ? `Remove ${name} from shortlist` : `Save ${name} to shortlist`);
  }
}

function toggleFavorite(name) {
  if (state.favorites.has(name)) state.favorites.delete(name);
  else state.favorites.add(name);
  saveFavorites();
  updateShortlist();
  syncCardStars();
  showToast(state.favorites.has(name) ? `${name} saved to shortlist.` : `${name} removed from shortlist.`);
  track("dog_name_favorited", { saved: state.favorites.has(name), favorites: state.favorites.size });
}

function makeStyleChip(style) {
  const chip = document.createElement("span");
  chip.className = "dog-tag__style";
  chip.textContent = STYLE_LABELS[style] || style;
  return chip;
}

function makeCard(dog, index) {
  const card = document.createElement("article");
  card.className = "dog-tag";
  card.dataset.name = dog.name;
  card.style.setProperty("--i", index);

  const top = document.createElement("div");
  top.className = "dog-tag__top";
  const name = document.createElement("h3");
  name.className = "dog-tag__name";
  name.textContent = dog.name;

  const star = document.createElement("button");
  star.type = "button";
  star.className = "icon-button star";
  star.innerHTML = ICON_STAR;
  star.setAttribute("aria-pressed", "false");
  star.setAttribute("aria-label", `Save ${dog.name} to shortlist`);
  star.addEventListener("click", () => toggleFavorite(dog.name));
  top.append(name, star);

  const note = document.createElement("p");
  note.className = "dog-tag__note";
  note.textContent = dog.note;

  const styles = document.createElement("div");
  styles.className = "dog-tag__styles";
  for (const style of dog.styles) styles.append(makeStyleChip(style));

  const actions = document.createElement("div");
  actions.className = "dog-tag__actions";
  const copy = document.createElement("button");
  copy.type = "button";
  copy.className = "icon-button";
  copy.setAttribute("aria-label", `Copy ${dog.name}`);
  copy.innerHTML = ICON_COPY;
  copy.addEventListener("click", async () => {
    const ok = await copyText(dog.name);
    if (!ok) {
      showToast("Couldn’t copy — select the name instead.");
      return;
    }
    copy.classList.add("is-copied");
    copy.innerHTML = ICON_CHECK;
    window.setTimeout(() => {
      copy.classList.remove("is-copied");
      copy.innerHTML = ICON_COPY;
    }, 1100);
    showToast(`${dog.name} copied.`);
    track("dog_name_copied", { source: "card" });
  });
  actions.append(copy);

  card.append(top, note, styles, actions);
  return card;
}

function renderResults(results, { scroll = true } = {}) {
  state.results = results;
  tagGrid.replaceChildren();
  results.forEach((dog, index) => tagGrid.append(makeCard(dog, index)));
  syncCardStars();
  tagEmpty.hidden = true;
  tagGrid.hidden = false;
  boardCount.textContent = `${results.length} names`;
  copyAllButton.disabled = false;
  newNamesButton.disabled = false;
  if (status) status.textContent = `${results.length} names pulled.`;

  if (scroll) {
    const rect = board.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.55) {
      boardTitle.setAttribute("tabindex", "-1");
      boardTitle.focus({ preventScroll: true });
      boardTitle.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    }
  }
}

function runGenerator({ scroll = true, trigger = "form" } = {}) {
  const gender = selectedValue("gender", "any");
  const style = selectedValue("style", "cute");
  state.seed = (state.seed + 0x9e3779b9) >>> 0;
  const results = generateNames({ gender, style, count: 24 }, state.seed);
  renderResults(results, { scroll });
  track("dog_names_generated", { gender, style, names: results.length, trigger });
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
  runGenerator();
});

newNamesButton?.addEventListener("click", () => {
  runGenerator({ scroll: false, trigger: "new" });
  showToast("New names pulled.");
});

copyAllButton?.addEventListener("click", async () => {
  if (!state.results.length) return;
  const ok = await copyText(state.results.map((dog) => dog.name).join(", "));
  showToast(ok ? `All ${state.results.length} names copied.` : "Couldn’t copy — try selecting the names.");
  if (ok) track("dog_names_copied_all", { count: state.results.length });
});

shortlistCopy?.addEventListener("click", async () => {
  const names = [...state.favorites];
  if (!names.length) return;
  const ok = await copyText(names.join(", "));
  showToast(ok ? `Shortlist copied: ${names.length} name${names.length === 1 ? "" : "s"}.` : "Couldn’t copy — try selecting the names.");
  if (ok) track("dog_shortlist_copied", { count: names.length });
});

fillExample?.addEventListener("click", () => {
  const girl = form?.querySelector('input[name="gender"][value="girl"]');
  const cute = form?.querySelector('input[name="style"][value="cute"]');
  if (girl) girl.checked = true;
  if (cute) cute.checked = true;
  runGenerator({ trigger: "example" });
});

state.favorites = loadFavorites();
updateShortlist();

const presetGender = document.body.dataset.presetGender;
const presetStyle = document.body.dataset.presetStyle;
if (presetGender) {
  const radio = form?.querySelector(`input[name="gender"][value="${CSS.escape(presetGender)}"]`);
  if (radio) radio.checked = true;
}
if (presetStyle) {
  const radio = form?.querySelector(`input[name="style"][value="${CSS.escape(presetStyle)}"]`);
  if (radio) radio.checked = true;
}
