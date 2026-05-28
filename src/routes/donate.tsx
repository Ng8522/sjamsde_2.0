import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { DONATE_PAGE_INTRO } from "@/lib/site-footer-content";
import bloodDonationImg from "../assets/blood_donation.jpg";
import disasterReliefImg from "../assets/disaster_relief.jpg";
import fundraisingImg from "../assets/fund1.jpg";
import mobileClinicImg from "../assets/mobile_clinic.JPG";

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

const donationCampaigns = [
  {
    title: "LifeSaver Ambulance Fuel Fund",
    org: "SJAM Selangor",
    status: "Active",
    raised: 35706,
    goal: 72551,
    donors: 1300,
    imageSrc: fundraisingImg,
  },
  {
    title: "Community Blood Drive Support",
    org: "SJAM Selangor",
    status: "Ongoing",
    raised: 16240,
    goal: 45000,
    donors: 478,
    imageSrc: bloodDonationImg,
  },
  {
    title: "Dialysis Patient Transport Aid",
    org: "SJAM Selangor",
    status: "Urgent",
    raised: 2825,
    goal: 15000,
    donors: 34,
    imageSrc: mobileClinicImg,
  },
  {
    title: "Flood Relief Medical Packs",
    org: "SJAM Selangor",
    status: "Standby",
    raised: 12480,
    goal: 40000,
    donors: 221,
    imageSrc: disasterReliefImg,
  },
  {
    title: "First Aid Training Scholarships",
    org: "SJAM Selangor",
    status: "Active",
    raised: 9160,
    goal: 28000,
    donors: 95,
    imageSrc: bloodDonationImg,
  },
  {
    title: "Community AED Expansion",
    org: "SJAM Selangor",
    status: "Planning",
    raised: 15340,
    goal: 55000,
    donors: 184,
    imageSrc: fundraisingImg,
  },
  {
    title: "Volunteer Uniform & PPE",
    org: "SJAM Selangor",
    status: "Active",
    raised: 6840,
    goal: 20000,
    donors: 76,
    imageSrc: disasterReliefImg,
  },
  {
    title: "Mobile Clinic Medicine Basket",
    org: "SJAM Selangor",
    status: "Urgent",
    raised: 11890,
    goal: 32000,
    donors: 142,
    imageSrc: mobileClinicImg,
  },
  {
    title: "Youth Medics Development Fund",
    org: "SJAM Selangor",
    status: "Ongoing",
    raised: 10420,
    goal: 30000,
    donors: 129,
    imageSrc: bloodDonationImg,
  },
] as const;

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
              const fundedPct = Math.max(
                0,
                Math.min(100, Math.round((campaign.raised / campaign.goal) * 100)),
              );
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
                        <span className="font-medium">Goal</span>
                      </div>
                      <div className="flex items-center justify-between text-2xl font-semibold text-foreground mb-2">
                        <span>RM {campaign.raised.toLocaleString()}</span>
                        <span>RM {campaign.goal.toLocaleString()}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                          style={{ width: `${fundedPct}%` }}
                        />
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {campaign.donors.toLocaleString()} donations
                    </p>
                    <Button asChild className="w-full mt-4 gap-2">
                      <Link to="/payment">
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
