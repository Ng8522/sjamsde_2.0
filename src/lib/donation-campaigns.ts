import bloodDonationImg from "../assets/blood_donation.jpg";
import aboutBgImg from "../assets/about-bg.jpg";
import disasterReliefImg from "../assets/disaster_relief.jpg";
import fundraisingImg from "../assets/fund1.jpg";
import mobileClinicImg from "../assets/mobile_clinic.JPG";

export type DonationCampaign = {
  id: string;
  title: string;
  org: string;
  status: string;
  raised: number;
  goal: number | null;
  donors: number;
  imageSrc: string;
  category: string;
  location: string;
  story: string;
};

export const donationCampaigns: DonationCampaign[] = [
  {
    id: "lifesaver-ambulance-fuel-fund",
    title: "LifeSaver Ambulance Fuel Fund",
    org: "SJAM Selangor",
    status: "Active",
    raised: 35706,
    goal: 72551,
    donors: 1300,
    imageSrc: fundraisingImg,
    category: "Emergency Medical Support",
    location: "Selangor",
    story:
      "This fund helps SJAM SDE keep ambulances moving 24/7 for emergency calls, inter-hospital transfers, and urgent standby missions across Selangor.",
  },
  {
    id: "community-blood-drive-support",
    title: "Community Blood Drive Support",
    org: "SJAM Selangor",
    status: "Ongoing",
    raised: 16240,
    goal: 45000,
    donors: 478,
    imageSrc: bloodDonationImg,
    category: "Community Health",
    location: "Selangor",
    story:
      "Your support funds blood drive logistics, volunteer kits, venue setup, and public awareness campaigns that strengthen blood bank reserves.",
  },
  {
    id: "dialysis-patient-transport-aid",
    title: "Dialysis Patient Transport Aid",
    org: "SJAM Selangor",
    status: "Urgent",
    raised: 2825,
    goal: 15000,
    donors: 34,
    imageSrc: mobileClinicImg,
    category: "Patient Assistance",
    location: "Selangor",
    story:
      "This campaign supports low-income dialysis patients by reducing transport burden and helping them attend treatment consistently.",
  },
  {
    id: "flood-relief-medical-packs",
    title: "Flood Relief Medical Packs",
    org: "SJAM Selangor",
    status: "Standby",
    raised: 12480,
    goal: 40000,
    donors: 221,
    imageSrc: disasterReliefImg,
    category: "Disaster Relief",
    location: "Selangor",
    story:
      "Contributions prepare first aid supplies, PPE, and rapid response essentials for flood incidents and emergency deployments.",
  },
  {
    id: "first-aid-training-scholarships",
    title: "First Aid Training Scholarships",
    org: "SJAM Selangor",
    status: "Active",
    raised: 9160,
    goal: 28000,
    donors: 95,
    imageSrc: bloodDonationImg,
    category: "Training & Education",
    location: "Selangor",
    story:
      "Scholarships allow students and communities with limited resources to join certified first aid training programs.",
  },
  {
    id: "community-aed-expansion",
    title: "Community AED Expansion",
    org: "SJAM Selangor",
    status: "Planning",
    raised: 15340,
    goal: 55000,
    donors: 184,
    imageSrc: fundraisingImg,
    category: "Public Safety",
    location: "Selangor",
    story:
      "Funds are allocated to place AED units in strategic public spaces and train local responders for cardiac emergencies.",
  },
  {
    id: "volunteer-uniform-and-ppe",
    title: "Volunteer Uniform & PPE",
    org: "SJAM Selangor",
    status: "Active",
    raised: 6840,
    goal: 20000,
    donors: 76,
    imageSrc: disasterReliefImg,
    category: "Volunteer Readiness",
    location: "Selangor",
    story:
      "This campaign equips SJAM volunteers with uniforms and protective equipment for safer, professional field operations.",
  },
  {
    id: "mobile-clinic-medicine-basket",
    title: "Mobile Clinic Medicine Basket",
    org: "SJAM Selangor",
    status: "Urgent",
    raised: 11890,
    goal: 32000,
    donors: 142,
    imageSrc: mobileClinicImg,
    category: "Mobile Healthcare",
    location: "Selangor",
    story:
      "Donations help stock medicine baskets used during outreach clinics for underserved families and elderly communities.",
  },
  {
    id: "youth-medics-development-fund",
    title: "Youth Medics Development Fund",
    org: "SJAM Selangor",
    status: "Ongoing",
    raised: 10420,
    goal: 30000,
    donors: 129,
    imageSrc: bloodDonationImg,
    category: "Youth Development",
    location: "Selangor",
    story:
      "Support leadership and practical training opportunities for young medics who will serve in future SJAM programs.",
  },
  {
    id: "support-to-sjam-sde",
    title: "Support to SJAM SDE",
    org: "SJAM Selangor",
    status: "Always Open",
    raised: 21980,
    goal: null,
    donors: 312,
    imageSrc: aboutBgImg,
    category: "General Support",
    location: "Selangor",
    story:
      "An unlimited support campaign that gives SJAM SDE flexible funding to respond quickly to urgent and ongoing community needs.",
  },
];

export function getDonationCampaignById(projectId: string) {
  return donationCampaigns.find((project) => project.id === projectId);
}
