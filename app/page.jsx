// Landing (Welcome) page

export const metadata = {
  title: "Welcome • Montelion Capital",
};

import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen grid place-items-center p-4">
      <div className="card w-full max-w-3xl space-y-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="brand-dot">M</div>
          <div className="font-semibold tracking-wide text-white/90">MONTELION CAPITAL</div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold">Welcome</h1>

        <p className="text-white/70 max-w-2xl">
          Access your secure workspace. Use your email invite link, or sign in if
          your account is already active.
        </p>

        <div className="flex items-center gap-3">
          <Link href="/login" className="btn btn-primary">
            Sign in
          </Link>
          <Link href="/learn-more" className="btn btn-ghost">
            Learn more
          </Link>
        </div>

        <p className="text-sm text-white/60">
          Need help? Contact{" "}
          <a href="mailto:support@montelion-capital.com" className="link">
            Montelion Capital Support
          </a>
          .
        </p>
      </div>
    </main>
  );
}
