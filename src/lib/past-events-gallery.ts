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
    id: "bls-mppwp-2025",
    title: "2025 Basic Life Support Course MPPWP",
    eventDate: "2025-08-09",
    dateLabel: "9 August 2025",
    location: "MPPWP",
    tag: "Training",
    summary: "Basic Life Support accreditation course for MPPWP staff and personnel.",
    coverImage: "ambulance",
    photoCount: 12,
  },
  {
    id: "pusat-jagaan-megah-2025",
    title: "Pusat Jagaan Megah Kanak Orang Asli",
    eventDate: "2025-08-03",
    dateLabel: "3 August 2025",
    location: "Pusat Jagaan Megah",
    tag: "Community Care",
    summary: "Healthcare outreach and support visit to indigenous children care center.",
    coverImage: "community",
    photoCount: 14,
  },
  {
    id: "mobile-clinic-hulu-yam-2025",
    title: "Mobile Clinic at Hulu Yam",
    eventDate: "2025-08-03",
    dateLabel: "3 August 2025",
    location: "Hulu Yam",
    tag: "Mobile Clinic",
    summary: "Medical consultation and health screening for underserved Hulu Yam community.",
    coverImage: "community",
    photoCount: 16,
  },
  {
    id: "ocu-free-glasses-2025",
    title: "12th Mobile Eye Test & Free Glasses Initiative",
    eventDate: "2025-08-03",
    dateLabel: "3 August 2025",
    location: "Selangor",
    tag: "Ophthalmic Care",
    summary: "Free eye screening and prescription glasses distribution program across Selangor.",
    coverImage: "community",
    photoCount: 18,
  },
  {
    id: "junior-hero-2025",
    title: "AGMO Junior Hero in Action",
    eventDate: "2025-08-03",
    dateLabel: "3 August 2025",
    location: "AGMO Facility",
    tag: "Youth Programme",
    summary: "Cadet and youth volunteer activity and recognition programme.",
    coverImage: "community",
    photoCount: 11,
  },
  {
    id: "train-trainer-2025",
    title: "Train the Trainer Course",
    eventDate: "2025-08-02",
    dateLabel: "2 August 2025",
    location: "SJAM Training Center",
    tag: "Training",
    summary: "Instructor certification and train-the-trainer programme for first aid trainers.",
    coverImage: "ambulance",
    photoCount: 13,
  },
  {
    id: "pickle-cup-2025",
    title: "St John Charity Pickle Cup",
    eventDate: "2025-08-02",
    dateLabel: "2 August 2025",
    location: "Sports Venue, Selangor",
    tag: "Community Event",
    summary: "Charity pickle ball tournament and community sports event.",
    coverImage: "community",
    photoCount: 19,
  },
  {
    id: "kindergarten-first-aid-2025",
    title: "First Aid Experience for Kindergarten",
    eventDate: "2025-07-29",
    dateLabel: "29 July 2025",
    location: "Kindergarten",
    tag: "Education",
    summary: "Hands-on first aid awareness and basic safety training for young children.",
    coverImage: "ambulance",
    photoCount: 9,
  },
  {
    id: "school-eye-care-2025",
    title: "Ophthalmic Care in School",
    eventDate: "2025-07-24",
    dateLabel: "24 July 2025",
    location: "School",
    tag: "Ophthalmic Care",
    summary: "Eye screening and vision health programme at local schools.",
    coverImage: "community",
    photoCount: 12,
  },
  {
    id: "training-center-launch-2025",
    title: "Launching of SJAM-SDE State Training Center",
    eventDate: "2025-07-21",
    dateLabel: "21 July 2025",
    location: "SJAM Training Center",
    tag: "Milestone",
    summary: "Official inauguration of new state-of-the-art training facility.",
    coverImage: "ambulance",
    photoCount: 24,
  },
  {
    id: "charity-dinner-2025",
    title: "State Building Fund Charity Dinner",
    eventDate: "2025-07-20",
    dateLabel: "20 July 2025",
    location: "Venue, Selangor",
    tag: "Fundraising",
    summary: "Gala dinner and fundraising event for SJAM-SDE building expansion.",
    coverImage: "community",
    photoCount: 22,
  },
  {
    id: "care-home-eye-care-2025",
    title: "Ophthalmic Care at Sweet Care Home",
    eventDate: "2025-07-20",
    dateLabel: "20 July 2025",
    location: "Sweet Care Home",
    tag: "Ophthalmic Care",
    summary: "Eye care services and vision screening for elderly care home residents.",
    coverImage: "community",
    photoCount: 10,
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
