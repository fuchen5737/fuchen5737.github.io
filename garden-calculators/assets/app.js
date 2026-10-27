import { calculate, formatMaterialList, formatMoney, MATERIALS } from "./calc.js";

const form = document.querySelector("#yard-form");
const materialSelect = document.querySelector("#material");
const shapeInputs = form?.querySelectorAll('input[name="shape"]') || [];
const lengthField = document.querySelector("#length-field");
const widthField = document.querySelector("#width-field");
const diameterField = document.querySelector("#diameter-field");
const lengthInput = document.querySelector("#length");
const widthInput = document.querySelector("#width");
const diameterInput = document.querySelector("#diameter");
const depthField = document.querySelector("#depth-field");
const depthInput = document.querySelector("#depth");
const priceInput = document.querySelector("#price");
const priceLabel = document.querySelector("#price-label");
const error = document.querySelector("#yard-error");
const submitButton = form?.querySelector(".submit");
const ticketEmpty = document.querySelector("#ticket-empty");
const ticketResult = document.querySelector("#ticket-result");
const ticketMeta = document.querySelector("#ticket-meta");
const bigNumber = document.querySelector("#big-number");
const bigLabel = document.querySelector("#big-label");
const ticketRows = document.querySelector("#ticket-rows");
const ticketNote = document.querySelector("#ticket-note");
const copyButton = document.querySelector("#copy-list");
const anotherButton = document.querySelector("#calculate-again");
const fillExample = document.querySelector("#fill-example");
const toast = document.querySelector("#toast");
const status = document.querySelector("#yard-status");
const results = document.querySelector("#results");

const state = { result: null, toastTimer: 0 };

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2500);
}

function clearError() {
  if (!error) return;
  error.hidden = true;
  error.textContent = "";
  for (const input of form.querySelectorAll("input, select")) input.removeAttribute("aria-invalid");
}

function showError(message) {
  if (!error) return;
  error.hidden = false;
  error.textContent = message;
}

function currentShape() {
  return form?.querySelector('input[name="shape"]:checked')?.value || "rectangle";
}

function track(name, params) {
  if (typeof window.trackEvent === "function") window.trackEvent(name, params);
}

function syncShape() {
  const circle = currentShape() === "circle";
  if (lengthField) lengthField.hidden = circle;
  if (widthField) widthField.hidden = circle;
  if (diameterField) diameterField.hidden = !circle;
}

function syncMaterial() {
  const material = MATERIALS[materialSelect?.value];
  if (!material) return;
  if (depthInput) depthInput.value = material.defaultDepth || "";
  if (priceInput) priceInput.value = material.price;
  if (priceLabel) {
    priceLabel.textContent = material.priceUnit === "sq ft" ? "Price / sq ft" : "Price / cu yd";
  }
  if (depthField) depthField.hidden = material === MATERIALS.sod;
}

function makeRow(label, value) {
  const row = document.createElement("div");
  row.className = "ticket-row";
  const span = document.createElement("span");
  span.textContent = label;
  const strong = document.createElement("strong");
  strong.textContent = value;
  row.append(span, strong);
  return row;
}

function render(result) {
  state.result = result;
  const sod = result.material === "sod";
  ticketEmpty.hidden = true;
  ticketResult.hidden = false;
  ticketMeta.textContent = `${result.label} · ${result.area} sq ft`;
  bigNumber.textContent = sod ? String(result.pallets) : String(result.cubicYards);
  bigLabel.textContent = sod
    ? (result.pallets === 1 ? "pallet" : "pallets")
    : (result.cubicYards === 1 ? "cubic yard" : "cubic yards");

  ticketRows.replaceChildren(
    makeRow("Area", `${result.area} sq ft`),
    makeRow("Shape", result.shape === "circle" ? "Circle" : "Rectangle"),
    ...(sod ? [] : [makeRow("Depth", `${result.depthIn} in`)]),
    ...(sod ? [] : [makeRow("Volume", `${result.cubicFeet} cu ft`)]),
    ...(sod ? [makeRow("Pallet coverage", "500 sq ft / pallet")] : [makeRow("Bags", result.bags ? `${result.bags} ${result.bags === 1 ? "bag" : "bags"}` : "—")]),
    ...(sod ? [] : [makeRow("Tons", result.tons ? `${result.tons} ${result.tons === 1 ? "ton" : "tons"}` : "—")]),
    ...(sod ? [] : [makeRow("1 cu yd covers", `${result.coverage} sq ft`)]),
    makeRow("Price", result.priceUnit === "sq ft" ? `${formatMoney(result.price)} / sq ft` : `${formatMoney(result.price)} / cu yd`),
    makeRow("Estimate", formatMoney(result.cost)),
  );

  ticketNote.textContent = sod
    ? "Sod is sold by the pallet (about 500 sq ft). Order 5–10% extra for cuts and edges."
    : `At ${result.depthIn} in deep, one cubic yard covers about ${result.coverage} sq ft. Add 10% for settling and uneven ground.`;

  if (status) status.textContent = `${result.label} estimate ready: ${formatMoney(result.cost)}.`;
}

function readForm() {
  return {
    material: materialSelect?.value,
    shape: currentShape(),
    lengthFt: lengthInput?.value,
    widthFt: widthInput?.value,
    diameterFt: diameterInput?.value,
    depthIn: depthInput?.value,
    price: priceInput?.value,
  };
}

function runCalculation({ scroll = true, trigger = "form" } = {}) {
  clearError();
  const result = calculate(readForm());
  if (result.error) {
    showError(result.error);
    return;
  }
  render(result);
  track("yard_estimate_created", {
    material: result.material,
    shape: result.shape,
    depth_in: result.depthIn,
    cubic_yards: result.cubicYards,
    bags: result.bags,
    pallets: result.pallets,
    cost: Math.round(result.cost),
    trigger,
  });
  if (scroll) {
    const rect = results.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.55) {
      results.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    }
  }
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
  runCalculation();
});

materialSelect?.addEventListener("change", () => {
  syncMaterial();
  clearError();
  track("yard_material_changed", { material: materialSelect.value });
});

for (const input of shapeInputs) input.addEventListener("change", syncShape);

for (const input of form?.querySelectorAll("input") || []) {
  input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    if (error && !error.hidden) clearError();
  });
}

copyButton?.addEventListener("click", async () => {
  if (!state.result) return;
  const text = formatMaterialList(state.result);
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
  showToast(ok ? "Material list copied." : "Couldn’t copy — select the list instead.");
  if (ok) track("yard_list_copied", { material: state.result.material });
});

anotherButton?.addEventListener("click", () => {
  document.querySelector("#yard-form")?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "center",
  });
  materialSelect?.focus({ preventScroll: true });
});

fillExample?.addEventListener("click", () => {
  if (materialSelect) materialSelect.value = "mulch";
  const rectangle = form?.querySelector('input[name="shape"][value="rectangle"]');
  if (rectangle) rectangle.checked = true;
  if (lengthInput) lengthInput.value = "12";
  if (widthInput) widthInput.value = "8";
  syncShape();
  syncMaterial();
  runCalculation({ trigger: "example" });
});

const preset = document.body.dataset.presetMaterial;
if (preset && materialSelect && MATERIALS[preset]) {
  materialSelect.value = preset;
}
syncShape();
syncMaterial();
