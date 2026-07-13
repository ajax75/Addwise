/* Single source of truth for the product/system list — shared by the
   Home carousel and the Products page so they always match.

   PRODUCT PHOTOS ARE AUTO-DISCOVERED.
   Drop any number of images (any filename, jpg/png/webp) into:
       frontend/src/assets/products/<id>/
   Every image in the folder is included automatically, sorted by filename —
   no code changes needed. The first image (alphabetically) is used as the
   tile/cover; the rest fill the detail-page gallery. */

// webpack scans the folder at build time and bundles every matching image
const ctx = require.context("../assets/products", true, /\.(png|jpe?g|webp|avif|gif)$/i);

const galleries = {};
ctx.keys().forEach((key) => {
  const match = key.match(/^\.\/([^/]+)\//);
  if (!match) return;
  const folder = match[1];
  (galleries[folder] = galleries[folder] || []).push(key);
});
Object.keys(galleries).forEach((folder) => {
  galleries[folder] = galleries[folder]
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((key) => ctx(key));
});

// Neutral placeholder so folders with no images yet never render a broken image
const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='100%25' height='100%25' fill='%23EEF2F6'/%3E%3C/svg%3E";

const galleryFor = (id) => (galleries[id] && galleries[id].length ? galleries[id] : [PLACEHOLDER]);
const coverFor = (id) => galleryFor(id)[0];

export const systemTypes = [
  {
    id: "uv-uf",
    title: "UV + UF Water Purifier",
    badge: "Chemical-Free",
    category: "Drinking Water",
    summary: "Chemical-free purification for low-TDS municipal water — keeps natural minerals.",
    intro:
      "A chemical-free purifier ideal for treated municipal water. It combines ultrafiltration and UV sterilisation to remove particles and neutralise microbes while preserving the water's natural minerals.",
    image: coverFor("uv-uf"),
    gallery: galleryFor("uv-uf"),
    bestFor: ["Municipal (corporation) water", "Low TDS water", "Homes mainly concerned about bacteria & viruses"],
    howItWorks: [
      { name: "UF (Ultrafiltration)", text: "Removes suspended particles, dirt, cysts, and bacteria through a fine membrane." },
      { name: "UV (Ultraviolet)", text: "Uses UV light to deactivate bacteria and viruses without adding chemicals." }
    ],
    advantages: ["Retains natural minerals", "Produces zero wastewater", "Chemical-free purification", "Lower maintenance than RO systems"],
    limitations: ["Cannot remove dissolved salts or heavy metals", "Only suitable when source water already has low TDS and minimal chemical contamination"]
  },
  {
    id: "ro-uv-uf",
    title: "RO + UV + UF Water Purifier",
    badge: "Most Popular",
    category: "Drinking Water",
    summary: "All-round purification for borewell, tanker and high-TDS water.",
    intro:
      "Our most versatile purifier, engineered for challenging water. Reverse osmosis strips dissolved salts and heavy metals, while UV and UF handle microbes and fine particles for consistently safe, great-tasting water.",
    image: coverFor("ro-uv-uf"),
    gallery: galleryFor("ro-uv-uf"),
    bestFor: ["Borewell water", "Tanker water", "High TDS water", "Mixed water sources"],
    howItWorks: [
      { name: "RO (Reverse Osmosis)", text: "Removes dissolved salts, heavy metals, chemicals, fluoride, and high TDS." },
      { name: "UV (Ultraviolet)", text: "Eliminates bacteria and viruses." },
      { name: "UF (Ultrafiltration)", text: "Removes remaining suspended particles and provides a final polishing stage." }
    ],
    advantages: ["Comprehensive purification", "Better taste and odor", "Handles both chemical and biological contaminants", "Suits most Indian households with varying water quality"],
    limitations: ["Requires electricity", "Produces wastewater during RO purification", "Needs periodic filter replacement"]
  },
  {
    id: "ro-uv-uf-alkaline",
    title: "RO + UV + UF + Alkaline Water Purifier",
    badge: "Premium",
    category: "Premium Drinking",
    summary: "Premium, mineral-balanced drinking water with maximum purification.",
    intro:
      "The complete drinking-water experience. Everything in our RO + UV + UF system, plus an alkaline mineraliser that reintroduces calcium and magnesium and balances pH — for water that's as healthy as it is pure.",
    image: coverFor("ro-uv-uf-alkaline"),
    gallery: galleryFor("ro-uv-uf-alkaline"),
    bestFor: ["Families seeking premium drinking water", "Homes using borewell or high-TDS water", "Users who prefer mineral-balanced water"],
    howItWorks: [
      { name: "RO + UV + UF", text: "All the purification stages of the RO + UV + UF system." },
      { name: "Alkaline Mineralizer", text: "Restores beneficial minerals such as calcium and magnesium while balancing the water's pH." }
    ],
    advantages: ["Maximum purification", "Reintroduces essential minerals", "Improved taste", "Balanced pH", "Protection against physical, chemical & biological contaminants"],
    idealFor: "Families looking for both purification and enhanced drinking water quality."
  },
  {
    id: "iron-removal",
    title: "Iron Removal Filter",
    badge: "Borewell",
    category: "Pre-Treatment",
    summary: "Targets iron & manganese in borewell water — no more stains or metallic taste.",
    intro:
      "A dedicated filter for iron- and manganese-heavy borewell water. It stops the staining, metallic taste and odour that damage fixtures, spoil laundry and shorten the life of your appliances.",
    image: coverFor("iron-removal"),
    gallery: galleryFor("iron-removal"),
    bestFor: ["Borewell water containing iron or manganese"],
    removes: ["Iron", "Manganese", "Some heavy metals"],
    benefits: ["Prevents yellow and brown stains", "Eliminates metallic taste and odor", "Protects plumbing and appliances", "Improves laundry quality", "Reduces maintenance costs"]
  },
  {
    id: "whole-house",
    title: "Whole House Filtration System",
    badge: "Whole Home",
    category: "Point of Entry",
    summary: "Point-of-entry treatment so every tap in the building gets cleaner water.",
    intro:
      "Point-of-entry treatment that cleans water the moment it enters your property — so every tap, shower and appliance is protected, not just your kitchen.",
    image: coverFor("whole-house"),
    gallery: galleryFor("whole-house"),
    bestFor: ["Villas", "Apartments", "Independent houses", "Hotels"],
    purpose: "Treats water at the point where it enters the building, ensuring every tap receives cleaner water.",
    benefits: ["Protects plumbing", "Extends appliance life", "Improves water quality throughout the property"]
  },
  {
    id: "advanced-combination",
    title: "Advanced Combination Filtration Systems",
    badge: "Bespoke",
    category: "Custom / Industrial",
    summary: "Multiple technologies combined to solve several water problems at once.",
    intro:
      "Bespoke, multi-stage systems that tackle several water problems at once. We engineer the right combination of filtration, softening and sterilisation for your specific source and demand.",
    image: coverFor("advanced-combination"),
    gallery: galleryFor("advanced-combination"),
    description: "These systems combine multiple technologies to solve several water quality issues simultaneously.",
    combos: [
      { name: "Whole House Protection", tech: "Sediment Filter + Iron Filter + Activated Carbon", note: "Borewell water with dirt, iron, and odor issues." },
      { name: "Hard Water Solution", tech: "Water Softener + Iron Filter", note: "Water with both hardness and iron contamination." },
      { name: "Complete Domestic System", tech: "RO + UV + UF + Alkaline", note: "Comprehensive drinking water purification." },
      { name: "Industrial Modular Systems", tech: "Sand Filters · Activated Carbon · Water Softeners · Iron Removal · RO Plants · UV Sterilization · Chemical Dosing", note: "Custom-built combinations for industrial needs." }
    ]
  }
];
