# Social preview images

Default for all current pages: `assets/site/og-default.png` (1200 × 630).

Use the approved Alpine Dusk panorama template for future blog posts, changing the headline and supporting text to match each post. Retain the exact logo, Enobl Ventures capitalization, photo, colors, and typography.

Generator: `scripts/generate-og.mjs` requires Node.js and `@napi-rs/canvas`. Set `RUNTIME_NODE_MODULES` to a supplied Node package directory if the dependency is not locally installed. Run `node scripts/generate-og.mjs path/to/config.json`.

Configuration example:
```json
{
  "headline": ["Post-specific headline", "Optional second line"],
  "subtitle": ["A concise description of the post"],
  "output": "assets/site/og-post-slug.png"
}
```

Use up to two lines in each group. Preview the PNG before publishing and shorten text or adjust `headlineSize` if necessary. For each blog post, set both `og:image` and `twitter:image` to its absolute image URL, update image alt text, and retain the 1200 × 630 dimensions. Current pages use the shared default.
