# G'Lash × Braidhaus

Website for G'Lash (lash studio) and Braidhaus (braids), American House, East Legon, Accra.

Static site with no build step: `index.html`, photos in `img/` (WebP, cropped from the studios' Instagram posts), icons, `site.webmanifest` and `og.jpg` for social previews. Deployed on Vercel; `vercel.json` sets caching and security headers.

## Brand flyers

`brand/flyers/` has the promo flyers in feed size (1080×1350) and story size (1080×1920), both rendered at 2×, plus `glash-flyers-print.pdf` for printing. Regenerate them with `node brand/flyers/make.cjs` (needs Playwright with Chromium). The folder is excluded from the Vercel deploy by `.vercelignore`.
