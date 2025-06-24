export interface Product {
  id: number;
  name: string;
  category: 'Grills' | 'Diffusers' | 'Dampers' | 'Others';
  description: string;
  longDescription: string;
  price: string;
  imageUrl: string;
  imageHint: string;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Linear Bar Grille",
    category: "Grills",
    description: "Sleek and efficient for continuous airflow.",
    longDescription: "Our Linear Bar Grilles are designed for both supply and return air applications. The fixed blades provide a stable and consistent airflow pattern, perfect for modern architectural designs that require clean, unobtrusive lines.",
    price: "$129.99",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "linear bar grille",
    featured: true,
  },
  {
    id: 2,
    name: "Adjustable Air Diffuser",
    category: "Diffusers",
    description: "Control airflow direction and volume with ease.",
    longDescription: "This high-performance Adjustable Air Diffuser allows for precise control over air distribution. Its multi-louver design enables you to direct airflow exactly where it's needed, maximizing comfort and system efficiency.",
    price: "$399.99",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "air diffuser vent",
    featured: true,
  },
  {
    id: 3,
    name: "Motorized Fire Damper",
    category: "Dampers",
    description: "Essential for safety and automated airflow control.",
    longDescription: "The Motorized Fire Damper is a critical safety component in any HVAC system. It automatically closes in the event of a fire to prevent the spread of smoke and flames, and can be integrated with building automation systems for daily airflow control.",
    price: "$79.99",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "industrial fire damper",
    featured: true,
  },
  {
    id: 4,
    name: "Circular Ceiling Grille",
    category: "Grills",
    description: "Classic design for optimal ceiling air distribution.",
    longDescription: "The Circular Ceiling Grille offers a timeless design with excellent performance. It provides a 360-degree air diffusion pattern, making it ideal for open spaces requiring even and comfortable air circulation.",
    price: "$24.99",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "round ceiling grille",
    featured: false,
  },
  {
    id: 5,
    name: "4-Way Ceiling Diffuser",
    category: "Diffusers",
    description: "Maximizes air coverage in commercial spaces.",
    longDescription: "Engineered for performance, the 4-Way Ceiling Diffuser delivers a uniform air supply in four directions. This reduces drafts and ensures a consistent temperature throughout the room, making it perfect for offices and retail environments.",
    price: "$349.99",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "square ceiling diffuser",
    featured: false,
  },
  {
    id: 6,
    name: "Volume Control Damper",
    category: "Dampers",
    description: "Precision balancing for HVAC duct systems.",
    longDescription: "Our Volume Control Dampers allow for precise adjustment of airflow in ductwork. The opposed blade design ensures better control and less noise, enabling technicians to balance the HVAC system for optimal performance and comfort.",
    price: "$499.99",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "ductwork volume damper",
    featured: false,
  },
  {
    id: 7,
    name: "Weatherproof Louvre",
    category: "Others",
    description: "Durable exterior louvre for ventilation and protection.",
    longDescription: "This Weatherproof Louvre is designed to allow air intake and exhaust while preventing water, dirt, and debris from entering the building. Constructed from high-grade aluminum, it offers long-lasting performance in all weather conditions.",
    price: "$199.99",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "outdoor ventilation louvre",
    featured: false,
  },
];
