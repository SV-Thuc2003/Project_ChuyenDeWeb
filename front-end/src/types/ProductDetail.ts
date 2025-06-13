export interface ProductImage {
  image_url: string;
  is_thumbnail: boolean;
}
export interface Reviews {
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  brand: string | null;
  feature: string | null;
  stock: number;
  status: string;
  productType: ProductType;
  categories: string[];
  imageUrls: string[];
  thumbnailUrl: string;
  detail: ProductTypeDetail;
  isFeatured: boolean | null;
  reviews?: Reviews[];
}

export type ProductType =
  | "WATER_PURIFIER"
  | "FILTER_CARTRIDGE"
  | "NON_ELECTRIC_PURIFIER"
  | "PREFILTER_HOUSING";

export type ProductTypeDetail =
  | WaterPurifierDetail
  | FilterCartridgeDetail
  | NonElectricPurifierDetail
  | PrefilterHousingDetail;

export interface WaterPurifierDetail {
  stageNumber: number;            // filtration_stages
  technology: string;
  modelName?: string | null;
  type?: string | null;
  hotColdSupport?: string | null;
  tankCapacity?: string | null;
  capacityLPerHour?: string | null;
  powerConsumption?: string | null;
  dimensions?: string | null;
  weightKg?: number | null;
  voltage?: string | null;
  origin?: string | null;
  warranty?: string | null;
  suitableUses?: string | null;
  material?: string | null;
  additionalInfo?: string | null;
}


export interface FilterCartridgeDetail {
  stageNumber: number;
  type: string;
  material: string;
  filterSizeMicron: string;
  lifespanLiters: number | null;
  lifespanMonths: number | null;
  functions: string;
  brandOrigin: string;
  manufactureOrigin: string;
  warranty: string | null;
  additionalInfo: string | null;
}

export interface NonElectricPurifierDetail {
  filtrationStages: number;
  filterLevels: number;
  filterLifespanMonths: number;
  technology: string;
  functions: string;
  workingPressureMpa: string;
  flowRateLPerMin: number;
  tankCapacity: number | null;
  capacityLPerHour: number;
  features: string;
  material: string;
  dimensions: string;
  weightKg: number;
  brandOrigin: string;
  manufactureOrigin: string;
  launchYear: number;
  warranty: string | null;
  additionalInfo: string | null;
}

export interface PrefilterHousingDetail {
  cupCount: string;
  filterMaterials: string;
  housingMaterial: string;
  filterCapacity: string;
  functions: string;
  filterLifespan: string;
  dimensions: string;
  weightKg: number;
  brandOrigin: string;
  manufactureOrigin: string;
  launchYear: number;
  warranty: string | null;
  additionalInfo: string | null;
}
