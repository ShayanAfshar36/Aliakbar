# Voltaro — project notes

Premium e-bike shop site (Vite + React 18 + TypeScript + Tailwind CSS + React Router).
No backend, no database: the catalogue lives in `src/data/bikes.ts` and site copy in
`src/data/site.ts`, so content is edited in one place.

## Running in the Base44 sandbox

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- `web` runs the Vite dev server from the bind-mounted source on `node:22-alpine`,
  serving host port 3000. `node_modules` lives in a named volume and is installed by
  the service command on startup (via `npm ci` when a lockfile exists).
- The first boot is slow (dependency install); the healthcheck `start_period` allows
  for it. Later boots reuse the volume and start in seconds.
- There are **no external services and no secrets** — nothing needs
  `/run/base44/app.env`.

## Sandbox-only configuration

- `vite.config.ts` appends the sandbox host wildcard (`.${BASE44_SANDBOX_HOST_DOMAIN}`)
  to `server.allowedHosts` **only** when `BASE44_PREVIEW_MODE === "1"`. With the flag
  unset the allowlist is `localhost`/`127.0.0.1`, i.e. normal local behaviour.
- `BASE44_PREVIEW_MODE`, `BASE44_SANDBOX_HOST_DOMAIN` and
  `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` are passed into the container from compose.
  Nothing is hardcoded to a resolved host value.
- `CHOKIDAR_USEPOLLING=true` makes HMR reliable over the bind mount.

## Verifying it works

1. `docker compose -f docker-compose.base44.yml ps` — `web` should be healthy.
2. `curl -s http://localhost:3000/ | head` — should return the Vite dev HTML.
3. In the browser: home page renders, nav routes work, `/shop` filters update the URL
   (`?q=`, `?category=`, `?maxPrice=`, `?sort=`, `?saved=1`), a bike detail page opens,
   the cart drawer opens from the header, and "Book Test Ride" scrolls to `#test-ride`.

## Useful commands

```bash
docker compose -f docker-compose.base44.yml logs -f web   # dev server + build errors
docker compose -f docker-compose.base44.yml restart web    # after config/dependency changes
npm run typecheck                                          # tsc --noEmit
npm run build                                              # production build check
```

## Conventions

- Styling: Tailwind utilities with the design tokens in `tailwind.config.js`
  (`ink`, `muted`, `line`, `soft`, `brand`). Section rhythm is `py-16 lg:py-24`.
- Reusable pieces: `components/ui/*` (Button, Container, SectionHeading, Reveal,
  Accordion, Stars), `components/bikes/*` (BikeCard, SpecRow, BikeGallery),
  `components/home/*` (one file per homepage section).
- All homepage sections are composed in `src/pages/HomePage.tsx`; keep new sections in
  their own file.
- Images are remote Unsplash URLs (`auto=format&fit=crop&w=…`) — lazy-loaded below the
  fold, with fixed aspect ratios to avoid layout shift.
