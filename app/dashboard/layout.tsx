// app/(public)/layout.jsx
export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-transparent">
      {children}
    </div>
  );
}
