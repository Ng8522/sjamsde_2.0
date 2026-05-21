/** SJAM-SDE operational areas for activity calendar filtering. */

export type SjamAreaId = "hq" | "kps" | "kstu" | "ksths" | "kss" | "ksu" | "ksb";

export type SjamArea = {
  id: SjamAreaId;
  label: string;
  shortLabel: string;
};

export const SJAM_ACTIVITY_AREAS: readonly SjamArea[] = [
  { id: "hq", label: "State Headquarters", shortLabel: "State HQ" },
  { id: "kps", label: "Kawasan Pantai Selangor", shortLabel: "KPS" },
  { id: "kstu", label: "Kawasan Selangor Tengah Utara", shortLabel: "KSTU" },
  { id: "ksths", label: "Kawasan Selangor Tengah Selatan", shortLabel: "KSTHS" },
  { id: "kss", label: "Kawasan Selangor Selatan", shortLabel: "KSS" },
  { id: "ksu", label: "Kawasan Selangor Utara", shortLabel: "KSU" },
  { id: "ksb", label: "Kawasan Selangor Barat", shortLabel: "KSB" },
] as const;

export function getSjamArea(id: SjamAreaId): SjamArea {
  return SJAM_ACTIVITY_AREAS.find((a) => a.id === id) ?? SJAM_ACTIVITY_AREAS[0];
}
