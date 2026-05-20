import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Ambulance,
  ArrowRight,
  Droplets,
  HeartHandshake,
  Phone,
  Users,
} from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import {
  ABOUT_HERO,
  ABOUT_INTRO,
  ABOUT_OTHER_SERVICES,
  ABOUT_STATS,
  AMBULANCE_SERVICE,
  BLOOD_DONATION,
} from "@/lib/about-content";
import ambulanceImg from "../assets/ambulance.jpg";
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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b border-border">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "28px 28px",
            color: "var(--primary)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-14 md:py-16">
          <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase">{ABOUT_HERO.eyebrow}</span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 max-w-2xl">{ABOUT_HERO.title}</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">{ABOUT_HERO.subtitle}</p>
          <p className="text-sm font-medium text-primary mt-6 tracking-wide">{ABOUT_HERO.motto}</p>
        </div>
      </section>

      <section className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label} className="py-8 px-4 md:px-6 text-center md:text-left">
              <div className="text-2xl md:text-3xl font-semibold text-primary tabular-nums">{stat.value}</div>
              <p className="text-[11px] md:text-xs uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_minmax(0,380px)] gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Who we are</h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              {ABOUT_INTRO.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/volunteer">
                  <Users className="size-4" />
                  Join as volunteer
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/donate">
                  <HeartHandshake className="size-4" />
                  Support our work
                </Link>
              </Button>
            </div>
          </div>
          <img
            src={communityImg}
            alt="SJAM Selangor volunteers serving the community"
            className="w-full aspect-[4/3] object-cover rounded-2xl ring-1 ring-border shadow-lg"
          />
        </div>
      </section>

      <section id={AMBULANCE_SERVICE.id} className="py-16 md:py-20 bg-muted/30 border-y border-border scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[minmax(0,380px)_1fr] gap-12 lg:gap-16 items-start">
            <img
              src={ambulanceImg}
              alt="SJAM Selangor ambulance on emergency duty"
              className="w-full aspect-[4/3] object-cover rounded-2xl ring-1 ring-border shadow-lg order-2 lg:order-1"
            />
            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-3">
                <Ambulance className="size-3.5" />
                Our services
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">{AMBULANCE_SERVICE.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{AMBULANCE_SERVICE.summary}</p>
              <a
                href={AMBULANCE_SERVICE.hotlineTel}
                className="inline-flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/5 px-5 py-4 mb-8 hover:bg-primary/10 transition-colors"
              >
                <span className="size-10 rounded-lg bg-primary text-primary-foreground grid place-items-center shrink-0">
                  <Phone className="size-5" />
                </span>
                <span>
                  <span className="text-xs text-muted-foreground block">24-hour emergency hotline</span>
                  <span className="text-xl font-semibold tabular-nums text-primary">{AMBULANCE_SERVICE.hotline}</span>
                </span>
              </a>
              <ul className="space-y-4">
                {AMBULANCE_SERVICE.points.map((point) => (
                  <li key={point.slice(0, 48)} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id={BLOOD_DONATION.id} className="py-16 md:py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_minmax(0,380px)] gap-12 lg:gap-16 items-start">
          <div>
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-3">
              <Droplets className="size-3.5" />
              Activities
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">{BLOOD_DONATION.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">{BLOOD_DONATION.summary}</p>
            <ul className="space-y-4 mb-10">
              {BLOOD_DONATION.points.map((point) => (
                <li key={point.slice(0, 48)} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/events">
                  Upcoming events
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/gallery">Past event gallery</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-secondary/10 p-8 lg:p-10">
            <Droplets className="size-10 text-primary mb-4" />
            <p className="text-lg font-semibold leading-snug mb-2">Every donation counts</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Look out for blood drives listed on our events calendar — or contact us to host a session with your
              organisation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold tracking-tight mb-8">More services</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {ABOUT_OTHER_SERVICES.map((service) => (
              <article key={service.title} className="bg-card rounded-xl border border-border p-6 flex flex-col">
                <h3 className="font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{service.description}</p>
                {"href" in service && service.href ? (
                  <Link
                    to={service.href}
                    className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary hover:text-secondary"
                  >
                    Learn more
                    <ArrowRight className="size-3.5" />
                  </Link>
                ) : (
                  <Link
                    to="/"
                    hash="services"
                    className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary hover:text-secondary"
                  >
                    View on home
                    <ArrowRight className="size-3.5" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
