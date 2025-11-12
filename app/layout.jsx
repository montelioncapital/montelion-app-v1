export const metadata = {
  title: "Montelion Capital",
  description: "Secure workspace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
