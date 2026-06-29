export type HomeNursingCertificate = {
  no: string;
  refno: string;
  examDate: string;
  examName: string;
  examSjamId: string;
  examIc: string;
  result: "Passed" | "Failed";
  examTypeEn: string;
  examTypeMs: string;
  examUnit: string;
  dateOfIssue: string;
  state: string;
  issued: number;
  certNo: string;
};

const certImageGlob = import.meta.glob<string>("../assets/home-nursing/*.{jpg,JPG,jpeg}", {
  eager: true,
  query: "?url",
  import: "default",
});

function normalizePersonName(name: string) {
  return name.trim().toUpperCase().replace(/\s+/g, " ");
}

function parseCertImageFilename(filename: string) {
  const match = filename.match(/^(\d+)\s*-\s*(.+)\.(jpg|jpeg)$/i);
  if (!match) return null;
  return {
    certNo: match[1],
    name: normalizePersonName(match[2]),
  };
}

const certImagesByName = Object.fromEntries(
  Object.entries(certImageGlob).flatMap(([path, url]) => {
    const filename = path.replace(/\\/g, "/").split("/").pop() ?? "";
    const parsed = parseCertImageFilename(filename);
    return parsed ? [[parsed.name, url] as const] : [];
  }),
);

export function getHomeNursingCertImage(
  row: Pick<HomeNursingCertificate, "examName">,
): string | undefined {
  return certImagesByName[normalizePersonName(row.examName)];
}

export const HOME_NURSING_CERTIFICATES: HomeNursingCertificate[] = [
  {
    no: "001",
    refno: "KSB260001",
    examDate: "09-May-26",
    examName: "QUEK JIA QI",
    examSjamId: "",
    examIc: "090311-05-0462",
    result: "Passed",
    examTypeEn: "Preliminary Home Nursing",
    examTypeMs: "Perawatan Asas di Rumah",
    examUnit: "KSB01 - IBU PEJABAT KSB",
    dateOfIssue: "26-Jun-26",
    state: "Selangor Darul Ehsan",
    issued: 0,
    certNo: "379649",
  },
  {
    no: "002",
    refno: "KPS260012",
    examDate: "09-May-26",
    examName: "KHOO SING RHONG",
    examSjamId: "",
    examIc: "001018-10-0775",
    result: "Passed",
    examTypeEn: "Preliminary Home Nursing",
    examTypeMs: "Perawatan Asas di Rumah",
    examUnit: "KPS01 - IBU PEJABAT KPS",
    dateOfIssue: "26-Jun-26",
    state: "Selangor Darul Ehsan",
    issued: 0,
    certNo: "379650",
  },
  {
    no: "003",
    refno: "KPS260012",
    examDate: "09-May-26",
    examName: "LIM HUEY WEN",
    examSjamId: "",
    examIc: "041130-10-1020",
    result: "Passed",
    examTypeEn: "Preliminary Home Nursing",
    examTypeMs: "Perawatan Asas di Rumah",
    examUnit: "KPS01 - IBU PEJABAT KPS",
    dateOfIssue: "26-Jun-26",
    state: "Selangor Darul Ehsan",
    issued: 0,
    certNo: "379651",
  },
  {
    no: "004",
    refno: "KPS260012",
    examDate: "09-May-26",
    examName: "PHUAH YOU PANG",
    examSjamId: "",
    examIc: "000306-10-1331",
    result: "Passed",
    examTypeEn: "Preliminary Home Nursing",
    examTypeMs: "Perawatan Asas di Rumah",
    examUnit: "KPS01 - IBU PEJABAT KPS",
    dateOfIssue: "26-Jun-26",
    state: "Selangor Darul Ehsan",
    issued: 0,
    certNo: "379652",
  },
  {
    no: "005",
    refno: "KPS260012",
    examDate: "09-May-26",
    examName: "TEAH JIAN HAU",
    examSjamId: "",
    examIc: "970314-10-6965",
    result: "Passed",
    examTypeEn: "Preliminary Home Nursing",
    examTypeMs: "Perawatan Asas di Rumah",
    examUnit: "KPS01 - IBU PEJABAT KPS",
    dateOfIssue: "26-Jun-26",
    state: "Selangor Darul Ehsan",
    issued: 0,
    certNo: "379653",
  },
  {
    no: "006",
    refno: "KSTU260010",
    examDate: "09-May-26",
    examName: "FAN JOE YEE",
    examSjamId: "",
    examIc: "091130-14-0930",
    result: "Passed",
    examTypeEn: "Preliminary Home Nursing",
    examTypeMs: "Perawatan Asas di Rumah",
    examUnit: "KST01 - IBU PEJABAT KSTU",
    dateOfIssue: "26-Jun-26",
    state: "Selangor Darul Ehsan",
    issued: 0,
    certNo: "379654",
  },
  {
    no: "007",
    refno: "KSTU260010",
    examDate: "09-May-26",
    examName: "LAI PUI TUNG",
    examSjamId: "",
    examIc: "090411-10-2178",
    result: "Passed",
    examTypeEn: "Preliminary Home Nursing",
    examTypeMs: "Perawatan Asas di Rumah",
    examUnit: "KST01 - IBU PEJABAT KSTU",
    dateOfIssue: "26-Jun-26",
    state: "Selangor Darul Ehsan",
    issued: 0,
    certNo: "379655",
  },
  {
    no: "008",
    refno: "KSTU260010",
    examDate: "09-May-26",
    examName: "LEE QER YING",
    examSjamId: "",
    examIc: "090620-14-0488",
    result: "Passed",
    examTypeEn: "Preliminary Home Nursing",
    examTypeMs: "Perawatan Asas di Rumah",
    examUnit: "KST01 - IBU PEJABAT KSTU",
    dateOfIssue: "26-Jun-26",
    state: "Selangor Darul Ehsan",
    issued: 0,
    certNo: "379656",
  },
  {
    no: "009",
    refno: "KSTS260014",
    examDate: "09-May-26",
    examName: "KAELYN GAN CAI YUN",
    examSjamId: "",
    examIc: "090911-05-0108",
    result: "Passed",
    examTypeEn: "Preliminary Home Nursing",
    examTypeMs: "Perawatan Asas di Rumah",
    examUnit: "KSTS01 - IBU PEJABAT KSTS",
    dateOfIssue: "26-Jun-26",
    state: "Selangor Darul Ehsan",
    issued: 0,
    certNo: "379657",
  },
  {
    no: "010",
    refno: "KSTS260014",
    examDate: "09-May-26",
    examName: "ASHLYN HAH XIN YUN",
    examSjamId: "",
    examIc: "091219-10-1428",
    result: "Passed",
    examTypeEn: "Preliminary Home Nursing",
    examTypeMs: "Perawatan Asas di Rumah",
    examUnit: "KSTS01 - IBU PEJABAT KSTS",
    dateOfIssue: "26-Jun-26",
    state: "Selangor Darul Ehsan",
    issued: 0,
    certNo: "379658",
  },
  {
    no: "011",
    refno: "SDE260005",
    examDate: "09-May-26",
    examName: "LEE YONG CHIEU",
    examSjamId: "",
    examIc: "780228-08-7377",
    result: "Passed",
    examTypeEn: "Preliminary Home Nursing",
    examTypeMs: "Perawatan Asas di Rumah",
    examUnit: "S01 - IBU PEJABAT",
    dateOfIssue: "26-Jun-26",
    state: "Selangor Darul Ehsan",
    issued: 0,
    certNo: "379659",
  },
  {
    no: "012",
    refno: "SDE260005",
    examDate: "09-May-26",
    examName: "TEO CHENG CHUAN",
    examSjamId: "",
    examIc: "760129-01-5011",
    result: "Passed",
    examTypeEn: "Preliminary Home Nursing",
    examTypeMs: "Perawatan Asas di Rumah",
    examUnit: "S01 - IBU PEJABAT",
    dateOfIssue: "26-Jun-26",
    state: "Selangor Darul Ehsan",
    issued: 0,
    certNo: "379660",
  },
];
