function Wins() {
  return (
    <div className="relative min-h-screen w-full bg-transparent px-4 pb-16 pt-6 text-bloom-forest dark:text-bloom-light sm:px-6 lg:px-8">
      <main className="mx-auto w-full max-w-6xl">
        <section className="mb-6 rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-7">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
            Wins
          </p>

          <h1 className="text-3xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-4xl">
            All your Bloom wins.
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-bloom-forest/65 dark:text-gray-300">
            A gentle place to browse the small wins, good moments, and memories
            you have saved in Bloom.
          </p>
        </section>

        <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-sm text-bloom-forest/65 dark:text-gray-300">
            Your saved wins will appear here.
          </p>
        </section>
      </main>
    </div>
  )
}

export default Wins