import ambulanceImg from "../assets/ambulance.jpg";
import cadetImg from "../assets/event/2025 KPS Cadet Training Course/518358182_1209865367607347_2693216013183453137_n.jpg";
import mockExerciseImg from "../assets/event/2025 Mock Exercise/490666358_1134276181832933_993153467548575392_n.jpg";
import sdeBuildingImg from "../assets/event/2025 Launching of SJAM-SDE State Training Center/522034799_1368034225324318_5417606558004982396_n.jpg";
import firstAidCompImg from "../assets/first_aid1.jpg";
import mobileClinicImg from "../assets/mobile_clinic.JPG";
import mobileAppImg from "../assets/mobile-app.jpeg";
import ocuImg from "../assets/ocu/47th Deployment/700971405_1653371716790566_7397446257909075388_n.jpg";

export type DonationFundraisingProject = {
  id: string;
  title: string;
  imageSrc: string;
  raised: number;
  goal: number;
};

/** 2026–2028 fundraising priorities shown on the donate page. */
export const donationFundraisingProjects: DonationFundraisingProject[] = [
  {
    id: "ocu-deployment",
    title: "Ophthalmic Care Unit (OCU) Deployment",
    imageSrc: ocuImg,
    raised: 84200,
    goal: 150000,
  },
  {
    id: "sde-building",
    title: "SDE Building",
    imageSrc: sdeBuildingImg,
    raised: 1250000,
    goal: 3500000,
  },
  {
    id: "ssmp",
    title: "SJAM Super App — SSMP",
    imageSrc: mobileAppImg,
    raised: 186000,
    goal: 400000,
  },
  {
    id: "ambulance",
    title: "Ambulance",
    imageSrc: ambulanceImg,
    raised: 357000,
    goal: 725000,
  },
  {
    id: "mobile-clinic",
    title: "Mobile Clinic",
    imageSrc: mobileClinicImg,
    raised: 92400,
    goal: 200000,
  },
  {
    id: "first-aid-competition",
    title: "State First Aid and Home Nursing Competition",
    imageSrc: firstAidCompImg,
    raised: 45800,
    goal: 120000,
  },
  {
    id: "mock-exercise",
    title: "Mock Exercise",
    imageSrc: mockExerciseImg,
    raised: 31200,
    goal: 80000,
  },
  {
    id: "cadet-activities",
    title: "Cadet Activities / Grand Prior Badge",
    imageSrc: cadetImg,
    raised: 27500,
    goal: 95000,
  },
];

export function getFundraisingProgress(project: DonationFundraisingProject) {
  return Math.max(0, Math.min(100, Math.round((project.raised / project.goal) * 100)));
}
