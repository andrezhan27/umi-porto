# UMI · Cedofeita, Porto

Responsive restaurant landing page built with Next.js 16 App Router, TypeScript, and Tailwind CSS 4.

## Local development

Use Node.js 22 and npm.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). To check and preview the production export:

```sh
npm run typecheck
npm run build
python3 -m http.server 4173 --bind 127.0.0.1 --directory out
```

Open [localhost:4173](http://localhost:4173) to preview the static files from `out/`.

## Deploy to Vercel

1. Push `main` to your GitHub repository. GitHub Actions runs a clean install and production build on pushes and pull requests.
2. In Vercel, select **Add New → Project** and import the GitHub repository. Use the repository root and `main` as the production branch.
3. Deploy. `vercel.json` selects the static **Other** preset, runs `npm ci` and `npm run build`, and serves `out/`. The Node.js version comes from `package.json`. No environment variables are required.

The draft uses `noindex` in `app/layout.tsx`. It can be viewed by anyone who can access its URL; use Vercel Deployment Protection if the preview needs to be private. Before removing `noindex` for launch, approve the imagery and confirm the menu, booking details, opening hours, and review content.

## Edit the draft

- Update business details, booking and menu destinations, listed prices, and reviews in `app/restaurant.ts`. An empty reviews array hides the review section and its navigation links. Set the rating to null to hide the badge.
- Change the palette and typography in `app/globals.css`. The UMI logo assets live in `public/images/` and the favicon in `app/icon.png`.
- Replace the WebP files in `public/images/` with approved venue and dish photography. Keep the responsive filenames or update the picture sources and alt text.
- Booking currently opens a call-to-enquire dialog. Setting `bookingUrl` switches all booking buttons to the confirmed reservation link.
- Replace the Glovo delivery-menu link with the approved dine-in menu and update the accompanying note. Confirm Wednesday, Thursday, and holiday hours with UMI.

## Sources

- [UMI on Google Maps](https://maps.app.goo.gl/Lt8YWTLfL8oYDWm98) supplies the address, map location, phone, published regular hours, aggregate rating, review excerpts, and the owner-posted Specials & Chapas menu used for the featured prices.
- [UMI on Glovo](https://glovoapp.com/pt/pt/porto/stores/umi-opo) is the linked delivery menu. Its prices can differ from the in-house menu.

## Draft imagery

Built-in ImageGen created the concept photos. The prompts called for three assets.

1. A wide architectural photo inspired by the listing’s warm wood, ribbed amber pendant lights, curved beige chairs, plant alcoves, and rust-red napkins, photographed at dusk with room for the wordmark.
2. Four views of the same concept dining room, covering a wide room view, pendant-light details, a ceramic place setting, and an intimate dining nook.
3. Four editorial dish photos of a sushi selection, grilled dumplings, a crispy temaki cone, and a breaded cutlet chapa.
