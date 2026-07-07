"use client";

interface SummaryToggleProps {
  mode: "tldr" | "detailed" | "bullets";
  onChange: (mode: "tldr" | "detailed" | "bullets") => void;
}

const MODES = [
  { id: "tldr" as const, label: "TL;DR" },
  { id: "detailed" as const, label: "Full" },
  { id: "bullets" as const, label: "Bullets" },
];

export function SummaryToggle({ mode, onChange }: SummaryToggleProps) {
  return (
    <div className="flex items-center gap-1">
      {MODES.map((m) => (
        <button
          key={m.id}
          onClick={() => onChange(m.id)}
          className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${
            mode === m.id
              ? "bg-accent/20 text-accent font-medium"
              : "text-muted/60 hover:text-muted"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
