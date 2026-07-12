# Preset page design log

## 2026-07-12 — Iteration 1

### Baseline

- Desktop: 70/100 at 1440 × 900.
- Mobile: 50/100 at 390 × 844.
- Final score: 50/100 (the lower viewport score).

### Changes

- Reworked the four-paragraph introduction into a compact, useful hero with a concise value proposition, collection stats, and expandable compatibility and import guidance. The supporting SEO content remains on the page without delaying the artist directory.
- Shortened the page heading and added responsive type and spacing so it scans cleanly on narrow screens.
- Added a clear artist-directory heading and strengthened artist-card hierarchy with genre labels, preset counts, full-card links, borders, hover movement, and visible keyboard focus treatment.
- Left the shared `Header` unchanged because it contains unrelated user work.

### Verification

- Desktop screenshot: `/tmp/nxrig-preset-desktop-i1.png`.
- Mobile screenshot: `/tmp/nxrig-preset-mobile-i1.png`.
- Desktop: 86/100. The artist directory now begins well within the first
  viewport, with a stronger card rhythm and a clear reading path.
- Mobile: 80/100. The first artist card is visible in the initial viewport and
  the shorter heading wraps cleanly; the shared mobile header remains crowded
  and was intentionally left out of scope.
- Final score: 80/100 (the lower viewport score).
- No commit created because the page is part of a dirty worktree with unrelated user changes.

## 2026-07-12 — Iteration 2

### Baseline

- Desktop: 86/100 at 1440 × 900.
- Mobile: 80/100 at 390 × 844.
- Final score: 80/100 (the lower viewport score).

### Changes

- Replaced the crowded mobile header with a deliberate two-row layout: brand, favorites, and request actions on top; Presets, Blog, and Editor in a balanced primary-navigation row below.
- Removed the mobile tagline so the shared header is quieter and the page content starts sooner.
- Added 44px minimum tap targets, visible keyboard-focus rings, an accessible favorites label, and `aria-current` for active primary destinations.
- Preserved the desktop header layout and retained every existing destination without adding a menu interaction.

### Verification

- Desktop screenshot: `/tmp/nxrig-preset-desktop-i2.png`.
- Mobile screenshot: `/tmp/nxrig-preset-mobile-i2.png`.
- Desktop: 86/100. The desktop header and established page hierarchy remain visually unchanged.
- Mobile: 90/100. Brand and utility actions now have clear separation from the primary navigation, with comfortable spacing and a strong active state at 390px.
- Final score: 86/100 (the lower viewport score).
- Browser measurements confirmed a 390px document width in a 390px viewport, 44px minimum visible-header link heights, and a visible keyboard-focus ring.
- No commit created because `Header.tsx` contains overlapping user changes in the dirty worktree.

## 2026-07-12 — Iteration 3

### Baseline

- Desktop: 86/100 at 1440 × 900.
- Mobile: 90/100 at 390 × 844.
- Final score: 86/100 (the lower viewport score).

### Changes

- Rebalanced the desktop hero into a compact two-column composition: the value proposition occupies the left side, while collection stats and import guidance form a purposeful utility panel on the right.
- Added a restrained blue divider and subtle depth to the stat cards, strengthening the existing brand accent without adding decorative content.
- Kept the mobile hero stacked and unchanged below the large breakpoint, and left both the artist grid and shared header intact.

### Verification

- Desktop screenshot: `/tmp/nxrig-preset-desktop-i3.png`.
- Mobile screenshot: `/tmp/nxrig-preset-mobile-i3.png`.
- Desktop: 94/100. The hero now uses its full width intentionally, is substantially denser, and exposes another artist-card row in the initial viewport.
- Mobile: 90/100. The established stacked hierarchy, readable line lengths, and tap-friendly controls are preserved.
- Final score: 90/100 (the lower viewport score).
- No commit created because the page is part of a dirty worktree with overlapping user changes.
