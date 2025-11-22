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
    if (value > 200) return "bg-emerald-500/20 border-emerald-500/40";
    if (value > 100) return "bg-emerald-500/15 border-emerald-500/35";
    return "bg-emerald-500/10 border-emerald-500/30";
  }
  if (value < 0) {
    if (value < -2000) return "bg-rose-500/30 border-rose-500/50";
    if (value < -500) return "bg-rose-500/20 border-rose-500/40";
    return "bg-rose-500/15 border-rose-500/35";
  }
  return "bg-slate-800/40 border-white/5";
}

/* -------------------- COMPONENTS -------------------- */

function PnlCard({
  title,
  subtitle,
  value,
  percent,
}: {
  title: string;
  subtitle: string;
  value: number;
  percent: number;
}) {
  const positive = percent >= 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#05070b] px-6 py-5 shadow-[0_0_0_1px_rgba(15,23,42,0.6)]">
      {/* LIGNE BLEUE (NE PLUS CHANGER) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[linear-gradient(to_right,#020617_0%,#020617_20%,#2564ec_50%,#020617_80%,#020617_100%)]" />

      <div className="text-sm font-medium text-slate-300">{title}</div>
      <div className="mt-1 text-xs text-slate-500">{subtitle}</div>
      <div className="mt-4 text-3xl font-semibold tracking-tight">
        {value >= 0 ? "+" : "-"}
        {Math.abs(value).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 2,
        })}
      </div>
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
          subtitle="Current total account balance"
          value={pnlSummary.balance}
          percent={0}
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

      {/* Graphique PNL mensuel */}
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
      </section>

      {/* Calendrier de performance quotidienne */}
      <section className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#05070b] p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-100">
              Daily Performance Calendar
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Each day shows your daily PNL. Hover to see exact numbers.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-300">
            <button
              type="button"
              onClick={goPrevMonth}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/40 hover:bg-white/10"
            >
              ‹
            </button>
            <span className="min-w-[120px] text-center">
              {new Date(currentYear, currentMonthIndex).toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
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
        <div className="grid grid-cols-7 gap-1 mb-2 text-[11px] text-slate-500">
          {weekDayLabels.map((d) => (
            <div key={d} className="text-center uppercase tracking-wide">
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

            for (let i = 0; i < leadingEmpty; i++) {
              cells.push(
                <div key={`empty-${i}`} className="h-24 rounded-xl" />
              );
            }

            for (const date of daysOfMonth) {
              const day = date.getDate();
              const key = formatDateKey(date);
              const perf = perfByDate.get(key);
              const value = perf?.value ?? 0;
              const hasPerf = perf !== undefined;

              const isTodayFlag = isToday(date);

              const pnlText =
                hasPerf &&
                `${value >= 0 ? "+" : ""}${value.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}`;

              const baseClasses =
                "flex h-24 flex-col rounded-xl border px-2 py-1.5 bg-slate-900/40";
              const perfBg = hasPerf ? getPerfColorBg(value) : "border-white/5";

              cells.push(
                <div
                  key={key}
                  className={[
                    baseClasses,
                    perfBg,
                    isTodayFlag
                      ? "ring-2 ring-blue-500/70 ring-offset-2 ring-offset-[#05070b]"
                      : "",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-300">{day}</span>
                  </div>

                  {hasPerf && (
                    <div className="mt-auto text-[11px] font-medium text-slate-100">
                      {pnlText}
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
