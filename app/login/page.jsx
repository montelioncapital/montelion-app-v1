// app/login/page.jsx
export const metadata = {
  title: "Sign in • Montelion Capital",
};

export default function LoginPage() {
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

        {/* Title */}
        <div className="mt-8 md:mt-10 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-white">Montelion Capital</h1>
          <p className="mt-2 text-white/60">Sign in to continue</p>
        </div>

        {/* Form */}
        <form className="mx-auto mt-8 md:mt-10 max-w-[860px]">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm text-white/70 mb-2">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="
                  w-full h-12 rounded-xl px-4
                  bg-white/[0.04] text-white/90 placeholder:text-white/40
                  ring-1 ring-white/10
                  transition
                  hover:bg-white/[0.06]
                  focus:outline-none focus:ring-2 focus:ring-[#4362ff] focus:bg-white/[0.08]
                "
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="text-sm text-white/70">Password</label>
                <a href="#" className="text-xs text-white/50 hover:text-white/70">Forgot password?</a>
              </div>
              <input
                id="password"
                type="password"
                className="
                  w-full h-12 rounded-xl px-4
                  bg-white/[0.04] text-white/90 placeholder:text-white/40
                  ring-1 ring-white/10
                  transition
                  hover:bg-white/[0.06]
                  focus:outline-none focus:ring-2 focus:ring-[#4362ff] focus:bg-white/[0.08]
                "
              />
            </div>
          </div>

          {/* Spacing increased before the big button */}
          <div className="mt-8">
            <button
              type="submit"
              className="
                w-full h-12 rounded-xl
                bg-[#4362ff] text-white font-medium
                ring-1 ring-white/10
                transition transform-gpu
                hover:brightness-110 hover:-translate-y-[1px] active:translate-y-0
                shadow-[0_16px_40px_-10px_rgba(67,98,255,0.5)]
              "
            >
              Sign in
            </button>
          </div>

          {/* Extra spacing below the button */}
          <p className="mt-8 text-center text-sm text-white/55">
            Need help? Contact{" "}
            <a className="underline hover:text-white/75" href="mailto:support@montelion-capital.com">
              Montelion Capital Support
            </a>.
          </p>
        </form>
      </section>
    </main>
  );
}
