import { createFileRoute, Link } from "@tanstack/react-router";
import { Ambulance, ArrowLeft, Phone } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/ambulance-24hr")({
  component: Ambulance24HrPage,
  head: () => ({
    meta: [
      { title: "24 Hr Ambulance — SJAM Selangor" },
      {
        name: "description",
        content:
          "Overview of SJAM Selangor 24-hour ambulance service, fleet distribution by area, hotline, and operational updates.",
      },
    ],
  }),
});

const areaFleet = [
  {
    area: "Selangor Coastal Area (KPS)",
    subtitle: "Kawasan Pantai Selangor",
    details: [
      "32 ambulances (4 BCM Foton, 2 M/Benz 315D Bariatric, 1 Nissan FPWGE50 4x4, 25 Toyota Hiace Window Van)",
      "7 staff cars (Toyota Unser, Nissan C22, Renault Kangoo, Proton Saga x2, Proton Exora, Perodua Myvi)",
      "4 first responder units (Mofaz Scooter x2, Modenas Scooter x2)",
      "2 minibuses (Ford Transit x1, M/Benz 313 Sprinter x1)",
      "2 box vans (HINO 5 Ton Lorry x1, Inokom Box Van x1)",
      "1 pickup (Era Star), 1 mobile clinic (Ford Transit 350L)",
    ],
  },
  {
    area: "Selangor Northern Area (KSU)",
    subtitle: "Kawasan Selangor Utara",
    details: ["04 ambulances (Toyota Hiace)"],
  },
  {
    area: "Selangor Southern Area (KSS)",
    subtitle: "Kawasan Selangor Selatan",
    details: [
      "08 ambulances (Toyota Hiace x6, Ford Transit short base x1, WestStar x1)",
      "01 transport (Nissan C-20)",
      "04 supporting vehicles (Nissan Grand Livina x1, Perodua Axia x1, WestStar x2)",
      "01 scooter as first responder (Modenas Elegan)",
    ],
  },
  {
    area: "Selangor Western Area (KSB)",
    subtitle: "Kawasan Selangor Barat",
    details: ["02 ambulances (Toyota Hiace)", "02 transport vehicles (Toyota Hiace and Nissan C-22)"],
  },
  {
    area: "Shah Alam Area (KSA)",
    subtitle: "Kawasan Shah Alam",
    details: ["Yet to activate"],
  },
  {
    area: "Selangor Northern Central Area (KSTU)",
    subtitle: "Kawasan Selangor Tengah Utara",
    details: ["06 ambulances (Toyota Hiace x4, Nissan C-22 x2)", "01 scooter as first responder (Modenas Elegan)"],
  },
  {
    area: "Selangor Southern Central Area (KSTS)",
    subtitle: "Kawasan Selangor Tengah Selatan",
    details: ["02 ambulances (Toyota Hiace)", "01 transport (Toyota Hiace)"],
  },
  {
    area: "Selangor Western Central Area (KSTB)",
    subtitle: "Kawasan Selangor Tengah Barat",
    details: ["Yet to activate"],
  },
];

function Ambulance24HrPage() {
  const renderFleetLine = (line: string) => {
    const match = line.match(/^(\d+)\s+(.*)$/);
    if (!match) return line;

    return (
      <>
        <strong className="font-semibold text-foreground">{match[1]}</strong> {match[2]}
      </>
    );
  };

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background border-b border-primary/15">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-44 -left-44 w-[26rem] h-[26rem] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-44 -right-44 w-[26rem] h-[26rem] bg-gradient-to-tl from-secondary/15 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors mb-4"
          >
            <ArrowLeft className="size-4" />
            Back to Programs
          </Link>
          <div className="rounded-2xl border border-primary/20 bg-card/80 backdrop-blur-sm p-5 sm:p-7">
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-[11px] tracking-[0.25em] uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-4">
              24 Hr Ambulance
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-[2.8rem] font-semibold tracking-tight leading-tight mb-3">
              Statewide Emergency Ambulance Service
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
              Presently, through Areas, State HQ now has the following vehicles and operating units
              supporting community emergency response.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mt-6">
              <div className="rounded-xl border border-border/80 bg-muted/30 px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Hotline</p>
                <a
                  href="tel:0333715005"
                  className="inline-flex items-center gap-2 text-primary font-semibold mt-1 hover:underline"
                >
                  <Phone className="size-4" />
                  03-3371 5005
                </a>
              </div>
              <div className="rounded-xl border border-border/80 bg-muted/30 px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Started</p>
                <p className="text-foreground font-semibold mt-1">Since 1990</p>
              </div>
              <div className="rounded-xl border border-border/80 bg-muted/30 px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Coverage</p>
                <p className="text-foreground font-semibold mt-1">All Selangor Areas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-muted/20 border-b border-border/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          <article className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Fleet Identity (911 Registration)</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              KPS fleet has used plate number 911 since its first well-equipped ambulance in 1990 for
              identification and team motivation. Since 2005, the 911 plate implementation expanded
              statewide, and today nearly 96% of over 40 ambulances and supporting vehicles are
              registered with 911.
            </p>
          </article>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
            {areaFleet.map((item) => (
              <article
                key={item.area}
                className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 h-full"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground">{item.area}</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1 mb-3">
                  {item.subtitle}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  {item.details.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{renderFleetLine(line)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <article className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] via-card to-secondary/[0.04] p-5 sm:p-6 md:p-7">
            <h2 className="text-xl font-semibold mb-4 inline-flex items-center gap-2">
              <Ambulance className="size-5 text-primary" />
              Operational Notes
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                KPS has run its 24-hour Emergency Ambulance Service since 1990 with more than 30
                full-time staff.
              </p>
              <p>
                A fee is charged on each call depending on location, while free service is provided
                for MVA cases (motor vehicle accidents).
              </p>
              <p>
                State HQ launched statewide Ambulance Service in February 2009 with all Areas
                participating, with the call centre based in KPS due to facility and wireless
                communication availability across ambulances and Area HQs.
              </p>
              <p>
                Since 01.04.2003, KPS has been contracted to Hospital Tengku Ampuan Rahimah Klang
                with 2 ambulances on 24-hour duty for emergency call response.
              </p>
              <p>
                Since November 2009, KPS has also been contracted to the Pahang-Selangor Raw Water
                Transfer Project (Shimizu-Nishimatsu-UEMB-IJM JV) for 5 years, with 2 ambulances on
                24-hour duty stationed at Hulu Langat, Selangor and Karak, Pahang.
              </p>
              <p className="font-semibold text-foreground">24 hr hotline: 03-3371 5005</p>
            </div>
          </article>
        </div>
      </section>
    </SiteLayout>
  );
}
