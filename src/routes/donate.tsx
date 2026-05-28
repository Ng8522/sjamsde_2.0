import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { donationCampaigns } from "@/lib/donation-campaigns";
import { DONATE_PAGE_INTRO } from "@/lib/site-footer-content";

export const Route = createFileRoute("/donate")({
  component: DonatePage,
  head: () => ({
    meta: [
      { title: "Donate — SJAM Selangor" },
      {
        name: "description",
        content:
          "Support St John Ambulance Selangor Darul Ehsan. Tax-exempt donations help fund community medical and humanitarian services.",
      },
    ],
  }),
});

function DonatePage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-14 md:py-16">
          <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase">Donate</span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 text-balance">
            Choose a project and support SJAM Selangor
          </h1>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            {DONATE_PAGE_INTRO.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {donationCampaigns.map((campaign) => {
              const isUnlimited = campaign.goal === null;
              const fundedPct = isUnlimited
                ? 100
                : Math.max(0, Math.min(100, Math.round((campaign.raised / campaign.goal) * 100)));
              return (
                <article
                  key={campaign.title}
                  className="rounded-xl border border-border/70 bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={campaign.imageSrc}
                    alt={campaign.title}
                    className="w-full aspect-[16/10] object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h2 className="text-[1.35rem] font-semibold leading-snug text-foreground">{campaign.title}</h2>
                    <p className="text-xs text-muted-foreground mt-1">By {campaign.org}</p>
                    <p className="mt-3 inline-flex rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-1 text-[11px] font-semibold">
                      {campaign.status}
                    </p>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-1 text-foreground/80">
                        <span className="font-medium text-emerald-600">Raised</span>
                        <span className="font-medium">{isUnlimited ? "Type" : "Goal"}</span>
                      </div>
                      <div className="flex items-center justify-between text-2xl font-semibold text-foreground mb-2">
                        <span>RM {campaign.raised.toLocaleString()}</span>
                        <span>{isUnlimited ? "Unlimited" : `RM ${campaign.goal.toLocaleString()}`}</span>
                      </div>
                      {!isUnlimited && (
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                            style={{ width: `${fundedPct}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {campaign.donors.toLocaleString()} donations
                    </p>
                    <Button asChild className="w-full mt-4 gap-2">
                      <Link to="/donation/$projectId" params={{ projectId: campaign.id }}>
                        Donate now
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
