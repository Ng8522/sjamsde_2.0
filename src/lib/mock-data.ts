import type { SjamAreaId } from "@/lib/sjam-areas";

export type PortalEvent = {
  id: string;
  /** ISO date YYYY-MM-DD for calendar */
  startsAt: string;
  areaId: SjamAreaId;
  date: string;
  day: string;
  title: string;
  location: string;
  time: string;
  tag: string;
  description: string;
  spots: number;
  registered: number;
};

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

export const portalEvents: PortalEvent[] = [
  {
    id: "volunteer-jun-05-hq",
    startsAt: "2026-06-05",
    areaId: "hq",
    date: "05 JUN",
    day: "Fri",
    title: "Volunteer Orientation & Recruitment",
    location: "SJAM State HQ, Klang",
    time: "7:00 PM – 9:30 PM",
    tag: "Volunteer",
    description:
      "Introduction to SJAM Selangor volunteer pathways, uniform fitting, and duty roster briefing for new applicants.",
    spots: 60,
    registered: 42,
  },
  {
    id: "screening-jun-08-kss",
    startsAt: "2026-06-08",
    areaId: "kss",
    date: "08 JUN",
    day: "Mon",
    title: "Community Health Screening — Kajang",
    location: "Taman Bukit Mewah, Kajang",
    time: "10:00 AM – 2:00 PM",
    tag: "Outreach",
    description:
      "Free BMI, blood pressure, and glucose checks with referral guidance for follow-up care.",
    spots: 100,
    registered: 36,
  },
  {
    id: "open-day-jun-12-hq",
    startsAt: "2026-06-12",
    areaId: "hq",
    date: "12 JUN",
    day: "Fri",
    title: "State HQ Open Day & Ambulance Tour",
    location: "SJAM State HQ, Klang",
    time: "10:00 AM – 4:00 PM",
    tag: "Community",
    description:
      "Guided tours of operations, ambulance display, and first aid demonstrations for schools and families.",
    spots: 200,
    registered: 95,
  },
  {
    id: "blood-jun-15",
    startsAt: "2026-06-15",
    areaId: "kps",
    date: "15 JUN",
    day: "Mon",
    title: "Community Blood Donation Drive",
    location: "Klang Parade, Klang",
    time: "9:00 AM – 4:00 PM",
    tag: "Blood Donation",
    description:
      "Open community blood donation drive in partnership with the national blood bank. Walk-ins welcome; bring MyKad and stay hydrated.",
    spots: 120,
    registered: 78,
  },
  {
    id: "standby-jun-18-kstu",
    startsAt: "2026-06-18",
    areaId: "kstu",
    date: "18 JUN",
    day: "Thu",
    title: "Event Medical Standby — Kepong Carnival",
    location: "Metro Prima, Kepong",
    time: "4:00 PM – 11:00 PM",
    tag: "Public Duty",
    description: "Ambulance and first responder cover for a neighbourhood carnival and fun run.",
    spots: 20,
    registered: 16,
  },
  {
    id: "first-aid-jun-22",
    startsAt: "2026-06-22",
    areaId: "hq",
    date: "22 JUN",
    day: "Sat",
    title: "Public First Aid & CPR Course",
    location: "SJAM HQ, Selangor",
    time: "8:30 AM – 5:00 PM",
    tag: "Training",
    description:
      "Accredited one-day CPR and basic trauma care certification for the public. Includes practical assessment and e-certificate.",
    spots: 40,
    registered: 31,
  },
  {
    id: "cpr-demo-jun-28-ksths",
    startsAt: "2026-06-28",
    areaId: "ksths",
    date: "28 JUN",
    day: "Sun",
    title: "Free CPR & AED Awareness Session",
    location: "The Mines, Seri Kembangan",
    time: "2:00 PM – 5:00 PM",
    tag: "Training",
    description:
      "Hands-on CPR and AED practice for the public. No assessment; participation acknowledgement provided.",
    spots: 50,
    registered: 44,
  },
  {
    id: "clinic-jul-06",
    startsAt: "2026-07-06",
    areaId: "kps",
    date: "06 JUL",
    day: "Sat",
    title: "Mobile Clinic — Kg. Sungai Pinang",
    location: "Klang District",
    time: "10:00 AM – 3:00 PM",
    tag: "Outreach",
    description:
      "Free basic health screening, consultation and medication guidance for underserved communities in Klang.",
    spots: 200,
    registered: 45,
  },
  {
    id: "blood-jul-12-kstu",
    startsAt: "2026-07-12",
    areaId: "kstu",
    date: "12 JUL",
    day: "Sat",
    title: "Blood Donation — Kepong Community Hall",
    location: "Desa Jaya, Kepong",
    time: "9:00 AM – 3:00 PM",
    tag: "Blood Donation",
    description: "Community blood donation drive with the National Blood Bank.",
    spots: 80,
    registered: 52,
  },
  {
    id: "outreach-aug-02-kss",
    startsAt: "2026-08-02",
    areaId: "kss",
    date: "02 AUG",
    day: "Sat",
    title: "Health Screening — Kajang",
    location: "Jalan Bukit, Kajang",
    time: "10:00 AM – 2:00 PM",
    tag: "Outreach",
    description: "Basic health screening and first aid awareness booth.",
    spots: 150,
    registered: 28,
  },
  {
    id: "standby-aug-16-ksths",
    startsAt: "2026-08-16",
    areaId: "ksths",
    date: "16 AUG",
    day: "Sat",
    title: "Event Medical Standby — Seri Kembangan",
    location: "South City Plaza",
    time: "2:00 PM – 10:00 PM",
    tag: "Public Duty",
    description: "Ambulance and first aid cover for a community sports day.",
    spots: 24,
    registered: 18,
  },
  {
    id: "blood-sep-08-ksu",
    startsAt: "2026-09-08",
    areaId: "ksu",
    date: "08 SEP",
    day: "Mon",
    title: "Blood Donation — Kuala Selangor",
    location: "Kuala Selangor town hall",
    time: "9:00 AM – 4:00 PM",
    tag: "Blood Donation",
    description: "Walk-in blood donation supported by SJAM Northern Selangor.",
    spots: 60,
    registered: 22,
  },
  {
    id: "clinic-sep-20-ksb",
    startsAt: "2026-09-20",
    areaId: "ksb",
    date: "20 SEP",
    day: "Sat",
    title: "Mobile Clinic — Banting",
    location: "Medan Seri Pekan, Banting",
    time: "10:00 AM – 3:00 PM",
    tag: "Outreach",
    description: "Free screening and consultation for coastal communities.",
    spots: 120,
    registered: 40,
  },
  {
    id: "training-oct-05-hq",
    startsAt: "2026-10-05",
    areaId: "hq",
    date: "05 OCT",
    day: "Sun",
    title: "Family First Aid Awareness Day",
    location: "SJAM State HQ, Klang",
    time: "9:00 AM – 1:00 PM",
    tag: "Training",
    description: "Introductory first aid sessions for families and youth groups.",
    spots: 50,
    registered: 35,
  },
  {
    id: "blood-nov-14-kps",
    startsAt: "2026-11-14",
    areaId: "kps",
    date: "14 NOV",
    day: "Sat",
    title: "Blood Donation — Port Klang",
    location: "Northport Community Centre",
    time: "9:00 AM – 3:00 PM",
    tag: "Blood Donation",
    description: "Year-end community blood donation drive with extended walk-in hours.",
    spots: 90,
    registered: 12,
  },
  {
    id: "outreach-dec-06-ksu",
    startsAt: "2026-12-06",
    areaId: "ksu",
    date: "06 DEC",
    day: "Sun",
    title: "Flood Preparedness & First Aid Booth",
    location: "Kuala Selangor town square",
    time: "9:00 AM – 1:00 PM",
    tag: "Outreach",
    description:
      "Seasonal readiness briefing, sandbag demo, and basic first aid for flood-prone communities.",
    spots: 80,
    registered: 19,
  },
];

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
