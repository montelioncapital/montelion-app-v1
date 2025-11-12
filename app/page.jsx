import Image from "next/image";
import icon from "../icone-montelion.svg";

export default function Page() {
  return (
    <div className="mc-card">
      <div className="mc-section text-left">
        {/* Icône dans un carré arrondi */}
        <div className="mb-6 flex items-center justify-center w-12 h-12 rounded-xl bg-[#1b1f2a]">
          <Image
            src={icon}
            alt="Montelion Icon"
            width={28}
            height={28}
            className="opacity-90"
            priority
          />
        </div>

        <h1 className="mc-title mb-4">Welcome</h1>

        <p className="max-w-2xl text-slate-400">
          Access your secure workspace. Use your email invite link, or sign in if your account is already active.
        </p>

        <div className="mt-8 flex gap-3">
          <a href="/login" className="mc-btn mc-btn-primary">Sign in</a>
          <button className="mc-btn mc-btn-ghost">Learn more</button>
        </div>

        <p className="mt-10 text-sm text-slate-500">
          Need help? Contact{" "}
          {/* Pas de soulignement, color hover géré dans globals.css */}
          <a href="#" className="">
            Montelion Capital Support
          </a>.
        </p>
      </div>
    </div>
  );
}
