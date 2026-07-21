"use client";

import { useEffect, useRef, useState } from "react";

type Placement = "leaderboard" | "rectangle" | "mobile";

type Unit = {
  key: string;
  width: number;
  height: number;
  query: string;
};

const units: Record<Placement, Unit> = {
  leaderboard: { key: "47a25af220e5f2f77d79915732314b91", width: 728, height: 90, query: "(min-width: 1024px)" },
  rectangle: { key: "ed8c71705efd50dd7fd32b65e6260771", width: 300, height: 250, query: "(min-width: 1024px)" },
  mobile: { key: "0fcde5d002009bf6e978026cdc7b1bd8", width: 320, height: 50, query: "(max-width: 767px)" },
};

declare global {
  interface Window {
    atOptions?: { key: string; format: "iframe"; height: number; width: number; params: Record<string, never> };
    __adsterraQueue?: Promise<void>;
  }
}

export function AdSlot({ placement }: { placement: Placement }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const unit = units[placement];

  useEffect(() => {
    const media = window.matchMedia(unit.query);
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [unit.query]);

  useEffect(() => {
    const host = hostRef.current;
    if (!enabled || !host || host.dataset.loaded === "true") return;

    host.dataset.loaded = "true";
    const load = () =>
      new Promise<void>((resolve) => {
        window.atOptions = { key: unit.key, format: "iframe", height: unit.height, width: unit.width, params: {} };
        const script = document.createElement("script");
        script.src = "https://www.highperformanceformat.com/" + unit.key + "/invoke.js";
        script.async = false;
        script.onload = () => resolve();
        script.onerror = () => resolve();
        host.appendChild(script);
      });

    window.__adsterraQueue = (window.__adsterraQueue ?? Promise.resolve()).then(load);
  }, [enabled, unit]);

  if (!enabled) return null;

  return (
    <aside
      aria-label="Advertisement"
      ref={hostRef}
      style={{ display: "flex", justifyContent: "center", width: "100%", minHeight: unit.height, margin: placement === "rectangle" ? "32px auto" : "20px auto", overflow: "hidden" }}
    />
  );
}
