import { createFileRoute } from "@tanstack/react-router";

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
  const programs = [
    {
      title: "Ophthalmic Care Unit (OCU)",
      description: "Free eye screening and prescription glasses distribution program supporting vulnerable communities. Our 45th deployment successfully screened 31 individuals with 16 receiving free glasses.",
      current: 45,
      target: 60,
      unit: "deployments completed",
      progress: 75,
      icon: "👁️",
      highlight: "16 people received free prescription glasses in latest deployment"
    },
  ];

  return (
    <SiteLayout>
      {/* Hero Section */}
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
            Comprehensive Health <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Programs</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            SJAM Selangor offers a wide range of programs and services dedicated to serving the community with excellence, professionalism, and compassion.
          </p>
        </div>
      </section>

      {/* Programs with Progress Bars */}
      <section className="py-20 bg-gradient-to-br from-background via-primary/2 to-background">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          {programs.map((program, idx) => (
            <div
              key={idx}
              className="animate-on-scroll"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="bg-white/70 backdrop-blur-sm border border-primary/15 rounded-2xl p-8 hover:border-primary/40 hover:bg-white/90 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-5xl">{program.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {program.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {program.description}
                    </p>
                  </div>
                </div>

                {/* Highlight if exists */}
                {program.highlight && (
                  <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-sm font-semibold text-primary">{program.highlight}</p>
                  </div>
                )}

                {/* Progress Bar Section */}
                <div className={`${program.highlight ? '' : 'pt-6'} border-t border-primary/10`}>
                  <div className="flex items-baseline justify-between gap-4 mb-4">
                    <div>
                      <span className="text-3xl md:text-4xl font-bold text-foreground">
                        {program.current.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground ml-2">of</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl md:text-3xl font-bold text-foreground">
                        {program.target.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {program.unit}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                      style={{ width: `${program.progress}%` }}
                    />
                  </div>

                  {/* Progress Text */}
                  <div className="text-right">
                    <span className="text-sm font-semibold text-primary">
                      {program.progress}% achieved
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
