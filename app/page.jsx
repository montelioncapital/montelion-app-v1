// app/page.jsx
export const metadata = { title: "Welcome • Montelion Capital" };

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex w-full items-start justify-between">
        <div className="brand-dot">M</div>
        <div className="brand-dot">MONTELION CAPITAL</div>
      </div>

      <div className="mt-10 max-w-[720px]">
        <h1 className="text-[32px] font-semibold">Welcome</h1>
        <p className="mt-4 text-white/75">
          Access your secure workspace. Use your email invite link, or sign in if your account is already active.
        </p>

        <div className="mt-8 flex gap-3">
          <a href="/login" className="btn btn-primary px-6">Sign in</a>
          <button className="btn btn-ghost px-6">Learn more</button>
        </div>

        <p className="mt-8 hint">
          Need help? Contact <a className="underline hover:text-white/80" href="#">Montelion Capital Support</a>.
        </p>
      </div>
    </div>
  );
}
