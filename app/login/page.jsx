export default function LoginPage() {
  return (
    <main className="min-h-screen grid place-items-center">
      <div className="card max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto h-10 w-10 grid place-items-center rounded-full bg-primary/10">M</div>
          <h1 className="text-2xl font-semibold">Montelion Capital</h1>
          <p className="text-sm text-white/60">Sign in to continue</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Email</label>
            <input type="email" className="input" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Password</label>
            <input type="password" className="input" placeholder="••••••••" />
          </div>
          <button className="btn-primary w-full">Sign in</button>
        </form>

        <p className="text-center text-xs text-white/60">
          Need help?{" "}
          <a href="mailto:contact@montelion-capital.com" className="underline">
            Contact us
          </a>
        </p>
      </div>
    </main>
  );
}
