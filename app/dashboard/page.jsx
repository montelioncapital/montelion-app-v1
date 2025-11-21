"use client";

const brandBlue = "#2664EC";

const topStats = [
  {
    label: "Gross Revenue",
    description: "Your revenue from last month",
    value: "$171,610.25",
    change: "+5.29% From last month",
  },
  {
    label: "Auto Trades",
    description: "Amount of bot-trades",
    value: "3,612",
    change: "+1,259 From last month",
  },
  {
    label: "New Assets",
    description: "New assets in portfolio",
    value: "53",
    change: "+21 From last month",
  },
];

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      {/* TOP STATS */}
      <div className="grid gap-5 md:grid-cols-3">
        {topStats.map((card) => (
          <div
            key={card.label}
            className="rounded-3xl border border-white/10 bg-[#05090d] px-6 py-5 relative"
          >
            <div
              className="absolute left-0 right-0 bottom-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${brandBlue}, transparent)`,
              }}
            />

            <p className="text-sm font-medium">{card.label}</p>
            <p className="text-xs text-slate-400">{card.description}</p>
            <div className="mt-5 text-2xl font-semibold">{card.value}</div>
            <div className="mt-1 text-xs text-emerald-400">{card.change}</div>
          </div>
        ))}
      </div>

      {/* BIG CHART */}
      <div className="mt-8 rounded-3xl border border-white/10 bg-[#05090d] px-6 py-6">
        <div className="mb-4">
          <p className="text-sm font-medium">Auto Trades Chart</p>
          <p className="text-xs text-slate-400">
            Chart of your auto-bot trades in last{" "}
            <span className="text-slate-200">14 days</span>
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-black/30 px-4 pt-4 pb-3">
          {/* SVG CHART (inchangé) */}
        </div>
      </div>
    </>
  );
}
