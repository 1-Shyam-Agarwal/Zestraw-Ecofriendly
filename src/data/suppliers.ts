export interface Supplier {
    id: number;
    name: string;
    category: string;
    verified: boolean;
    location: string;
    state: string;
    moq: number;
    unit: string;
    priceMin: number;
    priceMax: number;
    priceUnit: string;
    sustainabilityRating: number;
}

export const suppliers: Supplier[] = [
    { id: 1, name: "GreenPulse Bio-Energy", category: "Power Plant", verified: true, location: "Ludhiana", state: "Punjab", moq: 50, unit: "Tons", priceMin: 2400, priceMax: 2800, priceUnit: "Ton", sustainabilityRating: 85 },
    { id: 2, name: "EverLeaf Paper Mills", category: "Paper Industry", verified: true, location: "Karnal", state: "Haryana", moq: 100, unit: "Tons", priceMin: 3000, priceMax: 3500, priceUnit: "Ton", sustainabilityRating: 92 },
    { id: 3, name: "Eco-Brick Solutions", category: "Construction", verified: false, location: "Meerut", state: "Uttar Pradesh", moq: 20, unit: "Tons", priceMin: 2000, priceMax: 2200, priceUnit: "Ton", sustainabilityRating: 65 },
    { id: 4, name: "AgroFuel Ltd.", category: "Ethanol Plant", verified: true, location: "Bikaner", state: "Rajasthan", moq: 200, unit: "Tons", priceMin: 2600, priceMax: 3100, priceUnit: "Ton", sustainabilityRating: 78 },
    { id: 5, name: "Sustaina-Box Co.", category: "Packaging", verified: true, location: "Ambala", state: "Haryana", moq: 10, unit: "Tons", priceMin: 3200, priceMax: 3600, priceUnit: "Ton", sustainabilityRating: 88 },
    { id: 6, name: "BioHarvest India", category: "Power Plant", verified: true, location: "Amritsar", state: "Punjab", moq: 75, unit: "Tons", priceMin: 2100, priceMax: 2500, priceUnit: "Ton", sustainabilityRating: 71 },
];

export const locations = ["Punjab", "Haryana", "Uttar Pradesh", "Rajasthan"];
