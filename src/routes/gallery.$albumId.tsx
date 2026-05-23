import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Images, MapPin } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { ZoomablePhotoGrid } from "@/components/zoomable-photo-grid";
import { getAlbumPhotos } from "@/lib/gallery-album-photos";
import { getPastEventAlbum } from "@/lib/past-events-gallery";
import ambulanceImg from "../assets/ambulance.jpg";
import communityImg from "../assets/community.jpg";

const galleryImages = {
  community: communityImg,
  ambulance: ambulanceImg,
} as const;

export const Route = createFileRoute("/gallery/$albumId")({
  component: GalleryAlbumPage,
  head: ({ params }) => {
    const album = getPastEventAlbum(params.albumId);
    return {
      meta: [
        {
          title: album ? `${album.title} — Gallery — SJAM Selangor` : "Gallery — SJAM Selangor",
        },
      ],
    };
  },
});

function GalleryAlbumPage() {
  const { albumId } = Route.useParams();
  const album = getPastEventAlbum(albumId);

  if (!album) {
    return (
      <SiteLayout>
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-semibold">Album not found</h1>
          <Button asChild className="mt-6">
            <Link to="/gallery">Back to gallery</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  const photos = getAlbumPhotos(album, galleryImages);

  return (
    <SiteLayout>
      <section className="max-w-4xl mx-auto px-6 py-10 md:py-14">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to gallery
        </Link>

        <span className="text-[10px] font-semibold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">
          {album.tag}
        </span>
        <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mt-3">{album.title}</h1>
        <div className="mt-3 border-b-2 border-primary" />

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-4">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4 text-primary" />
            {album.dateLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4 text-primary" />
            {album.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Images className="size-4 text-primary" />
            {photos.length} photos
          </span>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground mt-4 whitespace-pre-line">{album.summary}</p>

        <p className="text-xs text-muted-foreground mt-8 mb-3">Tap any photo to zoom</p>
        <ZoomablePhotoGrid photos={photos} columns={2} />
      </section>
    </SiteLayout>
  );
}
