// app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "Montelion Capital",
  description: "Secure workspace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen text-white/90 antialiased">
        {/* Background: plus sombre + dégradés propres */}
        <div
          className="
            fixed inset-0 -z-10 bg-[#070b13]
            [background:
              radial-gradient(1200px_700px_at_50%_-220px,rgba(48,74,170,0.32),transparent),
              radial-gradient(900px_560px_at_85%_120%,rgba(18,28,52,0.55),transparent),
              radial-gradient(800px_520px_at_5%_90%,rgba(10,19,38,0.55),transparent)
            ]
          "
        />

        {/* Conteneur centré */}
        <div className="min-h-screen grid place-items-center px-4 py-10">
          {/* Card global (taille fixe, sans ombre) */}
          <main
            className="
              card
              w-[920px] max-w-[92vw] min-h-[540px]
              p-10
            "
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
