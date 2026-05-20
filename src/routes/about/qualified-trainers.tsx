import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";

import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/about/qualified-trainers")({
  component: QualifiedTrainersPage,
  head: () => ({
    meta: [
      { title: "Qualified First Aid Trainers — SJAM Selangor" },
      {
        name: "description",
        content:
          "Search and find qualified first aid trainers in SJAM Selangor across all areas.",
      },
    ],
  }),
});

const TRAINERS_BY_AREA = {
  "State Headquarters": [
    { name: "LIM SOH NGEE", expiry: 2020 },
    { name: "NG CHEE KAI", expiry: 2019 },
    { name: "SOH CHIN YONG", expiry: 2019 },
    { name: "TAN SEE TING", expiry: 2019 },
    { name: "LIM CHIN TEIK", expiry: 2019 },
    { name: "TAN YEONG KWAN", expiry: 2018 },
  ],
  "Kawasan Pantai Selangor": [
    { name: "DR. LIEW TIEN SENG", expiry: 2020 },
    { name: "LEONG LI JING", expiry: 2020 },
    { name: "MICHELLE CHEONG YING HOOI", expiry: 2020 },
    { name: "NG CHU HUI", expiry: 2020 },
    { name: "NG CHU JING", expiry: 2020 },
    { name: "CHAN CHEE MUN", expiry: 2020 },
    { name: "NGIAM TSE XUAN", expiry: 2020 },
    { name: "TAN YI NI", expiry: 2020 },
    { name: "THU JING YEE", expiry: 2020 },
    { name: "ONG HONG KAH", expiry: 2020 },
    { name: "FOO FUNG YING", expiry: 2020 },
    { name: "ONG TOON MENG", expiry: 2020 },
    { name: "LIM YONG CHIAN", expiry: 2020 },
    { name: "CHIA KENG RONG", expiry: 2020 },
    { name: "POH CHEE CHONG", expiry: 2019 },
    { name: "KHOO HUI LING", expiry: 2019 },
    { name: "SUM CHUEY SAN", expiry: 2019 },
    { name: "ONG ZHI CHUEN", expiry: 2019 },
    { name: "TAN LING Y'NG", expiry: 2019 },
    { name: "ONG HUI MING", expiry: 2019 },
    { name: "LEE YONG KOOI", expiry: 2019 },
    { name: "POH CHEE KEONG", expiry: 2019 },
    { name: "AARON HO KIAN YI", expiry: 2018 },
    { name: "LEE SEE PEI", expiry: 2018 },
    { name: "LEE WENG HUI", expiry: 2018 },
    { name: "YAP JIAN PENG", expiry: 2018 },
    { name: "CHLOE KONG AN-QI", expiry: 2018 },
    { name: "LIM JIA YEN", expiry: 2018 },
    { name: "MOK CHI ZEN", expiry: 2018 },
    { name: "TEH BOON SHENG", expiry: 2018 },
    { name: "KHAW SHUN SHUN", expiry: 2018 },
    { name: "TEAH JIAN HAU", expiry: 2018 },
  ],
  "Kawasan Selangor Barat": [
    { name: "ANDREW ONG CHIN HEE", expiry: 2020 },
    { name: "CHONG YOONG MIN", expiry: 2020 },
    { name: "HIAP WEI HAO", expiry: 2020 },
    { name: "WANG PICK HOON", expiry: 2020 },
    { name: "TIEW HONG HEOK", expiry: 2019 },
    { name: "MOHAMAD ZAID BIN SAPII", expiry: 2019 },
    { name: "LIM YIH SIAH", expiry: 2018 },
    { name: "OO KEE LIAN", expiry: 2018 },
  ],
  "Kawasan Selangor Selatan": [
    { name: "DR. WONG PUI LING", expiry: 2020 },
    { name: "TAN VINCENT", expiry: 2020 },
    { name: "KONG MING MING", expiry: 2020 },
    { name: "LEE CIN DEE", expiry: 2020 },
    { name: "SEE CHUN KEAT", expiry: 2020 },
    { name: "PANEERSELVAM A/L S VISUVANATHAN", expiry: 2020 },
    { name: "SEE PEI YEE", expiry: 2019 },
    { name: "CHIN LOK CHEE", expiry: 2019 },
    { name: "LAWRANCE SIN YIK FEI", expiry: 2019 },
    { name: "MELVIN LAI ZHIMIN", expiry: 2019 },
    { name: "POON YAU SHIN", expiry: 2018 },
    { name: "EAU YONG EUN", expiry: 2018 },
    { name: "TANG YOON YEE", expiry: 2018 },
    { name: "TANG YOON YEN", expiry: 2018 },
    { name: "CHEN TZE QIAO", expiry: 2018 },
    { name: "GEENA HEW SUET YIN", expiry: 2018 },
    { name: "CHAN MAN KEAT", expiry: 2018 },
    { name: "YONG CHUN KEAT", expiry: 2018 },
  ],
  "Kawasan Selangor Tengah Selatan": [
    { name: "BRYAN LEE MUN KIT", expiry: 2020 },
    { name: "KAM EE LAINE", expiry: 2020 },
    { name: "OOI CHEE SIANG", expiry: 2020 },
    { name: "REGGINA CHONG SYIN TZE", expiry: 2020 },
    { name: "TAN YI QIAN", expiry: 2020 },
    { name: "LIM JU KEONG", expiry: 2020 },
    { name: "CHER THU YUEN", expiry: 2020 },
    { name: "SNG KIM SIA", expiry: 2020 },
    { name: "BRANDON CHAN CHIN WING", expiry: 2020 },
    { name: "CHEAH YAO CHONG", expiry: 2020 },
    { name: "CHANG I SHUEN", expiry: 2020 },
    { name: "ADELINE TAN LIYIING", expiry: 2018 },
    { name: "CHUA SOON HUAT", expiry: 2018 },
    { name: "YEO CHEI JUN KELLY", expiry: 2018 },
    { name: "CHEE WAI YIEN", expiry: 2018 },
    { name: "LOI ELAINE", expiry: 2018 },
    { name: "YEO LIN CHUNG", expiry: 2018 },
    { name: "KIMBERLY LIEW HUI PING", expiry: 2018 },
    { name: "AMANDA LOW HUI MIN", expiry: 2018 },
    { name: "LEE KHAI YING", expiry: 2018 },
    { name: "CHEAH YAO JIANG", expiry: 2018 },
  ],
  "Kawasan Selangor Tengah Utara": [
    { name: "LIM YONG QUAN", expiry: 2020 },
    { name: "FOO WEN YU", expiry: 2020 },
    { name: "ONG GUANG LIANG", expiry: 2020 },
    { name: "TAI KAH MIN", expiry: 2019 },
    { name: "SOO PEI LING", expiry: 2019 },
    { name: "LOW SHUN JUN", expiry: 2019 },
    { name: "YAP NAN JIUN", expiry: 2019 },
    { name: "HOW CHOON HUI", expiry: 2019 },
    { name: "CHIN CHII YONG", expiry: 2019 },
    { name: "TAN ZHENMIN", expiry: 2019 },
    { name: "KOO JIA MIN", expiry: 2019 },
    { name: "SOON CHAI YEAN", expiry: 2019 },
    { name: "CHE WEI SIEN", expiry: 2018 },
    { name: "CHIN YI TING", expiry: 2018 },
    { name: "FOONG HOE YINN", expiry: 2018 },
    { name: "TAN HUI TING", expiry: 2018 },
    { name: "KELLY ONG KAI LEE", expiry: 2018 },
    { name: "TEE CHEE CHONG", expiry: 2018 },
  ],
  "Kawasan Selangor Utara": [
    { name: "R MURUGAN A/L RENGANATHAN", expiry: 2020 },
    { name: "TAN QIAO ER", expiry: 2019 },
  ],
};

function QualifiedTrainersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTrainers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return TRAINERS_BY_AREA;

    const filtered: typeof TRAINERS_BY_AREA = {};
    Object.entries(TRAINERS_BY_AREA).forEach(([area, trainers]) => {
      const matchingTrainers = trainers.filter((trainer) =>
        trainer.name.toLowerCase().includes(query)
      );
      if (matchingTrainers.length > 0) {
        filtered[area] = matchingTrainers;
      }
    });
    return filtered;
  }, [searchQuery]);

  const totalTrainers = Object.values(filteredTrainers).reduce(
    (sum, trainers) => sum + trainers.length,
    0
  );

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/2 to-background border-b border-primary/20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-secondary/15 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.3em] uppercase bg-gradient-to-r from-primary/15 to-secondary/10 px-4 py-2 rounded-full w-fit border border-primary/20 mb-6">
            Qualified Trainers
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter max-w-3xl leading-tight mb-4">
            First Aid Trainers Directory
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Search for qualified first aid trainers across SJAM Selangor. Our 97+ trainers are strategically located across all areas to provide training and certification.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white/50 border-b border-primary/10 sticky top-16 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by trainer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-primary/20 rounded-lg focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 bg-white text-foreground placeholder-muted-foreground transition-colors"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Found <span className="font-semibold text-primary">{totalTrainers}</span> trainer{totalTrainers !== 1 ? "s" : ""} {searchQuery && `matching "${searchQuery}"`}
          </p>
        </div>
      </section>

      {/* Trainers by Area */}
      <section className="py-12 bg-gradient-to-br from-background via-primary/2 to-background">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          {Object.entries(filteredTrainers).length > 0 ? (
            Object.entries(filteredTrainers).map(([area, trainers]) => (
              <div key={area} className="animate-on-scroll">
                <div className="inline-flex items-center gap-2 text-primary font-bold text-xs tracking-widest uppercase mb-4 pb-3 border-b-2 border-primary/30">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {area}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {trainers.map((trainer, idx) => (
                    <div
                      key={idx}
                      className="bg-white/60 border border-primary/15 rounded-lg p-4 hover:border-primary/40 hover:bg-white/80 transition-all hover:shadow-md"
                    >
                      <p className="text-sm font-semibold text-foreground leading-tight">
                        {trainer.name}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">
                          Expiry: <span className="font-medium text-foreground">{trainer.expiry}</span>
                        </span>
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded-full ${
                            trainer.expiry >= new Date().getFullYear()
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {trainer.expiry >= new Date().getFullYear()
                            ? "Active"
                            : "Expired"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-lg font-semibold text-foreground mb-2">
                No trainers found
              </p>
              <p className="text-muted-foreground">
                Try searching with a different name or contact State Headquarters for more information.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-t border-primary/10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white/60 rounded-lg border border-primary/15 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">About Our Trainers Program</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                SJAM Selangor has been developing qualified first aid trainers since 2005, ensuring that all areas have access to expert training.
              </p>
              <p>
                Trainers must renew their certification every 3 years to maintain their status. Our current roster includes 97+ qualified trainers across all operational areas.
              </p>
              <p>
                For training inquiries or to book a first aid course, contact your nearest area office or email <span className="font-semibold text-primary">sjamselangor@sjam.org.my</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
