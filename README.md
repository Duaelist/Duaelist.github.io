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

## Edit the content

- **Name, tagline, email, social links, CTA text** → `_config.yml`
- **Credits strip (poster cards)** → `_data/credits.yml`
- **Work grid (masonry tiles)** → `_data/gallery.yml`
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
