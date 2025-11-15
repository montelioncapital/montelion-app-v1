// app/exchange/setup/page.jsx
"use client";

import Link from "next/link";

export default function ExchangeSetupPage() {
  return (
    <div className="mc-card">
      <div className="mc-section text-left max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <p className="text-[11px] tracking-widest text-slate-500 mb-2">
            KUCOIN FUTURES • SETUP GUIDE
          </p>
          <h1 className="mc-title mb-4">Connect your KuCoin account</h1>
          <p className="text-slate-400 leading-relaxed">
            Suis ces étapes une par une pour créer ton compte KuCoin, sécuriser l’accès,
            déposer des fonds puis générer une clé API. À la fin, ton compte sera prêt à être
            connecté à Montelion, tout en gardant le contrôle total de tes fonds.
          </p>
        </div>

        {/* ALERT */}
        <div className="rounded-xl border border-amber-600/40 bg-amber-900/20 px-4 py-3 mb-10">
          <p className="text-amber-300 text-sm font-medium mb-1">
            ⚠️ Garde toujours tes clés API privées.
          </p>
          <p className="text-amber-200 text-xs">
            Ne partage jamais ta Secret Key ou ta Passphrase en clair.
            Nous ne te demanderons jamais ton mot de passe KuCoin.
          </p>
        </div>

        {/* ------------- ÉTAPE 1 ------------- */}
        <div className="relative mb-12">
          <div className="absolute -left-10 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-semibold">
            1
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">
              ÉTAPE 1
            </p>
            <h2 className="text-slate-100 font-semibold mb-3">
              Créer un compte KuCoin
            </h2>

            <ul className="text-sm text-slate-300 leading-relaxed space-y-2">
              <li>
                • Clique sur ton lien de parrainage :{" "}
                <a
                  href="https://www.kucoin.com/r/rf/QBAA2LND"
                  target="_blank"
                  className="text-blue-400 underline"
                >
                  https://www.kucoin.com/r/rf/QBAA2LND
                </a>
              </li>
              <li>• Choisis inscription par e-mail ou numéro de téléphone.</li>
              <li>• Crée un mot de passe sécurisé.</li>
              <li>• Entre le code de vérification reçu par mail / SMS.</li>
              <li>• Ton compte est créé.</li>
            </ul>
          </div>
        </div>

        {/* ------------- ÉTAPE 2 ------------- */}
        <div className="relative mb-12">
          <div className="absolute -left-10 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-semibold">
            2
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">
              ÉTAPE 2
            </p>
            <h2 className="text-slate-100 font-semibold mb-3">Vérifier ton compte (KYC)</h2>

            <ul className="text-sm text-slate-300 leading-relaxed space-y-2">
              <li>• Connecte-toi à KuCoin.</li>
              <li>• Avatar &rarr; Sécurité &rarr; KYC &rarr; Vérification d'identité.</li>
              <li>• Choisis KYC Individuel.</li>
              <li>• Fournis : nom, adresse, date de naissance, document d’identité.</li>
              <li>• Attends la validation.</li>
            </ul>

            <p className="text-[11px] text-slate-500 mt-3">
              Le KYC est nécessaire pour utiliser toutes les fonctionnalités.
            </p>
          </div>
        </div>

        {/* ------------- ÉTAPE 3 ------------- */}
        <div className="relative mb-12">
          <div className="absolute -left-10 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-semibold">
            3
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">
              ÉTAPE 3
            </p>
            <h2 className="text-slate-100 font-semibold mb-3">
              Activer la Double Authentification (2FA)
            </h2>

            <ul className="text-sm text-slate-300 leading-relaxed space-y-2">
              <li>• Va dans Compte &rarr; Sécurité &rarr; Google Authenticator.</li>
              <li>• Installe Google Authenticator / Authy.</li>
              <li>• Scanne le QR code fourni.</li>
              <li>• Entre le code 2FA.</li>
              <li>• Note la clé de récupération.</li>
            </ul>

            <p className="text-[11px] text-slate-500 mt-3">
              Indispensable pour protéger ton argent.
            </p>
          </div>
        </div>

        {/* ------------- ÉTAPE 4 ------------- */}
        <div className="relative mb-12">
          <div className="absolute -left-10 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-semibold">
            4
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">
              ÉTAPE 4
            </p>
            <h2 className="text-slate-100 font-semibold mb-3">
              Déposer des USDT avec ta carte bancaire
            </h2>

            <ul className="text-sm text-slate-300 leading-relaxed space-y-2">
              <li>• Menu principal &rarr; Acheter Crypto.</li>
              <li>• Choisis Carte bancaire.</li>
              <li>• Devise EUR – Crypto USDT.</li>
              <li>• Indique le montant souhaité.</li>
              <li>• Valide le 3D Secure.</li>
            </ul>
          </div>
        </div>

        {/* ------------- ÉTAPE 5 ------------- */}
        <div className="relative mb-12">
          <div className="absolute -left-10 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-semibold">
            5
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">
              ÉTAPE 5
            </p>
            <h2 className="text-slate-100 font-semibold mb-3">
              Déplacer les fonds vers les Futures
            </h2>

            <ul className="text-sm text-slate-300 leading-relaxed space-y-2">
              <li>• Va dans Actifs / Assets.</li>
              <li>• Ouvre « Futures Account ».</li>
              <li>• Clique sur Transférer.</li>
              <li>• De : Funding/Main &rarr; Vers : Futures Account.</li>
              <li>• Sélectionne USDT puis valide.</li>
            </ul>
          </div>
        </div>

        {/* ------------- ÉTAPE 6 ------------- */}
        <div className="relative mb-10">
          <div className="absolute -left-10 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-semibold">
            6
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">
              ÉTAPE 6
            </p>
            <h2 className="text-slate-100 font-semibold mb-3">
              Créer une API pour le trading automatique
            </h2>

            <ul className="text-sm text-slate-300 leading-relaxed space-y-2">
              <li>• Connecte-toi &rarr; Avatar &rarr; API Management.</li>
              <li>• Clique sur « Create API ».</li>
              <li>• Donne un nom (ex : Futures_Bot).</li>
              <li>• Crée une passphrase.</li>
              <li>• Coche uniquement :</li>
              <li className="ml-4">✔ General (Read)</li>
              <li className="ml-4">✔ Trade</li>
              <li className="ml-4">✔ Futures</li>
              <li className="ml-4 text-red-400">❌ Withdraw (jamais)</li>
              <li>• Active IP Restriction si possible.</li>
              <li>• Valide avec mot de passe + email + 2FA.</li>
            </ul>

            <div className="mt-4 rounded-lg border border-red-700 bg-red-900/40 px-3 py-2 text-xs text-red-300">
              Ne donne jamais les droits Withdraw.
            </div>
          </div>
        </div>

        {/* ----------- FIN + BOUTONS ----------- */}
        <div className="pt-4 space-y-4">
          <p className="text-xs text-slate-500 max-w-md">
            Quand tu as terminé toutes les étapes et récupéré ton API Key, ta Secret Key
            et ta Passphrase, tu pourras les renseigner dans ton espace Montelion
            pour connecter ton compte KuCoin Futures.
          </p>

          <div className="flex gap-3">
            <Link
              href="/get-started/advanced"
              className="mc-btn border border-slate-600/70 bg-slate-900/70 text-slate-200 hover:bg-slate-800/80"
            >
              Back to overview
            </Link>

            <button className="mc-btn mc-btn-primary">
              I’ve created my API keys
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
