// app/(auth)/layout.jsx
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 md:px-10">
      {children}
    </div>
  );
}
