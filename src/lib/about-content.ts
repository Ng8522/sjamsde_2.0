/** About page copy. */

export const ABOUT_HERO = {
  eyebrow: "About us",
  title: "St John Ambulans Malaysia — Selangor Darul Ehsan",
  subtitle:
    "A voluntary humanitarian organisation providing emergency medical response, community health programmes and first aid training across Selangor since 1908.",
  motto: "Pro Utilitate Hominum — For the Service of Mankind",
} as const;

export const ABOUT_INTRO = [
  "St John Ambulans Malaysia (SJAM) Selangor Darul Ehsan (SDE) is the state branch serving residents, event organisers and partner agencies throughout Selangor. Our members and staff work alongside volunteers to deliver ambulance cover, haemodialysis support, public duty standby and community outreach.",
  "The Selangor Coastal Area pioneered our ambulance operations in 1978. The first fully equipped ambulance and 24-hour emergency service began in 1990 — a milestone that continues to define how we respond today.",
  "We are sustained by public donations, corporate partnerships and thousands of volunteers who share our motto: serve with heart, give with love.",
] as const;

export const ABOUT_STATS = [
  { value: "40+", label: "Ambulances & support vehicles" },
  { value: "24/7", label: "Emergency hotline" },
  { value: "4,400+", label: "Volunteers statewide" },
  { value: "1993", label: "Haemodialysis centre established" },
] as const;

export const AMBULANCE_SERVICE = {
  id: "ambulance-services",
  title: "24-hour ambulance services",
  summary:
    "Emergency evacuation, inter-hospital transfers and event medical standby — operated around the clock from our Selangor bases.",
  hotline: "03-3371 5005",
  hotlineTel: "tel:0333715005",
  points: [
    "Statewide fleet of more than 40 ambulances and supporting vehicles, with the majority registered under the \"911\" plate series introduced in Selangor in 2005.",
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
    title: "Haemodialysis centre",
    description: "Subsidised dialysis at our Klang centre — enquiries: 03-3373 5005.",
  },
  {
    title: "First aid & CPR courses",
    description: "Accredited training for individuals, schools and workplaces.",
    href: "/courses" as const,
  },
] as const;
