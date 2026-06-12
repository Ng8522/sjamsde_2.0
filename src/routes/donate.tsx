import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Heart, LayoutGrid } from "lucide-react";

import donateQrCode from "@/assets/qrcode.png";
import { SiteTopChrome } from "@/components/site-layout";
import { fetchDonationRecent, type DonationLeaderboardRow } from "@/lib/donation-api";
import {
  donationFundraisingProjects,
  type DonationFundraisingProject,
} from "@/lib/donation-fundraising-projects";
import { formatDonationRm, formatDonorName } from "@/lib/donation-leaderboard";
function FundraisingProjectCard({ project }: { project: DonationFundraisingProject }) {
  return (
    <article className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-background lg:h-full">
      <img
        src={project.imageSrc}
        alt={project.title}
        loading="lazy"
        className="aspect-[4/3] w-full shrink-0 object-cover lg:min-h-0 lg:flex-1 lg:aspect-auto"
      />
      <div className="shrink-0 bg-background px-1.5 py-1 sm:px-2 sm:py-1.5">
        <h3 className="text-center text-[10px] font-bold leading-tight text-primary sm:text-xs">
          {project.shortTitle}
        </h3>
      </div>
    </article>
  );
}

function DonorTickerChip({ row }: { row: DonationLeaderboardRow }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-lg border border-slate-600/80 bg-slate-900/90 px-3.5 py-2 text-sm font-medium text-white shadow-sm sm:px-4 sm:py-2.5 sm:text-base">
      {formatDonorName(row)} – {formatDonationRm(row.amount)}
    </span>
  );
}

/** ~8s per donor so the full list scrolls at a readable pace. */
function donateTickerDurationSeconds(donorCount: number) {
  return Math.max(150, donorCount * 8);
}

function DonorTicker({ rows }: { rows: DonationLeaderboardRow[] }) {
  if (rows.length === 0) {
    return (
      <p className="min-w-0 flex-1 text-sm text-slate-400">
        No donations recorded yet — be the first to support us.
      </p>
    );
  }

  if (rows.length === 1) {
    return (
      <div className="flex min-w-0 flex-1 gap-2">
        <DonorTickerChip row={rows[0]!} />
      </div>
    );
  }

  const loopRows = [...rows, ...rows];
  const scrollDuration = donateTickerDurationSeconds(rows.length);

  return (
    <div className="relative min-w-0 flex-1 overflow-hidden">
      <div
        className="flex w-max gap-2 animate-donate-ticker-scroll hover:[animation-play-state:paused]"
        style={{ "--donate-ticker-duration": `${scrollDuration}s` } as React.CSSProperties}
        aria-live="off"
      >
        {loopRows.map((entry, index) => (
          <DonorTickerChip
            key={`${entry.transactionRef ?? entry.name}-${entry.transactionTime}-${entry.amount}-${index}`}
            row={entry}
          />
        ))}
      </div>
    </div>
  );
}

function ProgressStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-[6.5rem] shrink-0 flex-col items-center justify-center rounded-lg border border-slate-600/80 bg-slate-900/90 px-2.5 py-1.5 sm:min-w-[7.5rem] sm:px-3 sm:py-2">
      <span className="text-[9px] font-bold uppercase tracking-wide text-red-500 sm:text-[10px]">
        {label}
      </span>
      <span className="mt-0.5 text-sm font-bold tabular-nums text-amber-400 sm:text-base">
        {value}
      </span>
    </div>
  );
}

export const Route = createFileRoute("/donate")({
  component: DonatePage,
  head: () => ({
    meta: [
      { title: "Donate — SJAM Selangor" },
      {
        name: "description",
        content:
          "Scan to donate and see recent supporters of St John Ambulance Selangor Darul Ehsan.",
      },
    ],
  }),
});

function DonatePage() {
  const { data } = useQuery({
    queryKey: ["donation-recent"],
    queryFn: fetchDonationRecent,
    refetchInterval: 15_000,
  });

  const leaderboardRows = data?.rows ?? [];
  const totalRaised = data?.raised ?? 0;
  const target = data?.target ?? 0;

  return (
    <div className="flex min-h-dvh flex-col overflow-y-auto bg-background text-foreground antialiased lg:h-dvh lg:max-h-dvh lg:overflow-hidden">
      <SiteTopChrome />

      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="mx-auto flex w-full max-w-[90rem] min-h-0 flex-1 flex-col gap-1.5 overflow-hidden px-3 py-1.5 sm:gap-2 sm:px-4 sm:py-2 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)] lg:grid-rows-1 lg:items-stretch xl:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)]">
          {/* Left — hero + 3×2 project grid */}
          <section className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="shrink-0 bg-primary px-4 py-1.5 text-primary-foreground sm:px-5 sm:py-2">
              <h1 className="text-base font-semibold tracking-tight sm:text-lg">We Need Your Support</h1>
              <p className="text-xs text-primary-foreground/90 sm:text-sm">
                Scan DuitNow on the right to donate.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 border-b border-border bg-muted/40 px-4 py-1.5 sm:px-5 sm:py-2">
              <LayoutGrid className="size-3.5 shrink-0 text-primary sm:size-4" aria-hidden />
              <p className="text-[11px] font-semibold leading-snug sm:text-xs">
                You are supporting our current projects from 2026 to 2028
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-2 sm:p-2.5 lg:overflow-hidden lg:p-2">
              <div className="grid h-full grid-cols-2 gap-1.5 sm:gap-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-2">
                {donationFundraisingProjects.map((project) => (
                  <FundraisingProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </section>

          {/* Right — DuitNow QR (fills column height on desktop) */}
          <section className="flex min-h-[14rem] shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:min-h-0">
            <div className="shrink-0 border-b border-border bg-muted/30 px-3 py-1.5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary sm:text-xs">DuitNow</p>
            </div>

            <div className="flex min-h-0 flex-1 flex-col px-3 py-2 sm:px-4 sm:py-3">
              <div className="flex min-h-0 flex-1 items-center justify-center rounded-lg border-2 border-destructive bg-white px-3 py-2 shadow-sm sm:px-4 sm:py-3">
                <img
                  src={donateQrCode}
                  alt="DuitNow donation QR code for St John Ambulance Selangor Darul Ehsan"
                  width={512}
                  height={512}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <p className="shrink-0 pt-2 text-center text-[10px] font-semibold text-foreground sm:text-xs">
                Scan to donate via DuitNow
              </p>
            </div>
          </section>
        </div>

        {/* Bottom status bar — full width */}
        <footer className="shrink-0 border-t border-slate-700/80 bg-[#1a1a24] text-white">
          <div className="mx-auto flex w-full max-w-[90rem] items-end gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
            <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:gap-2">
              <h2 className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-white sm:text-base">
                <Heart className="size-4 shrink-0 fill-red-500/30 text-red-500" aria-hidden />
                Thank You for Your Support
              </h2>
              <DonorTicker rows={leaderboardRows} />
            </div>
            <div className="flex shrink-0 items-end gap-2 sm:gap-3">
              <ProgressStat label="Total Raised" value={formatDonationRm(totalRaised)} />
              <ProgressStat label="Target" value={formatDonationRm(target)} />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
