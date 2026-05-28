import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Ambulance, ArrowRight, GraduationCap, HeartPulse } from "lucide-react";

import { MobileClinicSection } from "@/components/mobile-clinic-section";
import { OcuSection } from "@/components/ocu-section";
import { SiteLayout } from "@/components/site-layout";
import ambulanceImg from "../assets/AmbuHandover-1.jpg";
import firstaidImg from "../assets/first_aid1.jpg";
import courseImg from "../assets/course.jpg";
import haemodialysisImg from "../assets/haemodialysis.jpg";

export const Route = createFileRoute("/programs")({
  component: ProgramsPage,
  head: () => ({
    meta: [
      { title: "Programs — SJAM Selangor" },
      {
        name: "description",
        content:
          "Discover SJAM Selangor's comprehensive programs including first aid training, ambulance services, blood donation, and community health initiatives.",
      },
    ],
  }),
});

const serviceHighlights = [
  {
    icon: Ambulance,
    title: "24 Hr Ambulance",
    subtitle: "Emergency response and hospital transfers",
    image: ambulanceImg,
    cta: "View Program",
    to: "/ambulance-24hr",
    featured: true,
  },
  {
    icon: HeartPulse,
    title: "Public Duty StandBy",
    subtitle: "Our major public service since establishment",
    details:
      "Members are stationed at sports events, social gatherings, and parades to provide first aid anytime, anywhere. For inquiries, fax 03-3372 4898 or email admin@sjamsde.org.my. Please include a simple requisition letter on company letterhead, attention to Ms Lim Lay Yin.",
    image: firstaidImg,
    cta: "Contact",
    phoneHref: "tel:0333715005",
    phoneLabel: "03-3371 5005",
    emailHref: "mailto:admin@sjamsde.org.my",
    emailLabel: "admin@sjamsde.org.my",
    featured: false,
  },
  {
    icon: Activity,
    title: "Haemodialysis Service",
    subtitle: "Community dialysis support",
    image: haemodialysisImg,
    cta: "View Program",
    to: "/haemodialysis-service",
    featured: false,
  },
  {
    icon: GraduationCap,
    title: "Public First Aid Classes",
    subtitle: "Training for individuals and teams",
    image: courseImg,
    cta: "View Program",
    to: "/courses",
    featured: false,
  },
] as const;

function ProgramsPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/2 to-background border-b border-primary/20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-secondary/15 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.3em] uppercase bg-gradient-to-r from-primary/15 to-secondary/10 px-4 py-2 rounded-full w-fit border border-primary/20 mb-4">
            What we do now
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter max-w-3xl leading-tight mb-4">
            Comprehensive Health{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Programs
            </span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            SJAM Selangor offers a wide range of programs and services dedicated to serving the
            community with excellence, professionalism, and compassion.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-muted/20 border-b border-border/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2">
              Service Directory
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              Explore our most requested healthcare services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {serviceHighlights.map((service) => (
              <article
                key={service.title}
                className={`rounded-2xl border bg-card p-4 md:p-5 flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                  service.featured
                    ? "border-primary/35 ring-1 ring-primary/20 bg-gradient-to-br from-primary/[0.07] via-card to-secondary/[0.05]"
                    : "border-border/80 hover:border-primary/30"
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full aspect-[4/3] object-cover rounded-xl mb-4 border border-border/70"
                  loading="lazy"
                />
                <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground grid place-items-center mb-4">
                  <service.icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold leading-snug text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{service.subtitle}</p>
                {"details" in service && (
                  <p className="text-xs text-muted-foreground/90 mt-2 mb-5 leading-relaxed">
                    {service.details}
                  </p>
                )}
                {"phoneHref" in service && "emailHref" in service ? (
                  <div className="mt-auto pt-1">
                    <p className="text-sm font-semibold text-primary mb-2">{service.cta}</p>
                    <div className="flex flex-col gap-1.5 text-sm">
                      <a href={service.phoneHref} className="text-primary hover:underline">
                        {service.phoneLabel}
                      </a>
                      <a
                        href={service.emailHref}
                        className="text-primary hover:underline break-all"
                      >
                        {service.emailLabel}
                      </a>
                    </div>
                  </div>
                ) : "to" in service ? (
                  <Link
                    to={service.to}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    {service.cta}
                    <ArrowRight className="size-4 shrink-0" />
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-background via-primary/2 to-background">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <OcuSection />
          <div id="mobile-clinic" className="scroll-mt-28">
            <MobileClinicSection />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
