import Link from "next/link";

export const metadata = { title: "Welcome • Montelion Capital" };

export default function Page() {
  return (
    <section className="grid min-h-[100svh] place-items-center px-4">
      <div className="card mx-auto w-full max-w-5xl p-8 sm:p-10">
        {/* Header row */}
        <div className="flex items-center justify-between gap-4">
          <div className="badge">M</div>
          <div className="text-sm tracking-widest text-white/70">MONTELION CAPITAL</div>
        </div>

        {/* Content */}
        <div className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-semibold sm:text-4xl">Welcome</h1>
            <p className="mt-4 max-w-prose text-white/70">
              Access your secure workspace. Use your email invite link, or sign in if your account is already active.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/login" className="btn-primary w-auto px-5">
                Sign in
              </Link>
              <Link
                href="#"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-[15px] text-white/90 hover:bg-white/10"
              >
                Learn more
              </Link>
            </div>

            <p className="kicker mt-6">
              Need help? Contact <a href="#" className="link">Montelion Capital Support</a>.
            </p>
          </div>

          {/* Decorative panel */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="h-56 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
