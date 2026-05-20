import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";

import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/qualified-trainers")({
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
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const filteredTrainers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    let result = { ...TRAINERS_BY_AREA };

    // Filter by area if selected
    if (selectedArea) {
      const areaData = TRAINERS_BY_AREA[selectedArea as keyof typeof TRAINERS_BY_AREA];
      if (areaData) {
        result = { [selectedArea]: areaData };
      }
    }

    // Filter by name search
    if (query) {
      const filtered: typeof TRAINERS_BY_AREA = {};
      Object.entries(result).forEach(([area, trainers]) => {
        const matchingTrainers = trainers.filter((trainer) =>
          trainer.name.toLowerCase().includes(query)
        );
        if (matchingTrainers.length > 0) {
          filtered[area] = matchingTrainers;
        }
      });
      return filtered;
    }

    return result;
  }, [searchQuery, selectedArea]);

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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.3em] uppercase bg-gradient-to-r from-primary/15 to-secondary/10 px-4 py-2 rounded-full border border-primary/20">
              Find Trainers
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter max-w-4xl leading-tight mb-6">
            First Aid <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Trainers Directory</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed font-medium">
            Connect with our 97+ qualified first aid trainers across SJAM Selangor. Search by name to find trainers in your area and learn about their expertise and certification status.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-primary/8 via-background to-secondary/8 border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 divide-x divide-primary/10">
            <div className="py-6 px-4 text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">97+</div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Qualified Trainers</p>
            </div>
            <div className="py-6 px-4 text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">6</div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Operational Areas</p>
            </div>
            <div className="py-6 px-4 text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Since 2005</div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Program Started</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="bg-white/60 border-b border-primary/10 sticky top-16 z-40 backdrop-blur-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2 relative group">
              <Search className="absolute left-4 top-4 w-6 h-6 text-primary group-focus-within:text-primary/80 transition-colors" />
              <input
                type="text"
                placeholder="Search trainer by full name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 border-2 border-primary/20 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white text-foreground placeholder-muted-foreground transition-all text-base font-medium shadow-sm hover:border-primary/30"
              />
            </div>
            <select
              value={selectedArea || ""}
              onChange={(e) => setSelectedArea(e.target.value || null)}
              className="px-6 py-4 border-2 border-primary/20 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white text-foreground transition-all text-base font-medium shadow-sm hover:border-primary/30"
            >
              <option value="">All Areas</option>
              {Object.keys(TRAINERS_BY_AREA).map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-bold text-primary text-base">{totalTrainers}</span> trainer{totalTrainers !== 1 ? "s" : ""} {selectedArea && <span>from <span className="font-semibold text-primary">{selectedArea}</span></span>} {searchQuery && <span>matching <span className="font-semibold text-primary">"{searchQuery}"</span></span>}
            </p>
            {(searchQuery || selectedArea) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedArea(null);
                }}
                className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Trainers by Area */}
      <section className="py-16 bg-gradient-to-br from-background via-primary/2 to-background">
        <div className="max-w-7xl mx-auto px-6">
          {Object.entries(filteredTrainers).length > 0 ? (
            <div className="space-y-14">
              {Object.entries(filteredTrainers).map(([area, trainers], areaIdx) => (
                <div key={area} className="animate-on-scroll" style={{ animationDelay: `${areaIdx * 100}ms` }}>
                  <div className="mb-6 pb-4 border-b-2 border-gradient-to-r from-primary via-primary/50 to-transparent">
                    <div className="inline-flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold text-sm">
                        {trainers.length}
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-foreground">{area}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{trainers.length} trainer{trainers.length !== 1 ? "s" : ""}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trainers.map((trainer, idx) => {
                      const isActive = trainer.expiry >= new Date().getFullYear();
                      return (
                        <div
                          key={idx}
                          className="group relative overflow-hidden bg-white/70 backdrop-blur-sm border border-primary/15 rounded-xl p-5 hover:border-primary/40 hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                          style={{ animationDelay: `${areaIdx * 100 + idx * 30}ms` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative z-10">
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <p className="text-sm md:text-base font-semibold text-foreground leading-snug flex-1">
                                {trainer.name}
                              </p>
                              <span
                                className={`flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                                  isActive
                                    ? "bg-green-100/80 text-green-700 group-hover:bg-green-200"
                                    : "bg-orange-100/80 text-orange-700 group-hover:bg-orange-200"
                                }`}
                              >
                                {isActive ? "✓ Active" : "Expired"}
                              </span>
                            </div>
                            <div className="pt-3 border-t border-primary/10">
                              <p className="text-xs text-muted-foreground">
                                Certification expires <span className="font-semibold text-foreground">{trainer.expiry}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Search className="w-8 h-8 text-primary/50" />
              </div>
              <p className="text-2xl font-bold text-foreground mb-2">No trainers found</p>
              <p className="text-muted-foreground max-w-md mx-auto">
                The name "{searchQuery}" doesn't match any of our qualified trainers. Try a different name or contact us for assistance.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                Clear search & view all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gradient-to-b from-background to-primary/5 border-t border-primary/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-primary/15 p-8">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">📚</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Our Training Program</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Since 2005, SJAM Selangor has been systematically developing qualified first aid trainers to ensure all areas have access to expert training and certification.
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-primary/15 p-8">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">✓</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Certification Requirements</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trainers must renew their certification every 3 years to maintain their active status. Our comprehensive vetting ensures quality training delivery.
              </p>
            </div>
          </div>
          <div className="mt-8 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 rounded-xl border border-primary/20 p-8 md:p-10">
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                For training inquiries, to book a first aid course, or to learn more about our trainer certification program:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href="mailto:sjamselangor@sjam.org.my" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  Email Us
                </a>
                <a href="tel:+60179694235" className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 text-foreground border border-primary/20 rounded-lg hover:border-primary/40 hover:bg-white transition-colors font-semibold text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
