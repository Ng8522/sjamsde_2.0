/** State HQ and area office details — aligned with sde.sjamsde.org.my/about_us/contact-us/ */

export type GpsCoordinate = { lat: number; lng: number };

export type AreaOffice = {
  id: string;
  nameEn: string;
  nameMs: string;
  address: string[];
  gps?: GpsCoordinate;
  tel?: string[];
  fax?: string;
  email?: string[];
  emergency?: string;
};

export const STATE_HEADQUARTERS = {
  placeName: "St John Ambulans Malaysia Selangor Darul Ehsan",
  email: "sjamselangor@sjam.org.my",
  phones: ["+60 17-969 4235", "+60 17-471 1966", "+60 12-416 4934"],
  address: [
    "No. 10-A, Lorong Bayu Tinggi 4C",
    "Taman Bayu Tinggi, 41200 Klang",
    "Selangor Darul Ehsan, MALAYSIA",
  ],
  gps: { lat: 3.028509, lng: 101.428001 } satisfies GpsCoordinate,
};

export const AMBULANS_KITA_SELANGOR = {
  bookingNote:
    "Untuk Tempahan Perkhidmatan Ambulans Kita Selangor, sila hubungi Pusat Khidmat Masyarakat ADUN yang berdekatan.",
  inquiryNote:
    "Sebarang pertanyaan mengenai Ambulans Kita Selangor, boleh hubungi +6019-682 0911 (terima mesej WhatsApp sahaja) atau amb.sde@sjam.org.my",
  whatsappTel: "+60196820911",
  email: "amb.sde@sjam.org.my",
};

export const AREA_OFFICES: AreaOffice[] = [
  {
    id: "kps",
    nameEn: "Selangor Coastal Area",
    nameMs: "Kawasan Pantai Selangor",
    address: [
      "Bangunan Yeo Cheng Swee",
      "2984-A, Persiaran Raja Muda Musa",
      "41100 Klang, Selangor",
    ],
    gps: { lat: 3.03111, lng: 101.43321 },
    tel: ["03-3373 5005", "03-3374 5005"],
    fax: "03-3372 4898",
    email: ["sjamkps@sjam.org.my"],
  },
  {
    id: "kstu",
    nameEn: "Northern Central Selangor Area",
    nameMs: "Kawasan Selangor Tengah Utara",
    address: ["1, Jalan 4", "Desa Jaya, Kepong", "52100 Kuala Lumpur"],
    gps: { lat: 3.2148, lng: 101.63111 },
    tel: ["03-6277 2911", "017-207 2766"],
    fax: "03-6277 2911",
    email: ["sjamkstghu@sjam.org.my", "sjamkstu@hotmail.com"],
  },
  {
    id: "ksths",
    nameEn: "Southern Central Selangor Area",
    nameMs: "Kawasan Selangor Tengah Selatan",
    address: [
      "Lot No. 2.07, 2nd Floor, South City Plaza",
      "Persiaran Serdang Perdana, Taman Serdang Perdana",
      "Seksyen 1, 43300 Seri Kembangan, Selangor",
    ],
    tel: ["012-288 7333", "016-995 6403"],
    email: ["sjamkstghs@sjam.org.my"],
  },
  {
    id: "kss",
    nameEn: "Southern Selangor Area",
    nameMs: "Kawasan Selangor Selatan",
    address: ["145-E, Tingkat Satu", "Jalan Bukit, 43000 Kajang"],
    gps: { lat: 2.99046, lng: 101.79107 },
    tel: ["03-8737 6911 (Hotline)", "03-8739 1519 (Admin)"],
    fax: "03-8734 4707 / 03-8737 7300",
    emergency: "012-260 3939",
    email: ["sjamkss@sjam.org.my"],
  },
  {
    id: "ksu",
    nameEn: "Northern Selangor Area",
    nameMs: "Kawasan Selangor Utara",
    address: ["3-C, Jalan Sultan Ibrahim", "45000 Kuala Selangor"],
    gps: { lat: 3.34245, lng: 101.24878 },
    tel: ["019-776 6118 (Admin)"],
    email: ["sjamksu@sjam.org.my"],
  },
  {
    id: "ksb",
    nameEn: "Western Selangor Area",
    nameMs: "Kawasan Selangor Barat",
    address: [
      "D-G-7 (1st Floor), Jalan Seri Pekan 5",
      "Medan Seri Pekan, 42700 Banting, Selangor",
    ],
    gps: { lat: 2.80985, lng: 101.50338 },
    tel: ["012-226 4767", "03-3181 6911"],
    email: ["sjamksb@sjam.org.my"],
  },
];

/** Join lines into a single string for Google Maps search (address-aware). */
export function formatMapsQuery(parts: string[]) {
  return parts.filter(Boolean).join(", ");
}

export function stateHqMapsQuery() {
  return formatMapsQuery([STATE_HEADQUARTERS.placeName, ...STATE_HEADQUARTERS.address]);
}

export function areaMapsQuery(area: AreaOffice) {
  return formatMapsQuery(["St John Ambulans Malaysia", area.nameEn, ...area.address]);
}

/** Embed map centred on the searched place/address (not raw coordinates only). */
export function googleMapsEmbedUrl(query: string, zoom = 16) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&hl=en&output=embed`;
}

export function googleMapsPlaceUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function formatGps({ lat, lng }: GpsCoordinate) {
  return `${lat},${lng}`;
}
