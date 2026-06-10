import type { SjamAreaId } from "@/lib/sjam-areas";

type AnnualPlanEvent = {
  id: string;
  startsAt: string;
  areaId: SjamAreaId;
  date: string;
  day: string;
  title: string;
  location: string;
  time: string;
  tag: string;
  description: string;
  spots: number;
  registered: number;
};

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"] as const;
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const STATE_HQ = "SJAM State HQ, Klang";
const NATIONAL_HQ = "National HQ / SJAM Kebangsaan";

function planEvent(input: {
  id: string;
  startsAt: string;
  areaId: SjamAreaId;
  title: string;
  tag: string;
  description: string;
  location?: string;
  time?: string;
  spots?: number;
  registered?: number;
}): AnnualPlanEvent {
  const date = new Date(`${input.startsAt}T12:00:00`);
  return {
    id: input.id,
    startsAt: input.startsAt,
    areaId: input.areaId,
    date: `${String(date.getDate()).padStart(2, "0")} ${MONTHS[date.getMonth()]}`,
    day: DAYS[date.getDay()],
    title: input.title,
    location: input.location ?? STATE_HQ,
    time: input.time ?? "Mengikut jadual program",
    tag: input.tag,
    description: input.description,
    spots: input.spots ?? 120,
    registered: input.registered ?? 0,
  };
}

/** SJAM SDE Rancangan Tahunan 2026 — sourced from annual plan PDF. */
export const annualPlan2026Events: AnnualPlanEvent[] = [
  // Januari 2026
  planEvent({
    id: "2026-01-04-fa-exam-senior",
    startsAt: "2026-01-04",
    areaId: "hq",
    title: "Peperiksaan Pertolongan Cemas Bagi Pegawai Turus Negeri",
    tag: "Training",
    description: "Peperiksaan pertolongan cemas peringkat pegawai turus negeri di bawah Rancangan Tahunan SJAM 2026.",
  }),
  planEvent({
    id: "2026-01-06-bf1-submission",
    startsAt: "2026-01-06",
    areaId: "hq",
    title: "Penghantaran Hardcopy Penyata Tahunan (BF1)",
    tag: "Administration",
    description: "Penghantaran hardcopy Penyata Tahunan (BF1) untuk tandatangan Pemerintah Negeri.",
    spots: 40,
  }),
  planEvent({
    id: "2026-01-14-ambulance-cny-1",
    startsAt: "2026-01-14",
    areaId: "hq",
    title: "Perkhidmatan Ambulans Kecemasan (Tahun Baru Cina) — Sesi 1",
    tag: "Public Duty",
    location: NATIONAL_HQ,
    description: "Perkhidmatan ambulans kecemasan sempena Tahun Baru Cina, sesi pertama (14–15 Januari).",
    time: "14–15 Januari 2026",
    spots: 80,
  }),
  planEvent({
    id: "2026-01-21-ambulance-cny-2",
    startsAt: "2026-01-21",
    areaId: "hq",
    title: "Perkhidmatan Ambulans Kecemasan (Tahun Baru Cina) — Sesi 2",
    tag: "Public Duty",
    location: NATIONAL_HQ,
    description: "Perkhidmatan ambulans kecemasan sempena Tahun Baru Cina, sesi kedua (21–22 Januari).",
    time: "21–22 Januari 2026",
    spots: 80,
  }),
  planEvent({
    id: "2026-01-28-bf1-e-service",
    startsAt: "2026-01-28",
    areaId: "hq",
    title: "Penghantaran Penyata Tahunan (BF1) 2025 — E-Perkhidmatan SJAM",
    tag: "Administration",
    location: NATIONAL_HQ,
    description: "Semua Penyata Tahunan (BF1) 2025 perlu dihantar melalui Sistem E-Perkhidmatan SJAM.",
    spots: 40,
  }),

  // Februari 2026
  planEvent({
    id: "2026-02-07-advanced-fa-course",
    startsAt: "2026-02-07",
    areaId: "hq",
    title: "Kursus Pertolongan Cemas Lanjutan",
    tag: "Training",
    description: "Kursus pertolongan cemas lanjutan di Ibu Pejabat Negeri (7–8 & 14 Februari).",
    time: "7–8 & 14 Februari 2026",
  }),
  planEvent({
    id: "2026-02-14-ambulance-raya-1",
    startsAt: "2026-02-14",
    areaId: "hq",
    title: "Perkhidmatan Ambulans Kecemasan (Hari Raya Puasa) — Sesi 1",
    tag: "Public Duty",
    location: NATIONAL_HQ,
    description: "Perkhidmatan ambulans kecemasan sempena Hari Raya Puasa, sesi pertama (14–15 Februari).",
    time: "14–15 Februari 2026",
  }),
  planEvent({
    id: "2026-02-14-fa-tutor-workshop",
    startsAt: "2026-02-14",
    areaId: "hq",
    title: "Bengkel Tutor (Pertolongan Cemas)",
    tag: "Training",
    location: NATIONAL_HQ,
    description: "Bengkel tutor pertolongan cemas di peringkat kebangsaan (14–15 Februari).",
    time: "14–15 Februari 2026",
  }),
  planEvent({
    id: "2026-02-15-advanced-fa-exam",
    startsAt: "2026-02-15",
    areaId: "hq",
    title: "Peperiksaan Pertolongan Cemas Lanjutan",
    tag: "Training",
    description: "Peperiksaan pertolongan cemas lanjutan di Ibu Pejabat Negeri.",
  }),
  planEvent({
    id: "2026-02-28-ambulance-raya-2",
    startsAt: "2026-02-28",
    areaId: "hq",
    title: "Perkhidmatan Ambulans Kecemasan (Hari Raya Puasa) — Sesi 2",
    tag: "Public Duty",
    location: NATIONAL_HQ,
    description: "Perkhidmatan ambulans kecemasan sempena Hari Raya Puasa, sesi kedua (28–29 Februari).",
    time: "28–29 Februari 2026",
  }),
  planEvent({
    id: "2026-02-29-state-fa-competition",
    startsAt: "2026-02-29",
    areaId: "hq",
    title: "Pertandingan Pertolongan Cemas & Perawatan Peringkat Negeri Ke-68",
    tag: "Competition",
    description: "Pertandingan pertolongan cemas dan perawatan peringkat negeri ke-68 di Ibu Pejabat Negeri.",
    spots: 200,
  }),

  // Mac 2026
  planEvent({
    id: "2026-03-01-area-agm",
    startsAt: "2026-03-01",
    areaId: "hq",
    title: "Mesyuarat Agung Tahunan Kawasan",
    tag: "Community",
    location: NATIONAL_HQ,
    description: "Semua kawasan mengadakan Mesyuarat Agung Tahunan Kawasan sepanjang bulan Mac.",
    time: "1–31 Mac 2026",
  }),
  planEvent({
    id: "2026-03-03-state-submissions",
    startsAt: "2026-03-03",
    areaId: "hq",
    title: "Penghantaran Laporan Tahunan & Permohonan Pingat",
    tag: "Administration",
    description:
      "Penghantaran ke Ibu Pejabat Negeri: Laporan Tahunan, Permohonan Pingat Perkhidmatan, dan Permohonan Pingat SJAM.",
    spots: 40,
  }),
  planEvent({
    id: "2026-03-04-cfs-ttt",
    startsAt: "2026-03-04",
    areaId: "hq",
    title: "Jurulatih (Mejaga Orang Sakit) — Training-the-Trainer",
    tag: "Training",
    location: NATIONAL_HQ,
    description: "Latihan jurulatih Mejaga Orang Sakit (Caring for Sick) — Training-the-Trainer (4–5 Mac).",
    time: "4–5 Mac 2026",
  }),
  planEvent({
    id: "2026-03-11-nco-cadet-course",
    startsAt: "2026-03-11",
    areaId: "hq",
    title: "Kursus Pegawai Tidak Bertauliah (NCO) Kadet",
    tag: "Training",
    description: "Kursus pegawai tidak bertauliah (NCO) kadet di Ibu Pejabat Negeri (11–12 Mac).",
    time: "11–12 Mac 2026",
  }),
  planEvent({
    id: "2026-03-18-nco-cadet-exam",
    startsAt: "2026-03-18",
    areaId: "hq",
    title: "Peperiksaan Pegawai Tidak Bertauliah (NCO) Kadet",
    tag: "Training",
    description: "Peperiksaan pegawai tidak bertauliah (NCO) kadet.",
  }),
  planEvent({
    id: "2026-03-19-promotion-assessment",
    startsAt: "2026-03-19",
    areaId: "hq",
    title: "Penilaian Kenaikan Pangkat Pegawai & NCO Dewasa",
    tag: "Administration",
    description: "Penilaian kenaikan pangkat pegawai dan pegawai tidak bertauliah (NCO) dewasa.",
    spots: 60,
  }),

  // April 2026
  planEvent({
    id: "2026-04-01-blood-donation-month",
    startsAt: "2026-04-01",
    areaId: "hq",
    title: "Bulan Penganjuran Program Pendermaan Darah",
    tag: "Blood Donation",
    location: NATIONAL_HQ,
    description: "Bulan penganjuran program pendermaan darah di seluruh negeri (1–30 April).",
    time: "1–30 April 2026",
    spots: 500,
  }),
  planEvent({
    id: "2026-04-01-state-agm",
    startsAt: "2026-04-01",
    areaId: "hq",
    title: "Mesyuarat Agung Tahunan Negeri / Wilayah",
    tag: "Community",
    location: NATIONAL_HQ,
    description: "Semua negeri/wilayah mengadakan Mesyuarat Agung Tahunan Negeri/Wilayah.",
    time: "April 2026",
  }),

  // Mei 2026
  planEvent({
    id: "2026-05-09-st-john-youth-quiz",
    startsAt: "2026-05-09",
    areaId: "hq",
    title: "Kuiz St. John Muda Ke-5 (Dalam Talian)",
    tag: "Competition",
    location: NATIONAL_HQ,
    description: "Kuiz St. John Muda ke-5 secara dalam talian.",
    spots: 300,
  }),
  planEvent({
    id: "2026-05-13-advisor-teacher-fa",
    startsAt: "2026-05-13",
    areaId: "hq",
    title: "Latihan Pertolongan Cemas Untuk Guru Penasihat",
    tag: "Training",
    description: "Latihan pertolongan cemas untuk guru penasihat (13–14 Mei).",
    time: "13–14 Mei 2026",
  }),
  planEvent({
    id: "2026-05-23-national-fa-competition",
    startsAt: "2026-05-23",
    areaId: "hq",
    title: "Pertandingan Pertolongan Cemas & Perawatan Kebangsaan Ke-65",
    tag: "Competition",
    location: NATIONAL_HQ,
    description: "Pertandingan pertolongan cemas dan perawatan kebangsaan ke-65 (23–24 Mei).",
    time: "23–24 Mei 2026",
    spots: 250,
  }),
  planEvent({
    id: "2026-05-30-ttt-course",
    startsAt: "2026-05-30",
    areaId: "hq",
    title: "Kursus Train-the-Trainer (TtT)",
    tag: "Training",
    description: "Kursus Train-the-Trainer (TtT) di Ibu Pejabat Negeri (30–31 Mei).",
    time: "30–31 Mei 2026",
  }),

  // Jun 2026
  planEvent({
    id: "2026-06-01-blood-donation-month",
    startsAt: "2026-06-01",
    areaId: "hq",
    title: "Bulan Penganjuran Program Pendermaan Darah",
    tag: "Blood Donation",
    location: NATIONAL_HQ,
    description: "Bulan penganjuran program pendermaan darah (1–30 Jun).",
    time: "1–30 Jun 2026",
    spots: 500,
  }),
  planEvent({
    id: "2026-06-01-flag-day",
    startsAt: "2026-06-01",
    areaId: "hq",
    title: "Bulan Penganjuran Hari Bendera 2026",
    tag: "Community",
    location: NATIONAL_HQ,
    description: "Bulan penganjuran Hari Bendera 2026 (1–30 Jun).",
    time: "1–30 Jun 2026",
  }),
  planEvent({
    id: "2026-06-05-promotion-proposal",
    startsAt: "2026-06-05",
    areaId: "hq",
    title: "Penghantaran Cadangan Kenaikan Pangkat",
    tag: "Administration",
    description: "Penghantaran cadangan kenaikan pangkat ke Ibu Pejabat Negeri.",
    spots: 40,
  }),
  planEvent({
    id: "2026-06-07-fa-trainer-exam",
    startsAt: "2026-06-07",
    areaId: "hq",
    title: "Peperiksaan Jurulatih Pertolongan Cemas",
    tag: "Training",
    description: "Peperiksaan jurulatih pertolongan cemas di Ibu Pejabat Negeri.",
  }),
  planEvent({
    id: "2026-06-13-youth-fa-competition",
    startsAt: "2026-06-13",
    areaId: "hq",
    title: "Pertandingan Pertolongan Cemas & Kawad Kaki St. John Muda",
    tag: "Competition",
    location: NATIONAL_HQ,
    description: "Pertandingan pertolongan cemas dan kawad kaki St. John Muda.",
    spots: 200,
  }),
  planEvent({
    id: "2026-06-13-state-charity-dinner",
    startsAt: "2026-06-13",
    areaId: "hq",
    title: "Majlis Makan Malam Amal Negeri",
    tag: "Community",
    description: "Majlis Makan Malam Amal peringkat negeri di Ibu Pejabat Negeri.",
    spots: 400,
  }),
  planEvent({
    id: "2026-06-15-poster-competition",
    startsAt: "2026-06-15",
    areaId: "hq",
    title: "Pertandingan Melukis Poster Ke-6 (Bulan Kemerdekaan)",
    tag: "Competition",
    location: NATIONAL_HQ,
    description: "Pertandingan melukis poster ke-6 sempena Bulan Kemerdekaan (15 Jun–15 Ogos).",
    time: "15 Jun–15 Ogos 2026",
    spots: 150,
  }),
  planEvent({
    id: "2026-06-24-st-john-day",
    startsAt: "2026-06-24",
    areaId: "hq",
    title: "Sambutan Hari St. John Sedunia",
    tag: "Community",
    location: NATIONAL_HQ,
    description: "Sambutan Hari St. John Sedunia.",
    spots: 300,
  }),
  planEvent({
    id: "2026-06-27-sjam-awards",
    startsAt: "2026-06-27",
    areaId: "hq",
    title: "Istiadat Penganugerahan Anugerah SJAM",
    tag: "Community",
    location: NATIONAL_HQ,
    description: "Istiadat penganugerahan Anugerah SJAM.",
    spots: 350,
  }),

  // Julai 2026
  planEvent({
    id: "2026-07-17-national-agm",
    startsAt: "2026-07-17",
    areaId: "hq",
    title: "Mesyuarat Agung Tahunan SJAM",
    tag: "Community",
    location: NATIONAL_HQ,
    description: "Mesyuarat Agung Tahunan SJAM peringkat kebangsaan.",
    spots: 200,
  }),

  // Ogos 2026
  planEvent({
    id: "2026-08-08-citizenship-quiz",
    startsAt: "2026-08-08",
    areaId: "hq",
    title: "Kuiz Kewarganegaraan Sempena Bulan Kemerdekaan Ke-5 (Dalam Talian)",
    tag: "Competition",
    location: NATIONAL_HQ,
    description: "Kuiz kewarganegaraan sempena Bulan Kemerdekaan ke-5 secara dalam talian.",
    spots: 300,
  }),
  planEvent({
    id: "2026-08-15-movement-workshop",
    startsAt: "2026-08-15",
    areaId: "hq",
    title: "Bengkel Gerakan",
    tag: "Training",
    location: NATIONAL_HQ,
    description: "Bengkel gerakan di peringkat kebangsaan (15–16 Ogos).",
    time: "15–16 Ogos 2026",
  }),
  planEvent({
    id: "2026-08-25-ksb-charity-dinner",
    startsAt: "2026-08-25",
    areaId: "ksb",
    title: "Majlis Makan Malam Amal Kawasan Selangor Barat",
    tag: "Community",
    location: "Kawasan Selangor Barat",
    description: "Majlis Makan Malam Amal Kawasan Selangor Barat.",
    spots: 250,
  }),
  planEvent({
    id: "2026-08-29-kss-charity-dinner",
    startsAt: "2026-08-29",
    areaId: "kss",
    title: "Majlis Makan Malam Amal Kawasan Selangor Selatan",
    tag: "Community",
    location: "Kawasan Selangor Selatan",
    description: "Majlis Makan Malam Amal Kawasan Selangor Selatan.",
    spots: 250,
  }),

  // September 2026
  planEvent({
    id: "2026-09-01-restart-heart-poster",
    startsAt: "2026-09-01",
    areaId: "hq",
    title: "Pertandingan Melukis Poster — World Restart a Heart Day",
    tag: "Competition",
    location: NATIONAL_HQ,
    description: "Pertandingan melukis poster sempena World Restart a Heart Day (1–30 September).",
    time: "1–30 September 2026",
    spots: 150,
  }),

  // Oktober 2026
  planEvent({
    id: "2026-10-04-foot-drill-training",
    startsAt: "2026-10-04",
    areaId: "hq",
    title: "Latihan Kawad Kaki",
    tag: "Training",
    description: "Latihan kawad kaki di Ibu Pejabat Negeri (4–5 Oktober).",
    time: "4–5 Oktober 2026",
  }),
  planEvent({
    id: "2026-10-06-state-parade",
    startsAt: "2026-10-06",
    areaId: "hq",
    title: "Perbarisan Negeri",
    tag: "Public Duty",
    description: "Perbarisan negeri di Ibu Pejabat Negeri.",
    spots: 300,
  }),
  planEvent({
    id: "2026-10-10-cfs-course",
    startsAt: "2026-10-10",
    areaId: "hq",
    title: "Kursus Caring For The Sick",
    tag: "Training",
    description: "Kursus Caring For The Sick (10–11 Oktober).",
    time: "10–11 Oktober 2026",
  }),
  planEvent({
    id: "2026-10-18-cfs-exam",
    startsAt: "2026-10-18",
    areaId: "hq",
    title: "Peperiksaan Caring For The Sick",
    tag: "Training",
    description: "Peperiksaan Caring For The Sick.",
  }),
  planEvent({
    id: "2026-10-23-fa-trainer-meeting",
    startsAt: "2026-10-23",
    areaId: "hq",
    title: "Mesyuarat Jurulatih Pertolongan Cemas",
    tag: "Training",
    location: NATIONAL_HQ,
    description: "Mesyuarat jurulatih pertolongan cemas (23–25 Oktober).",
    time: "23–25 Oktober 2026",
  }),

  // November 2026
  planEvent({
    id: "2026-11-10-foot-drill-instructor",
    startsAt: "2026-11-10",
    areaId: "hq",
    title: "Kursus Jurulatih Kawad Kaki",
    tag: "Training",
    location: NATIONAL_HQ,
    description: "Kursus jurulatih kawad kaki (10–13 November).",
    time: "10–13 November 2026",
  }),

  // Disember 2026
  planEvent({
    id: "2026-12-17-cadet-camp",
    startsAt: "2026-12-17",
    areaId: "hq",
    title: "Perkhemahan Kadet Ke-37",
    tag: "Community",
    description: "Perkhemahan Kadet ke-37 di Ibu Pejabat Negeri (17–20 Disember).",
    time: "17–20 Disember 2026",
    spots: 200,
  }),
].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
