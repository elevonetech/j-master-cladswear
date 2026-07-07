export function SkeletonGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-white border border-black/07 rounded-3xl overflow-hidden shadow-sm">
          <div className="skeleton h-64 rounded-none" />
          <div className="p-5 space-y-3">
            <div className="skeleton h-2.5 w-20 rounded-full" />
            <div className="skeleton h-4 w-3/4 rounded-full" />
            <div className="skeleton h-3 w-full rounded-full" />
            <div className="skeleton h-3 w-2/3 rounded-full" />
            <div className="mt-2 flex items-center justify-between">
              <div className="skeleton h-4 w-20 rounded-full" />
              <div className="skeleton h-3 w-14 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
