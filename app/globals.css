@tailwind base;
@tailwind components;
@tailwind utilities;

/* --------- VARIABLES --------- */
:root {
  --brand: #2664ec; /* Bleu Montelion */
}

/* --------- BASE --------- */
@layer base {
  html,
  body {
    @apply h-full;
  }

  body {
    @apply bg-slate-950 text-slate-100 antialiased;
  }
}

/* --------- SCROLLBAR DISCRET --------- */
body::-webkit-scrollbar {
  width: 6px;
}
body::-webkit-scrollbar-track {
  background: transparent;
}
body::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.35);
  border-radius: 999px;
}

/* --------- COMPONENTS --------- */
@layer components {
  /* SHELL GLOBAL AVEC LÉGER DÉGRADÉ VERTICAL (fond, pas les cartes) */
  .tp-shell {
    @apply min-h-screen w-full bg-slate-950 text-slate-100;
    background:
      radial-gradient(circle at top left, rgba(37, 99, 235, 0.18), transparent 55%),
      radial-gradient(circle at top right, rgba(56, 189, 248, 0.12), transparent 50%),
      radial-gradient(circle at bottom, rgba(15, 23, 42, 0.9), #020617);
  }

  /* BARRE LATÉRALE */
  .tp-sidebar {
    @apply flex h-screen w-64 flex-col border-r border-white/5 bg-black/40 backdrop-blur-xl;
    box-shadow: 0 0 0 1px rgba(148, 163, 184, 0.07),
      0 22px 60px rgba(15, 23, 42, 0.9);
  }

  /* HEADER PRINCIPAL EN HAUT DU CONTENU */
  .tp-header {
    @apply flex items-center justify-between px-8 pt-6 pb-4;
  }

  /* CARTE EFFET GLACE (pour tous les cadrans) */
  .glass-card {
    @apply relative rounded-2xl border border-white/10 bg-slate-900/60;
    @apply backdrop-blur-2xl;
    box-shadow:
      0 0 0 1px rgba(15, 23, 42, 0.7),
      0 18px 60px rgba(0, 0, 0, 0.85);
  }

  /* BARRE LATERALE : ITEM */
  .nav-item {
    @apply flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-300 transition;
  }

  .nav-item span {
    @apply text-slate-200;
  }

  .nav-item-icon {
    @apply flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900/60 text-[15px];
  }

  .nav-item-active {
    @apply bg-slate-900/80 text-white;
    box-shadow:
      0 0 0 1px rgba(148, 163, 184, 0.3),
      0 16px 40px rgba(37, 99, 235, 0.6);
  }

  /* BOUTON PRINCIPAL (bleu Montelion) */
  .btn-primary {
    @apply inline-flex items-center justify-center rounded-xl px-5 py-2 text-sm font-medium text-white;
    background-color: var(--brand);
    box-shadow:
      0 0 0 1px rgba(191, 219, 254, 0.35),
      0 16px 45px rgba(37, 99, 235, 0.9);
  }
  .btn-primary:hover {
    filter: brightness(1.08);
  }

  /* PETITE BADGE / PASTILLE */
  .pill {
    @apply inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-slate-300;
    @apply backdrop-blur-xl;
  }

  /* CHART WRAPPER (noir, pas de gradient ici) */
  .chart-frame {
    @apply glass-card mt-4 flex flex-col justify-between;
  }

  /* TEXTES */
  .kpi-label {
    @apply text-xs uppercase tracking-[0.18em] text-slate-400;
  }

  .kpi-value {
    @apply text-2xl font-semibold text-white;
  }

  .kpi-sub {
    @apply text-xs text-slate-400;
  }
}
