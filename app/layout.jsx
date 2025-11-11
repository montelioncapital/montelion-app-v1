export const metadata = {
  title: "Montelion Capital",
  description: "Secure access to your Montelion Capital workspace.",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen selection:bg-accent/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
