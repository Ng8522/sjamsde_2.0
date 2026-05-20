import { SSMP_APP_STORE_URL, SSMP_PLAY_STORE_URL } from "@/lib/ssmp-app";
import { cn } from "@/lib/utils";

export function StoreDownloadBadges({ className }: { className?: string }) {
  const base = import.meta.env.BASE_URL;

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <a
        href={SSMP_APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <img
          src={`${base}app-store-badge.svg`}
          alt="Download SSMP on the App Store"
          width={156}
          height={48}
          className="h-11 w-auto"
        />
      </a>
      <a
        href={SSMP_PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <img
          src={`${base}google-play-badge.svg`}
          alt="Get SSMP on Google Play"
          width={156}
          height={48}
          className="h-11 w-auto"
        />
      </a>
    </div>
  );
}
