// app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "Montelion Capital",
  description: "Trading & analytics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen bg-[#0b0f14] text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
