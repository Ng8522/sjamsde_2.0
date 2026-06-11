import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Images,
  Stethoscope,
  Truck,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  MOBILE_CLINIC,
  MOBILE_CLINIC_DEPLOYMENTS,
} from "@/lib/mobile-clinic-content";
import { mobileClinicEvents, type MobileClinicEvent } from "@/lib/mobile-clinic-events";
import { cn } from "@/lib/utils";

export function MobileClinicSection() {
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  const deploymentCount = mobileClinicEvents.length;
  const latestEvent = mobileClinicEvents[0];

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

  const openEvent = useCallback(
    (eventId: string) => {
      void navigate({ to: "/mobile-clinic/$eventId", params: { eventId } });
    },
    [navigate],
  );

  return (
    <div className="animate-on-scroll">
      <div className="bg-white/70 backdrop-blur-sm border border-primary/15 rounded-2xl overflow-hidden hover:border-primary/40 hover:bg-white/90 transition-all duration-300 hover:shadow-lg">
        <p className="px-8 pt-8 pb-0">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.25em] uppercase">
            <Truck className="size-3.5" />
            Community outreach
          </span>
        </p>

        <div className="p-8 pt-4">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-8">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-4 mb-5">
                <div className="size-14 shrink-0 rounded-2xl bg-primary/10 border border-primary/20 grid place-items-center">
                  <Stethoscope className="size-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{MOBILE_CLINIC.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{MOBILE_CLINIC.summary}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {MOBILE_CLINIC.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="text-sm text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl mb-6">
                <p className="text-sm font-semibold text-primary">{MOBILE_CLINIC.highlight}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-2">
                {MOBILE_CLINIC.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-2.5 text-sm text-foreground/80 bg-muted/50 rounded-lg px-3 py-2.5 border border-border/60"
                  >
                    <HeartPulse className="size-4 text-primary shrink-0" />
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {latestEvent?.image ? (
              <div className="lg:w-72 xl:w-80 shrink-0">
                <button
                  type="button"
                  onClick={() => openEvent(latestEvent.id)}
                  className="block relative w-full rounded-xl overflow-hidden aspect-[4/3] ring-1 ring-primary/15 shadow-md group text-left cursor-pointer"
                >
                  <img
                    src={latestEvent.image}
                    alt={latestEvent.title}
                    className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-white/80">
                      Latest deployment
                    </span>
                    <p className="text-sm font-semibold mt-1 leading-snug">{latestEvent.title}</p>
                    <p className="text-xs text-white/75 mt-0.5">{latestEvent.date}</p>
                  </div>
                </button>
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6 border-y border-primary/10 mb-8">
            <StatCard
              value={MOBILE_CLINIC_DEPLOYMENTS}
              label="Deployments completed"
              accent
            />
            {MOBILE_CLINIC.stats.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>

          <RecentEventsCarousel
            api={api}
            setApi={setApi}
            selectedIndex={selectedIndex}
            slideCount={slideCount}
            deploymentCount={deploymentCount}
            onOpen={openEvent}
          />
        </div>
      </div>
    </div>
  );
}

function RecentEventsCarousel({
  api,
  setApi,
  selectedIndex,
  slideCount,
  deploymentCount,
  onOpen,
}: {
  api: CarouselApi | undefined;
  setApi: (api: CarouselApi) => void;
  selectedIndex: number;
  slideCount: number;
  deploymentCount: number;
  onOpen: (eventId: string) => void;
}) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          <h4 className="text-lg font-bold text-foreground">Recent Events</h4>
          <p className="text-sm text-muted-foreground mt-0.5">
            Tap an event to open the photo album.
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Images className="size-3.5" />
          {deploymentCount} albums
        </span>
      </div>

      <div className="relative -mx-1">
        <Carousel setApi={setApi} opts={{ align: "start", loop: false }} className="w-full">
          <CarouselContent className="-ml-3">
            {mobileClinicEvents.map((event) => (
              <CarouselItem key={event.id} className="pl-3 basis-full sm:basis-1/2 lg:basis-[45%]">
                <EventCard event={event} onOpen={() => onOpen(event.id)} />
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
    </div>
  );
}

function StatCard({
  value,
  label,
  accent = false,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl px-4 py-3 text-center border",
        accent ? "bg-primary/10 border-primary/25" : "bg-muted/30 border-border/60",
      )}
    >
      <div className={cn("text-xl md:text-2xl font-bold", accent ? "text-primary" : "text-foreground")}>
        {value}
      </div>
      <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{label}</p>
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
        "absolute top-1/2 -translate-y-1/2 z-10 size-9 rounded-full bg-background/95 text-foreground shadow-md border border-border/60 grid place-items-center hover:bg-background disabled:opacity-30 disabled:pointer-events-none transition-opacity",
        direction === "prev" ? "left-1" : "right-1",
      )}
      aria-label={direction === "prev" ? "Previous events" : "Next events"}
    >
      <Icon className="size-4" />
    </button>
  );
}

function EventCard({ event, onOpen }: { event: MobileClinicEvent; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block w-full aspect-[16/10] overflow-hidden rounded-xl bg-muted text-left cursor-pointer ring-1 ring-border/60 hover:ring-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-300 hover:shadow-lg"
    >
      {event.image ? (
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : null}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 transition-opacity group-hover:via-black/45"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-left">
        <h5 className="text-base sm:text-lg font-bold text-[#f5d000] leading-snug line-clamp-2">
          {event.title}
        </h5>
        <p className="mt-1 text-xs sm:text-sm font-medium text-[#6ecf8a]">{event.date}</p>
        <span className="inline-flex items-center gap-1 mt-2.5 text-[11px] font-medium text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
          <Images className="size-3" />
          View {event.images.length} photos
        </span>
      </div>
    </button>
  );
}
