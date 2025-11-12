"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export const metadata = { title: "Sign in • Montelion Capital" };

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mc-card">
      <div className="mc-section">
        {/* Raccourci retour */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-slate-400 hover:text-slate-300 text-sm mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        {/* Titre aligné à gauche */}
        <div className="mb-8 text-left">
          <h1 className="mc-title">Sign in</h1>
        </div>

        <form className="space-y-4">
          {/* Champ email */}
          <label className="block text-sm text-slate-300">
            Email
            <input
              type="email"
              placeholder="you@example.com"
              className="mc-input mt-2"
            />
          </label>

          {/* Champ mot de passe avec œil */}
          <div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <label>Password</label>
              <a href="#" className="text-slate-400 hover:text-slate-300">
                Forgot password?
              </a>
            </div>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="mc-input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-200 transition"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Bouton principal */}
          <button type="submit" className="mc-btn mc-btn-primary w-full mt-3">
            Sign in
          </button>
        </form>

        {/* Lien d’aide */}
        <p className="mt-8 text-left text-sm text-slate-500">
          Need help? Contact{" "}
          <a href="#" className="text-slate-500">
            Montelion Capital Support
          </a>.
        </p>
      </div>
    </div>
  );
}
