import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { equipment, alerts, compatibleParts, partsById } from "./mock-server/fixtures.ts";

// Not application code — a fake backend so the frontend runs standalone,
// with nothing to deploy. See README.md.
function mockApi(): Plugin {
  return {
    name: "mock-api",
    configureServer(server) {
      server.middlewares.use("/api", (req, res, next) => {
        const url = new URL(req.url ?? "/", "http://localhost");
        res.setHeader("Content-Type", "application/json");

        if (url.pathname === "/alerts" && req.method === "GET") {
          res.end(JSON.stringify(alerts));
          return;
        }

        const equipmentMatch = url.pathname.match(/^\/equipment\/([^/]+)$/);
        if (equipmentMatch && req.method === "GET") {
          const found = equipment.find((e) => e.id === equipmentMatch[1]);
          if (!found) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "not found" }));
            return;
          }
          res.end(JSON.stringify(found));
          return;
        }

        const compatMatch = url.pathname.match(/^\/equipment\/([^/]+)\/compatible-parts$/);
        if (compatMatch && req.method === "GET") {
          const faultCode = url.searchParams.get("faultCode") ?? "";
          res.end(JSON.stringify(compatibleParts[`${compatMatch[1]}:${faultCode}`] ?? []));
          return;
        }

        if (url.pathname === "/orders" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", () => {
            const { partId } = JSON.parse(body || "{}") as { partId?: string };
            const part = partId ? partsById[partId] : undefined;
            if (part && !part.inStock) {
              res.statusCode = 409;
              res.end(JSON.stringify({ error: "out of stock" }));
              return;
            }
            res.end(JSON.stringify({ id: `order-${Date.now()}`, status: "placed" }));
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), mockApi()],
});
