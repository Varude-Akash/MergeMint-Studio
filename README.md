# MergeMint Studio

Two-PDF merger web app with page-level selection, merge-order control, and client-side processing.

## Local Development

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

Use `.env`:

```bash
VITE_SITE_URL=https://your-domain.com
VITE_GA_ID=
VITE_PLAUSIBLE_DOMAIN=
```

- `VITE_SITE_URL`: canonical site URL used in SEO metadata and generated `sitemap.xml`/`robots.txt`.
- `VITE_GA_ID`: optional Google Analytics 4 measurement ID.
- `VITE_PLAUSIBLE_DOMAIN`: optional Plausible domain.

## Production Build

```bash
npm run build
```

Build output: `dist/`

`npm run build` automatically generates:
- `public/sitemap.xml`
- `public/robots.txt`

## Deploy On Vercel

1. Push this repository to GitHub.
2. In Vercel, click **New Project** and import your repo.
3. Add environment variables in Vercel project settings:
   - `VITE_SITE_URL`
   - `VITE_GA_ID` (optional)
   - `VITE_PLAUSIBLE_DOMAIN` (optional)
4. Deploy.

Vercel uses:
- build command: `npm run build`
- output directory: `dist`

## SEO + Traffic Setup Checklist

1. Connect your custom domain in Vercel.
2. Verify HTTPS is active.
3. Submit `https://your-domain.com/sitemap.xml` to Google Search Console.
4. Add your site to Bing Webmaster Tools.
5. Share launch posts (Product Hunt, Reddit, LinkedIn/X) with demo GIF.
6. Track conversion funnel events:
   - `pdf_upload`
   - `merge_attempt`
   - `merge_success`
   - `workspace_reset`

## Built-in Analytics Hooks

Events are already instrumented in `src/pdfMerger.js` and routed through `src/analytics.js`:
- Supports GA4 (`gtag`) and Plausible.
- Falls back to `window.dataLayer` event pushes.

