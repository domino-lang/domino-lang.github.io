# Domino website

Monorepo for the Domino website and the guide. Both build into a single
`dist/` directory served from one origin (`domino-prover.org`).

## Layout

```
.
├── site/            Hugo sources  (landing page)
│   ├── hugo.toml    → publishDir = ../dist
│   ├── content/     page front matter (feature cards live in _index.md)
│   ├── layouts/     baseof + partials (header/footer) + index.navjson.json
│   └── static/      styles.css
├── book/            mdBook sources (the guide)
│   ├── book.toml    → build-dir = ../dist/book, site-url = /book/
│   ├── src/         chapters + SUMMARY.md
│   └── theme/       head.hbs, domino.css (overlay), domino.js (chrome injector)
├── dist/            build output — DEPLOY THIS  (git-ignored)
│   ├── …            Hugo output at the root
│   ├── nav.json     nav entries published from Hugo's menu
│   └── book/        mdBook output, served at /book/
└── Makefile
```

## Prerequisites

- [Hugo](https://gohugo.io/) (extended)
- [mdBook](https://rust-lang.github.io/mdBook/) 0.5+ — `cargo install mdbook`

## Build

```zsh
make build     # clean, build site + guide into ./dist
```

`make build` runs Hugo first, then mdBook, so the book output at `dist/book/`
is never clobbered. Deploy the whole `dist/` directory.

## Develop

The two tools live-reload separately:

```zsh
make serve-site   # http://localhost:1313  (marketing site)
make serve-book   # http://localhost:3000  (guide)
```

Note: in isolated dev the guide can't reach `/nav.json` (that's published by
Hugo into `dist/`), so it falls back to the `FALLBACK` nav baked into
`book/theme/domino.js`. The live `nav.json` wiring is exercised in the combined
`dist/` build. Keep `FALLBACK` roughly in step with Hugo's `[[menus.main]]`.

## The single source of truth for nav

Nav entries are defined **only** in `site/hugo.toml` under `[[menus.main]]`.
Hugo publishes them to `dist/nav.json`; the guide fetches that at runtime (same
origin) and renders the same wordmark, links, and footer. To add or rename a nav
item, edit `hugo.toml` and rebuild — the guide picks it up automatically.
