import { annualPlan2026Events, type PortalEvent, type PortalEventDetailSection } from "@/lib/annual-plan-2026-events";

export type { PortalEvent, PortalEventDetailSection };

export type CourseHighlight = {
  text: string;
  emphasis?: boolean;
};

export type Course = {
  id: string;
  /** Short programme code e.g. FAWP */
  code: string;
  title: string;
  subtitle: string;
  highlights: CourseHighlight[];
  level: string;
  dates: string;
  /** ISO dates for optional intake booking */
  sessions: string[];
  time: string;
  location: string;
  trainer: string;
  fee: number;
  seats: number;
  enrolled: number;
  certification: string;
  /** Tailwind classes for card surface */
  cardTheme: string;
  enquiryOnly?: boolean;
};

export const portalEvents: PortalEvent[] = annualPlan2026Events;

export const courses: Course[] = [
  {
    id: "fawp",
    code: "FAWP",
    title: "First Aid at Workplace",
    subtitle: "2-day First Aid at Workplace",
    highlights: [
      { text: "2-day course" },
      { text: "Recognised by DOSH", emphasis: true },
      { text: "Theoretical and practical assessment" },
      { text: "Certificate of Competency (3 years validity)" },
    ],
    level: "Workplace",
    dates: "Multiple intakes · 2 full days per cohort",
    sessions: ["2026-06-14", "2026-07-19", "2026-08-16"],
    time: "8:30 AM – 5:00 PM (both days)",
    location: "SJAM SDE HQ, Selangor",
    trainer: "SJAM National Faculty",
    fee: 280,
    seats: 24,
    enrolled: 16,
    certification: "Certificate of Competency (3 years)",
    cardTheme: "bg-sky-100/80 dark:bg-sky-950/40 border-sky-200/60 dark:border-sky-800/50",
  },
  {
    id: "awfa",
    code: "AWFA",
    title: "Awareness of First Aid",
    subtitle: "1-day Awareness of First Aid",
    highlights: [
      { text: "1-day course" },
      { text: "No assessment" },
      { text: "Certificate of Attendance" },
    ],
    level: "Awareness",
    dates: "Monthly Saturday intakes",
    sessions: ["2026-06-21", "2026-07-19", "2026-08-23"],
    time: "9:00 AM – 4:00 PM",
    location: "SJAM SDE HQ, Selangor",
    trainer: "Certified SJAM instructors",
    fee: 120,
    seats: 40,
    enrolled: 22,
    certification: "Certificate of Attendance",
    cardTheme: "bg-emerald-100/80 dark:bg-emerald-950/40 border-emerald-200/60 dark:border-emerald-800/50",
  },
  {
    id: "bls",
    code: "BLS",
    title: "Basic Life Support",
    subtitle: "1-day Basic Life Support",
    highlights: [
      { text: "1-day course" },
      { text: "Theoretical and practical assessment" },
      { text: "Certificate of Competency (3 years validity)" },
    ],
    level: "Clinical",
    dates: "Scheduled throughout the year",
    sessions: ["2026-06-28", "2026-07-26"],
    time: "8:30 AM – 5:00 PM",
    location: "SJAM SDE Training Hall",
    trainer: "Dr. Lim · Emergency Medicine",
    fee: 180,
    seats: 30,
    enrolled: 24,
    certification: "Certificate of Competency (3 years)",
    cardTheme: "bg-rose-100/70 dark:bg-rose-950/40 border-rose-200/60 dark:border-rose-800/50",
  },
  {
    id: "cpr-aed",
    code: "CPR+AED",
    title: "CPR and AED",
    subtitle: "2-hour CPR and AED",
    highlights: [
      { text: "2-hour course" },
      { text: "Free of charge", emphasis: true },
      { text: "No assessment" },
    ],
    level: "Community",
    dates: "Community sessions · register for next slot",
    sessions: ["2026-06-15", "2026-07-12", "2026-08-09"],
    time: "2:00 PM – 4:00 PM",
    location: "SJAM SDE HQ & community venues",
    trainer: "SJAM volunteer instructors",
    fee: 0,
    seats: 50,
    enrolled: 38,
    certification: "Participation acknowledgement",
    cardTheme: "bg-stone-200/70 dark:bg-stone-800/40 border-stone-300/60 dark:border-stone-600/50",
  },
];

export function getEventById(id: string) {
  return portalEvents.find((e) => e.id === id);
}

export function getCourseById(id: string) {
  return courses.find((c) => c.id === id);
}
