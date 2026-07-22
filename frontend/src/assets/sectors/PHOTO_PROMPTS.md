# Sector Photo Prompts — "Industries We Serve"

Image-generation prompts for the six industry cards on the home page.

## How to use
1. Generate one image per industry using the prompts below.
2. Save it inside the matching folder:
   `frontend/src/assets/sectors/<folder>/`
   Any filename and format works (jpg / png / **webp** / avif / gif). Multiple
   images per folder are auto-discovered; the **first one alphabetically** is
   used as the card photo.
3. The card picks it up automatically on the next build — no code change needed.

> Folder names must match the card `id` values in
> `frontend/src/pages/Home.jsx` (`solutionsOverview`). Renaming a folder without
> updating that array silently falls back to a grey placeholder.

| # | Card | Folder | Current photo |
|---|------|--------|---------------|
| 1 | Residential · Homes & Villas | `homes-villas/` | `villa.webp` |
| 2 | Hospitality · Hotels & Resorts | `hotels-resorts/` | `hotel.webp` |
| 3 | Institutional · Schools & Offices | `schools-offices/` | `corperate.webp` |
| 4 | Healthcare · Hospitals & Healthcares | `hospitals-healthcare/` | `hospital.webp` |
| 5 | Industrial · Industries & Manufacturing | `industries-manufacturing/` | `industry.webp` |
| 6 | Commercial · Commercial Buildings | `commercial-buildings/` | `Apartment.webp` |

## Shared style (append to every prompt for a cohesive set)
> Photorealistic, premium editorial photography. Clean, bright, modern.
> Soft natural daylight, subtle cool-blue tone accents (#3BA7FF) reflecting a
> water-purity theme. Shallow depth of field, calm and aspirational mood.
> **Landscape 3:2 aspect ratio**, high resolution. **No text, no logos, no
> watermarks, no people looking at camera.** Consistent lighting and color grade
> across all six images so they read as one set.

---

## 1. Residential · Homes & Villas → `homes-villas/`
> Exterior of a modern villa at golden hour — clean architectural lines,
> floor-to-ceiling glass, a pool with crystal-clear blue water in the foreground,
> manicured landscaping, warm interior glow. Upscale, serene, water-forward.
> [+ shared style]

## 2. Hospitality · Hotels & Resorts → `hotels-resorts/`
> A five-star resort poolside terrace or hotel lobby — polished marble, elegant
> lighting, palm shade, a tranquil infinity pool or spa with pristine blue water.
> Refined, welcoming, luxurious holiday atmosphere. [+ shared style]

## 3. Institutional · Schools & Offices → `schools-offices/`
> A bright modern school corridor or open-plan office interior — students or
> staff moving in soft motion blur, a clean drinking-water station or water
> cooler in frame, large windows and daylight. Orderly, healthy, communal.
> [+ shared style]

## 4. Healthcare · Hospitals & Healthcares → `hospitals-healthcare/`
> A spotless modern hospital corridor or ward entrance — sterile white and
> stainless-steel surfaces, clean blue medical accents, bright even lighting.
> Precise, hygienic, high-trust clinical environment. [+ shared style]

## 5. Industrial · Industries & Manufacturing → `industries-manufacturing/`
> A large industrial water-treatment / processing plant interior — stainless-steel
> tanks, pipework and RO membrane racks, clean and well-lit facility floor. Blue
> equipment accents, engineered and high-capacity feel. [+ shared style]

## 6. Commercial · Commercial Buildings → `commercial-buildings/`
> A contemporary mixed-use commercial tower or mall atrium — glass-and-steel
> facade with blue-sky reflections, or a bright indoor atrium with a water
> feature and balconied floors. Professional, polished, high-footfall.
> [+ shared style]
