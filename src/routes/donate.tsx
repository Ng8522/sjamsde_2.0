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
import { DONATION_EVENT_TITLE } from "@/lib/donation-event";
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
    <span className="donate-ticker-chip inline-flex shrink-0 items-center rounded-lg border border-slate-600/80 bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-white shadow-sm sm:px-3.5 sm:py-2 sm:text-sm md:px-4 md:py-2.5 md:text-base lg:rounded-xl lg:px-5 lg:py-3 lg:text-xl xl:px-6 xl:py-3.5 xl:text-2xl 2xl:px-8 2xl:py-4 2xl:text-3xl">
      {formatDonorName(row)} – {formatDonationRm(row.amount)}
    </span>
  );
}

/** ~5s per donor — slightly faster scroll for venue displays. */
function donateTickerDurationSeconds(donorCount: number) {
  return Math.max(90, donorCount * 5);
}

function DonorTicker({ rows }: { rows: DonationLeaderboardRow[] }) {
  if (rows.length === 0) {
    return (
      <p className="min-w-0 flex-1 text-xs text-slate-400 sm:text-sm md:text-base lg:text-xl xl:text-2xl">
        No donations recorded yet — be the first to support us.
      </p>
    );
  }

  if (rows.length === 1) {
    return (
      <div className="flex min-w-0 flex-1 gap-2 sm:gap-2.5 lg:gap-4 xl:gap-5">
        <DonorTickerChip row={rows[0]!} />
      </div>
    );
  }

  const loopRows = [...rows, ...rows];
  const scrollDuration = donateTickerDurationSeconds(rows.length);

  return (
    <div className="relative min-w-0 flex-1 overflow-hidden">
      <div
        className="flex w-max gap-2 animate-donate-ticker-scroll hover:[animation-play-state:paused] sm:gap-2.5 lg:gap-4 xl:gap-5"
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
    <div className="donate-progress-stat flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg border border-slate-600/80 bg-slate-900/90 px-2.5 py-1.5 sm:min-w-[8rem] sm:flex-none sm:px-3 sm:py-2 md:min-w-[9rem] md:px-3.5 md:py-2.5 lg:min-h-[7vh] lg:min-w-[11rem] lg:rounded-xl lg:px-5 lg:py-4 xl:min-w-[13rem] xl:px-6 xl:py-5 2xl:min-w-[16rem] 2xl:px-8 2xl:py-6">
      <span className="text-[9px] font-bold uppercase tracking-wide text-red-500 sm:text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
        {label}
      </span>
      <span className="donate-progress-stat-value mt-0.5 text-base font-bold tabular-nums text-amber-400 sm:mt-1 sm:text-lg lg:mt-2 lg:text-3xl xl:text-4xl 2xl:text-5xl">
        {value}
      </span>
    </div>
  );
}

export const Route = createFileRoute("/donate")({
  component: DonatePage,
  head: () => ({
    meta: [
      { title: `Donate — ${DONATION_EVENT_TITLE}` },
      {
        name: "description",
        content: `Scan to donate and support ${DONATION_EVENT_TITLE}.`,
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
    <div className="donate-showcase flex min-h-dvh flex-col overflow-y-auto bg-background text-foreground antialiased lg:h-dvh lg:max-h-dvh lg:overflow-hidden">
      <SiteTopChrome />

      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="mx-auto flex w-full max-w-[90rem] min-h-0 flex-1 flex-col gap-1.5 overflow-hidden px-3 py-1.5 sm:gap-2 sm:px-4 sm:py-2 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)] lg:grid-rows-1 lg:items-stretch xl:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)]">
          {/* Left — hero + 3×2 project grid */}
          <section className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="shrink-0 bg-primary px-4 py-1.5 text-primary-foreground sm:px-5 sm:py-2">
              <h1 className="text-sm font-semibold leading-snug tracking-tight sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                {DONATION_EVENT_TITLE}
              </h1>
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

        {/* Bottom status bar — venue showcase scale on large screens */}
        <footer className="donate-footer shrink-0 border-t border-slate-700/80 bg-[#1a1a24] text-white lg:min-h-[14vh] xl:min-h-[16vh] 2xl:min-h-[18vh]">
          <div className="donate-footer-inner mx-auto flex h-full w-full max-w-[90rem] flex-col gap-2 px-3 py-2.5 sm:flex-row sm:items-stretch sm:gap-3 sm:px-4 sm:py-3 md:gap-3.5 md:py-3.5 lg:gap-5 lg:px-6 lg:py-5 xl:gap-6 xl:px-8 xl:py-6 2xl:gap-8 2xl:px-10 2xl:py-8">
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 xl:gap-4">
              <h2 className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-white sm:gap-2 sm:text-base lg:gap-3 lg:text-2xl xl:text-3xl 2xl:text-4xl">
                <Heart
                  className="size-4 shrink-0 fill-red-500/30 text-red-500 sm:size-5 lg:size-8 xl:size-10 2xl:size-12"
                  aria-hidden
                />
                Thank You for Your Support
              </h2>
              <DonorTicker rows={leaderboardRows} />
            </div>
            <div className="flex w-full shrink-0 gap-2 sm:w-auto sm:items-stretch sm:gap-2.5 lg:min-w-[24rem] lg:gap-4 xl:min-w-[28rem] xl:gap-5 2xl:min-w-[34rem] 2xl:gap-6">
              <ProgressStat label="Total Raised" value={formatDonationRm(totalRaised)} />
              <ProgressStat label="Target" value={formatDonationRm(target)} />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
