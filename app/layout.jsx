import "./globals.css";

export const metadata = {
  title: "Montelion Capital",
  description: "Secure workspace",
  icons: {
    icon: "../favicon.svg", // ✅ ton favicon officiel
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-page text-slate-200 antialiased">
        {/* Gradient de fond fixé */}
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_600px_at_50%_-200px,#101b4a_0%,#0b1226_35%,#070d1a_60%,#070b14_100%)]" />

        {/* Zone de page */}
        <div className="relative min-h-dvh flex items-start md:items-center justify-center py-14">
          {children}
        </div>
      </body>
    </html>
  );
}
