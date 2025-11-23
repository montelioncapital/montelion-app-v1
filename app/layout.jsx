// app/layout.jsx
import "./globals.css";
import AppShell from "./AppShell";

export const metadata = {
  title: "Montelion Capital",
  description: "Secure workspace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="app-viewport bg-page text-slate-100 antialiased">
        {/* Fond dégradé global */}
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_600px_at_50%_-200px,#101b4a_0%,#0b1226_35%,#070d1a_60%,#050814_100%)]" />
        {/* Layout applicatif */}
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
