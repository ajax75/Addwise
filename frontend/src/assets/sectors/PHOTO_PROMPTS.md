# Sector Photo Prompts — "Sectors We Serve"

Image-generation prompts for the six sector cards on the home page.

## How to use
1. Generate one image per sector using the prompts below.
2. Save each as **`1.jpg`** inside its matching folder:
   `frontend/src/assets/sectors/<folder>/1.jpg`
   (Any filename/format works — jpg/png/webp — and multiple images per folder are
   auto-discovered; the first one alphabetically is used as the card photo.)
3. The card overwrites the seeded placeholder automatically on the next build.

| Card | Folder | Save as |
|------|--------|---------|
| Residential · Villas and Homes | `villas/` | `1.jpg` |
| Residential · Apartments | `apartments/` | `1.jpg` |
| Hospitality · Premium Hotels | `premium-hotels/` | `1.jpg` |
| Healthcare · Hospitals | `hospitals/` | `1.jpg` |
| Manufacturing · Industrial Plants | `industrial-plants/` | `1.jpg` |
| Commercial · Corporate Headquarters | `corporate-headquarters/` | `1.jpg` |

## Shared style (append to every prompt for a cohesive set)
> Photorealistic, premium editorial photography. Clean, bright, modern.
> Soft natural daylight, subtle cool-blue tone accents (#3BA7FF) reflecting a
> water-purity theme. Shallow depth of field, calm and aspirational mood.
> **Landscape 3:2 aspect ratio**, high resolution. **No text, no logos, no
> watermarks, no people looking at camera.** Consistent lighting and color grade
> across all six images so they read as one set.

---

## 1. Residential · Villas → `villas/1.jpg`
> Exterior of a modern villa at golden hour — clean architectural lines,
> floor-to-ceiling glass, a pool with crystal-clear blue water in the foreground,
> manicured landscaping, warm interior glow. Upscale, serene, water-forward.
> [+ shared style]

## 2. Residential · Apartments → `apartments/1.jpg`
> A sleek residential apartment tower with glass balconies, shot from a low angle
> against a soft blue sky. Contemporary, minimalist, modern urban living.
> Optional: a bright modern kitchen with a glass of clean water on the counter.
> [+ shared style]

## 3. Hospitality · Premium Hotels → `premium-hotels/1.jpg`
> A five-star hotel lobby or poolside terrace — polished marble floors, elegant
> lighting, a tranquil reflecting pool or spa with pristine blue water. Refined,
> welcoming, luxurious hospitality atmosphere. [+ shared style]

## 4. Healthcare · Hospitals → `hospitals/1.jpg`
> A spotless modern hospital corridor or ward entrance — sterile white and
> stainless-steel surfaces, clean blue medical accents, bright even lighting.
> Precise, hygienic, high-trust clinical environment. [+ shared style]

## 5. Manufacturing · Industrial Plants → `industrial-plants/1.jpg`
> A large industrial water-treatment / processing plant interior — stainless-steel
> tanks, pipework and RO membrane racks, clean and well-lit facility floor. Blue
> equipment accents, engineered and high-capacity feel. [+ shared style]

## 6. Commercial · Corporate Headquarters → `corporate-headquarters/1.jpg`
> A sleek corporate office building exterior — a glass-and-steel headquarters
> tower with blue-sky reflections, or a bright modern office atrium with a
> water feature. Professional, polished, corporate. [+ shared style]
