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
  isNew?: boolean;
  trending?: boolean;
};

const variants: Product["placeholderVariant"][] = ["linen", "green", "stone", "dark"];

const categoryImages: Record<string, string[]> = {
  "Toner Pads": ["/products/cat-toner-pads.jpg"],
  "Sheet Masks": ["/products/cat-sheet-masks.jpg"],
  Serums: ["/products/cat-serums.jpg", "/products/cat-serums-2.jpg"],
  Essences: ["/products/cat-essences.jpg"],
  Toners: ["/products/cat-toners.jpg"],
  Cleansers: ["/products/cat-cleansers.jpg"],
  Moisturizers: ["/products/cat-moisturizers.jpg", "/products/cat-moisturizers-2.jpg"],
  Suncare: ["/products/cat-suncare.jpg"],
  "Eye Care": ["/products/cat-eye-care.jpg"],
  "Lip Care": ["/products/cat-lip-care.jpg"],
  Exfoliators: ["/products/cat-exfoliators.jpg"],
  Body: ["/products/cat-body.jpg"],
};

type MkInput = Partial<Product> &
  Pick<Product, "slug" | "name" | "category" | "price">;

let mkIndex = 0;
function mk(p: MkInput): Product {
  const idx = mkIndex++;
  const variant = p.placeholderVariant ?? variants[idx % variants.length];
  const imgs = categoryImages[p.category] ?? [];
  const image = p.image ?? (imgs.length ? imgs[idx % imgs.length] : undefined);
  return {
    image,
    tagline: p.tagline ?? p.category,
    collection: p.collection ?? "Daily Ritual",
    placeholderIcon: p.placeholderIcon ?? "spa",
    rating: p.rating ?? 4.6,
    reviewCount: p.reviewCount ?? 120 + ((mkIndex * 47) % 400),
    size: p.size ?? "Standard size",
    shortDesc: p.shortDesc ?? `${p.name} — clean, effective Korean skincare for your daily ritual.`,
    description:
      p.description ??
      `${p.name} is a gentle yet effective addition to your routine, formulated with skin-loving Korean botanicals and made in Korea with strict quality control.`,
    ritual: p.ritual ?? "Apply to clean skin as part of your daily routine, morning and/or night.",
    ingredients: p.ingredients ?? "Centella Asiatica, Sodium Hyaluronate, Panthenol, Green Tea Extract, Glycerin.",
    keyIngredients:
      p.keyIngredients ?? [
        { name: "Centella Asiatica", role: "Soothing", desc: "Calms and conditions sensitive, reactive skin.", icon: "eco" },
        { name: "Hyaluronic Acid", role: "Hydration", desc: "Multi-weight hydration that plumps and smooths.", icon: "water_drop" },
      ],
    concerns: p.concerns ?? ["Hydration"],
    ...p,
    placeholderVariant: variant,
  } as Product;
}

const realProducts: Product[] = [
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
    trending: true,
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
    trending: true,
  },
  {
    slug: "tea-tree-soothing-calming-cream",
    name: "Tea Tree Soothing in Calming Cream",
    tagline: "Ranked No.1 in Korea",
    category: "Moisturizers",
    collection: "Essenherb",
    price: 29,
    compareAt: 35,
    image: "/products/essenherb/tea-tree-soothing-calming-cream-01.png",
    gallery: [
      "/products/essenherb/tea-tree-soothing-calming-cream-01.png",
      "/products/essenherb/tea-tree-soothing-calming-cream-02.jpg",
      "/products/essenherb/tea-tree-soothing-calming-cream-03.jpg",
    ],
    placeholderVariant: "green",
    placeholderIcon: "eco",
    badge: "No.1 in Korea",
    rating: 4.9,
    reviewCount: 1876,
    size: "80ml",
    shortDesc:
      "Olive Young's overall No.1 skin care pick — a botanical cream with tea tree leaf, centella asiatica and ceramide that visibly calms redness.",
    description:
      "Essenherb's specialty-of-tea-tree cream pairs purifying tea tree leaf with centella asiatica and ceramide to calm reactive, irritated skin. Ranked Overall No.1 on Olive Young (as of Oct 26, 2024) and awarded No.1 Cream at the 2025 Hwahae Awards, it's clinically shown to visibly reduce redness after physical irritation.",
    ritual:
      "After toning, scoop a small amount and warm between palms. Press evenly over face and neck, morning and night, focusing on areas prone to redness or irritation.",
    ingredients: "Tea Tree (Melaleuca Alternifolia) Leaf Extract, Centella Asiatica Extract, Ceramide NP, Panthenol, Allantoin.",
    keyIngredients: [
      {
        name: "Tea Tree Leaf",
        role: "Purifying",
        desc: "Essenherb's specialty botanical that helps clear and refresh blemish-prone, congested skin.",
        icon: "eco",
      },
      {
        name: "Centella Asiatica",
        role: "Calming",
        desc: "Soothes redness and conditions reactive, sensitive skin.",
        icon: "spa",
      },
      {
        name: "Ceramide",
        role: "Barrier Repair",
        desc: "Reinforces the skin's moisture barrier to lock in hydration.",
        icon: "shield",
      },
    ],
    stats: [
      { value: "No.1", label: "Olive Young overall skin care ranking (Oct 2024)" },
      { value: "No.1", label: "Hwahae Awards 2025 — Cream category" },
      { value: "21.09°C", label: "Reduction in skin redness after physical irritation" },
      { value: "80ml", label: "Full-size jar for daily use" },
    ],
    concerns: ["Redness", "Sensitivity", "Acne", "Irritation"],
    bestSeller: true,
    trending: true,
  },
  {
    slug: "black-snail-signature-lift-cream",
    name: "Black Snail Signature Lift Cream",
    tagline: "Luxury Lifting Care",
    category: "Moisturizers",
    collection: "Essenherb",
    price: 42,
    compareAt: 48,
    image: "/products/essenherb/black-snail-lift-cream-01.jpg",
    gallery: [
      "/products/essenherb/black-snail-lift-cream-01.jpg",
      "/products/essenherb/black-snail-lift-cream-02.jpg",
      "/products/essenherb/black-snail-lift-cream-03.jpg",
      "/products/essenherb/black-snail-lift-cream-04.jpg",
    ],
    placeholderVariant: "dark",
    placeholderIcon: "diamond",
    badge: "Luxury",
    rating: 4.8,
    reviewCount: 592,
    size: "50ml",
    shortDesc:
      "A rich, lifting cream with 65% black snail mucin — 4x the mucin and 3x the nutrients of regular snail creams — for firm, nourished, smooth skin.",
    description:
      "Essenherb's signature luxury cream concentrates 65% black snail secretion filtrate — four times the mucin and three times the nutrients of a regular snail cream — for round-the-clock firming and repair. A rich, cushiony texture melts into skin to raise resilience, boost elasticity and refine texture and pores.",
    ritual:
      "As the final step of your evening routine, warm a small amount between palms and press gently into face and neck. Use nightly for best lifting results.",
    ingredients: "Black Snail Secretion Filtrate (65%), Adenosine, Shea Butter, Ceramide NP, Sodium Hyaluronate.",
    keyIngredients: [
      {
        name: "Black Snail Mucin (65%)",
        role: "Firming & Repair",
        desc: "4x more mucin and 3x more nutrients than regular snail mucin, delivering 24-hour hydration and a visibly firmer look.",
        icon: "bolt",
      },
      {
        name: "Adenosine",
        role: "Anti-Aging",
        desc: "Helps firm and smooth the appearance of fine lines and sagging skin.",
        icon: "diamond",
      },
      {
        name: "Shea Butter",
        role: "Nourishment",
        desc: "Deeply nourishes and conditions skin for a soft, supple feel.",
        icon: "spa",
      },
    ],
    stats: [
      { value: "65%", label: "Black snail mucin concentration" },
      { value: "4x", label: "More mucin than regular snail creams" },
      { value: "3x", label: "More nourishing nutrients" },
      { value: "24H", label: "Continuous hydration" },
    ],
    concerns: ["Firmness", "Fine Lines", "Dryness", "Texture"],
    trending: true,
  },
  {
    slug: "deep-core-hydra-ampoule",
    name: "Deep Core Hydra Ampoule",
    tagline: "10-Layer Hyaluronic Ampoule",
    category: "Serums",
    collection: "Essenherb",
    price: 32,
    compareAt: 38,
    image: "/products/essenherb/deep-core-hydra-ampoule-01.png",
    gallery: [
      "/products/essenherb/deep-core-hydra-ampoule-01.png",
      "/products/essenherb/deep-core-hydra-ampoule-02.jpg",
      "/products/essenherb/deep-core-hydra-ampoule-03.jpg",
      "/products/essenherb/deep-core-hydra-ampoule-04.jpg",
      "/products/essenherb/deep-core-hydra-ampoule-05.jpg",
    ],
    placeholderVariant: "linen",
    placeholderIcon: "water_drop",
    rating: 4.7,
    reviewCount: 438,
    size: "150ml",
    shortDesc:
      "A lightweight, fast-absorbing 10-layer hyaluronic ampoule for sensitive and dehydrated skin.",
    description:
      "Deep Core Hydra Ampoule layers ten weights of hyaluronic acid with panthenol and a plant-based Phyto-Hydrin complex to hydrate sensitive, dehydrated skin without weight or stickiness — locking in lasting moisture while soothing redness and smoothing texture.",
    ritual:
      "Step 1 of the Deep Core ritual. Pump once, apply evenly, and pat for absorption. Reapply if layering. Follow with Deep Core Hydra Cream.",
    ingredients: "Sodium Hyaluronate (10-layer complex), Panthenol, Phyto-Hydrin Complex, Centella Asiatica Extract.",
    keyIngredients: [
      {
        name: "10-Layer Hyaluronic Acid",
        role: "Hydration",
        desc: "Multi-weight hyaluronic acid delivers deep hydration across multiple layers of skin.",
        icon: "water_drop",
      },
      {
        name: "Panthenol",
        role: "Barrier Repair",
        desc: "Soothes and strengthens the skin's barrier.",
        icon: "shield",
      },
      {
        name: "Phyto-Hydrin Complex",
        role: "Suppleness",
        desc: "A plant-based complex that leaves skin soft and supple.",
        icon: "eco",
      },
    ],
    concerns: ["Hydration", "Sensitivity", "Dryness", "Redness"],
  },
  {
    slug: "deep-core-hydra-cream",
    name: "Deep Core Hydra Cream",
    tagline: "Hydration Lock & Skin Barrier Care",
    category: "Moisturizers",
    collection: "Essenherb",
    price: 34,
    compareAt: 40,
    image: "/products/essenherb/deep-core-hydra-cream-01.jpg",
    gallery: [
      "/products/essenherb/deep-core-hydra-cream-01.jpg",
      "/products/essenherb/deep-core-hydra-cream-02.jpg",
      "/products/essenherb/deep-core-hydra-cream-03.jpg",
    ],
    placeholderVariant: "linen",
    placeholderIcon: "spa",
    rating: 4.7,
    reviewCount: 401,
    size: "100ml",
    shortDesc:
      "Deep, lasting hydration for sensitive and dry skin, with vegan Phyto Mucin and a 10-layer hyaluronic complex.",
    description:
      "The second step of the Deep Core ritual, this cream locks in the hydration laid down by the Hydra Ampoule with vegan, plant-derived Phyto Mucin and a 10-layer hyaluronic complex — for lasting moisture and a stronger, calmer skin barrier.",
    ritual:
      "Step 2 of the Deep Core ritual. Pump once, apply evenly, and pat for absorption after the Hydra Ampoule.",
    ingredients: "Phyto Mucin (Plant-Derived), Sodium Hyaluronate (10-layer complex), Panthenol, Ceramide NP.",
    keyIngredients: [
      {
        name: "Phyto Mucin",
        role: "Intense Hydration",
        desc: "A vegan, plant-derived mucin that delivers intense hydration without animal-derived ingredients.",
        icon: "eco",
      },
      {
        name: "10-Layer Hyaluronic Acid",
        role: "Hydration",
        desc: "Multi-weight hyaluronic acid for deep, lasting moisture.",
        icon: "water_drop",
      },
      {
        name: "Panthenol",
        role: "Barrier Repair",
        desc: "Soothes and strengthens the skin's barrier.",
        icon: "shield",
      },
    ],
    concerns: ["Dryness", "Sensitivity", "Hydration", "Texture"],
  },
  {
    slug: "muco-ritual-ampoule",
    name: "Muco Ritual Ampoule",
    tagline: "Get an Instant Calm",
    category: "Serums",
    collection: "Essenherb",
    price: 30,
    compareAt: 36,
    image: "/products/essenherb/muco-ritual-ampoule-01.png",
    gallery: [
      "/products/essenherb/muco-ritual-ampoule-01.png",
      "/products/essenherb/muco-ritual-ampoule-02.jpg",
      "/products/essenherb/muco-ritual-ampoule-03.jpg",
    ],
    placeholderVariant: "green",
    placeholderIcon: "healing",
    badge: "Trending",
    rating: 4.7,
    reviewCount: 356,
    size: "50ml",
    shortDesc:
      "An instantly calming mucin ampoule with high-purity aloe polysaccharides for lightweight, non-sticky hydration.",
    description:
      "Muco Ritual Ampoule pairs a repairing mucin complex with Essenherb's own high-purity aloe polysaccharides — purified far beyond a basic aloe extract — for instant redness relief and lightweight, non-sticky hydration.",
    ritual:
      "After toning, smooth a thin layer over face and neck. Use morning and night for instant calming relief.",
    ingredients: "Snail/Mucin Complex, Essenherb Aloe Polysaccharides, Centella Asiatica Extract, Panthenol.",
    keyIngredients: [
      {
        name: "Mucin Complex",
        role: "Repair & Soothing",
        desc: "Calms redness and helps repair a compromised skin barrier on contact.",
        icon: "healing",
      },
      {
        name: "Essenherb Aloe Polysaccharides",
        role: "Deep Hydration",
        desc: "High-purity, purified aloe — beyond a basic extract — for intensive soothing and premium hydration.",
        icon: "water_drop",
      },
    ],
    concerns: ["Redness", "Sensitivity", "Texture"],
    trending: true,
  },
  {
    slug: "quick-deep-bubble-essence",
    name: "Quick and Deep Bubble Essence",
    tagline: "Hydrate, Soothe, and Glow",
    category: "Essences",
    collection: "Essenherb",
    price: 26,
    compareAt: 31,
    image: "/products/essenherb/quick-deep-bubble-essence-01.png",
    gallery: [
      "/products/essenherb/quick-deep-bubble-essence-01.png",
      "/products/essenherb/quick-deep-bubble-essence-02.jpg",
      "/products/essenherb/quick-deep-bubble-essence-03.jpg",
    ],
    placeholderVariant: "stone",
    placeholderIcon: "bubble_chart",
    rating: 4.6,
    reviewCount: 289,
    size: "120ml",
    shortDesc:
      "A fine-bubble whip essence that delivers instant moisture with a no-mess, gentle application.",
    description:
      "Quick and Deep Bubble Essence releases as a fine bubble whip that buffers instantly into skin — no dragging, no stickiness, no mess. It boosts moisture immediately, smooths flaky texture for a flake-free makeup base, and is gentle enough for reactive skin.",
    ritual:
      "Pump 1–2 times after cleansing to release bubbles. Apply gently to the face. Tap lightly until fully absorbed. Layer for a deeper, glowing finish.",
    ingredients: "Aqua, Butylene Glycol, Sodium Hyaluronate, Panthenol, Centella Asiatica Extract.",
    keyIngredients: [
      {
        name: "Bubble-Whip Texture",
        role: "Instant Moisture",
        desc: "Fine bubbles buffer the essence into skin instantly, without pulling or dragging.",
        icon: "bubble_chart",
      },
      {
        name: "Gentle, Non-Irritating Formula",
        role: "Sensitive-Skin Friendly",
        desc: "Absorbs softly with no mess or stickiness, even on reactive skin.",
        icon: "spa",
      },
    ],
    concerns: ["Dryness", "Texture", "Sensitivity"],
    isNew: true,
  },
  {
    slug: "day-to-night-program",
    name: "Day to Night Program",
    tagline: "Day & Night Care, Simplified",
    category: "Sets",
    collection: "Essenherb",
    price: 44,
    compareAt: 54,
    image: "/products/essenherb/day-to-night-program-01.png",
    gallery: [
      "/products/essenherb/day-to-night-program-01.png",
      "/products/essenherb/day-to-night-program-02.jpg",
      "/products/essenherb/day-to-night-program-03.jpg",
      "/products/essenherb/day-to-night-program-04.jpg",
    ],
    placeholderVariant: "linen",
    placeholderIcon: "wb_twighlight",
    badge: "Best Value",
    rating: 4.8,
    reviewCount: 214,
    size: "2 × 30ml (Day Cream + Night Cream)",
    shortDesc:
      "A duo routine set — Bounce It Day Cream and Float It Night Cream — for personalized, healthy, balanced skin from day to night.",
    description:
      "Day to Night Program simplifies personalized skincare into one 30ml × 2 set: Bounce It Day Cream to hydrate, refine and brighten, and Float It Night Cream to firm, tighten and deeply replenish overnight.",
    ritual:
      "AM: Apply Bounce It Day Cream as the last step of your morning routine. PM: Apply Float It Night Cream as the last step before bed.",
    ingredients: "Day: Niacinamide, Panthenol, Botanical Extracts. Night: Adenosine, Peptide Complex, Ceramide NP.",
    keyIngredients: [
      {
        name: "Bounce It Day Cream",
        role: "Skin Boosting & Barrier Defence",
        desc: "Hydrates skin for 12 hours, refines pores and smooths texture, reduces excess oil, and brightens tone.",
        icon: "wb_sunny",
      },
      {
        name: "Float It Night Cream",
        role: "Skin Relaxing & Core Tightening",
        desc: "Firms sagging skin for a lifted look, boosts skin density and resilience, and delivers deep overnight hydration.",
        icon: "bedtime",
      },
    ],
    concerns: ["Firmness", "Hydration", "Dullness", "Fine Lines"],
    isNew: true,
  },
];

const fillerProducts: Product[] = [
  mk({ slug: "glass-skin-glow-serum", name: "Glass Skin Glow Serum", category: "Serums", collection: "Daily Ritual", price: 36, placeholderIcon: "opacity", rating: 4.7, reviewCount: 642, size: "30ml", badge: "Trending", trending: true, concerns: ["Dullness", "Uneven Tone", "Texture"], shortDesc: "A weightless brightening serum for that signature dewy K-beauty glass-skin finish.", keyIngredients: [{ name: "Niacinamide 5%", role: "Brightening", desc: "Visibly evens tone and fades the look of dark spots.", icon: "wb_sunny" }, { name: "Rice Ferment", role: "Radiance", desc: "Antioxidant-rich ferment for a luminous glow.", icon: "grain" }] }),
  mk({ slug: "ocean-mist-gel-cleanser", name: "Ocean Mist Gel Cleanser", category: "Cleansers", price: 22, placeholderIcon: "water_drop", rating: 4.6, reviewCount: 389, size: "150ml", concerns: ["Sensitivity", "Excess Oil"], shortDesc: "A low-pH gel cleanser that melts away impurities without stripping the barrier." }),
  mk({ slug: "barrier-repair-cica-cream", name: "Barrier Repair CICA Cream", category: "Moisturizers", collection: "Soothe & Repair", price: 38, placeholderIcon: "spa", rating: 4.8, reviewCount: 511, size: "50ml", badge: "Best Seller", bestSeller: true, concerns: ["Redness", "Dryness", "Sensitivity"], shortDesc: "A rich-yet-breathable cream that rebuilds a compromised barrier overnight." }),
  mk({ slug: "dewy-veil-sunscreen-spf50", name: "Dewy Veil Sunscreen SPF50+", category: "Suncare", price: 26, placeholderIcon: "sunny", rating: 4.7, reviewCount: 803, size: "50ml", badge: "Best Seller", bestSeller: true, trending: true, concerns: ["Sun Protection", "Dryness"], shortDesc: "A weightless SPF50+ PA++++ veil with zero white cast and a dewy finish." }),
  mk({ slug: "overnight-glow-sleeping-mask", name: "Overnight Glow Sleeping Mask", category: "Sheet Masks", collection: "Soothe & Repair", price: 30, placeholderIcon: "bedtime", rating: 4.6, reviewCount: 274, size: "80ml", concerns: ["Dryness", "Dullness"], shortDesc: "A leave-on gel mask that floods skin with moisture while you sleep." }),
  mk({ slug: "pore-fresh-clay-mask", name: "Pore Fresh Clay Mask", category: "Sheet Masks", collection: "Soothe & Repair", price: 24, placeholderIcon: "filter_hdr", rating: 4.5, reviewCount: 198, size: "100ml", concerns: ["Pores", "Excess Oil", "Texture"], shortDesc: "A gentle clay mask that decongests pores without over-drying." }),
  mk({ slug: "snail-mucin-repair-essence", name: "Snail Mucin Repair Essence", category: "Essences", price: 29, placeholderIcon: "auto_awesome", rating: 4.8, reviewCount: 1542, size: "100ml", badge: "Trending", trending: true, concerns: ["Texture", "Dullness", "Fine Lines"], shortDesc: "96% snail secretion filtrate to repair, plump and add a healthy bounce." }),
  mk({ slug: "rice-water-bright-toner", name: "Rice Water Bright Toner", category: "Toners", price: 21, placeholderIcon: "grain", rating: 4.6, reviewCount: 421, size: "200ml", isNew: true, concerns: ["Dullness", "Uneven Tone"], shortDesc: "A fermented rice toner that preps and brightens for a translucent glow." }),
  mk({ slug: "vitamin-c-brightening-serum", name: "Vitamin C Brightening Serum", category: "Serums", price: 34, placeholderIcon: "wb_sunny", rating: 4.7, reviewCount: 688, size: "30ml", concerns: ["Dullness", "Uneven Tone", "Dark Spots"], shortDesc: "Stable 15% vitamin C to fade dark spots and boost morning radiance." }),
  mk({ slug: "green-tea-balancing-toner", name: "Green Tea Balancing Toner", category: "Toners", price: 19, placeholderIcon: "eco", rating: 4.5, reviewCount: 312, isNew: true, concerns: ["Excess Oil", "Pores"], shortDesc: "An antioxidant toner that balances oil and refreshes tired skin." }),
  mk({ slug: "ceramide-moisture-cream", name: "Ceramide Moisture Cream", category: "Moisturizers", price: 33, placeholderIcon: "shield", rating: 4.7, reviewCount: 540, size: "50ml", concerns: ["Dryness", "Sensitivity"], shortDesc: "A ceramide-rich cream that locks in moisture and fortifies the barrier." }),
  mk({ slug: "hyaluronic-aqua-gel", name: "Hyaluronic Aqua Gel", category: "Moisturizers", price: 27, placeholderIcon: "water_drop", rating: 4.6, reviewCount: 298, badge: "Trending", trending: true, concerns: ["Hydration", "Oily Skin"], shortDesc: "An oil-free aqua gel that delivers a burst of weightless hydration." }),
  mk({ slug: "propolis-glow-ampoule", name: "Propolis Glow Ampoule", category: "Serums", price: 35, placeholderIcon: "hive", rating: 4.8, reviewCount: 765, size: "30ml", concerns: ["Dullness", "Redness"], shortDesc: "Black bee propolis ampoule for nourished, lit-from-within skin." }),
  mk({ slug: "centella-calming-mask", name: "Centella Calming Sheet Mask", category: "Sheet Masks", price: 18, placeholderIcon: "spa", rating: 4.7, reviewCount: 933, badge: "Best Seller", bestSeller: true, concerns: ["Redness", "Sensitivity"], shortDesc: "A soothing centella sheet mask to calm redness in 15 minutes." }),
  mk({ slug: "collagen-firming-mask", name: "Collagen Firming Sheet Mask", category: "Sheet Masks", price: 20, placeholderIcon: "diamond", rating: 4.6, reviewCount: 410, isNew: true, concerns: ["Fine Lines", "Firmness"], shortDesc: "Marine collagen mask for plump, firm and bouncy-looking skin." }),
  mk({ slug: "gentle-foam-cleanser", name: "Gentle Foam Cleanser", category: "Cleansers", price: 17, placeholderIcon: "soap", rating: 4.5, reviewCount: 356, concerns: ["Sensitivity"], shortDesc: "A creamy low-pH foam that cleanses without tightness." }),
  mk({ slug: "deep-cleansing-oil", name: "Deep Cleansing Oil", category: "Cleansers", price: 23, placeholderIcon: "opacity", rating: 4.7, reviewCount: 612, badge: "Best Seller", bestSeller: true, concerns: ["Makeup", "Excess Oil"], shortDesc: "A featherlight oil that melts away SPF and makeup, rinses clean." }),
  mk({ slug: "brightening-eye-cream", name: "Brightening Eye Cream", category: "Eye Care", price: 28, placeholderIcon: "visibility", rating: 4.6, reviewCount: 274, isNew: true, concerns: ["Dark Circles", "Fine Lines"], shortDesc: "A caffeine + peptide eye cream to depuff and brighten tired eyes." }),
  mk({ slug: "retinol-renewal-night-serum", name: "Retinol Renewal Night Serum", category: "Serums", price: 42, placeholderIcon: "bedtime", rating: 4.8, reviewCount: 489, badge: "Trending", trending: true, concerns: ["Fine Lines", "Texture", "Firmness"], shortDesc: "Encapsulated retinol that renews texture overnight, gently." }),
  mk({ slug: "aha-bha-exfoliating-toner", name: "AHA·BHA Exfoliating Toner", category: "Exfoliators", price: 25, placeholderIcon: "science", rating: 4.6, reviewCount: 521, concerns: ["Texture", "Pores", "Dullness"], shortDesc: "A liquid exfoliant that smooths texture and unclogs pores." }),
  mk({ slug: "soothing-aloe-gel", name: "Soothing Aloe Gel", category: "Moisturizers", price: 15, placeholderIcon: "eco", rating: 4.5, reviewCount: 690, concerns: ["Redness", "Hydration"], shortDesc: "Multi-use 92% aloe gel to cool, calm and hydrate anywhere." }),
  mk({ slug: "lip-sleeping-mask", name: "Berry Lip Sleeping Mask", category: "Lip Care", price: 16, placeholderIcon: "favorite", rating: 4.8, reviewCount: 1120, badge: "Best Seller", bestSeller: true, trending: true, concerns: ["Dryness"], shortDesc: "An overnight berry balm for soft, plump lips by morning." }),
  mk({ slug: "tone-up-sun-essence", name: "Tone-Up Sun Essence SPF50+", category: "Suncare", price: 24, placeholderIcon: "sunny", rating: 4.6, reviewCount: 333, isNew: true, concerns: ["Sun Protection", "Dullness"], shortDesc: "A natural tone-up sunscreen essence for an instant glow + protection." }),
  mk({ slug: "peptide-firming-serum", name: "Peptide Firming Serum", category: "Serums", price: 39, placeholderIcon: "diamond", rating: 4.7, reviewCount: 277, concerns: ["Firmness", "Fine Lines"], shortDesc: "A multi-peptide serum that visibly firms and improves elasticity." }),
  mk({ slug: "houttuynia-calming-toner", name: "Houttuynia Calming Toner", category: "Toners", price: 22, placeholderIcon: "spa", rating: 4.7, reviewCount: 458, concerns: ["Redness", "Acne", "Sensitivity"], shortDesc: "A 90% houttuynia cordata toner for blemish-prone, reactive skin." }),
  mk({ slug: "milk-protein-body-lotion", name: "Milk Protein Body Lotion", category: "Body", price: 20, placeholderIcon: "spa", rating: 4.5, reviewCount: 188, isNew: true, concerns: ["Dryness"], shortDesc: "A fast-absorbing milk protein lotion for soft, nourished skin." }),
];

export const products: Product[] = [...realProducts, ...fillerProducts];

// The curated, real-photo catalog (no filler/placeholder products) — used
// wherever the site falls back to local data instead of the commerce API.
export const essenherbProducts: Product[] = products.filter((p) => p.collection === "Essenherb");

export const categories = [
  "All",
  "Toner Pads",
  "Sheet Masks",
  "Serums",
  "Essences",
  "Toners",
  "Cleansers",
  "Moisturizers",
  "Suncare",
  "Eye Care",
  "Lip Care",
  "Exfoliators",
  "Body",
  "Sets",
];

export const shopByCategory = [
  { name: "Sheet Masks", icon: "face_retouching_natural", variant: "green" as const },
  { name: "Toner Pads", icon: "blur_circular", variant: "linen" as const },
  { name: "Serums", icon: "opacity", variant: "stone" as const },
  { name: "Cleansers", icon: "soap", variant: "dark" as const },
  { name: "Moisturizers", icon: "spa", variant: "green" as const },
  { name: "Suncare", icon: "sunny", variant: "linen" as const },
  { name: "Eye Care", icon: "visibility", variant: "stone" as const },
  { name: "Lip Care", icon: "favorite", variant: "dark" as const },
];

export const shopByConcern = [
  { name: "Hydration", icon: "water_drop" },
  { name: "Sensitivity", icon: "spa" },
  { name: "Dullness", icon: "wb_sunny" },
  { name: "Pores", icon: "filter_hdr" },
  { name: "Redness", icon: "healing" },
  { name: "Fine Lines", icon: "diamond" },
  { name: "Acne", icon: "blur_on" },
  { name: "Uneven Tone", icon: "gradient" },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelated(slug: string, limit = 4) {
  const me = getProduct(slug);
  const sameCat = products.filter((p) => p.slug !== slug && p.category === me?.category);
  const rest = products.filter((p) => p.slug !== slug && p.category !== me?.category);
  return [...sameCat, ...rest].slice(0, limit);
}

// Same as getRelated, but scoped to the curated Essenherb catalog only —
// avoids pulling in filler/placeholder products when falling back to local data.
export function getEssenherbRelated(slug: string, limit = 4) {
  const me = essenherbProducts.find((p) => p.slug === slug);
  const sameCat = essenherbProducts.filter((p) => p.slug !== slug && p.category === me?.category);
  const rest = essenherbProducts.filter((p) => p.slug !== slug && p.category !== me?.category);
  return [...sameCat, ...rest].slice(0, limit);
}

// Assigns a stable synthetic id (based on catalog position) so local/offline
// data can be used wherever the API-backed shape `Product & { id: number }` is expected.
export function withId(p: Product): Product & { id: number } {
  const id = products.findIndex((x) => x.slug === p.slug) + 1;
  return { ...p, id };
}

export const byCategory = (cat: string, limit = 12) =>
  products.filter((p) => p.category === cat).slice(0, limit);
export const newArrivals = (limit = 12) => products.filter((p) => p.isNew).slice(0, limit);
export const trendingNow = (limit = 12) => products.filter((p) => p.trending).slice(0, limit);
export const bestSellers = (limit = 12) => products.filter((p) => p.bestSeller).slice(0, limit);
export const underPrice = (max: number, limit = 12) =>
  products.filter((p) => p.price < max).slice(0, limit);

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
