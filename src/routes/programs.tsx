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
      features: ["Emergency response", "Patient transportation", "Basic & advanced life support"],
      icon: "🚑",
    },
    {
      title: "First Aid Training",
      description: "Comprehensive first aid and life-saving training programs certified to international standards.",
      features: ["Basic First Aid", "Advanced certification", "Cadet training programs"],
      icon: "🏥",
    },
    {
      title: "Blood Donation",
      description: "Regular blood donation drives to support hospitals and emergency medical services.",
      features: ["Blood collection drives", "Health screening", "Community participation"],
      icon: "💉",
    },
    {
      title: "Youth Development",
      description: "Cadet programs for youth aged 12-19 focusing on leadership, skills, and community service.",
      features: ["Cadet training", "Proficiency badges", "Leadership development"],
      icon: "👥",
    },
    {
      title: "Haemodialysis Service",
      description: "Specialized dialysis treatment service for patients requiring regular renal care.",
      features: ["Dialysis treatment", "Patient care", "Medical supervision"],
      icon: "💊",
    },
    {
      title: "Community Events",
      description: "Medical support and first aid coverage at public and private events throughout Selangor.",
      features: ["Event coverage", "First aid standby", "Emergency response"],
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

      {/* Programs Grid */}
      <section className="py-20 bg-gradient-to-br from-background via-primary/2 to-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, idx) => (
              <div
                key={idx}
                className="group bg-white/70 backdrop-blur-sm border border-primary/15 rounded-xl p-8 hover:border-primary/40 hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-on-scroll"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                <div className="relative z-10">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 origin-left">
                    {program.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">
                    {program.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    {program.description}
                  </p>
                  <div className="space-y-2 pt-4 border-t border-primary/10">
                    {program.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-start gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
