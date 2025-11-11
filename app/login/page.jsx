// /app/login/page.jsx
export const metadata = { title: "Sign in • Montelion Capital" };

import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen grid place-items-center p-4">
      <div className="card w-full max-w-md space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="brand-dot">M</div>
          <h1 className="text-2xl font-semibold">Montelion Capital</h1>
          <p className="text-sm text-white/70">Sign in to continue</p>
        </div>

        {/* Form */}
        <form className="space-y-4" action="#" method="post">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" className="input" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm">Password</label>
              <Link href="#" className="text-xs link">Forgot password?</Link>
            </div>
            <input id="password" name="password" type="password" placeholder="••••••••" className="input" />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Sign in
          </button>
        </form>

        <p className="text-sm text-center text-white/60">
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
