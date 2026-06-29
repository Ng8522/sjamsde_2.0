import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  FileText,
  Hash,
  IdCard,
  MapPin,
  ZoomIn,
} from "lucide-react";
import { useState } from "react";

import { SiteLayout } from "@/components/site-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  getHomeNursingCertImage,
  HOME_NURSING_CERTIFICATES,
  type HomeNursingCertificate,
} from "@/lib/home-nursing-certificates";

export const Route = createFileRoute("/home-nursing")({
  component: HomeNursingPage,
  head: () => ({
    meta: [
      { title: "Preliminary Home Nursing — SJAM Selangor" },
      {
        name: "description",
        content:
          "Summary listing of Preliminary Home Nursing (Perawatan Asas di Rumah) membership documentation for SJAM Selangor.",
      },
    ],
  }),
});

function CertImageDialog({
  src,
  alt,
  open,
  onOpenChange,
}: {
  src: string;
  alt: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-2">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <img src={src} alt={alt} className="h-auto w-full rounded-md" />
      </DialogContent>
    </Dialog>
  );
}

function CertificateCard({ row }: { row: HomeNursingCertificate }) {
  const imageSrc = getHomeNursingCertImage(row);
  const [open, setOpen] = useState(false);

  return (
    <Card className="group overflow-hidden border-border/60 bg-card transition-all hover:border-primary/40 hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex items-start justify-between gap-3 border-b border-border/60 px-5 py-4">
          <div className="min-w-0">
            <p className="truncate text-base font-semibold leading-tight text-foreground">
              {row.examName}
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">{row.refno}</p>
          </div>
          <Badge
            variant="secondary"
            className="shrink-0 gap-1 bg-primary/10 text-primary hover:bg-primary/10"
          >
            <CheckCircle2 className="h-3 w-3" />
            {row.result}
          </Badge>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 px-5 py-4 text-sm">
          <Field icon={Hash} label="No." value={row.no} />
          <Field icon={Calendar} label="Exam date" value={row.examDate} />
          <Field icon={IdCard} label="IC no." value={row.examIc} mono />
          <Field icon={Building2} label="Unit" value={row.examUnit} />
          <Field icon={FileText} label="Cert no." value={row.certNo} mono />
          <Field icon={MapPin} label="State" value={row.state} />
        </dl>

        <div className="flex items-center justify-between gap-3 border-t border-border/60 bg-muted/30 px-5 py-3">
          <span className="text-xs text-muted-foreground">
            Issued <span className="font-medium text-foreground">{row.dateOfIssue}</span>
          </span>
          {imageSrc ? (
            <>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 gap-1.5"
                onClick={() => setOpen(true)}
              >
                <ZoomIn className="h-3.5 w-3.5" />
                View cert
              </Button>
              <CertImageDialog
                src={imageSrc}
                alt={`Certificate ${row.certNo}`}
                open={open}
                onOpenChange={setOpen}
              />
            </>
          ) : (
            <span className="text-xs text-muted-foreground">No image attached</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon: typeof Hash;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0">
      <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
        <Icon className="h-3 w-3" />
        {label}
      </dt>
      <dd className={`mt-0.5 truncate text-foreground ${mono ? "font-mono text-xs" : "text-sm"}`}>
        {value || "—"}
      </dd>
    </div>
  );
}

function HomeNursingPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <Link
          to="/programs"
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary"
        >
          <ArrowLeft className="size-4" />
          Back to Programs
        </Link>

        <header className="mb-8">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
            Nursing Services
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Preliminary Home Nursing
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            <span className="italic">Perawatan Asas di Rumah</span> — membership documentation
            summary for candidates who completed the preliminary home nursing examination.
          </p>
        </header>

        <section>
          <div className="mb-4">
            <h2 className="text-base font-semibold text-foreground">Processed documentation</h2>
            <p className="text-xs text-muted-foreground">
              {HOME_NURSING_CERTIFICATES.length} records
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {HOME_NURSING_CERTIFICATES.map((row) => (
              <CertificateCard key={row.no} row={row} />
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
