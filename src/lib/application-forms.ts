/** Official application forms (from sde.sjamsde.org.my). */

export const RAKAN_ST_JOHN_APPLICATION_FORM = {
  label: "Rakan St John Application Form",
  href: "https://sde.sjamsde.org.my/wp-content/uploads/2026/01/Rakan-SJ-Form.pdf",
} as const;

export const FIRST_AID_COURSE_APPLICATION_FORM = {
  label: "First Aid Course Application Form",
  href: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=em5OzsXGnkOow5npn0DO7z3CHQGLvClEr5iI0PmtKLVUNENHMlAzTzBTTDhZRVAxWVowSTI3TlI0TS4u",
} as const;

export const HOMEPAGE_APPLICATION_FORMS = [
  RAKAN_ST_JOHN_APPLICATION_FORM,
  FIRST_AID_COURSE_APPLICATION_FORM,
] as const;
