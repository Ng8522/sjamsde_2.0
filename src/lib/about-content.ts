/** About page copy. */

export const ABOUT_HERO = {
  eyebrow: "About us",
  title: "St John Ambulans Malaysia — Selangor Darul Ehsan",
  subtitle:
    "A voluntary humanitarian organisation providing emergency medical response, community health programmes and first aid training across Selangor since 1908.",
  motto: "Pro Utilitate Hominum — For the Service of Mankind",
} as const;

export const ABOUT_INTRO = [
  'St. John Ambulans Malaysia (SJAM) Selangor Darul Ehsan (SDE) is the state branch of SJAM serving communities throughout Selangor. Guided by our motto, "Service for Mankind", our volunteers and staff provide ambulance services, event medical coverage, first aid training, community healthcare programmes and humanitarian outreach initiatives.',
  "Our ambulance operations began in the Selangor Coastal Area in 1978, and our first fully equipped ambulance with 24-hour emergency service was introduced in 1935. Since then, SJAM Selangor has continued to expand its services to meet the growing needs of the community.",
  "In recent years, SJAM Selangor has strengthened its commitment to community healthcare through innovative outreach initiatives, including ophthalmic care programmes that provide free eye screening and prescription spectacles to underprivileged communities. Through partnerships with healthcare professionals, corporate sponsors and volunteers, thousands of individuals have benefited from these services.",
  "SJAM Selangor is sustained by public donations, corporate partnerships and the dedication of our volunteers who contribute countless hours of service each year. Together, we continue to build a safer, healthier and more caring community for all.",
  "Serve with Heart. Give with Love.",
] as const;

export const ABOUT_INTRO_PROGRAMMES_LEAD =
  "Today, SJAM Selangor operates a wide range of programmes including:" as const;

export const ABOUT_INTRO_PROGRAMMES = [
  "Emergency and non-emergency ambulance services",
  "Event Health Services and First Aid standby",
  "First Aid, CPR and AED training",
  "Youth leadership and cadet development programmes",
  "Blood donation campaigns",
  "Community health screening and outreach projects",
  "Rakan St. John volunteer programme",
  "Humanitarian and disaster relief support",
] as const;

export const ABOUT_STATS = [
  { value: "40+", label: "Ambulances & support vehicles" },
  { value: "24/7", label: "Emergency hotline" },
  { value: "4,400+", label: "Volunteers statewide" },
  { value: "1935", label: "24-hour ambulance service launched" },
] as const;

export const AMBULANCE_SERVICE = {
  id: "ambulance-services",
  title: "24-hour ambulance services",
  summary:
    "Emergency evacuation, inter-hospital transfers and event medical standby — operated around the clock from our Selangor bases.",
  hotline: "019-682 0911",
  hotlineTel: "tel:0196820911",
  email: "amb.sde@sjam.org.my",
  emailMailto: "mailto:amb.sde@sjam.org.my",
  points: [
    'Statewide fleet of more than 40 ambulances and supporting vehicles, with the majority registered under the "911" plate series introduced in Selangor in 2005.',
    "Fleet includes standard ambulances, bariatric units, 4×4 vehicles, first-responder motorcycles and mobile clinic assets for community deployments.",
    "Fees may apply depending on location and case type; ambulance response for motor vehicle accidents is provided free of charge.",
    "Professional drivers and trained ambulance crews support public events, industrial sites and emergency call-outs across the state.",
  ],
} as const;

export const BLOOD_DONATION = {
  id: "blood-donation",
  title: "Blood donation drives",
  summary:
    "Regular community blood donation programmes help maintain national blood bank reserves for hospitals across Malaysia.",
  points: [
    "One pint of donated blood can save up to three lives. Malaysia's donation rate is about 2.2% of the population — below the 3.5–5% seen in many developed countries.",
    "Hospitals nationwide require roughly 2,000 packs of blood each day for surgeries, trauma care and chronic treatments — making consistent donor turnout essential.",
    "Our divisions organise drives with 5 to 20 donation beds at malls, campuses and community halls. Kawasan Selangor Tengah Utara (KSTU) alone has collected more than 30,000 pints and received recognition from the National Blood Bank.",
    "Volunteers manage donor registration, refreshments and first aid standby so every session runs safely and efficiently.",
  ],
} as const;

export const ABOUT_OTHER_SERVICES = [
  {
    title: "Public duty standby",
    description: "Medical teams for sports fixtures, concerts, festivals and official gatherings.",
  },
  {
    title: "First aid & CPR courses",
    description: "Accredited training for individuals, schools and workplaces.",
    href: "/courses" as const,
  },
] as const;
