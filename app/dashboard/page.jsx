@tailwind base;
@tailwind components;
@tailwind utilities;

/* --- Variables principales --- */
:root {
  --brand: #2664EC;           /* Bleu principal */
  --brand-light: #3B77FF;     /* Bleu plus clair pour bordures */
  --brand-600: #1F54C8;       /* Hover */
  --brand-700: #1945A6;       /* Active */
  --card-border: rgba(255, 255, 255, 0.08);
}

/* --- Fond global --- */
.bg-page {
  background-color: #050814;
}

/* corps en full screen, fond sombre */
html,
body {
  height: 100%;
}

body {
  margin: 0;
  background-color: #050814;
  color: #e2e8f0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text",
    ui-sans-serif, sans-serif;
}

/* scrollbars invisibles sur les conteneurs où on le veut */
.no-scrollbar {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

@layer components {
  /* --- Rectangle commun (login / onboarding, etc.) --- */
  .mc-card {
    @apply w-full max-w-[560px] rounded-2xl border;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.035),
      rgba(255, 255, 255, 0.02)
    );
    border-color: var(--card-border);
    box-shadow: none !important;
  }

  .mc-section {
    @apply p-8 sm:p-10 md:p-12;
  }

  .mc-title {
    @apply text-3xl md:text-4xl font-semibold tracking-[-0.02em];
  }

  /* --- Champs de texte --- */
  .mc-input {
    @apply w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 text-slate-200 placeholder:text-slate-400 outline-none transition;
  }
  .mc-input:hover {
    @apply border-white/20;
  }
  .mc-input:focus {
    border-color: var(--brand) !important;
    box-shadow: 0 0 0 3px rgba(38, 100, 236, 0.35);
    background: rgba(255, 255, 255, 0.06);
  }

  /* --- Boutons --- */
  .mc-btn {
    @apply inline-flex items-center justify-center text-sm font-medium px-5 py-3 rounded-md;
    transition: background-color 0.15s ease, border-color 0.15s ease;
    transform: none !important;
    box-shadow: none !important;
  }

  /* Plein */
  .mc-btn-primary {
    color: #fff;
    background: var(--brand);
    border: 1px solid var(--brand-light);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }
  .mc-btn-primary:hover {
    background: var(--brand-600);
    border-color: var(--brand-light);
  }
  .mc-btn-primary:active {
    background: var(--brand-700);
    border-color: var(--brand-light);
  }

  /* Contour */
  .mc-btn-ghost {
    color: #e6eaf2;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
  .mc-btn-ghost:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.25);
  }
  .mc-btn-ghost:active {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.3);
  }

  /* --- Liens (aucun effet) --- */
  a {
    text-decoration: none !important;
    transition: color 0.25s ease;
  }

  .mc-link-muted {
    color: inherit !important;
  }
  .mc-link-muted:hover {
    color: inherit !important;
  }

  /* --- Petites pastilles / badges pour le dashboard --- */
  .dash-pill {
    @apply inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-medium;
    background: rgba(15, 23, 42, 0.95);
    color: #cbd5f5;
  }

  .dash-pill-active {
    background: rgba(38, 100, 236, 0.18);
    color: #e5edff;
    border: 1px solid rgba(59, 119, 255, 0.9);
  }

  .dash-metric-card {
    @apply rounded-2xl px-5 py-4;
    background: radial-gradient(
        circle at top left,
        rgba(59, 119, 255, 0.25),
        transparent 55%
      ),
      rgba(15, 23, 42, 0.98);
  }

  .dash-chart-card {
    @apply rounded-3xl px-6 py-5;
    background: radial-gradient(
        circle at top left,
        rgba(59, 119, 255, 0.18),
        transparent 60%
      ),
      rgba(6, 12, 26, 0.98);
  }
}
