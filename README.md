# Lavender Glass theme

A drop-in theme: one stylesheet and one small script. No framework, no build step.
Open `index.html` to see every piece.

## Add it to a page

```html
<head>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="lavender-glass.css">
  <script src="lavender-glass.js"></script>   <!-- keep it in <head>, no defer -->
</head>
<body class="lg" data-lg-bg>
```

- `class="lg"` turns the theme on for that element (use a wrapper `<div class="lg">` to theme only part of a page).
- `data-lg-bg` on `<body>` adds the soft colour background with the moving dotted lines.
- Every class is prefixed `lg-`, so it won't clash with the host site's CSS.

## Pieces

| Class | What it is |
|---|---|
| `lg-nav`, `lg-nav-in`, `lg-logo`, `lg-links` | Floating glass nav bar |
| `lg-display`, `lg-title`, `lg-lede`, `lg-tag`, `lg-kicker` | Type styles |
| `lg-btn lg-btn-solid` / `lg-btn-line` / `lg-btn-sm` | Buttons |
| `lg-panel` | Glass box that lifts on hover |
| `lg-grid`, `lg-card`, `lg-card-media`, `lg-card-body` | Card grid |
| `lg-chip`, `lg-chips`, `lg-list`, `lg-stat`, `lg-bar`, `lg-icon` | Small parts |
| `lg-hl` | Text that gets a highlight sweep on hover |
| `lg-line` | Put on any SVG path to give it a moving dotted line |
| `lg-float` | Slow up-and-down float |

## Animation on scroll

| Add this | Result |
|---|---|
| `data-lg-words` on a heading | Words fade in one by one |
| `lg-reveal` on any block | Fades and slides up |
| `lg-stagger` on a parent | Its children appear one after another |
| `data-lg-count="40" data-lg-suffix="+"` | Number counts up |
| `<div class="lg-bar" style="--lg-pct:72"><i></i></div>` | Bar fills to 72% |

If content is added after the page loads (a framework, a fetch), call `LG.refresh()`.
Nothing is hidden when JavaScript is off, and animation stops for visitors who ask their device for reduced motion.

## Colour directions

Set on `<html>` or a wrapper: `data-lg-theme="minimal | editorial | futuristic | creative"`,
or in script: `LG.theme('futuristic')`. To make your own, copy one of the `[data-lg-theme=...]` blocks at the top of the CSS and change the `--lg-*` colours.

## Files

- `lavender-glass.css` the theme
- `lavender-glass.js` the scroll and animation behaviour
- `index.html` preview page
