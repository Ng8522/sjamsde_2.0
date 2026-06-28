import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Target, TrendingUp } from "lucide-react";

import { SiteLogo } from "@/components/site-layout";
import { DONATION_EVENT_TITLE } from "@/lib/donation-event";
import { fetchDonationSummary } from "@/lib/donation-api";
import { formatDonationRm } from "@/lib/donation-leaderboard";

export const Route = createFileRoute("/donation-status")({
  component: DonationStatusPage,
  head: () => ({
    meta: [
      { title: `${DONATION_EVENT_TITLE} — Donation Status` },
      {
        name: "description",
        content: `Live fundraising progress for ${DONATION_EVENT_TITLE}.`,
      },
    ],
  }),
});

function StatBlock({ label, value, accent }: { label: string; value: string; accent: "gold" | "red" }) {
  return (
    <div className="donation-status-stat flex h-full w-full min-h-0 min-w-0 flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-600/80 bg-slate-900/90 px-4 py-[clamp(0.75rem,2.5vh,2rem)] lg:rounded-3xl">
      <span
        className={`donation-status-stat-label max-w-full text-center font-bold uppercase tracking-wide ${
          accent === "gold" ? "text-amber-400" : "text-red-500"
        }`}
      >
        {label}
      </span>
      <span className="donation-status-stat-value mt-2 max-w-full text-center font-bold leading-none tabular-nums text-amber-400">
        {value}
      </span>
    </div>
  );
}

function DonationStatusPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["donation-summary"],
    queryFn: fetchDonationSummary,
    refetchInterval: 15_000,
  });

  const raised = data?.raised ?? 0;
  const target = data?.target ?? 0;
  const donationCount = data?.donationCount ?? 0;
  const progressPct = target > 0 ? Math.min(100, (raised / target) * 100) : 0;
  const progressPctLabel = progressPct.toFixed(2);

  return (
    <div className="donation-status-showcase flex h-dvh max-h-dvh flex-col overflow-hidden bg-[#1a1a24] text-white antialiased">
      <header className="shrink-0 border-b border-slate-700/80 px-4 py-2 sm:px-6 sm:py-3 lg:px-8">
        <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <SiteLogo className="size-9 shrink-0 sm:size-10 lg:size-12" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400 sm:text-sm">
                SJAM SDE
              </p>
              <p className="text-balance text-[clamp(0.8rem,1.8vw,1.35rem)] font-semibold leading-snug">
                State Building Fund Charity Dinner 2026
              </p>
            </div>
          </div>
          <Link
            to="/donate"
            className="shrink-0 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-800 sm:px-4 sm:py-2 sm:text-sm"
          >
            Donate page
          </Link>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col overflow-hidden px-3 py-2 sm:px-5 sm:py-3 lg:px-8">
        <div className="mx-auto flex h-full min-h-0 w-full max-w-[90rem] flex-col items-center justify-center gap-[clamp(0.5rem,2.5vh,1.75rem)] overflow-hidden">
          <div className="flex w-full min-h-0 max-h-[22vh] shrink-0 flex-col items-center justify-center gap-2 px-2 text-center">
            <Heart className="size-7 shrink-0 fill-red-500/30 text-red-500 sm:size-9 lg:size-11" aria-hidden />
            <h1 className="max-w-full text-balance text-[clamp(1rem,2.8vw,2.5rem)] font-semibold leading-tight">
              {DONATION_EVENT_TITLE}
            </h1>
          </div>

          {isLoading ? (
            <p className="text-sm text-slate-400 sm:text-base">Loading donation status…</p>
          ) : isError ? (
            <p className="text-sm text-red-400 sm:text-base">Could not load donation status. Retrying…</p>
          ) : (
            <>
              <div className="grid h-[clamp(7rem,28vh,16rem)] w-full max-w-5xl min-h-0 shrink-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:max-w-6xl xl:max-w-7xl">
                <StatBlock label="Total Raised" value={formatDonationRm(raised)} accent="gold" />
                <StatBlock label="Target" value={formatDonationRm(target)} accent="red" />
              </div>

              <div className="w-full max-w-5xl shrink-0 space-y-2 lg:max-w-6xl lg:space-y-3 xl:max-w-7xl">
                <div className="flex items-center justify-between gap-4 text-sm sm:text-base lg:text-lg">
                  <span className="inline-flex items-center gap-2 font-medium text-slate-300">
                    <TrendingUp className="size-4" aria-hidden />
                    Progress
                  </span>
                  <span className="font-bold tabular-nums text-amber-400">{progressPctLabel}%</span>
                </div>
                <div className="h-[clamp(0.75rem,2vh,1.75rem)] overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 transition-[width] duration-700"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap items-center justify-center gap-4 text-xs text-slate-400 sm:gap-6 sm:text-sm lg:text-base">
                <span className="inline-flex items-center gap-2">
                  <Target className="size-4 text-red-500" aria-hidden />
                  {donationCount.toLocaleString("en-MY")} donations recorded
                </span>
                <span className="text-slate-500">Updates every 15 seconds</span>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
