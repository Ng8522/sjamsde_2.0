import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  HeartHandshake,
} from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import {
  ABOUT_HERO,
  ABOUT_INTRO,
  ABOUT_STATS,
} from "@/lib/about-content";
import communityImg from "../assets/community.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — SJAM Selangor" },
      {
        name: "description",
        content:
          "Learn about St John Ambulans Malaysia Selangor — 24-hour ambulance services, blood donation drives and community medical programmes.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/2 to-background border-b border-primary/20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-secondary/15 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.3em] uppercase bg-gradient-to-r from-primary/15 to-secondary/10 px-4 py-2 rounded-full w-fit border border-primary/20 mb-6">{ABOUT_HERO.eyebrow}</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter max-w-4xl leading-tight mb-8">{ABOUT_HERO.title}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-6 font-medium">{ABOUT_HERO.subtitle}</p>
          <p className="text-base font-semibold text-primary tracking-wide uppercase">{ABOUT_HERO.motto}</p>
        </div>
      </section>

      <section className="border-b border-primary/20 bg-gradient-to-r from-primary/8 via-background to-secondary/8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-primary/15">
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label} className="py-12 px-4 md:px-6 text-center md:text-left group hover:bg-primary/5 transition-colors cursor-default">
              <div className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tabular-nums group-hover:scale-110 transition-transform origin-left">{stat.value}</div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-3 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 right-0 w-96 h-96 bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[minmax(0,420px)_1fr] gap-6 lg:gap-20 items-start">
          <div className="group">
            <img
              src={communityImg}
              alt="SJAM Selangor volunteers serving the community"
              className="w-full aspect-[4/3] object-cover rounded-3xl ring-4 ring-primary/20 shadow-2xl shadow-primary/30 group-hover:shadow-primary/50 group-hover:ring-primary/40 transition-all"
            />
          </div>
          <div>
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.3em] uppercase bg-gradient-to-r from-primary/15 to-secondary/10 px-4 py-2 rounded-full w-fit border border-primary/20 mb-6">Who we are</span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-8 leading-tight">Serving with <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">heart</span></h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              {ABOUT_INTRO.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-base font-medium">{paragraph}</p>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <Button asChild>
                <Link to="/volunteer">
                  <HeartHandshake className="size-5" />
                  Join as volunteer
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/donate">
                  <ArrowRight className="size-5" />
                  Support our work
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 bg-gradient-to-br from-background via-primary/2 to-background relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 right-0 w-96 h-96 bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-32 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.3em] uppercase bg-primary/10 px-4 py-2 rounded-full mb-4 border border-primary/20">
              <span className="size-2 rounded-full bg-primary" />
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter max-w-2xl mx-auto leading-tight">History & Milestones</h2>
          </div>

          <div className="space-y-8">
            {[
              {
                year: "1972",
                title: "New Era Begins",
                desc: "As a result of the St. John Ambulance (Incorporation) Act, St. John Council were formed in every state. This movement marks the new beginning of the organisation as St. John Ambulance enters a new era.",
              },
              {
                year: "1990",
                title: "SJAM-SDE Established",
                desc: "SJAM – SDE was officially segregated from SJAM Wilayah Persekutuan. Dr. Chen Soo-See was appointed as the first State Commander, serving with dedication until 1998.",
              },
              {
                year: "1998",
                title: "Leadership Transition",
                desc: "Mr Ho Thiam Hock was appointed as State Commander after being transferred from National Headquarters. Under his command and along with Mr Yeo Kim Thong as Deputy State Commander, SJAM – SDE saw significant changes in administration and re-demarcation of Areas.",
              },
              {
                year: "2004",
                title: "Era of Growth",
                desc: "Mr Yeo Kim Thong was appointed as State Commander. Under his visionary leadership, more projects and changes were implemented to improve and benefit the Area HQs, officers and members.",
              },
              {
                year: "2009",
                title: "National Recognition",
                desc: "On 12th December, State Commander Mr Yeo Kim Thong (Burnard) was awarded the Darjah Kebesaran Dato'-Sultan Sharafuddin Idris Shah (D.S.I.S) by HRH Sultan of Selangor. The award carries the title Dato' in recognition of his tremendous contribution and leadership.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-8 animate-on-scroll" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 text-center">
                    <span className="inline-block text-2xl font-semibold text-primary">{item.year}</span>
                  </div>
                  <div className="w-1 h-20 bg-gradient-to-b from-primary to-secondary rounded-full" />
                  {idx === 4 && <div className="w-6 h-6 rounded-full bg-primary" />}
                </div>
                <div className="pb-8 flex-1">
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-primary/40 hover:shadow-lg transition-all">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
