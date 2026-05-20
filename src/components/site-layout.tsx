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
    <footer id={id} className="bg-gradient-to-b from-muted/30 to-background border-t border-border/50 pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr] gap-12 pb-12 border-b border-border/50">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <StJohnCross className="size-10" />
              <div className="flex flex-col">
                <span className="font-bold text-foreground">SJAM Selangor</span>
                <span className="text-xs text-muted-foreground">Service of Mankind</span>
              </div>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed mb-8 max-w-[52ch]">
              {SITE_FOOTER_INTRO.map((line) => {
                const [label, ...rest] = line.split(" — ");
                const body = rest.join(" — ");
                return (
                  <p key={line}>
                    <span className="font-semibold text-foreground">{label}</span>
                    {body ? <> — {body}</> : null}
                  </p>
                );
              })}
            </div>
            <div className="space-y-3 text-sm mb-8">
              <div className="flex items-start gap-3 group">
                <MapPin className="size-4 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">Selangor Darul Ehsan, Malaysia</span>
              </div>
              <div className="flex items-start gap-3 group">
                <Mail className="size-4 text-primary mt-0.5 shrink-0" />
                <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="text-muted-foreground hover:text-primary transition-colors break-all">
                  {SITE_CONTACT_EMAIL}
                </a>
              </div>
            </div>
            <div className="bg-primary/5 rounded-lg p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">SSMP Mobile App</p>
              <StoreDownloadBadges />
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-6">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">
                  <span className="text-primary/0 group-hover:text-primary/100 transition-colors">→</span>
                  About
                </Link>
              </li>
              <li>
                <Link to="/donate" className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">
                  <span className="text-primary/0 group-hover:text-primary/100 transition-colors">→</span>
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/events" className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">
                  <span className="text-primary/0 group-hover:text-primary/100 transition-colors">→</span>
                  Events
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">
                  <span className="text-primary/0 group-hover:text-primary/100 transition-colors">→</span>
                  Event gallery
                </Link>
              </li>
              <li>
                <Link to="/courses" className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">
                  <span className="text-primary/0 group-hover:text-primary/100 transition-colors">→</span>
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">
                  <span className="text-primary/0 group-hover:text-primary/100 transition-colors">→</span>
                  Rakan St John
                </Link>
              </li>
              <li>
                <Link to="/about" hash="ambulance-services" className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">
                  <span className="text-primary/0 group-hover:text-primary/100 transition-colors">→</span>
                  Ambulance services
                </Link>
              </li>
              <li>
                <Link to="/about" hash="blood-donation" className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">
                  <span className="text-primary/0 group-hover:text-primary/100 transition-colors">→</span>
                  Blood donation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-6">Hotlines</h4>
            <div className="space-y-5">
              <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 hover:bg-primary/10 transition-colors group">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="size-4 text-primary" />
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Ambulance · 24/7</p>
                </div>
                <a href="tel:0333715005" className="text-lg font-bold tabular-nums text-primary hover:text-secondary transition-colors block">
                  03-3371 5005
                </a>
              </div>
              <div className="bg-muted/40 border border-border/50 rounded-lg p-4 hover:bg-muted/60 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="size-4 text-muted-foreground" />
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Haemodialysis Centre</p>
                </div>
                <a href="tel:0333735005" className="text-lg font-bold tabular-nums text-foreground hover:text-primary transition-colors block">
                  03-3373 5005
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} St John Ambulans Malaysia, Selangor Darul Ehsan. All rights reserved.</p>
          <p className="font-semibold tracking-wider uppercase text-foreground/60">Pro Utilitate Hominum</p>
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
