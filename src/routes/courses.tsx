import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, GraduationCap, X } from "lucide-react";

import { MockSuccess, SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { courses, getCourseById, type Course } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/courses")({
  component: CoursesPage,
  head: () => ({
    meta: [{ title: "Courses — SJAM Selangor" }],
  }),
});

function formatSessionDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-MY", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ProgrammeCard({ course, onFindOutMore }: { course: Course; onFindOutMore: (course: Course) => void }) {
  return (
    <article
      className={cn(
        "group relative flex flex-col items-center text-center rounded-2xl border p-8 md:p-10 min-h-[340px]",
        "shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300",
        course.cardTheme,
      )}
    >
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">{course.code}</h2>
      <p className="text-base md:text-lg font-medium text-foreground/85 mt-2 mb-8 max-w-[28ch] leading-snug">
        {course.subtitle}
      </p>

      <ul className="space-y-2.5 mb-10 flex-1 w-full max-w-xs">
        {course.highlights.map((item) => (
          <li key={item.text} className="flex items-start justify-center gap-2 text-sm md:text-[15px] text-foreground/90">
            <Check className="size-4 shrink-0 mt-0.5 opacity-60" aria-hidden />
            <span className={cn(item.emphasis && "font-bold text-foreground")}>{item.text}</span>
          </li>
        ))}
      </ul>

      <Button
        type="button"
        onClick={() => onFindOutMore(course)}
        className="w-full max-w-[240px] h-12 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold tracking-wide uppercase text-xs shadow-md"
      >
        Find out more
      </Button>
    </article>
  );
}

function CoursesPage() {
  const [detail, setDetail] = useState<Course | null>(null);
  const [booking, setBooking] = useState<{ courseId: string; sessionDate: string } | null>(null);
  const [done, setDone] = useState(false);

  const active = detail ?? (booking ? getCourseById(booking.courseId) : null);

  if (done && active) {
    return (
      <SiteLayout>
        <section className="max-w-7xl mx-auto px-6 py-16">
          <MockSuccess
            title="Registration received"
            description={
              active.fee === 0
                ? `You are registered for ${active.code} — ${active.subtitle}. We will email your session details.`
                : `You are registered for ${active.code}. Payment link (RM ${active.fee}) would be emailed in production.`
            }
          >
            <Button asChild variant="outline">
              <Link to="/courses">Back to courses</Link>
            </Button>
          </MockSuccess>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center md:text-left">
          <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase inline-flex items-center gap-2">
            <GraduationCap className="size-3.5" />
            Training programmes
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3">Our courses</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto md:mx-0">
            Accredited first aid and life-support training from awareness sessions to full workplace programmes.
            Select a course to view schedule, fees and registration.
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            <Link to="/events" className="text-primary font-medium hover:underline">
              Community events calendar
            </Link>
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {courses.map((course) => (
            <ProgrammeCard key={course.id} course={course} onFindOutMore={setDetail} />
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10 max-w-lg mx-auto">
          Corporate and on-site training available —{" "}
          <a href="mailto:user.selangor@sjam.org.my" className="text-primary font-medium hover:underline">
            contact our training unit
          </a>
        </p>
      </div>

      {detail && !booking && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4" role="dialog">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader className="relative pb-2">
              <button
                type="button"
                onClick={() => setDetail(null)}
                className="absolute right-4 top-4 rounded-full p-1.5 hover:bg-muted"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">{detail.level}</span>
              <CardTitle className="text-2xl">
                {detail.code} · {detail.title}
              </CardTitle>
              <CardDescription className="text-base">{detail.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pb-6">
              <ul className="space-y-2">
                {detail.highlights.map((item) => (
                  <li key={item.text} className="flex gap-2 text-sm">
                    <Check className="size-4 shrink-0 text-primary mt-0.5" />
                    <span className={cn(item.emphasis && "font-semibold")}>{item.text}</span>
                  </li>
                ))}
              </ul>

              <dl className="grid gap-2 text-sm border-t border-border pt-4">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Schedule</dt>
                  <dd className="font-medium text-right">{detail.dates}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Time</dt>
                  <dd className="font-medium text-right">{detail.time}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Venue</dt>
                  <dd className="font-medium text-right">{detail.location}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Fee</dt>
                  <dd className="font-medium text-right">{detail.fee === 0 ? "Free" : `RM ${detail.fee}`}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Certification</dt>
                  <dd className="font-medium text-right max-w-[55%]">{detail.certification}</dd>
                </div>
              </dl>

              {detail.sessions.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Choose an intake
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {detail.sessions.map((iso) => (
                      <button
                        key={iso}
                        type="button"
                        onClick={() => {
                          setBooking({ courseId: detail.id, sessionDate: iso });
                          setDetail(null);
                        }}
                        className="text-sm rounded-full border border-border px-3 py-1.5 hover:border-primary hover:bg-primary/5"
                      >
                        {formatSessionDate(iso)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button
                type="button"
                className="w-full h-12 rounded-full font-semibold gap-2"
                disabled={detail.seats <= detail.enrolled}
                onClick={() => {
                  if (detail.sessions[0]) {
                    setBooking({ courseId: detail.id, sessionDate: detail.sessions[0] });
                    setDetail(null);
                  }
                }}
              >
                {detail.seats <= detail.enrolled
                  ? "Fully booked"
                  : detail.fee === 0
                    ? "Register free"
                    : "Register now"}
                <ArrowRight className="size-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {booking && active && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" role="dialog">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>
                Register — {active.code}
              </CardTitle>
              <CardDescription>
                {active.subtitle}
                <span className="block mt-1">Intake: {formatSessionDate(booking.sessionDate)}</span>
              </CardDescription>
            </CardHeader>
            <form
              className="px-6 pb-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
            >
              <div>
                <Label htmlFor="c-name">Full name</Label>
                <Input id="c-name" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="c-email">Email</Label>
                <Input id="c-email" type="email" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="c-ic">MyKad / Passport</Label>
                <Input id="c-ic" required className="mt-1.5" />
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setBooking(null);
                    setDetail(active);
                  }}
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1">
                  {active.fee === 0 ? "Confirm" : `Pay RM ${active.fee} (mock)`}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </SiteLayout>
  );
}
