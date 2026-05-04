# BWB Archive — Every film, show & game cooked on Binging with Babish

[![Deploy](https://github.com/jklewa/data-with-babish-showcase/actions/workflows/deploy.yml/badge.svg)](https://github.com/jklewa/data-with-babish-showcase/actions/workflows/deploy.yml)

[![BWB Archive preview](docs/preview.png)](https://jklewa.github.io/data-with-babish-showcase/)

An interactive, searchable gallery of every movie, TV show, video game, and other media that has inspired an episode of [Binging with Babish](https://www.bingingwithbabish.com). Browse by medium, search by title or dish, and click any tile to see every episode tied to that reference.

🔗 **Live site:** https://jklewa.github.io/data-with-babish-showcase/
📊 **Data source:** [`jklewa/data-with-babish`](https://github.com/jklewa/data-with-babish) — a scraped, normalized dataset of the show's references and recipes.

> Not affiliated with Andrew Rea or the Babish Culinary Universe. This is a fan-built showcase of a public dataset.

## Features

- **130+ references and 200+ dishes** spanning films, TV, games, comedy specials, and YouTube channels
- **Filter by medium** with live counts (Movie / TV Show / Video Game / Comedy / YouTube / Other)
- **Fuzzy search** across reference names *and* episode titles — find a dish without remembering the source
- **Per-reference detail pages** with full episode lists, embedded YouTube links, and outbound links to IMDb / Steam / official sites
- **Statically exported** — no server, no database, deploys anywhere (GitHub Pages by default)
- **Dark, editorial design** with serif display type, monospace accents, and a responsive grid

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) with `output: "export"` for fully static builds
- [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- TypeScript, ESLint 9
- Geist & Geist Mono via `next/font`

The dataset ships as a single JSON file (`data/references.json`); all pages and dynamic routes are pre-rendered at build time via `generateStaticParams`.

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Produce a static export in `out/` |
| `npm run start` | Serve a previously built production app |
| `npm run lint` | Run ESLint |

## Deployment

The site is configured for GitHub Pages out of the box:

- `output: "export"` writes a static site to `out/`
- `basePath` and `assetPrefix` are scoped to `/data-with-babish-showcase` in production
- `trailingSlash: true` keeps URLs Pages-friendly
- `images.unoptimized: true` skips the Next image optimizer (required for static export)

To deploy to a different host or path, edit `next.config.ts` (the `repo` constant controls the base path) and publish the contents of `out/`.

## Project layout

```
app/
  layout.tsx              # Root layout, fonts, metadata
  page.tsx                # Home — header + Gallery
  reference/[id]/page.tsx # Per-reference detail page (statically generated)
components/
  Gallery.tsx             # Filter + search + grid (client component)
  ReferenceCard.tsx       # Tile rendering
data/
  references.json         # The dataset
lib/
  references.ts           # Types, loader, slugify, helpers
```

## Updating the data

`data/references.json` is sourced from [`jklewa/data-with-babish`](https://github.com/jklewa/data-with-babish). To refresh:

1. Pull the latest export from the upstream dataset
2. Replace `data/references.json`
3. Rebuild — `lib/references.ts` handles slugging, sorting, and date ordering

The loader sorts references by episode count (most-inspired first), then alphabetically; episodes within a reference are sorted newest-first.

## Contributing

Issues and PRs are welcome — especially for:

- Broken images or dead external links (the dataset has a long tail)
- Missing references (open an issue against the upstream [data-with-babish](https://github.com/jklewa/data-with-babish) repo first)
- Accessibility, performance, and design polish

## Acknowledgments

- **Andrew Rea** and the entire Babish Culinary Universe team for years of incredible food content
- **bingingwithbabish.com** and YouTube for the public episode metadata that powers the dataset
- Built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com)
