export interface Product {
  id: number;
  name: string;
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
    name: "Arctic Wind 5000",
    description: "Compact and powerful window-mounted air conditioner.",
    longDescription: "The Arctic Wind 5000 is perfect for small to medium-sized rooms, offering exceptional cooling power in a compact design. Features an easy-to-use remote control, multiple fan speeds, and an energy-saving mode.",
    price: "$299.99",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "air conditioner",
    featured: true,
  },
  {
    id: 2,
    name: "Glacier Flow Tower",
    description: "Sleek and quiet tower fan with wide oscillation.",
    longDescription: "Stay cool with the Glacier Flow Tower. Its slim, modern design fits into any corner, while its powerful blades and wide oscillation ensure full-room air circulation. Includes a timer function and three comfort modes.",
    price: "$89.99",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "tower fan",
    featured: true,
  },
  {
    id: 3,
    name: "Misty Mountain Evaporator",
    description: "Portable evaporative cooler for dry climates.",
    longDescription: "The Misty Mountain Evaporator uses the natural power of water evaporation to cool your space. It's an eco-friendly and cost-effective solution for arid environments, featuring a large water tank for extended operation.",
    price: "$149.99",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "evaporative cooler",
    featured: true,
  },
  {
    id: 4,
    name: "Zephyr Personal Cooler",
    description: "Your personal cooling companion for desk or bedside.",
    longDescription: "Keep your personal space comfortable with the Zephyr. This mini cooler is USB-powered, whisper-quiet, and features a multi-color LED light for ambiance. Just add water and enjoy a refreshing breeze.",
    price: "$49.99",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "personal fan",
    featured: false,
  },
  {
    id: 5,
    name: "Cyclone Central Air System",
    description: "Whole-home cooling for ultimate comfort.",
    longDescription: "Experience unparalleled comfort with the Cyclone Central Air System. Engineered for efficiency and reliability, this system provides consistent, quiet cooling throughout your entire home. Smart thermostat compatible.",
    price: "Request a Quote",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "air ducts",
    featured: false,
  },
    {
    id: 6,
    name: "Vortex Pro Industrial Fan",
    description: "Heavy-duty fan for large spaces like garages and workshops.",
    longDescription: "Move massive amounts of air with the Vortex Pro. Built with a durable metal frame and high-velocity blades, this industrial-grade fan is designed to cool large areas quickly and effectively. Features three powerful speed settings.",
    price: "$199.99",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "industrial fan",
    featured: false,
  },
];
