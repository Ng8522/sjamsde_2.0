import { createFileRoute } from "@tanstack/react-router";
import { Heart, LayoutGrid } from "lucide-react";

import donateQrCode from "@/assets/qrcode.png";
import { SiteTopChrome } from "@/components/site-layout";
import {
  donationFundraisingProjects,
  type DonationFundraisingProject,
} from "@/lib/donation-fundraising-projects";
import { getDonationLeaderboardRows } from "@/lib/donation-leaderboard";
import { cn } from "@/lib/utils";

function LeaderboardDateTime({ value }: { value: string }) {
  return (
    <span className="whitespace-nowrap text-foreground/80 tabular-nums">{value}</span>
  );
}

type LeaderboardRow = ReturnType<typeof getDonationLeaderboardRows>[number];

const LEADERBOARD_COLUMNS = [
  { label: "DateTime", width: "32%", align: "center" as const },
  { label: "Donor", width: "34%", align: "center" as const },
  { label: "Amount", width: "17%", align: "right" as const },
  { label: "Total", width: "17%", align: "right" as const },
];

function LeaderboardColGroup() {
  return (
    <colgroup>
      {LEADERBOARD_COLUMNS.map((col) => (
        <col key={col.label} style={{ width: col.width }} />
      ))}
    </colgroup>
  );
}

function DonorLeaderboard({ rows }: { rows: LeaderboardRow[] }) {
  const loopRows = [...rows, ...rows];

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <table className="w-full table-fixed border-collapse">
        <LeaderboardColGroup />
        <thead>
          <tr className="border-b border-border bg-muted/30">
            {LEADERBOARD_COLUMNS.map((col) => (
              <th
                key={col.label}
                className={cn(
                  "px-2 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-muted-foreground align-middle",
                  col.align === "center" && "text-center",
                  col.align === "right" && "text-right",
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
      </table>

      <div className="relative min-h-[12.5rem] flex-1 overflow-hidden">
        <div
          className="animate-donate-leaderboard-scroll hover:[animation-play-state:paused]"
          aria-live="off"
        >
          <table className="w-full table-fixed border-collapse">
            <LeaderboardColGroup />
            <tbody>
              {loopRows.map((entry, index) => (
                <tr
                  key={`${entry.dateTime}-${entry.donor}-${index}`}
                  className={cn(
                    "h-10 border-b border-border/50",
                    index % 2 === 0 ? "bg-background" : "bg-muted/20",
                  )}
                >
                  <td className="px-2 py-2 text-[10px] sm:text-[11px] text-center align-middle whitespace-nowrap">
                    <LeaderboardDateTime value={entry.dateTime} />
                  </td>
                  <td className="px-2 py-2 text-[10px] sm:text-[11px] font-medium leading-snug text-center align-middle break-words">
                    {entry.donor}
                  </td>
                  <td className="px-2 py-2 text-[10px] sm:text-[11px] font-semibold text-primary text-right tabular-nums align-middle whitespace-nowrap">
                    {entry.amount.toLocaleString()}
                  </td>
                  <td className="px-2 py-2 text-[10px] sm:text-[11px] font-semibold text-foreground text-right tabular-nums align-middle whitespace-nowrap">
                    {entry.total.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FundraisingProjectCard({ project }: { project: DonationFundraisingProject }) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-background shadow-sm">
      <img
        src={project.imageSrc}
        alt={project.title}
        loading="lazy"
        className="aspect-[4/3] w-full shrink-0 object-cover"
      />
      <div className="p-2 sm:p-2.5">
        <h3 className="text-[10px] sm:text-xs font-bold leading-snug text-primary line-clamp-2">
          {project.shortTitle}
        </h3>
      </div>
    </article>
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
  const leaderboardRows = getDonationLeaderboardRows();

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground antialiased lg:h-screen lg:max-h-dvh lg:overflow-hidden">
      <SiteTopChrome />

      <main className="relative flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
        {/* WP: Donate page — 2-column layout (content left, QR right) */}
        <div className="flex h-full min-h-0 flex-col gap-3 px-4 py-3 sm:px-6 sm:py-4 max-w-[90rem] mx-auto w-full lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(21rem,28rem)] lg:grid-rows-[auto_minmax(0,1fr)] lg:gap-3">
          {/* Top left — hero + projects */}
          <section className="flex shrink-0 flex-col rounded-2xl border border-border bg-card shadow-sm lg:col-start-1 lg:row-start-1">
            <div className="shrink-0 border-b border-border bg-primary px-3 py-2 sm:px-4 sm:py-2.5 text-primary-foreground">
              <h1 className="text-base sm:text-lg font-semibold tracking-tight leading-tight">
                We Need Your Support
              </h1>
              <p className="mt-0.5 text-xs sm:text-sm text-primary-foreground/90">
                Scan DuitNow on the right to donate.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-1.5 border-b border-border bg-muted/40 px-3 py-2 sm:px-4">
              <LayoutGrid className="size-3.5 shrink-0 text-primary" />
              <h2 className="text-[11px] sm:text-xs font-semibold leading-snug">
                You are supporting our current projects from 2026 to 2028
              </h2>
            </div>

            <div className="overflow-x-auto p-2 sm:p-2.5 lg:overflow-visible">
              <div className="grid min-w-[48rem] grid-cols-6 gap-2 sm:gap-2.5 lg:min-w-0">
                {donationFundraisingProjects.map((project) => (
                  <FundraisingProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </section>

          {/* Bottom left — donor leaderboard */}
          <section className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:col-start-1 lg:row-start-2">
            <div className="shrink-0 flex items-center border-b border-border bg-muted/40 px-3 py-2.5 sm:px-4">
              <h2 className="flex items-center gap-1.5 text-sm font-semibold">
                <Heart className="size-4 text-primary fill-primary/20" />
                Thank You for Your Support
              </h2>
            </div>

            <DonorLeaderboard rows={leaderboardRows} />
          </section>

          {/* Right — full-height DuitNow QR */}
          <section className="flex min-h-[16rem] flex-col overflow-hidden rounded-2xl border-2 border-primary/20 bg-card shadow-sm lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <div className="shrink-0 border-b border-border bg-primary/5 px-3 py-2 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">DuitNow</p>
            </div>
            <div className="flex flex-1 min-h-0 flex-col items-center justify-center gap-2 p-2 sm:p-3">
              <div className="flex h-full w-full min-h-[12rem] items-center justify-center rounded-lg bg-white p-1.5 ring-1 ring-border">
                <img
                  src={donateQrCode}
                  alt="DuitNow donation QR code for St John Ambulance Selangor Darul Ehsan"
                  width={512}
                  height={512}
                  className="h-full w-full max-h-none object-contain"
                />
              </div>
              <p className="shrink-0 text-center text-xs font-semibold text-foreground">
                Scan to donate via DuitNow
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
