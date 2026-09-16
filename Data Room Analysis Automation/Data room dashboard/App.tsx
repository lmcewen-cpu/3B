import { useMemo, useState } from "react";
import {
  categories,
  deal,
  docs,
  findings,
  folders,
  investorCriteria,
  investorFunnel,
  investors,
  throughput,
  type Severity,
} from "./data";

const sevStyle: Record<Severity, string> = {
  critical: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
  high: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  medium: "bg-sky-500/15 text-sky-300 ring-sky-500/30",
  low: "bg-slate-500/15 text-slate-300 ring-slate-500/30",
};

const statusStyle: Record<string, string> = {
  analyzed: "bg-teal-500/15 text-teal-300 ring-teal-500/30",
  processing: "bg-purple-500/15 text-purple-300 ring-purple-500/30",
  queued: "bg-slate-500/15 text-slate-300 ring-slate-500/30",
  failed: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
};

function Panel({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-white/10 bg-slate-900/60 p-5 ${className}`}
    >
      <div className="mb-4">
        <h2 className="text-sm font-semibold tracking-wide text-slate-100">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}

export default function App() {
  const [view, setView] = useState<"diligence" | "investors">("diligence");
  const [severity, setSeverity] = useState<"all" | Severity>("all");
  const [folder, setFolder] = useState("all");
  const [query, setQuery] = useState("");
  const [investorType, setInvestorType] = useState("all");
  const [minFit, setMinFit] = useState(0);
  const [openInvestor, setOpenInvestor] = useState<string | null>("I-204");

  const totals = useMemo(() => {
    const totalDocs = folders.reduce((a, f) => a + f.docs, 0);
    const analyzed = folders.reduce((a, f) => a + f.analyzed, 0);
    const flags = folders.reduce((a, f) => a + f.flags, 0);
    return { totalDocs, analyzed, flags, pct: Math.round((analyzed / totalDocs) * 100) };
  }, []);

  const visibleFindings = useMemo(
    () =>
      findings.filter(
        (f) =>
          (severity === "all" || f.severity === severity) &&
          (folder === "all" || f.doc.startsWith(folder)) &&
          (query.trim() === "" ||
            (f.title + f.excerpt + f.doc + f.owner)
              .toLowerCase()
              .includes(query.trim().toLowerCase())),
      ),
    [severity, folder, query],
  );

  const visibleDocs = useMemo(
    () =>
      docs.filter(
        (d) =>
          (folder === "all" || d.folder === folder) &&
          (query.trim() === "" ||
            (d.name + d.category + d.folder)
              .toLowerCase()
              .includes(query.trim().toLowerCase())),
      ),
    [folder, query],
  );

  const sevCounts = useMemo(() => {
    const c: Record<Severity, number> = { critical: 0, high: 0, medium: 0, low: 0 };
    for (const f of findings) c[f.severity]++;
    return c;
  }, []);

  const maxThroughput = Math.max(...throughput.map((t) => t.docs));
  const catTotal = categories.reduce((a, c) => a + c.count, 0);

  const investorTypes = useMemo(
    () => Array.from(new Set(investors.map((i) => i.type))),
    [],
  );

  const visibleInvestors = useMemo(
    () =>
      investors
        .filter(
          (i) =>
            (investorType === "all" || i.type === investorType) &&
            i.fitScore >= minFit &&
            (query.trim() === "" ||
              (i.firm + i.type + i.owner + i.signals.join(" ") + i.concern)
                .toLowerCase()
                .includes(query.trim().toLowerCase())),
        )
        .sort((a, b) => b.fitScore - a.fitScore),
    [investorType, minFit, query],
  );

  const investorStats = useMemo(() => {
    const scored = investors.filter((i) => i.stage !== "Passed");
    const avg =
      scored.reduce((a, i) => a + i.fitScore, 0) / (scored.length || 1);
    return {
      qualified: investors.filter((i) => i.fitScore >= 80).length,
      avg: Math.round(avg),
      inDiligence: investors.filter((i) => i.stage === "Diligence").length,
    };
  }, []);

  const maxFunnel = Math.max(...investorFunnel.map((f) => f.count));

  return (
    <>
      <title>Data room analysis — Project Vantage</title>
      <div className="min-h-screen bg-slate-950 text-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-purple-400">
                {deal.code} · {deal.stage}
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-white">
                {deal.target}
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                {deal.sector} · {deal.size} · Lead {deal.lead}
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <div>
                <p className="text-xs text-slate-500">Data room opened</p>
                <p className="font-medium text-slate-200">{deal.opened}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">IC memo due</p>
                <p className="font-medium text-amber-300">{deal.dueDate}</p>
              </div>
            </div>
          </header>

          <nav className="mb-6 flex gap-1 rounded-xl border border-white/10 bg-slate-900/60 p-1">
            {(
              [
                ["diligence", "Document diligence"],
                ["investors", "Investor screening"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setView(id)}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  view === id
                    ? "bg-purple-500/20 text-purple-100 ring-1 ring-purple-500/40"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {view === "diligence" ? (
          <>

          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Documents ingested",
                value: totals.totalDocs.toLocaleString(),
                note: `${folders.length} top-level folders`,
              },
              {
                label: "Analyzed",
                value: `${totals.pct}%`,
                note: `${totals.analyzed.toLocaleString()} of ${totals.totalDocs.toLocaleString()}`,
              },
              {
                label: "Open findings",
                value: String(totals.flags),
                note: `${sevCounts.critical} critical · ${sevCounts.high} high`,
              },
              {
                label: "Analyst hours saved",
                value: "412",
                note: "vs. manual page review baseline",
              },
            ].map((k) => (
              <div
                key={k.label}
                className="rounded-xl border border-white/10 bg-slate-900/60 p-5"
              >
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {k.label}
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {k.value}
                </p>
                <p className="mt-1 text-xs text-slate-400">{k.note}</p>
              </div>
            ))}
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-slate-900/60 p-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search findings and documents…"
              className="min-w-56 flex-1 rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-purple-500/60"
            />
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none focus:border-purple-500/60"
            >
              <option value="all">All folders</option>
              {folders.map((f) => (
                <option key={f.name} value={f.name}>
                  {f.name}
                </option>
              ))}
            </select>
            <div className="flex gap-1">
              {(["all", "critical", "high", "medium", "low"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSeverity(s)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium capitalize transition ${
                    severity === s
                      ? "bg-purple-500/20 text-purple-200 ring-1 ring-purple-500/40"
                      : "text-slate-400 hover:bg-white/5"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Panel
              title="Folder coverage"
              subtitle="Analysis progress and flags per data room folder"
            >
              <ul className="space-y-3">
                {folders.map((f) => {
                  const pct = Math.round((f.analyzed / f.docs) * 100);
                  return (
                    <li key={f.name}>
                      <div className="flex items-baseline justify-between text-xs">
                        <button
                          onClick={() =>
                            setFolder(folder === f.name ? "all" : f.name)
                          }
                          className={`truncate text-left ${
                            folder === f.name
                              ? "text-purple-300"
                              : "text-slate-300 hover:text-white"
                          }`}
                        >
                          {f.name}
                        </button>
                        <span className="ml-2 shrink-0 tabular-nums text-slate-500">
                          {pct}% · {f.flags} flags
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-purple-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Panel>

            <Panel
              title="Document classification"
              subtitle={`${catTotal.toLocaleString()} documents auto-categorized`}
            >
              <ul className="space-y-3">
                {categories.map((c) => (
                  <li key={c.name} className="flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${c.color}`} />
                    <span className="flex-1 truncate text-xs text-slate-300">
                      {c.name}
                    </span>
                    <span className="tabular-nums text-xs text-slate-500">
                      {c.count}
                    </span>
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/5">
                      <div
                        className={`h-full rounded-full ${c.color}`}
                        style={{ width: `${(c.count / catTotal) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel
              title="Ingestion throughput"
              subtitle="Documents processed per day"
            >
              <div className="flex h-44 items-end gap-2">
                {throughput.map((t) => (
                  <div
                    key={t.day}
                    className="group flex h-full flex-1 flex-col items-center justify-end gap-1"
                  >
                    <span className="text-[10px] tabular-nums text-slate-400">
                      {t.docs}
                    </span>
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-purple-700 to-purple-400 transition group-hover:from-purple-600 group-hover:to-purple-300"
                      style={{
                        height: `${Math.max(4, (t.docs / maxThroughput) * 82)}%`,
                      }}
                    />
                    <span className="text-[10px] text-slate-500">
                      {t.day.replace("Sep ", "")}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-400">
                Peak 448 docs/day · median turnaround 3.4 min per document
              </p>
            </Panel>
          </div>

          <Panel
            title="Risk findings"
            subtitle={`${visibleFindings.length} of ${findings.length} findings shown`}
            className="mt-6"
          >
            <ul className="divide-y divide-white/5">
              {visibleFindings.map((f) => (
                <li key={f.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ring-1 ${sevStyle[f.severity]}`}
                    >
                      {f.severity}
                    </span>
                    <span className="text-sm font-medium text-white">
                      {f.title}
                    </span>
                    <span className="text-xs text-slate-500">
                      {f.id} · {f.category}
                    </span>
                  </div>
                  <p className="mt-2 border-l-2 border-purple-500/40 pl-3 text-xs italic text-slate-400">
                    {f.excerpt}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    <span className="font-mono">{f.doc}</span> · assigned to{" "}
                    {f.owner}
                  </p>
                </li>
              ))}
              {visibleFindings.length === 0 && (
                <li className="py-6 text-center text-sm text-slate-500">
                  No findings match these filters.
                </li>
              )}
            </ul>
          </Panel>

          <Panel
            title="Document queue"
            subtitle={`${visibleDocs.length} documents shown · newest activity first`}
            className="mt-6"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-slate-500">
                  <tr className="border-b border-white/10">
                    <th className="pb-2 pr-4 font-medium">Document</th>
                    <th className="pb-2 pr-4 font-medium">Folder</th>
                    <th className="pb-2 pr-4 font-medium">Category</th>
                    <th className="pb-2 pr-4 text-right font-medium">Pages</th>
                    <th className="pb-2 pr-4 font-medium">Status</th>
                    <th className="pb-2 pr-4 text-right font-medium">
                      Confidence
                    </th>
                    <th className="pb-2 pr-4 text-right font-medium">Flags</th>
                    <th className="pb-2 text-right font-medium">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {visibleDocs.map((d) => (
                    <tr key={d.id} className="hover:bg-white/5">
                      <td className="py-2.5 pr-4 font-mono text-slate-200">
                        {d.name}
                      </td>
                      <td className="py-2.5 pr-4 text-slate-400">{d.folder}</td>
                      <td className="py-2.5 pr-4 text-slate-400">
                        {d.category}
                      </td>
                      <td className="py-2.5 pr-4 text-right tabular-nums text-slate-400">
                        {d.pages}
                      </td>
                      <td className="py-2.5 pr-4">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ${statusStyle[d.status]}`}
                        >
                          {d.status}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4 text-right tabular-nums text-slate-400">
                        {d.confidence ? `${Math.round(d.confidence * 100)}%` : "—"}
                      </td>
                      <td className="py-2.5 pr-4 text-right tabular-nums">
                        {d.flags ? (
                          <span className="text-amber-300">{d.flags}</span>
                        ) : (
                          <span className="text-slate-600">0</span>
                        )}
                      </td>
                      <td className="py-2.5 text-right text-slate-500">
                        {d.updated}
                      </td>
                    </tr>
                  ))}
                  {visibleDocs.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="py-6 text-center text-slate-500"
                      >
                        No documents match these filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Panel>
          </>
          ) : (
          <>
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Investors screened",
                value: String(investorFunnel[1].count),
                note: `${investorFunnel[0].count} sourced from mandate scan`,
              },
              {
                label: "Qualified (fit ≥ 80)",
                value: String(investorStats.qualified),
                note: `avg fit score ${investorStats.avg}`,
              },
              {
                label: "In diligence",
                value: String(investorStats.inDiligence),
                note: `${investorFunnel[3].count} with data room access`,
              },
              {
                label: "IOIs received",
                value: String(investorFunnel[5].count),
                note: "target: 3 by IC memo date",
              },
            ].map((k) => (
              <div
                key={k.label}
                className="rounded-xl border border-white/10 bg-slate-900/60 p-5"
              >
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {k.label}
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {k.value}
                </p>
                <p className="mt-1 text-xs text-slate-400">{k.note}</p>
              </div>
            ))}
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-slate-900/60 p-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search firms, theses, owners…"
              className="min-w-56 flex-1 rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-purple-500/60"
            />
            <select
              value={investorType}
              onChange={(e) => setInvestorType(e.target.value)}
              className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none focus:border-purple-500/60"
            >
              <option value="all">All investor types</option>
              {investorTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-400">
              Min fit
              <input
                type="range"
                min={0}
                max={95}
                step={5}
                value={minFit}
                onChange={(e) => setMinFit(Number(e.target.value))}
                className="accent-purple-500"
              />
              <span className="w-6 tabular-nums text-slate-200">{minFit}</span>
            </label>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Panel
              title="Outreach funnel"
              subtitle="Automated mandate scan through IOI"
              className="lg:col-span-2"
            >
              <ul className="space-y-3">
                {investorFunnel.map((f) => (
                  <li key={f.stage}>
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="text-slate-300">{f.stage}</span>
                      <span className="tabular-nums text-slate-500">
                        {f.count}
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-700 to-purple-400"
                        style={{ width: `${(f.count / maxFunnel) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel
              title="Fit score model"
              subtitle="Weighted criteria applied to every firm"
            >
              <ul className="space-y-3">
                {investorCriteria.map((c) => (
                  <li key={c.name} className="flex items-center gap-3">
                    <span className="flex-1 text-xs text-slate-300">
                      {c.name}
                    </span>
                    <span className="tabular-nums text-xs text-slate-500">
                      {Math.round(c.weight * 100)}%
                    </span>
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-teal-500"
                        style={{ width: `${c.weight * 100 * 3.33}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>

          <Panel
            title="Ranked investor shortlist"
            subtitle={`${visibleInvestors.length} of ${investors.length} firms shown · click a firm for the screening rationale`}
            className="mt-6"
          >
            <ul className="divide-y divide-white/5">
              {visibleInvestors.map((i) => {
                const open = openInvestor === i.id;
                return (
                  <li key={i.id} className="py-4 first:pt-0 last:pb-0">
                    <button
                      onClick={() => setOpenInvestor(open ? null : i.id)}
                      className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 text-left"
                    >
                      <span
                        className={`w-11 shrink-0 rounded-md px-2 py-1 text-center text-sm font-semibold tabular-nums ring-1 ${
                          i.fitScore >= 85
                            ? "bg-teal-500/15 text-teal-300 ring-teal-500/30"
                            : i.fitScore >= 70
                              ? "bg-sky-500/15 text-sky-300 ring-sky-500/30"
                              : "bg-slate-500/15 text-slate-300 ring-slate-500/30"
                        }`}
                      >
                        {i.fitScore}
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-medium text-white">
                          {i.firm}
                        </span>
                        <span className="block text-xs text-slate-500">
                          {i.type} · AUM {i.aum} · cheque {i.checkSize} ·{" "}
                          {i.sectorDeals} comparable deals
                        </span>
                      </span>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ${
                          i.stage === "Passed"
                            ? "bg-rose-500/15 text-rose-300 ring-rose-500/30"
                            : i.stage === "Diligence"
                              ? "bg-teal-500/15 text-teal-300 ring-teal-500/30"
                              : "bg-purple-500/15 text-purple-300 ring-purple-500/30"
                        }`}
                      >
                        {i.stage}
                      </span>
                      <span className="w-24 text-right text-xs text-slate-500">
                        {i.lastTouch}
                      </span>
                    </button>
                    {open && (
                      <div className="mt-3 grid gap-4 border-l-2 border-purple-500/40 pl-4 sm:grid-cols-2">
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-slate-500">
                            Positive signals
                          </p>
                          <ul className="mt-1.5 space-y-1">
                            {i.signals.map((s) => (
                              <li key={s} className="text-xs text-slate-300">
                                • {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-slate-500">
                            Watch item
                          </p>
                          <p className="mt-1.5 text-xs text-amber-300">
                            {i.concern}
                          </p>
                          <p className="mt-3 text-[11px] uppercase tracking-wide text-slate-500">
                            Thesis match · owner
                          </p>
                          <p className="mt-1.5 text-xs text-slate-300">
                            {Math.round(i.thesisMatch * 100)}% · {i.owner}
                          </p>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
              {visibleInvestors.length === 0 && (
                <li className="py-6 text-center text-sm text-slate-500">
                  No investors match these filters.
                </li>
              )}
            </ul>
          </Panel>
          </>
          )}

          <footer className="mt-8 border-t border-white/10 pt-4 text-xs text-slate-500">
            Mock data for demonstration. Built in{" "}
            <a
              href="https://lmcewen-tines-io.se-demo.3b.run"
              className="text-purple-400 underline decoration-purple-400/40 hover:text-purple-300"
            >
              Data Room Analysis Automation
            </a>
            .
          </footer>
        </div>
      </div>
    </>
  );
}
