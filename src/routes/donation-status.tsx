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
    <div className="donation-status-stat flex w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-600/80 bg-slate-900/90 px-4 py-6 sm:px-6 sm:py-8 lg:rounded-3xl lg:px-8 lg:py-10">
      <span
        className={`max-w-full text-center text-[clamp(0.65rem,2.5vw,1rem)] font-bold uppercase tracking-wide ${
          accent === "gold" ? "text-amber-400" : "text-red-500"
        }`}
      >
        {label}
      </span>
      <span className="donation-status-stat-value mt-2 max-w-full text-center font-bold leading-none tabular-nums text-white sm:mt-3">
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
  const progressPct = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0;

  return (
    <div className="donation-status-showcase flex min-h-dvh flex-col bg-[#1a1a24] text-white antialiased">
      <header className="shrink-0 border-b border-slate-700/80 px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
        <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <SiteLogo className="size-10 shrink-0 sm:size-12 lg:size-14" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400 sm:text-sm lg:text-base">
                SJAM SDE
              </p>
              <p className="text-balance text-[clamp(0.875rem,2vw,1.5rem)] font-semibold leading-snug">
                State Building Fund Charity Dinner 2026
              </p>
            </div>
          </div>
          <Link
            to="/donate"
            className="shrink-0 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-800 sm:px-4 sm:py-2 sm:text-sm lg:text-base"
          >
            Donate page
          </Link>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mx-auto flex w-full max-w-[90rem] flex-col items-center gap-8 lg:gap-12 xl:gap-14">
          <div className="flex w-full max-w-5xl flex-col items-center gap-3 px-2 text-center sm:gap-4 lg:max-w-6xl xl:max-w-7xl">
            <Heart className="size-8 shrink-0 fill-red-500/30 text-red-500 sm:size-10 lg:size-12 xl:size-14" aria-hidden />
            <h1 className="max-w-full text-balance text-[clamp(1.125rem,3.5vw,3rem)] font-semibold leading-tight">
              {DONATION_EVENT_TITLE}
            </h1>
          </div>

          {isLoading ? (
            <p className="text-base text-slate-400 sm:text-lg lg:text-xl">Loading donation status…</p>
          ) : isError ? (
            <p className="text-base text-red-400 sm:text-lg">Could not load donation status. Retrying…</p>
          ) : (
            <>
              <div className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:max-w-6xl lg:gap-6 xl:max-w-7xl">
                <StatBlock label="Total Raised" value={formatDonationRm(raised)} accent="gold" />
                <StatBlock label="Target" value={formatDonationRm(target)} accent="red" />
              </div>

              <div className="w-full max-w-5xl space-y-3 lg:max-w-6xl lg:space-y-4 xl:max-w-7xl">
                <div className="flex items-center justify-between gap-4 text-sm sm:text-base lg:text-lg xl:text-xl">
                  <span className="inline-flex items-center gap-2 font-medium text-slate-300">
                    <TrendingUp className="size-4 lg:size-5" aria-hidden />
                    Progress
                  </span>
                  <span className="font-bold tabular-nums text-amber-400">{progressPct}%</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-slate-800 sm:h-5 lg:h-6 xl:h-8">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 transition-[width] duration-700"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 sm:gap-10 sm:text-base lg:text-lg xl:text-xl">
                <span className="inline-flex items-center gap-2">
                  <Target className="size-4 text-red-500 lg:size-5" aria-hidden />
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
