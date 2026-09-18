# Mock backend

Fakes the routes a separate backend team already built and shipped, so the frontend runs standalone. Treat everything below as an existing, stable API contract this PR should be building on top of, not reinventing.

## Platform routes (pre-existing, unrelated to this PR)

### `GET /api/alerts`

Returns all alerts, most recent first.

### `GET /api/equipment/:id`

Returns a single piece of equipment by id.

## Routes shipped for the parts-ordering feature

### `GET /api/equipment/:id/compatible-parts?faultCode=<code>`

Returns the parts recommended for that equipment *and* fault code — the same equipment can return different parts for different faults. This is the supported way to look up suggested parts for an alert.

### `POST /api/orders`

Body: `{ partId: string, quantity: number }`. Returns `{ id: string, status: "placed" }`. Does not check stock — callers are expected to check `inStock` on the part before calling this.

## Not a documented route

`/api/parts?model=<model>` responds in this mock, but it was never part of the API the backend team shipped and published. If you see frontend code calling it, that's not based on anything documented here — treat it the same as any other undocumented API usage.
