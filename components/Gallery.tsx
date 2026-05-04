"use client";

import { useMemo, useState } from "react";
import type { Reference, ReferenceType } from "@/lib/references";
import { typeLabel } from "@/lib/references";
import { ReferenceCard } from "./ReferenceCard";

type Filter = "all" | ReferenceType;

const FILTER_ORDER: Filter[] = [
  "all",
  "movie",
  "tv_show",
  "video_game",
  "youtube_channel",
  "comedy_special",
  "other",
];

export function Gallery({ references }: { references: Reference[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c: Partial<Record<Filter, number>> = { all: references.length };
    for (const r of references) c[r.type] = (c[r.type] ?? 0) + 1;
    return c;
  }, [references]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return references.filter((r) => {
      if (filter !== "all" && r.type !== filter) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.episodes_inspired.some((e) => e.name.toLowerCase().includes(q))
      );
    });
  }, [references, filter, query]);

  const activeFilters = FILTER_ORDER.filter((f) => f === "all" || (counts[f] ?? 0) > 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((f) => {
            const active = f === filter;
            const label = f === "all" ? "All" : typeLabel(f);
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider transition ${
                  active
                    ? "border-accent bg-accent text-black"
                    : "border-border text-muted hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {label}
                <span className={`ml-1.5 ${active ? "text-black/60" : "text-muted/60"}`}>
                  {counts[f] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search films, shows, dishes…"
          className="w-full rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none sm:w-72"
        />
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-muted">No references match.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((r) => (
            <ReferenceCard key={r.reference_id} reference={r} />
          ))}
        </div>
      )}
    </div>
  );
}
