export const metadata = {
  title: "Montelion Capital",
  description: "Secure workspace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-page antialiased">
        {/* Centre vertical + horizontal, avec marges mobiles */}
        <div className="min-h-screen flex items-center justify-center p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
