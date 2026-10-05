# Edgar Monroy — Jekyll portfolio theme

A single-page Jekyll theme for a 3D character artist / stylized portfolio,
inspired by the layout of blockout.red: a hero, a horizontal credits strip,
and a masonry work grid. It ships with placeholder text and placeholder
grey "blockout" tiles instead of real images so you can drop your own
content in.

## Run it locally

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000

## Dark blue pivot + moving background

The palette moved from the original oxide-red/charcoal to dark
navy/blue — same CSS variables in `assets/css/style.css`
(`--bg`, `--accent`, etc.), just new values, so nothing else needed
to change.

There's also a full-page animated background now: a slow drifting
particle/constellation canvas (`assets/js/background.js`), layered
behind all content via `#bg-canvas` in `_layouts/default.html`. A
few things worth knowing:

- **Color**: edit `DOT_COLOR` and `LINE_COLOR` at the top of
  `background.js` to match if you tweak the palette further.
- **Density/speed**: `LINK_DIST` (how close two dots need to be to
  draw a line) and `SPEED` (drift speed) are the two easiest knobs.
  Particle count scales with screen size automatically, capped at
  90 for performance.
- **Respects accessibility settings**: if the visitor's OS has
  "reduce motion" turned on, it renders one still frame instead of
  animating — no extra setup needed.
- **Pauses off-screen**: the animation stops when the browser tab
  isn't visible, so it's not burning CPU in a background tab.

## What's new in this version

Added a full nav menu, a filterable project grid, an experience
timeline, a skills section and a closing CTA — modeled after the
section structure of joandgg.github.io, kept in the same dark/red
visual system as the rest of the theme.

**New files:**
`_data/projects.yml`, `_data/experience.yml`, `_data/skills.yml`,
`_includes/projects-featured.html`, `_includes/projects-all.html`,
`_includes/experience.html`, `_includes/skills.html`,
`_includes/cta.html`, `assets/js/filter.js`

**Changed files:**
`_includes/nav.html` (added the section menu), `_includes/hero.html`
(added `id="about"`), `_includes/portfolio.html` (heading renamed to
"Gallery" so it doesn't repeat "Selected work"), `index.html` (now
includes every section), `_layouts/default.html` (loads
`filter.js`), `assets/css/style.css` (styles appended at the bottom
of the file).

If you've already customized your live repo, don't re-upload this
whole folder over it — that'd overwrite your edits (your real email,
socials, hero image, etc.). Instead, add the new files above as-is,
and for the changed files, re-apply just the pieces noted above
(or open both versions side by side and copy the relevant lines
across).

## Edit the content

- **Name, tagline, email, social links, CTA text** → `_config.yml`
- **Credits strip (poster cards)** → `_data/credits.yml`
- **Gallery grid (masonry tiles)** → `_data/gallery.yml`
- **Featured + All Projects cards** → `_data/projects.yml` (`featured: true` entries also appear in the featured row; `stack` values drive the filter buttons)
- **Experience timeline** → `_data/experience.yml`
- **Skills chips** → `_data/skills.yml`
- **Hero copy** → `_includes/hero.html`
- **Section headings/intros** → `_includes/credits.html` and `_includes/portfolio.html`

Restart `jekyll serve` after editing `_config.yml` (data and include files
hot-reload automatically).

## Add real images

Every entry in `_data/credits.yml` and `_data/gallery.yml` has an `image`
field. Drop your files under `assets/img/credits/` or `assets/img/work/`
and set `image: "/assets/img/work/your-file.jpg"` — the placeholder block
disappears automatically once `image` is non-empty.

Poster cards (`credits.yml`) work best with a 2:3 portrait image.
Work tiles (`gallery.yml`) work with any aspect ratio; use the `height`
field to control how tall a tile is in the masonry grid.

## Colors & type

Everything is driven by CSS variables at the top of
`assets/css/style.css` (`--bg`, `--accent`, etc.) and two Google Fonts
loaded in `_layouts/default.html` (Big Shoulders Display for headings,
IBM Plex Sans/Mono for body and labels). Swap either without touching
the HTML.

## Deploy

This is a standard Jekyll site, so it works as-is on GitHub Pages:
push it to a repo, enable Pages in the repo settings (source: the
default branch), and set `url`/`baseurl` in `_config.yml` to match.
