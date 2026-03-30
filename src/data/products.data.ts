export type Region = 'EU' | 'US';

export type Provider = 'gelato' | 'printify' | 'interne';

export type ProductCollection = 'classic' | 'urban' | 'heritage' | 'studio';

export type ProductCategory = 't-shirt' | 'hoodie' | 'casquette' | 'accessoire';

export interface RegionalInfo {
  price: number;
  currency: string;
  providerId: string;
  provider: Provider;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  collection: ProductCollection;
  category: ProductCategory;
  isNew?: boolean;
  regions: Record<Region, RegionalInfo>;
}

export const wearProducts: Product[] = [
  {
    id: 'cls-tee-signature',
    name: 'T-Shirt Signature Classic',
    image: '/images/brands/21-wear/01_classic_collection.jpg',
    collection: 'classic',
    category: 't-shirt',
    isNew: true,
    regions: {
      EU: {
        price: 45,
        currency: 'EUR',
        providerId: 'GELATO-EU-TEE-001',
        provider: 'gelato',
      },
      US: {
        price: 49,
        currency: 'USD',
        providerId: 'GELATO-US-TEE-001',
        provider: 'gelato',
      },
    },
  },
  {
    id: 'urb-hoodie-01',
    name: 'Hoodie Urban Oversize',
    image: '/images/brands/21-wear/02_urban_collection.jpg',
    collection: 'urban',
    category: 'hoodie',
    isNew: true,
    regions: {
      EU: {
        price: 85,
        currency: 'EUR',
        providerId: 'GELATO-EU-HOOD-001',
        provider: 'gelato',
      },
      US: {
        price: 89,
        currency: 'USD',
        providerId: 'GELATO-US-HOOD-001',
        provider: 'gelato',
      },
    },
  },
  {
    id: 'her-cap-01',
    name: 'Casquette Vintage Heritage',
    image: '/images/brands/21-wear/03_heritage_collection.jpg',
    collection: 'heritage',
    category: 'casquette',
    regions: {
      EU: {
        price: 35,
        currency: 'EUR',
        providerId: 'PRINTIFY-EU-CAP-001',
        provider: 'printify',
      },
      US: {
        price: 35,
        currency: 'USD',
        providerId: 'PRINTIFY-US-CAP-001',
        provider: 'printify',
      },
    },
  },
  {
    id: 'std-tee-01',
    name: 'T-Shirt Concept Studio',
    image: '/images/brands/21-wear/03_studio_collection.jpg',
    collection: 'studio',
    category: 't-shirt',
    isNew: true,
    regions: {
      EU: {
        price: 65,
        currency: 'EUR',
        providerId: 'GELATO-EU-STUDIO-001',
        provider: 'gelato',
      },
      US: {
        price: 70,
        currency: 'USD',
        providerId: 'GELATO-US-STUDIO-001',
        provider: 'gelato',
      },
    },
  },
];