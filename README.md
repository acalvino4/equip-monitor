# EquipMonitor

Internal dashboard for monitoring industrial equipment health across sites.
Operators watch active alerts, drill into a specific piece of equipment, and
review alert history.

This repo is an extremely dumbed down sample of our real production app.

## Frontend vs. backend

`src/` is the app — a React/TypeScript frontend, and the only code in
scope for review. `mock-server/` and the mock-API plugin in
`vite.config.ts` aren't part of the app; they fake a backend
(`/api/alerts`, `/api/equipment/:id`, `/api/orders`, etc.) so it runs
standalone with nothing to deploy.

## Structure

- `src/types.ts` — shared domain types
- `src/utils/format.ts` — shared formatting helpers
- `src/api/equipmentApi.ts` — data access layer for equipment + alerts
- `src/monitoring/` — dashboard and equipment detail views
- `src/parts/` — replacement-parts ordering
- `mock-server/` — fixture data backing the local backend stand-in
  described above (not application code)
