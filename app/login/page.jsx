// app/login/page.jsx

import LoginForm from "./LoginForm";

export const metadata = {
  title: "Sign in | Montelion Capital",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        <LoginForm />
      </div>
    </main>
  );
}
