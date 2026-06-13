/** Select value for donors with no title. Stored in DB as empty string. */
export const DONOR_TITLE_EMPTY = "__none__" as const;

export const DONOR_TITLE_OPTIONS = [
  DONOR_TITLE_EMPTY,
  "Encik",
  "Datuk",
  "Dato'",
  "Cik",
  "Datin",
  "Dr.",
  "Lain-lain",
] as const;

export type DonorTitleOption = (typeof DONOR_TITLE_OPTIONS)[number];

export const DEFAULT_DONOR_TITLE: DonorTitleOption = DONOR_TITLE_EMPTY;

export function donorTitleLabel(option: DonorTitleOption) {
  return option === DONOR_TITLE_EMPTY ? "—" : option;
}

export function resolveDonorTitle(title: string, customTitle: string) {
  if (title === DONOR_TITLE_EMPTY) {
    return "";
  }
  if (title === "Lain-lain") {
    return customTitle.trim();
  }
  return title.trim();
}

export function donorTitleToForm(title: string): {
  title: DonorTitleOption;
  customTitle: string;
} {
  const normalized = title.trim();
  if (!normalized) {
    return { title: DONOR_TITLE_EMPTY, customTitle: "" };
  }
  if ((DONOR_TITLE_OPTIONS as readonly string[]).includes(normalized)) {
    return { title: normalized as DonorTitleOption, customTitle: "" };
  }
  return { title: "Lain-lain", customTitle: normalized };
}
