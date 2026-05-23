import { getGalleryAlbumCover, getGalleryAlbumImages } from "@/lib/gallery-album-images";
import type { PastEventAlbum } from "@/lib/past-events-gallery";

type GalleryCoverImages = Record<PastEventAlbum["coverImage"], string>;

export function getAlbumPhotos(
  album: PastEventAlbum,
  fallbackImages: GalleryCoverImages,
): { src: string; alt: string }[] {
  const images = getGalleryAlbumImages(album.id);
  if (images.length > 0) {
    return images.map((src, index) => ({
      src,
      alt: `${album.title} photo ${index + 1}`,
    }));
  }

  const fallback = getGalleryAlbumCover(album.id) || album.customImageUrl || fallbackImages[album.coverImage];
  const count = Math.max(album.photoCount, 1);
  return Array.from({ length: count }, (_, index) => ({
    src: fallback,
    alt: `${album.title} photo ${index + 1}`,
  }));
}
