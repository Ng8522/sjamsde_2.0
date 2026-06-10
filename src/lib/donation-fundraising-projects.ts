import ambulanceImg from "../assets/ambulance.jpg";
import sdeBuildingImg from "../assets/event/2025 Launching of SJAM-SDE State Training Center/522034799_1368034225324318_5417606558004982396_n.jpg";
import firstAidCompImg from "../assets/first_aid1.jpg";
import mobileClinicImg from "../assets/mobile_clinic.JPG";
import mobileAppImg from "../assets/mobile-app.jpeg";
import ocuImg from "../assets/ocu/47th Deployment/700971405_1653371716790566_7397446257909075388_n.jpg";

export type DonationFundraisingProject = {
  id: string;
  title: string;
  /** One-line label for the 6×1 donate page row */
  shortTitle: string;
  /** What this fund supports — shown on donate cards */
  description: string;
  imageSrc: string;
  raised: number;
  goal: number;
};

/** Six 2026–2028 fundraising priorities on the donate page (6 columns × 1 row). */
export const donationFundraisingProjects: DonationFundraisingProject[] = [
  {
    id: "sde-building",
    title: "SDE Building",
    shortTitle: "SDE Building",
    description: "State training centre & SJAM SDE headquarters, Klang",
    imageSrc: sdeBuildingImg,
    raised: 1250000,
    goal: 3500000,
  },
  {
    id: "ambulance",
    title: "Ambulance Services",
    shortTitle: "Ambulance Services",
    description: "24-hour ambulance fleet, equipment & operational costs",
    imageSrc: ambulanceImg,
    raised: 357000,
    goal: 725000,
  },
  {
    id: "ocu-deployment",
    title: "Ophthalmic Care Unit (OCU) Deployment",
    shortTitle: "Ophthalmic Care Unit",
    description: "Free eye screening, spectacles & cataract referral in the community",
    imageSrc: ocuImg,
    raised: 84200,
    goal: 150000,
  },
  {
    id: "mobile-clinic",
    title: "Mobile Clinic",
    shortTitle: "Mobile Clinic",
    description: "Community health screening at schools & public programmes",
    imageSrc: mobileClinicImg,
    raised: 92400,
    goal: 200000,
  },
  {
    id: "first-aid-competition",
    title: "State First Aid and Home Nursing Competition",
    shortTitle: "State First Aid Competition",
    description: "Annual state first aid & home nursing competition",
    imageSrc: firstAidCompImg,
    raised: 45800,
    goal: 120000,
  },
  {
    id: "ssmp",
    title: "SJAM Super App — SSMP",
    shortTitle: "SSMP Super App",
    description: "Member super-app for duty hours, events & coordination",
    imageSrc: mobileAppImg,
    raised: 186000,
    goal: 400000,
  },
];

export function getFundraisingProgress(project: DonationFundraisingProject) {
  return Math.max(0, Math.min(100, Math.round((project.raised / project.goal) * 100)));
}
