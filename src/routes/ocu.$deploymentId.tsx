import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Glasses, MapPin, Users } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { ZoomablePhotoGrid } from "@/components/zoomable-photo-grid";
import { getOcuDeployment } from "@/lib/ocu-deployments";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ocu/$deploymentId")({
  component: OcuDeploymentPage,
  head: ({ params }) => {
    const deployment = getOcuDeployment(params.deploymentId);
    return {
      meta: [
        {
          title: deployment
            ? `${deployment.title} — OCU — SJAM Selangor`
            : "Ophthalmic Care Unit — SJAM Selangor",
        },
      ],
    };
  },
});

function OcuDeploymentPage() {
  const { deploymentId } = Route.useParams();
  const deployment = getOcuDeployment(deploymentId);

  if (!deployment) {
    return (
      <SiteLayout>
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-semibold">Deployment not found</h1>
          <Button asChild className="mt-6">
            <Link to="/programs">Back to programs</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  const { number, peopleScreened, glassesProvided } = deployment;
  const hasVisitStats = peopleScreened != null && glassesProvided != null;
  const photos = deployment.images.map((src, index) => ({
    src,
    alt: `${deployment.title} photo ${index + 1}`,
  }));

  return (
    <SiteLayout>
      <section className="max-w-4xl mx-auto px-6 py-10 md:py-14">
        <Link
          to="/programs"
          hash="ophthalmic-care-unit"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to programs
        </Link>

        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
          {number}th deployment
        </p>
        <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">{deployment.title}</h1>
        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1.5">
          <MapPin className="size-3.5 text-primary shrink-0" />
          {deployment.location}
        </p>
        <div className="mt-3 border-b-2 border-primary" />

        {hasVisitStats ? (
          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            <ImpactStat icon={Users} value={String(peopleScreened)} label="People screened at this visit" />
            <ImpactStat
              icon={Glasses}
              value={String(glassesProvided)}
              label="Free prescription glasses from this visit"
              accent
            />
          </div>
        ) : null}

        <div className="space-y-3 mt-6 mb-6">
          {deployment.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 28)} className="text-sm text-foreground/90 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {deployment.thanks.length > 0 ? (
          <div className="space-y-3 mb-6 pt-4 border-t border-border/80">
            {deployment.thanks.map((paragraph) => (
              <p key={paragraph.slice(0, 28)} className="text-sm text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}

        {photos.length > 0 ? (
          <>
            <p className="text-xs text-muted-foreground mb-3">Tap any photo to zoom</p>
            <ZoomablePhotoGrid photos={photos} columns={2} />
          </>
        ) : null}
      </section>
    </SiteLayout>
  );
}

function ImpactStat({
  icon: Icon,
  value,
  label,
  accent = false,
}: {
  icon: typeof Users;
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 py-3 border",
        accent ? "bg-primary/10 border-primary/25" : "bg-muted/30 border-border/60",
      )}
    >
      <Icon className={cn("size-5 shrink-0", accent ? "text-primary" : "text-muted-foreground")} />
      <div>
        <p className={cn("text-2xl font-bold leading-none", accent ? "text-primary" : "text-foreground")}>
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-1 leading-snug">{label}</p>
      </div>
    </div>
  );
}
