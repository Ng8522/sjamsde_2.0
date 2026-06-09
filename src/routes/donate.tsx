import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Heart, LayoutGrid } from "lucide-react";

import donateQrCode from "@/assets/qrcode.png";
import { SiteTopChrome } from "@/components/site-layout";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  donationFundraisingProjects,
  getFundraisingProgress,
} from "@/lib/donation-fundraising-projects";
import { getDonationLeaderboardRows } from "@/lib/donation-leaderboard";
import { cn } from "@/lib/utils";

function LeaderboardDateTime({ value }: { value: string }) {
  const [date, time = ""] = value.split(", ");

  return (
    <span className="block leading-tight">
      <span className="block text-foreground/75">{date}</span>
      {time ? <span className="block text-muted-foreground">{time}</span> : null}
    </span>
  );
}

function FundraisingProjectCard({
  title,
  imageSrc,
  raised,
  goal,
}: {
  title: string;
  imageSrc: string;
  raised: number;
  goal: number;
}) {
  const progress = getFundraisingProgress({ id: "", title, imageSrc, raised, goal });

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border/70 bg-background shadow-sm">
      <img
        src={imageSrc}
        alt={title}
        loading="lazy"
        className="h-14 sm:h-16 w-full shrink-0 object-cover"
      />
      <div className="flex flex-col gap-1.5 p-2 sm:p-2.5">
        <h3 className="text-[10px] sm:text-xs font-semibold leading-snug line-clamp-2 text-foreground">
          {title}
        </h3>
        <div className="flex items-center justify-between gap-1 text-[9px] sm:text-[10px] text-muted-foreground tabular-nums">
          <span className="font-semibold text-primary">RM {raised.toLocaleString()}</span>
          <span>RM {goal.toLocaleString()}</span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${title} funding progress`}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            style={{ width: `${progress}%` }}
          />
        </div>
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
  const [qrPreviewOpen, setQrPreviewOpen] = useState(false);
  const leaderboardRows = getDonationLeaderboardRows();

  return (
    <div className="h-screen max-h-dvh overflow-hidden flex flex-col bg-background text-foreground antialiased">
      <SiteTopChrome />

      <main className="relative flex-1 min-h-0">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 -left-24 size-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-80 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="flex h-full min-h-0 flex-col gap-3 px-4 py-3 sm:px-6 sm:py-4 max-w-7xl mx-auto w-full">
          <section className="shrink-0 overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary to-secondary shadow-lg shadow-primary/20">
            <div className="grid sm:grid-cols-[1fr_auto] items-center gap-4 p-4 sm:p-5">
              <div className="text-primary-foreground text-center sm:text-left">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em]">
                  <Heart className="size-3 fill-current" />
                  Donate
                </span>
                <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
                  We Need Your Support
                </h1>
                <p className="mt-2 text-sm sm:text-base text-primary-foreground/90 max-w-lg mx-auto sm:mx-0 leading-relaxed">
                  Every cost counts as below.
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 shrink-0 mx-auto sm:mx-0">
                <button
                  type="button"
                  onClick={() => setQrPreviewOpen(true)}
                  className="group rounded-xl bg-white p-2.5 sm:p-3 shadow-md ring-1 ring-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  aria-label="Zoom in donation QR code"
                >
                  <img
                    src={donateQrCode}
                    alt="DuitNow donation QR code"
                    width={512}
                    height={512}
                    className="size-24 sm:size-28 md:size-[7.5rem] object-contain transition-transform group-hover:scale-[1.02]"
                  />
                </button>
                <p className="text-[11px] sm:text-xs font-medium text-primary-foreground/90 text-center">
                  Scan QR Code to donate · Tap to enlarge
                </p>
                <Dialog open={qrPreviewOpen} onOpenChange={setQrPreviewOpen}>
                  <DialogContent className="max-w-[min(96vw,28rem)] border-border p-3 sm:p-4 gap-0">
                    <DialogTitle className="sr-only">Donation QR code</DialogTitle>
                    <img
                      src={donateQrCode}
                      alt="DuitNow donation QR code — enlarged"
                      width={512}
                      height={512}
                      className="w-full max-h-[min(85vh,28rem)] object-contain rounded-lg bg-white"
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </section>

          <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] gap-3">
            <section className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/90 shadow-sm backdrop-blur-sm">
              <div className="shrink-0 flex items-center border-b border-border/70 bg-gradient-to-r from-primary/5 to-secondary/5 px-3 py-2.5 sm:px-4">
                <h2 className="flex items-center gap-1.5 text-sm font-semibold">
                  <Heart className="size-4 text-primary fill-primary/20" />
                  Thank You for Your Support
                </h2>
              </div>

              <div className="min-h-0 flex-1 overflow-hidden">
                <table className="w-full table-fixed border-collapse">
                  <thead>
                    <tr className="border-b border-border/80 bg-muted/40">
                      {[
                        { label: "DateTime", className: "w-[30%]" },
                        { label: "Donor", className: "w-[34%]" },
                        { label: "Amount", className: "w-[18%] text-right" },
                        { label: "Total", className: "w-[18%] text-right" },
                      ].map((col) => (
                        <th
                          key={col.label}
                          className={cn(
                            "px-2 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-muted-foreground",
                            col.className,
                          )}
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardRows.map((entry, index) => (
                      <tr
                        key={`${entry.dateTime}-${entry.donor}`}
                        className={cn(
                          "border-b border-border/50 last:border-0",
                          index % 2 === 0 ? "bg-background" : "bg-muted/20",
                        )}
                      >
                        <td className="px-2 py-1.5 text-[10px] sm:text-[11px] align-top">
                          <LeaderboardDateTime value={entry.dateTime} />
                        </td>
                        <td className="px-2 py-1.5 text-[10px] sm:text-[11px] font-medium leading-snug break-words align-top">
                          {entry.donor}
                        </td>
                        <td className="px-2 py-1.5 text-[10px] sm:text-[11px] font-semibold text-primary text-right tabular-nums align-top whitespace-nowrap">
                          {entry.amount.toLocaleString()}
                        </td>
                        <td className="px-2 py-1.5 text-[10px] sm:text-[11px] font-semibold text-foreground text-right tabular-nums align-top whitespace-nowrap">
                          {entry.total.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/90 shadow-sm backdrop-blur-sm">
              <div className="shrink-0 border-b border-border/70 bg-gradient-to-r from-primary/5 to-secondary/5 px-3 py-2.5 sm:px-4">
                <h2 className="flex items-center gap-1.5 text-sm font-semibold">
                  <LayoutGrid className="size-4 text-primary" />
                  What we will do from 2026 to 2028
                </h2>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2 sm:p-2.5 grid grid-cols-2 lg:grid-cols-4 gap-2 content-start">
                {donationFundraisingProjects.map((project) => (
                  <FundraisingProjectCard
                    key={project.id}
                    title={project.title}
                    imageSrc={project.imageSrc}
                    raised={project.raised}
                    goal={project.goal}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
