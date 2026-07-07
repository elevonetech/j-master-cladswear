import { Link } from "react-router-dom";

export function Breadcrumbs({ items }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-stone/45"
    >
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-2">
          {index > 0 ? <span className="text-black/20">/</span> : null}
          {item.to ? (
            <Link to={item.to} className="transition hover:text-champagne">
              {item.label}
            </Link>
          ) : (
            <span className="text-stone/75">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

