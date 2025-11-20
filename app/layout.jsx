// app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "Montelion Capital",
  description: "Secure workspace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-page text-slate-200 antialiased">
        {/* Glow de fond */}
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_600px_at_50%_-200px,#101b4a_0%,#0b1226_35%,#070d1a_60%,#050814_100%)]" />

        {/* Contenu, full screen, SANS flex/centrage global */}
        <div className="relative min-h-screen w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
