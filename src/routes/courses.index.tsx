import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, GraduationCap, Mail, Phone } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { getCourseContent, getCourseCoverImage, TRAINING_CONTACT } from "@/lib/course-content";
import { courses } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/courses/")({
  component: CoursesPage,
  head: () => ({
    meta: [
      { title: "First Aid Training — SJAM Selangor" },
      {
        name: "description",
        content:
          "Public first aid training courses in Selangor — Awareness of First Aid, workplace programmes, BLS and CPR+AED.",
      },
    ],
  }),
});

function CoursesPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase inline-flex items-center gap-2">
            <GraduationCap className="size-3.5" />
            First aid training for public
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3">Our courses</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            Accredited first aid and life-support training from awareness sessions to full workplace
            programmes. Select a course to view full details, schedule and registration.
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            <Link to="/events" className="text-primary font-medium hover:underline">
              Activity calendar
            </Link>
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {courses.map((course) => {
            const content = getCourseContent(course.id);
            const coverImage = getCourseCoverImage(course.id);
            return (
              <article
                key={course.id}
                className={cn(
                  "group flex flex-col rounded-2xl border overflow-hidden",
                  "shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300",
                  course.cardTheme,
                )}
              >
                {coverImage ? (
                  <div className="relative overflow-hidden">
                    <img
                      src={coverImage}
                      alt={`${course.code} — ${course.subtitle}`}
                      className="w-full aspect-[16/10] object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
                        {course.level}
                      </p>
                      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                        {course.code}
                      </h2>
                    </div>
                  </div>
                ) : null}

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  {!coverImage ? (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary/80">
                        {course.level}
                      </p>
                      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mt-1">
                        {course.code}
                      </h2>
                    </>
                  ) : null}
                  <p
                    className={cn(
                      "text-base font-medium text-foreground/85 leading-snug",
                      coverImage ? "mt-0 mb-4" : "mt-1 mb-4",
                    )}
                  >
                    {course.subtitle}
                  </p>

                  {content ? (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-5">
                      {content.description[0]}
                    </p>
                  ) : null}

                  <ul className="space-y-2 mb-6 flex-1">
                    {course.highlights.slice(0, 3).map((item) => (
                      <li
                        key={item.text}
                        className="flex items-start gap-2 text-sm text-foreground/90"
                      >
                        <Check className="size-4 shrink-0 mt-0.5 opacity-60" aria-hidden />
                        <span className={cn(item.emphasis && "font-medium text-foreground")}>
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-foreground/10">
                    <span className="text-sm font-semibold text-foreground">
                      {course.fee === 0 ? "Free" : `RM ${course.fee}`}
                    </span>
                    <Button
                      asChild
                      className="rounded-full font-semibold uppercase text-xs tracking-wide gap-1.5"
                    >
                      <Link to="/courses/$courseId" params={{ courseId: course.id }}>
                        Find out more
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8 text-center md:text-left">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Corporate and on-site training
          </h2>
          <p className="text-sm text-muted-foreground mb-5 max-w-xl">
            We can deliver courses at your workplace or arrange group intakes. Contact our training
            unit for schedules and HRDC claimable programmes.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center md:justify-start">
            <a
              href={`tel:${TRAINING_CONTACT.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <Phone className="size-4" />
              {TRAINING_CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${TRAINING_CONTACT.email}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-background text-sm font-semibold hover:border-primary/50 transition-colors"
            >
              <Mail className="size-4" />
              {TRAINING_CONTACT.email}
            </a>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
