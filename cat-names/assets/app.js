import { generateNames, generateWarriorNames, STYLE_LABELS } from "./names.js";

const catForm = document.querySelector("#name-form");
const warriorForm = document.querySelector("#warrior-form");
const toast = document.querySelector("#toast");

const catGrid = document.querySelector("#cat-grid");
const catEmpty = document.querySelector("#cat-empty");
const boardCount = document.querySelector("#board-count");
const newNamesButton = document.querySelector("#new-names");
const copyAllButton = document.querySelector("#copy-all");
const shortlistCount = document.querySelector("#shortlist-count");
const shortlistChips = document.querySelector("#shortlist-chips");
const shortlistCopy = document.querySelector("#copy-shortlist");
const fillExample = document.querySelector("#fill-example");
const catStatus = document.querySelector("#cat-status");
const boardTitle = document.querySelector("#board-title");
const board = document.querySelector("#board");

const warriorGrid = document.querySelector("#warrior-grid");
const warriorEmpty = document.querySelector("#warrior-empty");
const warriorCount = document.querySelector("#warrior-count");
const warriorNew = document.querySelector("#warrior-new");
const warriorCopy = document.querySelector("#warrior-copy");
const warriorStatus = document.querySelector("#warrior-status");
const warriorTitle = document.querySelector("#warrior-title");
const warriorBoard = document.querySelector("#warrior-board");

const FAV_KEY = "catnameclub:favorites";
const ICON_STAR = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z"/></svg>`;
const ICON_COPY = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="9" y="9" width="11" height="11"/><path d="M5 15V4h11"/></svg>`;
const ICON_CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="m4 12 5 5L20 6"/></svg>`;
const ROSETTE = `<svg class="cert__seal" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="20" fill="#b8f2d0" stroke="#5b2a5e" stroke-width="2"/><path d="m24 11 3.8 9.2 9.9.8-7.5 6.5 2.3 9.6L24 31.3 15.5 37l2.3-9.6-7.5-6.5 9.9-.8L24 11Z" fill="#ffc93c" stroke="#5b2a5e" stroke-width="1.5"/></svg>`;

const state = {
  results: [],
  favorites: new Set(),
  seed: Date.now() >>> 0,
  warriorClan: "ThunderClan",
  warriorResults: [],
  warriorSeed: Date.now() >>> 0,
  toastTimer: 0,
};

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
  return catForm?.querySelector(`input[name="${name}"]:checked`)?.value || fallback;
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
        syncStars();
        showToast(`${name} removed from shortlist.`);
      });
      chip.append(remove);
      shortlistChips.append(chip);
    }
  }
  if (shortlistCopy) shortlistCopy.disabled = names.length === 0;
}

function syncStars() {
  for (const card of catGrid?.querySelectorAll(".cert") || []) {
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
  syncStars();
  showToast(state.favorites.has(name) ? `${name} saved to shortlist.` : `${name} removed from shortlist.`);
  track("cat_name_favorited", { saved: state.favorites.has(name), favorites: state.favorites.size });
}

function copyButtonFor(name) {
  const copy = document.createElement("button");
  copy.type = "button";
  copy.className = "icon-button";
  copy.setAttribute("aria-label", `Copy ${name}`);
  copy.innerHTML = ICON_COPY;
  copy.addEventListener("click", async () => {
    const ok = await copyText(name);
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
    showToast(`${name} copied.`);
    track("cat_name_copied", { source: "card" });
  });
  return copy;
}

function makeCatCard(cat, index) {
  const card = document.createElement("article");
  card.className = "cert";
  card.dataset.name = cat.name;
  card.style.setProperty("--i", index);
  card.innerHTML =
    `<div class="cert__head"><span>Cat Name Club</span><span>Certificate / ${String(index + 1).padStart(2, "0")}</span></div>` +
    ROSETTE +
    `<h3 class="cert__name">${cat.name}</h3>` +
    `<p class="cert__note">${cat.note}</p>` +
    `<div class="cert__styles"></div>` +
    `<div class="cert__actions"></div>`;

  const styles = card.querySelector(".cert__styles");
  for (const style of cat.styles) {
    const chip = document.createElement("span");
    chip.className = "cert__style";
    chip.textContent = STYLE_LABELS[style] || style;
    styles.append(chip);
  }

  const actions = card.querySelector(".cert__actions");
  const star = document.createElement("button");
  star.type = "button";
  star.className = "icon-button star";
  star.innerHTML = ICON_STAR;
  star.setAttribute("aria-pressed", "false");
  star.setAttribute("aria-label", `Save ${cat.name} to shortlist`);
  star.addEventListener("click", () => toggleFavorite(cat.name));
  actions.append(star, copyButtonFor(cat.name));
  return card;
}

function renderCats(results, { scroll = true } = {}) {
  state.results = results;
  catGrid.replaceChildren();
  results.forEach((cat, index) => catGrid.append(makeCatCard(cat, index)));
  syncStars();
  catEmpty.hidden = true;
  catGrid.hidden = false;
  boardCount.textContent = `${results.length} names`;
  copyAllButton.disabled = false;
  newNamesButton.disabled = false;
  if (catStatus) catStatus.textContent = `${results.length} names pulled.`;
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

function runCat({ scroll = true, trigger = "form" } = {}) {
  const gender = selectedValue("gender", "any");
  const style = selectedValue("style", "cute");
  state.seed = (state.seed + 0x9e3779b9) >>> 0;
  const results = generateNames({ gender, style, count: 24 }, state.seed);
  renderCats(results, { scroll });
  track("cat_names_generated", { gender, style, names: results.length, trigger });
}

catForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = catForm.querySelector(".submit");
  if (button?.disabled) return;
  if (button) {
    button.disabled = true;
    window.setTimeout(() => {
      button.disabled = false;
    }, 420);
  }
  runCat();
});

newNamesButton?.addEventListener("click", () => {
  runCat({ scroll: false, trigger: "new" });
  showToast("New names pulled.");
});

copyAllButton?.addEventListener("click", async () => {
  if (!state.results.length) return;
  const ok = await copyText(state.results.map((cat) => cat.name).join(", "));
  showToast(ok ? `All ${state.results.length} names copied.` : "Couldn’t copy — try selecting the names.");
  if (ok) track("cat_names_copied_all", { count: state.results.length });
});

shortlistCopy?.addEventListener("click", async () => {
  const names = [...state.favorites];
  if (!names.length) return;
  const ok = await copyText(names.join(", "));
  showToast(ok ? `Shortlist copied: ${names.length} name${names.length === 1 ? "" : "s"}.` : "Couldn’t copy — try selecting the names.");
  if (ok) track("cat_shortlist_copied", { count: names.length });
});

fillExample?.addEventListener("click", () => {
  const girl = catForm?.querySelector('input[name="gender"][value="girl"]');
  const cute = catForm?.querySelector('input[name="style"][value="cute"]');
  if (girl) girl.checked = true;
  if (cute) cute.checked = true;
  runCat({ trigger: "example" });
});

function makeWarriorCard(name, index, clan) {
  const card = document.createElement("article");
  card.className = "cert";
  card.dataset.name = name;
  card.style.setProperty("--i", index);
  card.innerHTML =
    `<div class="cert__head"><span>Warrior name</span><span>${clan}</span></div>` +
    ROSETTE +
    `<h3 class="cert__name">${name}</h3>` +
    `<p class="cert__note">Fan-made prefix + suffix name. Not an official Warriors name.</p>` +
    `<div class="cert__styles"><span class="cert__style">Fan-made</span><span class="cert__style">${clan}</span></div>` +
    `<div class="cert__actions"></div>`;
  card.querySelector(".cert__actions").append(copyButtonFor(name));
  return card;
}

function renderWarriors(names, { scroll = true } = {}) {
  state.warriorResults = names;
  warriorGrid.replaceChildren();
  names.forEach((name, index) => warriorGrid.append(makeWarriorCard(name, index, state.warriorClan)));
  warriorEmpty.hidden = true;
  warriorGrid.hidden = false;
  warriorCount.textContent = `${names.length} names`;
  warriorCopy.disabled = false;
  warriorNew.disabled = false;
  if (warriorStatus) warriorStatus.textContent = `${names.length} warrior names pulled.`;
  if (scroll) {
    const rect = warriorBoard.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.55) {
      warriorTitle.setAttribute("tabindex", "-1");
      warriorTitle.focus({ preventScroll: true });
      warriorTitle.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    }
  }
}

function runWarrior({ scroll = true, trigger = "form" } = {}) {
  const clan = warriorForm?.querySelector("#clan")?.value || "ThunderClan";
  state.warriorClan = clan;
  state.warriorSeed = (state.warriorSeed + 0x9e3779b9) >>> 0;
  renderWarriors(generateWarriorNames(state.warriorSeed, 24), { scroll });
  track("warrior_names_generated", { clan, names: 24, trigger });
}

warriorForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = warriorForm.querySelector(".submit");
  if (button?.disabled) return;
  if (button) {
    button.disabled = true;
    window.setTimeout(() => {
      button.disabled = false;
    }, 420);
  }
  runWarrior();
});

warriorNew?.addEventListener("click", () => {
  runWarrior({ scroll: false, trigger: "new" });
  showToast("New warrior names pulled.");
});

warriorCopy?.addEventListener("click", async () => {
  if (!state.warriorResults.length) return;
  const ok = await copyText(state.warriorResults.join(", "));
  showToast(ok ? `All ${state.warriorResults.length} warrior names copied.` : "Couldn’t copy — try selecting the names.");
  if (ok) track("warrior_names_copied", { count: state.warriorResults.length });
});

state.favorites = loadFavorites();
updateShortlist();

const presetGender = document.body.dataset.presetGender;
const presetStyle = document.body.dataset.presetStyle;
if (presetGender) {
  const radio = catForm?.querySelector(`input[name="gender"][value="${CSS.escape(presetGender)}"]`);
  if (radio) radio.checked = true;
}
if (presetStyle) {
  const radio = catForm?.querySelector(`input[name="style"][value="${CSS.escape(presetStyle)}"]`);
  if (radio) radio.checked = true;
}
