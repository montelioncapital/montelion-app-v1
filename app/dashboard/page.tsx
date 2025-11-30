function PnlCard({
  title,
  subtitle,
  value,
  percent,
  showPercent = true,
}: {
  title: string;
  subtitle: string;
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
        <div>
          <div className="text-sm font-medium text-slate-300">{title}</div>
          <div className="mt-1 text-xs text-slate-500">{subtitle}</div>
        </div>

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
