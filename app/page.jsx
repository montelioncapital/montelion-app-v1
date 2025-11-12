export const metadata = { title: "Welcome • Montelion Capital" };

export default function Page() {
  return (
    <>
      <div className="absolute top-8 right-8 text-xs tracking-widest text-white/60">
        MONTELION CAPITAL
      </div>

      <div className="flex flex-col justify-center gap-6">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[rgb(37,72,191)]/30 text-white font-medium">
          M
        </div>

        <h1 className="text-3xl font-semibold text-white">Welcome</h1>
        <p className="text-white/70 max-w-[60ch]">
          Access your secure workspace. Use your email invite link, or sign in
          if your account is already active.
        </p>

        <div className="flex gap-3 mt-2">
          <a
            href="/login"
            className="rounded-xl bg-[rgb(66,102,255)] px-6 py-3 font-medium text-white hover:brightness-110 active:brightness-95 transition"
          >
            Sign in
          </a>
          <a
            href="#"
            className="rounded-xl bg-white/5 border border-white/10 px-6 py-3 text-white/90 hover:bg-white/10 transition"
          >
            Learn more
          </a>
        </div>

        <p className="text-xs text-white/45 mt-8">
          Need help? Contact{" "}
          <a href="#" className="underline hover:text-white/70">
            Montelion Capital Support
          </a>
          .
        </p>
      </div>
    </>
  );
}
