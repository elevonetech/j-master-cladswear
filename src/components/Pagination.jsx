import { ChevronLeft, ChevronRight } from "lucide-react";

function getPageList(current, total) {
  // Always show first, last, current, and neighbors; collapse the rest with "…"
  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const withGaps = [];
  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) {
      withGaps.push("gap");
    }
    withGaps.push(page);
  });
  return withGaps;
}

export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getPageList(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#141210] text-white/70 transition-colors hover:border-champagne/40 hover:text-champagne disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white/70 cursor-pointer"
        aria-label="Previous page"
      >
        <ChevronLeft size={14} />
      </button>

      {pages.map((page, index) =>
        page === "gap" ? (
          <span
            key={`gap-${index}`}
            className="px-1.5 text-xs text-white/30 font-body select-none"
          >
            ···
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold font-body transition-colors cursor-pointer ${
              page === currentPage
                ? "bg-champagne text-[#1a1305]"
                : "border border-white/10 bg-[#141210] text-white/70 hover:border-champagne/40 hover:text-champagne"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#141210] text-white/70 transition-colors hover:border-champagne/40 hover:text-champagne disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white/70 cursor-pointer"
        aria-label="Next page"
      >
        <ChevronRight size={14} />
      </button>
    </nav>
  );
}
