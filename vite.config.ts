import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { equipment, alerts, compatibleParts, partsByModel } from "./src/mocks/fixtures.ts";

// Stands in for the real backend so the app runs with `npm run dev` and no
// separate server. Intercepts the same paths the real API would serve.
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

        if (url.pathname === "/parts" && req.method === "GET") {
          const model = url.searchParams.get("model") ?? "";
          res.end(JSON.stringify(partsByModel[model] ?? []));
          return;
        }

        if (url.pathname === "/orders" && req.method === "POST") {
          res.end(JSON.stringify({ id: `order-${Date.now()}`, status: "placed" }));
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
