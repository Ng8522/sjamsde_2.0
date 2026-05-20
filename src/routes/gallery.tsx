import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Images, MapPin, X } from "lucide-react";

import { EventGalleryFeed } from "@/components/event-gallery-feed";
import { SiteLayout } from "@/components/site-layout";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getPastEventAlbum, type PastEventAlbum } from "@/lib/past-events-gallery";
import ambulanceImg from "../assets/ambulance.jpg";
import communityImg from "../assets/community.jpg";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: "Gallery — SJAM Selangor" },
      {
        name: "description",
        content: "Photos and highlights from past SJAM Selangor community events and public duty deployments.",
      },
    ],
  }),
});

const galleryImages = {
  community: communityImg,
  ambulance: ambulanceImg,
} as const;

function coverSrc(album: PastEventAlbum) {
  return galleryImages[album.coverImage];
}

function mosaicFor(album: PastEventAlbum) {
  const src = coverSrc(album);
  const count = Math.min(album.photoCount, 6);
  return Array.from({ length: count }, (_, i) => ({
    src,
    key: `${album.id}-${i}`,
    objectPosition: `${30 + i * 12}% ${20 + i * 10}%`,
  }));
}

function GalleryPage() {
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = useMemo(() => (activeId ? getPastEventAlbum(activeId) : undefined), [activeId]);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b border-border">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "28px 28px",
            color: "var(--primary)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-14 md:py-16">
          <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase flex items-center gap-2">
            <Images className="size-3.5" />
            Past events
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 max-w-xl">Gallery</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            Browse photo albums from blood drives, standbys and community programmes. Filter by year and month.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-primary hover:text-secondary"
          >
            Upcoming events
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="py-10 md:py-14 px-4 sm:px-6 bg-muted/25">
        <EventGalleryFeed
          images={galleryImages}
          year={year}
          month={month}
          onYearChange={setYear}
          onMonthChange={setMonth}
          onOpenAlbum={setActiveId}
        />
      </section>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActiveId(null)}>
        {active ? (
          <DialogContent className="max-w-[min(96vw,44rem)] p-0 gap-0 overflow-hidden border-border">
            <DialogTitle className="sr-only">{active.title}</DialogTitle>
            <div className="relative">
              <img
                src={coverSrc(active)}
                alt={active.title}
                className="w-full max-h-[min(45vh,20rem)] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="absolute top-3 right-3 size-9 grid place-items-center rounded-full bg-background/95 shadow-lg hover:bg-background"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="text-[10px] font-semibold uppercase tracking-widest bg-white/20 backdrop-blur px-2 py-0.5 rounded">
                  {active.tag}
                </span>
                <h2 className="text-xl font-semibold mt-2 leading-snug">{active.title}</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-4 text-primary" />
                  {active.dateLabel}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4 text-primary" />
                  {active.location}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{active.summary}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-6">
                {mosaicFor(active).map((photo) => (
                  <img
                    key={photo.key}
                    src={photo.src}
                    alt=""
                    style={{ objectPosition: photo.objectPosition }}
                    className="rounded-xl aspect-square object-cover ring-1 ring-border"
                  />
                ))}
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </SiteLayout>
  );
}
