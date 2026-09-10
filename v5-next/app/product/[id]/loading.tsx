export default function ProductLoading() {
  return (
    <section className="mx-auto w-full max-w-5xl animate-pulse px-4 py-10 sm:px-6 lg:py-14">
      <div className="h-5 w-52 rounded bg-slate-200" />
      <div className="mt-6 grid gap-8 rounded-2xl border border-slate-200 bg-white p-5 md:grid-cols-2 md:p-8">
        <div className="aspect-square rounded-xl bg-slate-200" />
        <div>
          <div className="h-4 w-24 rounded bg-slate-200" />
          <div className="mt-4 h-10 w-4/5 rounded bg-slate-200" />
          <div className="mt-6 h-20 rounded bg-slate-200" />
          <div className="mt-6 h-24 rounded bg-slate-200" />
        </div>
      </div>
    </section>
  );
}
