import Link from "next/link";

export const metadata = { title: "Sign in • Montelion Capital" };

export default function LoginPage() {
  return (
    <section className="grid min-h-[100svh] place-items-center px-4">
      <div className="card w-full max-w-2xl p-8 sm:p-10">
        {/* Brand */}
        <div className="grid place-items-center gap-2">
          <div className="badge">M</div>
          <h1 className="text-center text-2xl font-semibold sm:text-3xl">
            Montelion Capital
          </h1>
          <p className="kicker">Sign in to continue</p>
        </div>

        {/* Form */}
        <form className="mx-auto mt-8 grid max-w-lg gap-4" action="#" method="post">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-white/70">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" className="input" />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <label htmlFor="password" className="text-white/70">Password</label>
              <Link href="#" className="link">Forgot password?</Link>
            </div>
            <input id="password" name="password" type="password" className="input" />
          </div>

          <button type="submit" className="btn-primary mt-2">Sign in</button>
        </form>

        <p className="kicker mx-auto mt-6 max-w-lg text-center">
          Need help? Contact <a href="#" className="link">Montelion Capital Support</a>.
        </p>
      </div>
    </section>
  );
}
