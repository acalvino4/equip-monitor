import { Equipment, Alert, Part } from "../types";

export const equipment: Equipment[] = [
  { id: "eq-1", name: "Line 4 Compressor", model: "CM-200", location: "Plant A - Bay 3", status: "fault" },
  { id: "eq-2", name: "Reactor 2 Feed Pump", model: "PX-90", location: "Plant B - Reactor Hall", status: "warning" },
  { id: "eq-3", name: "Line 7 Conveyor Motor", model: "MX-40", location: "Plant A - Bay 7", status: "fault" },
];

const [compressor, pump, conveyor] = equipment;

// NOTE for whoever wires up the real backend: these dev fixtures populate
// `equipment` on every alert for convenience. The real history endpoint
// does NOT guarantee that — see the comment in EquipmentDetail.tsx.
export const alerts: Alert[] = [
  {
    id: "al-1",
    equipmentId: compressor.id,
    equipment: compressor,
    faultCode: "OVERTEMP",
    message: "Compressor running above safe temperature",
    severity: "high",
    createdAt: "2026-09-18T08:12:00Z",
    resolvedAt: null,
  },
  {
    id: "al-2",
    equipmentId: compressor.id,
    equipment: compressor,
    faultCode: "BELT_SLIP",
    message: "Drive belt slip detected",
    severity: "medium",
    createdAt: "2026-09-10T14:03:00Z",
    resolvedAt: "2026-09-10T16:45:00Z",
  },
  {
    id: "al-3",
    equipmentId: pump.id,
    equipment: pump,
    faultCode: "PRESSURE_LOW",
    message: "Inlet pressure below threshold",
    severity: "medium",
    createdAt: "2026-09-17T22:30:00Z",
    resolvedAt: null,
  },
  {
    id: "al-4",
    equipmentId: conveyor.id,
    equipment: conveyor,
    faultCode: "OVERCURRENT",
    message: "Motor drawing excess current",
    severity: "high",
    createdAt: "2026-09-18T06:50:00Z",
    resolvedAt: null,
  },
];

const coolingFan: Part = { id: "p1", sku: "FAN-200", name: "Cooling fan", priceCents: 4500, inStock: true, imageUrl: "/img/fan.png" };
const driveBelt: Part = { id: "p2", sku: "BLT-200", name: "Drive belt", priceCents: 1899, inStock: false, imageUrl: "/img/belt.png" };
const pressureSensor: Part = { id: "p3", sku: "SNS-90", name: "Pressure sensor", priceCents: 6200, inStock: true, imageUrl: "/img/sensor.png" };

// Backs the existing, correct `fetchCompatibleParts` endpoint — keyed by
// equipment + fault code, so different faults on the same machine can
// recommend different parts.
export const compatibleParts: Record<string, Part[]> = {
  "eq-1:OVERTEMP": [coolingFan],
  "eq-1:BELT_SLIP": [driveBelt],
  "eq-2:PRESSURE_LOW": [pressureSensor],
};

// Backs partsApi.ts's fetchPartsForModel — keyed by model only, no fault
// code. Note this is what the PR's hardcoded PARTS_BY_MODEL map re-derives
// instead of calling the real endpoint above.
export const partsByModel: Record<string, Part[]> = {
  "CM-200": [coolingFan, driveBelt],
  "PX-90": [pressureSensor],
};
