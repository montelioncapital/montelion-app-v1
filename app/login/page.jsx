// app/page.jsx
export const metadata = {
  title: "Welcome • Montelion Capital",
};

export default function HomePage() {
  return (
    <main className="min-h-screen grid place-items-center px-4">
      <section
        className="
          w-full max-w-[1000px] mx-auto
          rounded-3xl border border-white/5
          bg-[rgba(8,10,14,0.6)] backdrop-blur
          shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]
          px-6 md:px-10 lg:px-14 py-10 md:py-14
        "
      >
        {/* Header line */}
        <div className="flex items-center justify-between text-sm text-white/60">
          <div className="inline-flex items-center justify-center h-8 w-8 rounded-xl bg-[#233463] text-white/90 font-medium">
            M
          </div>
          <span className="tracking-[0.25em]">MONTELION CAPITAL</span>
        </div>

        {/* Content */}
        <div className="mt-8 md:mt-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-white">Welcome</h1>
          <p className="mt-4 text-white/70 max-w-2xl">
            Access your secure workspace. Use your email invite link, or sign in if your account
            is already active.
          </p>

          <div className="mt-8 flex gap-3">
            <a
              href="/login"
              className="inline-flex items-center justify-center h-11 px-5 rounded-xl
                         bg-[#4362ff] text-white font-medium
                         ring-1 ring-white/10
                         transition transform-gpu
                         hover:brightness-110 hover:-translate-y-[1px] active:translate-y-0"
            >
              Sign in
            </a>
            <a
              href="#learn-more"
              className="inline-flex items-center justify-center h-11 px-5 rounded-xl
                         bg-white/[0.03] text-white/90 font-medium
                         ring-1 ring-white/10
                         transition hover:bg-white/[0.06]"
            >
              Learn more
            </a>
          </div>

          <p className="mt-10 text-sm text-white/50">
            Need help? Contact <a className="underline hover:text-white/70" href="mailto:support@montelion-capital.com">Montelion Capital Support</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
