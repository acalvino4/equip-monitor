# EquipMonitor

Internal dashboard for monitoring industrial equipment health across sites.
Operators watch active alerts, drill into a specific piece of equipment, and
review alert history.

This repo is an extremely dumbed down sample of our real production app.

## Frontend vs. backend

Everything under `src/` is the frontend — a React/TypeScript app, and the
only code that's actually in scope for review. There is no real backend in
this repo. In production this app talks to separate backend services over
HTTP; here, `mock-server/` plus a small plugin in `vite.config.ts` fake just
enough of those endpoints (`/api/alerts`, `/api/equipment/:id`,
`/api/orders`, etc.) so the app runs standalone with nothing to deploy.
Treat `mock-server/` and the mock-API block in `vite.config.ts` as
throwaway scaffolding, not application code.

## Structure

- `src/types.ts` — shared domain types
- `src/utils/format.ts` — shared formatting helpers
- `src/api/equipmentApi.ts` — data access layer for equipment + alerts
- `src/monitoring/` — dashboard and equipment detail views
- `src/parts/` — replacement-parts ordering
- `mock-server/` — fixture data backing the local backend stand-in
  described above (not application code)
