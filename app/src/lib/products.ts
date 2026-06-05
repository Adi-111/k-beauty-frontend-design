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

type MkInput = Partial<Product> & Pick<Product, "slug" | "name" | "category" | "price">;

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
    shortDesc:
      p.shortDesc ?? `${p.name} — clean, effective Korean skincare for your daily ritual.`,
    description:
      p.description ??
      `${p.name} is a gentle yet effective addition to your routine, formulated with skin-loving Korean botanicals and made in Korea with strict quality control.`,
    ritual:
      p.ritual ?? "Apply to clean skin as part of your daily routine, morning and/or night.",
    ingredients:
      p.ingredients ??
      "Centella Asiatica, Sodium Hyaluronate, Panthenol, Green Tea Extract, Glycerin.",
    keyIngredients: p.keyIngredients ?? [
      {
        name: "Centella Asiatica",
        role: "Soothing",
        desc: "Calms and conditions sensitive, reactive skin.",
        icon: "eco",
      },
      {
        name: "Hyaluronic Acid",
        role: "Hydration",
        desc: "Multi-weight hydration that plumps and smooths.",
        icon: "water_drop",
      },
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
      "A convenient daily exfoliation ritual for anytime, anywhere. Formulated for even the most sensitive skin.",
    ritual:
      "After cleansing, take one pad with the included mini tongs. Gently sweep the embossed side across the face, avoiding the eye area.",
    ingredients:
      "AHA (Glycolic Acid), BHA (Salicylic Acid), PHA (Gluconolactone), Grape Extract, Oat-derived Beta-Glucan, Sodium Hyaluronate, Panthenol.",
    keyIngredients: [
      {
        name: "AHA · BHA · PHA",
        role: "Gentle Exfoliation",
        desc: "A triple-acid blend that removes dead skin cells, impurities and sebum buildup gently.",
        icon: "science",
      },
      {
        name: "Grape & Tiliacora Extract",
        role: "Hydration & Barrier Support",
        desc: "Natural botanical extracts replenish moisture and strengthen the skin's natural barrier.",
        icon: "nutrition",
      },
      {
        name: "Oat Beta-Glucan",
        role: "Soothing & Moisture Retention",
        desc: "Derived from oats, beta-glucan offers excellent moisturizing effects and calms irritated skin.",
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
      "From MJ Care — the No.1 online face mask brand in Japan for 9 years running, now trusted in 32 countries.",
    ritual:
      "After toning, pull out one sheet with the tweezers and unfold onto cleansed skin. Leave on for 10–20 minutes.",
    ingredients:
      "Centella Asiatica (CICA), Tea Tree Leaf Oil, Rosemary Extract, Aloe Barbadensis Leaf Extract, Hyaluronic Acid, Allantoin.",
    keyIngredients: [
      {
        name: "Tea Tree & Rosemary",
        role: "Soothing & Conditioning",
        desc: "Helps soothe irritated, sensitive skin and tightens the look of pores.",
        icon: "eco",
      },
      {
        name: "Hydsol-H6 Hyaluronic Acid",
        role: "Deep Hydration",
        desc: "Multi-complex hyaluronic acid forms a moisture barrier, delivering hydration deep into skin.",
        icon: "water_drop",
      },
      {
        name: "Tencel Mask Sheet",
        role: "Eco-Friendly Adhesion",
        desc: "Biodegradable natural-pulp fiber with better essence absorption than rayon.",
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
];

const fillerProducts: Product[] = [
  mk({ slug: "glass-skin-glow-serum", name: "Glass Skin Glow Serum", category: "Serums", collection: "Daily Ritual", price: 36, placeholderIcon: "opacity", rating: 4.7, reviewCount: 642, size: "30ml", badge: "Trending", trending: true, concerns: ["Dullness", "Uneven Tone", "Texture"], shortDesc: "A weightless brightening serum for that signature dewy K-beauty glass-skin finish.", keyIngredients: [{ name: "Niacinamide 5%", role: "Brightening", desc: "Visibly evens tone and fades dark spots.", icon: "wb_sunny" }, { name: "Rice Ferment", role: "Radiance", desc: "Antioxidant-rich ferment for a luminous glow.", icon: "grain" }] }),
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
];

export const shopByCategory = [
  { name: "Sheet Masks", icon: "✨", variant: "green" as const },
  { name: "Toner Pads", icon: "💧", variant: "linen" as const },
  { name: "Serums", icon: "🔬", variant: "stone" as const },
  { name: "Cleansers", icon: "🫧", variant: "dark" as const },
  { name: "Moisturizers", icon: "🌸", variant: "green" as const },
  { name: "Suncare", icon: "☀️", variant: "linen" as const },
  { name: "Eye Care", icon: "👁", variant: "stone" as const },
  { name: "Lip Care", icon: "💋", variant: "dark" as const },
];

export const shopByConcern = [
  { name: "Hydration", icon: "💧" },
  { name: "Sensitivity", icon: "🌿" },
  { name: "Dullness", icon: "✨" },
  { name: "Pores", icon: "🔍" },
  { name: "Redness", icon: "🌸" },
  { name: "Fine Lines", icon: "💎" },
  { name: "Acne", icon: "🫧" },
  { name: "Uneven Tone", icon: "🌅" },
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
  { name: "Seo-yeon K.", rating: 5, title: "The whole family is hooked", body: "The elderly in our home love it — at mask time everyone laughs and plays together. We'll keep using it.", product: "Daily Moist Soothing Mask — CICA", verified: true },
  { name: "Aarav M.", rating: 5, title: "Calmed my sensitive skin", body: "I woke up the next day and my skin had truly calmed down. Finally a pack I can trust with sensitive skin.", product: "Daily Moist Soothing Mask — CICA", verified: true },
  { name: "Hana T.", rating: 5, title: "Redness gone", body: "My skin calmed down and stayed moisturized, so most of the trouble cleared up. My redness settled.", product: "Daily Moist Soothing Mask — CICA", verified: true },
  { name: "Priya S.", rating: 5, title: "Daily must-have", body: "These days a daily pad is a must for me. So convenient and my skin has never felt smoother.", product: "Mild Peeling & Toner Pad", verified: true },
  { name: "Min-jun P.", rating: 5, title: "More than I expected", body: "Far more moisturizing and tone-evening than I expected. Looking forward to ordering more of the range.", product: "Mild Peeling & Toner Pad", verified: true },
  { name: "Riya D.", rating: 5, title: "Glass skin is real", body: "Three weeks in and my texture is so much smoother. The glow serum gives me that dewy finish I always wanted.", product: "Glass Skin Glow Serum", verified: true },
];
