type PlaceholderProps = {
  label: string;
  sub?: string;
  variant?: "green" | "stone" | "linen" | "dark";
  icon?: string;
  className?: string;
};

const variants: Record<string, string> = {
  green: "bg-primary-container text-on-primary",
  stone: "bg-surface-container-high text-primary",
  linen: "bg-surface-container-low text-primary",
  dark: "bg-primary text-on-primary",
};

export default function Placeholder({
  label,
  sub,
  variant = "linen",
  icon = "spa",
  className = "",
}: PlaceholderProps) {
  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center placeholder-grain overflow-hidden ${variants[variant]} ${className}`}
    >
      <span className="material-symbols-outlined icon-fill text-[44px] opacity-40 mb-3">
        {icon}
      </span>
      <span className="font-display text-headline-md text-center px-6 leading-tight">
        {label}
      </span>
      {sub && (
        <span className="font-body text-label-sm uppercase tracking-widest opacity-60 mt-2">
          {sub}
        </span>
      )}
    </div>
  );
}
