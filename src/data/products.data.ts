export type Region = "EU" | "US" | "WORLD";

export interface RegionalInfo {
  price: number;
  currency: string;
  providerId: string; // Le SKU Gelato/Printify spécifique
  provider: "gelato" | "printify" | "interne";
}

export interface Product {
  id: string;
  name: string;
  image: string;
  collection: "classic" | "urban" | "heritage" | "studio";
  category: "t-shirt" | "hoodie" | "casquette" | "accessoire";
  isNew?: boolean;
  regions: Record<Region, RegionalInfo>; // Infos par région
}

export const wearProducts: Product[] = [
  // --- COLLECTION CLASSIC ---
  {
    id: "cls-tee-signature",
    name: "T-Shirt Signature Classic",
    image: "/images/brands/21-wear/01_classic_collection.jpg",
    collection: "classic",
    category: "t-shirt",
    isNew: true,
    regions: {
      EU: { price: 45, currency: "EUR", providerId: "GELATO-EU-TEE-001", provider: "gelato" },
      US: { price: 49, currency: "USD", providerId: "GELATO-US-TEE-001", provider: "gelato" },
      WORLD: { price: 52, currency: "USD", providerId: "GELATO-WORLD-TEE-001", provider: "gelato" }
    }
  },

  // --- COLLECTION URBAN ---
  {
    id: "urb-hoodie-01",
    name: "Hoodie Urban Oversize",
    image: "/images/brands/21-wear/02_urban_collection.jpg",
    collection: "urban",
    category: "hoodie",
    isNew: true,
    regions: {
      EU: { price: 85, currency: "EUR", providerId: "GELATO-EU-HOOD-001", provider: "gelato" },
      US: { price: 89, currency: "USD", providerId: "GELATO-US-HOOD-001", provider: "gelato" },
      WORLD: { price: 95, currency: "USD", providerId: "GELATO-WORLD-HOOD-001", provider: "gelato" }
    }
  },

  // --- COLLECTION HERITAGE ---
  {
    id: "her-cap-01",
    name: "Casquette Vintage Heritage",
    image: "/images/brands/21-wear/03_heritage_collection.jpg",
    collection: "heritage",
    category: "casquette",
    regions: {
      EU: { price: 35, currency: "EUR", providerId: "PRINTIFY-EU-CAP-001", provider: "printify" },
      US: { price: 35, currency: "USD", providerId: "PRINTIFY-US-CAP-001", provider: "printify" },
      WORLD: { price: 40, currency: "USD", providerId: "PRINTIFY-WORLD-CAP-001", provider: "printify" }
    }
  },

  // --- COLLECTION STUDIO ---
  {
    id: "std-tee-01",
    name: "T-Shirt Concept Studio",
    image: "/images/brands/21-wear/03_studio_collection.jpg",
    collection: "studio",
    category: "t-shirt",
    isNew: true,
    regions: {
      EU: { price: 65, currency: "EUR", providerId: "GELATO-EU-STUDIO-001", provider: "gelato" },
      US: { price: 70, currency: "USD", providerId: "GELATO-US-STUDIO-001", provider: "gelato" },
      WORLD: { price: 75, currency: "USD", providerId: "GELATO-WORLD-STUDIO-001", provider: "gelato" }
    }
  }
];