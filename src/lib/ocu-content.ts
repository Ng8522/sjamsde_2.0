/** Ophthalmic Care Unit program copy for the Programs page. */

export type OcuDeploymentHighlight = {
  number: number;
  title: string;
  location: string;
  /** People screened at this visit (not the deployment number). */
  peopleScreened?: number;
  glassesProvided?: number;
  paragraphs: readonly string[];
  thanks: readonly string[];
};

export const OCU = {
  title: "Ophthalmic Care Unit (OCU)",
  summary:
    "Free eye screening and prescription glasses for children, seniors and underserved communities across Selangor — because clear vision is essential to learning, independence and dignity.",
  intro: [
    "The SJAM Selangor Ophthalmic Care Unit brings optometry outreach to orphanages, old folks homes, schools and welfare centres. Volunteer optometrists, opticians and St John members conduct vision screenings and arrange free prescription glasses for those who need them.",
    "Each deployment is one community visit — pairing clinical care with compassion, one pair of glasses at a time.",
  ],
  services: [
    "Comprehensive eye screening",
    "Free prescription glasses",
    "Care homes, schools & community centres",
    "Volunteer optometrists & opticians",
  ],
  stats: [
    { value: "Selangor-wide", label: "Outreach coverage" },
    { value: "Volunteer-led", label: "Clinical teams" },
    { value: "Free glasses", label: "For those in need" },
  ],
} as const;
