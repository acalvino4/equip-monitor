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
  // Optional per the /api/alerts contract (see mock-server/README.md) —
  // don't write code that assumes this is always present.
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
