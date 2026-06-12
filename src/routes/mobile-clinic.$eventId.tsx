import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { ZoomablePhotoGrid } from "@/components/zoomable-photo-grid";
import { getMobileClinicEvent } from "@/lib/mobile-clinic-events";

export const Route = createFileRoute("/mobile-clinic/$eventId")({
  component: MobileClinicEventPage,
  head: ({ params }) => {
    const event = getMobileClinicEvent(params.eventId);
    return {
      meta: [
        {
          title: event
            ? `${event.title} — Outreach Program — SJAM Selangor`
            : "Outreach Program — SJAM Selangor",
        },
      ],
    };
  },
});

function MobileClinicEventPage() {
  const { eventId } = Route.useParams();
  const event = getMobileClinicEvent(eventId);

  if (!event) {
    return (
      <SiteLayout>
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-semibold">Event not found</h1>
          <Button asChild className="mt-6">
            <Link to="/programs">Back to programs</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  const photos = event.images.map((src, index) => ({
    src,
    alt: `${event.title} photo ${index + 1}`,
  }));

  return (
    <SiteLayout>
      <section className="max-w-4xl mx-auto px-6 py-10 md:py-14">
        <Link
          to="/programs"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to programs
        </Link>

        <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">{event.title}</h1>
        <div className="mt-3 border-b-2 border-primary" />

        <p className="text-xs text-muted-foreground mt-6 mb-3">Tap any photo to zoom</p>
        <ZoomablePhotoGrid photos={photos} columns={2} />
      </section>
    </SiteLayout>
  );
}
