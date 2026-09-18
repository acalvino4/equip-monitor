export interface Equipment {
  id: string;
  name: string;
  model: string;
  location: string;
  status: "ok" | "warning" | "fault";
}

export interface Alert {
  id: string;
  equipmentId: string;
  // Populated by some endpoints (e.g. equipment detail) but not others
  // (e.g. the flat alert list) — callers can't assume this is present.
  equipment?: Equipment;
  faultCode: string;
  message: string;
  severity: "low" | "medium" | "high";
  createdAt: string;
  resolvedAt: string | null;
}

export interface Part {
  id: string;
  sku: string;
  name: string;
  priceCents: number;
  inStock: boolean;
  imageUrl: string;
}
