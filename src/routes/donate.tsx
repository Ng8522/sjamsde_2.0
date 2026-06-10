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
    <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm">
      <img
        src={project.imageSrc}
        alt={project.title}
        loading="lazy"
        className="aspect-[4/3] w-full shrink-0 object-cover"
      />
      <div className="border-t border-border/60 bg-background px-2 py-2 sm:px-3 sm:py-2.5">
        <h3 className="text-center text-[11px] font-bold leading-snug text-primary sm:text-xs">
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
    <div className="flex min-w-[7.5rem] flex-col items-center justify-center rounded-lg border border-border bg-background px-3 py-2 sm:min-w-[9rem] sm:px-4">
      <span className="text-[10px] font-bold uppercase tracking-wide text-destructive sm:text-xs">
        {label}
      </span>
      <span className="mt-0.5 text-lg font-bold tabular-nums text-foreground sm:text-xl">
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
    <div className="flex min-h-dvh flex-col bg-background text-foreground antialiased">
      <SiteTopChrome />

      <main className="flex min-h-0 flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-[90rem] min-h-0 flex-1 flex-col gap-3 px-3 py-3 sm:px-4 sm:py-4 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(17rem,22rem)] lg:items-stretch xl:grid-cols-[minmax(0,1fr)_minmax(19rem,24rem)]">
          {/* Left — hero + 3×2 project grid */}
          <section className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="shrink-0 bg-primary px-4 py-3 text-primary-foreground sm:px-5 sm:py-4">
              <h1 className="text-lg font-semibold tracking-tight sm:text-xl">We Need Your Support</h1>
              <p className="mt-1 text-sm text-primary-foreground/90 sm:text-base">
                Scan DuitNow on the right to donate.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5 sm:px-5">
              <LayoutGrid className="size-4 shrink-0 text-primary" aria-hidden />
              <p className="text-xs font-semibold leading-snug sm:text-sm">
                You are supporting our current projects from 2026 to 2028
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">
              <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
                {donationFundraisingProjects.map((project) => (
                  <FundraisingProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </section>

          {/* Right — DuitNow QR */}
          <section className="flex min-h-[18rem] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:min-h-0">
            <div className="shrink-0 border-b border-border bg-muted/30 px-4 py-2 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">DuitNow</p>
            </div>

            <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 p-3 sm:p-4">
              <div className="w-full max-w-[18rem] rounded-lg border-[3px] border-destructive bg-white p-3 shadow-sm sm:max-w-none sm:p-4">
                <img
                  src={donateQrCode}
                  alt="DuitNow donation QR code for St John Ambulance Selangor Darul Ehsan"
                  width={512}
                  height={512}
                  className="mx-auto aspect-square w-full max-w-[14rem] object-contain sm:max-w-none"
                />
                <div className="mt-3 space-y-1 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-foreground sm:text-xs">
                    St John Ambulans Malaysia
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
                    Malaysia National QR
                  </p>
                  <p className="pt-1 text-[9px] leading-snug text-muted-foreground sm:text-[10px]">
                    Accepted by participating Banks and e-wallets
                  </p>
                  <p className="text-[10px] font-bold italic text-muted-foreground sm:text-xs">OCBC</p>
                </div>
              </div>

              <p className="text-center text-xs font-semibold text-foreground sm:text-sm">
                Scan to donate via DuitNow
              </p>
            </div>
          </section>
        </div>

        {/* Bottom status bar — full width */}
        <footer className="shrink-0 border-t border-border bg-muted/30">
          <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-4 sm:py-3">
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
