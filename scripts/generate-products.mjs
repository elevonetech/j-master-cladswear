/**
 * Generates the expanded products.ts data file with 200+ products.
 * Run: node scripts/generate-products.mjs
 */

import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, "../src/data/products.ts");

// ── Unsplash IDs for shoe images ──
const U = [
  "photo-1542291026-7eec264c27ff",
  "photo-1600269452121-4f2416e55c28",
  "photo-1491553895911-0055eca6402d",
  "photo-1551107696-a4b0c5a0d7d5",
  "photo-1549298916-b41d501d3772",
  "photo-1525966222134-fcfa99b8ae77",
  "photo-1507120878965-0e0c1d4b6b83",
  "photo-1515955656352-a1fa3ffcd111",
  "photo-1539185441755-769473a23570",
  "photo-1614252369475-531eba835eb1",
  "photo-1513396195812-3cb5f913c4b3",
  "photo-1460353581641-37baddab0fa2",
  "photo-1459257831348-f0cdd359235f",
  "photo-1511556532299-8f662fc26c06",
  "photo-1487412720507-e7ab37603c6f",
  "photo-1512496015851-a90fb38ba796",
  "photo-1600185365483-26d7a4cc7519",
  "photo-1521093470119-a3acdc43374b",
  "photo-1606107557195-0e29a4b5b4aa",
  "photo-1560343090-f0409e92791a",
  "photo-1552346154-21d32810aba3",
  "photo-1608231387042-66d1773070a5",
  "photo-1595950653106-6c9ebd614d3a",
  "photo-1579338551227-3d851db33ad0",
  "photo-1587563873487-70e3d3a1a9b7",
  "photo-1587017289404-1b5c8a4cc6b3",
  "photo-1603808033228-1e4c1a8a0b1d",
  "photo-1584735175097-8a7a12f99e0b",
  "photo-1608259571701-fc6ec0d9abdc",
  "photo-1562183241-b937e95585b6",
  "photo-1595341888016-a392ef81b7de",
  "photo-1608231387042-66d1773070a5",
  "photo-1571401850322-1c1b5a5f5f5b",
  "photo-1588361863880-6b3e5f9b9c1a",
  "photo-1606107557195-0e29a4b5b4aa",
  "photo-1597045566677-308b8c5b7e5f",
  "photo-1600269452121-4f2416e55c28",
  "photo-1605348533989-1e2c1b8a2f5b",
  "photo-1551107696-a4b0c5a0d7d5",
  "photo-1565814636199-ae5f041b3b3b",
  "photo-1603808033228-1e4c1a8a0b1d",
  "photo-1608259571701-fc6ec0d9abdc",
  "photo-1542291026-7eec264c27ff",
  "photo-1600269452121-4f2416e55c28",
  "photo-1491553895911-0055eca6402d",
  "photo-1551107696-a4b0c5a0d7d5",
  "photo-1549298916-b41d501d3772",
  "photo-1525966222134-fcfa99b8ae77",
  "photo-1507120878965-0e0c1d4b6b83",
  "photo-1515955656352-a1fa3ffcd111",
];

const gallery = (seed) => `gallery(${JSON.stringify(seed)})`;

let idx = 0;
const nextId = () => U[idx++ % U.length];

// ── Helpers ──
const sizes = (min = 39, max = 44) =>
  Array.from({ length: max - min + 1 }, (_, i) => String(min + i));
const rating = (lo = 3.5, hi = 5.0) =>
  Math.round((lo + Math.random() * (hi - lo)) * 10) / 10;
const stock = (min = 3, max = 28) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const product = (fields) => {
  const rev = Math.floor(Math.random() * 180) + 8;
  const isBS = fields.badge === "Best Seller" || fields.featured;
  const isNA = fields.collection === "New Arrivals" || fields.badge === "New";

  // Map price to KES 1200-4500 based on category
  const priceBand = ({ category: c }) => {
    if (
      [
        "Sneakers",
        "Running Shoes",
        "Basketball Shoes",
        "Football Boots",
        "High Tops",
        "Low Tops",
        "Canvas Shoes",
        "Skate Shoes",
        "Tennis Shoes",
        "Golf Shoes",
      ].includes(c)
    )
      return 1800 + Math.floor(Math.random() * 2700);
    if (
      [
        "Formal Shoes",
        "Oxford Shoes",
        "Derby Shoes",
        "Loafers",
        "Monk Strap Shoes",
        "Chelsea Boots",
        "Hiking Boots",
        "Work Boots",
      ].includes(c)
    )
      return 2500 + Math.floor(Math.random() * 2000);
    if (
      [
        "Casual Shoes",
        "Training Shoes",
        "Walking Shoes",
        "Cross Training Shoes",
        "Trail Running Shoes",
      ].includes(c)
    )
      return 1500 + Math.floor(Math.random() * 3000);
    if (["Sandals", "Slides", "Slippers", "Kids' Shoes"].includes(c))
      return 1200 + Math.floor(Math.random() * 1800);
    return 1500 + Math.floor(Math.random() * 3000);
  };
  const mappedPrice = priceBand(fields);

  // Auto-map collection from badge if not explicitly overridden
  let collection = fields.collection;
  if (!collection) {
    if (fields.badge === "Trending") collection = "Trending";
    else if (fields.badge === "Best Seller") collection = "Best Sellers";
    else if (fields.badge === "New") collection = "New Arrivals";
    else if (fields.badge === "Limited Edition") collection = "Limited Edition";
    else collection = "Featured Collection";
  }

  return {
    ...fields,
    price: mappedPrice,
    collection,
    reviews: rev,
    gender: fields.gender || "Unisex",
    bestSeller: fields.bestSeller ?? isBS,
    newArrival: fields.newArrival ?? isNA,
    tags: fields.tags || [
      fields.category,
      fields.brand,
      fields.gender || "Unisex",
    ],
    rating: fields.rating ?? rating(),
    stock: fields.stock ?? stock(),
    sizes: fields.sizes ?? sizes(),
    colors: fields.colors ?? ["Black", "White"],
    images: gallery(fields._img || nextId()),
    specs: fields.specs ?? ["Premium quality", "Comfort fit", "Durable build"],
  };
};

// ── Product Definitions ──
const products = [];

// === SNEAKERS (16) ===
const sneakerBrands = [
  ["Nike", "Air Force 1 Classic", "Best Seller", true],
  ["Nike", "Air Max Pulse", "New", false],
  ["Nike", "Dunk Low Retro", "Best Seller", true],
  ["Nike", "Air Jordan 1 Mid", "Limited Edition", true],
  ["Adidas", "Forum Low", "Trending", true],
  ["Adidas", "NMD R1 Primeknit", "Sale", false],
  ["Puma", "RS-X3 Puzzle", "Trending", false],
  ["Puma", "Suede Classic XXI", "Best Seller", true],
  ["New Balance", "327 Heritage", "New", true],
  ["New Balance", "574 Classic", "Best Seller", false],
  ["Reebok", "Club C 85 Vintage", "Trending", true],
  ["Reebok", "Classic Leather Legacy", "Sale", false],
  ["Converse", "Weapon CX", "Trending", true],
  ["Converse", "Chuck Taylor All Star", "Best Seller", false],
  ["Kithome", "Monochrome Ace", "Trending", true],
  ["Kithome", "Shadow Court", "New", false],
];
sneakerBrands.forEach(([brand, name, badge, featured], i) => {
  products.push(
    product({
      id: `sneaker-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Sneakers",
      badge,
      featured,
      colors: ["Black", "White", "Grey"],
      description: `A premium ${brand} sneaker with a clean silhouette and versatile styling.`,
      tags: ["Sneakers", brand, "Casual", "Streetwear"],
    }),
  );
});

// === RUNNING SHOES (10) ===
[
  ["Nike", "Pegasus Turbo", "Best Seller", true, 7200],
  ["Nike", "Vomero 17", "New", false, 8400],
  ["Adidas", "Ultraboost Light", "Best Seller", true, 9600],
  ["Adidas", "Adizero SL", "New", true, 6800],
  ["Asics", "Gel-Nimbus 25", "Best Seller", true, 10200],
  ["Asics", "Gel-Cumulus 24", "New", false, 5800],
  ["New Balance", "Fresh Foam X 1080v13", "Best Seller", true, 8800],
  ["New Balance", "FuelCell Propel v4", "Sale", false, 5200],
  ["Puma", "Deviate Nitro 2", "New", true, 7600],
  ["Under Armour", "Charged Assert 10", "Sale", false, 4100],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `run-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Running Shoes",
      badge,
      featured,
      price,
      colors: ["Black", "White", "Grey", "Blue"],
      description: `High-performance ${brand} runners engineered for comfort and speed on every surface.`,
      tags: ["Running", brand, "Performance", "Athletic"],
      specs: [
        "Breathable mesh upper",
        "Responsive cushioning",
        "Durable rubber outsole",
        "Lightweight design",
      ],
    }),
  );
});

// === BASKETBALL SHOES (8) ===
[
  ["Nike", "LeBron NXXT Gen", "New", true, 10200],
  ["Nike", "KD 16 EP", "Best Seller", true, 8800],
  ["Jordan", "Air Jordan 37 Low", "Best Seller", true, 9600],
  ["Jordan", "Luka 2", "New", false, 7200],
  ["Adidas", "Harden Vol 7", "New", true, 8400],
  ["Adidas", "Dame 8 Extply", "Sale", false, 5600],
  ["Under Armour", "Curry 11 Flow", "Limited Edition", true, 11000],
  ["Puma", "MB.03", "New", false, 7800],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `bball-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Basketball Shoes",
      badge,
      featured,
      price,
      colors: ["Black", "White", "Red", "Blue"],
      description: `Elite-level ${brand} basketball shoes built for explosive moves and court dominance.`,
      tags: ["Basketball", brand, "Performance", "Court"],
      specs: [
        "Ankle support collar",
        "Herringbone traction",
        "Zoom/Boost cushioning",
        "Breathable upper",
      ],
    }),
  );
});

// === FOOTBALL BOOTS (8) ===
[
  ["Nike", "Mercurial Superfly 9", "Best Seller", true, 11800],
  ["Nike", "Tiempo Legend 10", "New", true, 9600],
  ["Adidas", "Predator Edge.3", "Best Seller", true, 8400],
  ["Adidas", "X Speedportal.3", "New", false, 7200],
  ["Puma", "Ultra Match MG", "Sale", false, 5600],
  ["Puma", "Future 7 Pro", "New", true, 8800],
  ["New Balance", "Furon v7 Pro", "Best Seller", false, 7800],
  ["Under Armour", "Clone Magnetico Pro 3", "New", false, 9200],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `fboot-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Football Boots",
      badge,
      featured,
      price,
      colors: ["Black", "White", "Red", "Orange"],
      sizes: sizes(39, 45),
      description: `Pro-level ${brand} football boots engineered for precision, speed, and ball control.`,
      tags: ["Football", brand, "Performance", "Soccer"],
      specs: [
        "Lightweight synthetic upper",
        "Studded outsole",
        "Reinforced heel",
        "Speed chassis",
      ],
    }),
  );
});

// === TRAINING SHOES (8) ===
[
  ["Nike", "Metcon 9", "Best Seller", true, 7200],
  ["Nike", "SuperRep Groove", "New", false, 5800],
  ["Adidas", "Dropset 2", "New", true, 6600],
  ["Adidas", "Ultimate 365", "Sale", false, 4200],
  ["Reebok", "Nano X4", "Best Seller", true, 7800],
  ["Under Armour", "Project Rock 6", "New", true, 8800],
  ["New Balance", "Fresh Foam X 880v14", "Best Seller", false, 6400],
  ["Puma", "Fuse 2.0", "New", false, 5200],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `train-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Training Shoes",
      badge,
      featured,
      price,
      colors: ["Black", "White", "Grey", "Green"],
      description: `Multi-purpose ${brand} training shoes designed for gym workouts and functional fitness.`,
      tags: ["Training", brand, "Gym", "Fitness"],
      specs: [
        "Stable flat base",
        "Reinforced toe",
        "Breathable upper",
        "Quick-lace system",
      ],
    }),
  );
});

// === WALKING SHOES (6) ===
[
  ["Skechers", "Go Walk 7", "Best Seller", true, 3800],
  ["Skechers", "Summits High Rise", "New", true, 4200],
  ["New Balance", "Fresh Foam Roav", "Best Seller", false, 5600],
  ["New Balance", "840v5 Walking", "New", false, 4800],
  ["Asics", "Gel-Pursue 7", "Sale", false, 4400],
  ["Clarks", "Unstructured Walk", "Best Seller", true, 6200],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `walk-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Walking Shoes",
      badge,
      featured,
      price,
      colors: ["Black", "White", "Grey", "Navy"],
      description: `Comfort-first ${brand} walking shoes designed for all-day wear and effortless strides.`,
      tags: ["Walking", brand, "Comfort", "Everyday"],
      specs: [
        "Cushioned insole",
        "Flexible outsole",
        "Breathable lining",
        "Lightweight build",
      ],
    }),
  );
});

// === CASUAL SHOES (10) ===
const casualBrands = [
  ["Vans", "Authentic Classic", "Best Seller", true, 3200],
  ["Vans", "Sk8-Hi MTE", "New", true, 4800],
  ["Converse", "Chuck Taylor All Star", "Best Seller", true, 3500],
  ["Converse", "Run Star Motion", "New", false, 5200],
  ["Adidas", "Gazelle Bold", "Best Seller", false, 4400],
  ["Adidas", "Samba OG", "Limited Edition", true, 4900],
  ["Puma", "Caven 2.0", "New", true, 3600],
  ["Puma", "Carina Street", "Sale", false, 2900],
  ["Reebok", "Club MEMT", "New", false, 3800],
  ["Kithome", "Urban Stride", "New", true, 3400],
];
casualBrands.forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `casual-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Casual Shoes",
      badge,
      featured,
      price,
      colors: ["Black", "White", "Grey"],
      description: `${brand} ${name}: everyday style that transitions effortlessly from errands to evenings.`,
      tags: ["Casual", brand, "Everyday", "Streetwear"],
      specs: [
        "Comfort footbed",
        "Durable outsole",
        "Padded collar",
        "Classic silhouette",
      ],
    }),
  );
});

// === FORMAL SHOES (6) ===
[
  ["Clarks", "Tilden Cap Oxford", "Best Seller", true, 7200],
  ["Clarks", "Un Trail Oxford", "New", false, 5800],
  ["Kithome", "Executive Oxford", "Best Seller", true, 8500],
  ["Kithome", "Boardroom Pro", "New", true, 7800],
  ["Timberland", "Brooklyn Oxford", "Sale", false, 6400],
  ["Florsheim", "Midtown Cap Toe", "Best Seller", false, 7600],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `formal-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Formal Shoes",
      badge,
      featured,
      price,
      colors: ["Black"],
      sizes: sizes(39, 44),
      description: `A sharp ${brand} formal silhouette crafted for the boardroom and black-tie occasions.`,
      gender: "Men",
      tags: ["Formal", brand, "Business", "Office"],
      specs: [
        "Polished leather upper",
        "Leather lining",
        "Comfort insole",
        "Durable sole",
      ],
    }),
  );
});

// === OXFORD SHOES (6) ===
[
  ["Clarks", "Deburn Walk Oxford", "Best Seller", true, 6800],
  ["Clarks", "Boston Wing Oxford", "New", true, 7400],
  ["Kithome", "Regent Oxford", "Best Seller", false, 8200],
  ["Kithome", "Chelsea Oxford", "New", false, 7600],
  ["Florsheim", "Imperial Oxford", "Limited Edition", true, 11000],
  ["Loake", "Aldwych Oxford", "Best Seller", true, 12500],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `oxford-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Oxford Shoes",
      badge,
      featured,
      price,
      colors: ["Black", "Brown"],
      sizes: sizes(39, 44),
      description: `Traditional ${brand} oxford shoes with a closed lacing system and elegant profile.`,
      gender: "Men",
      tags: ["Oxford", brand, "Formal", "Dress"],
      specs: [
        "Premium leather",
        "Goodyear welted sole",
        "Leather heel",
        "Polished finish",
      ],
    }),
  );
});

// === DERBY SHOES (6) ===
[
  ["Clarks", "Derby Smart", "Best Seller", true, 5600],
  ["Clarks", "Montacute Lord", "New", false, 6400],
  ["Kithome", "Mayfair Derby", "New", true, 7200],
  ["Kithome", "Saville Row Derby", "Best Seller", true, 7800],
  ["Loake", "Buckingham Derby", "Best Seller", false, 8600],
  ["Timberland", "Harbour Derby", "Sale", false, 5500],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `derby-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Derby Shoes",
      badge,
      featured,
      price,
      colors: ["Black", "Brown", "Tan"],
      sizes: sizes(39, 44),
      description: `Open-laced ${brand} derby shoes that balance refined style with everyday comfort.`,
      gender: "Men",
      tags: ["Derby", brand, "Formal", "Smart Casual"],
      specs: [
        "Smooth leather upper",
        "Open lacing",
        "Cushioned footbed",
        "Durable sole",
      ],
    }),
  );
});

// === LOAFERS (6) ===
[
  ["Clarks", "Brixworth Loafer", "Best Seller", true, 5200],
  ["Clarks", "Un Abode Loafer", "New", true, 4800],
  ["Kithome", "Suede Loafer", "Best Seller", false, 6500],
  ["Kithome", "Penny Loafer Classic", "New", true, 6800],
  ["Timberland", "Kensington Loafer", "Sale", false, 4400],
  ["Florsheim", "Jet Loafer", "New", false, 5800],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `loafer-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Loafers",
      badge,
      featured,
      price,
      colors: ["Black", "Brown", "Navy"],
      sizes: sizes(39, 44),
      description: `Slip-on sophistication from ${brand} — a refined loafer for smart-casual and office wear.`,
      gender: "Men",
      tags: ["Loafers", brand, "Casual", "Smart Casual"],
      specs: [
        "Slip-on design",
        "Premium leather",
        "Comfort insole",
        "Flexible sole",
      ],
    }),
  );
});

// === MONK STRAP SHOES (4) ===
[
  ["Kithome", "Double Monk Strap", "Best Seller", true, 8400],
  ["Kithome", "Single Monk Strap", "New", false, 7200],
  ["Clarks", "Monk Command", "New", true, 6600],
  ["Loake", "1880 Monk", "Limited Edition", true, 12000],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `monk-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Monk Strap Shoes",
      badge,
      featured,
      price,
      colors: ["Black", "Brown"],
      sizes: sizes(39, 44),
      description: `Distinctive ${brand} monk strap shoes defined by their buckle closure and sleek silhouette.`,
      gender: "Men",
      tags: ["Monk Strap", brand, "Formal", "Dress"],
      specs: [
        "Buckle closure",
        "Polished leather",
        "Leather sole",
        "Elegant silhouette",
      ],
    }),
  );
});

// === CHELSEA BOOTS (6) ===
[
  ["Kithome", "Chelsea Boot Luxe", "Best Seller", true, 9200],
  ["Kithome", "Chelsea Boot Classic", "New", true, 7800],
  ["Clarks", "Garrison Chelsea", "Best Seller", false, 7200],
  ["Timberland", "Audobon Chelsea", "New", false, 8800],
  ["Blundstone", "#558 Chelsea", "Best Seller", true, 9600],
  ["Loake", "Chatsworth Chelsea", "New", false, 11000],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `chelsea-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Chelsea Boots",
      badge,
      featured,
      price,
      colors: ["Black", "Brown", "Tan"],
      sizes: sizes(40, 45),
      description: `Sleek ${brand} chelsea boots with elastic side panels for a refined pull-on silhouette.`,
      gender: "Men",
      tags: ["Chelsea Boots", brand, "Boots", "Smart Casual"],
      specs: [
        "Pull-on design",
        "Elastic panels",
        "Leather upper",
        "Durable sole",
      ],
    }),
  );
});

// === HIKING BOOTS (6) ===
[
  ["Timberland", "Mt. Maddsen Mid", "Best Seller", true, 10600],
  ["Timberland", "White Ledge Mid", "New", true, 8200],
  ["Merrell", "Moab 3 Mid", "Best Seller", true, 7800],
  ["Merrell", "Ontario Mid", "New", false, 6400],
  ["Columbia", "Newton Ridge Plus", "Best Seller", false, 6800],
  ["Kithome", "Summit Pro Boot", "New", true, 9800],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `hiking-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Hiking Boots",
      badge,
      featured,
      price,
      colors: ["Black", "Brown", "Tan"],
      sizes: sizes(40, 46),
      description: `Rugged ${brand} hiking boots with waterproof protection and all-terrain traction.`,
      gender: "Men",
      tags: ["Hiking", brand, "Outdoor", "Adventure"],
      specs: [
        "Waterproof membrane",
        "Grippy outsole",
        "Ankle support",
        "Reinforced toe",
      ],
    }),
  );
});

// === WORK BOOTS (6) ===
[
  ["Timberland", "PRO Pitboss", "Best Seller", true, 10200],
  ["Timberland", "Hyperion Work", "New", false, 8800],
  ["Caterpillar", "Second Shift Steel Toe", "Best Seller", true, 7800],
  ["Caterpillar", "Abe Steel Toe", "New", true, 7200],
  ["Wolverine", "Floorhand Work", "Best Seller", false, 6600],
  ["Kithome", "Iron Ridge Boot", "New", true, 9200],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `work-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Work Boots",
      badge,
      featured,
      price,
      colors: ["Black", "Brown", "Tan"],
      sizes: sizes(40, 46),
      description: `Heavy-duty ${brand} work boots built for long hours and tough job sites.`,
      gender: "Men",
      tags: ["Work Boots", brand, "Industrial", "Safety"],
      specs: [
        "Steel/composite toe",
        "Slip-resistant outsole",
        "Electrical hazard rated",
        "Comfort insole",
      ],
    }),
  );
});

// === SANDALS (8) ===
[
  ["Adidas", "Adilette Comfort", "Best Seller", true, 2800],
  ["Adidas", "Adilette Shower", "New", false, 2200],
  ["Nike", "Calm Slide", "Best Seller", true, 2400],
  ["Nike", "Victori One", "New", true, 1800],
  ["Puma", "Leadcat 2.0", "Sale", false, 2200],
  ["Under Armour", "Ignite Slides", "Best Seller", false, 2600],
  ["Kithome", "Resort Slide", "New", true, 3200],
  ["Reef", "Fanning Sandal", "Best Seller", false, 3800],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `slide-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Slides",
      badge,
      featured,
      price,
      colors: ["Black", "White", "Navy"],
      sizes: sizes(39, 45),
      description: `Lightweight ${brand} slides offering instant comfort and easy slip-on convenience.`,
      tags: ["Slides", brand, "Casual", "Beach"],
      specs: ["Soft EVA foam", "Molded footbed", "Quick-dry", "Lightweight"],
    }),
  );
});

// === SLIPPERS (4) ===
[
  ["Kithome", "Cloud Slipper", "New", true, 1800],
  ["Kithome", "Memory Foam Slipper", "Best Seller", true, 2200],
  ["Skechers", "Comfort Slipper", "Best Seller", false, 2600],
  ["Under Armour", "Locker Slipper", "New", false, 2000],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `slipper-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Slippers",
      badge,
      featured,
      price,
      colors: ["Black", "Grey", "Navy"],
      sizes: sizes(38, 44),
      description: `Ultra-soft ${brand} slippers designed for indoor luxury and post-work relaxation.`,
      tags: ["Slippers", brand, "Comfort", "Indoor"],
      specs: [
        "Memory foam footbed",
        "Plush lining",
        "Indoor-outdoor sole",
        "Machine washable",
      ],
    }),
  );
});

// === SANDALS (6 more — category "Sandals") ===
[
  ["Teva", "Hurricane XLT2", "Best Seller", true, 4200],
  ["Teva", "Terra Fi 5 Universal", "New", false, 5200],
  ["Chaco", "Z/1 Classic", "Best Seller", true, 4800],
  ["Chaco", "Z/Cloud 2", "New", true, 5400],
  ["Kithome", "Trail Sandal", "New", false, 3600],
  ["Columbia", "Techsun Sandal", "Sale", false, 2800],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `sandal-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Sandals",
      badge,
      featured,
      price,
      colors: ["Black", "Brown", "Green"],
      sizes: sizes(39, 45),
      description: `Durable ${brand} sandals built for outdoor adventures and warm-weather exploration.`,
      tags: ["Sandals", brand, "Outdoor", "Adventure"],
      specs: [
        "Adjustable straps",
        "Contoured footbed",
        "Grippy outsole",
        "Quick-dry materials",
      ],
    }),
  );
});

// === HIGH TOPS (6) ===
[
  ["Converse", "Chuck 70 Hi", "Best Seller", true, 4200],
  ["Converse", "Pro Leather Hi", "New", false, 4800],
  ["Vans", "Sk8-Hi Reissue", "Best Seller", true, 4500],
  ["Vans", "Mid-Skool 77", "New", true, 3800],
  ["Nike", "Blazer Mid '77", "Best Seller", true, 5200],
  ["Adidas", "Top Ten Hi", "New", false, 4400],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `hightop-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "High Tops",
      badge,
      featured,
      price,
      colors: ["Black", "White", "Red", "Navy"],
      description: `Iconic ${brand} high-top sneakers that combine retro styling with modern durability.`,
      tags: ["High Tops", brand, "Sneakers", "Streetwear"],
      specs: [
        "High-top collar",
        "Canvas or leather upper",
        "Rubber toe cap",
        "Padded ankle",
      ],
    }),
  );
});

// === LOW TOPS (6) ===
[
  ["Nike", "Court Vision Low", "Best Seller", true, 3600],
  ["Nike", "Air Force 1 Low", "Best Seller", true, 4800],
  ["Adidas", "Grand Court Low", "New", true, 3200],
  ["Adidas", "VS Pace Low", "Sale", false, 2800],
  ["Puma", "Smashic Low", "Best Seller", false, 2400],
  ["New Balance", "237 Low", "New", true, 4200],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `lowtop-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Low Tops",
      badge,
      featured,
      price,
      colors: ["Black", "White", "Grey", "Blue"],
      description: `Versatile ${brand} low-top sneakers that anchor any casual outfit with effortless style.`,
      tags: ["Low Tops", brand, "Sneakers", "Everyday"],
      specs: [
        "Low-profile design",
        "Comfort insole",
        "Durable outsole",
        "Classic silhouette",
      ],
    }),
  );
});

// === CANVAS SHOES (6) ===
[
  ["Converse", "Run Star Legacy CX", "Best Seller", true, 5200],
  ["Converse", "Chuck Taylor All Star CX", "New", true, 3800],
  ["Vans", "Era Canvas", "Best Seller", false, 2800],
  ["Vans", "Authentic Canvas", "New", true, 2600],
  ["Keds", "Champion Canvas", "Best Seller", false, 3200],
  ["Superga", "2750 Canvas", "New", true, 3600],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `canvas-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Canvas Shoes",
      badge,
      featured,
      price,
      colors: ["Black", "White", "Navy", "Red"],
      description: `Breathable ${brand} canvas shoes with a timeless silhouette and lightweight feel.`,
      tags: ["Canvas", brand, "Casual", "Everyday"],
      specs: [
        "Canvas upper",
        "Rubber sole",
        "Padded collar",
        "Lace-up closure",
      ],
    }),
  );
});

// === SKATE SHOES (6) ===
[
  ["Vans", "Old Skool Skate", "Best Seller", true, 3800],
  ["Vans", "Half Cab 30", "New", true, 4200],
  ["Nike", "SB Force 58", "Best Seller", false, 3600],
  ["Nike", "SB Dunk Low Pro", "New", true, 5200],
  ["Adidas", "Busenitz Pro", "Best Seller", true, 4400],
  ["New Balance", "Numeric 306", "New", false, 4000],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `skate-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Skate Shoes",
      badge,
      featured,
      price,
      colors: ["Black", "White", "Grey", "Green"],
      description: `Durable ${brand} skate shoes engineered for board feel, grip, and impact protection.`,
      tags: ["Skate", brand, "Skateboarding", "Streetwear"],
      specs: [
        "Reinforced toe",
        "Cushioned insole",
        "Sticky rubber outsole",
        "Padded tongue",
      ],
    }),
  );
});

// === TENNIS SHOES (4) ===
[
  ["Nike", "Court Air Zoom Vapor Pro", "Best Seller", true, 6800],
  ["Adidas", "Adizero Ubersonic 4", "New", true, 6200],
  ["Asics", "Gel-Resolution 9", "Best Seller", false, 7400],
  ["New Balance", "Fresh Foam Lav", "New", true, 5800],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `tennis-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Tennis Shoes",
      badge,
      featured,
      price,
      colors: ["Black", "White", "Blue", "Red"],
      sizes: sizes(39, 45),
      description: `Court-ready ${brand} tennis shoes offering lateral support and responsive cushioning.`,
      tags: ["Tennis", brand, "Performance", "Court"],
      specs: [
        "Lateral support",
        "Breathable mesh",
        "Durable outsole",
        "Reinforced toe",
      ],
    }),
  );
});

// === GOLF SHOES (4) ===
[
  ["Nike", "Air Max 90 G", "Best Seller", true, 7400],
  ["Adidas", "Tour360 24", "New", true, 8800],
  ["Under Armour", "HOVR Drive 3", "Best Seller", false, 7200],
  ["New Balance", "Striker v2", "New", true, 6600],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `golf-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Golf Shoes",
      badge,
      featured,
      price,
      colors: ["Black", "White", "Navy", "Brown"],
      sizes: sizes(39, 45),
      description: `Precision ${brand} golf shoes designed for stability, comfort, and swing performance.`,
      gender: "Men",
      tags: ["Golf", brand, "Performance", "Sport"],
      specs: [
        "Spiked/spikeless outsole",
        "Waterproof upper",
        "Cushioned midsole",
        "Heel support",
      ],
    }),
  );
});

// === TRAIL RUNNING SHOES (6) ===
[
  ["Salomon", "Speedcross 6", "Best Seller", true, 6800],
  ["Salomon", "XA Pro 3D V9", "New", true, 6200],
  ["Merrell", "Agility Peak 5", "Best Seller", false, 5800],
  ["Merrell", "Long Sky 2", "New", true, 5200],
  ["Hoka", "Speedgoat 5", "Best Seller", true, 8200],
  ["Brooks", "Cascadia 17", "New", false, 7200],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `trail-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Trail Running Shoes",
      badge,
      featured,
      price,
      colors: ["Black", "Red", "Blue", "Green"],
      sizes: sizes(39, 45),
      description: `Aggressive ${brand} trail runners with superior traction and rugged protection.`,
      tags: ["Trail Running", brand, "Outdoor", "Adventure"],
      specs: [
        "Aggressive lug outsole",
        "Rock plate protection",
        "Breathable upper",
        "Gaiter compatible",
      ],
    }),
  );
});

// === CROSS TRAINING SHOES (6) ===
[
  ["Nike", "Metcon 9 AMP", "Best Seller", true, 7600],
  ["Reebok", "Nano X4", "Best Seller", true, 7800],
  ["Under Armour", "TriBase Reign 5", "New", true, 6200],
  ["Under Armour", "Project Rock 6 Training", "New", false, 8800],
  ["Puma", "Fuse 3.0", "Best Seller", false, 5200],
  ["New Balance", "Fresh Foam X 1080v13", "Sale", false, 6400],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `cross-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Cross Training Shoes",
      badge,
      featured,
      price,
      colors: ["Black", "White", "Grey", "Red"],
      description: `Versatile ${brand} cross-training shoes ready for lifting, HIIT, and agility drills.`,
      tags: ["Cross Training", brand, "Gym", "Fitness"],
      specs: [
        "Flat stable base",
        "Reinforced sides",
        "Breathable upper",
        "Quick-lace system",
      ],
    }),
  );
});

// === KIDS' SHOES (8) ===
[
  ["Nike", "Dynamo Go", "Best Seller", true, 2200],
  ["Nike", "Flex Runner 3", "New", true, 1800],
  ["Adidas", "RapidaSport EL", "Best Seller", false, 1600],
  ["Adidas", "Grand Court 2.0 CF", "New", true, 2000],
  ["Puma", "Rebound Layup", "New", false, 1500],
  ["New Balance", "Fresh Foam 650", "Best Seller", true, 2600],
  ["Skechers", "Ultra Flex 3.0", "Best Seller", false, 1800],
  ["Converse", "Chuck Taylor All Star Baby", "New", true, 1400],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `kids-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Kids' Shoes",
      badge,
      featured,
      price,
      colors: ["Black", "White", "Blue", "Pink", "Red"],
      sizes: sizes(30, 38),
      description: `Fun and durable ${brand} kids' shoes designed for active play and growing feet.`,
      gender: "Kids",
      tags: ["Kids", brand, "Children", "School"],
      specs: [
        "Easy on/off design",
        "Flexible sole",
        "Breathable materials",
        "Lightweight",
      ],
    }),
  );
});

// === MEN'S SHOES (10 — additional general men's) ===
[
  ["Timberland", "Classic 6-Inch Boot", "Best Seller", true, 11000],
  ["Timberland", "Field Boot Mid", "New", true, 8600],
  ["Kithome", "Weekend Driver Moccasin", "New", false, 4800],
  ["Kithome", "Urban Chukka Boot", "Best Seller", true, 7200],
  ["Clarks", "Wallabee Boot", "Best Seller", false, 6400],
  ["Clarks", "Desert Boot", "New", true, 5800],
  ["Skechers", "Relaxed Fit Stanton", "Best Seller", true, 3400],
  ["Skechers", "Afterburn Memory Foam", "New", false, 4200],
  ["Kithome", "Nomad Moccasin", "New", true, 5100],
  ["Kithome", "Cruiser Deck Shoe", "New", false, 4400],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `mens-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Men's Shoes",
      badge,
      featured,
      price,
      colors: ["Black", "Brown", "Tan"],
      sizes: sizes(39, 45),
      description: `A versatile ${brand} men's shoe that elevates any wardrobe with premium craftsmanship.`,
      gender: "Men",
      tags: ["Men", brand, "Boots", "Casual"],
      specs: [
        "Premium materials",
        "Comfort footbed",
        "Durable construction",
        "Versatile style",
      ],
    }),
  );
});

// === WOMEN'S SHOES (12) ===
[
  ["Nike", "Air Force 1 Shadow", "Best Seller", true, 5200],
  ["Nike", "Air Max SC", "New", true, 4600],
  ["Adidas", "NMD R1", "Best Seller", false, 5800],
  ["Adidas", "Superstar Bold", "New", true, 4400],
  ["Puma", "Calibrate Runner", "New", false, 3600],
  ["Puma", "Mayze Stack", "Best Seller", true, 4200],
  ["Converse", "Chuck Taylor All Star Lift", "Best Seller", false, 3800],
  ["Vans", "Old Skool Stacked", "New", true, 3500],
  ["Reebok", "Classic Leather Legacy", "New", true, 4000],
  ["New Balance", "574 Women", "Best Seller", false, 4600],
  ["Skechers", "D'Lux Walker", "New", true, 3400],
  ["Kithome", "Grace Loafer", "New", false, 5200],
].forEach(([brand, name, badge, featured, price], i) => {
  products.push(
    product({
      id: `womens-${brand.toLowerCase().replace(/\s/g, "")}-${i}`,
      name,
      brand,
      category: "Women's Shoes",
      badge,
      featured,
      price,
      colors: ["White", "Black", "Pink", "Cream", "Purple"],
      sizes: sizes(36, 42),
      description: `A stylish ${brand} women's shoe designed for comfort and contemporary flair.`,
      gender: "Women",
      tags: ["Women", brand, "Fashion", "Casual"],
      specs: [
        "Cushioned insole",
        "Flexible outsole",
        "Chic design",
        "Comfort fit",
      ],
    }),
  );
});

// ── Write Output ──
let output = `import type { Product } from "@/types";

const gallery = (seed: string) => [
  \`https://images.unsplash.com/\${seed}?auto=format&fit=crop&w=900&q=80\`,
  \`https://images.unsplash.com/\${seed}&sat=-10&auto=format&fit=crop&w=900&q=80\`,
  \`https://images.unsplash.com/\${seed}&blur=1&auto=format&fit=crop&w=900&q=80\`,
];

const products: Product[] = [\n`;

products.forEach((p, i) => {
  output += `  {
    id: ${JSON.stringify(p.id)},
    name: ${JSON.stringify(p.name)},
    price: ${p.price},
    brand: ${JSON.stringify(p.brand)},
    category: ${JSON.stringify(p.category)},
    collection: ${JSON.stringify(p.collection)},
    gender: ${JSON.stringify(p.gender)},
    sizes: ${JSON.stringify(p.sizes)},
    colors: ${JSON.stringify(p.colors)},
    description: ${JSON.stringify(p.description)},
    rating: ${p.rating},
    reviews: ${p.reviews},
    stock: ${p.stock},
    badge: ${JSON.stringify(p.badge)},
    featured: ${p.featured},
    bestSeller: ${p.bestSeller},
    newArrival: ${p.newArrival},
    tags: ${JSON.stringify(p.tags)},
    images: ${p.images},
    specs: ${JSON.stringify(p.specs)},
  },\n`;
});

output += `];\n\nexport default products;\n`;

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, output, "utf-8");

const count = products.length;
console.log(`✅ Generated ${count} products → ${outPath}`);
