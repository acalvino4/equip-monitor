import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Equipment, Alert } from "../types";
import { fetchEquipment, fetchAlerts } from "../api-client/equipmentClient";
import { formatDate } from "../utils/format";
import { PartsPanel } from "../parts/PartsPanel";

export function EquipmentDetail() {
  const { equipmentId } = useParams<{ equipmentId: string }>();
  const [searchParams] = useSearchParams();
  const activeAlertId = searchParams.get("alert");

  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    if (!equipmentId) return;
    fetchEquipment(equipmentId).then(setEquipment);
    // `alert.equipment` is optional per the /api/alerts contract (see
    // mock-server/README.md) — don't build on it. Use `alert.equipmentId` /
    // `alert.faultCode` (always present) instead.
    fetchAlerts().then((all) => setAlerts(all.filter((a) => a.equipmentId === equipmentId)));
  }, [equipmentId]);

  const activeAlert = alerts.find((a) => a.id === activeAlertId);

  if (!equipment) return <p>Loading…</p>;

  return (
    <section>
      <h1>{equipment.name}</h1>
      <p>
        Model: {equipment.model} · Location: {equipment.location}
      </p>

      <h2>Alert history</h2>
      <ul>
        {alerts.map((a) => (
          <li key={a.id}>
            {a.message} ({a.resolvedAt ? `resolved ${formatDate(a.resolvedAt)}` : "active"})
          </li>
        ))}
      </ul>

      {activeAlert && <PartsPanel alert={activeAlert} />}
    </section>
  );
}
