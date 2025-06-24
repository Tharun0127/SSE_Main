export interface Product {
  id: number;
  name: string;
  category: 'Grills' | 'Diffusers' | 'Dampers' | 'Other';
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
    description: "Sleek and modern grille for supply and return air.",
    longDescription: "Our Linear Bar Grille offers a clean, contemporary look suitable for walls, sills, and ceilings. Engineered for high performance with minimal pressure drop, it provides an architecturally pleasing solution for air distribution.",
    price: "Request a Quote",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "air vent grille",
    featured: true,
  },
  {
    id: 2,
    name: "Round Ceiling Diffuser",
    category: "Diffusers",
    description: "High-performance diffuser for 360-degree air pattern.",
    longDescription: "The Round Ceiling Diffuser is designed to provide a uniform 360-degree air discharge pattern. It's ideal for commercial and residential applications, ensuring efficient air mixing and occupant comfort. Made from heavy-gauge aluminum.",
    price: "Request a Quote",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "ceiling diffuser",
    featured: true,
  },
  {
    id: 3,
    name: "Volume Control Damper",
    category: "Dampers",
    description: "Precision airflow control for duct systems.",
    longDescription: "Gain precise control over airflow in your ductwork with our Volume Control Damper. Featuring low-leakage seals and galvanized steel construction, it ensures durability and accurate air balancing for any zone.",
    price: "Request a Quote",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "air duct damper",
    featured: true,
  },
  {
    id: 4,
    name: "Egg Crate Grille",
    category: "Grills",
    description: "High-capacity return air grille with a classic design.",
    longDescription: "The Egg Crate Grille is a popular choice for return and exhaust air applications, offering a high free area for maximum airflow. Its aluminum construction is lightweight yet durable, suitable for both ceiling and sidewall mounting.",
    price: "Request a Quote",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "ceiling grille",
    featured: false,
  },
  {
    id: 5,
    name: "Linear Slot Diffuser",
    category: "Diffusers",
    description: "Architectural diffuser for a seamless, continuous look.",
    longDescription: "Create a clean, unobtrusive look with our Linear Slot Diffuser. It's fully adjustable, allowing for precise control of air patterns. Perfect for perimeter heating and cooling in prestigious commercial projects.",
    price: "Request a Quote",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "linear diffuser",
    featured: false,
  },
  {
    id: 6,
    name: "Motorized Fire Damper",
    category: "Dampers",
    description: "UL-rated damper for life safety in HVAC systems.",
    longDescription: "Our Motorized Fire Damper is essential for preventing the spread of fire through ductwork. It is UL-rated for 1.5 hours, providing critical protection in emergency situations. Integrates with building fire alarm systems.",
    price: "Request a Quote",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "fire safety equipment",
    featured: false,
  },
   {
    id: 7,
    name: "Acoustic Louver",
    category: "Other",
    description: "Reduces noise pollution from air intake and discharge openings.",
    longDescription: "The Acoustic Louver is designed to control noise breakout from plant rooms and building apertures. It combines excellent sound attenuation with low-pressure-drop airflow, making it ideal for noise-sensitive environments.",
    price: "Request a Quote",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "sound proofing panel",
    featured: false,
  },
];
