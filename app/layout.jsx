import "./globals.css";

export const metadata = {
  title: "Montelion Capital",
  description: "Trading & analytics platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
