import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  ClipboardCheck,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  X,
} from "lucide-react";

import { MockSuccess, SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCourseContent, getCourseCoverImage, getCourseImages, TRAINING_CONTACT } from "@/lib/course-content";
import { getCourseById } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/courses/$courseId")({
  component: CourseDetailPage,
  head: ({ params }) => {
    const course = getCourseById(params.courseId);
    return {
      meta: [
        {
          title: course ? `${course.title} — Courses — SJAM Selangor` : "Course — SJAM Selangor",
        },
      ],
    };
  },
});

function formatSessionDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-MY", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function CourseDetailPage() {
  const { courseId } = Route.useParams();
  const course = getCourseById(courseId);
  const content = course ? getCourseContent(course.id) : undefined;

  const [registerOpen, setRegisterOpen] = useState(false);
  const [sessionDate, setSessionDate] = useState("");
  const [done, setDone] = useState(false);

  if (!course || !content) {
    return (
      <SiteLayout>
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-semibold">Course not found</h1>
          <Button asChild className="mt-6">
            <Link to="/courses">Back to courses</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  if (done) {
    return (
      <SiteLayout>
        <section className="max-w-7xl mx-auto px-6 py-16">
          <MockSuccess
            title="Registration received"
            description={
              course.fee === 0
                ? `You are registered for ${course.code} — ${course.subtitle}. We will email your session details.`
                : `You are registered for ${course.code}. Payment link (RM ${course.fee}) would be emailed in production.`
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

  const coverImage = getCourseCoverImage(course.id);
  const galleryImages = getCourseImages(course.id).slice(1, 5);

  return (
    <SiteLayout>
      <section className="relative border-b border-border overflow-hidden">
        {coverImage ? (
          <>
            <img
              src={coverImage}
              alt=""
              className="absolute inset-0 size-full object-cover"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/40" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        )}
        <div className="relative max-w-4xl mx-auto px-6 py-10 md:py-14">
          <Link
            to="/courses"
            className={cn(
              "inline-flex items-center gap-2 text-sm mb-6",
              coverImage ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-primary",
            )}
          >
            <ArrowLeft className="size-4" />
            All courses
          </Link>
          <span
            className={cn(
              "font-semibold text-xs tracking-[0.2em] uppercase inline-flex items-center gap-2",
              coverImage ? "text-white/80" : "text-primary",
            )}
          >
            <GraduationCap className="size-3.5" />
            {course.level}
          </span>
          <h1
            className={cn(
              "text-3xl md:text-4xl font-semibold tracking-tight mt-3",
              coverImage && "text-white",
            )}
          >
            {course.title}
          </h1>
          <p className={cn("text-lg mt-2", coverImage ? "text-white/85" : "text-muted-foreground")}>
            {course.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-10 md:py-14">
        {galleryImages.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {galleryImages.map((src) => (
              <img
                key={src}
                src={src}
                alt={`${course.code} training`}
                className="w-full aspect-[4/3] object-cover rounded-xl border border-border"
                loading="lazy"
              />
            ))}
          </div>
        ) : null}

        <div className="grid lg:grid-cols-[1fr_18rem] gap-10 items-start">
          <div className="space-y-10 min-w-0">
            <section>
              {content.description.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-muted-foreground leading-relaxed mb-4 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Who should attend?</h2>
              <p className="text-muted-foreground leading-relaxed">{content.whoShouldAttend}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Course details</h2>
              <dl className="rounded-xl border border-border overflow-hidden divide-y divide-border text-sm">
                <DetailRow label="Duration" value={content.duration} />
                <DetailRow label="Course type" value={content.courseType} />
                <DetailRow label="Assessment" value={content.assessment} />
                <DetailRow label="Certification" value={content.certification} />
                <DetailRow label="HRDC claimable" value={content.hrdcClaimable ? "Yes" : "No"} />
                <DetailRow label="Schedule" value={course.dates} />
                <DetailRow label="Venue" value={course.location} />
                <DetailRow
                  label="Fee"
                  value={course.fee === 0 ? "Free" : `RM ${course.fee}`}
                  highlight={course.fee === 0}
                />
              </dl>
            </section>

            {course.highlights.length > 0 ? (
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">Highlights</h2>
                <ul className="space-y-2">
                  {course.highlights.map((item) => (
                    <li key={item.text} className="flex gap-2 text-sm text-muted-foreground">
                      <Check className="size-4 shrink-0 text-primary mt-0.5" />
                      <span className={cn(item.emphasis && "font-semibold text-foreground")}>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Enquire or register
              </p>
              <a
                href={`tel:${TRAINING_CONTACT.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
              >
                <Phone className="size-4 text-primary shrink-0" />
                {TRAINING_CONTACT.phoneDisplay}
              </a>
              <a
                href={`mailto:${TRAINING_CONTACT.email}`}
                className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors break-all"
              >
                <Mail className="size-4 text-primary shrink-0" />
                {TRAINING_CONTACT.email}
              </a>
              <Button
                type="button"
                className="w-full rounded-full font-semibold gap-2"
                disabled={course.seats <= course.enrolled}
                onClick={() => setRegisterOpen(true)}
              >
                {course.seats <= course.enrolled
                  ? "Fully booked"
                  : course.fee === 0
                    ? "Register free"
                    : "Register now"}
                <ArrowRight className="size-4" />
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3 text-sm">
              <p className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                {course.location}
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Award className="size-4 text-primary shrink-0" />
                {course.certification}
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <ClipboardCheck className="size-4 text-primary shrink-0" />
                {content.assessment === "No" ? "No assessment" : "Assessment required"}
              </p>
            </div>
          </aside>
        </div>
      </div>

      {registerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          role="dialog"
        >
          <Card className="w-full max-w-md">
            <CardHeader className="relative">
              <button
                type="button"
                onClick={() => setRegisterOpen(false)}
                className="absolute right-4 top-4 rounded-full p-1.5 hover:bg-muted"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
              <CardTitle>Register — {course.code}</CardTitle>
              <CardDescription>{course.subtitle}</CardDescription>
            </CardHeader>
            {course.sessions.length > 0 ? (
              <div className="px-6 pb-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Choose an intake
                </p>
                <div className="flex flex-wrap gap-2">
                  {course.sessions.map((iso) => (
                    <button
                      key={iso}
                      type="button"
                      onClick={() => setSessionDate(iso)}
                      className={cn(
                        "text-sm rounded-full border px-3 py-1.5 transition-colors",
                        sessionDate === iso || (!sessionDate && iso === course.sessions[0])
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary hover:bg-primary/5",
                      )}
                    >
                      {formatSessionDate(iso)}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
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
                  onClick={() => setRegisterOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {course.fee === 0 ? "Confirm" : `Pay RM ${course.fee} (mock)`}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </SiteLayout>
  );
}

function DetailRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="grid grid-cols-[9rem_1fr] gap-4 px-4 py-3 bg-background even:bg-muted/20">
      <dt className="text-muted-foreground font-medium">{label}</dt>
      <dd className={cn("font-medium", highlight && "text-primary")}>{value}</dd>
    </div>
  );
}
