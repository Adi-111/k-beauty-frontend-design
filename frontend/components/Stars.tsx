export default function Stars({ rating = 5, size = 16 }: { rating?: number; size?: number }) {
  return (
    <span className="inline-flex items-center text-primary" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`material-symbols-outlined ${i < Math.round(rating) ? "icon-fill" : "opacity-30"}`}
          style={{ fontSize: size }}
        >
          star
        </span>
      ))}
    </span>
  );
}
