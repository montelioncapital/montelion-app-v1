/** @type {import('next').NextConfig} */
const nextConfig = {
  // On tourne en mode serveur Node, pas d'export statique
  output: 'standalone', // (optionnel mais top pour Docker)
  reactStrictMode: true,
};

module.exports = nextConfig;
