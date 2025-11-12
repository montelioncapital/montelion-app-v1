export const metadata = {
  title: "Montelion Capital",
  description: "Secure workspace access",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-app text-white antialiased">
        {/* Subtle dots grid */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:20px_20px]"
        />
        {/* Smooth hero glow (top center) */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 overflow-hidden"
        >
          <div className="absolute left-1/2 top-[-18rem] h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(58,90,255,0.35),rgba(58,90,255,0.18)_40%,transparent_70%)] blur-[80px]" />
          <div className="absolute left-1/2 top-[40%] h-[40rem] w-[70rem] -translate-x-1/2 rounded-[9999px] bg-[radial-gradient(closest-side,rgba(21,31,56,0.9),transparent_70%)] blur-[60px]" />
        </div>

        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
