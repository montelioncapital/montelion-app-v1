// app/exchange/setup/page.jsx
"use client";

import Link from "next/link";

const SECTIONS = [
  {
    id: 1,
    title: "Créer un compte KuCoin",
    badge: "Étape 1",
    items: [
      <>
        Clique sur ton lien de parrainage&nbsp;:{" "}
        <a
          href="https://www.kucoin.com/r/rf/QBAA2LND"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#7ea3ff] hover:text-[#a9c0ff] underline underline-offset-2"
        >
          https://www.kucoin.com/r/rf/QBAA2LND
        </a>{" "}
        (le code est appliqué automatiquement).
      </>,
      "Choisis inscription par e-mail ou numéro de téléphone.",
      "Crée un mot de passe sécurisé.",
      "Entre le code de vérification reçu par mail / SMS.",
      "Ton compte est créé.",
    ],
  },
  {
    id: 2,
    title: "Vérifier ton compte (KYC)",
    badge: "Étape 2",
    items: [
      "Connecte-toi à KuCoin.",
      "Clique sur ton avatar (en haut à droite).",
      "Va dans Sécurité → KYC / Identity Verification.",
      "Choisis « KYC Individuel ».",
      <>
        Fournis :
        <ul className="mt-1 list-disc list-inside text-xs text-slate-400 space-y-0.5">
          <li>Nom, adresse, date de naissance</li>
          <li>Document d’identité (CNI, passeport…)</li>
          <li>Vérification faciale si demandée</li>
        </ul>
      </>,
      "Attends la validation KYC.",
    ],
    note: "Le KYC est nécessaire pour augmenter les limites et utiliser tous les services.",
  },
  {
    id: 3,
    title: "Activer la Double Authentification (2FA)",
    badge: "Étape 3",
    items: [
      "Va dans Compte → Sécurité → Google Authenticator / 2FA.",
      "Installe Google Authenticator ou Authy sur ton téléphone.",
      "Scanne le QR code affiché par KuCoin.",
      "Entre le code à 6 chiffres pour valider.",
      "Note et garde en sécurité la clé de récupération.",
    ],
    warning: "Indispensable pour protéger ton argent.",
  },
  {
    id: 4,
    title: "Déposer de l’argent avec ta carte bancaire",
    badge: "Étape 4",
    items: [
      "Dans le menu principal, clique sur « Acheter Crypto ». ",
      "Choisis « Carte bancaire ».",
      <>
        Sélectionne :
        <ul className="mt-1 list-disc list-inside text-xs text-slate-400 space-y-0.5">
          <li>Devise : EUR</li>
          <li>Crypto : USDT (le plus simple pour les futures)</li>
        </ul>
      </>,
      "Indique le montant à déposer.",
      "Entre les informations de ta carte bancaire.",
      "Valide le paiement (3D Secure de ta banque).",
      "Les USDT arrivent sur ton compte Principal ou Funding.",
    ],
  },
  {
    id: 5,
    title: "Déplacer les fonds vers les Futures",
    badge: "Étape 5",
    items: [
      "Va dans Actifs / Assets.",
      "Ouvre « Compte Futures ».",
      "Clique sur « Transférer / Transfer ».",
      <>
        Sélectionne :
        <ul className="mt-1 list-disc list-inside text-xs text-slate-400 space-y-0.5">
          <li>De : Funding ou Main</li>
          <li>Vers : Futures Account</li>
        </ul>
      </>,
      "Choisis USDT.",
      "Valide le transfert.",
      "Tes USDT sont maintenant utilisables pour le trading Futures.",
    ],
  },
  {
    id: 6,
    title: "Créer une API pour le trading automatique",
    badge: "Étape 6",
    items: [
      "Connecte-toi à ton compte KuCoin.",
      "Clique sur ton avatar → « API Management ».",
      "Clique sur « Create API ».",
      'Donne un nom d’API (ex. : "Futures_Bot").',
      "Crée une API Passphrase (et garde-la en sécurité).",
      <>
        Coche uniquement :
        <ul className="mt-1 list-disc list-inside text-xs text-slate-400 space-y-0.5">
          <li>✔️ General (Read)</li>
          <li>✔️ Trade</li>
          <li>✔️ Futures</li>
          <li>❌ Withdraw (jamais)</li>
        </ul>
      </>,
      "(Option recommandé) Active IP Restriction et renseigne l’IP fournie par la plateforme.",
      "Valide avec ton mot de passe, le code email et le code 2FA.",
      "KuCoin affiche alors : API Key, Secret Key (uniquement une fois) et API Passphrase.",
    ],
    warning:
      "Ne donne jamais les droits Withdraw (retrait) sur une API. Utilise toujours la restriction par IP si possible.",
  },
];

export default function ExchangeSetupPage() {
  return (
    <div className="mc-card">
      <div className="mc-section text-left max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
            KuCoin Futures setup
          </p>
          <h1 className="mc-title mb-3">Connect your KuCoin account</h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Suis ces étapes une par une pour créer ton compte KuCoin, déposer
            des fonds, puis générer une clé API sécurisée. À la fin, tu pourras
            connecter ton compte à Montelion tout en gardant le contrôle total
            de tes fonds.
          </p>
        </div>

        {/* Bloc warning global */}
        <div className="mb-8 rounded-2xl border border-amber-500/40 bg-amber-500/5 px-4 py-3 text-xs text-amber-200 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2">
            <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full border border-amber-400/70 text-[11px]">
              !
            </span>
            <div>
              <p className="font-medium text-amber-100">
                Garde toujours tes clés API privées.
              </p>
              <p className="text-amber-200/80">
                Ne partage jamais ta Secret Key ou ta Passphrase en clair. Nous
                ne te demanderons jamais de mot de passe KuCoin.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline des étapes */}
        <div className="space-y-5">
          {SECTIONS.map((section, index) => {
            const isLast = index === SECTIONS.length - 1;

            return (
              <div
                key={section.id}
                className="grid grid-cols-[32px,1fr] gap-4 items-stretch"
              >
                {/* Colonne pastille */}
                <div className="flex flex-col items-center">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-500/70 bg-emerald-500/15 text-[11px] font-semibold text-emerald-300 shadow-[0_0_0_1px_rgba(15,23,42,0.9)]">
                    {section.id}
                  </div>
                  {!isLast && (
                    <div className="flex-1 w-px bg-gradient-to-b from-slate-700/80 via-slate-800/80 to-slate-900 mt-1" />
                  )}
                </div>

                {/* Carte de contenu */}
                <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 px-5 py-4 sm:py-5">
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1">
                        {section.badge}
                      </div>
                      <h2 className="text-sm font-semibold text-slate-50">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-[3px] h-[5px] w-[5px] rounded-full bg-slate-500/70 flex-shrink-0" />
                        <div>{item}</div>
                      </li>
                    ))}
                  </ul>

                  {section.note && (
                    <div className="mt-3 rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-[11px] text-slate-300">
                      {section.note}
                    </div>
                  )}

                  {section.warning && (
                    <div className="mt-3 rounded-xl border border-rose-600/60 bg-rose-500/5 px-3 py-2 text-[11px] text-rose-200">
                      {section.warning}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bas de page */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-slate-500 max-w-md">
            Une fois que tu as généré ton API Key, Secret Key et Passphrase,
            tu pourras les renseigner dans ton espace Montelion pour connecter
            ton compte KuCoin Futures.
          </p>

          <div className="flex gap-3 justify-end">
            <Link
              href="/get-started/advanced"
              className="mc-btn bg-slate-800/60 hover:bg-slate-700/70 border border-slate-600/70 text-slate-100"
            >
              Back
            </Link>
            {/* Tu pourras brancher ce bouton plus tard vers l’étape suivante */}
            <button
              type="button"
              className="mc-btn mc-btn-primary"
            >
              I&apos;ve created my API keys
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
