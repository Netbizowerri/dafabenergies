# Dafab Energies Redesign

React 19 single-page application for Dafab Energies, built with Vite, BrowserRouter, Tailwind CSS, Framer Motion, and Formspree-backed forms.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` values into a local `.env` file and set the real Formspree endpoints:

```bash
VITE_SITE_URL=https://dafabenergies.com
VITE_FORMSPREE_CONTACT_ENDPOINT=https://formspree.io/f/your-contact-form-id
VITE_FORMSPREE_BOOKING_ENDPOINT=https://formspree.io/f/your-booking-form-id
VITE_FORMSPREE_ORDER_ENDPOINT=https://formspree.io/f/your-order-form-id
```

3. Start the dev server:

```bash
npm run dev
```

## Production build

```bash
npm run build
```

The build outputs:

- `dist/_redirects` for Netlify SPA routing
- `dist/.htaccess` for Apache/LiteSpeed on cPanel
- `dist/_headers` for Netlify security headers and CSP

## Notes

- The app uses BrowserRouter clean URLs, not hash routing.
- All public forms submit through Formspree.
- Client-side validation and a honeypot field are included for the public form flows.
- Update `public/robots.txt`, `public/sitemap.xml`, and `VITE_SITE_URL` if the production domain differs from `https://dafabenergies.com`.
