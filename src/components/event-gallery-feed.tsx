import { useMemo } from "react";
import { CalendarDays, ChevronRight, Images, MapPin } from "lucide-react";

import { StJohnCross } from "@/components/site-layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  filterPastEventAlbums,
  getGalleryMonthsForYear,
  getGalleryYears,
  monthLabel,
  type PastEventAlbum,
} from "@/lib/past-events-gallery";

type GalleryImages = Record<PastEventAlbum["coverImage"], string>;

type EventGalleryFeedProps = {
  images: GalleryImages;
  year: string;
  month: string;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
  onOpenAlbum: (id: string) => void;
};

const OBJECT_POSITIONS = ["center", "top", "bottom", "30% 20%", "70% 60%"] as const;

function photosFor(album: PastEventAlbum, images: GalleryImages) {
  const src = images[album.coverImage];
  const shown = Math.min(Math.max(album.photoCount, 1), 5);
  return Array.from({ length: shown }, (_, i) => ({
    src,
    key: `${album.id}-${i}`,
    objectPosition: OBJECT_POSITIONS[i % OBJECT_POSITIONS.length],
  }));
}

function PhotoCollage({
  album,
  images,
  onOpen,
}: {
  album: PastEventAlbum;
  images: GalleryImages;
  onOpen: () => void;
}) {
  const photos = photosFor(album, images);
  const btn =
    "block w-full text-left overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring";

  if (photos.length === 1) {
    return (
      <button type="button" onClick={onOpen} className={btn}>
        <img
          src={photos[0].src}
          alt={album.title}
          style={{ objectPosition: photos[0].objectPosition }}
          className="w-full aspect-[4/3] sm:aspect-[16/10] max-h-[min(72vh,520px)] object-cover bg-muted"
        />
      </button>
    );
  }

  if (photos.length === 2) {
    return (
      <button type="button" onClick={onOpen} className={cn(btn, "grid grid-cols-2 gap-0.5 sm:gap-1")}>
        {photos.map((p) => (
          <img
            key={p.key}
            src={p.src}
            alt=""
            style={{ objectPosition: p.objectPosition }}
            className="w-full aspect-square sm:aspect-[4/3] object-cover"
          />
        ))}
      </button>
    );
  }

  if (photos.length === 3) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className={cn(btn, "grid grid-cols-2 gap-0.5 sm:gap-1 aspect-[4/3] sm:aspect-[16/10] max-h-[min(72vh,520px)]")}
      >
        <img
          src={photos[0].src}
          alt=""
          style={{ objectPosition: photos[0].objectPosition }}
          className="row-span-2 h-full w-full object-cover"
        />
        {photos.slice(1).map((p) => (
          <img
            key={p.key}
            src={p.src}
            alt=""
            style={{ objectPosition: p.objectPosition }}
            className="w-full h-full object-cover"
          />
        ))}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(btn, "grid grid-cols-2 gap-0.5 sm:gap-1 aspect-[4/3] sm:aspect-[16/10] max-h-[min(72vh,520px)]")}
    >
      {photos.slice(0, 4).map((p, index) => (
        <div key={p.key} className="relative h-full min-h-0">
          <img
            src={p.src}
            alt=""
            style={{ objectPosition: p.objectPosition }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {index === 3 && album.photoCount > 4 ? (
            <span className="absolute inset-0 bg-black/55 text-white text-lg sm:text-xl font-semibold grid place-items-center">
              +{album.photoCount - 4}
            </span>
          ) : null}
        </div>
      ))}
    </button>
  );
}

function GalleryPost({
  album,
  images,
  onOpen,
}: {
  album: PastEventAlbum;
  images: GalleryImages;
  onOpen: () => void;
}) {
  return (
    <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <header className="flex items-start gap-3 px-4 pt-4 pb-2">
        <StJohnCross className="size-10 shrink-0 rounded-full ring-2 ring-background shadow-sm" />
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="font-semibold text-[15px] leading-tight text-foreground">SJAM Selangor</p>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {album.tag}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
            <CalendarDays className="size-3.5 shrink-0" />
            {album.dateLabel}
          </p>
        </div>
      </header>

      <div className="px-4 pb-3">
        <h2 className="text-[17px] font-semibold leading-snug text-foreground">{album.title}</h2>
        <p className="text-[15px] text-foreground/90 leading-relaxed mt-1.5">{album.summary}</p>
        <p className="text-sm text-muted-foreground mt-2 flex items-start gap-1.5">
          <MapPin className="size-4 shrink-0 mt-0.5 text-primary" />
          <span>{album.location}</span>
        </p>
      </div>

      <PhotoCollage album={album} images={images} onOpen={onOpen} />

      <footer className="px-4 py-3 border-t border-border flex items-center justify-between gap-3 bg-muted/20">
        <span className="text-sm text-muted-foreground inline-flex items-center gap-2">
          <Images className="size-4 text-primary" />
          <span className="tabular-nums font-medium text-foreground">{album.photoCount}</span>
          <span className="hidden sm:inline">photos</span>
        </span>
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-secondary transition-colors"
        >
          View album
          <ChevronRight className="size-4" />
        </button>
      </footer>
    </article>
  );
}

function DateFilters({
  year,
  month,
  years,
  months,
  albumsCount,
  onYearChange,
  onMonthChange,
}: {
  year: string;
  month: string;
  years: string[];
  months: string[];
  albumsCount: number;
  onYearChange: (y: string) => void;
  onMonthChange: (m: string) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:sticky lg:top-24">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
        <CalendarDays className="size-4 text-primary" />
        Filter by date
      </p>
      <div className="space-y-4">
        <div>
          <label htmlFor="gallery-year" className="text-xs font-medium text-muted-foreground mb-1.5 block">
            Year
          </label>
          <Select
            value={year}
            onValueChange={(value) => {
              onYearChange(value);
              onMonthChange("all");
            }}
          >
            <SelectTrigger id="gallery-year" className="w-full bg-background">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All years</SelectItem>
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="gallery-month" className="text-xs font-medium text-muted-foreground mb-1.5 block">
            Month
          </label>
          <Select value={month} onValueChange={onMonthChange} disabled={year === "all"}>
            <SelectTrigger id="gallery-month" className="w-full bg-background" disabled={year === "all"}>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All months</SelectItem>
              {months.map((m) => (
                <SelectItem key={m} value={m}>
                  {monthLabel(m)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
        Showing <span className="font-medium text-foreground">{albumsCount}</span>{" "}
        {albumsCount === 1 ? "album" : "albums"}
        {year !== "all" ? ` · ${year}` : ""}
        {month !== "all" && year !== "all" ? ` · ${monthLabel(month)}` : ""}
      </p>
    </div>
  );
}

export function EventGalleryFeed({
  images,
  year,
  month,
  onYearChange,
  onMonthChange,
  onOpenAlbum,
}: EventGalleryFeedProps) {
  const years = useMemo(() => getGalleryYears(), []);
  const months = useMemo(() => (year === "all" ? [] : getGalleryMonthsForYear(year)), [year]);
  const albums = useMemo(() => filterPastEventAlbums(year, month), [year, month]);

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="lg:hidden mb-6">
        <DateFilters
          year={year}
          month={month}
          years={years}
          months={months}
          albumsCount={albums.length}
          onYearChange={onYearChange}
          onMonthChange={onMonthChange}
        />
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-10 xl:gap-12 items-start">
        <div className="hidden lg:block">
          <DateFilters
            year={year}
            month={month}
            years={years}
            months={months}
            albumsCount={albums.length}
            onYearChange={onYearChange}
            onMonthChange={onMonthChange}
          />
        </div>

        <div className="min-w-0 flex justify-center lg:justify-start">
          <div className="w-full max-w-[680px] lg:max-w-[720px]">
            {albums.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-card p-12 sm:p-16 text-center">
                <div className="size-14 rounded-xl bg-muted mx-auto mb-4 grid place-items-center">
                  <Images className="size-7 text-muted-foreground" />
                </div>
                <p className="font-semibold text-lg text-foreground">No albums for this period</p>
                <p className="text-sm text-muted-foreground mt-2">Try a different year or month.</p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-5 pb-8">
                {albums.map((album) => (
                  <GalleryPost
                    key={album.id}
                    album={album}
                    images={images}
                    onOpen={() => onOpenAlbum(album.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
