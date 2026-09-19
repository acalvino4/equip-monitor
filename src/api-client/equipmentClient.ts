import { Equipment, Alert, Part } from "../types";

const BASE_URL = "/api";

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, init);
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function fetchAlerts(): Promise<Alert[]> {
  return fetchJson<Alert[]>("/alerts");
}

export function fetchEquipment(equipmentId: string): Promise<Equipment> {
  return fetchJson<Equipment>(`/equipment/${equipmentId}`);
}

/**
 * Returns parts recommended for a given fault code on a given piece of
 * equipment. Takes the equipment and fault code into account, so the same
 * fault on different equipment (or different faults on the same equipment)
 * can return different parts.
 */
export function fetchCompatibleParts(equipmentId: string, faultCode: string): Promise<Part[]> {
  return fetchJson<Part[]>(`/equipment/${equipmentId}/compatible-parts?faultCode=${faultCode}`);
}
