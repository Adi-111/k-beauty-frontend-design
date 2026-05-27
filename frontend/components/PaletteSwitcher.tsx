"use client";

import { useEffect, useState } from "react";

type PaletteId = "evergreen" | "rose" | "indigo" | "terracotta";

type Palette = {
  id: PaletteId;
  name: string;
  tagline: string;
  swatches: [string, string, string, string];
};

const PALETTES: Palette[] = [
  {
    id: "evergreen",
    name: "Evergreen",
    tagline: "Deep forest · warm cream",
    swatches: ["#14422d", "#a1d1b4", "#f9f9f7", "#3c3a33"],
  },
  {
    id: "rose",
    name: "Rosé Noir",
    tagline: "Wine · blush · ivory",
    swatches: ["#6b1e3a", "#e6a8b7", "#fbf6f4", "#4a2530"],
  },
  {
    id: "indigo",
    name: "Midnight Indigo",
    tagline: "Navy · powder · cool ivory",
    swatches: ["#1b2a52", "#a8b8d8", "#f5f6fa", "#2d3142"],
  },
  {
    id: "terracotta",
    name: "Terracotta Sun",
    tagline: "Burnt rust · sand · ochre",
    swatches: ["#8a3a1d", "#e0b298", "#faf3eb", "#4d2f1c"],
  },
];

const STORAGE_KEY = "ocircle-preview-palette";

export default function PaletteSwitcher() {
  const [active, setActive] = useState<PaletteId>("evergreen");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      (localStorage.getItem(STORAGE_KEY) as PaletteId | null)) || "evergreen";
    setActive(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const apply = (id: PaletteId) => {
    setActive(id);
    document.documentElement.setAttribute("data-theme", id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {}
  };

  const current = PALETTES.find((p) => p.id === active) ?? PALETTES[0];

  return (
    <div
      className="fixed z-[60] bottom-24 md:bottom-6 right-4 md:right-6 select-none"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* expanded card */}
      <div
        className={`mb-3 origin-bottom-right transition-all duration-300 ease-out ${
          open
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-2 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl p-4 w-72">
          <div className="flex items-baseline justify-between mb-3">
            <span className="font-display text-headline-md text-on-surface leading-none">
              Preview theme
            </span>
            <span className="text-label-sm uppercase tracking-wider text-on-surface-variant">
              Demo
            </span>
          </div>
          <p className="text-label-sm text-on-surface-variant mb-3 leading-snug">
            Hover and click a palette to preview the entire site. Your choice is
            remembered as you navigate.
          </p>
          <ul className="flex flex-col gap-2">
            {PALETTES.map((p) => {
              const isActive = p.id === active;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => apply(p.id)}
                    className={`group w-full flex items-center gap-3 rounded-lg p-2 text-left transition-colors ${
                      isActive
                        ? "bg-primary-fixed/60"
                        : "hover:bg-surface-container"
                    }`}
                  >
                    <span className="flex -space-x-1.5 shrink-0">
                      {p.swatches.map((c, i) => (
                        <span
                          key={i}
                          className="w-5 h-5 rounded-full border border-surface-container-lowest shadow-sm"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </span>
                    <span className="flex flex-col min-w-0">
                      <span
                        className={`text-body-md leading-none ${
                          isActive
                            ? "text-on-primary-fixed font-semibold"
                            : "text-on-surface"
                        }`}
                      >
                        {p.name}
                      </span>
                      <span className="text-label-sm text-on-surface-variant truncate mt-1">
                        {p.tagline}
                      </span>
                    </span>
                    {isActive && (
                      <span className="material-symbols-outlined icon-fill text-primary text-[18px] ml-auto">
                        check_circle
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* trigger button */}
      <button
        type="button"
        aria-label="Preview color palettes"
        onClick={() => setOpen((v) => !v)}
        className="group relative flex items-center gap-2 pl-2 pr-4 py-2 bg-primary text-on-primary rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.03]"
      >
        <span className="flex -space-x-1">
          {current.swatches.map((c, i) => (
            <span
              key={i}
              className="w-5 h-5 rounded-full border-2 border-primary"
              style={{ backgroundColor: c }}
            />
          ))}
        </span>
        <span className="text-label-md hidden md:inline">Theme</span>
        <span className="material-symbols-outlined text-[18px]">palette</span>
      </button>
    </div>
  );
}
