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
    <div className="min-h-screen bg-background text-foreground antialiased">
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
                <span className="text-[10px] font-bold uppercase tracking-widest bg-primary-foreground/20 px-2 py-0.5 rounded">
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
      <section className="relative overflow-hidden">
        {/* Decorative gradient + cross pattern */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />
        <div
          className="absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "32px 32px",
            color: "var(--primary)",
          }}
        />
        <div className="absolute -top-32 -right-32 size-[36rem] rounded-full bg-secondary/10 blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-20 grid lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-20 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-5 bg-primary/10 px-3 py-1.5 rounded-full">
              <span className="size-1.5 rounded-full bg-primary" />
              SJAM SDE · Est. 1990 · Pro Utilitate Hominum
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[3.75rem] font-semibold tracking-tight text-balance leading-[1.05] mb-6">
              Serve with heart. Give with love.{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                For the Service of Mankind.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-[58ch] mb-10">
              Professional emergency medical response and community care across Selangor — sustained by volunteers, clinicians and your generosity.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:0333715005"
                className="inline-flex items-center gap-2 h-12 px-6 bg-primary text-primary-foreground font-medium rounded-md hover:bg-secondary transition-colors shadow-lg shadow-primary/20"
              >
                <Phone className="size-4" />
                Request Ambulance
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 h-12 px-6 bg-card text-foreground font-medium rounded-md hover:bg-muted transition-colors border border-border"
              >
                View Services
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src={ambulanceImg}
              alt="St John Ambulance Malaysia ambulance on duty"
              width={1024}
              height={1280}
              className="w-full max-w-sm mx-auto aspect-[3/4] object-cover rounded-2xl shadow-2xl shadow-primary/15 ring-1 ring-border"
            />
            <div className="absolute -top-3 -right-3 size-16 rounded-full bg-secondary text-secondary-foreground grid place-items-center shadow-lg rotate-12">
              <div className="text-center leading-tight">
                <div className="text-[9px] font-semibold uppercase tracking-widest opacity-80">Since</div>
                <div className="text-base font-bold tabular-nums">1990</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-y border-border bg-card/60 backdrop-blur">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { v: "35+", l: "Years in Selangor" },
              { v: "24/7", l: "Emergency Ready" },
              { v: "1,200+", l: "Active Volunteers" },
              { v: "50k+", l: "Lives Touched" },
            ].map((s) => (
              <div key={s.l} className="px-4 md:px-8 py-6 text-center md:text-left">
                <div className="text-2xl md:text-3xl font-semibold text-primary tabular-nums">{s.v}</div>
                <div className="text-[11px] md:text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-muted/40 border-y border-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
            <div>
              <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase block mb-3">Our Services</span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-[20ch]">
                Emergency & medical services, around the clock.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-[40ch]">
              Accredited healthcare support for residents, organisations and event organisers across Selangor.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {services.map((s) => (
              <article
                key={s.title}
                className="group bg-card p-7 rounded-xl border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all flex flex-col"
              >
                <div className="size-11 rounded-lg bg-primary/10 text-primary grid place-items-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <s.icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-8 leading-relaxed">{s.desc}</p>
                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {s.live && <span className="size-2 rounded-full bg-secondary animate-pulse" />}
                    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {s.tag}
                    </span>
                  </div>
                  {"internal" in s && s.internal ? (
                    <Link to={s.href} className="text-sm font-medium text-primary hover:text-secondary inline-flex items-center gap-1">
                      {s.cta}
                      <ArrowRight className="size-3.5" />
                    </Link>
                  ) : (
                    <a href={s.href} className="text-sm font-medium text-primary hover:text-secondary inline-flex items-center gap-1">
                      {s.cta}
                      <ArrowRight className="size-3.5" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center">
          <img
            src={communityImg}
            alt="St John volunteers caring for the community"
            width={1200}
            height={800}
            loading="lazy"
            className="w-full max-w-md mx-auto aspect-[4/3] object-cover rounded-2xl ring-1 ring-border shadow-xl shadow-primary/10"
          />
          <div>
            <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase block mb-3">Community</span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">For the people, by the people.</h2>
            <p className="text-muted-foreground mb-10 max-w-[48ch]">
              Beyond emergencies, our volunteers run programmes that bring care to where it's needed most.
            </p>
            <div className="space-y-7">
              {community.map((c) => (
                <div key={c.n} className="flex gap-5 group">
                  <div className="shrink-0 size-11 rounded-lg bg-primary/10 text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <c.icon className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground tabular-nums">{c.n}</span>
                      {c.title}
                    </h4>
                    <p className="text-sm text-muted-foreground max-w-[42ch]">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          id="rakan-st-john"
          className="max-w-7xl mx-auto px-6 mt-20 pt-20 border-t border-border grid lg:grid-cols-[minmax(0,340px)_1fr] gap-12 lg:gap-16 items-center"
        >
          <div className="flex justify-center lg:justify-start">
            <img
              src={RAKAN_ST_JOHN_LOGO_URL}
              alt="Rakan St John logo"
              width={320}
              height={320}
              loading="lazy"
              className="w-full max-w-[280px] md:max-w-[320px] h-auto object-contain drop-shadow-md"
            />
          </div>
          <div>
            <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase block mb-3">
              Community programme
            </span>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">Rakan St John</h3>
            <p className="text-lg text-muted-foreground font-medium mb-5 max-w-[48ch]">{RAKAN_ST_JOHN_TAGLINE}</p>
            <p className="text-muted-foreground leading-relaxed max-w-[56ch] mb-6">{RAKAN_ST_JOHN_HOME_SUMMARY}</p>
            <ul className="space-y-3 mb-8 max-w-[56ch]">
              {RAKAN_ST_JOHN_HOME_HIGHLIGHTS.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/volunteer"
              className="inline-flex items-center gap-2 h-11 px-6 bg-primary text-primary-foreground rounded-md font-medium text-sm hover:bg-secondary transition-colors"
            >
              Register online
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="bg-muted/40 border-y border-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div>
              <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase block mb-3">
                Upcoming Events
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-[22ch]">
                Join us at our next community event.
              </h2>
            </div>
            <div className="flex flex-wrap gap-4 self-start md:self-auto">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary"
              >
                All events
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Past event gallery
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Training courses
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {portalEvents.map((e) => {
              const [day, month] = e.date.split(" ");
              return (
                <article
                  key={e.id}
                  className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col"
                >
                  <div className="flex items-stretch border-b border-border">
                    <div className="bg-gradient-to-br from-primary to-secondary text-primary-foreground p-5 flex flex-col items-center justify-center min-w-[88px]">
                      <div className="text-3xl font-bold tabular-nums leading-none">{day}</div>
                      <div className="text-[10px] font-semibold uppercase tracking-widest mt-1 opacity-90">{month}</div>
                    </div>
                    <div className="flex-1 px-5 py-4 flex flex-col justify-center">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary mb-1">
                        {e.tag}
                      </span>
                      <span className="text-xs text-muted-foreground">{e.day}</span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-4 leading-snug group-hover:text-primary transition-colors">
                      {e.title}
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground mb-5">
                      <div className="flex items-center gap-2">
                        <MapPin className="size-3.5 text-primary shrink-0" />
                        <span>{e.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="size-3.5 text-primary shrink-0" />
                        <span>{e.time}</span>
                      </div>
                    </div>
                    <Link
                      to="/events/$eventId"
                      params={{ eventId: e.id }}
                      className="mt-auto inline-flex items-center justify-between text-sm font-medium text-primary border-t border-border pt-4 hover:text-secondary"
                    >
                      Register / Details
                      <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile App */}
      <section id="app" className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 md:order-1">
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-5 bg-primary/10 px-3 py-1.5 rounded-full">
              <Smartphone className="size-3.5" />
              SSMP app · download only
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">Already a SJAM member?</h2>
            <p className="text-muted-foreground max-w-[48ch] mb-8 leading-relaxed">
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
                className="w-full aspect-square object-cover rounded-2xl ring-1 ring-border shadow-2xl shadow-primary/10 transition-transform duration-200 group-hover:scale-[1.02]"
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
            <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-secondary/60 animate-ping" />
                <span className="relative inline-flex rounded-full size-2.5 bg-secondary" />
              </span>
              <span className="text-xs font-medium">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Donation CTA */}
      <section id="donate" className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-primary text-primary-foreground rounded-2xl p-10 md:p-16 relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase opacity-80 block mb-4">Support Our Mission</span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
              Fuel life-saving work with your generosity.
            </h2>
            <p className="opacity-90 mb-8 text-lg">
              Your donation maintains our ambulance fleet and subsidises dialysis treatment for low-income patients.
            </p>
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 h-12 px-7 bg-background text-primary font-semibold rounded-md hover:bg-card transition-colors shadow-lg"
            >
              <Plus className="size-4" strokeWidth={2.8} />
              Make a Secure Donation
            </Link>
          </div>
          <div className="absolute -right-16 -bottom-20 opacity-[0.08] pointer-events-none">
            <Plus className="size-[28rem]" strokeWidth={1.5} />
          </div>
        </div>
      </section>

      <SiteFooter id="about" />
    </div>
  );
}
