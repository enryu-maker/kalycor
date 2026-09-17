export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <span className="grid size-10 place-items-center border border-primary text-primary animate-spin">
          <span className="block size-2 bg-primary" />
        </span>
        <p className="eyebrow animate-pulse">Loading Kalycor...</p>
      </div>
    </div>
  );
}
