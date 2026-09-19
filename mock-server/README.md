# Mock backend

Answers `equip-monitor`'s `/api/*` calls so the frontend runs standalone. Not application code — see the root README.

## `GET /api/alerts`

Returns all alerts, most recent first. `equipment` is optional on each alert (see `src/types.ts`) — these fixtures populate it for every alert, but don't write code that assumes it's always present.

## `GET /api/equipment/:id`

Returns a single piece of equipment by id.

## `GET /api/equipment/:id/compatible-parts?faultCode=<code>`

Returns the parts recommended for that equipment *and* fault code — the same equipment can return different parts for different faults.

## `POST /api/orders`

Body: `{ partId: string, quantity: number }`. Returns `{ id: string, status: "placed" }`. Does not check stock — callers are expected to check `inStock` on the part before calling this.
