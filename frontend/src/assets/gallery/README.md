# Gallery covers

Cover photos for Instagram entries in `src/data/gallery.js`.

Drop an image here (`.jpg`, `.png`, `.webp`) and reference it by filename without the
extension in the item's `cover` field:

```
{ url: "https://www.instagram.com/reel/ABC123/", title: "Softener install", cover: "softener-install" }
```

→ picks up `softener-install.webp` (or `.jpg` / `.png`) from this folder.

Landscape crops (16:9) look best — tiles are cropped to that ratio.
YouTube entries need nothing here; their thumbnails are pulled from YouTube.
