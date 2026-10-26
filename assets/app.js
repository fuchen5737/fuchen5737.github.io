import { generateHashtags, STYLE_LABELS } from "./generator.js";

const form = document.querySelector("#hashtag-form");
const proof = document.querySelector("#proof");
const sheet = document.querySelector("#sheet");
const list = document.querySelector("#proof-list");
const empty = document.querySelector("#proof-empty");
const count = document.querySelector("#sheet-count");
const error = document.querySelector("#form-error");
const copyAllButton = document.querySelector("#copy-all");
const saveImageButton = document.querySelector("#save-image");
const printAnotherButton = document.querySelector("#print-another");
const fillExampleButton = document.querySelector("#fill-example");
const proofTitle = document.querySelector("#proof-title");
const toast = document.querySelector("#toast");
const submitButton = form?.querySelector(".submit");

const state = { data: null, results: [], seed: Date.now() >>> 0 };
let toastTimer = 0;

const ICON_COPY = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="9" y="9" width="11" height="11"/><path d="M5 15V4h11"/></svg>`;
const ICON_CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m4 12 5 5L20 6"/></svg>`;

const STYLE_DOTS = {
  classic: "#2743f0",
  funny: "#ff4f8b",
  punny: "#ffd23f",
  short: "#14161a",
  story: "#ff4f8b",
  date: "#2743f0",
};

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function clearError() {
  if (!error) return;
  error.hidden = true;
  error.textContent = "";
  for (const input of form.querySelectorAll("input[required]")) {
    input.removeAttribute("aria-invalid");
  }
}

function showError(message) {
  if (!error) return;
  error.hidden = false;
  error.textContent = message;
}

function currentStyle() {
  return form.querySelector('input[name="style"]:checked')?.value || "classic";
}

function readForm() {
  return {
    p1: form.querySelector("#p1").value.trim(),
    p2: form.querySelector("#p2").value.trim(),
    last: form.querySelector("#last").value.trim(),
    date: form.querySelector("#date").value,
    detail: form.querySelector("#detail").value.trim(),
    style: currentStyle(),
  };
}

function dotStyle(style) {
  return STYLE_DOTS[style] || "#2743f0";
}

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
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

function renderRows(results) {
  list.replaceChildren();
  results.forEach((item, index) => {
    const row = document.createElement("li");
    row.className = "proof-row";
    row.style.setProperty("--i", index);

    const num = document.createElement("span");
    num.className = "proof-row__num";
    num.textContent = String(index + 1).padStart(2, "0");

    const tag = document.createElement("span");
    tag.className = "proof-row__tag";
    tag.textContent = item.tag;

    const style = document.createElement("span");
    style.className = "proof-row__style";
    style.textContent = STYLE_LABELS[item.style] || item.style;
    style.style.setProperty("--dot", dotStyle(item.style));

    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "proof-row__copy";
    copy.setAttribute("aria-label", `Copy ${item.tag}`);
    copy.innerHTML = ICON_COPY;

    copy.addEventListener("click", async () => {
      const ok = await copyText(item.tag);
      if (!ok) {
        showToast("Couldn’t copy — select the tag instead.");
        return;
      }
      copy.classList.add("is-copied");
      copy.innerHTML = ICON_CHECK;
      window.setTimeout(() => {
        copy.classList.remove("is-copied");
        copy.innerHTML = ICON_COPY;
      }, 1200);
      showToast(`${item.tag} copied.`);
    });

    row.append(num, tag, style, copy);
    list.appendChild(row);
  });
}

function paintSheet(results, { scroll = true } = {}) {
  state.results = results;
  renderRows(results);
  empty.hidden = true;
  list.hidden = false;
  count.textContent = `${results.length} hashtags`;
  const status = document.querySelector("#result-status");
  if (status) status.textContent = `Sheet printed with ${results.length} hashtags.`;
  copyAllButton.disabled = false;
  saveImageButton.disabled = false;
  printAnotherButton.disabled = false;

  sheet.classList.remove("is-printing");
  void sheet.offsetWidth;
  sheet.classList.add("is-printing");

  if (scroll) {
    const rect = proof.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.55) {
      proofTitle.setAttribute("tabindex", "-1");
      proofTitle.focus({ preventScroll: true });
      proofTitle.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    }
  }
}

function runGenerator({ scroll = true } = {}) {
  clearError();
  const data = readForm();
  const missing = [];
  if (!data.p1) missing.push("partner one");
  if (!data.p2) missing.push("partner two");

  if (missing.length) {
    showError(`Add ${missing.join(" and ")} to print a sheet.`);
    for (const id of ["p1", "p2"]) {
      const input = form.querySelector(`#${id}`);
      if (!input.value.trim()) {
        input.setAttribute("aria-invalid", "true");
        input.focus();
        break;
      }
    }
    return;
  }

  state.data = data;
  state.seed = (state.seed + 0x9e3779b9) >>> 0;
  const results = generateHashtags(data, { seed: state.seed, limit: 24 });

  if (!results.length) {
    showError("Those names didn’t produce any tags. Try a shorter spelling.");
    return;
  }

  paintSheet(results, { scroll });
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (submitButton?.disabled) return;
  if (submitButton) {
    submitButton.disabled = true;
    window.setTimeout(() => {
      submitButton.disabled = false;
    }, 520);
  }
  runGenerator();
});

for (const input of form?.querySelectorAll("input") || []) {
  input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    if (error && !error.hidden) clearError();
  });
}

copyAllButton?.addEventListener("click", async () => {
  if (!state.results.length) return;
  const text = state.results.map((item) => item.tag).join(" ");
  const ok = await copyText(text);
  showToast(ok ? `All ${state.results.length} hashtags copied.` : "Couldn’t copy — try selecting the tags.");
});

printAnotherButton?.addEventListener("click", () => {
  if (!state.data) return;
  runGenerator({ scroll: false });
  showToast("Another sheet printed.");
});

fillExampleButton?.addEventListener("click", () => {
  form.querySelector("#p1").value = "Anna";
  form.querySelector("#p2").value = "Ben";
  form.querySelector("#last").value = "Smith";
  form.querySelector("#date").value = "2027-06-12";
  form.querySelector("#detail").value = "we met at a dog park";
  const classic = form.querySelector('input[name="style"][value="classic"]');
  if (classic) classic.checked = true;
  runGenerator();
});

function fitFont(ctx, text, maxWidth, startSize, weight = "800", family = '"Bricolage Grotesque", sans-serif') {
  let size = startSize;
  while (size > 20) {
    ctx.font = `${weight} ${size}px ${family}`;
    if (ctx.measureText(text).width <= maxWidth) return size;
    size -= 2;
  }
  ctx.font = `${weight} ${size}px ${family}`;
  return size;
}

function drawRegistration(ctx, x, y, color = "#ff4f8b") {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y, 38, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x - 52, y);
  ctx.lineTo(x + 52, y);
  ctx.moveTo(x, y - 52);
  ctx.lineTo(x, y + 52);
  ctx.stroke();
  ctx.restore();
}

function drawCrop(ctx, x, y, dx, dy) {
  ctx.save();
  ctx.strokeStyle = "#14161a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + dx * 0, y + dy * 0);
  ctx.lineTo(x + dx * 22, y + dy * 0);
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + dy * 22);
  ctx.stroke();
  ctx.restore();
}

async function buildShareImage() {
  await document.fonts.ready;
  await Promise.all([
    document.fonts.load('800 92px "Bricolage Grotesque"'),
    document.fonts.load('500 18px "Public Sans"'),
    document.fonts.load('500 16px "Roboto Mono"'),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  const data = state.data;
  const shortEnough = state.results.filter((item) => [...item.tag].length <= 30);
  const tags = (shortEnough.length >= 6 ? shortEnough : state.results).slice(0, 6);

  ctx.fillStyle = "#eef1f5";
  ctx.fillRect(0, 0, 1080, 1350);
  ctx.fillStyle = "#2743f0";
  ctx.fillRect(0, 0, 1080, 560);

  ctx.fillStyle = "rgba(238,241,245,0.20)";
  for (let x = 760; x < 1040; x += 14) {
    for (let y = 24; y < 156; y += 14) {
      ctx.beginPath();
      ctx.arc(x, y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.fillStyle = "#ff4f8b";
  ctx.fillRect(72, 62, 44, 44);
  ctx.fillStyle = "#14161a";
  ctx.font = '800 38px "Bricolage Grotesque"';
  ctx.textAlign = "center";
  ctx.fillText("#", 94, 96);
  ctx.textAlign = "left";

  ctx.fillStyle = "#eef1f5";
  ctx.font = '800 38px "Bricolage Grotesque"';
  ctx.fillText("TAG THE VOWS", 134, 96);

  ctx.fillStyle = "#ffd23f";
  ctx.font = '500 17px "Roboto Mono"';
  ctx.fillText("WEDDING HASHTAGS / PROOF SHEET", 72, 154);

  const names = `${data.p1} & ${data.p2}`.toUpperCase();
  fitFont(ctx, names, 760, 96);
  ctx.fillStyle = "#eef1f5";
  ctx.fillText(names, 72, 306);

  let dateLabel = "JUST MARRIED";
  if (data.date) {
    const d = new Date(`${data.date}T12:00:00`);
    if (!Number.isNaN(d.getTime())) {
      dateLabel = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase();
    }
  }
  fitFont(ctx, dateLabel, 760, 44);
  ctx.fillStyle = "#ffd23f";
  ctx.fillText(dateLabel, 72, 384);

  drawRegistration(ctx, 946, 284);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(48, 520, 984, 762);

  const bar = ["#ff4f8b", "#2743f0", "#ffd23f", "#14161a", "#e2e7ee"];
  bar.forEach((color, index) => {
    const x = 48 + index * 196.8;
    ctx.fillStyle = color;
    ctx.fillRect(x, 520, 196.8, 12);
    ctx.strokeStyle = "rgba(20,22,26,0.65)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, 520, 196.8, 12);
  });

  ctx.fillStyle = "#14161a";
  ctx.font = '600 18px "Roboto Mono"';
  ctx.fillText("PROOF SHEET", 84, 590);

  const startY = 668;
  const rowHeight = 88;
  tags.forEach((item, index) => {
    const y = startY + index * rowHeight;
    ctx.fillStyle = "#5c6472";
    ctx.font = '500 17px "Roboto Mono"';
    ctx.fillText(String(index + 1).padStart(2, "0"), 84, y + 10);

    fitFont(ctx, item.tag, 780, 46);
    ctx.fillStyle = "#14161a";
    ctx.fillText(item.tag, 142, y + 10);

    if (index < tags.length - 1) {
      ctx.save();
      ctx.strokeStyle = "rgba(20,22,26,0.26)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 7]);
      ctx.beginPath();
      ctx.moveTo(84, y + 40);
      ctx.lineTo(996, y + 40);
      ctx.stroke();
      ctx.restore();
    }
  });

  ctx.textAlign = "right";
  ctx.fillStyle = "#ff4f8b";
  ctx.font = '600 16px "Roboto Mono"';
  ctx.fillText("PROOF", 996, 590);
  ctx.textAlign = "left";

  ctx.fillStyle = "#14161a";
  ctx.font = '600 18px "Roboto Mono"';
  ctx.fillText("tagthevows.com", 84, 1238);
  ctx.textAlign = "right";
  ctx.fillStyle = "#5c6472";
  ctx.font = '400 15px "Roboto Mono"';
  ctx.fillText("Made in your browser. No signup.", 996, 1238);
  ctx.textAlign = "left";

  drawCrop(ctx, 48, 520, -1, -1);
  drawCrop(ctx, 1032, 520, 1, -1);
  drawCrop(ctx, 48, 1282, -1, 1);
  drawCrop(ctx, 1032, 1282, 1, 1);

  return canvas;
}

saveImageButton?.addEventListener("click", async () => {
  if (!state.results.length) {
    showToast("Print a sheet first.");
    return;
  }
  saveImageButton.disabled = true;
  const original = saveImageButton.innerHTML;
  saveImageButton.textContent = "Rendering…";
  try {
    const canvas = await buildShareImage();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) throw new Error("No image");
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const slug = `${state.data.p1}-${state.data.p2}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    link.href = url;
    link.download = `tag-the-vows-${slug}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    showToast("Share card saved.");
  } catch {
    showToast("Couldn’t render the image. Try again.");
  } finally {
    saveImageButton.disabled = false;
    saveImageButton.innerHTML = original;
  }
});

const preset = document.body.dataset.presetStyle;
const urlStyle = new URLSearchParams(window.location.search).get("style");
const initialStyle = urlStyle || preset;
if (initialStyle) {
  const radio = form?.querySelector(`input[name="style"][value="${CSS.escape(initialStyle)}"]`);
  if (radio) radio.checked = true;
}
