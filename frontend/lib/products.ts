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
  {
    slug: "vital-spray-serum",
    name: "Vital Spray Serum",
    tagline: "White Truffle Skin Calming",
    category: "Serums",
    collection: "d'Alba",
    price: 28,
    compareAt: 34,
    image: "/products/dalba/vital-spray-serum-01.jpg",
    gallery: [
      "/products/dalba/vital-spray-serum-01.jpg",
      "/products/dalba/vital-spray-serum-02.jpg",
      "/products/dalba/vital-spray-serum-03.jpg",
      "/products/dalba/vital-spray-serum-04.jpg",
    ],
    placeholderVariant: "linen",
    placeholderIcon: "water_drop",
    rating: 4.7,
    reviewCount: 512,
    size: "100ml",
    shortDesc: "A calming spray serum infused with Italian white truffle to soothe and refresh skin in a single mist.",
    description:
      "d'Alba Piedmont's Vital Spray Serum delivers a fine, even mist of white truffle extract that calms redness and refreshes skin throughout the day — sprayed alone as a toner-mist or over makeup for an instant boost.",
    ritual: "Shake gently, hold 20–30cm from the face, and mist evenly morning, midday or after sun exposure.",
    ingredients: "White Truffle Extract, Centella Asiatica Extract, Panthenol, Sodium Hyaluronate, Adenosine.",
    keyIngredients: [
      { name: "White Truffle Extract", role: "Calming", desc: "An antioxidant-rich Italian botanical that soothes and revitalizes stressed skin.", icon: "eco" },
      { name: "Centella Asiatica", role: "Soothing", desc: "Calms redness and conditions reactive, sensitive skin.", icon: "spa" },
    ],
    concerns: ["Redness", "Sensitivity", "Dullness"],
  },
  {
    slug: "first-spray-serum",
    name: "First Spray Serum",
    tagline: "#1 Global Best Seller — White Truffle",
    category: "Serums",
    collection: "d'Alba",
    price: 32,
    compareAt: 38,
    image: "/products/dalba/first-spray-serum-01.jpg",
    gallery: [
      "/products/dalba/first-spray-serum-01.jpg",
      "/products/dalba/first-spray-serum-02.jpg",
      "/products/dalba/first-spray-serum-03.jpg",
      "/products/dalba/first-spray-serum-04.jpg",
    ],
    placeholderVariant: "stone",
    placeholderIcon: "auto_awesome",
    badge: "50M Sold Worldwide",
    rating: 4.8,
    reviewCount: 3204,
    size: "100ml",
    shortDesc: "d'Alba's iconic double-layer spray serum — over 50 million units sold worldwide — for instant hydrated, radiant skin.",
    description:
      "A double-layer serum enriched with white truffle from Italy, First Spray Serum is d'Alba's global best seller with 50 million units sold. One spritz delivers instant glow, deep long-lasting moisture, improved texture and oil control — no rubbing or patting required.",
    ritual: "Shake well to blend the two layers. Spray 2–3 times over the face after cleansing, day or night, in place of or layered over your regular toner.",
    ingredients: "White Truffle Extract, Squalane, Niacinamide, Sodium Hyaluronate, Panthenol.",
    keyIngredients: [
      { name: "White Truffle Extract", role: "Radiance", desc: "Delivers an instant glow boost and revitalizes dull, tired skin.", icon: "auto_awesome" },
      { name: "Double-Layer Oil/Water Complex", role: "Deep Moisture", desc: "A two-phase formula that locks in long-lasting hydration without a heavy feel.", icon: "water_drop" },
    ],
    stats: [
      { value: "50M", label: "Units sold worldwide" },
      { value: "#1", label: "Global best-selling spray serum" },
    ],
    concerns: ["Dullness", "Dryness", "Texture", "Excess Oil"],
    bestSeller: true,
    trending: true,
  },
  {
    slug: "uv-essence-sun-cream",
    name: "UV Essence Waterfull+ Tone-Up Sun Cream",
    tagline: "SPF50+ PA++++ Pink Correcting",
    category: "Suncare",
    collection: "d'Alba",
    price: 24,
    compareAt: 29,
    image: "/products/dalba/uv-essence-sun-cream-01.jpg",
    gallery: [
      "/products/dalba/uv-essence-sun-cream-01.jpg",
      "/products/dalba/uv-essence-sun-cream-02.jpg",
      "/products/dalba/uv-essence-sun-cream-03.jpg",
      "/products/dalba/uv-essence-sun-cream-04.jpg",
    ],
    placeholderVariant: "linen",
    placeholderIcon: "sunny",
    rating: 4.6,
    reviewCount: 287,
    size: "50ml",
    shortDesc: "A lightweight, pink-correcting tone-up sun cream with SPF50+ PA++++ that protects while moisturizing and vitalizing.",
    description:
      "UV Essence Waterfull+ protects skin from UV rays while moisturizing and vitalizing with a light, water-fresh formula. Its pink-correcting tone-up finish evens out skin tone instantly, leaving a natural, radiant glow under makeup or alone.",
    ritual: "Apply generously as the last step of your morning routine, 15–20 minutes before sun exposure. Reapply every 2–3 hours outdoors.",
    ingredients: "Niacinamide, Sodium Hyaluronate, Adenosine, UV Filters (SPF50+ PA++++).",
    keyIngredients: [
      { name: "Tone-Up Pink Pigments", role: "Instant Correction", desc: "Evens out redness and dullness for a naturally brightened complexion.", icon: "wb_sunny" },
      { name: "Broad-Spectrum SPF50+ PA++++", role: "UV Protection", desc: "High-level protection against UVA and UVB rays.", icon: "shield" },
    ],
    concerns: ["Sun Protection", "Uneven Tone", "Dullness"],
    isNew: true,
  },
  {
    slug: "pdrn-pink-peptide-serum",
    name: "PDRN Pink Peptide Serum",
    tagline: "Rose PDRN + 5 Types Peptide Complex",
    category: "Serums",
    collection: "Medicube",
    price: 34,
    compareAt: 40,
    image: "/products/medicube/pdrn-pink-peptide-serum-01.jpg",
    gallery: [
      "/products/medicube/pdrn-pink-peptide-serum-01.jpg",
      "/products/medicube/pdrn-pink-peptide-serum-02.jpg",
      "/products/medicube/pdrn-pink-peptide-serum-03.jpg",
      "/products/medicube/pdrn-pink-peptide-serum-04.jpg",
    ],
    placeholderVariant: "stone",
    placeholderIcon: "science",
    badge: "Dedicated to Real Results",
    rating: 4.7,
    reviewCount: 861,
    size: "30ml",
    shortDesc: "A pink peptide serum combining Rose PDRN (Sodium DNA) with a 5-type peptide complex for firmer, revitalized skin.",
    description:
      "Medicube's PDRN Pink Peptide Serum pairs salmon-derived Rose PDRN (Sodium DNA) with a five-type peptide complex to visibly firm, repair and revitalize skin, delivering a plumper, more resilient look with regular use.",
    ritual: "After toning, apply 2–3 drops to face and neck, morning and night. Follow with moisturizer.",
    ingredients: "Rose PDRN (Sodium DNA), 5 Types Peptide Complex, Niacinamide, Sodium Hyaluronate.",
    keyIngredients: [
      { name: "Rose PDRN (Sodium DNA)", role: "Skin Regeneration", desc: "A salmon-derived DNA complex that supports skin repair and resilience.", icon: "science" },
      { name: "5 Types Peptide Complex", role: "Firming", desc: "A multi-peptide blend that visibly firms and improves elasticity.", icon: "diamond" },
    ],
    concerns: ["Firmness", "Fine Lines", "Dullness"],
    trending: true,
  },
  {
    slug: "collagen-night-wrapping-mask",
    name: "Collagen Night Wrapping Mask",
    tagline: "Collagen Extract + Niacinamide + Ceramide NP",
    category: "Moisturizers",
    collection: "Medicube",
    price: 30,
    compareAt: 36,
    image: "/products/medicube/collagen-night-wrapping-mask-01.jpg",
    gallery: [
      "/products/medicube/collagen-night-wrapping-mask-01.jpg",
      "/products/medicube/collagen-night-wrapping-mask-02.jpg",
      "/products/medicube/collagen-night-wrapping-mask-03.jpg",
      "/products/medicube/collagen-night-wrapping-mask-04.jpg",
    ],
    placeholderVariant: "dark",
    placeholderIcon: "bedtime",
    rating: 4.6,
    reviewCount: 402,
    size: "75ml",
    shortDesc: "An overnight wrapping mask that firms skin with moisture using collagen extract, niacinamide and ceramide NP.",
    description:
      "Applied as the last step of your night routine, this rich wrapping mask forms a moisture seal over skin, firming and smoothing overnight with collagen extract, niacinamide and ceramide NP for a plumper, more even complexion by morning.",
    ritual: "As the final step of your evening routine, apply a generous layer over face and neck. Leave on overnight and rinse or tissue off in the morning.",
    ingredients: "Collagen Extract, Niacinamide, Ceramide NP, Sodium Hyaluronate, Panthenol.",
    keyIngredients: [
      { name: "Collagen Extract", role: "Firming", desc: "Firms the skin with moisture overnight for a plumper look by morning.", icon: "diamond" },
      { name: "Ceramide NP", role: "Barrier Repair", desc: "Reinforces the skin barrier and locks in hydration.", icon: "shield" },
    ],
    concerns: ["Firmness", "Dryness", "Fine Lines"],
  },
  {
    slug: "triple-collagen-toner",
    name: "Triple Collagen Toner",
    tagline: "For All Skin Types",
    category: "Toners",
    collection: "Medicube",
    price: 24,
    compareAt: 28,
    image: "/products/medicube/triple-collagen-toner-01.jpg",
    gallery: [
      "/products/medicube/triple-collagen-toner-01.jpg",
      "/products/medicube/triple-collagen-toner-02.jpg",
      "/products/medicube/triple-collagen-toner-03.jpg",
      "/products/medicube/triple-collagen-toner-04.jpg",
    ],
    placeholderVariant: "stone",
    placeholderIcon: "water_drop",
    rating: 4.6,
    reviewCount: 318,
    size: "180ml",
    shortDesc: "A triple-collagen toner that preps skin with lightweight moisture and a smoother, firmer feel.",
    description:
      "Triple Collagen Toner combines hydrolyzed collagen, soluble collagen and collagen extract to prep skin after cleansing, delivering lightweight hydration and a smoother, firmer feel for all skin types.",
    ritual: "After cleansing, sweep over a cotton pad or pat directly into skin with palms. Follow with serum.",
    ingredients: "Hydrolyzed Collagen, Soluble Collagen, Collagen Extract, Sodium Hyaluronate.",
    keyIngredients: [
      { name: "Triple Collagen Complex", role: "Firming Hydration", desc: "Three collagen sources work together to hydrate and firm skin from the first step.", icon: "water_drop" },
    ],
    concerns: ["Firmness", "Hydration", "Texture"],
  },
  {
    slug: "triple-collagen-serum",
    name: "Triple Collagen Serum",
    tagline: "Hydrolyzed Collagen + Aidecollagen",
    category: "Serums",
    collection: "Medicube",
    price: 32,
    compareAt: 38,
    image: "/products/medicube/triple-collagen-serum-01.jpg",
    gallery: [
      "/products/medicube/triple-collagen-serum-01.jpg",
      "/products/medicube/triple-collagen-serum-02.jpg",
      "/products/medicube/triple-collagen-serum-03.jpg",
      "/products/medicube/triple-collagen-serum-04.jpg",
    ],
    placeholderVariant: "stone",
    placeholderIcon: "opacity",
    rating: 4.7,
    reviewCount: 375,
    size: "55ml",
    shortDesc: "A collagen-rich serum with hydrolyzed collagen and Aidecollagen for firmer, bouncier skin.",
    description:
      "Triple Collagen Serum layers hydrolyzed collagen with Medicube's Aidecollagen complex to visibly firm and plump skin, improving elasticity and bounce with continued use.",
    ritual: "After toning, apply 2–3 pumps to face and neck. Pat gently until absorbed. Use morning and night.",
    ingredients: "Hydrolyzed Collagen, Aidecollagen, Sodium Hyaluronate, Panthenol.",
    keyIngredients: [
      { name: "Hydrolyzed Collagen", role: "Elasticity", desc: "Small-molecule collagen that absorbs quickly to improve bounce and firmness.", icon: "diamond" },
      { name: "Aidecollagen", role: "Collagen Support", desc: "Medicube's proprietary complex that supports the skin's own collagen network.", icon: "science" },
    ],
    concerns: ["Firmness", "Fine Lines", "Texture"],
  },
  {
    slug: "pdrn-collagen-gel-mask",
    name: "PDRN Pink Collagen Gel Mask",
    tagline: "Sodium DNA · Niacinamide · Hydrolyzed Collagen",
    category: "Sheet Masks",
    collection: "Medicube",
    price: 8,
    compareAt: 10,
    image: "/products/medicube/pdrn-collagen-gel-mask-01.jpg",
    gallery: [
      "/products/medicube/pdrn-collagen-gel-mask-01.jpg",
      "/products/medicube/pdrn-collagen-gel-mask-02.jpg",
      "/products/medicube/pdrn-collagen-gel-mask-03.jpg",
      "/products/medicube/pdrn-collagen-gel-mask-04.jpg",
    ],
    placeholderVariant: "stone",
    placeholderIcon: "face_retouching_natural",
    rating: 4.7,
    reviewCount: 289,
    size: "28g · 1 sheet",
    shortDesc: "A hydrogel sheet mask with Sodium DNA, niacinamide and hydrolyzed collagen for an instant, plumping treatment.",
    description:
      "This second-skin hydrogel mask fuses PDRN (Sodium DNA), niacinamide and hydrolyzed collagen to deliver an intensive plumping, brightening treatment in a single 15–20 minute application.",
    ritual: "After toning, apply the gel mask to clean, dry skin. Leave on for 15–20 minutes, remove, and pat in the remaining essence.",
    ingredients: "Sodium DNA (PDRN), Niacinamide, Hydrolyzed Collagen, Sodium Hyaluronate.",
    keyIngredients: [
      { name: "PDRN (Sodium DNA)", role: "Regeneration", desc: "Supports skin repair and a plumper, more resilient look.", icon: "science" },
      { name: "Hydrogel Sheet", role: "High Adhesion", desc: "Second-skin gel texture for maximum ingredient absorption.", icon: "spa" },
    ],
    concerns: ["Firmness", "Dullness", "Hydration"],
  },
  {
    slug: "zero-pore-pad",
    name: "Zero Pore Pad",
    tagline: "AHA · BHA · Panthenol · Allantoin",
    category: "Toner Pads",
    collection: "Medicube",
    price: 26,
    compareAt: 32,
    image: "/products/medicube/zero-pore-pad-01.jpg",
    gallery: [
      "/products/medicube/zero-pore-pad-01.jpg",
      "/products/medicube/zero-pore-pad-02.jpg",
      "/products/medicube/zero-pore-pad-03.jpg",
      "/products/medicube/zero-pore-pad-04.jpg",
    ],
    placeholderVariant: "linen",
    placeholderIcon: "blur_circular",
    badge: "Best Seller",
    rating: 4.7,
    reviewCount: 954,
    size: "155g · 70 pads",
    shortDesc: "An AHA·BHA exfoliating pad with panthenol, allantoin and sodium hyaluronate to refine pores without irritation.",
    description:
      "Zero Pore Pad combines gentle AHA and BHA exfoliation with panthenol, allantoin and sodium hyaluronate, sweeping away excess sebum and refining the look of pores while keeping skin calm and hydrated.",
    ritual: "After cleansing, sweep the textured side over the face, avoiding the eye area, 2–4 times a week. Follow with the rest of your routine.",
    ingredients: "AHA, BHA, Panthenol, Allantoin, Sodium Hyaluronate.",
    keyIngredients: [
      { name: "AHA · BHA", role: "Pore Refining", desc: "A gentle acid blend that clears pores and smooths texture.", icon: "science" },
      { name: "Panthenol · Allantoin", role: "Soothing", desc: "Calms skin during exfoliation to prevent irritation.", icon: "spa" },
    ],
    concerns: ["Pores", "Texture", "Excess Oil"],
    bestSeller: true,
  },
  {
    slug: "pdrn-collagen-capsule-cream",
    name: "PDRN Pink Collagen Capsule Cream",
    tagline: "Sodium DNA · Niacinamide 5%",
    category: "Moisturizers",
    collection: "Medicube",
    price: 36,
    compareAt: 42,
    image: "/products/medicube/pdrn-collagen-capsule-cream-01.jpg",
    gallery: [
      "/products/medicube/pdrn-collagen-capsule-cream-01.jpg",
      "/products/medicube/pdrn-collagen-capsule-cream-02.jpg",
      "/products/medicube/pdrn-collagen-capsule-cream-03.jpg",
      "/products/medicube/pdrn-collagen-capsule-cream-04.jpg",
    ],
    placeholderVariant: "stone",
    placeholderIcon: "spa",
    rating: 4.8,
    reviewCount: 617,
    size: "55g",
    shortDesc: "A bouncy capsule cream with PDRN (Sodium DNA) and 5% niacinamide that bursts into a plumping, brightening finish.",
    description:
      "Signature bouncy capsules burst on contact, releasing PDRN (Sodium DNA) and 5% niacinamide into skin for a firmer, brighter, more resilient complexion — Medicube's most-loved moisturizer format.",
    ritual: "Scoop a small amount, warm between palms until the capsules burst, and press evenly into face and neck morning and night.",
    ingredients: "PDRN (Sodium DNA), Niacinamide 5%, Sodium Hyaluronate, Ceramide NP.",
    keyIngredients: [
      { name: "PDRN (Sodium DNA)", role: "Regeneration", desc: "Supports skin repair for a firmer, more resilient look.", icon: "science" },
      { name: "Niacinamide 5%", role: "Brightening", desc: "Visibly evens tone and brightens overall complexion.", icon: "wb_sunny" },
    ],
    concerns: ["Firmness", "Dullness", "Hydration"],
    trending: true,
  },
  {
    slug: "collagen-jelly-cream",
    name: "Collagen Jelly Cream",
    tagline: "Collagen + Soluble Collagen",
    category: "Moisturizers",
    collection: "Medicube",
    price: 33,
    compareAt: 39,
    image: "/products/medicube/collagen-jelly-cream-01.jpg",
    gallery: [
      "/products/medicube/collagen-jelly-cream-01.jpg",
      "/products/medicube/collagen-jelly-cream-02.jpg",
      "/products/medicube/collagen-jelly-cream-03.jpg",
      "/products/medicube/collagen-jelly-cream-04.jpg",
    ],
    placeholderVariant: "dark",
    placeholderIcon: "diamond",
    badge: "Best Seller",
    rating: 4.8,
    reviewCount: 1103,
    size: "110ml",
    shortDesc: "A jiggly jelly-textured cream packed with collagen and soluble collagen for bouncy, firm-looking skin.",
    description:
      "Medicube's signature jelly-textured moisturizer combines collagen and soluble collagen with hydrolyzed collagen to visibly firm and plump skin, melting from a bouncy jelly into a lightweight, non-sticky finish.",
    ritual: "Scoop and warm between palms, then press evenly over face and neck as the last step of your routine, morning and night.",
    ingredients: "Collagen, Soluble Collagen, Hydrolyzed Collagen, Sodium Hyaluronate.",
    keyIngredients: [
      { name: "Jelly Collagen Complex", role: "Firming", desc: "A bouncy, jelly-textured collagen blend that plumps and firms on contact.", icon: "diamond" },
    ],
    concerns: ["Firmness", "Fine Lines", "Hydration"],
    bestSeller: true,
  },
  {
    slug: "dokdo-toner",
    name: "1025 Dokdo Toner",
    tagline: "Deep Sea Water Hydration",
    category: "Toners",
    collection: "Round Lab",
    price: 22,
    compareAt: 26,
    image: "/products/roundlab/dokdo-toner-01.jpg",
    gallery: [
      "/products/roundlab/dokdo-toner-01.jpg",
      "/products/roundlab/dokdo-toner-02.jpg",
      "/products/roundlab/dokdo-toner-03.jpg",
      "/products/roundlab/dokdo-toner-04.jpg",
    ],
    placeholderVariant: "linen",
    placeholderIcon: "water_drop",
    badge: "Cult Favorite",
    rating: 4.7,
    reviewCount: 1432,
    size: "200ml",
    shortDesc: "Round Lab's cult-favorite mineral toner, made with deep sea water from Dokdo Island for lightweight, lasting hydration.",
    description:
      "1025 Dokdo Toner is formulated with mineral-rich deep sea water sourced near Dokdo Island, delivering clean, lightweight hydration that preps skin without any sticky residue — a first-step staple in Round Lab's minimalist routine.",
    ritual: "After cleansing, pat into skin with palms or sweep over a cotton pad. Follow with serum or moisturizer.",
    ingredients: "Deep Sea Water, Sodium Hyaluronate, Panthenol, Betaine.",
    keyIngredients: [
      { name: "Dokdo Deep Sea Water", role: "Mineral Hydration", desc: "Mineral-rich water that hydrates without leaving any sticky residue.", icon: "water_drop" },
    ],
    concerns: ["Hydration", "Sensitivity"],
    bestSeller: true,
  },
  {
    slug: "birch-juice-moisture-cream",
    name: "Birch Juice Moisturizing Cream",
    tagline: "Vita Hyaluronic Acid · Deep Hydration",
    category: "Moisturizers",
    collection: "Round Lab",
    price: 27,
    compareAt: 32,
    image: "/products/roundlab/birch-juice-moisture-cream-01.jpg",
    gallery: [
      "/products/roundlab/birch-juice-moisture-cream-01.jpg",
      "/products/roundlab/birch-juice-moisture-cream-02.jpg",
      "/products/roundlab/birch-juice-moisture-cream-03.jpg",
      "/products/roundlab/birch-juice-moisture-cream-04.jpg",
    ],
    placeholderVariant: "linen",
    placeholderIcon: "spa",
    rating: 4.7,
    reviewCount: 728,
    size: "80ml",
    shortDesc: "A birch sap moisture cream with vita hyaluronic acid that replenishes and calms parched, tired skin.",
    description:
      "Made with birch sap harvested in early spring, this cream floods dehydrated skin with moisture and soothes irritation, using a vita hyaluronic acid complex to keep skin comfortable for hours.",
    ritual: "Apply as the last step of your morning and evening routine, pressing gently into face and neck.",
    ingredients: "Birch Sap, Sodium Hyaluronate, Vitamin Complex, Panthenol.",
    keyIngredients: [
      { name: "Birch Sap", role: "Deep Hydration", desc: "Naturally rich in minerals and amino acids that replenish parched skin.", icon: "eco" },
      { name: "Vita Hyaluronic Acid", role: "Moisture Retention", desc: "A vitamin-hyaluronic acid complex that locks in lasting hydration.", icon: "water_drop" },
    ],
    concerns: ["Dryness", "Hydration", "Sensitivity"],
  },
  {
    slug: "birch-juice-sun-cream",
    name: "Birch Juice Moisture Sun Cream",
    tagline: "SPF50+ PA++++",
    category: "Suncare",
    collection: "Round Lab",
    price: 21,
    compareAt: 25,
    image: "/products/roundlab/birch-juice-sun-cream-01.jpg",
    gallery: [
      "/products/roundlab/birch-juice-sun-cream-01.jpg",
      "/products/roundlab/birch-juice-sun-cream-02.jpg",
      "/products/roundlab/birch-juice-sun-cream-03.jpg",
      "/products/roundlab/birch-juice-sun-cream-04.jpg",
    ],
    placeholderVariant: "linen",
    placeholderIcon: "sunny",
    rating: 4.6,
    reviewCount: 495,
    size: "50ml",
    shortDesc: "A hydrating SPF50+ PA++++ sun cream with birch sap that protects while replenishing tired, thirsty skin.",
    description:
      "Formulated for skin that needs both hydration and protection, this sun cream pairs broad-spectrum SPF50+ PA++++ with birch sap to charge up moisture levels while shielding skin from UV damage.",
    ritual: "Apply generously as the last step of your morning routine, 15–20 minutes before sun exposure. Reapply every 2–3 hours outdoors.",
    ingredients: "Birch Sap, Sodium Hyaluronate, UV Filters (SPF50+ PA++++), Panthenol.",
    keyIngredients: [
      { name: "Birch Sap", role: "Hydration", desc: "Replenishes moisture lost to sun and environmental exposure.", icon: "eco" },
      { name: "Broad-Spectrum SPF50+ PA++++", role: "UV Protection", desc: "High-level protection against UVA and UVB rays.", icon: "shield" },
    ],
    concerns: ["Sun Protection", "Dryness"],
    isNew: true,
  },
  {
    slug: "madagascar-centella-cleansing-oil",
    name: "Madagascar Centella Light Cleansing Oil",
    tagline: "Made with Pure Centella from Madagascar",
    category: "Cleansers",
    collection: "SKIN1004",
    price: 20,
    compareAt: 24,
    image: "/products/skin1004/cleansing-oil-01.jpg",
    gallery: [
      "/products/skin1004/cleansing-oil-01.jpg",
      "/products/skin1004/cleansing-oil-02.jpg",
      "/products/skin1004/cleansing-oil-03.jpg",
      "/products/skin1004/cleansing-oil-04.jpg",
    ],
    placeholderVariant: "stone",
    placeholderIcon: "opacity",
    badge: "Best Seller",
    rating: 4.7,
    reviewCount: 1876,
    size: "200ml",
    shortDesc: "A lightweight cleansing oil made with pure Centella from Madagascar that melts away makeup and SPF without stripping skin.",
    description:
      "SKIN1004's Light Cleansing Oil uses pure Centella Asiatica sourced directly from Madagascar to dissolve makeup, sunscreen and sebum in one gentle massage, rinsing clean without disturbing the skin barrier.",
    ritual: "Pump 2–3 times onto dry hands, massage over dry face to dissolve makeup and SPF, then emulsify with water and rinse.",
    ingredients: "Centella Asiatica Extract (Madagascar), Olive Oil, Sunflower Seed Oil, Vitamin E.",
    keyIngredients: [
      { name: "Madagascar Centella", role: "Soothing", desc: "Pure, single-origin centella that calms skin during cleansing.", icon: "eco" },
      { name: "Botanical Oil Blend", role: "Makeup Removal", desc: "Effectively dissolves makeup and SPF without a greasy residue.", icon: "opacity" },
    ],
    concerns: ["Makeup", "Sensitivity", "Excess Oil"],
    bestSeller: true,
  },
  {
    slug: "madagascar-centella-tone-brightening-ampoule",
    name: "Madagascar Centella Tone Brightening Capsule Ampoule",
    tagline: "Made with Pure Centella from Madagascar",
    category: "Serums",
    collection: "SKIN1004",
    price: 22,
    compareAt: 27,
    image: "/products/skin1004/tone-brightening-ampoule-01.jpg",
    gallery: [
      "/products/skin1004/tone-brightening-ampoule-01.jpg",
      "/products/skin1004/tone-brightening-ampoule-02.jpg",
      "/products/skin1004/tone-brightening-ampoule-03.jpg",
      "/products/skin1004/tone-brightening-ampoule-04.jpg",
      "/products/skin1004/tone-brightening-ampoule-05.jpg",
    ],
    placeholderVariant: "stone",
    placeholderIcon: "auto_awesome",
    badge: "Best Seller",
    rating: 4.8,
    reviewCount: 2541,
    size: "100ml",
    shortDesc: "SKIN1004's global best-seller — a lightweight capsule ampoule with pure Centella from Madagascar for brighter, calmer skin.",
    description:
      "One of SKIN1004's most-loved formulas, this capsule ampoule delivers pure Centella Asiatica from Madagascar in a light, fast-absorbing texture that visibly brightens tone and calms irritation with daily use. Available in 30ml, 50ml and 100ml sizes.",
    ritual: "After toning, apply 2–3 drops to face and neck, morning and night. Follow with moisturizer.",
    ingredients: "Centella Asiatica Extract (Madagascar) 79.8%, Niacinamide, Sodium Hyaluronate, Panthenol.",
    keyIngredients: [
      { name: "Madagascar Centella (79.8%)", role: "Soothing & Brightening", desc: "A high-concentration, single-origin centella that calms and evens tone.", icon: "eco" },
      { name: "Capsule Ampoule Texture", role: "Fast Absorption", desc: "A featherlight texture that absorbs instantly without residue.", icon: "auto_awesome" },
    ],
    concerns: ["Redness", "Dullness", "Sensitivity"],
    bestSeller: true,
    trending: true,
  },
  {
    slug: "madagascar-centella-sun-serum",
    name: "Madagascar Centella Hyalu-Cica Water-Fit Sun Serum",
    tagline: "SPF50+ PA++++ Broad Spectrum",
    category: "Suncare",
    collection: "SKIN1004",
    price: 19,
    compareAt: 23,
    image: "/products/skin1004/sun-serum-01.jpg",
    gallery: [
      "/products/skin1004/sun-serum-01.jpg",
      "/products/skin1004/sun-serum-02.jpg",
      "/products/skin1004/sun-serum-03.jpg",
      "/products/skin1004/sun-serum-04.jpg",
    ],
    placeholderVariant: "stone",
    placeholderIcon: "sunny",
    badge: "Best Seller",
    rating: 4.7,
    reviewCount: 3012,
    size: "50ml",
    shortDesc: "A cult-favorite water-fit sun serum with hyaluronic acid and Madagascar centella for weightless, hydrating SPF50+ protection.",
    description:
      "Hyalu-Cica Water-Fit Sun Serum blends broad-spectrum SPF50+ PA++++ protection with hyaluronic acid and pure Centella from Madagascar, absorbing instantly into a water-fresh, non-greasy finish with zero white cast.",
    ritual: "Apply generously as the last step of your morning routine, 15–20 minutes before sun exposure. Reapply every 2–3 hours outdoors.",
    ingredients: "Centella Asiatica Extract (Madagascar), Sodium Hyaluronate, UV Filters (SPF50+ PA++++).",
    keyIngredients: [
      { name: "Madagascar Centella", role: "Soothing", desc: "Calms skin that's prone to sun-triggered redness and irritation.", icon: "eco" },
      { name: "Hyalu-Cica Complex", role: "Hydration + Protection", desc: "Combines hyaluronic acid hydration with UV protection in a single water-fit texture.", icon: "water_drop" },
    ],
    concerns: ["Sun Protection", "Sensitivity", "Dullness"],
    bestSeller: true,
    trending: true,
  },
  {
    slug: "confidence-concealer-trio",
    name: "TFIT Confidence Skin Fit Concealer Trio",
    tagline: "3-Color Correcting Palette",
    category: "Makeup",
    collection: "TFIT",
    price: 18,
    compareAt: 22,
    image: "/products/tfit/concealer-trio-01.jpg",
    gallery: [
      "/products/tfit/concealer-trio-01.jpg",
      "/products/tfit/concealer-trio-02.jpg",
      "/products/tfit/concealer-trio-03.jpg",
      "/products/tfit/concealer-trio-04.jpg",
      "/products/tfit/concealer-trio-05.jpg",
    ],
    placeholderVariant: "linen",
    placeholderIcon: "palette",
    rating: 4.5,
    reviewCount: 214,
    size: "3-color palette · available in multiple shade sets",
    shortDesc: "A 3-in-1 concealer palette pairing a base shade, corrector and highlight tone for custom coverage and color-correcting.",
    description:
      "TFIT's Confidence Skin Fit Concealer packs three complementary shades in one compact — a true-to-skin base, a color corrector and a brightening highlight — so you can mix, match and blend for natural, custom coverage. Available across multiple shade sets from fair to deep.",
    ritual: "Dab the base shade over blemishes and dark circles, layer the corrector for redness or discoloration, then blend the highlight into high points for a lifted finish.",
    ingredients: "Titanium Dioxide, Dimethicone, Vitamin E, Squalane.",
    keyIngredients: [
      { name: "3-Shade System", role: "Custom Coverage", desc: "Mix base, corrector and highlight shades for a tailored, natural finish.", icon: "palette" },
      { name: "Creamy Blendable Texture", role: "Long Wear", desc: "A soft, buildable formula that blends seamlessly and wears through the day.", icon: "brush" },
    ],
    concerns: ["Dark Circles", "Uneven Tone", "Redness"],
  },
  {
    slug: "silk-veil-primer",
    name: "Delicate Silk Veil Art Primer",
    tagline: "Skin Pore Cover Smooth Corrector",
    category: "Makeup",
    collection: "TFIT",
    price: 21,
    compareAt: 25,
    image: "/products/tfit/silk-veil-primer-01.jpg",
    gallery: [
      "/products/tfit/silk-veil-primer-01.jpg",
      "/products/tfit/silk-veil-primer-02.jpg",
      "/products/tfit/silk-veil-primer-03.jpg",
      "/products/tfit/silk-veil-primer-04.jpg",
    ],
    placeholderVariant: "stone",
    placeholderIcon: "blur_on",
    rating: 4.6,
    reviewCount: 176,
    size: "30ml",
    shortDesc: "A silky pore-blurring primer that smooths texture and preps skin for a flawless, longer-lasting makeup base.",
    description:
      "Delicate Silk Veil Art Primer glides on as a soft-focus veil, blurring the look of pores and uneven texture while priming skin for smoother makeup application and extended wear.",
    ritual: "Apply a thin, even layer over clean, moisturized skin as the final step before foundation.",
    ingredients: "Cyclopentasiloxane, Dimethicone, Silica, Vitamin E.",
    keyIngredients: [
      { name: "Silk-Fit Complex", role: "Pore Blurring", desc: "A soft-focus texture that visibly minimizes the look of pores and fine lines.", icon: "blur_on" },
    ],
    concerns: ["Pores", "Texture"],
  },
  {
    slug: "radiance-fit-foundation",
    name: "Radiance Fit Serum Foundation",
    tagline: "Enriched Serum Base · Healthy Glow",
    category: "Makeup",
    collection: "TFIT",
    price: 26,
    compareAt: 31,
    image: "/products/tfit/radiance-fit-foundation-01.jpg",
    gallery: [
      "/products/tfit/radiance-fit-foundation-01.jpg",
      "/products/tfit/radiance-fit-foundation-02.jpg",
      "/products/tfit/radiance-fit-foundation-03.jpg",
      "/products/tfit/radiance-fit-foundation-04.jpg",
    ],
    placeholderVariant: "linen",
    placeholderIcon: "wb_sunny",
    isNew: true,
    rating: 4.6,
    reviewCount: 198,
    size: "30ml · multiple shades",
    shortDesc: "A serum-enriched liquid foundation that melts into skin for buildable, natural coverage with a healthy, glowing finish.",
    description:
      "Radiance Fit Serum Foundation is built on an enriched serum base that hydrates as it covers, evening out tone while letting skin's natural texture show through for a lit-from-within, healthy glow finish.",
    ritual: "Apply with a brush, sponge or fingertips over primed skin, building coverage in thin layers as needed.",
    ingredients: "Water, Niacinamide, Sodium Hyaluronate, Titanium Dioxide, Squalane.",
    keyIngredients: [
      { name: "Enriched Serum Base", role: "Hydrating Coverage", desc: "A serum-first formula that hydrates while evening out tone.", icon: "water_drop" },
    ],
    concerns: ["Uneven Tone", "Dryness"],
  },
  {
    slug: "mask-fit-cushion-foundation",
    name: "Mask Fit Red Cushion Foundation",
    tagline: "TIRTIR's Iconic Glow Cushion",
    category: "Makeup",
    collection: "TIRTIR",
    price: 24,
    compareAt: 29,
    image: "/products/tirtir/cushion-foundation-01.jpg",
    gallery: [
      "/products/tirtir/cushion-foundation-01.jpg",
      "/products/tirtir/cushion-foundation-02.jpg",
      "/products/tirtir/cushion-foundation-03.jpg",
      "/products/tirtir/cushion-foundation-04.jpg",
    ],
    placeholderVariant: "dark",
    placeholderIcon: "brush",
    badge: "Viral Best Seller",
    rating: 4.8,
    reviewCount: 4187,
    size: "18g · shades 21N–23N and beyond",
    shortDesc: "TIRTIR's viral, buildable cushion foundation that melts into skin for a natural, mask-like second-skin finish.",
    description:
      "The Mask Fit Red Cushion became a global viral sensation for its seamless, second-skin finish. A lightweight, buildable formula glides on with the included puff for natural, breathable coverage that lasts all day without settling into fine lines.",
    ritual: "Press the puff onto the cushion, then pat gently over the face starting from the center, building coverage where needed.",
    ingredients: "Water, Niacinamide, Titanium Dioxide, Sodium Hyaluronate, Adenosine.",
    keyIngredients: [
      { name: "Mask Fit Formula", role: "Second-Skin Finish", desc: "A weightless texture that clings to skin like a soft mask rather than sitting on top.", icon: "brush" },
      { name: "Buildable Coverage", role: "Natural Finish", desc: "Sheer to medium coverage that layers seamlessly without caking.", icon: "layers" },
    ],
    concerns: ["Uneven Tone", "Texture", "Dullness"],
    bestSeller: true,
    trending: true,
  },
  {
    slug: "mask-fit-makeup-fixer",
    name: "Mask Fit Make Up Fixer",
    tagline: "Long Lasting · Blurring Effect · Moist Finish",
    category: "Makeup",
    collection: "TIRTIR",
    price: 16,
    compareAt: 20,
    image: "/products/tirtir/makeup-fixer-01.jpg",
    gallery: [
      "/products/tirtir/makeup-fixer-01.jpg",
      "/products/tirtir/makeup-fixer-02.jpg",
      "/products/tirtir/makeup-fixer-03.jpg",
      "/products/tirtir/makeup-fixer-04.jpg",
    ],
    placeholderVariant: "dark",
    placeholderIcon: "water_drop",
    rating: 4.6,
    reviewCount: 542,
    size: "80ml",
    shortDesc: "A fine-mist setting spray that locks in makeup with a soft-blurring, dewy-moist finish that lasts all day.",
    description:
      "TIRTIR's Mask Fit Make Up Fixer sets makeup in a fine, even mist that blurs the look of texture and pores while keeping the finish moist and radiant rather than powdery or flat — for long wear without a mask-like cast.",
    ritual: "Hold 20–30cm from the face and mist evenly over finished makeup to set. Reapply midday to refresh.",
    ingredients: "Water, Glycerin, Butylene Glycol, Panthenol.",
    keyIngredients: [
      { name: "Fine-Mist Fixer", role: "Long Wear", desc: "An ultra-fine spray that sets makeup without disturbing it.", icon: "water_drop" },
    ],
    concerns: ["Longevity", "Texture"],
  },
  {
    slug: "milk-skin-toner",
    name: "Milk Skin Toner",
    tagline: "Refreshing Skin · Moisturizing · Soothing",
    category: "Toners",
    collection: "TIRTIR",
    price: 20,
    compareAt: 24,
    image: "/products/tirtir/milk-skin-toner-01.jpg",
    gallery: [
      "/products/tirtir/milk-skin-toner-01.jpg",
      "/products/tirtir/milk-skin-toner-02.jpg",
      "/products/tirtir/milk-skin-toner-03.jpg",
      "/products/tirtir/milk-skin-toner-04.jpg",
      "/products/tirtir/milk-skin-toner-05.jpg",
    ],
    placeholderVariant: "linen",
    placeholderIcon: "water_drop",
    rating: 4.6,
    reviewCount: 389,
    size: "150ml",
    shortDesc: "A milky-textured toner that refreshes and softens skin while soothing and moisturizing in one easy step.",
    description:
      "Milk Skin Toner has a soft, milky texture that preps skin without any tightness, refreshing and moisturizing while soothing sensitivity — a gentle first step for TIRTIR's makeup-focused routine.",
    ritual: "After cleansing, sweep over a cotton pad or pat directly into skin with palms. Follow with serum or moisturizer.",
    ingredients: "Water, Glycerin, Niacinamide, Panthenol, Betaine.",
    keyIngredients: [
      { name: "Milky Hydration Complex", role: "Soothing", desc: "A soft, milk-textured blend that refreshes and calms skin without stripping it.", icon: "water_drop" },
    ],
    concerns: ["Sensitivity", "Hydration"],
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
export const curatedProducts: Product[] = realProducts;

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
  "Makeup",
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

// Same as getRelated, but scoped to the curated real-photo catalog only —
// avoids pulling in filler/placeholder products when falling back to local data.
export function getCuratedRelated(slug: string, limit = 4) {
  const me = curatedProducts.find((p) => p.slug === slug);
  const sameCat = curatedProducts.filter((p) => p.slug !== slug && p.category === me?.category);
  const rest = curatedProducts.filter((p) => p.slug !== slug && p.category !== me?.category);
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
