import { useCallback, useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronLeft, ChevronRight, Eye, Glasses, Heart, Images, MapPin, Users } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { OCU } from "@/lib/ocu-content";
import {
  getOcuDeploymentsCompleted,
  ocuDeployments,
  type OcuDeployment,
} from "@/lib/ocu-deployments";
import { cn } from "@/lib/utils";

export function OcuSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  const deploymentsCompleted = getOcuDeploymentsCompleted();
  const featured = ocuDeployments[selectedIndex] ?? ocuDeployments[0];

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
    <div className="animate-on-scroll">
      <div className="bg-white/70 backdrop-blur-sm border border-primary/15 rounded-2xl overflow-hidden hover:border-primary/40 hover:bg-white/90 transition-all duration-300 hover:shadow-lg">
        <p className="px-8 pt-8 pb-0">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.25em] uppercase">
            <Eye className="size-3.5" />
            Vision care outreach
          </span>
        </p>

        <div className="p-8 pt-4">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-8">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-4 mb-5">
                <div className="size-14 shrink-0 rounded-2xl bg-primary/10 border border-primary/20 grid place-items-center">
                  <Glasses className="size-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{OCU.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{OCU.summary}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {OCU.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="text-sm text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-2">
                {OCU.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-2.5 text-sm text-foreground/80 bg-muted/50 rounded-lg px-3 py-2.5 border border-border/60"
                  >
                    <Eye className="size-4 text-primary shrink-0" />
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {featured?.coverImage ? (
              <div className="lg:w-72 xl:w-80 shrink-0">
                <DeploymentCover deployment={featured} />
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6 border-y border-primary/10 mb-8">
            <StatCard
              value={String(deploymentsCompleted)}
              label="Times programme carried out"
              accent
            />
            <StatCard value={String(ocuDeployments.length)} label="With photos listed below" />
            {OCU.stats.slice(0, 2).map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>

          {ocuDeployments.length > 0 ? (
            <>
              <DeploymentsCarousel
                api={api}
                setApi={setApi}
                selectedIndex={selectedIndex}
                slideCount={slideCount}
                count={ocuDeployments.length}
                onSelectDeployment={(index) => api?.scrollTo(index)}
              />

              {featured ? <FeaturedDeploymentDetail deployment={featured} /> : null}
            </>
          ) : null}

          <p className="mt-8 text-sm text-muted-foreground inline-flex items-center gap-1.5 justify-center w-full">
            <Heart className="size-4 text-primary shrink-0" />
            In the Service of Humanity
          </p>
        </div>
      </div>
    </div>
  );
}

function DeploymentsCarousel({
  api,
  setApi,
  selectedIndex,
  slideCount,
  count,
  onSelectDeployment,
}: {
  api: CarouselApi | undefined;
  setApi: (api: CarouselApi) => void;
  selectedIndex: number;
  slideCount: number;
  count: number;
  onSelectDeployment: (index: number) => void;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          <h4 className="text-lg font-bold text-foreground">Recent deployments</h4>
          <p className="text-sm text-muted-foreground mt-0.5">
            Select a deployment to read highlights and photos below.
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Images className="size-3.5" />
          {count} {count === 1 ? "deployment" : "deployments"}
        </span>
      </div>

      <div className="relative -mx-1">
        <Carousel setApi={setApi} opts={{ align: "start", loop: false }} className="w-full">
          <CarouselContent className="-ml-3">
            {ocuDeployments.map((deployment, index) => (
              <CarouselItem key={deployment.id} className="pl-3 basis-full sm:basis-1/2 lg:basis-[45%]">
                <DeploymentCard
                  deployment={deployment}
                  active={index === selectedIndex}
                  onSelect={() => onSelectDeployment(index)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNavButton direction="prev" onClick={() => api?.scrollPrev()} disabled={!api?.canScrollPrev()} />
          <CarouselNavButton direction="next" onClick={() => api?.scrollNext()} disabled={!api?.canScrollNext()} />
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

function DeploymentCard({
  deployment,
  active,
  onSelect,
}: {
  deployment: OcuDeployment;
  active?: boolean;
  onSelect: () => void;
}) {
  const { number, peopleScreened, glassesProvided } = deployment;
  const hasVisitStats = peopleScreened != null && glassesProvided != null;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative block w-full aspect-[16/10] overflow-hidden rounded-xl bg-muted text-left ring-1 transition-all duration-300 cursor-pointer",
        active ? "ring-2 ring-primary shadow-lg" : "ring-border/60 hover:ring-primary/40 hover:shadow-lg",
      )}
    >
      {deployment.coverImage ? (
        <img
          src={deployment.coverImage}
          alt={deployment.title}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-left">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6ecf8a]">
          {number}th deployment
        </span>
        <h5 className="text-base sm:text-lg font-bold text-[#f5d000] leading-snug line-clamp-2 mt-0.5">
          {deployment.title}
        </h5>
        <p className="mt-1 text-xs text-white/80 line-clamp-1">{deployment.location}</p>
        {hasVisitStats ? (
          <p className="mt-2 text-[11px] text-white/75">
            {peopleScreened} screened · {glassesProvided} glasses
          </p>
        ) : (
          <span className="inline-flex items-center gap-1 mt-2 text-[11px] text-white/70">
            <Images className="size-3" />
            {deployment.images.length} photos
          </span>
        )}
      </div>
    </button>
  );
}

function FeaturedDeploymentDetail({ deployment }: { deployment: OcuDeployment }) {
  const { number, peopleScreened, glassesProvided } = deployment;
  const hasVisitStats = peopleScreened != null && glassesProvided != null;

  return (
    <article className="rounded-xl border border-primary/20 bg-primary/5 p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
        {number}th deployment — highlights
      </p>
      <p className="text-sm font-medium text-foreground mb-4 flex items-center gap-1">
        <MapPin className="size-3.5 text-primary shrink-0" />
        {deployment.title}, {deployment.location}
      </p>

      <div className="space-y-3 mb-5">
        {deployment.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 28)} className="text-sm text-foreground/90 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {hasVisitStats ? (
        <div className="grid sm:grid-cols-2 gap-3 mb-5">
          <ImpactStat icon={Users} value={String(peopleScreened)} label="People screened at this visit" />
          <ImpactStat
            icon={Glasses}
            value={String(glassesProvided)}
            label="Free prescription glasses from this visit"
            accent
          />
        </div>
      ) : null}

      {deployment.thanks.length > 0 ? (
        <div className="space-y-3 pt-4 border-t border-primary/15 mb-5">
          {deployment.thanks.map((paragraph) => (
            <p key={paragraph.slice(0, 28)} className="text-sm text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {deployment.images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {deployment.images.map((src, index) => (
            <div
              key={src}
              className="relative overflow-hidden rounded-lg aspect-[4/3] ring-1 ring-border/60 bg-muted"
            >
              <img
                src={src}
                alt={`${number}th OCU deployment photo ${index + 1}`}
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function DeploymentCover({ deployment }: { deployment: OcuDeployment }) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden aspect-[4/3] ring-1 ring-primary/15 shadow-md">
      <img
        src={deployment.coverImage}
        alt={`OCU ${deployment.number}th deployment at ${deployment.title}`}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6ecf8a]">
          {deployment.number}th deployment
        </span>
        <p className="text-sm font-semibold mt-1 leading-snug text-[#f5d000]">{deployment.title}</p>
        <p className="text-xs text-white/80 mt-1 flex items-center gap-1">
          <MapPin className="size-3 shrink-0" />
          {deployment.location}
        </p>
      </div>
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
      aria-label={direction === "prev" ? "Previous deployments" : "Next deployments"}
    >
      <Icon className="size-4" />
    </button>
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

function ImpactStat({
  icon: Icon,
  value,
  label,
  accent = false,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 py-3 border",
        accent ? "bg-primary/10 border-primary/25" : "bg-background/80 border-border/60",
      )}
    >
      <Icon className={cn("size-5 shrink-0", accent ? "text-primary" : "text-muted-foreground")} />
      <div>
        <p className={cn("text-2xl font-bold leading-none", accent ? "text-primary" : "text-foreground")}>
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-1 leading-snug">{label}</p>
      </div>
    </div>
  );
}
