import ambulanceImg from "../assets/ambulance.jpg";
import sdeBuildingImg from "../assets/event/2025 Launching of SJAM-SDE State Training Center/522034799_1368034225324318_5417606558004982396_n.jpg";
import disasterReliefImg from "../assets/disaster_relief.jpg";
import mobileClinicImg from "../assets/mobile_clinic.JPG";
import mobileAppImg from "../assets/mobile-app.jpeg";
import ocuImg from "../assets/ocu/47th Deployment/700971405_1653371716790566_7397446257909075388_n.jpg";

export type DonationFundraisingProject = {
  id: string;
  title: string;
  /** One-line label for the donate page card */
  shortTitle: string;
  description: string;
  imageSrc: string;
  raised: number;
  goal: number;
};

/** Six 2026–2028 fundraising priorities on the donate page (3×2 grid). */
export const donationFundraisingProjects: DonationFundraisingProject[] = [
  {
    id: "state-hq-building",
    title: "State HQ Building",
    shortTitle: "State HQ Building",
    description: "State training centre & SJAM SDE headquarters, Klang",
    imageSrc: sdeBuildingImg,
    raised: 1_250_000,
    goal: 3_500_000,
  },
  {
    id: "ambulance",
    title: "Ambulance Services",
    shortTitle: "Ambulance Services",
    description: "24-hour ambulance fleet, equipment & operational costs",
    imageSrc: ambulanceImg,
    raised: 357_000,
    goal: 725_000,
  },
  {
    id: "ocu",
    title: "Ophthalmic Care Unit",
    shortTitle: "Ophthalmic Care Unit",
    description: "Free eye screening, spectacles & cataract referral in the community",
    imageSrc: ocuImg,
    raised: 84_200,
    goal: 150_000,
  },
  {
    id: "outreach",
    title: "Outreach Program",
    shortTitle: "Outreach Program",
    description: "Community health screening at schools & public programmes",
    imageSrc: mobileClinicImg,
    raised: 92_400,
    goal: 200_000,
  },
  {
    id: "disaster-recovery",
    title: "Disaster Recovery Fund",
    shortTitle: "Disaster Recovery Fund",
    description: "Flood relief, medical packs & rapid response essentials",
    imageSrc: disasterReliefImg,
    raised: 124_800,
    goal: 400_000,
  },
  {
    id: "sjam-super-app",
    title: "SJAM Super App",
    shortTitle: "SJAM Super App",
    description: "Member super-app for duty hours, events & coordination",
    imageSrc: mobileAppImg,
    raised: 186_000,
    goal: 400_000,
  },
];

export function getFundraisingProgress(project: DonationFundraisingProject) {
  return Math.max(0, Math.min(100, Math.round((project.raised / project.goal) * 100)));
}
