"use client";

import { useEffect, useMemo, useState } from "react";

function getParts(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  const safe = Math.max(0, diff);
  const days = Math.floor(safe / 86_400_000);
  const hours = Math.floor((safe % 86_400_000) / 3_600_000);
  const minutes = Math.floor((safe % 3_600_000) / 60_000);
  const seconds = Math.floor((safe % 60_000) / 1000);
  return { days, hours, minutes, seconds, ended: diff <= 0 };
}

export function ReleaseCountdown({ target, label }: { target: string; label: string }) {
  const [parts, setParts] = useState<ReturnType<typeof getParts> | null>(null);
  const targetDate = useMemo(() => new Date(target), [target]);

  useEffect(() => {
    setParts(getParts(target));
    const id = window.setInterval(() => setParts(getParts(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const visibleParts = parts || { days: 0, hours: 0, minutes: 0, seconds: 0, ended: false };

  return (
    <article className="feature-panel countdown-card">
      <span className="card-eyebrow">Live countdown</span>
      <h2>{visibleParts.ended ? "Launch window reached" : label}</h2>
      <div className="countdown-grid" aria-label="Release countdown">
        <span><strong>{visibleParts.days}</strong><em>Days</em></span>
        <span><strong>{visibleParts.hours}</strong><em>Hours</em></span>
        <span><strong>{visibleParts.minutes}</strong><em>Minutes</em></span>
        <span><strong>{visibleParts.seconds}</strong><em>Seconds</em></span>
      </div>
      <p>Target: {targetDate.toUTCString()}</p>
    </article>
  );
}
