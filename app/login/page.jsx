export const metadata = { title: "Sign in • Montelion Capital" };

export default function LoginPage() {
  return (
    <>
      <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgb(37,72,191)]/30 text-white font-medium">
        M
      </div>

      <h1 className="text-center text-2xl font-semibold text-white">
        Montelion Capital
      </h1>
      <p className="mt-1 text-center text-sm text-white/60">
        Sign in to continue
      </p>

      <form className="mx-auto mt-8 max-w-[640px] space-y-4 w-full">
        <div>
          <label htmlFor="email" className="text-sm text-white/70">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="
              mt-2 w-full rounded-xl bg-white/5 border border-white/10
              text-white placeholder-white/30 h-12 px-4 outline-none
              focus:border-white/20 focus:ring-0
            "
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="password" className="text-sm text-white/70">
              Password
            </label>
            <a
              href="#"
              className="text-xs text-white/50 hover:text-white/70 transition"
            >
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            type="password"
            className="
              w-full rounded-xl bg-white/5 border border-white/10
              text-white placeholder-white/30 h-12 px-4 outline-none
              focus:border-white/20 focus:ring-0
            "
          />
        </div>

        <button
          type="submit"
          className="
            mt-2 inline-flex h-12 w-full items-center justify-center
            rounded-xl bg-[rgb(66,102,255)]
            text-white text-sm font-medium
            hover:brightness-110 active:brightness-95 transition
          "
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-white/45">
        Need help? Contact{" "}
        <a className="underline hover:text-white/70" href="#">
          Montelion Capital Support
        </a>
        .
      </p>
    </>
  );
}
