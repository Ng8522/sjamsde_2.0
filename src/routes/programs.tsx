import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Ambulance,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  GraduationCap,
  HeartPulse,
  Home,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { MobileClinicSection } from "@/components/mobile-clinic-section";
import { OcuSection } from "@/components/ocu-section";
import { SiteLayout } from "@/components/site-layout";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import ambulanceImg from "../assets/AmbuHandover-1.jpg";
import firstaidImg from "../assets/first_aid1.jpg";
import courseImg from "../assets/course.jpg";
import homeNursingImg from "../assets/NursingHome1.jpg";
import ocuImg from "../assets/ocu/47th Deployment/700971405_1653371716790566_7397446257909075388_n.jpg";

export const Route = createFileRoute("/programs")({
  component: ProgramsPage,
  head: () => ({
    meta: [
      { title: "Programs — SJAM Selangor" },
      {
        name: "description",
        content:
          "Discover SJAM Selangor's comprehensive programs including first aid training, ambulance services, blood donation, and community health initiatives.",
      },
    ],
  }),
});

const serviceHighlights = [
  {
    icon: Ambulance,
    title: "Ambulance Service",
    subtitle: "Emergency response and hospital transfers",
    image: ambulanceImg,
    cta: "View Program",
    to: "/ambulance-24hr",
    phoneHref: "tel:0196820911",
    phoneLabel: "019-682 0911",
    emailHref: "mailto:amb.sde@sjam.org.my",
    emailLabel: "amb.sde@sjam.org.my",
    featured: true,
  },
  {
    icon: HeartPulse,
    title: "Public Duty StandBy",
    subtitle: "Our major public service since establishment",
    image: firstaidImg,
    cta: "Contact",
    phoneHref: "tel:0196820911",
    phoneLabel: "019-682 0911",
    emailHref: "mailto:user.selangor@sjam.org.my",
    emailLabel: "user.selangor@sjam.org.my",
    featured: false,
  },
  {
    icon: Eye,
    title: "Ophthalmic Care Service",
    subtitle: "Free eye screening and prescription glasses",
    image: ocuImg,
    cta: "Contact",
    emailHref: "mailto:sjamselangor@sjam.org.my",
    emailLabel: "sjamselangor@sjam.org.my",
    featured: false,
  },
  {
    icon: GraduationCap,
    title: "Public First Aid Classes",
    subtitle: "Training for individuals and teams",
    image: courseImg,
    cta: "Contact",
    emailHref: "mailto:user.selangor@sjam.org.my",
    emailLabel: "user.selangor@sjam.org.my",
    featured: false,
  },
  {
    icon: Home,
    title: "Preliminary Home Nursing",
    subtitle: "Perawatan Asas di Rumah — membership documentation",
    image: homeNursingImg,
    cta: "View certificates",
    to: "/home-nursing",
    featured: false,
  },
] as const;

type ServiceHighlight = (typeof serviceHighlights)[number];

function ServiceDirectoryCard({ service }: { service: ServiceHighlight }) {
  return (
    <article
      className={cn(
        "h-full rounded-2xl border bg-card p-4 md:p-5 flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-lg",
        service.featured
          ? "border-primary/35 ring-1 ring-primary/20 bg-gradient-to-br from-primary/[0.07] via-card to-secondary/[0.05]"
          : "border-border/80 hover:border-primary/30",
      )}
    >
      <img
        src={service.image}
        alt={service.title}
        className="w-full aspect-[4/3] object-cover rounded-xl mb-4 border border-border/70"
        loading="lazy"
      />
      <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground grid place-items-center mb-4">
        <service.icon className="size-5" />
      </div>
      <h3 className="text-lg font-semibold leading-snug text-foreground">{service.title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{service.subtitle}</p>
      {"to" in service ? (
        <div className="mt-auto pt-1 space-y-2">
          <Link
            to={service.to}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            {service.cta}
            <ArrowRight className="size-4 shrink-0" />
          </Link>
          {"phoneHref" in service && (
            <a href={service.phoneHref} className="block text-sm text-primary hover:underline">
              {service.phoneLabel}
            </a>
          )}
          {"emailHref" in service && (
            <a href={service.emailHref} className="block text-sm text-primary hover:underline break-all">
              {service.emailLabel}
            </a>
          )}
        </div>
      ) : "phoneHref" in service && "emailHref" in service ? (
        <div className="mt-auto pt-1">
          <p className="text-sm font-semibold text-primary mb-2">{service.cta}</p>
          <div className="flex flex-col gap-1.5 text-sm">
            <a href={service.phoneHref} className="text-primary hover:underline">
              {service.phoneLabel}
            </a>
            <a href={service.emailHref} className="text-primary hover:underline break-all">
              {service.emailLabel}
            </a>
          </div>
        </div>
      ) : "emailHref" in service ? (
        <div className="mt-auto pt-1">
          <p className="text-sm font-semibold text-primary mb-2">{service.cta}</p>
          <a href={service.emailHref} className="text-sm text-primary hover:underline break-all">
            {service.emailLabel}
          </a>
        </div>
      ) : null}
    </article>
  );
}

function ServiceDirectoryCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    setSlideCount(api.scrollSnapList().length);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  return (
    <div className="relative -mx-1">
      <Carousel setApi={setApi} opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent className="-ml-4">
          {serviceHighlights.map((service) => (
            <CarouselItem
              key={service.title}
              className="pl-4 basis-full sm:basis-1/2 lg:basis-[45%] xl:basis-1/3"
            >
              <ServiceDirectoryCard service={service} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselNavButton
          direction="prev"
          onClick={() => api?.scrollPrev()}
          disabled={!api?.canScrollPrev()}
        />
        <CarouselNavButton
          direction="next"
          onClick={() => api?.scrollNext()}
          disabled={!api?.canScrollNext()}
        />
      </Carousel>

      {slideCount > 1 ? (
        <div className="flex justify-center gap-2 mt-5">
          {Array.from({ length: slideCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "size-2 rounded-full transition-all duration-200",
                index === selectedIndex
                  ? "bg-primary w-5"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CarouselNavButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "absolute top-[42%] -translate-y-1/2 z-10 size-9 rounded-full bg-background/95 text-foreground shadow-md border border-border/60 grid place-items-center hover:bg-background disabled:opacity-30 disabled:pointer-events-none transition-opacity",
        direction === "prev" ? "left-1 sm:left-2" : "right-1 sm:right-2",
      )}
      aria-label={direction === "prev" ? "Previous services" : "Next services"}
    >
      <Icon className="size-4" />
    </button>
  );
}

function ProgramsPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/2 to-background border-b border-primary/20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-secondary/15 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.3em] uppercase bg-gradient-to-r from-primary/15 to-secondary/10 px-4 py-2 rounded-full w-fit border border-primary/20 mb-4">
            What we do now
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter max-w-3xl leading-tight mb-4">
            Comprehensive Health{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Programs
            </span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            SJAM Selangor offers a wide range of programs and services dedicated to serving the
            community with excellence, professionalism, and compassion.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-muted/20 border-b border-border/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2">
              Service Directory
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              Explore our most requested healthcare services.
            </p>
          </div>

          <ServiceDirectoryCarousel />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-background via-primary/2 to-background">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div id="ophthalmic-care-unit" className="scroll-mt-28">
            <OcuSection />
          </div>
          <div id="outreach-program" className="scroll-mt-28">
            <MobileClinicSection />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
