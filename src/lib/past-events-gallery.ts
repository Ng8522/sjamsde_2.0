export type PastEventAlbum = {
  id: string;
  title: string;
  /** ISO date YYYY-MM-DD for sorting and filters */
  eventDate: string;
  dateLabel: string;
  location: string;
  tag: string;
  summary: string;
  coverImage: "community" | "ambulance";
  photoCount: number;
};

export const pastEventAlbums: PastEventAlbum[] = [
  {
    id: "blood-drive-klang-2025",
    title: "Community Blood Donation Drive",
    eventDate: "2025-11-15",
    dateLabel: "15 November 2025",
    location: "Klang Parade, Klang",
    tag: "Blood Donation",
    summary: "Volunteers and donors came together to support the national blood bank with a full-day community drive.",
    coverImage: "community",
    photoCount: 12,
  },
  {
    id: "merdeka-standby-2025",
    title: "Merdeka Day Public Duty StandBy",
    eventDate: "2025-08-31",
    dateLabel: "31 August 2025",
    location: "Dataran Merdeka, Kuala Lumpur",
    tag: "Public Duty",
    summary: "Medical standby coverage for the national celebration parade and public gatherings.",
    coverImage: "ambulance",
    photoCount: 18,
  },
  {
    id: "flood-relief-2024",
    title: "Flood Relief Operations",
    eventDate: "2024-12-10",
    dateLabel: "10 December 2024",
    location: "Kuala Selangor & surrounding districts",
    tag: "Disaster Relief",
    summary: "Rapid deployment teams provided first aid, evacuation support and welfare assistance during flooding.",
    coverImage: "community",
    photoCount: 24,
  },
  {
    id: "school-cpr-2024",
    title: "School CPR & AED Awareness",
    eventDate: "2024-10-05",
    dateLabel: "5 October 2024",
    location: "SMK Bandar Baru Klang",
    tag: "Training",
    summary: "Hands-on CPR and AED demonstrations for students and teachers as part of community safety outreach.",
    coverImage: "ambulance",
    photoCount: 9,
  },
  {
    id: "charity-run-2024",
    title: "Charity Fun Run Medical StandBy",
    eventDate: "2024-07-20",
    dateLabel: "20 July 2024",
    location: "Lake Gardens, Shah Alam",
    tag: "Public Duty",
    summary: "Ambulance and first aid teams on course for a charity run supporting dialysis patient welfare.",
    coverImage: "community",
    photoCount: 15,
  },
  {
    id: "open-day-2024",
    title: "SJAM-SDE Open Day",
    eventDate: "2024-04-12",
    dateLabel: "12 April 2024",
    location: "SJAM HQ, Selangor",
    tag: "Community",
    summary: "Public tours, cadet demonstrations and recruitment for Rakan St John and volunteer programmes.",
    coverImage: "ambulance",
    photoCount: 20,
  },
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function getPastEventAlbum(id: string) {
  return pastEventAlbums.find((a) => a.id === id);
}

export function getGalleryYears() {
  const years = [...new Set(pastEventAlbums.map((a) => a.eventDate.slice(0, 4)))];
  return years.sort((a, b) => Number(b) - Number(a));
}

export function getGalleryMonthsForYear(year: string) {
  const months = pastEventAlbums
    .filter((a) => a.eventDate.startsWith(year))
    .map((a) => a.eventDate.slice(5, 7));
  return [...new Set(months)].sort((a, b) => Number(b) - Number(a));
}

export function monthLabel(month: string) {
  const index = Number(month) - 1;
  return MONTH_NAMES[index] ?? month;
}

export function filterPastEventAlbums(year: string, month: string) {
  return [...pastEventAlbums]
    .filter((album) => {
      if (year !== "all" && !album.eventDate.startsWith(year)) return false;
      if (month !== "all" && album.eventDate.slice(5, 7) !== month) return false;
      return true;
    })
    .sort((a, b) => b.eventDate.localeCompare(a.eventDate));
}
