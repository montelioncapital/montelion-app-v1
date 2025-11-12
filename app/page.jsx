// app/page.jsx
import Image from "next/image";
import logo from "../logo-montelion-02.svg";

export const metadata = {
  title: "Welcome • Montelion Capital",
};

export default function HomePage() {
  return (
    <main className="min-h-screen grid place-items-center bg-page">
      <div className="mc-card mc-section text-left">
        {/* Logo au-dessus du titre */}
        <div className="mb-6">
          <Image
            src={logo}
            alt="Montelion Capital"
            width={160}
            height={60}
            className="opacity-90"
            priority
          />
        </div>

        {/* Texte principal */}
        <h1 className="mc-title mb-4">Welcome</h1>
        <p className="text-slate-300 max-w-md mb-8">
          Access your secure workspace. Use your email invite link, or sign in if your account is already active.
        </p>

        {/* Boutons */}
        <div className="flex gap-4 mb-8">
          <a href="/login" className="mc-btn mc-btn-primary">
            Sign in
          </a>
          <button className="mc-btn mc-btn-ghost">Learn more</button>
        </div>

        {/* Support link */}
        <p className="text-sm text-slate-500">
          Need help? Contact{" "}
          <a href="#" className="hover:text-[#ADBFFF]">
            Montelion Capital Support
          </a>.
        </p>
      </div>
    </main>
  );
}
