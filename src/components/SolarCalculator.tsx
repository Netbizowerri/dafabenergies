import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { CalculationResult } from "../types";

export function SolarCalculator() {
  const [load, setLoad] = useState(2500);
  const [sunHours, setSunHours] = useState(5);
  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    const dailyYield = Number(((load * 24) / 1000).toFixed(1));
    const panels = Math.max(4, Math.ceil((dailyYield * 1.2) / (0.705 * sunHours)));
    const inverterSize = load > 8000 ? 12 : load > 4500 ? 6 : 3;
    const batteryCapacity = Math.max(200, Math.ceil(((dailyYield * 0.7) / 48) * 100));

    setResult({ panels, inverterSize, batteryCapacity, dailyYield });
  }, [load, sunHours]);

  const chartData = [
    { time: "06:00", solar: 0, demand: 0.35 * load },
    { time: "09:00", solar: (result?.dailyYield || 0) * 0.3, demand: 0.55 * load },
    { time: "12:00", solar: (result?.dailyYield || 0) * 0.8, demand: 0.9 * load },
    { time: "15:00", solar: (result?.dailyYield || 0) * 0.6, demand: load },
    { time: "18:00", solar: 0.8, demand: 1.1 * load },
    { time: "21:00", solar: 0, demand: 0.72 * load },
  ];

  return (
    <section className="rounded-[2rem] border border-white/70 bg-brand-navy p-8 text-white shadow-glow sm:p-10">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-gold">
            Quick sizing tool
          </p>
          <h3 className="mt-3 font-display text-3xl font-extrabold">Estimate a sensible solar starting point.</h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
            This is a planning tool for enquiries, not a final engineering design. Dafab still validates
            cable sizes, surge protection, and actual appliance profiles during an audit.
          </p>

          <div className="mt-8 space-y-8">
            <div>
              <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-200">
                <span>Average constant load</span>
                <span>{load.toLocaleString()} W</span>
              </div>
              <input
                type="range"
                min="500"
                max="12000"
                step="100"
                value={load}
                onChange={(event) => setLoad(Number(event.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-brand-gold"
              />
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-200">
                <span>Average daily sun hours</span>
                <span>{sunHours} hours</span>
              </div>
              <input
                type="range"
                min="3"
                max="8"
                step="0.5"
                value={sunHours}
                onChange={(event) => setSunHours(Number(event.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-brand-gold"
              />
            </div>
          </div>

          {result ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] bg-white/8 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Panels</p>
                <p className="mt-2 text-2xl font-extrabold text-brand-gold">{result.panels} x 705W</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/8 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Inverter</p>
                <p className="mt-2 text-2xl font-extrabold text-brand-gold">{result.inverterSize}kW hybrid</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/8 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Battery bank</p>
                <p className="mt-2 text-2xl font-extrabold text-brand-gold">{result.batteryCapacity}Ah @ 48V</p>
              </div>
              <div className="rounded-[1.5rem] bg-brand-gold/15 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-200">Daily energy</p>
                <p className="mt-2 text-2xl font-extrabold text-white">{result.dailyYield} kWh</p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="rounded-[1.75rem] bg-white/6 p-4 sm:p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="solarFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e6ab33" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#e6ab33" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="time" stroke="#dbe4ef" fontSize={12} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0b1d30",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 18,
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="solar"
                  stroke="#e6ab33"
                  fillOpacity={1}
                  fill="url(#solarFill)"
                  name="Solar yield"
                />
                <Area
                  type="monotone"
                  dataKey="demand"
                  stroke="#57d9a3"
                  fill="transparent"
                  strokeDasharray="5 5"
                  name="Demand"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-slate-300">
            The chart shows how daytime solar production and battery support can be balanced against a
            constant load profile.
          </p>
        </div>
      </div>
    </section>
  );
}
