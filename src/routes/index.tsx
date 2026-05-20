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
  Calendar,
  Users,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ambulanceImg from "../assets/ambulance.jpg";
import communityImg from "../assets/community.jpg";
import mobileAppImg from "../assets/mobile-app.jpeg";
import { StoreDownloadBadges } from "@/components/store-download-badges";
import { EmergencyBanner, SiteFooter, SiteHeader } from "@/components/site-layout";
import { portalEvents } from "@/lib/mock-data";
import {
  RAKAN_ST_JOHN_HOME_HIGHLIGHTS,
  RAKAN_ST_JOHN_HOME_SUMMARY,
  RAKAN_ST_JOHN_LOGO_URL,
  RAKAN_ST_JOHN_TAGLINE,
} from "@/lib/rakan-st-john";

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
  { icon: Ambulance, title: "24 Hr Ambulance", desc: "Rapid emergency evacuation and inter-hospital transfers with advanced life support.", tag: "Available Now", live: true, href: "tel:0333715005", cta: "03-3371 5005" },
  { icon: HeartPulse, title: "Public Duty StandBy", desc: "Trained medical standby for sporting events, concerts and public gatherings.", tag: "Book Ahead", href: "mailto:user.selangor@sjam.org.my", cta: "Request" },
  { icon: Activity, title: "Haemodialysis Service", desc: "Subsidised dialysis treatment for community members with kidney conditions.", tag: "Klang Centre", href: "tel:0333735005", cta: "03-3373 5005" },
  { icon: GraduationCap, title: "Public First Aid Classes", desc: "Accredited CPR and emergency trauma certification for individuals and corporates.", tag: "Monthly Intake", href: "/courses", cta: "Book course", internal: true },
];

const community = [
  { n: "01", icon: HeartHandshake, title: "Fundraising", desc: "Public appeals and campaigns that sustain ambulance operations, dialysis subsidies and community programmes.", href: "/donate" as const },
  { n: "02", icon: Droplets, title: "Blood Donation Drives", desc: "Regular drives across Selangor to support the national blood bank reserves." },
  { n: "03", icon: Truck, title: "Mobile Clinic", desc: "Bringing basic medical consultation and health screenings to underserved areas." },
  { n: "04", icon: LifeBuoy, title: "Disaster Relief", desc: "Rapid deployment teams for flood response and large-scale emergency management." },
];

function Index() {
  const [adOpen, setAdOpen] = useState(true);
  const [appPreviewOpen, setAppPreviewOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      {/* Floating Side Donate Button */}
      <Link
        to="/donate"
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

      <EmergencyBanner />
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/2 to-background">
        {/* Decorative animated gradients */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl animate-pulse opacity-60" />
          <div className="absolute -bottom-32 -right-40 w-96 h-96 bg-gradient-to-tl from-secondary/25 to-transparent rounded-full blur-3xl animate-pulse opacity-50" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 lg:pt-40 pb-32 grid lg:grid-cols-[1.4fr_0.6fr] gap-16 lg:gap-24 items-center relative z-10">
          <div>
            <span className="inline-flex items-center gap-2.5 text-primary font-semibold text-xs tracking-[0.3em] uppercase mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 px-5 py-2.5 rounded-full w-fit border border-primary/20">
              <span className="size-2.5 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse" />
              SJAM SDE · Est. 1990
            </span>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-balance leading-[0.95] mb-10 text-foreground">
              Serve with <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">heart</span>. Give with <span className="bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">love</span>.
            </h1>
            <p className="text-xl text-muted-foreground max-w-[55ch] mb-14 leading-relaxed font-medium">
              Professional emergency medical response and community care across Selangor — sustained by volunteers, clinicians and your generosity.
            </p>
            <div className="flex flex-wrap gap-5">
              <a
                href="tel:0333715005"
                className="inline-flex items-center gap-3 h-14 px-8 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1.5 active:translate-y-0 transition-all text-base tracking-wider uppercase"
              >
                <Phone className="size-6" />
                Emergency Call
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-3 h-14 px-8 bg-white text-primary font-semibold rounded-xl border-2 border-primary hover:bg-primary/5 hover:shadow-lg transition-all text-base tracking-wider uppercase"
              >
                Our Services
                <ArrowRight className="size-6" />
              </a>
            </div>
          </div>
          <div className="relative group hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/20 to-transparent rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute inset-0 rounded-3xl border-2 border-primary/20 backdrop-blur-sm" />
            <img
              src={ambulanceImg}
              alt="St John Ambulance Malaysia ambulance on duty"
              width={1024}
              height={1280}
              className="w-full max-w-sm mx-auto aspect-[3/4] object-cover rounded-3xl shadow-2xl shadow-primary/40 ring-2 ring-primary/30 relative z-10 group-hover:scale-[1.03] transition-transform duration-500"
            />
            <div className="absolute -top-8 -right-8 size-24 rounded-full bg-gradient-to-br from-secondary via-primary to-secondary text-primary-foreground grid place-items-center shadow-2xl shadow-primary/50 rotate-12 relative z-20 font-semibold border-4 border-white">
              <div className="text-center leading-tight">
                <div className="text-xs font-semibold uppercase tracking-widest">Since</div>
                <div className="text-3xl font-semibold tabular-nums">1990</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-y border-primary/20 bg-gradient-to-r from-primary/8 via-background to-secondary/8 backdrop-blur-xl relative z-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-primary/15">
            {[
              { v: "35+", l: "Years in Selangor" },
              { v: "24/7", l: "Emergency Ready" },
              { v: "1,200+", l: "Active Volunteers" },
              { v: "50k+", l: "Lives Touched" },
            ].map((s) => (
              <div key={s.l} className="px-4 md:px-8 py-12 text-center md:text-left group hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/5 transition-all cursor-default">
                <div className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tabular-nums group-hover:scale-110 transition-transform origin-left">{s.v}</div>
                <div className="text-[12px] md:text-xs uppercase tracking-widest text-muted-foreground mt-3 font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative bg-white py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-secondary/10 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.3em] uppercase bg-gradient-to-r from-primary/15 to-secondary/15 px-6 py-3 rounded-full mb-6 border border-primary/20">
              <span className="size-2.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
              Our Services
            </span>
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter max-w-[28ch] mx-auto leading-tight mb-6">
              Emergency & <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">medical care</span>, around the clock.
            </h2>
            <p className="text-lg text-muted-foreground max-w-[50ch] mx-auto leading-relaxed">
              Accredited healthcare support for residents, organisations and event organisers across Selangor.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {services.map((s) => (
              <article
                key={s.title}
                className="group relative bg-gradient-to-br from-white to-gray-50 p-10 rounded-2xl border-2 border-gray-200 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 transition-all flex flex-col overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:from-primary/30 transition-all" />
                <div className="size-16 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground grid place-items-center mb-8 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all relative z-10 font-semibold">
                  <s.icon className="size-7" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 relative z-10 text-foreground">{s.title}</h3>
                <p className="text-base text-muted-foreground mb-10 leading-relaxed relative z-10">{s.desc}</p>
                <div className="mt-auto pt-8 border-t-2 border-gray-200 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    {s.live && <span className="size-3 rounded-full bg-gradient-to-r from-secondary to-primary animate-pulse" />}
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {s.tag}
                    </span>
                  </div>
                  {"internal" in s && s.internal ? (
                    <Link to={s.href} className="text-base font-semibold text-primary hover:text-secondary inline-flex items-center gap-3 group/link">
                      {s.cta}
                      <ArrowRight className="size-5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <a href={s.href} className="text-base font-semibold text-primary hover:text-secondary inline-flex items-center gap-3 group/link">
                      {s.cta}
                      <ArrowRight className="size-5 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 left-0 w-96 h-96 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-40 right-0 w-96 h-96 bg-gradient-to-tl from-secondary/15 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-20 items-center relative z-10">
          <div className="group">
            <img
              src={communityImg}
              alt="St John volunteers caring for the community"
              width={1200}
              height={800}
              loading="lazy"
              className="w-full max-w-md mx-auto aspect-[4/3] object-cover rounded-3xl ring-4 ring-primary/20 shadow-2xl shadow-primary/30 group-hover:shadow-primary/50 group-hover:ring-primary/40 transition-all"
            />
          </div>
          <div>
            <span className="inline-flex items-center gap-2.5 text-primary font-semibold text-xs tracking-[0.3em] uppercase bg-gradient-to-r from-primary/15 to-secondary/10 px-6 py-3 rounded-full mb-6 border border-primary/20 w-fit">
              <span className="size-2.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
              Community
            </span>
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-8 leading-tight">For the <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">people</span>, by the <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">people</span>.</h2>
            <p className="text-xl text-muted-foreground mb-14 max-w-[50ch] leading-relaxed font-medium">
              Beyond emergencies, our volunteers run programmes that bring care to where it's needed most.
            </p>
            <div className="space-y-8">
              {community.map((c) => (
                <div key={c.n} className="flex gap-6 group cursor-default">
                  <div className="shrink-0 size-16 rounded-2xl bg-gradient-to-br from-primary/25 to-secondary/15 text-primary grid place-items-center group-hover:from-primary group-hover:to-secondary group-hover:text-primary-foreground transition-all group-hover:shadow-xl group-hover:shadow-primary/40 group-hover:scale-110 font-semibold text-xl">
                    {c.n}
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">{c.title}</h4>
                    <p className="text-base text-muted-foreground max-w-[42ch] leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          id="rakan-st-john"
          className="max-w-7xl mx-auto px-6 mt-24 pt-24 border-t border-primary/10 grid lg:grid-cols-[minmax(0,340px)_1fr] gap-12 lg:gap-20 items-center"
        >
          <div className="flex justify-center lg:justify-start group">
            <img
              src={RAKAN_ST_JOHN_LOGO_URL}
              alt="Rakan St John logo"
              width={320}
              height={320}
              loading="lazy"
              className="w-full max-w-[280px] md:max-w-[320px] h-auto object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all"
            />
          </div>
          <div>
            <span className="inline-flex items-center gap-2 text-primary font-medium text-xs tracking-[0.2em] uppercase bg-primary/10 px-4 py-2 rounded-full mb-5">
              <span className="size-1.5 rounded-full bg-primary" />
              Community programme
            </span>
            <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 leading-tight">Rakan St John</h3>
            <p className="text-lg text-primary font-semibold mb-4 max-w-[48ch]">{RAKAN_ST_JOHN_TAGLINE}</p>
            <p className="text-muted-foreground leading-relaxed max-w-[56ch] mb-8">{RAKAN_ST_JOHN_HOME_SUMMARY}</p>
            <ul className="space-y-3 mb-10 max-w-[56ch]">
              {RAKAN_ST_JOHN_HOME_HIGHLIGHTS.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted-foreground group hover:text-foreground transition-colors">
                  <span className="mt-1.5 size-2 rounded-full bg-gradient-to-br from-primary to-secondary shrink-0" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/volunteer"
              className="inline-flex items-center gap-2 h-12 px-8 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all"
            >
              Register online
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="relative py-32 overflow-hidden bg-gradient-to-br from-background via-background to-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 right-0 w-96 h-96 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-40 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/15 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2.5 text-primary font-semibold text-xs tracking-[0.3em] uppercase bg-gradient-to-r from-primary/15 to-secondary/10 px-6 py-3 rounded-full mb-6 border border-primary/20">
              <span className="size-2.5 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse" />
              Upcoming Events
            </span>
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter max-w-[26ch] mx-auto leading-tight mb-8">
              Join us at our next <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">community event</span>.
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/events"
                className="inline-flex items-center gap-3 text-base font-semibold text-primary hover:text-secondary group"
              >
                All events
                <ArrowRight className="size-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <div className="w-px h-6 bg-gray-300" />
              <Link
                to="/gallery"
                className="inline-flex items-center gap-3 text-base font-semibold text-muted-foreground hover:text-primary group"
              >
                Past event gallery
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

          <div className="grid md:grid-cols-3 gap-8">
            {portalEvents.map((e) => {
              const [day, month] = e.date.split(" ");
              return (
                <article
                  key={e.id}
                  className="group bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/25 hover:-translate-y-3 transition-all flex flex-col"
                >
                  <div className="flex items-stretch border-b-2 border-gray-200 bg-gradient-to-r from-primary to-secondary">
                    <div className="text-primary-foreground p-6 flex flex-col items-center justify-center min-w-[100px] font-semibold">
                      <div className="text-4xl tabular-nums leading-none">{day}</div>
                      <div className="text-xs uppercase tracking-widest mt-2 opacity-95 font-semibold">{month}</div>
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
      <section id="app" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-secondary/20 to-transparent rounded-full blur-3xl translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          <div className="order-2 md:order-1">
            <span className="inline-flex items-center gap-2 text-primary font-medium text-xs tracking-[0.2em] uppercase mb-6 bg-primary/10 px-4 py-2 rounded-full">
              <Smartphone className="size-4" />
              SSMP app · download only
            </span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-tight">Already a SJAM member?</h2>
            <p className="text-muted-foreground max-w-[48ch] mb-10 leading-relaxed text-lg">
              Member registration, duty hours, SOS and internal announcements are in the SSMP mobile app — not on this public website.
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

      {/* Get Involved Section */}
      <section className="py-32 bg-gradient-to-br from-background via-primary/2 to-background relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 right-0 w-96 h-96 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-40 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/15 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2.5 text-primary font-semibold text-xs tracking-[0.3em] uppercase bg-gradient-to-r from-primary/15 to-secondary/10 px-6 py-3 rounded-full mb-6 border border-primary/20">
              <span className="size-2.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
              Get Involved
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter max-w-4xl mx-auto leading-tight mb-8">
              Be part of something <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">meaningful</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              Join our mission to serve the community with heart and save lives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Volunteer", desc: "Join 4,400+ volunteers", cta: "Sign up", link: "/volunteer", color: "from-primary" },
              { icon: HeartHandshake, title: "Support", desc: "Make a donation", cta: "Donate", link: "/donate", color: "from-secondary" },
              { icon: Calendar, title: "Events", desc: "Attend our programs", cta: "View events", link: "/events", color: "from-primary" },
              { icon: GraduationCap, title: "Learn", desc: "Take first aid courses", cta: "Book now", link: "/courses", color: "from-secondary" },
            ].map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className="group relative bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-3 transition-all flex flex-col items-start"
              >
                <div className={`size-14 rounded-xl bg-gradient-to-br ${item.color} to-secondary text-primary-foreground grid place-items-center mb-5 group-hover:shadow-lg group-hover:shadow-primary/40 transition-all`}>
                  <item.icon className="size-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-1">{item.desc}</p>
                <span className="inline-flex items-center gap-2 text-base font-semibold text-primary group-hover:text-secondary transition-colors">
                  {item.cta}
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter id="about" />
    </div>
  );
}
