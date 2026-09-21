import { useCallback, useEffect, useState } from "react";
import reviewShot from "./access-review.png" with { type: "text" };

const APP_URL = "https://schwarz-space.se-demo.3b.run/access-hub";
const WORKFLOW_URL =
  "https://se-demo.3b.dev/spaces/-h_VprHo_Oaf/workflows/ZaxEc2YQVPg7";

const Mono = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`font-mono text-[10px] uppercase tracking-[0.28em] ${className}`}
  >
    {children}
  </span>
);

const Phone = ({
  children,
  bare = false,
}: {
  children: React.ReactNode;
  bare?: boolean;
}) => (
  <div className="relative w-[380px] max-w-full shrink-0">
    <div
      aria-hidden
      className="absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(217,70,239,0.45),transparent)] blur-3xl"
    />
    <div className="rounded-[3.2rem] bg-slate-950 p-3 shadow-[0_50px_120px_-25px_rgba(76,29,149,0.75)] ring-1 ring-white/15">
      <div className="relative h-[740px] overflow-hidden rounded-[2.7rem] bg-white">
        <div className="absolute left-1/2 top-3 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-slate-950" />
        <div className={`flex h-full flex-col ${bare ? "" : "pt-12"}`}>
          {children}
        </div>
      </div>
    </div>
  </div>
);

const ScreenHead = ({ title, sub }: { title: string; sub?: string }) => (
  <div className="px-6 pb-4">
    <div className="text-2xl font-semibold tracking-tight text-slate-900">
      {title}
    </div>
    {sub ? <div className="mt-1 text-sm text-slate-400">{sub}</div> : null}
  </div>
);

const Kpi = ({
  label,
  value,
  tone = "slate",
}: {
  label: string;
  value: string;
  tone?: "slate" | "rose" | "orange" | "emerald" | "fuchsia";
}) => {
  const color = {
    slate: "text-slate-900",
    rose: "text-rose-500",
    orange: "text-orange-500",
    emerald: "text-emerald-500",
    fuchsia: "text-fuchsia-500",
  }[tone];
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-900/5">
      <Mono className="text-slate-400">{label}</Mono>
      <div className={`mt-2 text-3xl font-semibold tabular-nums ${color}`}>
        {value}
      </div>
    </div>
  );
};

const Row = ({
  badge,
  tone,
  title,
  detail,
}: {
  badge: string;
  tone: "rose" | "orange" | "emerald" | "slate" | "fuchsia";
  title: string;
  detail: string;
}) => {
  const chip = {
    rose: "bg-rose-50 text-rose-500",
    orange: "bg-orange-50 text-orange-500",
    emerald: "bg-emerald-50 text-emerald-600",
    slate: "bg-slate-100 text-slate-500",
    fuchsia: "bg-fuchsia-50 text-fuchsia-500",
  }[tone];
  return (
    <div className="flex items-start gap-3 border-b border-slate-900/5 px-6 py-3 last:border-0">
      <span className={`mt-0.5 shrink-0 rounded-md px-2 py-1 ${chip}`}>
        <Mono>{badge}</Mono>
      </span>
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-slate-800">
          {title}
        </div>
        <div className="truncate text-sm text-slate-500">{detail}</div>
      </div>
    </div>
  );
};

const ScreenSection = ({ label, hint }: { label: string; hint?: string }) => (
  <div className="flex items-baseline gap-3 px-6 pb-2 pt-5">
    <Mono className="text-slate-500">{label}</Mono>
    {hint ? <span className="text-[11px] text-slate-400">{hint}</span> : null}
  </div>
);

const HeroScreen = () => (
  <img
    src={reviewShot}
    alt="Access Hub access review"
    className="h-full w-full scale-[2.1] object-cover object-[19%_38%]"
  />
);

const ProblemScreen = () => (
  <>
    <ScreenHead title="Before" sub="the estate, untended" />
    <div className="grid grid-cols-2 gap-3 px-6">
      <Kpi label="Coverage" value="?" />
      <Kpi label="Leavers" value="9" tone="rose" />
      <Kpi label="Unused" value="$41k" tone="orange" />
      <Kpi label="Reviews" value="0" tone="rose" />
    </div>
    <ScreenSection label="Open questions" />
    <Row badge="ticket" tone="slate" title="Who granted this?" detail="no audit trail" />
    <Row badge="ticket" tone="slate" title="Is the kit complete?" detail="manual checklist" />
    <Row badge="audit" tone="rose" title="Was she deprovisioned?" detail="nobody can say" />
    <Row badge="finance" tone="orange" title="What can we cut?" detail="access has no price" />
  </>
);

const PromiseScreen = () => (
  <>
    <ScreenHead title="Access Hub" sub="detect · price · fix" />
    <div className="space-y-3 px-6">
      {[
        ["Visibility", "KPIs, audit log, provisioning board", "fuchsia"],
        ["Deprovisioning SLA", "watchdog every morning at 08:00", "rose"],
        ["Reclaimable spend", "every finding priced from the catalogue", "emerald"],
      ].map(([label, detail, tone]) => (
        <div
          key={label}
          className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-900/5"
        >
          <Mono
            className={
              tone === "rose"
                ? "text-rose-500"
                : tone === "emerald"
                  ? "text-emerald-500"
                  : "text-fuchsia-500"
            }
          >
            {label}
          </Mono>
          <div className="mt-2 text-sm text-slate-600">{detail}</div>
        </div>
      ))}
    </div>
    <ScreenSection label="Scope" />
    <Row badge="835" tone="slate" title="Employees" detail="6 departments" />
    <Row badge="12" tone="slate" title="Tools" detail="priced catalogue" />
    <Row badge="0" tone="emerald" title="External services" detail="self-contained" />
  </>
);

const AgendaScreen = () => (
  <>
    <ScreenHead title="The walkthrough" sub="five screens" />
    <div className="space-y-2 px-6">
      {[
        "Command Center",
        "Provisioning board",
        "Calendar time travel",
        "Access review chain",
        "Remediation + SLA scan",
      ].map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-slate-900 font-mono text-[11px] text-white">
            0{i + 1}
          </span>
          <div className="flex-1 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 ring-1 ring-slate-900/5">
            {s}
          </div>
        </div>
      ))}
    </div>
    <div className="mt-auto px-6 pb-6">
      <div className="rounded-2xl bg-fuchsia-500 px-4 py-3 text-center text-sm font-medium text-white">
        Start the tour →
      </div>
    </div>
  </>
);

const CommandScreen = () => (
  <>
    <ScreenHead title="Command Center" sub="835 employees · 12 tools" />
    <div className="grid grid-cols-2 gap-3 px-6">
      <Kpi label="Critical" value="28" tone="rose" />
      <Kpi label="High" value="54" tone="orange" />
      <Kpi label="Reclaimable" value="$41k" tone="emerald" />
      <Kpi label="Deploys" value="6" tone="fuchsia" />
    </div>
    <ScreenSection label="Audit log" hint="every change attributed" />
    <Row badge="grant" tone="emerald" title="Figma → M. Okafor" detail="lmcewen@tines.io · 2m ago" />
    <Row badge="revoke" tone="rose" title="Okta admin → P. Bailey" detail="review remediate · 9m ago" />
    <Row badge="kit" tone="slate" title="Design kit updated" detail="lmcewen@tines.io · 1h ago" />
  </>
);

const ProvisioningScreen = () => (
  <>
    <ScreenHead title="Provisioning" sub="live deployment status" />
    <div className="px-6">
      <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-900/5">
        <div className="flex items-center justify-between">
          <Mono className="text-slate-400">In progress</Mono>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-500" />
            <Mono className="text-fuchsia-500">live</Mono>
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-2/3 rounded-full bg-fuchsia-500" />
        </div>
        <div className="mt-2 text-sm text-slate-500">
          Onboard · A. Müller · 4 of 6 tools
        </div>
      </div>
    </div>
    <ScreenSection label="Jobs" hint="advances every ~2.5s" />
    <Row badge="completed" tone="emerald" title="Onboard · N. Robinson" detail="Engineering kit · 6 tools" />
    <Row badge="in_progress" tone="fuchsia" title="Offboard · V. Wright" detail="revoke_all · 4 licences" />
    <Row badge="pending" tone="slate" title="Onboard · L. Gomez" detail="Sales kit · queued" />
    <Row badge="failed" tone="rose" title="Offboard · M. Hall" detail="tap to retry" />
  </>
);

const CalendarScreen = () => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const starts = [4, 12, 19, 25];
  const leaves = [8, 16, 27];
  return (
    <>
      <ScreenHead title="Calendar" sub="simulated today · Sep 18" />
      <div className="px-6">
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((d) => {
            const start = starts.includes(d);
            const leave = leaves.includes(d);
            return (
              <div
                key={d}
                className={`grid aspect-square place-items-center rounded-xl text-xs font-medium ${
                  start
                    ? "bg-emerald-100 text-emerald-700"
                    : leave
                      ? "bg-rose-100 text-rose-600"
                      : d === 18
                        ? "bg-slate-900 text-white"
                        : "bg-slate-50 text-slate-400"
                }`}
              >
                {d}
              </div>
            );
          })}
        </div>
      </div>
      <ScreenSection label="Crossing today" />
      <Row badge="start" tone="emerald" title="A. Müller · Engineering" detail="kit auto-provisioned" />
      <Row badge="last day" tone="rose" title="P. Nascimento · Support" detail="access auto-revoked" />
      <div className="mt-auto px-6 pb-6">
        <div className="rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm font-medium text-white">
          Advance a day →
        </div>
      </div>
    </>
  );
};

const ReviewScreen = () => {
  const stages = [
    ["Collect", "read DB (ro)", true],
    ["Policy", "pure logic", true],
    ["Score", "severity + cost", true],
    ["Publish", "write findings", false],
  ] as const;
  return (
    <>
      <ScreenHead title="Run review" sub="four steps, one chain" />
      <div className="space-y-2 px-6">
        {stages.map(([name, note, done]) => (
          <div
            key={name}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 ring-1 ${
              done
                ? "bg-emerald-50 ring-emerald-500/20"
                : "bg-fuchsia-50 ring-fuchsia-500/20"
            }`}
          >
            <span
              className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-semibold text-white ${
                done ? "bg-emerald-500" : "bg-fuchsia-500"
              }`}
            >
              {done ? "✓" : "•"}
            </span>
            <div>
              <div className="text-sm font-medium text-slate-800">{name}</div>
              <div className="font-mono text-[11px] text-slate-400">{note}</div>
            </div>
          </div>
        ))}
      </div>
      <ScreenSection label="Result" hint="82 findings · $41k reclaimable" />
      <Row badge="critical" tone="rose" title="Orphaned access" detail="V. Wright terminated 42d · 4 licences" />
      <Row badge="high" tone="orange" title="Over-provisioned" detail="Design kit grants 2 unused tools" />
    </>
  );
};

const FindingsScreen = () => (
  <>
    <ScreenHead title="Access Review" sub="stale · 3 changes since last run" />
    <div className="grid grid-cols-2 gap-3 px-6">
      <Kpi label="Critical" value="28" tone="rose" />
      <Kpi label="High" value="54" tone="orange" />
    </div>
    <ScreenSection label="Findings" hint="auto-detected, one-click fix" />
    <Row badge="critical" tone="rose" title="Orphaned access" detail="Vikram Wright (42d) · 4 licences" />
    <Row badge="critical" tone="rose" title="Orphaned access" detail="Gabriela Gupta (56d) · 3 licences" />
    <Row badge="critical" tone="rose" title="Orphaned access" detail="Luca Gomez (44d) · 5 licences" />
    <Row badge="high" tone="orange" title="Privileged holder" detail="Okta admin · no review in 90d" />
    <div className="mt-auto px-6 pb-6">
      <div className="rounded-2xl bg-fuchsia-500 px-4 py-3 text-center text-sm font-medium text-white">
        Remediate
      </div>
    </div>
  </>
);

const SlaScreen = () => (
  <>
    <ScreenHead title="Alerts" sub="deprovisioning SLA · 08:00 daily" />
    <div className="px-6">
      <div className="rounded-2xl bg-rose-50 p-4 ring-1 ring-rose-500/20">
        <Mono className="text-rose-500">SLA breach digest</Mono>
        <div className="mt-2 text-3xl font-semibold text-rose-500">9</div>
        <div className="text-sm text-slate-500">
          leavers past the deprovisioning window
        </div>
      </div>
    </div>
    <ScreenSection label="Breaches" />
    <Row badge="56d" tone="rose" title="Gabriela Gupta" detail="3 licences still active" />
    <Row badge="44d" tone="rose" title="Luca Gomez" detail="5 licences still active" />
    <Row badge="42d" tone="rose" title="Vikram Wright" detail="4 licences still active" />
    <Row badge="36d" tone="orange" title="Olivia Thompson" detail="2 licences still active" />
  </>
);

const DataScreen = () => (
  <>
    <ScreenHead title="Under the hood" sub="access_hub volume" />
    <div className="space-y-3 px-6">
      <div className="rounded-2xl bg-slate-900 p-4">
        <Mono className="text-fuchsia-300">working db</Mono>
        <div className="mt-2 font-mono text-[13px] text-white">
          /storage/access_hub/hub.db
        </div>
        <div className="mt-2 text-sm text-slate-400">
          exclusive writers · read-only readers
        </div>
      </div>
      <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-900/5">
        <Mono className="text-emerald-500">golden snapshot</Mono>
        <div className="mt-2 font-mono text-[13px] text-slate-800">
          hub-pristine.db
        </div>
        <div className="mt-2 text-sm text-slate-500">
          built deterministically by Seed
        </div>
      </div>
    </div>
    <ScreenSection label="On every page load" />
    <Row badge="reset" tone="fuchsia" title="Snapshot → working DB" detail="every demo starts identical" />
    <Row badge="session" tone="slate" title="Edits stay live" detail="until the next page load" />
  </>
);

const RecapScreen = () => (
  <>
    <ScreenHead title="Closed loop" sub="detect · price · fix" />
    <div className="space-y-2 px-6">
      {[
        ["Drifting access", "reviewed daily"],
        ["Slow onboarding", "kits auto-provision"],
        ["Leavers with access", "auto-revoke + SLA"],
        ["Wasted licences", "$41k priced"],
        ["Audit questions", "fully attributed"],
      ].map(([a, b]) => (
        <div
          key={a}
          className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-900/5"
        >
          <span className="text-sm text-slate-400 line-through">{a}</span>
          <span className="text-sm font-medium text-slate-800">{b}</span>
        </div>
      ))}
    </div>
  </>
);

const ChainScreen = () => (
  <>
    <ScreenHead title="Step chain" sub="triggers compose" />
    <div className="space-y-2 px-6">
      {[
        ["Review start", "POST /review/run"],
        ["Review collect", "cron 0 7 * * *"],
        ["Review policy", "no DB access"],
        ["Review score", "prices findings"],
        ["Review publish", "exclusive writer"],
      ].map(([name, note], i) => (
        <div key={name} className="flex items-center gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-900 font-mono text-[11px] text-white">
            {i + 1}
          </span>
          <div className="flex-1 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-900/5">
            <div className="text-sm font-medium text-slate-800">{name}</div>
            <div className="font-mono text-[11px] text-slate-400">{note}</div>
          </div>
        </div>
      ))}
    </div>
    <ScreenSection label="Same chain, three triggers" />
    <Row badge="cron" tone="slate" title="Daily at 07:00" detail="unattended" />
    <Row badge="button" tone="fuchsia" title="Run review in the app" detail="on demand" />
    <Row badge="seed" tone="emerald" title="Once at setup" detail="fresh demo has findings" />
  </>
);

const NextScreen = () => (
  <>
    <ScreenHead title="Take it further" sub="from demo to production" />
    <div className="space-y-2 px-6">
      {[
        ["Real directory", "point Review collect at it"],
        ["Slack / email", "connector on the SLA scan"],
        ["Your policy", "tune rules + SLA window"],
        ["New baseline", "edit and re-run Seed"],
      ].map(([a, b]) => (
        <div
          key={a}
          className="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-900/5"
        >
          <div className="text-sm font-medium text-slate-800">{a}</div>
          <div className="text-sm text-slate-500">{b}</div>
        </div>
      ))}
    </div>
    <div className="mt-auto px-6 pb-6">
      <a
        href={APP_URL}
        target="_blank"
        rel="noreferrer"
        className="block rounded-2xl bg-fuchsia-500 px-4 py-3 text-center text-sm font-medium text-white"
      >
        Open Access Hub →
      </a>
    </div>
  </>
);

type Slide = {
  act: "Tell" | "Show" | "Tell again";
  kicker: string;
  title: string;
  lead: string;
  screen: () => React.ReactNode;
  bare?: boolean;
  say: string;
  notes?: string[];
};

const slides: Slide[] = [
  {
    act: "Tell",
    kicker: "Access Hub",
    title: "Software access, under control",
    lead: "Who holds which licence, where access is wrong, what it costs, and whether leavers were actually deprovisioned — on one screen.",
    screen: HeroScreen,
    bare: true,
    say: "Set the frame: an internal IT and security tool for employee software access across the org.",
    notes: [
      "Audience: IT ops, security, and finance.",
      "The phone is the whole story — narrate what is on it.",
    ],
  },
  {
    act: "Tell",
    kicker: "The problem",
    title: "Access drifts the moment people move",
    lead: "Joiners wait on manual provisioning. Leavers keep licences. Over-provisioning compounds into spend nobody owns. Privilege accumulates unreviewed.",
    screen: ProblemScreen,
    say: "Name the pain before showing the product.",
  },
  {
    act: "Tell",
    kicker: "The promise",
    title: "Detect, price, and fix — on a schedule",
    lead: "Three commitments: live visibility, a deprovisioning SLA with teeth, and remediation in one tap.",
    screen: PromiseScreen,
    say: "Three promises, then we go straight into the product.",
  },
  {
    act: "Tell",
    kicker: "What you'll see",
    title: "Five screens, in this order",
    lead: "Command Center, the provisioning board, calendar time travel, the access review chain, then remediation and the SLA watchdog.",
    screen: AgendaScreen,
    say: "Signposting keeps the walkthrough tight.",
  },
  {
    act: "Show",
    kicker: "Command Center",
    title: "The whole estate at a glance",
    lead: "The UI renders instantly, then loads a computed snapshot: KPIs, published findings, savings, and the audit log.",
    screen: CommandScreen,
    say: "GET /access-hub-api/data serves this, read-only against the database.",
    notes: ["Point out the live badge on the Provisioning nav item."],
  },
  {
    act: "Show",
    kicker: "Provisioning",
    title: "Deployments you can watch move",
    lead: "pending → in progress → completed, or failed with one-tap retry. The board advances every couple of seconds while work is live.",
    screen: ProvisioningScreen,
    say: "This tracks the rollout itself, not the schedule.",
    notes: ["A job exists only once a deploy actually starts — future hires are excluded."],
  },
  {
    act: "Show",
    kicker: "Calendar",
    title: "Scrub time forward, watch access follow",
    lead: "Cross a start date and the department kit provisions itself. Pass a last day and access is revoked, logged and attributed.",
    screen: CalendarScreen,
    say: "No cron here — the simulated-today control drives it, so it demos in seconds.",
  },
  {
    act: "Show",
    kicker: "Access review",
    title: "A chain, not a black box",
    lead: "Collect normalizes the data. Policy applies the rules with no database access at all. Score prices each finding. Publish writes them as the single exclusive writer.",
    screen: ReviewScreen,
    say: "Press Run review. Four small steps, each demonstrable on its own.",
    notes: ["Policy and Score are pure logic — pipe any dataset in on stdin."],
  },
  {
    act: "Show",
    kicker: "Findings",
    title: "Findings that know when they're stale",
    lead: "Access-changing events after the last run mark the results stale, so the numbers are never quietly wrong. Remediation applies the fix and records who did it.",
    screen: FindingsScreen,
    say: "The UI reads persisted findings — instant, and honest about freshness.",
  },
  {
    act: "Show",
    kicker: "SLA scan",
    title: "The watchdog that runs whether or not you look",
    lead: "Every morning at 08:00 the deprovisioning SLA is checked, breaches are digested into the alerts table, and the audit trail records the scan.",
    screen: SlaScreen,
    say: "Attach a connector here and the same digest goes to Slack or email.",
  },
  {
    act: "Show",
    kicker: "Under the hood",
    title: "SQLite on a volume, with a golden snapshot",
    lead: "One working database, one immutable snapshot. Every page load resets from the snapshot, so every demo starts from the same known state.",
    screen: DataScreen,
    say: "Worth 30 seconds — this is why the demo is repeatable.",
  },
  {
    act: "Tell again",
    kicker: "Recap",
    title: "Every pain, closed",
    lead: "Drift is reviewed daily. Onboarding provisions itself. Leavers are revoked and watched. Waste is priced. Every change is attributed.",
    screen: RecapScreen,
    say: "Reconnect each screen to the pain from the second slide.",
  },
  {
    act: "Tell again",
    kicker: "Why the shape matters",
    title: "Small steps beat one big app",
    lead: "Pure-logic steps are testable in isolation. One exclusive writer keeps state consistent. The same chain serves a cron, a button, and seeding.",
    screen: ChainScreen,
    say: "The architecture is part of the pitch.",
  },
  {
    act: "Tell again",
    kicker: "Next",
    title: "Take it further",
    lead: "Point the collector at a real directory, push digests to Slack, tune the policy to your standard, and reshape the baseline for any audience.",
    screen: NextScreen,
    say: "Close with the ask.",
  },
];

export default function App() {
  const [i, setI] = useState(() => {
    const n = Number(window.location.hash.replace("#", ""));
    return Number.isFinite(n) && n >= 1 && n <= slides.length ? n - 1 : 0;
  });
  const [notesOpen, setNotesOpen] = useState(false);

  const go = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, next));
    setI(clamped);
    window.location.hash = String(clamped + 1);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(i + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(i - 1);
      } else if (e.key.toLowerCase() === "n") {
        setNotesOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, i]);

  const s = slides[i];
  const Screen = s.screen;

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#0a0715] text-white">
      <title>Access Hub — tell, show, tell</title>

      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-[-10rem] h-[36rem] w-[36rem] rounded-full bg-violet-600/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-[-12rem] h-[34rem] w-[34rem] rounded-full bg-fuchsia-500/20 blur-[130px]"
      />

      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-10 py-6">
        <div className="flex items-center gap-4">
          <Mono className="text-white/60">Access Hub</Mono>
          <span className="h-4 w-px bg-white/15" />
          <Mono className={s.act === "Show" ? "text-fuchsia-300" : "text-violet-300"}>
            {s.act}
          </Mono>
        </div>
        <div className="flex items-center gap-2">
          {slides.map((sl, idx) => (
            <button
              key={idx}
              onClick={() => go(idx)}
              aria-label={`Slide ${idx + 1}: ${sl.title}`}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-8 bg-fuchsia-400" : "w-3 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center gap-14 px-10 py-6">
        <Phone bare={s.bare}>
          <Screen />
        </Phone>

        <div className="min-w-0 flex-1">
          <Mono className="text-fuchsia-300">{s.kicker}</Mono>
          <h2 className="mt-5 text-[3.25rem] font-semibold leading-[1.03] tracking-tight">
            {s.title}
          </h2>
          <p className="mt-7 max-w-xl text-xl leading-relaxed text-white/65">
            {s.lead}
          </p>
          <div className="mt-9 flex items-center gap-4">
            <span className="font-mono text-5xl tabular-nums text-white/15">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-24 bg-white/15" />
            <Mono className="text-white/40">{slides.length} slides</Mono>
          </div>
        </div>
      </main>

      {notesOpen ? (
        <section className="relative z-10 border-t border-white/10 bg-white/5 px-10 py-6 backdrop-blur">
          <div className="mx-auto max-w-6xl space-y-3">
            <Mono className="text-white/40">Presenter notes</Mono>
            <p className="text-white/80">{s.say}</p>
            {s.notes?.length ? (
              <ul className="list-disc space-y-1 pl-5 text-white/50">
                {s.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}

      <footer className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-10 py-6 text-sm text-white/50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => go(i - 1)}
            disabled={i === 0}
            className="rounded-xl bg-white/10 px-4 py-2 ring-1 ring-white/10 transition hover:bg-white/20 disabled:opacity-30"
          >
            ← Back
          </button>
          <button
            onClick={() => go(i + 1)}
            disabled={i === slides.length - 1}
            className="rounded-xl bg-white/10 px-4 py-2 ring-1 ring-white/10 transition hover:bg-white/20 disabled:opacity-30"
          >
            Next →
          </button>
          <button
            onClick={() => setNotesOpen((v) => !v)}
            className="rounded-xl px-3 py-2 transition hover:bg-white/10"
          >
            {notesOpen ? "Hide notes (N)" : "Notes (N)"}
          </button>
        </div>
        <a
          href={WORKFLOW_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 transition hover:text-white"
        >
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-fuchsia-500 text-white shadow-[0_6px_18px_rgba(217,70,239,0.45)]">
            ↗
          </span>
          <Mono>Access Hub workflow</Mono>
        </a>
      </footer>
    </div>
  );
}
