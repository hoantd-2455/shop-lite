export default function Loading() {
  return (
    <section className="mx-auto w-full max-w-5xl animate-pulse px-4 py-10 sm:px-6 lg:py-14">
      <div className="h-10 w-44 rounded bg-slate-200" />
      <div className="mt-5 h-6 w-80 max-w-full rounded bg-slate-200" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div className="rounded-xl border border-slate-200 p-4" key={item}>
            <div className="aspect-square rounded-lg bg-slate-200" />
            <div className="mt-4 h-5 w-3/4 rounded bg-slate-200" />
            <div className="mt-3 h-5 w-1/3 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </section>
  );
}
