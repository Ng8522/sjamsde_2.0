import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Heart, LayoutGrid } from "lucide-react";

import donateQrCode from "@/assets/qrcode.png";
import { SiteTopChrome } from "@/components/site-layout";
import { fetchDonationLeaderboard, type DonationLeaderboardRow } from "@/lib/donation-api";
import {
  donationFundraisingProjects,
  type DonationFundraisingProject,
} from "@/lib/donation-fundraising-projects";
import {
  DONATION_PAGE_TARGET,
  DONATION_PAGE_TOTAL_RAISED,
  formatDonationRm,
  getDonationLeaderboardRows,
} from "@/lib/donation-leaderboard";
function FundraisingProjectCard({ project }: { project: DonationFundraisingProject }) {
  return (
    <article className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-background shadow-sm lg:h-full">
      <img
        src={project.imageSrc}
        alt={project.title}
        loading="lazy"
        className="min-h-0 w-full flex-1 object-cover lg:aspect-auto"
      />
      <div className="shrink-0 border-t border-border/60 bg-background px-1.5 py-1.5 sm:px-2 sm:py-2">
        <h3 className="text-center text-[10px] font-bold leading-snug text-primary sm:text-[11px]">
          {project.shortTitle}
        </h3>
      </div>
    </article>
  );
}

function DonorTickerChip({ donor, amount }: { donor: string; amount: number }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-md border border-foreground/80 bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm sm:text-sm">
      {donor} – {formatDonationRm(amount)}
    </span>
  );
}

function DonorTicker({ rows }: { rows: DonationLeaderboardRow[] }) {
  const loopRows = [...rows, ...rows];

  return (
    <div className="relative min-w-0 flex-1 overflow-hidden">
      <div
        className="flex w-max gap-2 animate-donate-ticker-scroll hover:[animation-play-state:paused]"
        aria-live="off"
      >
        {loopRows.map((entry, index) => (
          <DonorTickerChip
            key={`${entry.donor}-${entry.amount}-${index}`}
            donor={entry.donor}
            amount={entry.amount}
          />
        ))}
      </div>
    </div>
  );
}

function ProgressStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-[6.5rem] flex-col items-center justify-center rounded-lg border border-border bg-background px-2.5 py-1.5 sm:min-w-[7.5rem] sm:px-3 sm:py-2">
      <span className="text-[9px] font-bold uppercase tracking-wide text-destructive sm:text-[10px]">
        {label}
      </span>
      <span className="mt-0.5 text-base font-bold tabular-nums text-foreground sm:text-lg">
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
    queryKey: ["donation-leaderboard"],
    queryFn: fetchDonationLeaderboard,
    refetchInterval: 15_000,
    placeholderData: { rows: getDonationLeaderboardRows(), source: "mock" as const },
  });

  const leaderboardRows = data?.rows ?? getDonationLeaderboardRows();

  return (
    <div className="flex min-h-dvh flex-col overflow-y-auto bg-background text-foreground antialiased lg:h-dvh lg:max-h-dvh lg:overflow-hidden">
      <SiteTopChrome />

      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="mx-auto flex w-full max-w-[90rem] min-h-0 flex-1 flex-col gap-2 overflow-hidden px-3 py-2 sm:gap-3 sm:px-4 sm:py-3 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)] lg:grid-rows-1 lg:items-stretch xl:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)]">
          {/* Left — hero + 3×2 project grid */}
          <section className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="shrink-0 bg-primary px-3 py-2 text-primary-foreground sm:px-4 sm:py-2.5 lg:px-4 lg:py-2">
              <h1 className="text-base font-semibold tracking-tight sm:text-lg">We Need Your Support</h1>
              <p className="mt-0.5 text-xs text-primary-foreground/90 sm:text-sm">
                Scan DuitNow on the right to donate.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 border-b border-border bg-muted/40 px-3 py-2 sm:px-4 lg:py-1.5">
              <LayoutGrid className="size-3.5 shrink-0 text-primary" aria-hidden />
              <p className="text-[11px] font-semibold leading-snug sm:text-xs">
                You are supporting our current projects from 2026 to 2028
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-2 sm:p-3 lg:overflow-hidden lg:p-2.5">
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
        <footer className="shrink-0 border-t border-border bg-muted/30">
          <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-2 px-3 py-2 sm:flex-row sm:items-center sm:gap-3 sm:px-4 sm:py-2.5">
            <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <h2 className="flex shrink-0 items-center gap-1.5 text-sm font-semibold whitespace-nowrap sm:text-base">
                <Heart className="size-4 fill-primary/20 text-primary" aria-hidden />
                Thank You for Your Support
              </h2>
              <DonorTicker rows={leaderboardRows} />
            </div>

            <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
              <ProgressStat
                label="Total Raised"
                value={formatDonationRm(DONATION_PAGE_TOTAL_RAISED)}
              />
              <ProgressStat label="Target" value={formatDonationRm(DONATION_PAGE_TARGET)} />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
