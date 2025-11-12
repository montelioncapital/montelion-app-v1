// app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "Montelion Capital",
  description: "Secure workspace",
  icons: {
    // On pointe sur ton fichier à la racine du repo
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png", sizes: "192x192" },
    ],
    // on réutilise le même fichier pour Apple (idéalement un 180x180 dédié)
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-[100svh] md:min-h-dvh bg-page text-slate-200 antialiased">
        {/* Gradient de fond fixé */}
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_600px_at_50%_-200px,#101b4a_0%,#0b1226_35%,#070d1a_60%,#070b14_100%)]" />

        {/* Zone de page : centré partout */}
        <div className="relative min-h-[100svh] md:min-h-dvh flex items-center justify-center px-4 py-10 md:py-14">
          {children}
        </div>
      </body>
    </html>
  );
}
