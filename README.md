# EquipMonitor

This repo is an extremely dumbed down sample of our real production app - a dashboard for monitoring industrial equipment health across sites. Operators watch active alerts, drill into a specific piece of equipment, and review alert history.

## Overview

`src/` is the app — a React/TypeScript frontend, and the only code in scope for review. `mock-server/` and the mock-API plugin in `vite.config.ts` aren't part of the app; they're just faking a backend. See [mock-server/README.md](mock-server/README.md) for the routes it answers.
