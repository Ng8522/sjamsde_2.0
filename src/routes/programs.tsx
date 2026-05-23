import { createFileRoute } from "@tanstack/react-router";

import { MobileClinicSection } from "@/components/mobile-clinic-section";
import { OcuSection } from "@/components/ocu-section";
import { SiteLayout } from "@/components/site-layout";

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

      <section className="py-20 bg-gradient-to-br from-background via-primary/2 to-background">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <OcuSection />
          <MobileClinicSection />
        </div>
      </section>
    </SiteLayout>
  );
}
