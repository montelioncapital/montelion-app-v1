// app/layout.jsx
import "./globals.css";
import AppShell from "./AppShell";

export const metadata = {
  title: "Montelion",
  description: "Secure workspace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-[#020617] text-slate-200 antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
