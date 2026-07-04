# Closca Hostel Koh Tao — Website

A production-ready, single-page website for Closca Hostel Koh Tao. Built with plain HTML5, CSS3 and vanilla JavaScript — no frameworks, no build step, no dependencies.

## Project structure

```
/
├── index.html          All page content and structure
├── css/
│   └── styles.css      Full design system and styles
├── js/
│   └── script.js       Nav, scroll reveal, galleries, accordion
├── images/
│   ├── main/            Hero, exterior, common areas
│   ├── Standard/        Standard Private Room photos (double bed)
│   ├── StandardTwin/    Standard Twin Room photos (twin beds)
│   ├── Deluxe/          Deluxe Private Room photos
│   ├── 4peopleDorm/     4-Bed Dorm photos
│   └── 8peopleDorm/     8-Bed Dorm photos
├── robots.txt
├── sitemap.xml
└── README.md
```

All images are currently SVG **placeholders** — colored gradient tiles labeled with what they represent (e.g. "Hero — Rooftop at Sunset"). The site is fully functional and styled with them in place, so you can preview real layout and spacing before swapping in real photography.

---

## 1. Deploying the website

This is a fully static site — any static host works. No build step is required.

**Netlify / Cloudflare Pages / Render (static site)**
1. Push this folder to a Git repository (GitHub/GitLab/Bitbucket).
2. Create a new static site on the host and point it at the repo.
3. Build command: *(leave blank)*. Publish directory: `/` (repo root).
4. Deploy.

**GitHub Pages**
1. Push this folder to a repository.
2. Repo Settings → Pages → Deploy from branch → select `main` and `/ (root)`.
3. Your site will be live at `https://<username>.github.io/<repo>/`.

**Manual / any host**
Just upload every file, keeping the folder structure intact, to your web root.

---

## 2. Changing text

All visible copy lives directly in `index.html`, organized in clearly commented sections:

```html
<!-- ===================== HERO ===================== -->
<!-- ===================== ABOUT ===================== -->
<!-- ===================== ROOMS ===================== -->
<!-- ===================== FACILITIES ===================== -->
<!-- ===================== WHY STAY ===================== -->
<!-- ===================== EXPLORE KOH TAO ===================== -->
<!-- ===================== REVIEWS ===================== -->
<!-- ===================== FAQ ===================== -->
<!-- ===================== CONTACT ===================== -->
```

Open `index.html`, find the section comment, and edit the text inside. Headings are inside `<h1>`–`<h3>` tags, paragraphs inside `<p>`.

---

## 3. Replacing images

Each `<img>` currently points to a placeholder SVG, e.g.:

```html
<img src="images/Standard/standard-1.svg" alt="Standard Private Room at Closca Hostel">
```

To replace a placeholder:

1. Add your real photo into the matching folder (`images/main/`, `images/Standard/`, `images/StandardTwin/`, `images/Deluxe/`, `images/4peopleDorm/`, or `images/8peopleDorm/`).
2. Update the `src` attribute in `index.html` to point to your new filename (e.g. `images/Standard/standard-1.jpg`).
3. Update the matching thumbnail `data-src` attribute for room galleries — each room's thumbnails are `<button data-src="...">` elements right below the main image.
4. Write a specific, descriptive `alt` attribute for accessibility and SEO (avoid generic text like "image1").

**Recommended photo sizes** (for sharpest results without bloating page weight):
- Hero images (`main/hero-*`): 1920×1200px, JPG, optimized to under 300KB.
- Room & common-area photos: 1200×900px, JPG, optimized to under 200KB each.
- Use `.jpg` for photos and `.webp` if your host supports it for better compression — just make sure the file extension in `src` matches the actual file.

**Where each placeholder is meant to go:**

| Folder | File | Intended content |
|---|---|---|
| main | hero-1.svg | Full-bleed hero background (rooftop/sunset) |
| main | hero-2.svg | Alternate hero option |
| main | exterior.svg | Hostel exterior |
| main | reception.svg | Reception / lobby |
| main | common-lounge.svg | Shared lounge (used in About section) |
| main | rooftop-terrace.svg | Rooftop terrace |
| main | shared-bathroom.svg | Shared bathroom |
| main | breakfast-area.svg | Breakfast area |
| Standard | standard-1..4.svg | Standard Private Room gallery (double bed, 3 of the 4 Standard rooms) |
| StandardTwin | twin-1..4.svg | Standard Twin Room gallery (twin beds, 1 of the 4 Standard rooms) |
| Deluxe | deluxe-1..4.svg | Deluxe Private Room gallery (only 2 rooms of this type) |
| 4peopleDorm | dorm4-1..4.svg | 4-Bed Dorm gallery |
| 8peopleDorm | dorm8-1..4.svg | 8-Bed Dorm gallery |

Tip: if you keep the exact same filenames (just change the extension, e.g. `standard-1.jpg` instead of `standard-1.svg`), you only need to update the file extension in each `src`/`data-src` attribute — a quick find-and-replace in `index.html`.

---

## 4. Updating links

Two external links are used throughout the site — update them by search-and-replace in `index.html` if they ever change:

- **Booking.com link:** `https://www.booking.com/hotel/th/closca-hostel-koh-tao.en-gb.html`
- **WhatsApp link:** `https://wa.me/66956498009`

Both links use `target="_blank" rel="noopener noreferrer"` so they open safely in a new tab.

The Google Maps embed in the Contact section uses a text-based query (`Chalok Baan Kao Bay, Koh Tao, Thailand`) so it works without an API key. For pinpoint accuracy, replace the `src` of the `<iframe>` with an embed URL generated from Google Maps' own "Share → Embed a map" tool for your exact coordinates.

---

## 5. SEO checklist (already implemented)

- Unique, descriptive `<title>` and meta description
- Open Graph + Twitter Card tags for rich social previews
- `Hostel` JSON-LD structured data (`schema.org`) with address, geo-coordinates and amenities
- Semantic HTML5 landmarks (`header`, `main`, `section`, `footer`, `nav`)
- Logical heading hierarchy (single `h1` in the hero, `h2` per section, `h3` per card)
- Descriptive `alt` text on every image
- `robots.txt` and `sitemap.xml` included

**Before going live**, update the placeholder domain `https://www.closcahostel.com/` in:
- `index.html` (`canonical`, Open Graph/Twitter `og:url`/`og:image`, JSON-LD `url`/`image`)
- `robots.txt` (`Sitemap:` line)
- `sitemap.xml` (every `<loc>`)

to your real production domain.

---

## 6. Performance & accessibility notes

- Fonts are loaded from Google Fonts with `preconnect` + `display=swap` to avoid blocking render.
- The hero image is `preload`ed and marked `fetchpriority="high"` to improve LCP; all other images use `loading="lazy"`.
- Animations respect `prefers-reduced-motion`.
- All interactive elements (nav, accordion, gallery thumbnails, buttons) are keyboard-operable and expose correct ARIA states (`aria-expanded`, `aria-selected`, `aria-controls`).
- Color contrast has been checked against the sand/ocean/teal palette for WCAG AA compliance.

---

## 7. Future maintenance

- **Adding a new FAQ item:** duplicate an `.accordion-item` block in the FAQ section, giving the button/panel a new unique `id` pair (e.g. `faq-9-btn` / `faq-9`).
- **Adding a review:** duplicate a `.review-card` `<figure>` block inside `#reviews .review-grid`.
- **Adding a facility icon:** duplicate an `<li>` inside `.facility-grid`, swap the inline SVG path and label.
- All styling is controlled by CSS custom properties at the top of `css/styles.css` (`:root { ... }`) — change colors, spacing, or radii globally from one place.
- No build tools, package managers, or compilation steps are involved — edit the files and refresh the browser.
