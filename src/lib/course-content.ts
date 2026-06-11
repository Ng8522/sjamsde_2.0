/** Training unit contact — SJAM Selangor. */
export const TRAINING_CONTACT = {
  phone: "+60179694235",
  phoneDisplay: "017-969 4235",
  email: "user.selangor@sjam.org.my",
} as const;

const COURSE_ASSET_FOLDER: Record<string, string> = {
  fawp: "FAWP",
  awfa: "AWFA",
  bls: "BLS",
  "cpr-aed": "CPR+AED",
};

const courseImageModules = import.meta.glob<string>("../assets/course/**/*.{jpg,jpeg,JPG,png}", {
  eager: true,
  query: "?url",
  import: "default",
});

function imagesForCourseFolder(folder: string) {
  const needle = `/course/${folder}/`;
  return Object.entries(courseImageModules)
    .filter(([path]) => path.replace(/\\/g, "/").includes(needle))
    .sort(([a], [b]) => {
      const aPhoto = /\.jpe?g$/i.test(a) ? 0 : 1;
      const bPhoto = /\.jpe?g$/i.test(b) ? 0 : 1;
      return aPhoto - bPhoto || a.localeCompare(b);
    })
    .map(([, url]) => url);
}

export function getCourseCoverImage(courseId: string) {
  const folder = COURSE_ASSET_FOLDER[courseId];
  if (!folder) return undefined;
  return imagesForCourseFolder(folder)[0];
}

export function getCourseImages(courseId: string) {
  const folder = COURSE_ASSET_FOLDER[courseId];
  if (!folder) return [];
  return imagesForCourseFolder(folder);
}

export type CourseContentDetails = {
  description: string[];
  whoShouldAttend: string;
  duration: string;
  courseType: string;
  assessment: string;
  certification: string;
  hrdcClaimable: boolean;
};

export const COURSE_CONTENT: Record<string, CourseContentDetails> = {
  awfa: {
    description: [
      "This awareness course educates laypersons, family members and community members on how to act during an emergency and understand the importance of First Aid, CPR and the use of an AED.",
      "It equips anyone with first aid knowledge and skills to assist the sick or injured in the workplace or community before professional help arrives.",
    ],
    whoShouldAttend:
      "Designed for people who want training in emergency first aid. Especially suited for nominated first aiders in smaller, low- or high-risk working environments such as offices, building sites and warehouses. The course covers first aid protocols for adult casualties.",
    duration: "1 day (8 hours)",
    courseType: "Awareness",
    assessment: "No",
    certification: "Certificate of Attendance",
    hrdcClaimable: true,
  },
  fawp: {
    description: [
      "A comprehensive two-day programme meeting Department of Occupational Safety and Health (DOSH) requirements for workplace first aiders in Malaysia.",
      "Participants learn to assess emergencies, provide first aid and manage casualties until ambulance or medical services arrive, with both theory and hands-on practical sessions.",
    ],
    whoShouldAttend:
      "Mandatory or recommended for appointed workplace first aiders, safety officers and staff in factories, offices, schools and other organisations required to maintain certified first aid cover under DOSH guidelines.",
    duration: "2 days (16 hours)",
    courseType: "Workplace competency",
    assessment: "Yes — theoretical and practical",
    certification: "Certificate of Competency (3 years validity)",
    hrdcClaimable: true,
  },
  bls: {
    description: [
      "Basic Life Support training for healthcare providers and responders who may need to perform CPR and use an AED in clinical or pre-hospital settings.",
      "The course follows current resuscitation guidelines with emphasis on high-quality chest compressions, airway management and team-based response.",
    ],
    whoShouldAttend:
      "Healthcare professionals, clinic staff, ambulance crew, lifeguards and other responders who require BLS certification for their role or continuing professional development.",
    duration: "1 day (8 hours)",
    courseType: "Clinical competency",
    assessment: "Yes — theoretical and practical",
    certification: "Certificate of Competency (3 years validity)",
    hrdcClaimable: true,
  },
  "cpr-aed": {
    description: [
      "A short community session introducing cardiopulmonary resuscitation (CPR) and automated external defibrillator (AED) use for members of the public.",
      "Ideal for schools, resident associations, places of worship and community groups who want a practical introduction to bystander life-saving skills.",
    ],
    whoShouldAttend:
      "Open to the public — no prior medical training required. Suitable for parents, teachers, community volunteers and anyone who wants to learn how to respond to cardiac arrest emergencies.",
    duration: "2 hours",
    courseType: "Community awareness",
    assessment: "No",
    certification: "Participation acknowledgement",
    hrdcClaimable: false,
  },
};

export function getCourseContent(courseId: string) {
  return COURSE_CONTENT[courseId];
}
