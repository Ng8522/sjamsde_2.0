import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileText, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { SiteLayout } from "@/components/site-layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  HOME_NURSING_BATCH,
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

function matchesQuery(row: HomeNursingCertificate, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  return [
    row.no,
    row.refno,
    row.examName,
    row.examIc,
    row.examUnit,
    row.certNo,
    row.examTypeEn,
    row.examTypeMs,
  ].some((value) => value.toLowerCase().includes(q));
}

function CertificateCard({ row }: { row: HomeNursingCertificate }) {
  return (
    <article className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">No. {row.no}</p>
          <h3 className="text-base font-semibold text-foreground">{row.examName}</h3>
          <p className="text-sm text-muted-foreground">{row.refno}</p>
        </div>
        <Badge className="bg-primary/15 text-primary hover:bg-primary/15">{row.result}</Badge>
      </div>
      <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Exam date</dt>
          <dd className="font-medium">{row.examDate}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">IC no.</dt>
          <dd className="font-medium tabular-nums">{row.examIc}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Unit</dt>
          <dd className="font-medium">{row.examUnit}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Cert no.</dt>
          <dd className="font-medium tabular-nums">{row.certNo}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Date of issue</dt>
          <dd className="font-medium">{row.dateOfIssue}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">State</dt>
          <dd className="font-medium">{row.state}</dd>
        </div>
      </dl>
    </article>
  );
}

function HomeNursingPage() {
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(
    () => HOME_NURSING_CERTIFICATES.filter((row) => matchesQuery(row, query)),
    [query],
  );

  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link
            to="/programs"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to Programs
          </Link>

          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Nursing Services
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight md:text-4xl">
            Preliminary Home Nursing
          </h1>
          <p className="mt-2 max-w-3xl text-base text-muted-foreground md:text-lg">
            <span className="font-medium text-foreground">Perawatan Asas di Rumah</span> — membership
            documentation summary for candidates who completed the preliminary home nursing examination.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <Card className="mb-6 border-primary/20 bg-gradient-to-br from-primary/[0.04] to-background">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="size-5 text-primary" aria-hidden />
              {HOME_NURSING_BATCH.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">{HOME_NURSING_BATCH.intro}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">NHQ Code</p>
                <p className="mt-1 text-sm font-medium leading-snug">{HOME_NURSING_BATCH.nhqCode}</p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">ID Reference</p>
                <p className="mt-1 text-2xl font-semibold tabular-nums">{HOME_NURSING_BATCH.idReference}</p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Certificate</p>
                <p className="mt-1 text-2xl font-semibold">{HOME_NURSING_BATCH.certificateCount} pcs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Processed documentation</h2>
            <p className="text-sm text-muted-foreground">
              Showing {filteredRows.length} of {HOME_NURSING_CERTIFICATES.length} records
            </p>
          </div>
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, ref no., IC, unit, cert no…"
              className="pl-9"
              aria-label="Search home nursing records"
            />
          </div>
        </div>

        <div className="hidden overflow-x-auto rounded-xl border border-border bg-card md:block">
          <table className="w-full min-w-[72rem] text-left text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-3 font-semibold">No</th>
                <th className="px-3 py-3 font-semibold">Refno</th>
                <th className="px-3 py-3 font-semibold">ExamDate</th>
                <th className="px-3 py-3 font-semibold">ExamName</th>
                <th className="px-3 py-3 font-semibold">ExamSJAMID</th>
                <th className="px-3 py-3 font-semibold">ExamIC</th>
                <th className="px-3 py-3 font-semibold">Result</th>
                <th className="px-3 py-3 font-semibold">ExamTypeE</th>
                <th className="px-3 py-3 font-semibold">ExamTypeM</th>
                <th className="px-3 py-3 font-semibold">ExamUnit</th>
                <th className="px-3 py-3 font-semibold">DateOf_Issue</th>
                <th className="px-3 py-3 font-semibold">State</th>
                <th className="px-3 py-3 font-semibold">Issued</th>
                <th className="px-3 py-3 font-semibold">Cert No</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.refno} className="border-b border-border/70 last:border-0">
                  <td className="px-3 py-3 tabular-nums">{row.no}</td>
                  <td className="px-3 py-3 font-medium">{row.refno}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{row.examDate}</td>
                  <td className="px-3 py-3 font-medium">{row.examName}</td>
                  <td className="px-3 py-3 text-muted-foreground">{row.examSjamId || "—"}</td>
                  <td className="px-3 py-3 tabular-nums whitespace-nowrap">{row.examIc}</td>
                  <td className="px-3 py-3">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {row.result}
                    </Badge>
                  </td>
                  <td className="px-3 py-3">{row.examTypeEn}</td>
                  <td className="px-3 py-3">{row.examTypeMs}</td>
                  <td className="px-3 py-3">{row.examUnit}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{row.dateOfIssue}</td>
                  <td className="px-3 py-3">{row.state}</td>
                  <td className="px-3 py-3 tabular-nums">{row.issued}</td>
                  <td className="px-3 py-3 tabular-nums font-medium">{row.certNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 md:hidden">
          {filteredRows.map((row) => (
            <CertificateCard key={row.refno} row={row} />
          ))}
        </div>

        {filteredRows.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No records match your search.</p>
        ) : null}

        <Alert className="mt-8 border-amber-500/30 bg-amber-500/10">
          <AlertTitle className="text-foreground">Notes</AlertTitle>
          <AlertDescription className="text-sm leading-relaxed text-muted-foreground">
            {HOME_NURSING_BATCH.notes}
          </AlertDescription>
        </Alert>
      </section>
    </SiteLayout>
  );
}
