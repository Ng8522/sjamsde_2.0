/** Mobile Clinic program copy for the Programs page. */

export const MOBILE_CLINIC_START_YEAR = 2012;
export const MOBILE_CLINIC_DEPLOYMENTS = "60+";

export function getMobileClinicYearsSinceStart() {
  return `${new Date().getFullYear() - MOBILE_CLINIC_START_YEAR}+`;
}

export const MOBILE_CLINIC = {
  title: "Mobile Clinic",
  summary:
    "Bringing basic medical consultation and health screenings directly to underserved communities across Selangor — from urban neighbourhoods to rural kampungs.",
  intro: [
    "The SJAM Selangor Mobile Clinic is a community health outreach programme that takes medical care to the people who need it most. Our volunteer doctors, nurses and St John members deploy with mobile clinic equipment to orphanages, old folks homes, welfare centres and remote communities.",
    "Each deployment offers on-site health screening, general consultation, vital signs monitoring and health education. Where further treatment is needed, patients are referred to partner hospitals and clinics.",
  ],
  highlight: "Volunteer-led teams serving communities with limited access to regular healthcare.",
  services: [
    "Basic health screening & vital signs",
    "General medical consultation",
    "Health education & awareness talks",
    "Referrals to partner healthcare providers",
  ],
  stats: [
    { value: getMobileClinicYearsSinceStart(), label: `Years of outreach since ${MOBILE_CLINIC_START_YEAR}` },
    { value: "Selangor-wide", label: "Deployment coverage" },
    { value: "Volunteer-led", label: "Medical teams" },
  ],
} as const;
