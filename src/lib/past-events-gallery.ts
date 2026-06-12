export type PastEventAlbum = {
  id: string;
  title: string;
  /** ISO date YYYY-MM-DD for sorting and filters */
  eventDate: string;
  dateLabel: string;
  location: string;
  tag: string;
  summary: string;
  coverImage: "community" | "ambulance";
  photoCount: number;
  /** Optional custom image URL */
  customImageUrl?: string;
  /** Optional organizer name override */
  organizer?: string;
};

export const pastEventAlbums: PastEventAlbum[] = [
  {
    id: "bls-mppwp-2025",
    title: "Basic Life Support Course for Residents",
    eventDate: "2025-08-09",
    dateLabel: "9 August 2025",
    location: "Sub Zon 1, Segambut Parliamentary area (MPPWP)",
    tag: "Training",
    summary:
      "Today, we joined hands with Majlis Perwakilan Penduduk Wilayah Persekutuan (MPPWP) to provide Basic Life Support Course to the residents of Sub Zon 1, Segambut Parliamentary area; equipping the residents with essential first aid skills including CPR, AED usage, and choking response.\n\nLife saving skill is important and essential! Should anyone be interested to register for the course or talk, feel free to reach out to us for more information.\n\n#SJAMKSTU for 2025 Basic Life Support Course MPPWP",
    coverImage: "ambulance",
    photoCount: 9,
    organizer: "SJAM KSTU",
  },
  {
    id: "pusat-jagaan-megah-2025",
    title: "Pusat Jagaan Megah Kanak Orang Asli",
    eventDate: "2025-08-03",
    dateLabel: "3 August 2025",
    location: "Pusat Jagaan Megah Kanak-kanak Orang Asli",
    tag: "Ophthalmic Care Unit",
    summary:
      "The 14th Ophthalmic Care Unit deployment to Pusat Jagaan Megah Kanak-kanak Orang Asli happened today!\n\nWe're so grateful to report that we screened 34 people, and 14 pairs of glasses will be provided free of charge to those in need.\n\nA massive thank you to our incredible donors! Your generous contributions of Nasi Lemak meal and food items not only supported our mission but also helped us host a special birthday celebration for all the children born in August. Seeing their happy faces was the perfect end to a successful day.\n\nYour support makes a real difference in the community!",
    coverImage: "community",
    photoCount: 12,
  },
  {
    id: "mobile-clinic-hulu-yam-2025",
    title: "60th Outreach Program at Hulu Yam, Serendah",
    eventDate: "2025-08-03",
    dateLabel: "3 August 2025",
    location: "Hulu Yam, Serendah",
    tag: "Outreach Program",
    summary:
      "Our 60th Outreach Program at Hulu Yam, Serendah was successfully held this morning, where we provided free health assessments, medical treatment, and consultations to over 100 migrant workers.\n\nA big thank you to all our members, doctors, and staff for making it happen. We're especially grateful to our strategic partner, IMU University, for sending dedicated doctors and medical staff to ensure everything ran smoothly.\n\nA special shoutout to Mitsubishi Motors Malaysia for their generous donation of two Mitsubishi Triton 4WD vehicles. We wouldn't have made it up to the venue without these two reliable beasts!",
    coverImage: "community",
    photoCount: 24,
  },
  {
    id: "ocu-free-glasses-2025",
    title: "12th Mobile Eye Test & Free Glasses Initiative",
    eventDate: "2025-08-03",
    dateLabel: "3 August 2025",
    location: "Sweet Care Home",
    tag: "Ophthalmic Care",
    summary:
      "Wrap-up of 12th Mobile Eye Test & Free Glasses Initiative 👓💙\n\nWe concluded our 12th Mobile Eye Test & Free Glasses Initiative by delivering 8 pairs of glasses to the children at Sweet Care Home, following the mobile eye test conducted earlier on 20 July 2024.\n\nSeeing their smiles reminds us that all our hard work was worth it. May we continue to spread love and reach even more people in need.\n\nA heartfelt thank you to our generous sponsors and dedicated volunteers for making this possible!",
    coverImage: "community",
    photoCount: 5,
  },
  {
    id: "junior-hero-2025",
    title: "AGMO Junior Hero in Action",
    eventDate: "2025-08-03",
    dateLabel: "3 August 2025",
    location: "AGMO Junior",
    tag: "Youth Programme",
    summary:
      "Shots from our Junior Hero in Action with collaboration with AGMO Junior held on 3 August! It was a blast to enlighten these little kids more about first aid ⛑️ Thank you and see you soon!",
    coverImage: "community",
    photoCount: 17,
  },
  {
    id: "train-trainer-2025",
    title: "Train the Trainer (TtT) Course 2025",
    eventDate: "2025-08-02",
    dateLabel: "2, 3, 9 & 10 August 2025",
    location: "SJAM Training Center",
    tag: "Training",
    summary:
      "The Train the Trainer (TtT) Course is conducted over four training days – 2nd, 3rd, 9th and 10th August 2025 – with the objective of equipping participants with the skills and confidence to deliver high-quality training in First Aid within their respective areas.\n\nThroughout the course, participants were introduced to key modules such as:\n• Effective instructional techniques\n• Classroom management during practical training\n• Teaching simulations with peer and instructor feedback\n\nThe programme also highlighted the importance of trainer ethics and interactive communication between trainers and learners.\n\nWith the successful completion of this course, it is hoped that all participants will carry forward the values of \"In the Service of Humanity\" in every training they conduct moving forward.",
    coverImage: "ambulance",
    photoCount: 3,
  },
  {
    id: "pickle-cup-2025",
    title: "St John Charity Pickle Cup 1.0",
    eventDate: "2025-08-02",
    dateLabel: "2 August 2025",
    location: "SJAM Kawasan Pantai Selangor",
    tag: "Community Event",
    summary:
      "Our team, Smash Potatoes, took part in the St. John Charity Pickle Cup 1.0, hosted by SJAM Kawasan Pantai Selangor, it is a fun and meaningful fundraising tournament in support of community service efforts.\n\nWe don't just serve well, we play well too! Thank you KPS, for the warm hospitality. We had a great time! 💪🏼👍",
    coverImage: "community",
    photoCount: 5,
  },
  {
    id: "kindergarten-first-aid-2025",
    title: "First Aid Experience for Kindergarten",
    eventDate: "2025-07-29",
    dateLabel: "29 July 2025",
    location: "Big Apple, Tadika Generasi Cemerlang Sdn Bhd",
    tag: "Education",
    summary:
      "Empowering young minds in the world of first aid! On the 29th of July, our team taught little children from Big Apple, Tadika Generasi Cemerlang Sdn Bhd on first aid topics such as CPR as well as giving them a tour around our ambulance! It was a fun experience, thank you for letting us share",
    coverImage: "ambulance",
    photoCount: 7,
  },
  {
    id: "school-eye-care-2025",
    title: "Ophthalmic Care in School",
    eventDate: "2025-07-24",
    dateLabel: "24 July 2025",
    location: "Sekolah Kebangsaan Meru",
    tag: "Ophthalmic Care",
    summary:
      "Setelah berbulan-bulan beroperasi di pusat-pusat jagaan, Ophthalmic Care Unit, St. John Ambulans Malaysia – Negeri Selangor akhirnya melangkah ke sekolah!\n\nHari ini, 24 Julai 2025 (Khamis), merupakan detik bersejarah bagi kami kerana inilah kali pertama kami berpeluang menjalankan perkhidmatan saringan mata di institusi pendidikan.\n\nKami berbesar hati mengumumkan bahawa seramai 31 orang murid dari keluarga kurang berkemampuan telah berjaya disaring. Hasilnya, 30 pasang cermin mata akan disumbangkan secara percuma kepada mereka yang memerlukan.\n\nInisiatif ini tidak akan berjaya tanpa kerjasama dan sokongan padu daripada pihak Sekolah Kebangsaan Meru. Jutaan terima kasih kami ucapkan kepada Tuan Guru Besar dan Tuan YDP PIBG atas jemputan dan peluang yang diberikan. Terima kasih juga kepada semua cikgu dan AJK PIBG yang telah banyak membantu dalam menjayakan aktiviti mulia ini.\n\nKami berharap sumbangan kecil ini dapat membantu meningkatkan kualiti penglihatan dan pembelajaran anak-anak. St. John Ambulans Malaysia – Negeri Selangor akan terus komited dalam menyantuni komuniti melalui perkhidmatan penjagaan mata.",
    coverImage: "community",
    photoCount: 13,
  },
  {
    id: "training-center-launch-2025",
    title: "Launching of SJAM-SDE State Training Center",
    eventDate: "2025-07-21",
    dateLabel: "21 July 2025",
    location: "Fairy Park Setia Alam",
    tag: "Milestone",
    summary:
      "Exciting news!\n\nThe SJAM-SDE State Training Center has officially been launched by the Commander-in-Chief of SJAM! This facility will empower us to further enhance the skills and capabilities of our dedicated volunteers.\n\nOur deepest gratitude goes to Fairy Park Setia Alam for their invaluable sponsorship, making this training center a reality. Your support is instrumental in strengthening our service to the community.",
    coverImage: "ambulance",
    photoCount: 5,
  },
  {
    id: "charity-dinner-2025",
    title: "State Building Fund Charity Dinner",
    eventDate: "2025-07-20",
    dateLabel: "20 July 2025",
    location: "Selangor",
    tag: "Fundraising",
    summary:
      "Wonderful stage performance during our State Building Fund Charity Dinner on 20 July 2025. Thanks to all the artists.",
    coverImage: "community",
    photoCount: 28,
  },
  {
    id: "care-home-eye-care-2025",
    title: "Ophthalmic Care at Sweet Care Home",
    eventDate: "2025-07-20",
    dateLabel: "20 July 2025",
    location: "Sweet Care Home, Taman Bidara, Batu Caves",
    tag: "Ophthalmic Care",
    summary:
      "Despite a busy evening ahead with the State Charity Dinner, our dedicated Ophthalmic Care Unit successfully carried out a deployment earlier today (20 July 2025) at Sweet Care Home, Taman Bidara, Batu Caves.\n\nA total of 25 residents were screened, and we're glad to share that 8 pairs of prescription glasses will be provided to those in need.\n\nA big thank you to our hardworking optometrist, opticians, volunteers and team for continuing to prioritise vision care and community outreach — even on a packed day. Your commitment makes a real difference. 🙌",
    coverImage: "community",
    photoCount: 7,
  },
  {
    id: "istiadat-2025",
    title: "Istiadat Penganugerahan",
    eventDate: "2025-07-19",
    dateLabel: "19 July 2025",
    location: "Selangor",
    tag: "Award Ceremony",
    summary:
      "Warmest congratulations to all the distinguished recipients of St. John Ambulans Malaysia Negeri Selangor Darul Ehsan Penanugerahan 2025. Your achievements are a shining reflection of excellence, commitment, and the spirit of selfless service. Each of you has demonstrated not only exceptional dedication in your respective fields but also a profound sense of responsibility to contribute meaningfully to the betterment of others.\n\nThis recognition is more than just an accolade—it is a celebration of individuals who exemplify the highest values of integrity, compassion, and leadership. In upholding the noble motto, In the Service of Humanity, you remind us all of the importance of purpose-driven work and the impact it can have on society.\n\nMay this honour serve as both a milestone and a motivation. As you continue on your journey, may you remain inspired to lead with heart, to serve with humility, and to uplift those around you through your talents and actions.\n\nWe are proud to celebrate your success, and we look forward to witnessing the continued positive change you bring to the world.",
    coverImage: "community",
    photoCount: 2,
  },
  {
    id: "bodhi-homecare-2025",
    title: "Ophthalmic Care at Bodhi Homecare",
    eventDate: "2025-07-05",
    dateLabel: "5 July 2025",
    location: "Bodhi Homecare, Cheras",
    tag: "Ophthalmic Care",
    summary:
      "Our dedicated Ophthalmic Care Unit, alongside three professional opticians, spent a meaningful afternoon at Bodhi Homecare, Cheras conducting comprehensive eye screenings for 47 residents. 💙\n\nWe're happy to share that 31 pairs of blue lens glasses were prescribed to help protect and enhance vision for those in need. 👓💫\n\nA big thank you to our amazing team and partners for making this outreach a success. Together, we're bringing clearer vision and brighter days to our community. 💖",
    coverImage: "community",
    photoCount: 10,
  },
  {
    id: "ocu-revisit-2025",
    title: "Ophthalmic Care Revisit",
    eventDate: "2025-06-28",
    dateLabel: "28 June 2025",
    location: "Pertubuhan Kebajikan Anak Yatim Mary, Rumah Warga Emas Tiam Yam Toh Heng & Persatuan Kebajikan Kasih OKU Selangor",
    tag: "Ophthalmic Care",
    summary:
      "Today, our Ophthalmic Care Unit had the privilege of revisiting three incredible care centres:\n1) Pertubuhan Kebajikan Anak Yatim Mary,\n2) Rumah Warga Emas Tiam Yam Toh Heng, and\n3) Persatuan Kebajikan Kasih OKU Selangor — to deliver prescription glasses.\n\nWitnessing the joy and radiant smiles as they tried on their new glasses was a powerful reminder that every bit of our effort is worth it. Moments like these fuel our passion to continue making a difference — bringing clarity, hope, and brightness back to those in need.",
    coverImage: "community",
    photoCount: 16,
  },
  {
    id: "intl-st-john-day-2025",
    title: "International St John Day",
    eventDate: "2025-06-24",
    dateLabel: "24 June 2025",
    location: "St. John Ambulans Malaysia Selangor",
    tag: "Community",
    summary:
      "🌟 Happy St. John Day 2025! 🌟\n\nToday, as we honor the legacy and mission of the Order of St. John, we want to extend our deepest and most sincere gratitude to all our leaders, officers, and members across Malaysia—from every States, every Areas, every Division, and every corner of our community.\n\nTo our State and Area Presidents, Vice Presidents, Officers, Members and Volunteers—thank you for your tireless service, your unshakable dedication, and your compassionate hearts. Your willingness to step forward—day after day, night after night—to serve others truly reflects the spirit of our motto: \"In the Service of Humanity.\" 🖤\n\nThrough first aid, community outreach, youth development, training, and countless hours behind the scenes, each of you plays a vital role in building a safer, more caring, and more resilient society. Whether in the heat of emergencies or in the quiet moments of preparation—you are the backbone of our mission.\n\nLet this day be a reminder of the power of unity, the beauty of selflessness, and the impact we create when we work together with one shared purpose: to serve.\n\nFrom all of us at St. John Ambulans Malaysia Selangor—thank you for your unwavering commitment and for being a beacon of hope, strength, and humanity.\n\nHere's to continuing our journey, hand in hand, In the Service of Humanity.",
    coverImage: "community",
    photoCount: 1,
  },
  {
    id: "good-samaritan-ocu-2025",
    title: "Ophthalmic Care at Good Samaritan Home",
    eventDate: "2025-06-21",
    dateLabel: "21 June 2025",
    location: "Good Samaritan Home",
    tag: "Ophthalmic Care",
    summary:
      "Today marks the 10th deployment of our Ophthalmic Care Unit. A total of 48 residents from the Good Samaritan Home were screened, and 31 individuals received free prescription glasses.\n\nA heartfelt thank you to the dedicated volunteers from KPS and KSTU for their continued support in bringing the gift of vision and goodwill to our community.\n\nSpecial thanks to Lein Hing Group for sponsoring the necessities.",
    coverImage: "community",
    photoCount: 7,
  },
  {
    id: "junior-xplorer-2025",
    title: "Junior Xplorer AGMO Junior",
    eventDate: "2025-06-21",
    dateLabel: "21 June 2025",
    location: "AGMO Junior",
    tag: "Youth Programme",
    summary:
      "Highlights from our Junior Xplorer programme in collaboration with AGMO Junior on 21 June 2025.",
    coverImage: "community",
    photoCount: 6,
  },
  {
    id: "tiam-yam-ocu-2025",
    title: "Ophthalmic Care at Tiam Yam Toh Teng Klang",
    eventDate: "2025-06-14",
    dateLabel: "14 June 2025",
    location: "Tiam Yam Toh Teng Old Folks Home, Klang",
    tag: "Ophthalmic Care",
    summary:
      "Today, our community care services extended to Tiam Yam Toh Teng Old Folks Home in Klang. Volunteers from KPS, KSS, KSTS, and KSTU conducted a comprehensive health screening, medical consultations, eye screenings, and glasses prescriptions for 30 elderly residents, including the home's committee members and staff.\n\nFollowing the eye screening results, the Ophthalmic Care Unit provided 24 pairs of glasses to those in need.\n\nA heartfelt thank you to Edon Pharmacy for generously sponsoring cereal-based supplement drinks.",
    coverImage: "community",
    photoCount: 14,
  },
  {
    id: "kebajikan-anak-ocu-2025",
    title: "Ophthalmic Care at Kebajikan Anak Yatim Mary",
    eventDate: "2025-06-08",
    dateLabel: "8 June 2025",
    location: "Pertubuhan Kebajikan Anak Yatim Mary",
    tag: "Ophthalmic Care",
    summary:
      "Pada sambutan Hari Raya Haji yang mulia, St. John Ambulans Malaysia - Negeri Selangor telah menyampaikan keprihatinan dan kasih sayang kami kepada Pertubuhan Kebajikan Anak Yatim Mary.\n\nSebagai tanda sokongan dan khidmat masyarakat, saringan mata telah dijalankan ke atas 41 orang penghuni dan warga pertubuhan tersebut. Hasil daripada saringan itu, sebanyak 20 pasang cermin mata akan disumbangkan secara percuma kepada mereka yang memerlukannya.\n\nDalam masa yang sama, para ahli St. John Ambulans Malaysia turut mengambil peluang untuk berkongsi ilmu dan kemahiran pertolongan cemas bersama adik-adik yang ceria dan comel, demi memupuk kesedaran awal tentang pentingnya penjagaan keselamatan dan kesihatan diri.",
    coverImage: "community",
    photoCount: 13,
  },
  {
    id: "first-aid-competition-2025",
    title: "2025 64th First Aid & Home Nursing Competition",
    eventDate: "2025-06-02",
    dateLabel: "2 June 2025",
    location: "Selangor",
    tag: "Competition",
    summary:
      "We are incredibly proud of our dedicated team for their outstanding performance in the 64th First Aid and Home Nursing Competition 2025!\n\nThough we may not have taken home the top prize this time, your hard work, teamwork, and commitment truly stood out. Your passion for learning, your resilience under pressure, and your spirit of service reflect everything this competition is about.\n\nEvery bandage applied, every scenario handled, and every moment spent training has not gone unnoticed. You've represented us with pride and professionalism, and that is a victory in itself.\n\nKeep your heads high—you've inspired us all and shown what true dedication looks like. Well done, and thank you for giving it your all!",
    coverImage: "ambulance",
    photoCount: 21,
  },
  {
    id: "kps-cadet-training-2025",
    title: "2025 KPS Cadet Training Course",
    eventDate: "2025-05-24",
    dateLabel: "24 May 2025",
    location: "SJAM Kawasan Pantai Selangor",
    tag: "Training",
    summary: "Cadet training course for young volunteers at Kawasan Pantai Selangor.",
    coverImage: "ambulance",
    photoCount: 74,
  },
  {
    id: "mock-exercise-2025",
    title: "2025 Mock Exercise",
    eventDate: "2025-01-23",
    dateLabel: "23 January 2025",
    location: "Kawasan Pantai Selangor, Klang",
    tag: "Training",
    summary:
      "SJAM Kawasan Pantai Selangor Yayasan Mock Exercise 2025\n\nDate: 23 January 2025\nTime: 8am – 12pm\n\nWe are proud to have successfully conducted a first aid mock exercise, providing an invaluable opportunity to train for real-life emergency situations. This drill allowed us to assess and enhance our response capabilities, improve coordination among agencies, and ensure that our teams are well-prepared to act swiftly and effectively when it matters most.\n\nThrough this hands-on simulation, participants were able to refine their skills in trauma care, rescue operations, and emergency medical response—fostering stronger teamwork and reinforcing the importance of quick, efficient action in critical situations.\n\nA huge thank you to Majlis Bandaraya Diraja Klang, PDRM IPD Klang Selatan, Zone Klang, Hospital Tengku Ampuan Rahimah Klang, Pantai Hospital Klang, Sri Kota Specialist Medical Centre Klang, Kawasan Selangor Tengah Utara, Kawasan Selangor Tengah Selatan, Kawasan Selangor Barat, Kawasan Selangor Selatan, and Kawasan Selangor Utara for their dedication, hard work, and commitment to emergency preparedness.\n\nYour support and cooperation were instrumental in making this exercise a great success.",
    coverImage: "ambulance",
    photoCount: 1071,
  },
  {
    id: "little-sisters-2023",
    title: "2023 Visit Pusat Jagaan Little Sister",
    eventDate: "2023-08-07",
    dateLabel: "7 August 2023",
    location: "Pusat Jagaan Little Sister",
    tag: "Community Care",
    summary: "Community care visit to Pusat Jagaan Little Sister.",
    coverImage: "community",
    photoCount: 69,
  },
  {
    id: "cancer-screening-2023",
    title: "2023 Cancer Screening",
    eventDate: "2023-06-17",
    dateLabel: "17 June 2023",
    location: "Selangor",
    tag: "Health Screening",
    summary: "Community cancer awareness and screening programme by KSTS.",
    coverImage: "community",
    photoCount: 4,
  },
  {
    id: "air-attendant-2023",
    title: "2023 Air Attendant Course",
    eventDate: "2023-06-12",
    dateLabel: "12 June 2023",
    location: "Training Center",
    tag: "Training",
    summary: "Specialized first aid course for airline cabin crew.",
    coverImage: "ambulance",
    photoCount: 1,
  },
  {
    id: "blood-drive-nationwide-2023",
    title: "2023 Nationwide Blood Donation Drive",
    eventDate: "2023-06-14",
    dateLabel: "14 June 2023",
    location: "Multiple locations, Selangor",
    tag: "Blood Donation",
    summary: "Large-scale blood donation campaign across Selangor.",
    coverImage: "community",
    photoCount: 1,
  },
  {
    id: "mass-cpr-2023",
    title: "2023 Mass CPR Awareness",
    eventDate: "2023-03-09",
    dateLabel: "9 March 2023",
    location: "Mid Valley, Selangor",
    tag: "Training",
    summary: "Public awareness campaign for CPR techniques at Mid Valley.",
    coverImage: "ambulance",
    photoCount: 12,
  },
  {
    id: "blood-drive-2023",
    title: "2023 Blood Donation Drive",
    eventDate: "2023-03-09",
    dateLabel: "9 March 2023",
    location: "Klang Valley, Selangor",
    tag: "Blood Donation",
    summary:
      "Donate Blood, Save Lives\n\nAs the saying goes, \"One pint of blood saves three lives.\"\n\nBlood donation is always the easiest way to be a hero one can ever be. Only 2.2 percent of the total Malaysian population donates blood, compared with 3.5 to 5 percent recorded in developed countries. This shows that Malaysians are not aware of the benefits of donating blood, and the National Blood Bank often faces low blood storage issues.\n\nTo help the National Blood Bank, Kawasan Selangor Tengah Utara (KSTU) has been constantly organising blood donation campaigns, from a scale of 5 beds to a scale of 20 beds. The team works wholeheartedly in the malls around Klang Valley whenever there is a blood donation campaign going on. To date, KSTU has collected more than 30,000 pints of blood, and hopefully this feat will continue for the benefit of those in need so that more lives can be saved.\n\nBlood banks' blood stocks needed a constant supply of blood donations as the country consumed approximately 2,000 packs of blood for medical treatments nationwide daily. Hence, it is important for the team to constantly organise blood donation and work closely with the National Blood Bank to support their initiatives and promote them to the public.\n\nKSTU's efforts in organising blood donations have earned them numerous awards and recognitions from the National Blood Bank over the years. Their hope is to continue serving mankind and saving more lives by regularly organising this meaningful activity.",
    coverImage: "community",
    photoCount: 11,
  },
  {
    id: "batang-kali-2022",
    title: "2022 Batang Kali Landslide",
    eventDate: "2022-11-01",
    dateLabel: "November 2022",
    location: "Batang Kali, Selangor",
    tag: "Disaster Relief",
    summary: "Emergency response and disaster relief for the Batang Kali landslide incident.",
    coverImage: "ambulance",
    photoCount: 7,
  },
  {
    id: "mobile-clinic-2022",
    title: "2022 Outreach Program – Chik Sin Thong Old Folks Home Selangor",
    eventDate: "2022-11-01",
    dateLabel: "November 2022",
    location: "Pusat Jagaan Rumah Orang Tua Chik Sin Thong, Selangor",
    tag: "Outreach Program",
    summary: "Outreach Program medical visit to Pusat Jagaan Rumah Orang Tua Chik Sin Thong, Selangor.",
    coverImage: "community",
    photoCount: 10,
  },
  {
    id: "flood-relief-2021",
    title: "2021 Flood Relief Taman Sri Muda",
    eventDate: "2021-12-01",
    dateLabel: "December 2021",
    location: "Taman Sri Muda, Shah Alam",
    tag: "Disaster Relief",
    summary: "Emergency relief and assistance for flood victims at Taman Sri Muda.",
    coverImage: "community",
    photoCount: 9,
  },
  {
    id: "covid-standby-2020",
    title: "2020 – 2022 Covid-19 Standby",
    eventDate: "2020-03-01",
    dateLabel: "2020 – 2022",
    location: "Selangor",
    tag: "Public Duty",
    summary: "Emergency response and medical standby during the Covid-19 pandemic.",
    coverImage: "ambulance",
    photoCount: 7,
  },
  {
    id: "blood-donation-6-2019",
    title: "2019 Blood Donation 6.0",
    eventDate: "2019-12-16",
    dateLabel: "16 December 2019",
    location: "Selangor",
    tag: "Blood Donation",
    summary: "Blood Donation 6.0 campaign drive.",
    coverImage: "community",
    photoCount: 1,
  },
  {
    id: "blood-donation-5-2018",
    title: "2018 Blood Donation 5.0",
    eventDate: "2018-12-21",
    dateLabel: "21 December 2018",
    location: "Selangor",
    tag: "Blood Donation",
    summary: "Blood Donation 5.0 community campaign.",
    coverImage: "community",
    photoCount: 2,
  },
  {
    id: "blood-donation-4-2017",
    title: "2017 Blood Donation 4.0",
    eventDate: "2017-12-21",
    dateLabel: "21 December 2017",
    location: "Selangor",
    tag: "Blood Donation",
    summary: "Blood Donation 4.0 community campaign.",
    coverImage: "community",
    photoCount: 5,
  },
  {
    id: "blood-donation-3-2016",
    title: "2016 Blood Donation 3.0",
    eventDate: "2016-12-21",
    dateLabel: "21 December 2016",
    location: "Selangor",
    tag: "Blood Donation",
    summary: "Blood Donation 3.0 community campaign.",
    coverImage: "community",
    photoCount: 1,
  },
  {
    id: "blood-donation-2-2015",
    title: "2015 Blood Donation 2.0",
    eventDate: "2015-10-31",
    dateLabel: "31 October – 1 November 2015",
    location: "MBO Cinemas nationwide",
    tag: "Blood Donation",
    summary:
      "Petaling Jaya, Wednesday 23 September 2015: MBO Cinemas has announced its partnership with St John Ambulance of Malaysia to host a blood donation drive to contribute to the National Blood Centre (PDN). Organisers are expecting to reach the target of 5,000 pints of blood at this event. The event is to be known as the Blood Donation Drive 2.0.\n\nTaking place at 25 locations of MBO Cinemas nationwide on 31 October and 1 November 2015, trained personnel from St John Ambulance of Malaysia will be on hand to assist the staff from PDN during the blood donation from 12pm until 6pm.\n\nApart from saving lives, blood donors will have many reasons to participate as they will get a free cinema ticket, limited edition movie merchandise, food, drinks and pharmaceutical gifts all in a goodie bag!\n\nIn conjunction with these efforts, two promotional videos have been created that will be aired in the cinemas, starring a female vampire called Gigi, for a month in advance to promote the Blood Donation Drive 2.0 to the audiences and create enthusiasm while taking away the fear and phobia associated with donating blood.\n\nLast year, MBO Cinemas and St John Ambulance of Malaysia collaborated together and collected 2,168 bags of life-saving blood. Under the tagline \"1 Pint Saves 3 Lives\", these donations helped more than 6,000 people.",
    coverImage: "community",
    photoCount: 2,
  },
  {
    id: "blood-donation-2014",
    title: "2014 Blood Donation Drive",
    eventDate: "2014-09-27",
    dateLabel: "27 September 2014",
    location: "MBO Cinemas nationwide",
    tag: "Blood Donation",
    summary:
      "A nationwide blood donation campaign will be held on Sept 27. The joint effort by MBO Cinemas and St John Ambulance Malaysia will be held simultaneously at all 23 MBO Cinema outlets, from noon to 6pm.\n\nMBO marketing and sales director Cheah Chun Wai said they are aiming to attract at least 5,000 blood donors.\n\n\"The drive is aimed at replenishing the supply at the National Blood Bank and blood banks in private and government hospitals nationwide,\" he said at a press conference held at its cinema in Viva Mall, here.\n\nPresent were St John Ambulance Malaysia commander-in-chief Datuk Dr Low Bin Tick, Malaysia Book of Records founder Tan Sri Danny Ooi and National Blood Bank head of the consultant pathology Dr Tun Maizura Mohd Fathullah.\n\nDuring the blood donation campaign, MBO will be giving out free movie passes and goodie bags to donors.\n\nThe event will also be entered into the Malaysia Book of Records as the biggest nationwide blood donation campaign.\n\nMeanwhile, Dr Tun Maizura said last year the blood bank collected about 166,032 bags of blood in Klang Valley and 653,124 bags nationwide.",
    coverImage: "community",
    photoCount: 1,
  },
  {
    id: "air-attendant-2013",
    title: "Air Attendant 2013",
    eventDate: "2013-12-16",
    dateLabel: "16 December 2013",
    location: "Training Center",
    tag: "Training",
    summary: "Specialized first aid training course for airline cabin crew.",
    coverImage: "ambulance",
    photoCount: 1,
  },
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function getPastEventAlbum(id: string) {
  return pastEventAlbums.find((a) => a.id === id);
}

export function getGalleryYears() {
  const years = [...new Set(pastEventAlbums.map((a) => a.eventDate.slice(0, 4)))];
  return years.sort((a, b) => Number(b) - Number(a));
}

export function getGalleryMonthsForYear(year: string) {
  const months = pastEventAlbums
    .filter((a) => a.eventDate.startsWith(year))
    .map((a) => a.eventDate.slice(5, 7));
  return [...new Set(months)].sort((a, b) => Number(b) - Number(a));
}

export function monthLabel(month: string) {
  const index = Number(month) - 1;
  return MONTH_NAMES[index] ?? month;
}

export function filterPastEventAlbums(year: string, month: string) {
  return [...pastEventAlbums]
    .filter((album) => {
      if (year !== "all" && !album.eventDate.startsWith(year)) return false;
      if (month !== "all" && album.eventDate.slice(5, 7) !== month) return false;
      return true;
    })
    .sort((a, b) => b.eventDate.localeCompare(a.eventDate));
}
