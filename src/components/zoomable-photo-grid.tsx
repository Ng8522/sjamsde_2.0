import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type ZoomablePhoto = {
  src: string;
  alt: string;
};

type ZoomablePhotoGridProps = {
  photos: ZoomablePhoto[];
  columns?: 2 | 3;
  aspectClassName?: string;
  className?: string;
};

export function ZoomablePhotoGrid({
  photos,
  columns = 2,
  aspectClassName = "aspect-[4/3]",
  className,
}: ZoomablePhotoGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const active = activeIndex !== null ? photos[activeIndex] : undefined;

  const goPrev = useCallback(() => {
    setActiveIndex((index) => {
      if (index === null || photos.length === 0) return null;
      return (index - 1 + photos.length) % photos.length;
    });
  }, [photos.length]);

  const goNext = useCallback(() => {
    setActiveIndex((index) => {
      if (index === null || photos.length === 0) return null;
      return (index + 1) % photos.length;
    });
  }, [photos.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, goPrev, goNext]);

  if (photos.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">No photos available for this album.</p>
    );
  }

  return (
    <>
      <div
        className={cn(
          "grid gap-3 md:gap-4",
          columns === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2",
          className,
        )}
      >
        {photos.map((photo, index) => (
          <button
            key={`${photo.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "group relative overflow-hidden bg-muted ring-1 ring-border rounded-none text-left cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            )}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className={cn("w-full object-cover transition-transform duration-300 group-hover:scale-105", aspectClassName)}
              loading={index < 6 ? "eager" : "lazy"}
            />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <span className="absolute bottom-2 right-2 size-8 rounded-full bg-black/50 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="size-4" />
            </span>
          </button>
        ))}
      </div>

      <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
        {active && activeIndex !== null ? (
          <DialogContent className="max-w-[min(96vw,56rem)] w-full p-0 gap-0 overflow-hidden border-border bg-black/95">
            <DialogTitle className="sr-only">{active.alt}</DialogTitle>
            <div className="relative flex items-center justify-center min-h-[min(70vh,520px)] max-h-[90vh] p-4 md:p-8">
              <img
                src={active.src}
                alt={active.alt}
                className="max-w-full max-h-[min(80vh,720px)] w-auto h-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="absolute top-3 right-3 size-10 grid place-items-center rounded-full bg-white/90 text-foreground shadow-lg hover:bg-white"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
              {photos.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 size-10 grid place-items-center rounded-full bg-white/90 text-foreground shadow-lg hover:bg-white"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 size-10 grid place-items-center rounded-full bg-white/90 text-foreground shadow-lg hover:bg-white"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                  <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-medium text-white/90 bg-black/50 px-3 py-1 rounded-full tabular-nums">
                    {activeIndex + 1} / {photos.length}
                  </p>
                </>
              ) : null}
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  );
}
