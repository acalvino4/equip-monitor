# EquipMonitor

Internal dashboard for monitoring industrial equipment health across sites.
Operators watch active alerts, drill into a specific piece of equipment, and
review alert history.

This repo is intentionally small — it's a sample of the real dashboard used
for a take-home / whiteboard exercise, not the production app.

## Structure

- `src/types.ts` — shared domain types
- `src/utils/format.ts` — shared formatting helpers
- `src/api/equipmentApi.ts` — data access layer for equipment + alerts
- `src/monitoring/` — dashboard and equipment detail views
- `src/parts/` — replacement-parts ordering (see open PR)
