import type { NavItem, Product, Service } from "../types";

export const siteConfig = {
  name: "Dafab Energies Nigeria Ltd",
  shortName: "Dafab Energies",
  registration: "RC: 7298272",
  siteUrl: import.meta.env.VITE_SITE_URL || "https://dafabenergies.com",
  phone: "08030442994",
  phoneHref: "tel:+2348030442994",
  engineeringLines: ["08030442994", "08080406421"],
  engineeringLineHrefs: ["tel:+2348030442994", "tel:+2348080406421"],
  whatsappNumber: "08030442994",
  whatsappHref: "https://wa.me/2348030442994",
  facebookHref: "https://www.facebook.com/share/1AZsZ7g8d8/",
  ogImage: "https://i.ibb.co/rKRTTTcJ/DEFAB-ENERGY.jpg",
  headquarters: "Oriola Ketu Lagos",
  heroImage: "https://i.ibb.co/rKRTTTcJ/DEFAB-ENERGY.jpg",
  logo: "https://i.ibb.co/1fVLP9d3/DAFAB-ENERGIES.png",
};

export const navigationItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const stats = [
  { value: "10+ Years", label: "Founder solar experience" },
  { value: "24hrs", label: "Post-installation response window" },
  { value: "Tier-1", label: "Panels and hybrid equipment" },
  { value: "Nationwide", label: "Audit and installation coverage" },
];

export const services: Service[] = [
  {
    id: "inverter-installation",
    title: "Hybrid Inverter Installation",
    kicker: "Engineered uptime",
    image: "https://i.ibb.co/DHTtrz88/126504.jpg",
    summary:
      "Complete inverter sizing, protection, installation, and commissioning for homes, offices, and commercial facilities.",
    description:
      "Dafab deploys hybrid inverter systems with proper load balancing, surge protection, and battery integration so critical loads keep running through grid instability.",
    outcomes: [
      "Precision load sizing before procurement",
      "Safe AC/DC protection architecture",
      "Smart monitoring and handover training",
      "Commissioning by experienced field engineers",
    ],
    relatedCategories: ["Inverters", "Battery Storage", "Electrical Accessories"],
  },
  {
    id: "solar-panel-setup",
    title: "Solar Panel Setup",
    kicker: "Better harvest",
    image: "https://i.ibb.co/Zzcf30KY/Dafab-Energies.jpg",
    summary:
      "Roof and ground-mounted solar arrays designed for Nigerian weather, shading conditions, and long-life output.",
    description:
      "From array sizing to mounting and cable routing, Dafab specifies panel layouts that maximize yield, preserve roof integrity, and support future expansion.",
    outcomes: [
      "Tier-1 module selection",
      "Mounting engineered for coastal and urban environments",
      "Clean cable management and combiner protection",
      "Performance-focused orientation and tilt recommendations",
    ],
    relatedCategories: ["Solar Panels", "Electrical Accessories"],
  },
  {
    id: "battery-storage",
    title: "Battery Storage Systems",
    kicker: "Longer autonomy",
    image: "https://i.ibb.co/6cTnc9Gz/DEFAB-ENERGY-2.jpg",
    summary:
      "Lithium storage solutions for backup resilience, off-grid support, and hybrid self-consumption systems.",
    description:
      "Dafab specifies LiFePO4 battery systems with smart BMS integration, safe enclosures, and scalable layouts that match inverter and daily load profiles.",
    outcomes: [
      "LiFePO4-first chemistry recommendations",
      "Expandable bank configurations",
      "Battery-inverter communication tuning",
      "Operational safety and lifecycle guidance",
    ],
    relatedCategories: ["Battery Storage", "Inverters"],
  },
  {
    id: "electrical-accessories",
    title: "Electrical Accessories Supply",
    kicker: "System protection",
    image: "https://i.ibb.co/JjTWS3hV/DEFAB-ENERGY-3.jpg",
    summary:
      "Protection devices, breakers, arrestors, monitors, and solar cabling selected for reliability and standards compliance.",
    description:
      "The accessories around a power system determine safety and longevity. Dafab supplies the protection and monitoring hardware that keeps expensive energy assets safe.",
    outcomes: [
      "Proper DC and AC breaker selection",
      "Surge and lightning protection options",
      "High-spec cabling and connectors",
      "Monitoring accessories for troubleshooting and reporting",
    ],
    relatedCategories: ["Electrical Accessories", "Inverters", "Solar Panels"],
  },
];

export const products: Product[] = [
  {
    id: "growatt-12kw",
    name: "Growatt 12kW Smart Hybrid Inverter",
    category: "Inverters",
    brand: "Growatt",
    image: "https://i.ibb.co/gLwBf3Tz/IMG-20260205-WA0017.jpg",
    description:
      "High-capacity hybrid inverter engineered for large residential and commercial backup applications.",
    features: [
      "12kW continuous output",
      "High-yield MPPT charging",
      "Smart app monitoring",
      "Hybrid grid and battery switching",
    ],
    highlight: "Best for medium commercial sites",
  },
  {
    id: "growatt-6kw",
    name: "Growatt 6kW Inverter with 8,000 MPPT",
    category: "Inverters",
    brand: "Growatt",
    image: "https://i.ibb.co/4gg4j24N/Growatt-6k-W-Inverter-with-8-000-MPPT.jpg",
    description:
      "Reliable 6kW inverter suited for resilient homes and light commercial facilities.",
    features: [
      "6kW output capacity",
      "Pure sine wave delivery",
      "High-performance MPPT controller",
      "LCD monitoring interface",
    ],
  },
  {
    id: "growatt-5kw-es",
    name: "Growatt 5kW ES Hybrid Inverter",
    category: "Inverters",
    brand: "Growatt",
    image: "https://i.ibb.co/gLwBf3Tz/IMG-20260205-WA0017.jpg",
    description:
      "The ES series is a versatile hybrid inverter designed for off-grid and self-consumption systems.",
    features: [
      "5kW hybrid output",
      "Wide MPPT voltage range",
      "Parallel-ready support",
      "WiFi monitoring",
    ],
  },
  {
    id: "solar-inverter-3kw-high-mppt",
    name: "3kW Solar Inverter with High MPPT",
    category: "Inverters",
    brand: "Dafab Select",
    image: "https://i.ibb.co/RGYktK1r/3kw-solar-inverter-with-high-MPPT.jpg",
    description:
      "Compact solar inverter built for efficient daily generation and reliable backup performance in smaller homes and shops.",
    features: [
      "3kW output capacity",
      "High MPPT solar charging",
      "Stable pure sine wave power",
      "Designed for efficient energy harvest",
    ],
    highlight: "Compact MPPT option",
  },
  {
    id: "deye-3phase-ip66",
    name: "Deye 3-Phase IP66 Rated Hybrid Inverters",
    category: "Inverters",
    brand: "Deye",
    image: "https://i.ibb.co/fzQZNWcC/Deye-Inverters-3phase-IP66-RATED-AVAILABLE-IN-8-KW-10-KW-16kw-20kw-30kw-50kw.jpg",
    description:
      "Industrial-grade Deye 3-phase hybrid inverters. IP66 rated for maximum durability and available in multiple capacities.",
    features: [
      "3-phase high performance",
      "IP66 weatherproof body",
      "Available from 8kW to 50kW",
      "Smart load management",
    ],
  },
  {
    id: "svc-11kw-hybrid",
    name: "SVC 11kW Hybrid Inverter",
    category: "SVC Products",
    brand: "SVC",
    image: "https://i.ibb.co/mCMMjky6/Whats-App-Image-2026-02-16-at-8-00-07-AM.jpg",
    description:
      "A high-capacity SVC hybrid inverter for larger domestic or commercial energy systems.",
    features: [
      "11kW continuous power",
      "11,000W MPPT input",
      "Parallel ready architecture",
      "Pure sine wave output",
    ],
    highlight: "Scalable SVC option",
  },
  {
    id: "svc-20kw-3phase",
    name: "SVC 20kW 3-Phase Hybrid Inverter",
    category: "SVC Products",
    brand: "SVC",
    image: "https://i.ibb.co/dwn3x637/Whats-App-Image-2026-02-16-at-8-00-04-AM-1.jpg",
    description:
      "Industrial-grade three-phase hybrid inverter designed for demanding facilities.",
    features: [
      "20kW three-phase output",
      "IP66 enclosure",
      "Low-voltage battery support",
      "Smart load management",
    ],
  },
  {
    id: "svc-all-in-one-energy-system",
    name: "SVC ALL IN ONE Energy System",
    category: "SVC Products",
    brand: "SVC",
    image: "https://i.ibb.co/rRQrR88g/SVC-ALL-IN-ONE-Energy-System.jpg",
    description:
      "Integrated SVC energy system combining inverter and storage-ready power management in one streamlined unit.",
    features: [
      "All-in-one energy system design",
      "Integrated smart power control",
      "Space-saving installation footprint",
      "Suitable for residential backup setups",
    ],
    highlight: "Integrated SVC system",
  },
  {
    id: "canadian-705w",
    name: "Canadian Solar 705W Module",
    category: "Solar Panels",
    brand: "Canadian Solar",
    image: "https://i.ibb.co/4Znb1Nzz/IMG-20260205-WA0019.jpg",
    description:
      "High-output module designed for strong energy yield in tropical climates.",
    features: [
      "705W peak power",
      "Low-light performance",
      "Reinforced frame",
      "High-efficiency cell architecture",
    ],
    highlight: "Premium panel output",
  },
  {
    id: "jinko-solar-panel",
    name: "Jinko Solar Panel",
    category: "Solar Panels",
    brand: "Jinko",
    image: "https://i.ibb.co/MxgYxxr3/Jinko-Solar-Panel.jpg",
    description:
      "A durable Jinko module line suitable for rooftops and larger PV installations.",
    features: [
      "High-efficiency cells",
      "Proven field durability",
      "Strong energy yield",
      "Tropical climate readiness",
    ],
  },
  {
    id: "growatt-14kwh-battery",
    name: "14.3kWh Lithium Battery with 5 Years Warranty",
    category: "Battery Storage",
    brand: "Dafab Select",
    image: "https://i.ibb.co/Df1s9jqc/14-3kwh-lithium-battery-with-5-years-warranty.jpg",
    description:
      "High-capacity lithium battery storage designed for dependable backup and hybrid energy applications.",
    features: [
      "14.3kWh storage capacity",
      "5-year warranty coverage",
      "LiFePO4 chemistry",
      "Integrated battery protection",
      "Strong backup autonomy",
    ],
    highlight: "Long-duration backup",
  },
  {
    id: "battery-16kwh",
    name: "16kWh Lithium Battery with 10-Year Warranty",
    category: "Battery Storage",
    brand: "Dafab Select",
    image: "https://i.ibb.co/QFhcBgPr/DEFAB-ENERGY-1.jpg",
    description:
      "Large-format lithium storage designed for premium residential and commercial systems.",
    features: [
      "51.2V and 305Ah pack",
      "10-year warranty coverage",
      "Advanced BMS protection",
      "High backup autonomy",
    ],
  },
  {
    id: "deye-batteries",
    name: "Deye Lithium Battery Storage Systems",
    category: "Battery Storage",
    brand: "Deye",
    image: "https://i.ibb.co/4wrX13GQ/Deye-lithium-batteries.jpg",
    description:
      "Premium Deye battery systems built for high cycle life and seamless hybrid integration.",
    features: [
      "High energy density",
      "Safe LiFePO4 chemistry",
      "Smart BMS integration",
      "Long cycle life",
    ],
  },
  {
    id: "dc-protection-kit",
    name: "Solar Protection and Monitoring Kit",
    category: "Electrical Accessories",
    brand: "Dafab Select",
    image: "https://i.ibb.co/JjTWS3hV/DEFAB-ENERGY-3.jpg",
    description:
      "Protection bundle covering surge devices, breakers, isolators, and monitoring essentials.",
    features: [
      "DC breaker and isolator support",
      "Type 1+2 surge protection",
      "Copper cable compatibility",
      "Monitoring-ready accessories",
    ],
    highlight: "Protection-first bundle",
  },
];

export const serviceIds = services.map((service) => service.id);
