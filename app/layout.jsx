import "./globals.css";

export const metadata = {
  title: "Montelion Capital",
  description: "Secure workspace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen grid place-items-center bg-fixed text-white">
        {/* fixed background gradient (validé) */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(59,91,254,.35),transparent_60%),radial-gradient(900px_400px_at_20%_20%,rgba(102,126,234,.15),transparent_60%),radial-gradient(900px_400px_at_80%_25%,rgba(59,91,254,.18),transparent_60%),linear-gradient(rgb(10,15,25),rgb(10,15,25))]" />

        {/* global card wrapper */}
        <main
          className="
            relative w-[720px] h-[560px]
            max-w-[92vw] max-h-[90vh]
            rounded-3xl
            bg-black/70 supports-[backdrop-filter]:bg-black/55
            border border-white/10 backdrop-blur-sm
            p-8 flex flex-col justify-center
          "
        >
          {children}
        </main>
      </body>
    </html>
  );
}
