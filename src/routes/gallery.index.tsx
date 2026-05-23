import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Images } from "lucide-react";

import { EventGalleryFeed } from "@/components/event-gallery-feed";
import { SiteLayout } from "@/components/site-layout";
import ambulanceImg from "../assets/ambulance.jpg";
import communityImg from "../assets/community.jpg";

export const Route = createFileRoute("/gallery/")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: "Gallery — SJAM Selangor" },
      {
        name: "description",
        content: "Photos and highlights from past SJAM Selangor community activity and public duty deployments.",
      },
    ],
  }),
});

const galleryImages = {
  community: communityImg,
  ambulance: ambulanceImg,
} as const;

function GalleryPage() {
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");

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
            Past activity
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 max-w-xl">Gallery</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            Browse photo albums from blood drives, standbys and community programmes. Filter by year and month.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-primary hover:text-secondary"
          >
            Upcoming activity
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
        />
      </section>
    </SiteLayout>
  );
}
