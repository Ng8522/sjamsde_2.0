import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Phone,
  Plus,
  Ambulance,
  Activity,
  HeartPulse,
  GraduationCap,
  HeartHandshake,
  Droplets,
  Truck,
  LifeBuoy,
  ArrowRight,
  MapPin,
  Clock,
  Heart,
  X,
  Smartphone,
  ZoomIn,
  FileDown,
  ExternalLink,
  Users,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ambulanceImg from "../assets/ambulance.jpg";
import communityImg from "../assets/community.jpg";
import mobileAppImg from "../assets/mobile-app.jpeg";
import bloodDonationImg from "../assets/blood_donation.jpg";
import disasterReliefImg from "../assets/disaster_relief.jpg";
import fundraisingImg from "../assets/fund1.jpg";
import mobileClinicImg from "../assets/mobile_clinic.JPG";
import { StoreDownloadBadges } from "@/components/store-download-badges";
import { HOMEPAGE_APPLICATION_FORMS } from "@/lib/application-forms";
import {
  RAKAN_ST_JOHN_HOME_HIGHLIGHTS,
  RAKAN_ST_JOHN_HOME_SUMMARY,
  RAKAN_ST_JOHN_LOGO_URL,
  RAKAN_ST_JOHN_TAGLINE,
} from "@/lib/rakan-st-john";
import { pickRandomHomeGalleryPreview } from "@/lib/home-gallery-preview";
import { SSMP_HOMEPAGE } from "@/lib/ssmp-app";
import { SiteFooter, SiteTopChrome } from "@/components/site-layout";
import { portalEvents } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "St John Ambulans Malaysia — Selangor Darul Ehsan" },
      {
        name: "description",
        content:
          "24-hour ambulance, haemodialysis, first aid training and community medical services across Selangor. Serve with heart. Give with love.",
      },
      { property: "og:title", content: "St John Ambulans Malaysia — Selangor" },
      {
        property: "og:description",
        content:
          "Emergency medical response, haemodialysis, first aid courses and humanitarian services across Selangor.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

const services = [
  {
    icon: Ambulance,
    title: "24 Hr Ambulance",
    desc: "Rapid emergency evacuation and inter-hospital transfers with advanced life support.",
    live: true,
    href: "tel:0333715005",
    cta: "03-3371 5005",
  },
  {
    icon: HeartPulse,
    title: "Public Duty StandBy",
    desc: "Our major public service since establishment, with members stationed at sports events, social gatherings, and parades to provide first aid anytime, anywhere.",
    href: "mailto:admin@sjamsde.org.my",
    cta: "Inquiries: admin@sjamsde.org.my",
  },
  {
    icon: Activity,
    title: "Haemodialysis Service",
    desc: "Subsidised dialysis treatment for community members with kidney conditions.",
    href: "tel:0333735005",
    cta: "03-3373 5005",
  },
  {
    icon: GraduationCap,
    title: "Public First Aid Classes",
    desc: "Accredited CPR and emergency trauma certification for individuals and corporates.",
    href: "mailto:user.selangor@sjam.org.my",
    cta: "Email to: user.selangor@sjam.org.my",
  },
];

const community = [
  {
    n: "01",
    icon: HeartHandshake,
    title: "Fundraising",
    desc: "Public appeals and campaigns that sustain ambulance operations, dialysis subsidies and community programmes.",
    href: "/donate" as const,
    imageSrc: fundraisingImg,
  },
  {
    n: "02",
    icon: Droplets,
    title: "Blood Donation Drives",
    desc: "Regular drives across Selangor to support the national blood bank reserves.",
    imageSrc: bloodDonationImg,
  },
  {
    n: "03",
    icon: Truck,
    title: "Mobile Clinic",
    desc: "Bringing basic medical consultation and health screenings to underserved areas.",
    href: "/programs#mobile-clinic",
    imageSrc: mobileClinicImg,
  },
  {
    n: "04",
    icon: LifeBuoy,
    title: "Disaster Relief",
    desc: "Rapid deployment teams for flood response and large-scale emergency management.",
    imageSrc: disasterReliefImg,
  },
];

function Index() {
  const [adOpen, setAdOpen] = useState(true);
  const [appPreviewOpen, setAppPreviewOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Floating Side Donate Button */}
      <Link
        to="/donation/support-to-sjam-sde"
        aria-label="Donate to SJAM SDE"
        className="group fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2 bg-gradient-to-b from-secondary to-primary text-primary-foreground py-5 px-2.5 rounded-l-xl shadow-2xl shadow-primary/30 hover:px-3.5 transition-all"
      >
        <Heart className="size-5 fill-current" />
        <span className="[writing-mode:vertical-rl] rotate-180 text-xs font-semibold tracking-[0.2em] uppercase">
          Donate Now
        </span>
        <span className="size-2 rounded-full bg-primary-foreground animate-pulse" />
      </Link>

      {/* Fixed Dismissible Donation Ad */}
      {adOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 sm:max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-2xl shadow-primary/20 ring-1 ring-primary/10">
            <button
              onClick={() => setAdOpen(false)}
              aria-label="Close"
              className="absolute top-2.5 right-2.5 size-7 grid place-items-center rounded-full bg-muted text-muted-foreground hover:bg-foreground hover:text-background transition-colors z-10"
            >
              <X className="size-3.5" />
            </button>
            <div className="bg-gradient-to-br from-primary to-secondary p-5 text-primary-foreground">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-medium uppercase tracking-widest bg-primary-foreground/20 px-2 py-0.5 rounded">
                  Sponsored
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary-foreground/15 grid place-items-center shrink-0">
                  <Heart className="size-5 fill-current" />
                </div>
                <h3 className="font-semibold text-base leading-snug pr-6">
                  Support our life-saving mission.
                </h3>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground leading-snug">
                Every contribution helps us serve the community.
              </p>
              <Link
                to="/donate"
                onClick={() => setAdOpen(false)}
                className="inline-flex items-center gap-1.5 h-9 px-4 bg-primary text-primary-foreground rounded-md font-medium text-sm hover:bg-secondary transition-colors shrink-0"
              >
                Donate
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <SiteTopChrome />

      <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/2 to-background">
        {/* Decorative animated gradients */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl animate-pulse opacity-60" />
          <div
            className="absolute -bottom-32 -right-40 w-96 h-96 bg-gradient-to-tl from-secondary/25 to-transparent rounded-full blur-3xl animate-pulse opacity-50"
            style={{ animationDelay: "2s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 md:pt-14 pb-8 sm:pb-12 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-8 sm:gap-10 lg:gap-14 items-start lg:items-center">
            <div className="animate-on-scroll">
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-5 bg-gradient-to-r from-primary/10 to-secondary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full w-fit border border-primary/20">
                <span className="size-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse" />
                SJAM SDE · Est. 1990
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-semibold tracking-tighter text-balance leading-[1.08] mb-4 sm:mb-5 text-foreground">
                Serve with{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  heart
                </span>
                . Give with{" "}
                <span className="bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
                  love
                </span>
                .
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-[52ch] mb-6 sm:mb-8 leading-relaxed">
                Professional emergency medical response and community care across Selangor — sustained
                by volunteers, clinicians and your generosity.
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
                <a
                  href="tel:0333715005"
                  className="inline-flex items-center justify-center gap-2.5 min-h-12 w-full sm:w-auto px-7 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-xl hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] sm:hover:-translate-y-0.5 transition-all text-sm tracking-wider uppercase group"
                >
                  <Phone className="size-5 group-hover:animate-bounce" />
                  Emergency Call
                </a>
                <a
                  href="#services"
                  className="hidden lg:inline-flex items-center justify-center gap-2 min-h-12 text-sm font-semibold text-primary hover:text-secondary transition-colors"
                >
                  View all services
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>

            <div
              id="services"
              className="scroll-mt-[8.5rem] sm:scroll-mt-24 animate-on-scroll rounded-2xl border border-primary/15 bg-card/90 backdrop-blur-md shadow-xl sm:shadow-2xl shadow-primary/10 ring-1 ring-primary/5 overflow-hidden min-w-0"
            >
              <div className="px-4 py-3.5 sm:px-6 sm:py-4 border-b border-primary/10 bg-gradient-to-r from-primary/[0.07] via-background to-secondary/[0.07]">
                <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                  <span className="size-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Our Services
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Emergency and medical care, around the clock.
                </p>
              </div>
              <div
                className="p-3 sm:p-4 lg:p-5 flex gap-3 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-px-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:overflow-visible lg:snap-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                aria-label="Our services"
              >
                {services.map((s, idx) => {
                  const cta =
                    "internal" in s && s.internal ? (
                      <Link
                        to={s.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-secondary group/link min-h-10 lg:min-h-0 -ml-1 pl-1"
                      >
                        {s.cta}
                        <ArrowRight className="size-4 shrink-0 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    ) : (
                      <a
                        href={s.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-secondary group/link min-h-10 lg:min-h-0 -ml-1 pl-1"
                      >
                        {s.cta}
                        <ArrowRight className="size-4 shrink-0 group-hover/link:translate-x-0.5 transition-transform" />
                      </a>
                    );

                  return (
                    <article
                      key={s.title}
                      className={`group relative flex flex-row lg:flex-col gap-3 lg:gap-0 snap-start shrink-0 w-[min(88vw,18.5rem)] sm:w-[17.25rem] lg:w-auto lg:shrink rounded-xl p-3.5 sm:p-4 lg:p-[1.125rem] border transition-all duration-300 active:scale-[0.99] lg:hover:-translate-y-0.5 lg:hover:shadow-lg lg:hover:shadow-primary/10 ${
                        s.live
                          ? "border-primary/25 bg-gradient-to-br from-primary/[0.08] via-card to-secondary/[0.06] lg:hover:border-primary/40 ring-1 ring-primary/10"
                          : "border-border/80 bg-gradient-to-br from-background to-muted/30 lg:hover:border-primary/25"
                      }`}
                      style={{ animationDelay: `${idx * 75}ms` }}
                    >
                      <div className="size-10 sm:size-11 shrink-0 rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground grid place-items-center shadow-md shadow-primary/25 lg:mb-3">
                        <s.icon className="size-[1.125rem] sm:size-5" />
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <h3 className="text-sm sm:text-[0.95rem] lg:text-base font-semibold text-foreground leading-snug mb-1">
                          {s.title}
                        </h3>
                        {cta}
                      </div>
                    </article>
                  );
                })}
              </div>
              <p className="lg:hidden text-center text-[11px] text-muted-foreground pb-3 px-4">
                Swipe for more services
              </p>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-y border-primary/20 bg-gradient-to-r from-primary/8 via-background to-secondary/8 backdrop-blur-xl relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-primary/15">
            {[
              { v: "35+", l: "Years in Selangor" },
              { v: "24/7", l: "Emergency Ready" },
              { v: "1,200+", l: "Active Volunteers" },
              { v: "50k+", l: "Lives Touched" },
            ].map((s) => (
              <div
                key={s.l}
                className="px-3 sm:px-4 md:px-6 py-5 sm:py-6 md:py-8 text-center md:text-left group hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/5 transition-all cursor-default"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tabular-nums group-hover:scale-105 transition-transform origin-center md:origin-left">
                  {s.v}
                </div>
                <div className="text-[10px] sm:text-[11px] md:text-xs uppercase tracking-wider sm:tracking-widest text-muted-foreground mt-1 sm:mt-1.5 font-medium leading-snug">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="py-10 md:py-12 bg-[#f3f4f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              Community Programmes
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-3xl mx-auto">
              Public appeals and community-led services supporting healthcare access, emergency
              response, and humanitarian relief.
            </p>
        </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {community.map((c) => {
              return (
                <article
                  key={c.n}
                  className="rounded-2xl border border-border/80 bg-white p-5 hover:shadow-lg hover:border-primary/40 transition-all"
                >
                  <img
                    src={c.imageSrc}
                    alt={c.title}
                    className="w-full aspect-[16/10] object-cover rounded-xl mb-4 border border-border/70"
                    loading="lazy"
                  />
                  <div className="h-11 w-11 rounded-xl bg-emerald-100/70 text-emerald-700 grid place-items-center font-semibold text-lg mb-3">
                    {c.n}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {c.title === "Mobile Clinic" && c.href && (
                      <a
                        href={c.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                      >
                        View Program
                        <ArrowRight className="size-4" />
                      </a>
                    )}
                    {c.title !== "Mobile Clinic" && (
            <Link
                        to="/donate"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
                        Support Us
              <ArrowRight className="size-4" />
            </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Activity */}
      <section
        id="activity"
        className="relative py-12 md:py-14 overflow-hidden bg-gradient-to-br from-background via-background to-white"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 right-0 w-96 h-96 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-40 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/15 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2.5 text-primary font-semibold text-xs tracking-[0.3em] uppercase bg-gradient-to-r from-primary/15 to-secondary/10 px-6 py-3 rounded-full mb-4 border border-primary/20">
              <span className="size-2.5 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse" />
              Upcoming Activity
            </span>
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter max-w-[26ch] mx-auto leading-tight mb-6">
              Join us at our next{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                community activity
              </span>
              .
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/events"
                className="inline-flex items-center gap-3 text-base font-semibold text-primary hover:text-secondary group"
              >
                All activity
                <ArrowRight className="size-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <div className="w-px h-6 bg-gray-300" />
              <Link
                to="/gallery"
                className="inline-flex items-center gap-3 text-base font-semibold text-muted-foreground hover:text-primary group"
              >
                Past activity gallery
                <ArrowRight className="size-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <div className="w-px h-6 bg-gray-300" />
              <Link
                to="/courses"
                className="inline-flex items-center gap-3 text-base font-semibold text-muted-foreground hover:text-primary group"
              >
                Training courses
                <ArrowRight className="size-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portalEvents.slice(0, 3).map((e) => {
              const [day, month] = e.date.split(" ");
              return (
                <article
                  key={e.id}
                  className="group bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/25 hover:-translate-y-3 transition-all flex flex-col"
                >
                  <div className="flex items-stretch border-b-2 border-gray-200 bg-gradient-to-r from-primary to-secondary">
                    <div className="text-primary-foreground p-6 flex flex-col items-center justify-center min-w-[100px] font-semibold">
                      <div className="text-4xl tabular-nums leading-none">{day}</div>
                      <div className="text-xs uppercase tracking-widest mt-2 opacity-95 font-semibold">
                        {month}
                      </div>
                    </div>
                    <div className="flex-1 px-6 py-5 flex flex-col justify-center">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white mb-1">
                        {e.tag}
                      </span>
                      <span className="text-sm text-white/90 font-medium">{e.day}</span>
                    </div>
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <h3 className="font-semibold text-xl mb-5 leading-tight group-hover:text-primary transition-colors">
                      {e.title}
                    </h3>
                    <div className="space-y-3 text-base text-muted-foreground mb-7">
                      <div className="flex items-center gap-3">
                        <MapPin className="size-5 text-primary shrink-0 font-semibold" />
                        <span className="font-medium">{e.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="size-5 text-primary shrink-0 font-semibold" />
                        <span className="font-medium">{e.time}</span>
                      </div>
                    </div>
                    <Link
                      to="/events/$eventId"
                      params={{ eventId: e.id }}
                      className="mt-auto inline-flex items-center justify-between text-base font-semibold text-primary border-t-2 border-gray-200 pt-6 hover:text-secondary group/link"
                    >
                      Register / Details
                      <ArrowRight className="size-5 group-hover/link:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile App */}
      <section id="app" className="relative py-12 md:py-14 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-secondary/20 to-transparent rounded-full blur-3xl translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6 lg:gap-6 items-center relative z-10">
          <div className="order-2 md:order-1">
            <span className="inline-flex items-center gap-2 text-primary font-medium text-xs tracking-[0.2em] uppercase mb-4 bg-primary/10 px-4 py-2 rounded-full">
              <Smartphone className="size-4" />
              {SSMP_HOMEPAGE.eyebrow}
            </span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 leading-tight">
              {SSMP_HOMEPAGE.title}
            </h2>
            <p className="text-muted-foreground max-w-[48ch] mb-4 leading-relaxed text-lg">
              {SSMP_HOMEPAGE.description}
            </p>
            <ul className="text-sm text-muted-foreground space-y-1.5 mb-4 max-w-[48ch]">
              {SSMP_HOMEPAGE.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground/90 max-w-[48ch] mb-6 leading-relaxed border-l-2 border-primary/25 pl-4">
              {SSMP_HOMEPAGE.scopeNote}
            </p>
            <StoreDownloadBadges className="[&_img]:h-12" />
          </div>
          <div className="order-1 md:order-2 relative flex flex-col items-center">
            <button
              type="button"
              onClick={() => setAppPreviewOpen(true)}
              className="group relative w-full max-w-sm rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Zoom in mobile app preview"
            >
              <img
                src={mobileAppImg}
                alt="SJAM SDE mobile app preview on smartphone"
                width={1024}
                height={1024}
                loading="lazy"
                className="w-full aspect-square object-cover rounded-3xl ring-2 ring-primary/20 shadow-2xl shadow-primary/30 transition-all duration-200 group-hover:scale-[1.02] group-hover:ring-primary/40"
              />
              <span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/0 transition-colors group-hover:bg-black/25">
                <span className="flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                  <ZoomIn className="size-4 text-primary" />
                  Click to enlarge
                </span>
              </span>
            </button>
            <p className="mt-3 text-xs text-muted-foreground">Tap image to zoom</p>
            <Dialog open={appPreviewOpen} onOpenChange={setAppPreviewOpen}>
              <DialogContent className="max-w-[min(96vw,42rem)] border-border p-2 sm:p-3 gap-0">
                <DialogTitle className="sr-only">SJAM SDE mobile app preview</DialogTitle>
                <img
                  src={mobileAppImg}
                  alt="SJAM SDE mobile app preview — enlarged"
                  width={1024}
                  height={1024}
                  className="w-full max-h-[min(85vh,42rem)] object-contain rounded-lg"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Rakan St John */}
      <section
        id="rakan-st-john"
        className="relative py-8 md:py-10 overflow-hidden bg-muted/30 border-t border-primary/10"
      >
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-40">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-3xl -translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-start gap-3 md:gap-2 lg:gap-3 relative z-10">
          <img
            src={RAKAN_ST_JOHN_LOGO_URL}
            alt="Rakan St John logo"
            width={320}
            height={320}
            loading="lazy"
            className="mx-auto md:mx-0 shrink-0 w-[min(72vw,16rem)] sm:w-64 md:w-72 lg:w-80 h-auto object-contain drop-shadow-md"
          />
          <div className="space-y-2 min-w-0 md:pt-0.5">
            <span className="inline-flex items-center gap-2 text-primary font-medium text-xs tracking-[0.2em] uppercase bg-primary/10 px-4 py-1.5 rounded-full">
              <Users className="size-4" />
              Community programme
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight leading-tight">
              Rakan St John
            </h2>
            <p className="text-base text-muted-foreground font-medium leading-snug">
              {RAKAN_ST_JOHN_TAGLINE}
            </p>
            <p className="text-muted-foreground leading-snug text-base">
              {RAKAN_ST_JOHN_HOME_SUMMARY}
            </p>
            <ul className="text-sm text-muted-foreground space-y-0.5">
              {RAKAN_ST_JOHN_HOME_HIGHLIGHTS.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
            <Link
              to="/volunteer"
              className="inline-flex items-center gap-2.5 min-h-11 px-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-xl hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all text-sm tracking-wider uppercase"
            >
              Register interest
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-12 md:py-14 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 left-0 w-96 h-96 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-40 right-0 w-96 h-96 bg-gradient-to-tl from-secondary/10 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 gap-4">
            <div>
              <span className="inline-flex items-center gap-2.5 text-primary font-semibold text-xs tracking-[0.3em] uppercase bg-gradient-to-r from-primary/15 to-secondary/10 px-6 py-3 rounded-full mb-4 border border-primary/20">
                <span className="size-2.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
                Activity Gallery
              </span>
              <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter max-w-[22ch] leading-tight">
                Moments of{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  impact
                </span>
              </h2>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-3 h-12 px-6 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-secondary transition-all"
            >
              View full gallery
              <ArrowRight className="size-5" />
            </Link>
          </div>

          <HomeActivityGalleryPreview />
        </div>
      </section>

      {/* Applications */}
      <section className="py-10 md:py-12 bg-muted/40 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 text-primary font-medium text-xs tracking-[0.2em] uppercase bg-primary/10 px-4 py-2 rounded-full mb-4">
              <FileDown className="size-4" />
              Applications
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              Official application forms
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto leading-relaxed">
              Official application forms for Rakan St John and first aid course intake.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {HOMEPAGE_APPLICATION_FORMS.map((form) => {
              const isPdf = form.href.endsWith(".pdf");
              return (
                <a
                  key={form.href}
                  href={form.href}
                  {...(isPdf ? { download: true } : {})}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border-2 border-primary/20 bg-white p-5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all"
                >
                  <span className="size-12 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {isPdf ? <FileDown className="size-6" /> : <ExternalLink className="size-6" />}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug block">
                      {form.label}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {isPdf ? "PDF application" : "Online application"}
                    </span>
                  </span>
                  <ArrowRight className="size-5 text-primary shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter id="about" />
      </div>
    </div>
  );
}

const HOME_GALLERY_PREVIEW_COUNT = 2;

function HomeActivityGalleryPreview() {
  const [items] = useState(() => pickRandomHomeGalleryPreview(HOME_GALLERY_PREVIEW_COUNT));

  if (items.length === 0) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/gallery"
          className="group relative rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-primary/40 transition-all"
        >
          <img
            src={communityImg}
            alt="Community volunteers at work"
            className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
            <div>
              <p className="text-white font-semibold text-lg">2025 activity gallery</p>
              <p className="text-white/80 text-sm">View events and photos</p>
            </div>
          </div>
        </Link>
        <Link
          to="/gallery"
          className="group relative rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-primary/40 transition-all"
        >
          <img
            src={ambulanceImg}
            alt="Emergency ambulance response"
            className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
            <div>
              <p className="text-white font-semibold text-lg">Past events</p>
              <p className="text-white/80 text-sm">Browse the full gallery</p>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((item) => (
        <Link
          key={`${item.albumId}-${item.imageSrc}`}
          to="/gallery/$albumId"
          params={{ albumId: item.albumId }}
          className="group relative rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-primary/40 transition-all"
        >
          <img
            src={item.imageSrc}
            alt={item.title}
            className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex items-end p-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-white/70 mb-1">
                {item.tag} · {item.dateLabel}
              </p>
              <p className="text-white font-semibold text-lg leading-snug line-clamp-2">{item.title}</p>
              <p className="text-white/80 text-sm mt-1 flex items-center gap-1.5">
                View album
                <ArrowRight className="size-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
