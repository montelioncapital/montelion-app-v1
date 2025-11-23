// app/page.tsx

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-100">
      {/* Background glow */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(37,100,236,0.55), transparent 60%), radial-gradient(circle at 100% 0%, rgba(15,23,42,0.9), transparent 55%)",
        }}
      />

      {/* Page wrapper */}
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-6 md:px-8 md:pt-8">
        {/* NAVBAR */}
        <header className="flex items-center justify-between gap-4 pb-6 md:pb-8">
          <div className="flex items-center gap-2">
            <img
              src="/logo-montelion-02.svg"
              alt="Montelion Capital"
              className="h-7 w-auto"
            />
            <span className="hidden text-xs font-medium tracking-[0.22em] text-slate-400 sm:inline">
              CAPITAL
            </span>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#product" className="hover:text-white">
              Product
            </a>
            <a href="#how-it-works" className="hover:text-white">
              How it works
            </a>
            <a href="#performance" className="hover:text-white">
              Performance
            </a>
            <a href="#security" className="hover:text-white">
              Security
            </a>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden rounded-full border border-slate-700/70 bg-black/30 px-4 py-2 text-xs font-medium tracking-[0.16em] text-slate-100 hover:border-slate-500 md:inline-flex"
            >
              LAUNCH APP
            </Link>
            <a
              href="#contact"
              className="inline-flex rounded-full bg-[#2564ec] px-4 py-2 text-xs font-semibold tracking-[0.16em] text-white shadow-[0_0_30px_rgba(37,100,236,0.7)] hover:bg-[#1f4fc0]"
            >
              REQUEST ACCESS
            </a>
          </div>
        </header>

        {/* HERO */}
        <section
          id="product"
          className="grid flex-1 gap-10 pb-14 pt-4 md:grid-cols-[1.1fr_minmax(0,1fr)] md:pb-20"
        >
          {/* Left */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-black/40 px-3 py-1 text-[11px] text-slate-300">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live trading infrastructure for private investors
            </div>

            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              Put your capital{" "}
              <span className="bg-gradient-to-r from-[#2564ec] via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                on autopilot
              </span>{" "}
              with institutional-grade strategies.
            </h1>

            <p className="mt-4 max-w-xl text-sm text-slate-400 md:text-base">
              Montelion connects your exchange account to a monitored trading
              engine. You keep custody of your assets – we manage the execution,
              risk and strategy.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[#2564ec] px-5 py-2.5 text-xs font-semibold tracking-[0.16em] text-white shadow-[0_0_40px_rgba(37,100,236,0.8)] hover:bg-[#1f4fc0]"
              >
                REQUEST A CALL
              </a>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-black/40 px-5 py-2.5 text-xs font-semibold tracking-[0.16em] text-slate-100 hover:border-slate-400"
              >
                VIEW DEMO DASHBOARD
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-6 text-xs text-slate-400">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  AUM PROTECTED
                </div>
                <div className="mt-1 text-base font-semibold text-slate-100">
                  Your assets stay on your exchange
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  FEES
                </div>
                <div className="mt-1 text-base font-semibold text-slate-100">
                  Performance-based only
                </div>
              </div>
            </div>
          </div>

          {/* Right - fake dashboard preview card */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgba(37,100,236,0.6),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(15,23,42,0.9),transparent_55%)] opacity-80" />
            <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-[#020617]/80 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-xs font-semibold">
                    DU
                  </div>
                  <div>
                    <div className="text-xs font-medium">Demo Investor</div>
                    <div className="text-[11px] text-slate-500">
                      Connected exchange: Bybit
                    </div>
                  </div>
                </div>
                <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-400">
                  Strategy: Active PNL
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <MetricCard
                  label="Balance"
                  value="$206,190"
                  chip="+$3,240 today"
                  tone="neutral"
                />
                <MetricCard
                  label="PNL today"
                  value="+$210"
                  chip="+0.32%"
                  tone="positive"
                />
                <MetricCard
                  label="PNL this month"
                  value="+$3,250"
                  chip="+4.7%"
                  tone="positive"
                />
              </div>

              <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Equity curve (last 12 months)</span>
                  <span>+38.4% net</span>
                </div>
                <div className="mt-3 h-32 rounded-xl bg-gradient-to-tr from-[#0b1220] via-[#020617] to-[#020617]">
                  {/* decorative pseudo-graph */}
                  <div className="relative h-full w-full overflow-hidden rounded-xl">
                    <div className="absolute inset-x-4 bottom-4 h-[2px] bg-slate-800/80" />
                    <div className="absolute inset-y-4 left-6 w-[2px] bg-slate-800/80" />
                    <div className="absolute inset-4">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#2564ec] via-sky-400 to-indigo-400 opacity-80 blur-xl" />
                      <div className="absolute inset-1 border border-slate-800/60" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
                <span>Non-custodial · You can disconnect at any time</span>
                <span>Made for private investors</span>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="pb-12">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
            TRUSTED INFRASTRUCTURE
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span>Works with leading exchanges & secure APIs:</span>
            <div className="flex flex-wrap gap-3 text-[11px] text-slate-400">
              <Badge>Bybit</Badge>
              <Badge>Binance</Badge>
              <Badge>OKX</Badge>
              <Badge>KuCoin</Badge>
              <Badge>More on request</Badge>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="grid gap-6 border-y border-slate-800/70 py-10 md:grid-cols-[1.1fr_minmax(0,1fr)]"
        >
          <div>
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              A simple, transparent way to have{" "}
              <span className="bg-gradient-to-r from-[#2564ec] via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                your account traded for you
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-slate-400">
              Montelion connects to your existing exchange account via API,
              applies a proven trading framework and gives you full visibility
              on every position in real time.
            </p>

            <div className="mt-5 grid gap-3 text-sm text-slate-300">
              <StepItem
                index="01"
                title="Connect your exchange account"
                description="Create read & trade-only API keys on your exchange, then plug them into Montelion. We never ask for withdraw access."
              />
              <StepItem
                index="02"
                title="Select a strategy & risk profile"
                description="Choose a Montelion strategy calibrated to your capital, risk tolerance and time horizon."
              />
              <StepItem
                index="03"
                title="Let the engine trade for you"
                description="Our infrastructure handles entries, exits and risk management. You can log in at any time and monitor PNL from the dashboard."
              />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <MiniBulletCard
              title="Non-custodial by design"
              description="Your assets stay on your own exchange account. You can revoke access in one click."
            />
            <MiniBulletCard
              title="Risk-managed execution"
              description="Position sizing, max loss per day and other parameters are built into the strategy logic."
            />
            <MiniBulletCard
              title="Real-time transparency"
              description="Every open position, PNL and fee is visible from your Montelion dashboard."
            />
          </div>
        </section>

        {/* PERFORMANCE */}
        <section id="performance" className="space-y-8 py-12">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                Performance & risk,{" "}
                <span className="bg-gradient-to-r from-[#2564ec] to-sky-400 bg-clip-text text-transparent">
                  explained clearly
                </span>
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-400">
                View your account like a fund manager: equity curve, daily PNL,
                drawdowns and risk metrics all in one place.
              </p>
            </div>

            <div className="grid gap-3 text-xs text-slate-300 md:grid-cols-3">
              <MetricChip label="All-time net PNL" value="+38.4%" tone="positive" />
              <MetricChip label="Best month" value="+12.1%" tone="positive" />
              <MetricChip label="Max drawdown" value="-7.8%" tone="negative" />
            </div>
          </div>

          {/* Big chart placeholder */}
          <div className="overflow-hidden rounded-3xl border border-slate-800/80 bg-[#020617]/80 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.85)]">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
              <div className="text-sm font-medium text-slate-100">
                Simulated equity curve
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="rounded-full bg-[#0f172a] px-3 py-1">
                  Timeframe: 12 months
                </span>
                <span className="rounded-full border border-emerald-500/40 bg-emerald-500/5 px-3 py-1 text-emerald-300">
                  Hypothetical performance – for illustration
                </span>
              </div>
            </div>

            <div className="h-72 rounded-2xl bg-gradient-to-b from-[#020617] via-[#020617] to-[#020617]">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-800/80">
                {/* Grid */}
                <div className="absolute inset-0">
                  <div className="absolute inset-x-0 top-1/4 h-px bg-slate-800/60" />
                  <div className="absolute inset-x-0 top-2/4 h-px bg-slate-800/40" />
                  <div className="absolute inset-x-0 top-3/4 h-px bg-slate-800/20" />
                </div>
                {/* Curve glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,rgba(37,100,236,0.9),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.7),transparent_55%)] opacity-80" />
                {/* Mask to simulate curve */}
                <div className="absolute inset-3 rounded-2xl border border-slate-800/80" />
              </div>
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section
          id="security"
          className="grid gap-8 border-y border-slate-800/80 py-12 md:grid-cols-[1.1fr_minmax(0,1fr)]"
        >
          <div>
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Security & control{" "}
              <span className="bg-gradient-to-r from-[#2564ec] to-indigo-400 bg-clip-text text-transparent">
                built into the process
              </span>
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-400">
              Montelion is designed for people who refuse to compromise on
              custody. You stay in control of your funds, we only receive the
              permissions strictly required to trade.
            </p>
          </div>

          <div className="grid gap-4 text-sm text-slate-200 md:grid-cols-2">
            <SecurityPoint
              title="API-only connection"
              body="We connect to your exchange account through API keys with trading permission only. Withdrawals stay disabled."
            />
            <SecurityPoint
              title="Isolated strategies"
              body="Each strategy is isolated and follows pre-defined risk parameters: max leverage, max position size, max daily loss."
            />
            <SecurityPoint
              title="Full transparency"
              body="Every order is visible from your exchange as well as the Montelion dashboard – no black box."
            />
            <SecurityPoint
              title="Instant revocation"
              body="You can delete your API keys at any time from your exchange to immediately disconnect Montelion."
            />
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-12">
          <div className="text-center">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Simple, aligned{" "}
              <span className="bg-gradient-to-r from-[#2564ec] to-sky-400 bg-clip-text text-transparent">
                performance-based fees
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              We only win when you win. No management fees, no hidden
              commissions.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-slate-800/80 bg-[#020617]/80 p-6 text-sm shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
            <div className="flex items-center justify-between gap-3">
              <div className="text-left">
                <div className="text-xs font-medium tracking-[0.18em] text-slate-500">
                  STANDARD MODEL
                </div>
                <div className="mt-1 text-lg font-semibold text-slate-100">
                  Performance fee on net new profits
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  High-water mark structure: once a profit is locked, it becomes
                  the new reference level. You never pay twice for the same
                  performance.
                </p>
              </div>
              <div className="flex flex-col items-end text-right">
                <div className="text-3xl font-semibold text-slate-50">20%</div>
                <div className="text-[11px] text-slate-500">
                  On realized net profits
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-2 text-xs text-slate-300 md:grid-cols-3">
              <PricingPoint>0% management fee</PricingPoint>
              <PricingPoint>No lock-up period</PricingPoint>
              <PricingPoint>Fees calculated monthly</PricingPoint>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
              <span>Custom terms available for high-net-worth profiles.</span>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-slate-700/80 bg-black/30 px-3 py-1 font-medium text-slate-100 hover:border-slate-400"
              >
                Talk to us
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="grid gap-10 border-t border-slate-800/80 py-12 md:grid-cols-[1.1fr_minmax(0,1fr)]">
          <div>
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              If you have any other questions, you can always reach out and our
              team will walk you through the process step by step.
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <FaqItem
              question="Do you ever hold my funds?"
              answer="No. Your assets always stay on your own exchange account. Montelion only places and manages trades via API with trading permission enabled, never withdrawals."
            />
            <FaqItem
              question="Can I still trade manually on my account?"
              answer="No. Once Montelion is connected and the strategy is active, manual trading on the same account will break risk assumptions. We require that you do not place personal trades on a connected account."
            />
            <FaqItem
              question="Which exchanges do you support?"
              answer="We currently support major centralized exchanges such as Bybit, Binance, OKX and KuCoin for USDT-margined futures. Additional venues can be added on request."
            />
            <FaqItem
              question="Can I stop at any time?"
              answer="Yes. You can revoke your API keys directly from your exchange, or ask us to pause trading. Performance fees are only calculated on realized net profits up to that date."
            />
          </div>
        </section>

        {/* CONTACT / FOOTER CTA */}
        <section
          id="contact"
          className="mt-4 rounded-3xl border border-slate-800/80 bg-[radial-gradient(circle_at_0%_0%,rgba(37,100,236,0.7),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(15,23,42,1),transparent_55%)] px-6 py-8 text-sm shadow-[0_24px_80px_rgba(0,0,0,0.9)] md:px-10 md:py-10"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-200/80">
                READY WHEN YOU ARE
              </div>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Book a call to see if Montelion fits your capital.
              </h3>
              <p className="mt-2 max-w-lg text-sm text-slate-100/80">
                Share your situation, objectives and constraints. We&apos;ll be
                upfront about whether our trading engine is a good match for
                you.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:contact@montelion-capital.com"
                className="inline-flex items-center justify-center rounded-full bg-white/90 px-6 py-2.5 text-xs font-semibold tracking-[0.16em] text-slate-900 hover:bg-white"
              >
                CONTACT@MONTELION-CAPITAL.COM
              </a>
              <span className="text-[11px] text-slate-100/80">
                Or request access from inside the app once your account is
                created.
              </span>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-10 flex flex-col gap-3 border-t border-slate-900/80 pt-6 text-[11px] text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <img
              src="/logo-montelion-02.svg"
              alt="Montelion Capital"
              className="h-4 w-auto"
            />
            <span>© {new Date().getFullYear()} Montelion Capital. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <span>Non-custodial trading infrastructure, not an exchange.</span>
            <span>Crypto trading involves risk of loss of capital.</span>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* ---------- SMALL REUSABLE PIECES (no TS types to avoid build issues) ---------- */

function MetricCard({
  label,
  value,
  chip,
  tone,
}: {
  label: string;
  value: string;
  chip: string;
  tone: "positive" | "negative" | "neutral";
}) {
  const chipColor =
    tone === "positive"
      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/40"
      : tone === "negative"
      ? "bg-rose-500/10 text-rose-300 border-rose-500/40"
      : "bg-slate-800/60 text-slate-300 border-slate-700/80";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3">
      <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-lg font-semibold text-slate-100">
        {value}
      </div>
      <div
        className={
          "mt-2 inline-flex rounded-full border px-2.5 py-1 text-[11px] " +
          chipColor
        }
      >
        {chip}
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-700/70 bg-black/30 px-3 py-1 text-[11px]">
      {children}
    </span>
  );
}

function StepItem({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0b1220] text-[11px] font-semibold text-slate-200">
        {index}
      </div>
      <div>
        <div className="text-sm font-medium text-slate-100">{title}</div>
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>
    </div>
  );
}

function MiniBulletCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
      <div className="text-xs font-semibold text-slate-100">{title}</div>
      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  );
}

function MetricChip({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "positive" | "negative" | "neutral";
}) {
  const colorClasses =
    tone === "positive"
      ? "text-emerald-300"
      : tone === "negative"
      ? "text-rose-300"
      : "text-slate-200";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-2">
      <div className="text-[11px] text-slate-500">{label}</div>
      <div className={"mt-1 text-sm font-semibold " + colorClasses}>
        {value}
      </div>
    </div>
  );
}

function SecurityPoint({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-100">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2564ec]" />
        {title}
      </div>
      <p className="mt-1.5 text-xs text-slate-400">{body}</p>
    </div>
  );
}

function PricingPoint({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-block h-1 w-1 rounded-full bg-slate-400" />
      <span>{children}</span>
    </div>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-medium text-slate-100">
        <span>{question}</span>
        <span className="text-slate-500 group-open:hidden">+</span>
        <span className="hidden text-slate-500 group-open:inline">−</span>
      </summary>
      <p className="mt-2 text-xs text-slate-400">{answer}</p>
    </details>
  );
}
