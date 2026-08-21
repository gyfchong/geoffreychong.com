# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Geoffrey Chong's personal portfolio — a single-page Eleventy static site deployed to Netlify at [geoffreychong.com](https://geoffreychong.com). Package name is `gyfchong-portfolio`; the GitHub repo is `gyfchong/portfolio`.

## Commands

```bash
pnpm start        # eleventy --serve --quiet (dev server with live reload)
pnpm build        # rimraf _site && eleventy
pnpm debug        # one-off build with DEBUG=Eleventy*
pnpm debugstart   # dev server with DEBUG=Eleventy*
```

No lint, format, or test tooling is configured. Node 24+ (`engines`), pnpm 10.33.0, versions pinned via `.mise.toml`.

Netlify runs `pnpm build` and publishes `_site` (`netlify.toml`).

## Architecture

Eleventy 3 with ESM config (`eleventy.config.mjs`). Input is `src/`, output is `_site/`. Templates are Nunjucks.

```
src/
├── index.njk                      # the only page
├── _includes/
│   ├── layouts/base.njk           # full HTML shell, meta, JSON-LD
│   └── footer.njk
├── styles/                        # PostCSS, compiled in place by eleventy-plugin-postcss
└── images/
```

### CSS

`eleventy-plugin-postcss` compiles each file under `src/styles/` to the matching path in `_site/styles/`. There is no bundler and no Sass — the composition happens through `postcss-import` in `src/styles/_index.css`, which pulls in `normalize.css` and `reset.css` from node_modules into `@layer base`, then the local partials in order.

Plugin config lives in `.postcssrc.json`: `postcss-import`, `postcss-nesting`, `cssnano`. Native CSS nesting is available; autoprefixer is installed but **not** listed in the plugin chain.

Note that Eleventy copies every file in `src/styles/` to the output, so `_site/styles/` contains the partials individually as well as `_index.css`. Only `_index.css` is linked from the layout.

### Images

`config/image.mjs` registers an async `{% image %}` shortcode wrapping `@11ty/eleventy-img`. It resolves `src` relative to the template's own file, emits AVIF/WebP/original, and writes to `_site/img/`. Call it as:

```njk
{% image "./images/me.webp", "class-name", "alt text", [400, 800], "sizes attr" %}
```

Generated filenames are content-hashed, so `_site/img/` names change when a source image changes.

## Things that look wired up but aren't

Worth knowing before you go looking for a bug that isn't there:

- **`posts/` and `feed/` are outside the input directory.** Eleventy's input is `src/`, so `posts/hello.md`, `feed/feed.njk`, and `feed/json.njk` are never built. `base.njk` links to `/feed/feed.xml` and `/feed/feed.json`, which currently 404. The RSS plugin is registered but has nothing to render. To turn blogging on, move those directories under `src/`.
- **`eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}")`** points at a `content/` directory that doesn't exist. Images actually live in `src/images/`.
- **`metadata.*` is undefined.** `base.njk` references `metadata.title` and `metadata.description`, but there is no `src/_data/metadata.js`. The `<title>` is hardcoded (`{{ "Geoffrey Chong" or metadata.title }}` always resolves to the literal), and the meta/OG tags render empty. Add `src/_data/metadata.js` to fix.
- `robots.txt` sits at the repo root, not in `src/`, so it isn't published either.

## Conventions

- Double quotes, 2-space indent, semicolons in JS config files.
- Personal details (job title, social links, email) are hardcoded as JSON-LD in `src/_includes/layouts/base.njk`.
- `_site/` is gitignored build output — never edit it, and don't expect it to reflect committed state.
- Renovate is configured (`renovate.json`) for dependency updates.
