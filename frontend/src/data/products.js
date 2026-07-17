/* Single source of truth for the product/system list — shared by the
   Home product grid and the Products page so they always match.

   The catalog is organised into SECTIONS. Each section is a tile on the
   Products page and opens a detail view that lists every product it contains.

   SECTION PHOTOS ARE AUTO-DISCOVERED.
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
    id: "domestic-purifiers",
    title: "Domestic Water Purifiers",
    badge: "For Homes",
    category: "Drinking Water",
    summary: "Safe, healthy and great-tasting drinking water for homes.",
    intro:
      "Designed to provide safe, healthy and great-tasting drinking water for homes. Choose the purification level that matches your water source — from low-TDS municipal supply to high-TDS borewell and tanker water.",
    image: coverFor("domestic-purifiers"),
    gallery: galleryFor("domestic-purifiers"),
    products: [
      {
        name: "UV + UF Water Purifier",
        tagline: "Ideal for municipal water with low TDS.",
        description:
          "Removes bacteria, viruses and suspended particles while retaining the water's natural minerals."
      },
      {
        name: "RO + UV + UF Water Purifier",
        tagline: "Suitable for borewell, tanker and high-TDS water.",
        description:
          "Removes dissolved salts, heavy metals, chemicals, bacteria and viruses for consistently safe drinking water."
      },
      {
        name: "RO + UV + UF + Alkaline Water Purifier",
        tagline: "Advanced purification with mineral restoration and pH balancing.",
        description:
          "Provides clean, healthy and mineral-rich drinking water with balanced pH for everyday wellness."
      }
    ]
  },
  {
    id: "household-filtration",
    title: "Household Filtration Systems",
    badge: "Whole Home",
    category: "Point of Entry",
    summary: "Complete treatment for homes, villas, apartments and whole-building supply.",
    intro:
      "Complete water treatment solutions for homes, villas, apartments and whole-building water supply — protecting every tap, fixture and appliance in the property.",
    image: coverFor("household-filtration"),
    gallery: galleryFor("household-filtration"),
    products: [
      {
        name: "Iron Removal Filter",
        description: "Removes iron, manganese, odor and staining caused by borewell water."
      },
      {
        name: "Activated Carbon Filter",
        description:
          "Removes chlorine, bad taste, odor and organic contaminants while improving water clarity."
      },
      {
        name: "Water Softener",
        description:
          "Reduces hardness by removing calcium and magnesium, preventing scale formation in pipes and appliances."
      },
      {
        name: "Multimedia Filter",
        description:
          "Uses multiple filtration media to remove sediment, suspended solids, turbidity and larger impurities before further treatment."
      },
      {
        name: "Bacteria Dosing System",
        description:
          "Chemical dosing system that disinfects water by eliminating harmful bacteria and microorganisms — suitable for storage tanks and larger water distribution systems."
      },
      {
        name: "Combination Filtration Systems",
        description:
          "Customized multi-stage systems designed according to water quality and customer requirements, combining several technologies in one solution.",
        tech: ["Sediment Filters", "Iron Removal Filters", "Carbon Filters", "Water Softeners", "UV Sterilization", "Chemical Dosing"]
      }
    ]
  },
  {
    id: "alkaline-ionizer",
    title: "Alkaline Hydrogen Ionizer Systems",
    badge: "Wellness",
    category: "Premium Drinking",
    summary: "Premium ionized water designed to improve hydration and enhance quality.",
    intro:
      "Premium drinking water systems designed to improve hydration and enhance water quality. Ideal for customers seeking wellness-focused drinking water solutions.",
    image: coverFor("alkaline-ionizer"),
    gallery: galleryFor("alkaline-ionizer"),
    features: [
      "Produces alkaline water",
      "Helps restore essential minerals",
      "Improves taste",
      "Supports better hydration",
      "Can be integrated with existing RO purification systems"
    ],
    idealFor: "Customers seeking wellness-focused drinking water solutions.",
    products: [
      {
        name: "Alkaline Hydrogen Ionizer System",
        tagline: "Wellness-focused, mineral-rich, better-tasting water.",
        description:
          "Enhances everyday drinking water — producing alkaline, ionized water that supports better hydration and restores essential minerals. Can be added to your existing RO purifier."
      }
    ]
  },
  {
    id: "industrial-treatment",
    title: "Industrial Water Treatment Solutions",
    badge: "Commercial & Industrial",
    category: "Custom / Industrial",
    summary: "High-capacity treatment systems for commercial and industrial applications.",
    intro:
      "High-capacity water treatment systems designed for commercial and industrial applications — engineered to your water chemistry, daily capacity and industry-specific requirements.",
    image: coverFor("industrial-treatment"),
    gallery: galleryFor("industrial-treatment"),
    products: [
      {
        name: "Industrial RO Plants",
        description: "High-output reverse osmosis systems for manufacturing and process water."
      },
      {
        name: "Media Filtration Plants",
        description: "Large-scale sand, multimedia and activated carbon filtration systems."
      },
      {
        name: "Water Softening Plants",
        description: "Industrial softeners that protect boilers, cooling towers and machinery."
      },
      {
        name: "Iron & Manganese Removal Plants",
        description: "Specialized treatment plants for groundwater and borewell sources."
      },
      {
        name: "UV Disinfection Systems",
        description: "Chemical-free sterilization for industrial and commercial water treatment."
      },
      {
        name: "Chemical Dosing Systems",
        description: "Automated dosing systems for disinfection, pH correction and process water treatment."
      },
      {
        name: "Zero Liquid Discharge (ZLD) Systems",
        description: "Advanced wastewater recovery and recycling systems for sustainable industrial operations."
      },
      {
        name: "Custom Water Treatment Plants",
        description:
          "Tailor-made solutions engineered according to water chemistry, daily capacity and industry-specific requirements."
      }
    ]
  }
];
