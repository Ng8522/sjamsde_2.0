import { Link, useRouterState } from "@tanstack/react-router";
import { CheckCircle2, Menu, Phone, Plus, Mail, MapPin, Smartphone } from "lucide-react";
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
import { SITE_CONTACT_EMAIL, SITE_FOOTER_INTRO } from "@/lib/site-footer-content";
import { cn } from "@/lib/utils";

export function StJohnCross({ className = "" }: { className?: string }) {
  return (
    <div className={cn("grid place-items-center bg-primary text-primary-foreground rounded-md", className)}>
      <Plus className="size-3/5" strokeWidth={2.5} />
    </div>
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
          <span className="text-xs font-medium tracking-widest uppercase">24hr Emergency Hotline</span>
          <a href="tel:0333715005" className="text-base font-semibold tabular-nums hover:underline">
            03-3371 5005
          </a>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm opacity-80">
          <Phone className="size-3.5" />
          <span>Haemodialysis: 03-3373 5005</span>
        </div>
      </div>
    </div>
  );
}

const navLinks: { label: string; to: "/" | "/about" | "/events" | "/gallery" | "/courses" | "/volunteer" }[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Courses", to: "/courses" },
  { label: "Rakan St John", to: "/volunteer" },
];

function isNavActive(pathname: string, to: (typeof navLinks)[number]["to"]) {
  if (to === "/") return pathname === "/";
  if (to === "/about") return pathname === "/about" || pathname.startsWith("/about/");
  if (to === "/events") return pathname === "/events" || pathname.startsWith("/events/");
  if (to === "/gallery") return pathname === "/gallery";
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
      <SheetContent side="right" className="w-[min(100vw-2rem,20rem)] p-0 flex flex-col">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border text-left">
          <SheetTitle className="text-base font-semibold">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
          {navLinks.map((item) => (
            <SheetClose asChild key={item.to}>
              <Link to={item.to} className={navLinkClassName(pathname, item.to, true)}>
                {item.label}
              </Link>
            </SheetClose>
          ))}
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
        <div className="px-6 py-4 border-t border-border bg-muted/40">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            24hr emergency
          </p>
          <a href="tel:0333715005" className="text-lg font-semibold tabular-nums text-primary hover:text-secondary">
            03-3371 5005
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="bg-background border-b border-border/50 sticky top-0 z-40 backdrop-blur-sm supports-[backdrop-filter]:bg-background/95 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0">
          <StJohnCross className="size-9 sm:size-10 shrink-0" />
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-xs sm:text-sm font-bold truncate text-foreground">St John Ambulans Malaysia</span>
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
                    : "hover:text-foreground hover:bg-muted/50"
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

export function SiteFooter({ id }: { id?: string }) {
  return (
    <footer id={id} className="bg-gradient-to-b from-foreground/2 to-background border-t border-border/50 pt-24 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[2fr_1fr_1.2fr] gap-16 pb-16 border-b border-border/50">
          {/* Brand Column */}
          <div>
            <div className="flex items-start gap-3 mb-6">
              <StJohnCross className="size-11 shrink-0" />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-foreground">SJAM Selangor</span>
                <span className="text-xs text-muted-foreground font-medium tracking-wide">Service of Mankind</span>
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
              <div className="flex items-start gap-3">
                <MapPin className="size-5 text-primary mt-0 shrink-0" />
                <span className="text-muted-foreground">Selangor Darul Ehsan, Malaysia</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="size-5 text-primary mt-0 shrink-0" />
                <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="text-muted-foreground hover:text-primary transition-colors break-all font-medium">
                  {SITE_CONTACT_EMAIL}
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/5 border border-primary/10 rounded-xl p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">SSMP Mobile App</p>
              <StoreDownloadBadges />
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-7">Quick Links</h4>
            <ul className="space-y-3.5 text-sm">
              {[
                { label: "About", to: "/about" },
                { label: "Donate", to: "/donate" },
                { label: "Events", to: "/events" },
                { label: "Gallery", to: "/gallery" },
                { label: "Courses", to: "/courses" },
                { label: "Volunteer", to: "/volunteer" },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to as any} className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all">
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary">→</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-7">Contact & Support</h4>
            <div className="space-y-3">
              <a href="tel:0333715005" className="block group bg-gradient-to-br from-primary to-secondary/80 text-primary-foreground rounded-lg p-5 hover:shadow-lg hover:shadow-primary/20 transition-all hover:scale-105 origin-top-left">
                <p className="text-xs font-bold uppercase tracking-widest opacity-90 mb-1.5">24/7 Ambulance</p>
                <p className="text-xl font-bold tabular-nums group-hover:translate-y-0.5 transition-transform">03-3371 5005</p>
              </a>
              <a href="tel:0333735005" className="block group bg-muted/60 border border-border/50 text-foreground rounded-lg p-5 hover:bg-muted hover:border-primary/30 transition-all hover:scale-105 origin-top-left">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Haemodialysis Centre</p>
                <p className="text-xl font-bold tabular-nums group-hover:text-primary transition-colors">03-3373 5005</p>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} St John Ambulans Malaysia. All rights reserved.</p>
          <p className="font-bold tracking-widest uppercase text-foreground/50 text-center sm:text-right">
            Pro Utilitate Hominum
          </p>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("min-h-screen bg-background text-foreground antialiased flex flex-col", className)}>
      <EmergencyBanner />
      <SiteHeader />
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
