/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ on passe en mode serveur Node (pas d'export statique)
  //    "standalone" construit un bundle exécutable par `next start`
  output: 'standalone',

  // (optionnel mais sûr) empêche Next d’essayer de revalider côté app router
  // revalidation se gère page par page si besoin
  // experimental: { reactCompiler: false },
};

module.exports = nextConfig;
