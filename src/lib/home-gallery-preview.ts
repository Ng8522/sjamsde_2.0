import { getGalleryAlbumImages } from "@/lib/gallery-album-images";
import { pastEventAlbums } from "@/lib/past-events-gallery";

export type HomeGalleryPreviewItem = {
  albumId: string;
  title: string;
  tag: string;
  dateLabel: string;
  imageSrc: string;
};

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** All 2025 gallery photos that have assets on disk. */
export function getHomeGalleryPreviewPool(): HomeGalleryPreviewItem[] {
  const pool: HomeGalleryPreviewItem[] = [];

  for (const album of pastEventAlbums) {
    if (!album.eventDate.startsWith("2025")) continue;

    const images = getGalleryAlbumImages(album.id);
    if (images.length === 0) continue;

    for (const imageSrc of images) {
      pool.push({
        albumId: album.id,
        title: album.title,
        tag: album.tag,
        dateLabel: album.dateLabel,
        imageSrc,
      });
    }
  }

  return pool;
}

/** Random featured shots; prefers different albums when count > 1. */
export function pickRandomHomeGalleryPreview(count: number): HomeGalleryPreviewItem[] {
  const pool = shuffle(getHomeGalleryPreviewPool());
  if (pool.length === 0) return [];

  const picked: HomeGalleryPreviewItem[] = [];
  const usedAlbums = new Set<string>();

  for (const item of pool) {
    if (picked.length >= count) break;
    if (usedAlbums.has(item.albumId)) continue;
    usedAlbums.add(item.albumId);
    picked.push(item);
  }

  if (picked.length < count) {
    for (const item of pool) {
      if (picked.length >= count) break;
      if (picked.some((entry) => entry.imageSrc === item.imageSrc)) continue;
      picked.push(item);
    }
  }

  return picked.slice(0, count);
}
