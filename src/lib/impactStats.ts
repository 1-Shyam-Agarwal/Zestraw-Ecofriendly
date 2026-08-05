export const formatPlasticReplaced = (count: number) => {
  if (count >= 100000) {
    const lakhs = count / 100000;
    const formatted = lakhs.toLocaleString(undefined, { maximumFractionDigits: 2 });
    return `${formatted} ${lakhs === 1 ? "lakh" : "lakhs"}`;
  }
  return `${count.toLocaleString()} units`;
};

export interface ImpactItemInput {
  quantity?: number;
  size?: string | number;
  weight?: number;
}

export interface ImpactTotals {
  co2SavedKg: number;
  paraliRepurposedKg: number;
  plasticAvoided: number;
}

export function formatKg(value: number) {
  return value.toLocaleString(undefined, { maximumFractionDigits: 3 });
}

/** Same formulas as dashboard impact tracker: parali (g) = units × weight × 80%, CO₂ (g) = parali × 1.5 */
export function calculateImpactFromItems(items: ImpactItemInput[]): ImpactTotals {
  let co2Grams = 0;
  let paraliGrams = 0;
  let plastic = 0;

  items.forEach((item) => {
    const quantity = item.quantity || 0;
    const size = parseInt(String(item.size)) || 1;
    const totalUnits = quantity * size;
    const weight = item.weight || 0;
    const itemParali = (totalUnits * weight * 80) / 100;
    paraliGrams += itemParali;
    co2Grams += itemParali * 1.5;
    plastic += totalUnits;
  });

  return {
    co2SavedKg: co2Grams / 1000,
    paraliRepurposedKg: paraliGrams / 1000,
    plasticAvoided: plastic,
  };
}
