export interface Product {
  id: number;
  name: string;
  category: 'Fans' | 'AC Units' | 'Humidifiers';
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
    name: "Aura Tower Fan",
    category: "Fans",
    description: "Elegant and powerful cooling for any room.",
    longDescription: "The Aura Tower Fan combines a sleek, minimalist design with powerful, oscillating airflow to cool your entire room. With multiple speed settings and a quiet operation mode, it's perfect for both day and night.",
    price: "$129.99",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "sleek tower fan",
    featured: true,
  },
  {
    id: 2,
    name: "Arctic-Blast Portable AC",
    category: "AC Units",
    description: "Compact, powerful, and easy to move.",
    longDescription: "Escape the heat with the Arctic-Blast Portable AC. This compact unit packs a punch, quickly cooling down spaces up to 300 sq. ft. Its easy-roll casters and simple setup make it a versatile solution for any home.",
    price: "$399.99",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "portable air conditioner",
    featured: true,
  },
  {
    id: 3,
    name: "MistFlow Humidifier",
    category: "Humidifiers",
    description: "Adds cool, comfortable moisture to the air.",
    longDescription: "Combat dry air with the MistFlow Humidifier. Its ultrasonic technology produces a fine, cool mist, improving air quality and helping to relieve congestion and dry skin. Features a large tank for all-day operation.",
    price: "$79.99",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "modern humidifier",
    featured: true,
  },
  {
    id: 4,
    name: "Breezelet Desk Fan",
    category: "Fans",
    description: "Your personal cooling companion for the office.",
    longDescription: "The Breezelet Desk Fan provides a focused stream of cool air right where you need it. USB-powered and whisper-quiet, it's the perfect addition to any desk or workspace without causing a disturbance.",
    price: "$24.99",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "small desk fan",
    featured: false,
  },
  {
    id: 5,
    name: "Zenith Window AC",
    category: "AC Units",
    description: "Energy-efficient cooling for medium-sized rooms.",
    longDescription: "The Zenith Window AC unit is an Energy Star certified powerhouse. It offers multiple cooling modes, a digital thermostat, and a remote control for your convenience, all while keeping your electricity bills low.",
    price: "$349.99",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "window air conditioner",
    featured: false,
  },
  {
    id: 6,
    name: "Nimbus Whole-Home Humidifier",
    category: "Humidifiers",
    description: "Integrated humidity control for your entire house.",
    longDescription: "The Nimbus connects directly to your HVAC system to provide consistent, optimal humidity levels throughout your home. Protect your wood floors, reduce static electricity, and breathe easier all winter long.",
    price: "$499.99",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "HVAC humidifier unit",
    featured: false,
  },
];
