import { useEffect, useState } from "react";
import { Alert } from "../types";
import { fetchAlerts } from "../api/equipmentApi";
import { formatDate } from "../utils/format";

export function AlertsDashboard() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAlerts()
      .then(setAlerts)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p role="alert">Couldn't load alerts: {error}</p>;
  }

  return (
    <ul className="alerts-list">
      {alerts.map((alert) => (
        <li key={alert.id}>
          <a href={`/equipment/${alert.equipmentId}?alert=${alert.id}`}>
            <strong>{alert.equipment?.name ?? alert.equipmentId}</strong> — {alert.message}
          </a>
          <span className={`severity severity-${alert.severity}`}>{alert.severity}</span>
          <time dateTime={alert.createdAt}>{formatDate(alert.createdAt)}</time>
        </li>
      ))}
    </ul>
  );
}
