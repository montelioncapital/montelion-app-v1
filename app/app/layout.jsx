export const metadata = { title: "Montelion" };

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: "ui-sans-serif, system-ui", padding: 24 }}>
        {children}
      </body>
    </html>
  );
}
