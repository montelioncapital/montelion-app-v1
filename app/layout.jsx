// app/layout.jsx
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Montelion Capital",
  description: "Trading & analytics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.className} bg-app min-h-dvh`}>{children}</body>
    </html>
  );
}
