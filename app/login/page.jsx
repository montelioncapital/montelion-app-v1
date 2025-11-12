export const metadata = { title: "Sign in • Montelion Capital" };

import LoginForm from "./LoginForm";

export default function Page() {
  return (
    <div className="mc-shell">
      <div className="mc-card">
        <div className="mc-section">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
