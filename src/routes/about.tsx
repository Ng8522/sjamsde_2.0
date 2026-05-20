import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  HeartHandshake,
  ChevronDown,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { useState } from "react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import {
  ABOUT_HERO,
  ABOUT_INTRO,
  ABOUT_STATS,
} from "@/lib/about-content";
import communityImg from "../assets/community.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — SJAM Selangor" },
      {
        name: "description",
        content:
          "Learn about St John Ambulans Malaysia Selangor — 24-hour ambulance services, blood donation drives and community medical programmes.",
      },
    ],
  }),
});

function AboutPage() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    timeline: true,
    organisation: false,
    iso: false,
    awards: false,
    membership: false,
    contact: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/2 to-background border-b border-primary/20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-secondary/15 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.3em] uppercase bg-gradient-to-r from-primary/15 to-secondary/10 px-4 py-2 rounded-full w-fit border border-primary/20 mb-6">{ABOUT_HERO.eyebrow}</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter max-w-4xl leading-tight mb-8">{ABOUT_HERO.title}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-6 font-medium">{ABOUT_HERO.subtitle}</p>
          <p className="text-base font-semibold text-primary tracking-wide uppercase">{ABOUT_HERO.motto}</p>
        </div>
      </section>

      <section className="border-b border-primary/20 bg-gradient-to-r from-primary/8 via-background to-secondary/8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-primary/15">
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label} className="py-12 px-4 md:px-6 text-center md:text-left group hover:bg-primary/5 transition-colors cursor-default">
              <div className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tabular-nums group-hover:scale-110 transition-transform origin-left">{stat.value}</div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-3 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 right-0 w-96 h-96 bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[minmax(0,420px)_1fr] gap-6 lg:gap-20 items-start">
          <div className="group">
            <img
              src={communityImg}
              alt="SJAM Selangor volunteers serving the community"
              className="w-full aspect-[4/3] object-cover rounded-3xl ring-4 ring-primary/20 shadow-2xl shadow-primary/30 group-hover:shadow-primary/50 group-hover:ring-primary/40 transition-all"
            />
          </div>
          <div>
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.3em] uppercase bg-gradient-to-r from-primary/15 to-secondary/10 px-4 py-2 rounded-full w-fit border border-primary/20 mb-6">Who we are</span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-8 leading-tight">Serving with <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">heart</span></h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              {ABOUT_INTRO.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-base font-medium">{paragraph}</p>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <Button asChild>
                <Link to="/volunteer">
                  <HeartHandshake className="size-5" />
                  Join as volunteer
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/donate">
                  <ArrowRight className="size-5" />
                  Support our work
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Additional About Sections */}
      <section className="py-16 bg-gradient-to-br from-background via-primary/2 to-background relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 right-0 w-96 h-96 bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-32 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-4">
          {/* Accordion Sections */}
          {[
            {
              id: "timeline",
              title: "History & Milestones",
              badge: "Our Journey",
              content: (
                <div className="space-y-6">
                  {[
                    { year: "1972", title: "New Era Begins", desc: "As a result of the St. John Ambulance (Incorporation) Act, St. John Council were formed in every state. This movement marks the new beginning of the organisation as St. John Ambulance enters a new era." },
                    { year: "1990", title: "SJAM-SDE Established", desc: "SJAM – SDE was officially segregated from SJAM Wilayah Persekutuan. Dr. Chen Soo-See was appointed as the first State Commander, serving with dedication until 1998." },
                    { year: "1998", title: "Leadership Transition", desc: "Mr Ho Thiam Hock was appointed as State Commander after being transferred from National Headquarters. Under his command and along with Mr Yeo Kim Thong as Deputy State Commander, SJAM – SDE saw significant changes in administration and re-demarcation of Areas." },
                    { year: "2004", title: "Era of Growth", desc: "Mr Yeo Kim Thong was appointed as State Commander. Under his visionary leadership, more projects and changes were implemented to improve and benefit the Area HQs, officers and members." },
                    { year: "2009", title: "National Recognition", desc: "On 12th December, State Commander Mr Yeo Kim Thong (Burnard) was awarded the Darjah Kebesaran Dato'-Sultan Sharafuddin Idris Shah (D.S.I.S) by HRH Sultan of Selangor. The award carries the title Dato' in recognition of his tremendous contribution and leadership." },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 animate-on-scroll" style={{ animationDelay: `${idx * 50}ms` }}>
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-sm font-semibold text-primary">{item.year}</div>
                        <div className="w-1 h-12 bg-gradient-to-b from-primary/60 to-primary/20 rounded-full" />
                      </div>
                      <div className="pb-2 flex-1 pt-1">
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              id: "organisation",
              title: "Organisation Structure",
              badge: "Leadership",
              content: (
                <div className="space-y-8">
                  {/* Tier 1: Executive Leadership */}
                  <div>
                    <div className="inline-flex items-center gap-2 text-primary font-bold text-xs tracking-widest uppercase mb-4 pb-2 border-b-2 border-primary/30">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      Executive Leadership
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="group rounded-xl overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg bg-gradient-to-br from-white to-primary/5">
                        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 h-48">
                          <img src="https://sde.sjamsde.org.my/wp-content/uploads/2022/12/TeeBoonKee-300x300.gif" alt="State President" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-5">
                          <p className="text-xs uppercase tracking-widest font-bold text-primary mb-1">State President</p>
                          <p className="text-base font-semibold text-foreground leading-tight">Tan Sri Dato' Sri Tee Boon Kee</p>
                          <p className="text-xs text-muted-foreground mt-2">PSM, SSAP, DSSA, OStJ</p>
                        </div>
                      </div>
                      <div className="group rounded-xl overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg bg-gradient-to-br from-white to-primary/5">
                        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 h-48">
                          <img src="https://sde.sjamsde.org.my/wp-content/uploads/2024/05/Lim_Wun_Lok.png" alt="State Commander" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-5">
                          <p className="text-xs uppercase tracking-widest font-bold text-primary mb-1">State Commander</p>
                          <p className="text-base font-semibold text-foreground leading-tight">Mr. Lim Wun Lok</p>
                          <p className="text-xs text-muted-foreground mt-2">SIS, PJK, OStJ</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tier 2: Senior Management */}
                  <div>
                    <div className="inline-flex items-center gap-2 text-primary font-bold text-xs tracking-widest uppercase mb-4 pb-2 border-b-2 border-primary/30">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      Senior Management
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="group rounded-xl overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg bg-gradient-to-br from-white to-primary/5">
                        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 h-48">
                          <img src="https://sde.sjamsde.org.my/wp-content/uploads/2022/12/IMG_6427.JPEG-scaled.jpg" alt="Deputy State President" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-5">
                          <p className="text-xs uppercase tracking-widest font-bold text-primary mb-1">Deputy State President</p>
                          <p className="text-base font-semibold text-foreground leading-tight">(Dr.) Lim Tee Leong</p>
                          <p className="text-xs text-muted-foreground mt-2">PJK, SBStJ, DHL(Hons)</p>
                        </div>
                      </div>
                      <div className="group rounded-xl overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg bg-gradient-to-br from-white to-primary/5">
                        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 h-48">
                          <img src="https://sde.sjamsde.org.my/wp-content/uploads/2024/05/Sim_Kah_Heun-277x300.png" alt="Deputy State Commander" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-5">
                          <p className="text-xs uppercase tracking-widest font-bold text-primary mb-1">Deputy State Commander</p>
                          <p className="text-base font-semibold text-foreground leading-tight">Mr. Sim Kah Heun</p>
                          <p className="text-xs text-muted-foreground mt-2">AMP, OStJ, FBDO</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tier 3: Key Officers Grid */}
                  <div>
                    <div className="inline-flex items-center gap-2 text-primary font-bold text-xs tracking-widest uppercase mb-4 pb-2 border-b-2 border-primary/30">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      Key Officers
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        { name: "Dr Wong Hui Chin", role: "State Medical Officer", cred: "SSStJ", img: "https://sde.sjamsde.org.my/wp-content/uploads/2022/12/WongHuiChin-300x300.jpg" },
                        { name: "Mr. Ng Chee Kai", role: "State Superintendent (Operations)", cred: "PPT, OStJ, FNSM", img: "https://sde.sjamsde.org.my/wp-content/uploads/2024/05/Ng-Chee-Kai-1-200x300.jpg" },
                        { name: "Ms. Ng Sew Wan", role: "State Superintendent (Nursing)", cred: "PJK, SSStJ", img: "https://sde.sjamsde.org.my/wp-content/uploads/2024/05/Ng-Sew-Wan-225x300.jpg" },
                        { name: "Ms. Che Wei Sien", role: "State Honorary Secretary", cred: "—", img: "https://sde.sjamsde.org.my/wp-content/uploads/2024/05/Che-Wei-Sien-199x300.jpeg" },
                        { name: "Mr. Chang Hian Keon", role: "State Honorary Treasurer", cred: "—", img: "https://sde.sjamsde.org.my/wp-content/uploads/2024/05/Michael-Chang-Hian-Keong.png" },
                        { name: "Ms. Farah Abdul Wahab", role: "State Nursing Officer", cred: "—", img: "https://sde.sjamsde.org.my/wp-content/uploads/2024/05/Farah-200x300.jpg" },
                      ].map((officer, idx) => (
                        <div key={idx} className="group rounded-lg overflow-hidden border border-primary/15 hover:border-primary/40 transition-all hover:shadow-md bg-white/40 hover:bg-white/60">
                          <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 h-32">
                            <img src={officer.img} alt={officer.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          <div className="p-3">
                            <p className="text-xs uppercase tracking-wider font-bold text-primary mb-0.5">{officer.role}</p>
                            <p className="text-sm font-semibold text-foreground leading-tight">{officer.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{officer.cred}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/10">
                    <p className="text-xs text-muted-foreground leading-relaxed">This organization structure showcases the core leadership team. For the complete hierarchy including all area commanders and additional officers, visit our website or contact State Headquarters at <span className="font-semibold text-primary">sjamselangor@sjam.org.my</span></p>
                  </div>
                </div>
              ),
            },
            {
              id: "iso",
              title: "ISO 9001 Certification",
              badge: "Quality Standards",
              content: (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/10">
                    <h4 className="font-semibold text-foreground mb-2">Kawasan Pantai Selangor (KPS)</h4>
                    <p className="text-xs text-muted-foreground mb-2">Achieved ISO 9001:2000 in 2000, upgraded to 2008 in 2010. Received SJAM Color in 2001 from HRH Sultan of Selangor.</p>
                    <p className="text-xs font-medium text-primary">Coverage: Administration, Ambulance Service, Haemodialysis Service</p>
                  </div>
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/10">
                    <h4 className="font-semibold text-foreground mb-2">State HQ</h4>
                    <p className="text-xs text-muted-foreground mb-2">Achieved ISO 9001:2008 in 2009.</p>
                    <p className="text-xs font-medium text-primary">Coverage: Administration support, Advance First-aid, Train-the-Trainers, Officers Training</p>
                  </div>
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/10">
                    <h4 className="font-semibold text-foreground mb-2">Other Areas</h4>
                    <p className="text-xs text-muted-foreground">KSS and KSTU achieved ISO in 2011 and received their Color in Jan 2012 from Lord Prior – Prof. Anthony R. Mellows.</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <a href="https://sde.sjamsde.org.my/about_us/iso9001/" target="_blank" rel="noopener noreferrer" className="group">
                      <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-primary/20 hover:border-primary/40 p-3 flex items-center justify-center transition-all hover:shadow-md">
                        <img src="https://sde.sjamsde.org.my/wp-content/uploads/2022/12/SJAM-2021-2024-ISO-Cert1.jpg" alt="ISO Certificate 2021-2024" className="w-full h-full object-cover rounded" />
                      </div>
                    </a>
                    <a href="https://sde.sjamsde.org.my/about_us/iso9001/" target="_blank" rel="noopener noreferrer" className="group">
                      <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-primary/20 hover:border-primary/40 p-3 flex items-center justify-center transition-all hover:shadow-md">
                        <img src="https://sde.sjamsde.org.my/wp-content/uploads/2022/12/SJAM-2018-2021-ISO-Cert1-scaled.jpg" alt="ISO Certificate 2018-2021" className="w-full h-full object-cover rounded" />
                      </div>
                    </a>
                    <a href="https://sde.sjamsde.org.my/about_us/iso9001/" target="_blank" rel="noopener noreferrer" className="group">
                      <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-primary/20 hover:border-primary/40 p-3 flex items-center justify-center transition-all hover:shadow-md">
                        <img src="https://sde.sjamsde.org.my/wp-content/uploads/2022/12/SJAM-KPS-2011-2014-ISO-Cert1.jpg" alt="ISO Certificate KPS" className="w-full h-full object-cover rounded" />
                      </div>
                    </a>
                  </div>
                </div>
              ),
            },
            {
              id: "awards",
              title: "Awards & Honours",
              badge: "Recognition",
              content: (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/10">
                    <h4 className="font-semibold text-foreground mb-3">2019 BIZZ AMEA Award</h4>
                    <p className="text-xs text-muted-foreground mb-3">International recognition for excellence and innovation in service delivery.</p>
                    <iframe width="100%" height="280" src="https://www.youtube.com/embed/lHuCHbQVCLU" title="2019 BIZZ AMEA Award" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="rounded-lg border border-primary/20"></iframe>
                  </div>
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/10">
                    <h4 className="font-semibold text-foreground mb-2">2018 EURO Award</h4>
                    <p className="text-xs text-muted-foreground mb-3">Prestigious international award recognizing outstanding contribution to community service.</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <a href="https://sde.sjamsde.org.my/about_us/2018-euro-award/" target="_blank" rel="noopener noreferrer">
                        <img src="https://sde.sjamsde.org.my/wp-content/uploads/2023/01/GpersonMainPg-214x300.jpg" alt="EURO Award recipient" className="w-full rounded border border-primary/20 hover:border-primary/40 transition-colors" />
                      </a>
                      <a href="https://sde.sjamsde.org.my/about_us/2018-euro-award/" target="_blank" rel="noopener noreferrer">
                        <img src="https://sde.sjamsde.org.my/wp-content/uploads/2023/01/GpersonPg23-207x300.jpg" alt="EURO Award recipient" className="w-full rounded border border-primary/20 hover:border-primary/40 transition-colors" />
                      </a>
                      <a href="https://sde.sjamsde.org.my/about_us/2018-euro-award/" target="_blank" rel="noopener noreferrer">
                        <img src="https://sde.sjamsde.org.my/wp-content/uploads/2023/01/GpersonPg25-210x300.jpg" alt="EURO Award recipient" className="w-full rounded border border-primary/20 hover:border-primary/40 transition-colors" />
                      </a>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/10">
                    <h4 className="font-semibold text-foreground mb-2">Meritorious Bars (1994)</h4>
                    <p className="text-xs text-muted-foreground">Awarded by The Order of St. John, England for exceptional bravery during the Port Klang Disaster (1980). 19 officers and members were recognized for their dedication and commitment.</p>
                  </div>
                </div>
              ),
            },
            {
              id: "membership",
              title: "Membership & Involvement",
              badge: "Be Part of Us",
              content: (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">SJAM-SDE is one of the most active voluntary and youth organizations in Selangor, with over 4,400 members carrying out first aid and home nursing duties at public and private events.</p>
                    <h4 className="font-semibold text-foreground mb-3">Member Benefits</h4>
                    <div className="space-y-2">
                      <div className="flex gap-3">
                        <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-foreground">Insurance Coverage</p>
                          <p className="text-xs text-muted-foreground">RM 100,000 upon death/permanent disability, RM 10,000 medical coverage</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-foreground">International Training Standards</p>
                          <p className="text-xs text-muted-foreground">ISO 9001:2008 certified training in First Aid and Life Saving techniques</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-foreground">Youth Development</p>
                          <p className="text-xs text-muted-foreground">Cadets (12-19) access to badges, leadership and skills training</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "contact",
              title: "Contact & Area Offices",
              badge: "Get In Touch",
              content: (
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-lg p-4 border border-primary/10">
                    <div className="flex gap-3 mb-3">
                      <Mail className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-foreground">Email</p>
                        <p className="text-xs text-muted-foreground">sjamselangor@sjam.org.my</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mb-3">
                      <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-foreground">Mobile</p>
                        <p className="text-xs text-muted-foreground">+60 17-969 4235 / +60 17-471 1966 / +60 12-416 4934</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-foreground">Address</p>
                        <p className="text-xs text-muted-foreground">No. 10-A, Lorong Bayu Tinggi 4C, Taman Bayu Tinggi, 41200 Klang, Selangor</p>
                      </div>
                    </div>
                  </div>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.7487234018844!2d101.42653!3d3.02850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc48c0b4b4b4b5%3A0x3b4b4b4b4b4b4b4b!2sSt%20John%20Ambulans%20Malaysia%20Selangor!5e0!3m2!1sen!2smy!4v1234567890" width="100%" height="250" style={{border: 0, borderRadius: '0.5rem'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="border border-primary/10 rounded-lg"></iframe>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground mb-2">Area Offices (6 Active Areas)</h4>
                    <p className="text-xs text-muted-foreground">State headquarters coordinates six operational areas across Selangor: Coastal, North Central, South Central, Southern, Northern, and Western Selangor.</p>
                  </div>
                </div>
              ),
            },
          ].map((section) => (
            <div
              key={section.id}
              className="border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/40 transition-colors bg-white/30 backdrop-blur-sm"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 text-left">
                  <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.3em] uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    {section.badge}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                    expandedSections[section.id] ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedSections[section.id] && (
                <div className="px-5 pb-5 border-t border-primary/10 pt-5 text-muted-foreground">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </SiteLayout>
  );
}
