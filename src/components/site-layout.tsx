import { Link, useRouterState } from "@tanstack/react-router";
import { CheckCircle2, Menu, Phone, Plus } from "lucide-react";
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
    <header className="bg-background border-b border-border sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0">
          <StJohnCross className="size-9 sm:size-10 shrink-0" />
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-xs sm:text-sm font-semibold truncate">St John Ambulans Malaysia</span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground truncate">
              Selangor Darul Ehsan
            </span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {navLinks.map((item) => (
            <Link key={item.to} to={item.to} className={navLinkClassName(pathname, item.to)}>
              {item.label}
            </Link>
          ))}
          <Link
            to="/donate"
            className={cn(
              "inline-flex items-center gap-1.5 h-9 px-4 bg-primary text-primary-foreground rounded-md hover:bg-secondary transition-colors",
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
            className="inline-flex items-center gap-1 h-9 px-3 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-secondary transition-colors"
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
    <footer id={id} className="bg-muted/50 border-t border-border pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr] gap-12 pb-16 border-b border-border">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <StJohnCross className="size-9" />
              <span className="font-semibold">SJAM Selangor</span>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed mb-6 max-w-[52ch]">
              {SITE_FOOTER_INTRO.map((line) => {
                const [label, ...rest] = line.split(" — ");
                const body = rest.join(" — ");
                return (
                  <p key={line}>
                    <span className="font-medium text-foreground">{label}</span>
                    {body ? <> — {body}</> : null}
                  </p>
                );
              })}
            </div>
            <div className="space-y-1.5 text-sm text-muted-foreground mb-6">
              <p>Selangor Darul Ehsan, Malaysia</p>
              <p>
                Email:{" "}
                <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="text-primary hover:underline">
                  {SITE_CONTACT_EMAIL}
                </a>
              </p>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">SSMP mobile app</p>
            <StoreDownloadBadges />
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-primary">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-primary">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-primary">
                  Event gallery
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-primary">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-primary">
                  Rakan St John
                </Link>
              </li>
              <li>
                <Link to="/about" hash="ambulance-services" className="hover:text-primary">
                  Ambulance services
                </Link>
              </li>
              <li>
                <Link to="/about" hash="blood-donation" className="hover:text-primary">
                  Blood donation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">Hotlines</h4>
            <div className="space-y-5">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Ambulance · 24/7</p>
                <a href="tel:0333715005" className="text-lg font-semibold tabular-nums text-primary hover:text-secondary">
                  03-3371 5005
                </a>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Haemodialysis Centre</p>
                <a href="tel:0333735005" className="text-lg font-semibold tabular-nums text-primary hover:text-secondary">
                  03-3373 5005
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} St John Ambulans Malaysia, Selangor Darul Ehsan. All rights reserved.</p>
          <p className="font-medium tracking-wider uppercase">Pro Utilitate Hominum</p>
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
