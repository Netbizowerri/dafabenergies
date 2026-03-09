export type Category =
  | "Inverters"
  | "Solar Panels"
  | "Battery Storage"
  | "Electrical Accessories"
  | "SVC Products";

export interface Product {
  id: string;
  name: string;
  category: Category;
  image: string;
  description: string;
  features: string[];
  brand: string;
  highlight?: string;
}

export interface Service {
  id: string;
  title: string;
  kicker: string;
  image: string;
  summary: string;
  description: string;
  outcomes: string[];
  relatedCategories: Category[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface CalculationResult {
  panels: number;
  inverterSize: number;
  batteryCapacity: number;
  dailyYield: number;
}
