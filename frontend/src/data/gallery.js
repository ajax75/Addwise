/* Video gallery — paste any YouTube or Instagram link into `url` and it just works.

   Supported links:
     https://www.youtube.com/watch?v=XXXXXXXXXXX
     https://youtu.be/XXXXXXXXXXX
     https://www.youtube.com/shorts/XXXXXXXXXXX
     https://www.instagram.com/reel/XXXXXXXXXXX/
     https://www.instagram.com/p/XXXXXXXXXXX/

   Thumbnails:
     YouTube  — fetched automatically, nothing to do.
     Instagram — Meta does not expose post thumbnails without an API token, so drop
                 a cover image into src/assets/gallery/ and name it in `cover`
                 (filename without the extension, e.g. "softener-install").
                 Without a cover the tile falls back to a branded gradient card.

   Orientation is taken from the link (/shorts/ and Instagram reels are portrait);
   add `portrait: true` to force it on a plain watch link.

   This feeds the /gallery page (src/pages/Gallery.jsx); an empty list just shows a
   "videos are on the way" note there. */
export const GALLERY = [
  {
    url: "https://www.youtube.com/shorts/jlBkoMUOkfs",
    title: "Now in Thalassery",
    caption: "Welcome to Crystal Blue"
  },
  {
    url: "https://www.youtube.com/shorts/HfDEhlgvyH0",
    title: "Is this the water you use?",
    caption: "Water quality check"
  },
  {
    url: "https://www.youtube.com/shorts/YTEoLqkmljM",
    title: "Bathroom losing its colour?",
    caption: "Iron & hardness removal"
  },
  {
    url: "https://www.youtube.com/shorts/Q1UW5OXXZ-E",
    title: "Cloudy well water?",
    caption: "Whole-house filtration"
  }
  // { url: "https://www.instagram.com/reel/XXXXXXXXXXX/", title: "Softener install", caption: "Villa project", cover: "softener-install" }
];

/* The YouTube channel behind the gallery — used for the "View channel" link. */
export const YOUTUBE_CHANNEL = "https://www.youtube.com/@CrystalBluewatersolution";

/* Cover photos are auto-discovered from src/assets/gallery/ and keyed by filename. */
const coverCtx = require.context("../assets/gallery", false, /\.(png|jpe?g|webp|avif|gif)$/i);
const covers = {};
coverCtx.keys().forEach((key) => {
  const name = key.replace(/^\.\//, "").replace(/\.[^.]+$/, "");
  covers[name] = coverCtx(key);
});

export const coverImage = (name) => (name && covers[name]) || null;

/* Turn a pasted URL into { platform, id, embedUrl, thumbnail, watchUrl }. */
export function parseVideo(url = "") {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/i);
  if (yt) {
    const id = yt[1];
    const portrait = /\/shorts\//i.test(url);
    return {
      platform: "youtube",
      id,
      portrait,
      // nocookie host keeps tracking off until the visitor actually plays something
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`,
      // Shorts have a true-portrait still at oardefault; hqdefault is a 16:9 crop of it.
      thumbnail: `https://i.ytimg.com/vi/${id}/${portrait ? "oardefault" : "hqdefault"}.jpg`,
      fallbackThumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      watchUrl: portrait ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`
    };
  }

  const ig = url.match(/instagram\.com\/(?:reel|reels|p|tv)\/([\w-]+)/i);
  if (ig) {
    const id = ig[1];
    const kind = /\/reels?\//i.test(url) ? "reel" : "p";
    return {
      platform: "instagram",
      id,
      portrait: true,
      embedUrl: `https://www.instagram.com/${kind}/${id}/embed/`,
      thumbnail: null,
      watchUrl: `https://www.instagram.com/${kind}/${id}/`
    };
  }

  return null;
}
