import Link from "next/link";

export const metadata = {
  title: "Welcome • Montelion Capital",
};

export default function Home() {
  return (
    <main className="screen">
      <section className="card card-pad">
        {/* top line */}
        <div className="flex items-center justify-between text-xs tracking-[0.2em] text-white/60">
          <span className="invisible">.</span>
          <span>MONTELION CAPITAL</span>
        </div>

        {/* header */}
        <div className="mt-6 flex items-center gap-3">
          <span className="badge">M</span>
        </div>

        {/* body */}
        <div className="mt-6 stack-lg">
          <h1 className="title-xl">Welcome</h1>
          <p className="subtitle max-w-3xl">
            Access your secure workspace. Use your email invite link, or sign in if your account is already active.
          </p>

          <div className="flex items-center gap-3 pt-1">
            <Link href="/login" className="btn btn-primary">Sign in</Link>
            <button className="btn btn-ghost">Learn more</button>
          </div>

          <p className="pt-6 text-sm text-white/60">
            Need help? Contact{" "}
            <a className="underline hover:no-underline" href="#">
              Montelion Capital Support
            </a>.
          </p>
        </div>
      </section>
    </main>
  );
}
