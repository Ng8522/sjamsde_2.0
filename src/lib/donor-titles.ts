export const DONOR_TITLE_OPTIONS = [
  "Encik",
  "Datuk",
  "Dato'",
  "Cik",
  "Datin",
  "Dr.",
  "Lain-lain",
] as const;

export type DonorTitleOption = (typeof DONOR_TITLE_OPTIONS)[number];

export const DEFAULT_DONOR_TITLE: DonorTitleOption = "Encik";

export function resolveDonorTitle(title: string, customTitle: string) {
  if (title === "Lain-lain") {
    return customTitle.trim();
  }
  return title.trim();
}
