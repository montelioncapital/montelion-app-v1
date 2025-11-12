export const metadata = {
  title: "Montelion Capital",
  description: "Secure workspace",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* corps plein écran, fond sombre, centrage vertical/horizontal */}
      <body className="bg-page min-h-screen">
        <div
          className="
            min-h-screen
            flex
            items-start md:items-center
            justify-center
            px-4 sm:px-6
            py-10 md:py-16
          "
        >
          {/* conteneur centré commun à toutes les pages */}
          {children}
        </div>
      </body>
    </html>
  );
}
