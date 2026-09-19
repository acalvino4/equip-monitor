import { Part } from '../types';

// Fetches recommended parts for the given equipment model.
export const fetchPartsForModel = async (model: string): Promise<Part[]> => {
  const response = await fetch(`/api/parts?model=${model}`);
  const data = await response.json();
  return data;
};

export async function placeOrder(partId: string, quantity: number) {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ partId, quantity }),
  });
  if (!response.ok) {
    throw new Error(`Order failed with status ${response.status}`);
  }
  return response.json();
}
