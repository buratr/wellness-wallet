"use client";

import { useState } from "react";

const APPS = [
  { key: "apple", name: "Apple", on: true },
  { key: "fitbit", name: "Fitbit", on: false },
  { key: "strava", name: "Strava", on: false },
];

const NOTIFICATIONS = [
  { key: "reminders", name: "Activity Reminders", on: true },
  { key: "funds", name: "Money Available", on: false },
  { key: "streak", name: "Streak Updates", on: true },
];

function useToggles(items: { key: string; on: boolean }[]) {
  const [state, setState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.map((i) => [i.key, i.on])),
  );
  const toggle = (key: string) => setState((s) => ({ ...s, [key]: !s[key] }));
  return [state, toggle] as const;
}

export function AppConnections({ compact = false }: { compact?: boolean }) {
  const [state, toggle] = useToggles(APPS);
  return (
    <ul className={`toggle-list${compact ? " compact" : ""}`}>
      {APPS.map(({ key, name }) => {
        const on = state[key];
        return (
          <li key={key}>
            <span>{name}</span>
            <button
              type="button"
              className={`conn${on ? " is-on" : ""}`}
              aria-pressed={on}
              aria-label={`${name}: ${on ? "connected. Disconnect" : "not connected. Connect"}`}
              onClick={() => toggle(key)}
            >
              {on ? "Connected" : "Not connected"}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function NotificationSwitches() {
  const [state, toggle] = useToggles(NOTIFICATIONS);
  return (
    <ul className="toggle-list compact">
      {NOTIFICATIONS.map(({ key, name }) => {
        const on = state[key];
        const id = `ww-notif-${key}`;
        return (
          <li key={key}>
            <span id={id}>{name}</span>
            <button
              type="button"
              role="switch"
              className={`switch${on ? " is-on" : ""}`}
              aria-checked={on}
              aria-labelledby={id}
              onClick={() => toggle(key)}
            >
              <span className="knob" aria-hidden="true" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
