export const MATERIALS = {
  mulch: {
    label: "Mulch",
    price: 38,
    priceUnit: "cu yd",
    bagCuFt: 2,
    tonsPerCuYd: 0.4,
    defaultDepth: 3,
  },
  gravel: {
    label: "Gravel",
    price: 55,
    priceUnit: "cu yd",
    bagCuFt: 0.5,
    tonsPerCuYd: 1.4,
    defaultDepth: 4,
  },
  soil: {
    label: "Topsoil",
    price: 42,
    priceUnit: "cu yd",
    bagCuFt: 2,
    tonsPerCuYd: 1.1,
    defaultDepth: 2,
  },
  sod: {
    label: "Sod",
    price: 0.65,
    priceUnit: "sq ft",
    bagCuFt: 0,
    tonsPerCuYd: 0,
    palletSqFt: 500,
    defaultDepth: 0,
  },
};

export const SHAPES = [
  { id: "rectangle", label: "Rectangle" },
  { id: "circle", label: "Circle" },
];

export function round1(value) {
  return Math.round(value * 10) / 10;
}

export function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export function calculate(input) {
  const material = MATERIALS[input.material];
  if (!material) return { error: "Choose a material." };

  const shape = input.shape === "circle" ? "circle" : "rectangle";
  const length = Number(input.lengthFt);
  const width = Number(input.widthFt);
  const diameter = Number(input.diameterFt);
  const price = Number(input.price);

  if (!Number.isFinite(price) || price <= 0) {
    return { error: "Enter a price greater than zero." };
  }

  let area = 0;
  if (shape === "circle") {
    if (!Number.isFinite(diameter) || diameter <= 0) {
      return { error: "Enter a diameter greater than zero." };
    }
    area = Math.PI * (diameter / 2) ** 2;
  } else {
    if (!Number.isFinite(length) || length <= 0 || !Number.isFinite(width) || width <= 0) {
      return { error: "Enter a length and width greater than zero." };
    }
    area = length * width;
  }

  if (input.material === "sod") {
    const pallets = Math.ceil(area / material.palletSqFt);
    return {
      material: input.material,
      label: material.label,
      shape,
      area: round1(area),
      depthIn: 0,
      cubicFeet: null,
      cubicYards: null,
      bags: null,
      tons: null,
      pallets,
      price,
      priceUnit: material.priceUnit,
      cost: area * price,
      coverage: null,
    };
  }

  const depthIn = Number(input.depthIn);
  if (!Number.isFinite(depthIn) || depthIn <= 0 || depthIn > 24) {
    return { error: "Enter a depth between 0.5 and 24 inches." };
  }

  const cubicFeet = (area * depthIn) / 12;
  const cubicYards = cubicFeet / 27;
  const bags = material.bagCuFt > 0 ? Math.ceil(cubicFeet / material.bagCuFt) : null;
  const tons = cubicYards * material.tonsPerCuYd;

  return {
    material: input.material,
    label: material.label,
    shape,
    area: round1(area),
    depthIn,
    cubicFeet: round1(cubicFeet),
    cubicYards: round1(cubicYards),
    bags,
    tons: round1(tons),
    pallets: null,
    price,
    priceUnit: material.priceUnit,
    cost: cubicYards * price,
    coverage: Math.round(324 / depthIn),
  };
}

export function formatMaterialList(result) {
  if (!result || result.error) return "";
  const parts = [];
  if (result.material === "sod") {
    parts.push(`Sod: ${result.area} sq ft`);
    parts.push(`${result.pallets} ${result.pallets === 1 ? "pallet" : "pallets"} (500 sq ft each)`);
  } else {
    parts.push(`${result.label}: ${result.cubicYards} cu yd (${result.cubicFeet} cu ft)`);
    if (result.bags) parts.push(`${result.bags} bags`);
    if (result.tons) parts.push(`${result.tons} tons`);
    parts.push(`Covers ${result.area} sq ft at ${result.depthIn} in deep`);
  }
  parts.push(`Estimate: ${formatMoney(result.cost)}`);
  return parts.join(" · ");
}
