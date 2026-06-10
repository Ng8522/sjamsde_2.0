import { Link, useRouterState } from "@tanstack/react-router";
import { CheckCircle2, Menu, Phone, Plus, Mail, MapPin } from "lucide-react";
import { useState, type ReactNode } from "react";

import { StoreDownloadBadges } from "@/components/store-download-badges";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  STATE_HEADQUARTERS,
  googleMapsEmbedUrl,
  stateHqGoogleMapsUrl,
  stateHqMapsQuery,
} from "@/lib/contact-content";
import { SITE_FOOTER_INTRO } from "@/lib/site-footer-content";
import { cn } from "@/lib/utils";
import stJohnLogo from "../assets/st-john-ambulans-malaysia-logo.png";

export function StJohnCross({ className = "" }: { className?: string }) {
  return (
    <img
      src={stJohnLogo}
      alt="St John Ambulans Malaysia"
      className={cn("object-contain", className)}
    />
  );
}

export function EmergencyBanner() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-4">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary-foreground/60 animate-ping" />
            <span className="relative inline-flex rounded-full size-2.5 bg-primary-foreground" />
          </span>
          <span className="text-xs font-medium tracking-widest uppercase">
            Ambulance Service Hotline
          </span>
          <a href="tel:0196820911" className="text-base font-semibold tabular-nums hover:underline">
            019-682 0911
          </a>
        </div>
      </div>
    </div>
  );
}

const navLinks: {
  label: string;
  to: "/" | "/about" | "/programs" | "/events" | "/gallery" | "/courses" | "/volunteer";
}[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Activity", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Courses", to: "/courses" },
  { label: "Rakan St John", to: "/volunteer" },
];

function isNavActive(pathname: string, to: (typeof navLinks)[number]["to"]) {
  if (to === "/") return pathname === "/";
  if (to === "/about") return pathname === "/about" || pathname.startsWith("/about/");
  if (to === "/programs") return pathname === "/programs" || pathname.startsWith("/programs/");
  if (to === "/events") return pathname === "/events" || pathname.startsWith("/events/");
  if (to === "/gallery") return pathname === "/gallery" || pathname.startsWith("/gallery/");
  return pathname === to || (to === "/courses" && pathname === "/schedule");
}

function navLinkClassName(pathname: string, to: (typeof navLinks)[number]["to"], mobile = false) {
  return cn(
    mobile
      ? "flex items-center h-11 px-3 rounded-lg text-base font-medium transition-colors"
      : "hover:text-primary transition-colors",
    isNavActive(pathname, to)
      ? mobile
        ? "bg-primary/10 text-primary"
        : "text-primary"
      : mobile
        ? "text-foreground hover:bg-muted"
        : undefined,
  );
}

function MobileSiteNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center size-10 rounded-md border border-border text-foreground hover:bg-muted transition-colors"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[min(100vw-2rem,20rem)] p-0 flex h-full max-h-[100dvh] flex-col gap-0 overflow-hidden"
      >
        <SheetHeader className="shrink-0 px-6 pt-6 pb-4 border-b border-border text-left">
          <SheetTitle className="text-base font-semibold">Menu</SheetTitle>
        </SheetHeader>
        <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 flex flex-col gap-1">
          {navLinks.map((item) => (
            <SheetClose asChild key={item.to}>
              <Link to={item.to} className={navLinkClassName(pathname, item.to, true)}>
                {item.label}
              </Link>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <Link to="/login" className={navLinkClassName(pathname, "/login", true)}>
              Login
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              to="/donate"
              className={cn(
                "mt-2 inline-flex items-center justify-center gap-1.5 h-11 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-secondary transition-colors",
                pathname === "/donate" && "ring-2 ring-primary/30",
              )}
            >
              <Plus className="size-4" strokeWidth={2.5} />
              Donate
            </Link>
          </SheetClose>
        </nav>
        <div className="shrink-0 px-6 py-4 border-t border-border bg-muted/40">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Ambulance Service Hotline
          </p>
          <a
            href="tel:0196820911"
            className="text-lg font-semibold tabular-nums text-primary hover:text-secondary"
          >
            019-682 0911
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="bg-background/95 border-b border-border/50 backdrop-blur-sm supports-[backdrop-filter]:bg-background/90 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0">
          <StJohnCross className="size-12 sm:size-14 shrink-0" />
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-xs sm:text-sm font-medium truncate text-foreground">
              St John Ambulans Malaysia
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground truncate">
              Selangor Darul Ehsan
            </span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-muted-foreground">
          {navLinks.map((item) => {
            const isActive = isNavActive(pathname, item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "px-3 py-2 rounded-lg transition-all relative group",
                  isActive
                    ? "text-primary font-semibold"
                    : "hover:text-foreground hover:bg-muted/50",
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                )}
              </Link>
            );
          })}
          <div className="w-px h-6 bg-border/50 mx-2" />
          <Link
            to="/login"
            className={cn(
              "px-3 py-2 rounded-lg transition-all hover:text-foreground hover:bg-muted/50",
              pathname === "/login" && "text-primary font-semibold",
            )}
          >
            Login
          </Link>
          <Link
            to="/donate"
            className={cn(
              "inline-flex items-center gap-1.5 h-9 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-secondary hover:shadow-md transition-all",
              pathname === "/donate" && "ring-2 ring-primary/30",
            )}
          >
            <Plus className="size-4" strokeWidth={2.5} />
            Donate
          </Link>
        </nav>
        <div className="lg:hidden flex items-center gap-2 shrink-0">
          <Link
            to="/donate"
            className="inline-flex items-center gap-1 h-9 px-3 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-secondary hover:shadow-md transition-all"
          >
            <Plus className="size-4" strokeWidth={2.5} />
            <span className="sr-only sm:not-sr-only">Donate</span>
          </Link>
          <MobileSiteNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

export function SiteTopChrome() {
  return (
    <div className="sticky top-0 z-50">
      <EmergencyBanner />
      <SiteHeader />
    </div>
  );
}

export function SiteFooter({ id }: { id?: string }) {
  return (
    <footer
      id={id}
      className="bg-gradient-to-br from-primary/5 via-secondary/3 to-background border-t border-primary/10 pt-24 pb-12 mt-auto relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary/15 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[2fr_1.2fr] gap-10 pb-16 border-b border-gradient-to-r border-primary/20">
          {/* Brand Column */}
          <div>
            <div className="flex items-start gap-3 mb-6">
              <StJohnCross className="size-14 shrink-0" />
              <div className="flex flex-col">
                <span className="font-medium text-lg text-foreground">SJAM Selangor</span>
                <span className="text-xs text-muted-foreground font-medium tracking-wide">
                  Service of Mankind
                </span>
              </div>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mb-10 max-w-[55ch]">
              {SITE_FOOTER_INTRO.map((line) => {
                const [label, ...rest] = line.split(" — ");
                const body = rest.join(" — ");
                return (
                  <p key={line} className="leading-relaxed">
                    <span className="font-semibold text-foreground/90">{label}</span>
                    {body ? <> — {body}</> : null}
                  </p>
                );
              })}
            </div>
            <div className="space-y-3 text-sm mb-10">
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="size-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-foreground mb-1">
                      State Headquarters
                    </p>
                    <a
                      href={stateHqGoogleMapsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-foreground hover:text-primary transition-colors leading-snug block"
                    >
                      {STATE_HEADQUARTERS.mapsPlaceName}
                    </a>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                      {STATE_HEADQUARTERS.address.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden border border-primary/15">
                  <iframe
                    title={STATE_HEADQUARTERS.mapsPlaceName}
                    src={googleMapsEmbedUrl(stateHqMapsQuery())}
                    className="w-full h-44"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <a
                  href={stateHqGoogleMapsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-semibold text-primary hover:underline mt-2"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/15 via-secondary/10 to-primary/5 border border-primary/20 rounded-xl p-5 shadow-lg shadow-primary/10 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-widest text-primary mb-4">
                SSMP Mobile App
              </p>
              <StoreDownloadBadges />
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-foreground mb-7">
              Contact & Support
            </h4>
            <div className="space-y-3">
              <div className="rounded-xl bg-gradient-to-br from-primary via-secondary to-primary/90 text-primary-foreground p-5 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1 origin-bottom">
                <p className="text-xs font-medium uppercase tracking-widest opacity-95 mb-2">
                  Ambulance Service
                </p>
                <a
                  href="tel:0196820911"
                  className="block text-xl font-medium tabular-nums hover:underline"
                >
                  019-682 0911
                </a>
                <a
                  href="mailto:amb.sde@sjam.org.my"
                  className="block text-sm font-medium mt-2 opacity-95 hover:underline break-all"
                >
                  amb.sde@sjam.org.my
                </a>
              </div>
              <div className="rounded-xl border border-primary/15 bg-white/50 p-4 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="size-4 text-primary shrink-0" />
                    <p className="text-xs font-medium uppercase tracking-widest text-foreground">
                      Mobile
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {STATE_HEADQUARTERS.phones.map((phone) => (
                      <li key={phone}>
                        <a
                          href={`tel:${phone.replace(/[\s-]/g, "")}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors tabular-nums font-medium"
                        >
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="size-4 text-primary shrink-0" />
                    <p className="text-xs font-medium uppercase tracking-widest text-foreground">
                      Email
                    </p>
                  </div>
                  <a
                    href={`mailto:${STATE_HEADQUARTERS.email}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors break-all font-medium"
                  >
                    {STATE_HEADQUARTERS.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} St John Ambulans Malaysia. All rights reserved.</p>
          <p className="font-medium tracking-widest uppercase text-foreground/50 text-center sm:text-right">
            Pro Utilitate Hominum
          </p>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background text-foreground antialiased flex flex-col",
        className,
      )}
    >
      <SiteTopChrome />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function MockSuccess({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center max-w-lg mx-auto">
      <div className="size-14 rounded-full bg-primary/15 text-primary grid place-items-center mx-auto mb-4">
        <CheckCircle2 className="size-8" />
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
      {children}
    </div>
  );
}
