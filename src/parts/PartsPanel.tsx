import { useEffect, useState } from "react";
import { Alert, Part } from "../types";
import { fetchPartsForModel, placeOrder } from "./partsApi";
import "./PartsPanel.css";

// Maps equipment model to the parts most commonly ordered for that model.
// TODO: probably switch this to fetchCompatibleParts once we confirm it
// covers all our fault codes.
const PARTS_BY_MODEL: Record<string, Part[]> = {
  "CM-200": [
    { id: "p1", sku: "FAN-200", name: "Cooling fan", priceCents: 4500, inStock: true, imageUrl: "/img/fan.png" },
    { id: "p2", sku: "BLT-200", name: "Drive belt", priceCents: 1899, inStock: false, imageUrl: "/img/belt.png" },
  ],
  "PX-90": [
    { id: "p3", sku: "SNS-90", name: "Pressure sensor", priceCents: 6200, inStock: true, imageUrl: "/img/sensor.png" },
  ],
};

export function PartsPanel({ alert }: { alert: Alert }) {
  const [parts, setParts] = useState<Part[]>([]);
  const [orderedPartId, setOrderedPartId] = useState<string | null>(null);

  useEffect(() => {
    const model = alert.equipment.model;
    setParts(PARTS_BY_MODEL[model] ?? []);
  }, [alert]);

  function handleOrder(part: Part) {
    placeOrder(part.id, 1);
    alert(`Ordered ${part.name}`);
    setOrderedPartId(part.id);
  }

  return (
    <div className="parts-panel">
      <h3>Suggested parts</h3>
      {parts.map((part) => (
        <div className="part-card" key={part.id} onClick={() => handleOrder(part)}>
          <img src={part.imageUrl} />
          <span>{part.name}</span>
          <span>${part.priceCents / 100}</span>
          <span className="order-cta">Order</span>
          {orderedPartId === part.id && <span className="order-confirmation">✓ Ordered</span>}
        </div>
      ))}
    </div>
  );
}
