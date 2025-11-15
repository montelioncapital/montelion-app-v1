// app/exchange/setup/page.jsx
"use client";

import Link from "next/link";

const SECTIONS = [
  {
    id: 1,
    title: "Créer un compte KuCoin",
    category: "Compte",
    items: [
      <>
        Clique sur ton lien de parrainage&nbsp;:{" "}
        <a
          href="https://www.kucoin.com/r/rf/QBAA2LND"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8fa8ff] hover:text-[#b6c6ff] underline underline-offset-2"
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
    category: "KYC",
    items: [
      "Connecte-toi à KuCoin.",
      "Clique sur ton avatar (en haut à droite).",
      "Va dans Sécurité → KYC / Identity Verification.",
      "Choisis « KYC Individuel ».",
      <>
        Fournis :
        <ul className="mt-1 list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
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
    category: "Sécurité",
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
    category: "Dépôt",
    items: [
      "Dans le menu principal, clique sur « Acheter Crypto ».",
      "Choisis « Carte bancaire ».",
      <>
        Sélectionne :
        <ul className="mt-1 list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
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
    category: "Futures",
    items: [
      "Va dans Actifs / Assets.",
      "Ouvre « Compte Futures ».",
      "Clique sur « Transférer / Transfer ».",
      <>
        Sélectionne :
        <ul className="mt-1 list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
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
    category: "API",
    items: [
      "Connecte-toi à ton compte KuCoin.",
      "Clique sur ton avatar → « API Management ».",
      "Clique sur « Create API ».",
      'Donne un nom d’API (ex. : "Futures_Bot").',
      "Crée une API Passphrase (et garde-la en sécurité).",
      <>
        Coche uniquement :
        <ul className="mt-1 list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
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
      <div className="mc-section max-w-5xl mx-auto text-left">
        {/* Header distinctif */}
        <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-950 to-black px-6 py-6 lg:px-8 lg:py-7 shadow-[0_30px_80px_rgba(15,23,42,0.9)] mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500 mb-3">
                KuCoin Futures · Setup guide
              </p>
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50 mb-3">
                Connect your KuCoin account
              </h1>
              <p className="text-slate-400 text-sm sm:text-[15px] max-w-xl">
                Suis ces étapes pour créer ton compte KuCoin, sécuriser l’accès,
                déposer tes fonds puis générer une clé API. À la fin, ton compte
                sera prêt à être connecté à Montelion, tout en gardant le
                contrôle total de tes fonds.
              </p>
            </div>

            {/* Petit résumé à droite */}
            <div className="hidden md:flex flex-col gap-2 text-[11px] text-slate-300">
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2">
                <p className="font-medium text-emerald-200 mb-0.5">
                  6 grandes étapes
                </p>
                <p className="text-emerald-100/80">
                  Compte, KYC, sécurité, dépôt, futures, puis API.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 px-3 py-2">
                <p className="font-medium text-slate-200 mb-0.5">
                  Temps estimé
                </p>
                <p className="text-slate-400/90">≈ 15–20 minutes posément.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerte sécurité globale */}
        <div className="mb-8 rounded-2xl border border-amber-500/50 bg-amber-500/10 px-4 py-3 text-xs text-amber-100 flex gap-3">
          <span className="mt-[3px] inline-flex h-6 w-6 items-center justify-center rounded-full border border-amber-300/70 text-[12px] font-semibold">
            !
          </span>
          <div>
            <p className="font-medium mb-1.5">
              Garde toujours tes clés API privées.
            </p>
            <p className="text-amber-100/90">
              Ne partage jamais ta Secret Key ou ta Passphrase en clair. Nous ne
              te demanderons jamais ton mot de passe KuCoin.
            </p>
          </div>
        </div>

        {/* Layout 2 colonnes : résumé / cartes */}
        <div className="grid gap-6 lg:grid-cols-[240px,minmax(0,1fr)]">
          {/* Colonne résumé des phases */}
          <aside className="space-y-4 lg:sticky lg:top-6 self-start">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                Phases
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>1–2 · Création + KYC</li>
                <li>3 · Sécurisation (2FA)</li>
                <li>4–5 · Dépôt & transfert futures</li>
                <li>6 · Création de l’API</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 px-4 py-4 text-xs text-slate-400">
              <p className="font-medium text-slate-100 mb-1.5">
                Conseils rapides
              </p>
              <ul className="space-y-1.5">
                <li>• Utilise un mot de passe unique pour KuCoin.</li>
                <li>• Active la 2FA avant tout dépôt important.</li>
                <li>• Sauvegarde ta Secret Key au moment où elle s’affiche.</li>
              </ul>
            </div>
          </aside>

          {/* Colonne cartes étapes (design différent de get-started) */}
          <div className="grid gap-5 md:grid-cols-2">
            {SECTIONS.map((section) => (
              <div
                key={section.id}
                className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 px-5 py-4 shadow-[0_18px_45px_rgba(15,23,42,0.75)]"
              >
                {/* Badge step */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/70 to-sky-500/80 text-[13px] font-semibold text-slate-950 shadow-lg">
                      {section.id}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                        Step {section.id}
                      </span>
                      <span className="text-xs font-medium text-slate-200">
                        {section.category}
                      </span>
                    </div>
                  </div>
                </div>

                <h2 className="text-sm font-semibold text-slate-50 mb-2">
                  {section.title}
                </h2>

                <ul className="space-y-1.5 text-xs text-slate-200">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-[5px] h-[5px] w-[5px] rounded-full bg-slate-500/70 flex-shrink-0" />
                      <div>{item}</div>
                    </li>
                  ))}
                </ul>

                {section.note && (
                  <div className="mt-3 rounded-xl border border-slate-700/70 bg-slate-950/80 px-3 py-2 text-[11px] text-slate-300">
                    {section.note}
                  </div>
                )}

                {section.warning && (
                  <div className="mt-3 rounded-xl border border-rose-600/70 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
                    {section.warning}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-slate-500 max-w-md">
            Quand tu as terminé toutes les étapes et récupéré ton API Key, ta
            Secret Key et ta Passphrase, tu pourras les renseigner dans ton
            espace Montelion pour connecter ton compte KuCoin Futures.
          </p>

          <div className="flex gap-3 justify-end">
            <Link
              href="/get-started/advanced"
              className="mc-btn border border-slate-600/70 bg-slate-900/80 text-slate-100 hover:bg-slate-800/80"
            >
              Back to overview
            </Link>
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
