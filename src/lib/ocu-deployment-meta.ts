import type { OcuDeploymentHighlight } from "@/lib/ocu-content";

/** Optional copy and visit stats per deployment number. Add new entries as folders are added under assets/ocu/. */
export const ocuDeploymentMetaByNumber: Record<
  number,
  Pick<OcuDeploymentHighlight, "title" | "location" | "peopleScreened" | "glassesProvided" | "paragraphs" | "thanks">
> = {
  47: {
    title: "Pertubuhan Pendidikan Anak-anak Yatim Selangor",
    location: "Ampang, Selangor",
    peopleScreened: 46,
    glassesProvided: 25,
    paragraphs: [
      "Our Ophthalmic Care Unit (OCU) team just wrapped up its 47th deployment, and our hearts (and eyes) couldn't be wider! This round, we visited the wonderful children and caretakers at Pertubuhan Pendidikan Anak-anak Yatim Selangor in Ampang to conduct free vision screenings.",
      "Ensuring good vision is a crucial step in a child's education and development, and we are incredibly proud of the impact made during this visit:",
    ],
    thanks: [
      "🍛 A huge, heartfelt thank you to Mr. Benny and friends for generously sponsoring a delicious lunch for our volunteers and the home's residents. They say vision changes lives, but good food definitely powers the mission! Your kindness kept our team energized and everyone smiling.",
      "Thank you to our dedicated volunteers from St. John Ambulans Malaysia - Kawasan Selangor Tengah Utara - SJAM KSTU for your unwavering commitment, and to the home for welcoming us so warmly. Together, we are helping the next generation see their bright futures just a little bit clearer.",
    ],
  },
  46: {
    title: "Pertubuhan Pendidikan Anak-anak Yatim Selangor",
    location: "Ampang, Selangor",
    paragraphs: [
      "Our Ophthalmic Care Unit (OCU) team completed its 46th deployment at Pertubuhan Pendidikan Anak-anak Yatim Selangor in Ampang — another meaningful visit bringing free vision screenings to the children and caretakers there.",
      "Good vision supports every child's learning and development. We are grateful for the continued partnership with this home and everyone who made the outreach possible.",
    ],
    thanks: [
      "Thank you to our dedicated volunteers from St. John Ambulans Malaysia - Kawasan Selangor Tengah Utara - SJAM KSTU for your unwavering commitment, and to the home for welcoming us so warmly.",
    ],
  },
};
