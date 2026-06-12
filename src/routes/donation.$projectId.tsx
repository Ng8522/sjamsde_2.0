import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock3, MapPin, Share2, Users } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { getDonationCampaignById } from "@/lib/donation-campaigns";
import { fetchDonationRecent } from "@/lib/donation-api";
import { formatDonationRm, formatDonorName } from "@/lib/donation-leaderboard";

export const Route = createFileRoute("/donation/$projectId")({
  component: DonationDetailsPage,
});

function DonationDetailsPage() {
  const { projectId } = Route.useParams();
  const project = getDonationCampaignById(projectId);
  const { data: recent } = useQuery({
    queryKey: ["donation-recent"],
    queryFn: fetchDonationRecent,
    refetchInterval: 15_000,
  });

  if (!project) {
    return (
      <SiteLayout>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-semibold">Donation project not found</h1>
          <Button asChild className="mt-6">
            <Link to="/donate">Back to donation projects</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  const isUnlimited = project.goal === null;
  const fundedPct = isUnlimited
    ? 100
    : Math.max(0, Math.min(100, Math.round((project.raised / project.goal) * 100)));

  return (
    <SiteLayout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <section className="space-y-4">
            <article className="rounded-xl border border-border bg-card overflow-hidden">
              <img src={project.imageSrc} alt={project.title} className="w-full aspect-[16/8] object-cover" />
              <div className="p-5">
                <h1 className="text-3xl font-semibold text-foreground">{project.title}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-4" />
                    {project.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    {project.location}
                  </span>
                </div>
              </div>
            </article>

            <article className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-base font-semibold">Organizer</h2>
              <p className="mt-2 text-sm text-muted-foreground">{project.org}</p>
            </article>

            <article className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-base font-semibold">Fundraiser Story</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.story}</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/payment">Donate</Link>
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  <Share2 className="size-4" />
                  Share
                </Button>
              </div>
            </article>
          </section>

          <aside className="space-y-4">
            <article className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between text-sm mb-1 text-foreground/80">
                <span className="font-medium text-emerald-600">Raised</span>
                <span className="font-medium">{isUnlimited ? "Type" : "Goal"}</span>
              </div>
              <div className="flex items-center justify-between text-2xl font-semibold text-foreground">
                <span>RM {project.raised.toLocaleString()}</span>
                <span>{isUnlimited ? "Unlimited" : `RM ${project.goal.toLocaleString()}`}</span>
              </div>
              {!isUnlimited && (
                <>
                  <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: `${fundedPct}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="size-3.5" />
                      Ongoing campaign
                    </span>
                    <span>{fundedPct}% funded</span>
                  </div>
                </>
              )}

              <div className="mt-4 flex gap-2">
                <Button type="button" variant="secondary" className="flex-1">
                  Share
                </Button>
                <Button asChild className="flex-1">
                  <Link to="/payment">Donate</Link>
                </Button>
              </div>
            </article>

            <article className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-semibold">Recent Donations</h2>
                <span className="text-xs text-primary font-semibold">
                  {(recent?.donationCount ?? 0).toLocaleString()} supporters
                </span>
              </div>
              <div className="space-y-3">
                {(recent?.rows ?? []).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No donations recorded yet.</p>
                ) : (
                  (recent?.rows ?? []).slice(0, 5).map((item, index) => (
                    <div
                      key={`${item.name}-${item.transactionTime}-${index}`}
                      className="flex items-center justify-between border-b border-border/70 pb-2"
                    >
                      <p className="text-sm text-foreground">{formatDonorName(item)}</p>
                      <p className="text-sm font-semibold">{formatDonationRm(item.amount)}</p>
                    </div>
                  ))
                )}
              </div>
            </article>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}
