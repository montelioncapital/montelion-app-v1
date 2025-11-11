// app/app/layout.jsx
import "../../globals.css";   // ⬅️ ajoute cette ligne (chemin depuis app/app/*)

export const metadata = {
  title: "Montelion Capital",
  description: "Trading & analytics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
