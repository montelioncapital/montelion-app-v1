"use client";

import React, { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* -------------------- MOCK DATA -------------------- */

type PnlSummary = {
  balance: number;
  day: { value: number; percent: number };
  month: { value: number; percent: number };
  allTime: { value: number; percent: number };
};

const pnlSummary: PnlSummary = {
  balance: 250000.75,
  day: { value: 210.75, percent: 0.3 },
  month: { value: 3250.43, percent: 4.7 },
  allTime: { value: 42650.32, percent: 38.4 },
};

type MonthlyPoint = {
  month: string;
  value: number;
  percent: number;
};

const monthlyPnl: MonthlyPoint[] = [
  { month: "Jan", value: 2800, percent: 1.5 },
  { month: "Feb", value: 3400, percent: 3.1 },
  { month: "Mar", value: 4100, percent: 4.8 },
  { month: "Apr", value: 3950, percent: 4.2 },
  { month: "May", value: 4500, percent: 5.3 },
  { month: "Jun", value: 4950, percent: 5.9 },
  { month: "Jul", value: 5400, percent: 6.5 },
  { month: "Aug", value: 5850, percent: 7.1 },
  { month: "Sep", value: 6300, percent: 7.8 },
  { month: "Oct", value: 6750, percent: 8.4 },
  { month: "Nov", value: 7200, percent: 9.0 },
  { month: "Dec", value: 7650, percent: 9.7 },
];

type DailyPerf = {
  date: string; // "YYYY-MM-DD"
  value: number;
  percent: number;
};

// Exemple de perf (tu pourras brancher tes vraies données plus tard)
const dailyPerf: DailyPerf[] = [
  { date: "2025-11-01", value: 120, percent: 0.15 },
  { date: "2025-11-02", value: -80, percent: -0.1 },
  { date: "2025-11-03", value: 150, percent: 0.2 },
  { date: "2025-11-04", value: 40, percent: 0.05 },
  { date: "2025-11-05", value: -25, percent: -0.03 },
  { date: "2025-11-06", value: 90, percent: 0.11 },
  { date: "2025-11-07", value: 230, percent: 0.28 },
  { date: "2025-11-20", value: -3554.86, percent: -2.1 },
  { date: "2025-11-21", value: -5055.31, percent: -3.4 },
];

/* -------------------- HELPERS -------------------- */

const weekDayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getMonthDays(year: number, monthIndex: number): Date[] {
  const days: Date[] = [];
  const date = new Date(year, monthIndex, 1);
  while (date.getMonth() === monthIndex) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getPerfColorBg(value: number): string {
  if (value > 0) {
    if (value > 200) return "bg-emerald-500/15 border-emerald-500/40";
    if (value > 100) return "bg-emerald-500/10 border-emerald-500/35";
    return "bg-emerald-500/5 border-emerald-500/30";
  }
  if (value < 0) {
    if (value < -2000) return "bg-rose-500/15 border-rose-500/50";
    if (value < -500) return "bg-rose-500/10 border-rose-500/40";
    return "bg-rose-500/5 border-rose-500/35";
  }
  return "bg-slate-900/70 border-white/5";
}

/* -------------------- COMPONENTS -------------------- */

function PnlCard({
  title,
  value,
  percent,
  showPercent = true,
}: {
  title: string;
  value: number;
  percent: number;
  showPercent?: boolean;
}) {
  const positive = percent >= 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#05070b] px-6 py-5 shadow-[0_0_0_1px_rgba(15,23,42,0.6)]">
      {/* LIGNE BLEUE (NE PLUS CHANGER) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[linear-gradient(to_right,#020617_0%,#020617_20%,#2564ec_50%,#020617_80%,#020617_100%)]" />

      {/* Titre + % aligné à droite */}
      <div className="flex items-start justify-between">
        <div className="text-sm font-medium text-slate-300">{title}</div>

        {showPercent && (
          <div
            className={[
              "text-xs font-medium text-right",
              positive ? "text-emerald-400" : "text-rose-400",
            ].join(" ")}
          >
            {positive ? "+" : ""}
            {percent.toFixed(2)}%
          </div>
        )}
      </div>

      {/* Valeur principale */}
      <div className="mt-4 text-3xl font-semibold tracking-tight">
        {value >= 0 ? "+" : "-"}
        {Math.abs(value).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 2,
        })}
      </div>
    </div>
  );
}

/* -------------------- MAIN PAGE -------------------- */

export default function DashboardPage() {
  const today = new Date();

  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(
    today.getMonth()
  );

  const daysOfMonth = useMemo(
    () => getMonthDays(currentYear, currentMonthIndex),
    [currentYear, currentMonthIndex]
  );

  const perfByDate = useMemo(() => {
    const map = new Map<string, DailyPerf>();
    for (const p of dailyPerf) {
      map.set(p.date, p);
    }
    return map;
  }, []);

  const goPrevMonth = () => {
    setCurrentMonthIndex((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const goNextMonth = () => {
    setCurrentMonthIndex((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const isToday = (date: Date) => {
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  return (
    <div className="relative z-10 flex flex-col gap-8">
      {/* Titre */}
      <div className="mt-6 md:mt-0">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Overview of your trading performance and PNL.
        </p>
      </div>

      {/* KPI */}
      <section className="grid gap-4 md:grid-cols-4">
        <PnlCard
          title="BALANCE"
          value={pnlSummary.balance}
          percent={0}
          showPercent={false}
        />
        <PnlCard
          title="PNL Today"
          value={pnlSummary.day.value}
          percent={pnlSummary.day.percent}
        />
        <PnlCard
          title="PNL This Month"
          value={pnlSummary.month.value}
          percent={pnlSummary.month.percent}
        />
        <PnlCard
          title="PNL All Time"
          value={pnlSummary.allTime.value}
          percent={pnlSummary.allTime.percent}
        />
      </section>

      {/* Graphique PNL mensuel - Montelion */}
      <section className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#05070b] p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-100">
              PNL Evolution (by month)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Hover the curve to see detailed PNL (value &amp; %).
            </p>
          </div>
        </div>

        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlyPnl}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="montelionBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.45} />
                  <stop offset="70%" stopColor="#2563eb" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.05} />
                </linearGradient>

                <filter
                  id="shadowGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="6"
                    floodColor="#3b82f6"
                    floodOpacity="0.45"
                  />
                </filter>
              </defs>

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload || !payload.length) return null;
                  const d = payload[0].payload as MonthlyPoint;

                  return (
                    <div className="rounded-xl border border-white/10 bg-black/70 backdrop-blur-lg px-3 py-2 text-xs shadow-2xl">
                      <div className="text-slate-200 font-medium">{label}</div>
                      <div className="text-slate-300 mt-1">
                        {d.value.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                        })}
                      </div>
                      <div
                        className={`mt-1 font-medium ${
                          d.percent >= 0 ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {d.percent >= 0 ? "+" : ""}
                        {d.percent.toFixed(2)}%
                      </div>
                    </div>
                  );
                }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#montelionBlue)"
                dot={{
                  r: 4,
                  stroke: "#ffffff",
                  strokeWidth: 1,
                  fill: "#2563eb",
                }}
                activeDot={{
                  r: 6,
                  strokeWidth: 2,
                  stroke: "#ffffff",
                  fill: "#2563eb",
                  filter: "url(#shadowGlow)",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Calendrier de performance quotidienne (mobile optimisé) */}
      <section className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#05070b] p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-100">
              Daily Performance Calendar
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-300">
            <button
              type="button"
              onClick={goPrevMonth}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/40 hover:bg-white/10"
            >
              ‹
            </button>
            <span className="min-w-[110px] sm:min-w-[130px] text-center">
              {new Date(currentYear, currentMonthIndex).toLocaleString(
                "en-US",
                {
                  month: "long",
                  year: "numeric",
                }
              )}
            </span>
            <button
              type="button"
              onClick={goNextMonth}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/40 hover:bg-white/10"
            >
              ›
            </button>
          </div>
        </div>

        {/* En-tête jours */}
        <div className="grid grid-cols-7 gap-1 mb-2 text-[9px] sm:text-[11px] text-slate-500">
          {weekDayLabels.map((d) => (
            <div key={d} className="text-center uppercase tracking-wide">
              {d}
            </div>
          ))}
        </div>

        {/* Grille des jours */}
        <div className="grid grid-cols-7 gap-1 text-[9px] sm:text-[11px]">
          {(() => {
            const firstDay = daysOfMonth[0].getDay(); // 0 = Sunday
            const leadingEmpty = (firstDay + 6) % 7; // Monday start

            const cells: React.ReactNode[] = [];

            for (let i = 0; i < leadingEmpty; i++) {
              cells.push(
                <div key={`empty-${i}`} className="h-14 sm:h-20 rounded-2xl" />
              );
            }

            for (const date of daysOfMonth) {
              const day = date.getDate();
              const key = formatDateKey(date);
              const perf = perfByDate.get(key);
              const value = perf?.value ?? 0;
              const percent = perf?.percent ?? 0;
              const hasPerf = perf !== undefined;

              const isTodayFlag = isToday(date);

              const positive = value >= 0;
              const amountText =
                hasPerf &&
                `${positive ? "+" : "-"}${Math.abs(value).toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }
                )}`;

              const baseClasses =
                "group flex h-14 sm:h-20 flex-col rounded-2xl border px-1.5 sm:px-2 py-1 bg-slate-900/70 transition-transform hover:-translate-y-0.5";
              const perfBg = hasPerf ? getPerfColorBg(value) : "bg-slate-900/70 border-white/5";

              cells.push(
                <div
                  key={key}
                  className={[
                    baseClasses,
                    perfBg,
                    isTodayFlag
                      ? "ring-2 ring-blue-500/70 ring-offset-[1px] ring-offset-[#05070b]"
                      : "",
                  ].join(" ")}
                >
                  {/* Ligne jour + % */}
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between mb-0.5">
                    <span className="text-[9px] sm:text-[11px] text-slate-300">
                      {day}
                    </span>

                    {hasPerf && (
                      <span
                        className={[
                          "text-[9px] sm:text-[10px] font-semibold",
                          percent >= 0 ? "text-emerald-400" : "text-rose-400",
                        ].join(" ")}
                      >
                        {percent >= 0 ? "+" : ""}
                        {percent.toFixed(2)}%
                      </span>
                    )}
                  </div>

                  {/* Montant */}
                  {hasPerf && (
                    <div className="mt-auto text-[9px] sm:text-[11px] font-medium text-slate-100 text-center sm:text-left">
                      {amountText}
                    </div>
                  )}
                </div>
              );
            }

            return cells;
          })()}
        </div>
      </section>
    </div>
  );
}
