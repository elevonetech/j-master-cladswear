export function SkeletonGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-[1.75rem] bg-white/[0.03] p-4">
          <div className="h-56 rounded-[1.5rem] bg-zinc-800/80" />
          <div className="mt-4 h-4 w-2/3 rounded-full bg-zinc-800/80" />
          <div className="mt-3 h-3 w-1/2 rounded-full bg-zinc-800/80" />
          <div className="mt-6 h-10 rounded-full bg-zinc-800/80" />
        </div>
      ))}
    </div>
  );
}
