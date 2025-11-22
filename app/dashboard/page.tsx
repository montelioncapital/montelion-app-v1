"use client";

import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

/* -------------------- MOCK DATA -------------------- */

// KPI mock
const pnlSummary = {
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
  { month: "Jan", value: 1200, percent: 1.5 },
  { month: "Feb", value: 3100, percent: 3.8 },
  { month: "Mar", value: 5200, percent: 6.2 },
  { month: "Apr", value: 4900, percent: 5.7 },
  { month: "May", value: 6100, percent: 7.1 },
  { month: "Jun", value: 7200, percent: 8.3 },
  { month: "Jul", value: 8400, percent: 9.5 },
  { month: "Aug", value: 9100, percent: 10.1 },
  { month: "Sep", value: 10300, percent: 11.3 },
  { month: "Oct", value: 11450, percent: 12.6 },
  { month: "Nov", value: 12600, percent: 13.9 },
  { month: "Dec", value: 13900, percent: 15.1 },
];

type DailyPerf = {
  date: string; // "YYYY-MM-DD"
  value: number;
  percent: number;
};

// Exemple : perfs uniquement sur un mois (mock)
const dailyPerf: DailyPerf[] = [
  { date: "2025-11-01", value: 120, percent: 0.15 },
  { date: "2025-11-02", value: -80, percent: -0.1 },
  { date: "2025-11-03", value: 150, percent: 0.2 },
  { date: "2025-11-04", value: 40, percent: 0.05 },
  { date: "2025-11-05", value: -25, percent: -0.03 },
  { date: "2025-11-06", value: 90, percent: 0.11 },
  { date: "2025-11-07", value: 230, percent: 0.28 },
];

const dailyPerfMap: Record<string, DailyPerf> = dailyPerf.reduce(
  (acc, d) => ({ ...acc, [d.date]: d }),
  {}
);

/* -------------------- HELPERS -------------------- */

function getPerfForDate(dateStr: string) {
  return dailyPerfMap[dateStr];
}

function getMonthDays(year: number, monthIndex: number) {
  const days: Date[] = [];
  const date = new Date(year, monthIndex, 1);
  while (date.getMonth() === monthIndex) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function getPerfColor(value: number) {
  if (value > 0) {
    if (value > 200) return "bg-emerald-500/70";
    if (value > 100) return "bg-emerald-500/50";
    return "bg-emerald-500/30";
  }
  if (value < 0) {
    if (value < -200) return "bg-rose-500/70";
    if (value < -100) return "bg-rose-500/50";
    return "bg-rose-500/30";
  }
  return "bg-slate-800/40";
}

/* -------------------- COMPONENTS -------------------- */

type PnlCardProps = {
  title: string;
  subtitle: string;
  value: number;
  percent?: number;
  isBalance?: boolean;
};

function PnlCard({ title, subtitle, value, percent, isBalance }: PnlCardProps) {
  const positive = (percent ?? 0) >= 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#05070b] px-6 py-5 shadow-[0_0_0_1px_rgba(15,23,42,0.6)]">
      {/* Ligne bleue comme sur l'ancien design */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[radial-gradient(circle_at_0%_50%,rgba(0,0,0,0)_0,rgba(0,0,0,0.85)_40%,#2564ec_90%),radial-gradient(circle_at_100%_50%,rgba(0,0,0,0)_0,rgba(0,0,0,0.85)_40%,#2564ec_90%)]" />
      <div className="text-sm font-medium text-slate-300">{title}</div>
      <div className="mt-1 text-xs text-slate-500">{subtitle}</div>
      <div className="mt-4 text-3xl font-semibold tracking-tight">
        {isBalance ? (
          value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })
        ) : (
          <>
            {value >= 0 ? "+" : "-"}
            {Math.abs(value).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            })}
          </>
        )}
      </div>
      {percent !== undefined && (
        <div
          className={[
            "mt-1 text-sm font-medium",
            positive ? "text-emerald-400" : "text-rose-400",
          ].join(" ")}
        >
          {positive ? "+" : ""}
          {percent.toFixed(2)}%{" "}
          <span className="text-xs text-slate-500 ml-1">
            {positive ? "profit" : "loss"}
          </span>
        </div>
      )}
    </div>
  );
}

const CustomLineTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload as MonthlyPoint;

  return (
    <div className="rounded-xl border border-white/10 bg-[#05070b] px-3 py-2 text-xs shadow-xl">
      <div className="font-medium text-slate-100 mb-1">{label}</div>
      <div className="text-slate-300">
        PNL:{" "}
        {data.value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        })}
      </div>
      <div
        className={
          data.percent >= 0 ? "text-emerald-400 mt-0.5" : "text-rose-400 mt-0.5"
        }
      >
        {data.percent >= 0 ? "+" : ""}
        {data.percent.toFixed(2)}%
      </div>
    </div>
  );
};

/* -------------------- MAIN PAGE -------------------- */

const weekDayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DashboardPage() {
  // Mois actuel par défaut
  const now = useMemo(() => new Date(), []);
  const [year, setYear] = useState(now.getFullYear());
  const [monthIndex, setMonthIndex] = useState(now.getMonth()); // 0-11

  const daysOfMonth = useMemo(
    () => getMonthDays(year, monthIndex),
    [year, monthIndex]
  );

  const monthLabel = useMemo(
    () =>
      new Date(year, monthIndex).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      }),
    [year, monthIndex]
  );

  const todayKey = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const handlePrevMonth = () => {
    setMonthIndex((prev) => {
      if (prev === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setMonthIndex((prev) => {
      if (prev === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
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
          subtitle="Current total account balance"
          value={pnlSummary.balance}
          isBalance
        />
        <PnlCard
          title="PNL Today"
          subtitle="Performance of the current day"
          value={pnlSummary.day.value}
          percent={pnlSummary.day.percent}
        />
        <PnlCard
          title="PNL This Month"
          subtitle="Performance in the current month"
          value={pnlSummary.month.value}
          percent={pnlSummary.month.percent}
        />
        <PnlCard
          title="PNL All Time"
          subtitle="Performance since the beginning"
          value={pnlSummary.allTime.value}
          percent={pnlSummary.allTime.percent}
        />
      </section>

      {/* Graph + Calendrier empilés */}
      <section className="flex flex-col gap-6">
        {/* Graphique PNL mensuel */}
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#05070b] p-6">
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

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyPnl}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  stroke="rgba(148, 163, 184, 0.15)"
                  vertical={false}
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                />
                <Tooltip content={<CustomLineTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 3, strokeWidth: 1 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Calendrier de performance quotidienne */}
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#05070b] p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                Daily Performance Calendar
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Each day shows your daily PNL. Hover to see exact numbers.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="h-7 w-7 flex items-center justify-center rounded-lg border border-white/10 bg-black/40 hover:bg-white/10"
              >
                ‹
              </button>
              <span className="min-w-[110px] text-center">{monthLabel}</span>
              <button
                type="button"
                onClick={handleNextMonth}
                className="h-7 w-7 flex items-center justify-center rounded-lg border border-white/10 bg-black/40 hover:bg-white/10"
              >
                ›
              </button>
            </div>
          </div>

          {/* En-tête jours */}
          <div className="grid grid-cols-7 gap-1 mb-2 text-[11px] text-slate-500">
            {weekDayLabels.map((d) => (
              <div key={d} className="text-center">
                {d}
              </div>
            ))}
          </div>

          {/* Grille des jours */}
          <div className="grid grid-cols-7 gap-1 text-[11px]">
            {(() => {
              const firstDay = daysOfMonth[0].getDay(); // 0 = Sunday
              const leadingEmpty = (firstDay + 6) % 7; // Monday start

              const cells: React.ReactNode[] = [];

              // Cases vides avant le 1er
              for (let i = 0; i < leadingEmpty; i++) {
                cells.push(
                  <div key={`empty-${i}`} className="h-10 rounded-lg" />
                );
              }

              // Les jours du mois
              for (const date of daysOfMonth) {
                const day = date.getDate();
                const key = `${year}-${String(monthIndex + 1).padStart(
                  2,
                  "0"
                )}-${String(day).padStart(2, "0")}`;
                const perf = getPerfForDate(key);
                const value = perf?.value ?? 0;
                const percent = perf?.percent ?? 0;

                const hasPerf = perf !== undefined;
                const bgClass = hasPerf ? getPerfColor(value) : "bg-slate-800/40";
                const isToday = key === todayKey;

                cells.push(
                  <div
                    key={key}
                    className={[
                      "group relative flex h-10 flex-col items-center justify-center rounded-lg border text-center px-1",
                      bgClass,
                      isToday
                        ? "border-emerald-300/70 shadow-[0_0_0_1px_rgba(16,185,129,0.7)]"
                        : "border-white/5",
                    ].join(" ")}
                  >
                    <div className="flex w-full items-center justify-between text-[10px] text-slate-100">
                      <span>{day}</span>
                      {hasPerf && (
                        <span className="font-medium">
                          {value >= 0 ? "+" : "-"}$
                          {Math.abs(value).toFixed(0)}
                        </span>
                      )}
                    </div>

                    {hasPerf && (
                      <div className="pointer-events-none absolute -top-2 left-1/2 z-20 hidden -translate-y-full -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#05070b] px-2 py-1 text-[11px] text-slate-100 shadow-xl group-hover:block">
                        <div>
                          PNL:{" "}
                          {value.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                          })}
                        </div>
                        <div
                          className={
                            percent >= 0 ? "text-emerald-400" : "text-rose-400"
                          }
                        >
                          {percent >= 0 ? "+" : ""}
                          {percent.toFixed(2)}%
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return cells;
            })()}
          </div>
        </div>
      </section>
    </div>
  );
}
