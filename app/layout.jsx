export const metadata = {
  title: "Montelion Capital",
  description: "Secure workspace",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
