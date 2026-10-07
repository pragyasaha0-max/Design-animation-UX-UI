# Lavender Glass: CV-to-portfolio dashboard + theme

Two things live in this repo.

1. **`index.html`**: a portfolio dashboard that builds itself from a designer's CV.
2. **`lavender-glass.css` + `lavender-glass.js`**: the theme behind it, which can be added to any other page.

## The dashboard (`index.html`)

Open it and you see a sample portfolio. Click **Upload CV** (or drag a PDF anywhere on the page):

1. the PDF text is read in the browser with PDF.js (nothing is uploaded to a server),
2. the CV is split into summary, experience, projects, skills and certifications,
3. the page rebuilds: headline, counters, about text, project cards, skills grid, experience timeline and contact buttons,
4. **Download site** saves one standalone `.html` file with the portfolio baked in, without the upload tools.

Limits: PDF only (text-based, not scans), up to 10 MB. Parsing looks for the usual headings
(Summary, Experience, Projects, Skills, Certifications) and a date range such as `Jan 2022 - Present` for each job.
Years of experience is the sum of those date ranges. PDF.js loads from cdnjs.cloudflare.com, so the page needs internet access.

`index.html` is self-contained (theme CSS and JS are inlined, images are embedded) so the downloaded site works on its own.

## The theme

```html
<link rel="stylesheet" href="lavender-glass.css">
<script src="lavender-glass.js"></script>   <!-- in <head>, no defer -->
<body class="lg" data-lg-bg>
```

Everything is prefixed `lg-`. `theme-preview.html` shows each component.

### Animation

| Add this | Result |
|---|---|
| `class="lg-glow"` on a box | A light runs around its border, and a spotlight follows the cursor on hover |
| `data-lg-relay` on the parent of several `lg-glow` boxes | The lit border moves from one box to the next |
| `data-lg-words` on a heading | Words fade in one by one when scrolled into view |
| `<span class="lg-wipe">` inside that heading | That part wipes in from the left |
| `data-lg-count="40" data-lg-suffix="+"` | Number counts up when scrolled into view |
| `class="lg-ring"` around a counter | Glowing arc circling the number (see `index.html`) |
| `lg-reveal`, `lg-stagger` | Fade up on scroll, and children appear in turn |
| `lg-draw` on a line | Draws itself downward when scrolled into view |
| `lg-btn-solid` | Shimmer sweep, faster on hover |

`LG.refresh()` picks up content added after load. `LG.count(el, 12, '+')` resets a counter and plays it again.
Nothing is hidden when JavaScript is off, and animation stops for visitors who ask for reduced motion.

### Colour directions

`data-lg-theme="minimal | editorial | futuristic | creative"` on `<html>`, or `LG.theme('creative')`.
To make another, copy one `[data-lg-theme=...]` block at the top of the CSS and change the `--lg-*` colours.

### Notes for developers

- `.lg-glow` uses `::before` and `::after`; don't use those on the same element.
- The travelling border uses `@property` (Chrome, Edge, Safari, Firefox 128+). Older browsers show a still border.
- Fonts: Playfair Display and DM Sans from Google Fonts, with Georgia and system-ui as fallbacks.
