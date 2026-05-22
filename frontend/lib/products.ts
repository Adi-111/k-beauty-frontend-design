export type KeyIngredient = {
  name: string;
  role: string;
  desc: string;
  icon: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  collection: string;
  price: number;
  compareAt?: number;
  image?: string;
  gallery?: string[];
  placeholderVariant: "green" | "stone" | "linen" | "dark";
  placeholderIcon: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  size: string;
  shortDesc: string;
  description: string;
  ritual: string;
  ingredients: string;
  keyIngredients: KeyIngredient[];
  stats?: Stat[];
  concerns: string[];
  bestSeller?: boolean;
};

export const products: Product[] = [
  {
    slug: "mild-peeling-toner-pad",
    name: "Mild Peeling & Toner Pad",
    tagline: "Daily AHA·BHA·PHA Exfoliation",
    category: "Toner Pads",
    collection: "MJ Care Signature",
    price: 28,
    compareAt: 34,
    image: "/products/toner-pad-1.jpg",
    gallery: ["/products/toner-pad-1.jpg", "/products/toner-pad-2.jpg", "/products/toner-pad-3.jpg"],
    placeholderVariant: "linen",
    placeholderIcon: "blur_circular",
    badge: "Best Seller",
    rating: 4.9,
    reviewCount: 1284,
    size: "70 pads · 200ml essence",
    shortDesc:
      "Gentle daily exfoliation that lifts dead skin, sebum and impurities in one wipe — while replenishing moisture.",
    description:
      "A convenient daily exfoliation ritual for anytime, anywhere. Formulated for even the most sensitive skin, the embossed pad is compressed with powerful, solid fiber to cleanse old dead skin cells and clumped sebum that a pure cotton pad simply can't. Now 17% larger (70Ø) and carrying 27% more essence with healthier ingredients.",
    ritual:
      "After cleansing, take one pad with the included mini tongs. Gently sweep the embossed side across the face, avoiding the eye area. Flip to the soft side and press the remaining essence into the skin. Use morning or night, 2–3 times a week.",
    ingredients:
      "AHA (Glycolic Acid), BHA (Salicylic Acid), PHA (Gluconolactone), Grape (Vitis Vinifera) Extract, Tiliacora Triandra Extract, Oat-derived Beta-Glucan, Sodium Hyaluronate, Panthenol.",
    keyIngredients: [
      {
        name: "AHA · BHA · PHA",
        role: "Gentle Exfoliation",
        desc: "A triple-acid blend that removes dead skin cells, impurities and sebum buildup gently, leaving skin smooth and refreshed.",
        icon: "science",
      },
      {
        name: "Grape & Tiliacora Extract",
        role: "Hydration & Barrier Support",
        desc: "Natural botanical extracts replenish moisture and strengthen the skin's natural barrier after exfoliation.",
        icon: "nutrition",
      },
      {
        name: "Oat Beta-Glucan",
        role: "Soothing & Moisture Retention",
        desc: "Derived from oats, beta-glucan offers excellent moisturizing effects and calms irritated, sensitive skin.",
        icon: "grass",
      },
    ],
    stats: [
      { value: "70Ø", label: "Larger embossed pad, 17% bigger surface" },
      { value: "27%", label: "More essence with healthier ingredients" },
      { value: "Vegan", label: "Certified Vegan LOHAS, safe & trustworthy" },
      { value: "1-Step", label: "Exfoliate, tone and moisturize in one wipe" },
    ],
    concerns: ["Texture", "Dullness", "Sensitivity", "Pores"],
    bestSeller: true,
  },
  {
    slug: "daily-moist-soothing-mask-cica",
    name: "Daily Moist Soothing Mask — CICA",
    tagline: "Tencel Sheet Mask for Sensitive Skin",
    category: "Sheet Masks",
    collection: "MJ Care Signature",
    price: 32,
    compareAt: 39,
    image: "/products/cica-mask-1.jpg",
    gallery: ["/products/cica-mask-1.jpg", "/products/cica-mask-2.jpg", "/products/cica-mask-3.jpg"],
    placeholderVariant: "green",
    placeholderIcon: "face_retouching_natural",
    badge: "No.1 in Japan",
    rating: 4.8,
    reviewCount: 2106,
    size: "30 sheets · pull-out box",
    shortDesc:
      "A convenient daily pull-out mask that soothes, hydrates and conditions tired, sensitive skin in one step.",
    description:
      "From MJ Care — the No.1 online face mask brand in Japan for 9 years running, now trusted in 32 countries. This daily moist soothing mask pairs CICA-grade botanicals with a high-adhesion Tencel sheet for both soothing and intensive care. Hygienic pull-out box with a protective cap and dedicated tweezers.",
    ritual:
      "After toning, pull out one sheet with the tweezers and unfold onto cleansed skin. Smooth out air pockets and leave on for 10–20 minutes. Remove and gently pat the remaining ampoule into the skin. Use daily.",
    ingredients:
      "Centella Asiatica (CICA), Tea Tree (Melaleuca) Leaf Oil, Rosemary Extract, Aloe Barbadensis Leaf Extract, Hydsol-H6 Multi-complex Hyaluronic Acid, Allantoin.",
    keyIngredients: [
      {
        name: "Tea Tree & Rosemary",
        role: "Soothing & Conditioning",
        desc: "Helps soothe irritated, sensitive skin, tightens the look of pores and conditions for a healthier, more vibrant appearance.",
        icon: "eco",
      },
      {
        name: "Hydsol-H6 Hyaluronic Acid",
        role: "Deep Hydration",
        desc: "Multi-complex hyaluronic acid forms a moisture barrier on dry skin, delivering hydration deep to leave it plump and supple.",
        icon: "water_drop",
      },
      {
        name: "Tencel Mask Sheet",
        role: "Eco-Friendly Adhesion",
        desc: "Biodegradable natural-pulp fiber with better essence absorption than rayon and a silky touch superior to cotton.",
        icon: "spa",
      },
    ],
    stats: [
      { value: "No.1", label: "Online face mask brand in Japan, 9 years running" },
      { value: "32", label: "Countries trust MJ Care worldwide" },
      { value: "30", label: "Sheets per hygienic pull-out box" },
      { value: "Vegan", label: "Certified Vegan LOHAS & clinically tested" },
    ],
    concerns: ["Sensitivity", "Dryness", "Redness", "Dullness"],
    bestSeller: true,
  },
  {
    slug: "glass-skin-glow-serum",
    name: "Glass Skin Glow Serum",
    tagline: "Niacinamide + Rice Ferment",
    category: "Serums",
    collection: "Daily Ritual",
    price: 36,
    placeholderVariant: "stone",
    placeholderIcon: "opacity",
    rating: 4.7,
    reviewCount: 642,
    size: "30ml",
    shortDesc: "A weightless brightening serum for that signature dewy K-beauty glass-skin finish.",
    description:
      "A featherlight serum powered by 5% niacinamide and fermented rice water to visibly brighten, even tone and refine texture for translucent, lit-from-within skin.",
    ritual: "Apply 3–4 drops to clean skin morning and night before moisturizer.",
    ingredients:
      "Niacinamide 5%, Rice (Oryza Sativa) Ferment Filtrate, Sodium Hyaluronate, Panthenol, Centella Asiatica.",
    keyIngredients: [
      { name: "Niacinamide 5%", role: "Brightening", desc: "Visibly evens tone and fades the look of dark spots.", icon: "wb_sunny" },
      { name: "Rice Ferment", role: "Radiance", desc: "Antioxidant-rich ferment for a luminous, healthy glow.", icon: "grain" },
    ],
    concerns: ["Dullness", "Uneven Tone", "Texture"],
  },
  {
    slug: "ocean-mist-gel-cleanser",
    name: "Ocean Mist Gel Cleanser",
    tagline: "Low-pH Daily Cleanser",
    category: "Cleansers",
    collection: "Daily Ritual",
    price: 22,
    placeholderVariant: "green",
    placeholderIcon: "water_drop",
    rating: 4.6,
    reviewCount: 389,
    size: "150ml",
    shortDesc: "A low-pH gel cleanser that melts away impurities without stripping the barrier.",
    description:
      "A refreshing low-pH gel-to-foam cleanser with deep-sea minerals and green tea that thoroughly cleanses while keeping the moisture barrier intact.",
    ritual: "Massage onto damp skin morning and night, then rinse with lukewarm water.",
    ingredients: "Deep Sea Water, Green Tea Extract, Coco-Glucoside, Glycerin, Panthenol.",
    keyIngredients: [
      { name: "Deep Sea Water", role: "Mineral Cleanse", desc: "Mineral-rich water gently lifts away impurities.", icon: "waves" },
      { name: "Green Tea", role: "Antioxidant", desc: "Soothes and protects against daily stressors.", icon: "eco" },
    ],
    concerns: ["Sensitivity", "Excess Oil"],
  },
  {
    slug: "barrier-repair-cica-cream",
    name: "Barrier Repair CICA Cream",
    tagline: "Centella Recovery Moisturizer",
    category: "Moisturizers",
    collection: "Soothe & Repair",
    price: 38,
    placeholderVariant: "linen",
    placeholderIcon: "spa",
    rating: 4.8,
    reviewCount: 511,
    size: "50ml",
    shortDesc: "A rich-yet-breathable cream that rebuilds a compromised barrier overnight.",
    description:
      "Concentrated Centella Asiatica and ceramides work overnight to calm redness, restore the moisture barrier and leave skin cushioned and resilient.",
    ritual: "Apply as the last step of your evening routine.",
    ingredients: "Centella Asiatica 10%, Ceramide NP, Madecassoside, Shea Butter, Beta-Glucan.",
    keyIngredients: [
      { name: "Centella 10%", role: "Calming", desc: "Soothes redness and supports recovery.", icon: "healing" },
      { name: "Ceramides", role: "Barrier Repair", desc: "Replenishes the skin's protective lipid barrier.", icon: "shield" },
    ],
    concerns: ["Redness", "Dryness", "Sensitivity"],
  },
  {
    slug: "dewy-veil-sunscreen-spf50",
    name: "Dewy Veil Sunscreen SPF50+",
    tagline: "Invisible Daily Protection",
    category: "Suncare",
    collection: "Daily Ritual",
    price: 26,
    placeholderVariant: "stone",
    placeholderIcon: "sunny",
    rating: 4.7,
    reviewCount: 803,
    size: "50ml",
    shortDesc: "A weightless SPF50+ PA++++ veil with zero white cast and a dewy finish.",
    description:
      "Broad-spectrum SPF50+ PA++++ chemical-hybrid sunscreen that layers invisibly under makeup with a hydrating, dewy finish.",
    ritual: "Apply generously as the final step of your morning routine. Reapply through the day.",
    ingredients: "SPF50+ PA++++ filters, Hyaluronic Acid, Centella Asiatica, Vitamin E.",
    keyIngredients: [
      { name: "SPF50+ PA++++", role: "UV Defense", desc: "Highest everyday broad-spectrum protection.", icon: "sunny" },
      { name: "Hyaluronic Acid", role: "Hydration", desc: "Keeps skin dewy and comfortable all day.", icon: "water_drop" },
    ],
    concerns: ["Sun Protection", "Dryness"],
  },
  {
    slug: "overnight-glow-sleeping-mask",
    name: "Overnight Glow Sleeping Mask",
    tagline: "Wash-Off Recovery Mask",
    category: "Sheet Masks",
    collection: "Soothe & Repair",
    price: 30,
    placeholderVariant: "green",
    placeholderIcon: "bedtime",
    rating: 4.6,
    reviewCount: 274,
    size: "80ml",
    shortDesc: "A leave-on gel mask that floods skin with moisture while you sleep.",
    description:
      "A cooling overnight gel mask with niacinamide and hyaluronic acid that locks in hydration and leaves you waking to plump, glowing skin.",
    ritual: "Apply a generous layer at night as the final step. Rinse in the morning.",
    ingredients: "Niacinamide, Sodium Hyaluronate, Allantoin, Sea Kelp Extract.",
    keyIngredients: [
      { name: "Sea Kelp", role: "Replenish", desc: "Mineral-rich marine botanical for overnight recovery.", icon: "grass" },
      { name: "Niacinamide", role: "Glow", desc: "Brightens and refines while you sleep.", icon: "wb_twilight" },
    ],
    concerns: ["Dryness", "Dullness"],
  },
  {
    slug: "pore-fresh-clay-mask",
    name: "Pore Fresh Clay Mask",
    tagline: "Detoxifying Wash-Off Clay",
    category: "Sheet Masks",
    collection: "Soothe & Repair",
    price: 24,
    placeholderVariant: "stone",
    placeholderIcon: "spa",
    rating: 4.5,
    reviewCount: 198,
    size: "100ml",
    shortDesc: "A gentle clay mask that decongests pores without over-drying.",
    description:
      "Kaolin and volcanic clay draw out excess sebum and impurities while green tea and centella keep skin balanced and calm.",
    ritual: "Apply an even layer to clean skin, leave 10 minutes, rinse. Use 1–2 times weekly.",
    ingredients: "Kaolin, Volcanic Ash, Green Tea, Centella Asiatica, Glycerin.",
    keyIngredients: [
      { name: "Volcanic Clay", role: "Detox", desc: "Absorbs excess oil and decongests pores.", icon: "filter_hdr" },
      { name: "Green Tea", role: "Balance", desc: "Calms and keeps skin comfortable.", icon: "eco" },
    ],
    concerns: ["Pores", "Excess Oil", "Texture"],
  },
];

export const categories = [
  "All",
  "Toner Pads",
  "Sheet Masks",
  "Serums",
  "Cleansers",
  "Moisturizers",
  "Suncare",
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelated(slug: string, limit = 4) {
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}

export type Review = {
  name: string;
  rating: number;
  title: string;
  body: string;
  product: string;
  verified: boolean;
};

export const reviews: Review[] = [
  {
    name: "Seo-yeon K.",
    rating: 5,
    title: "The whole family is hooked",
    body: "The elderly in our home love it — at mask time everyone laughs and plays together. We'll keep using it. Thank you for sending such good products.",
    product: "Daily Moist Soothing Mask — CICA",
    verified: true,
  },
  {
    name: "Aarav M.",
    rating: 5,
    title: "Calmed my sensitive skin",
    body: "Among all the packs I've used, I really like this one. I woke up the next day and my skin had truly calmed down. Finally a pack I can trust with sensitive skin.",
    product: "Daily Moist Soothing Mask — CICA",
    verified: true,
  },
  {
    name: "Hana T.",
    rating: 5,
    title: "Redness gone",
    body: "I had a lot of skin trouble, but my skin calmed down and stayed moisturized, so most of the trouble cleared up. My redness settled and my skin looks even.",
    product: "Daily Moist Soothing Mask — CICA",
    verified: true,
  },
  {
    name: "Priya S.",
    rating: 5,
    title: "Daily must-have",
    body: "These days a daily pad is a must for me. So convenient and my skin has never felt smoother. I really like the daily ritual.",
    product: "Mild Peeling & Toner Pad",
    verified: true,
  },
  {
    name: "Min-jun P.",
    rating: 5,
    title: "More than I expected",
    body: "I used it like a daily wipe and it's far more moisturizing and tone-evening than I expected. Looking forward to ordering more of the range.",
    product: "Mild Peeling & Toner Pad",
    verified: true,
  },
  {
    name: "Riya D.",
    rating: 5,
    title: "Glass skin is real",
    body: "Three weeks in and my texture is so much smoother. The glow serum gives me that dewy finish I always wanted without any stickiness.",
    product: "Glass Skin Glow Serum",
    verified: true,
  },
];
