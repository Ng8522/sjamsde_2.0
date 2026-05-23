export type MobileClinicEvent = {
  id: string;
  title: string;
  date: string;
  image: string;
  images: string[];
};

const imageModules = import.meta.glob<string>("../assets/mobile_clinic/**/*.{jpeg,jpg,JPG}", {
  eager: true,
  query: "?url",
  import: "default",
});

function imagesForFolder(folder: string, preferredFile: string): string[] {
  const normalizedFolder = folder.replace(/\\/g, "/");
  const matches = Object.entries(imageModules)
    .filter(([path]) => path.replace(/\\/g, "/").includes(normalizedFolder))
    .map(([path, url]) => ({ path: path.replace(/\\/g, "/"), url }))
    .sort((a, b) => a.path.localeCompare(b.path));

  if (matches.length === 0) return [];

  const preferredIndex = matches.findIndex(({ path }) => path.includes(preferredFile));
  if (preferredIndex <= 0) return matches.map(({ url }) => url);

  const preferred = matches[preferredIndex];
  const rest = matches.filter((_, index) => index !== preferredIndex);
  return [preferred.url, ...rest.map(({ url }) => url)];
}

const eventMeta = [
  {
    id: "13",
    folder: "13. 26 Oct 25- SK Taman Merdeka",
    file: "04191dce-9da8-4a5a-91de-7fc5f6aa168b.JPG",
    title: "2025 – SK Taman Merdeka",
    date: "October 26, 2025",
  },
  {
    id: "12",
    folder: "12. 06 Sep 25- MAEPS",
    file: "014a7736-56b9-4354-9388-231c606aa9dc.JPG",
    title: "2025 – MAEPS",
    date: "September 6, 2025",
  },
  {
    id: "11",
    folder: "11. 14 Aug 25 (61st)- Chow Kit",
    file: "IMG_7055.JPG",
    title: "2025 – (61st) Chow Kit",
    date: "August 14, 2025",
  },
  {
    id: "10",
    folder: "10. 03 Aug 25-Antara Gali, Hulu Yam, Serendah",
    file: "WhatsApp Image 2025-08-03 at 16.06.06 (3).jpeg",
    title: "2025 – Antara Gali, Hulu Yam, Serendah",
    date: "August 3, 2025",
  },
  {
    id: "9",
    folder: "9. 13 Jul 25-Ti-Ratana",
    file: "WhatsApp Image 2025-07-13 at 11.29.59.jpeg",
    title: "2025 – Ti-Ratana",
    date: "July 13, 2025",
  },
  {
    id: "8",
    folder: "8. 22 June 25-King George V Silver Jubilee Fund",
    file: "IMG_4561.JPG",
    title: "2025 – King George V Silver Jubilee Fund",
    date: "June 22, 2025",
  },
  {
    id: "7",
    folder: "7. 14 June 25- Tiam Yam Toh Teng, Klang",
    file: "559408d8-0263-487d-b9a0-7efa75d2cead.JPG",
    title: "2025 – Tiam Yam Toh Teng, Klang",
    date: "June 14, 2025",
  },
  {
    id: "6",
    folder: "6. 24 May 25-Kg Tok Adam",
    file: "WhatsApp Image 2025-05-24 at 13.10.56.jpeg",
    title: "2025 – Kg Tok Adam",
    date: "May 24, 2025",
  },
  {
    id: "5",
    folder: "5. 26 Apr 25- (55TH) Komunal Bangsar",
    file: "WhatsApp Image 2025-04-26 at 10.18.57 (2).jpeg",
    title: "2025 – (55th) Komunal Bangsar",
    date: "April 26, 2025",
  },
  {
    id: "4",
    folder: "4. 20 Apr 25-(54TH)Persatuan Kebajikan Kanak-kanak Istimewa Insan",
    file: "Copy of WhatsApp Image 2025-04-20 at 18.38.17 (1).jpeg",
    title: "2025 – (54th) Persatuan Kebajikan Kanak-kanak Istimewa Insan",
    date: "April 20, 2025",
  },
  {
    id: "3",
    folder: "3. 22 Mar 25-Persatuan Penjagaan Kanak-Kanak Terancat Akal",
    file: "WhatsApp Image 2025-03-22 at 15.44.09 (3).jpeg",
    title: "2025 – Persatuan Penjagaan Kanak-Kanak Terancat Akal",
    date: "March 22, 2025",
  },
  {
    id: "2",
    folder: "2. 15 Feb 25-Pusat Jagaan Rumah Orang Tua Chik Sin Thong Klang & Pantai",
    file: "WhatsApp Image 2025-02-15 at 22.20.32 (1).jpeg",
    title: "2025 – Pusat Jagaan Rumah Orang Tua Chik Sin Thong",
    date: "February 15, 2025",
  },
  {
    id: "1",
    folder: "1. 23 Jan 25- Chow Kit",
    file: "WhatsApp Image 2025-01-24 at 11.27.19 (3).jpeg",
    title: "2025 – Chow Kit",
    date: "January 23, 2025",
  },
] as const;

export const mobileClinicEvents: MobileClinicEvent[] = eventMeta.map((event) => {
  const images = imagesForFolder(event.folder, event.file);
  return {
    id: event.id,
    title: event.title,
    date: event.date,
    image: images[0] ?? "",
    images,
  };
});

export function getMobileClinicEvent(id: string): MobileClinicEvent | undefined {
  return mobileClinicEvents.find((event) => event.id === id);
}
