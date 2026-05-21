export const SSMP_APP_STORE_URL = "https://apps.apple.com/my/app/ssmp/id6749216316";

export const SSMP_PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.anonymous.semutzsj2";

/** Homepage SSMP section — download links only; member features live in the app. */
export const SSMP_HOMEPAGE = {
  eyebrow: "SSMP mobile app",
  title: "SJAM SDE members — download SSMP",
  description:
    "The official SSMP app is where registered members manage accounts, record duty hours, access SOS support, and receive internal announcements from headquarters and your area.",
  scopeNote:
    "This public website covers community programmes, activity, courses, and volunteering. Member registration and day-to-day operations are handled in SSMP.",
  features: [
    "Member registration & profile",
    "Duty hour tracking",
    "SOS assistance",
    "Internal announcements",
  ] as const,
};
