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
      title: "24/7 Ambulance Service",
      description: "Professional emergency ambulance service available round the clock for immediate medical assistance.",
      current: 1847,
      target: 2000,
      unit: "calls responded",
      progress: 92,
      icon: "🚑",
    },
    {
      title: "First Aid Training",
      description: "Comprehensive first aid and life-saving training programs certified to international standards.",
      current: 3456,
      target: 5000,
      unit: "members trained",
      progress: 69,
      icon: "🏥",
    },
    {
      title: "Blood Donation Drives",
      description: "Regular blood donation drives to support hospitals and emergency medical services.",
      current: 847,
      target: 1200,
      unit: "units collected",
      progress: 71,
      icon: "💉",
    },
    {
      title: "Youth Cadet Program",
      description: "Cadet programs for youth aged 12-19 focusing on leadership, skills, and community service.",
      current: 425,
      target: 600,
      unit: "cadets enrolled",
      progress: 71,
      icon: "👥",
    },
    {
      title: "Haemodialysis Service",
      description: "Specialized dialysis treatment service for patients requiring regular renal care.",
      current: 156,
      target: 250,
      unit: "patients served",
      progress: 62,
      icon: "💊",
    },
    {
      title: "Community Events Support",
      description: "Medical support and first aid coverage at public and private events throughout Selangor.",
      current: 234,
      target: 300,
      unit: "events covered",
      progress: 78,
      icon: "🎯",
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
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.3em] uppercase bg-gradient-to-r from-primary/15 to-secondary/10 px-4 py-2 rounded-full w-fit border border-primary/20 mb-6">
            Our Services
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter max-w-4xl leading-tight mb-6">
            Comprehensive Health <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Programs</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed font-medium">
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

                {/* Progress Bar Section */}
                <div className="pt-6 border-t border-primary/10">
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

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-background to-secondary/5 border-y border-primary/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Join Our Mission
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you want to volunteer, donate, join training programs, or simply support our mission, there are many ways to get involved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/volunteer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h-4m0 0H6m8 0h4m-8 0v4m0-4V6m0 0H6m8 0h4" />
              </svg>
              Become a Volunteer
            </a>
            <a
              href="/donate"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/80 text-foreground border border-primary/20 rounded-lg hover:border-primary/40 hover:bg-white transition-colors font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Make a Donation
            </a>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-primary/15 p-8 md:p-10">
            <h3 className="text-2xl font-bold text-foreground mb-6">For More Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-sm font-semibold text-primary mb-2">Contact Us</p>
                <p className="text-sm text-muted-foreground">
                  <a href="email:sjamselangor@sjam.org.my" className="hover:text-primary transition-colors">
                    sjamselangor@sjam.org.my
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-primary mb-2">Emergency</p>
                <p className="text-sm text-muted-foreground font-mono">
                  <a href="tel:0333715005" className="hover:text-primary transition-colors">
                    03-3371 5005
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-primary mb-2">Haemodialysis</p>
                <p className="text-sm text-muted-foreground font-mono">
                  <a href="tel:0333735005" className="hover:text-primary transition-colors">
                    03-3373 5005
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
