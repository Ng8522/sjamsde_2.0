import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowLeft, ExternalLink, MapPin, Phone } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import haemodialysisImg from "../assets/haemodialysis.jpg";

const haemodialysisStations = [
  { station: "Station 01 & Area HQ", location: "Klang, Selangor" },
  { station: "Station 02", location: "Klang, Selangor" },
  { station: "Station 03", location: "Banting, Selangor" },
  { station: "Station 04", location: "Kampar, Perak" },
  { station: "Station 05", location: "Rawang, Selangor" },
  { station: "Station 06", location: "Kuala Selangor, Selangor" },
  { station: "Station 07", location: "Klang, Selangor" },
  { station: "Station 08", location: "Sibu, Sarawak" },
  { station: "Station 09", location: "Raub, Pahang" },
  { station: "Station 10", location: "Bintulu, Sarawak" },
  { station: "Station 11", location: "Shah Alam, Selangor" },
  { station: "Station 12", location: "Balakong, Selangor" },
  { station: "Station 13", location: "Tasik Puteri, Selangor" },
];

export const Route = createFileRoute("/haemodialysis-service")({
  component: HaemodialysisServicePage,
  head: () => ({
    meta: [
      { title: "Haemodialysis Service — SJAM Selangor" },
      {
        name: "description",
        content:
          "Overview of SJAM Selangor haemodialysis service, service history, patient support focus, and treatment application details.",
      },
    ],
  }),
});

function HaemodialysisServicePage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/2 to-background border-b border-primary/20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-secondary/15 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-12 md:py-16">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline mb-5"
          >
            <ArrowLeft className="size-4" />
            Back to Programs
          </Link>
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-[0.3em] uppercase bg-gradient-to-r from-primary/15 to-secondary/10 px-4 py-2 rounded-full w-fit border border-primary/20 mb-4">
            Haemodialysis Service
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter leading-tight mb-4">
            Community Haemodialysis Care
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
            SJAM-KPS started its first haemodialysis centre in Klang in late 1993 with two donated
            dialysis machines. The service is focused on supporting low and middle income patients
            with kidney failure.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="tel:+60333735005"
              className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/15 transition-colors"
            >
              <Phone className="size-4" />
              Call: 03-3373 5005
            </a>
            <a
              href="https://sde.sjamsde.org.my/wp-content/uploads/2022/12/Haemodialysis-Treatment-Application-Form.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Application Form
              <ExternalLink className="size-4" />
            </a>
          </div>
          <div className="mt-8">
            <img
              src={haemodialysisImg}
              alt="SJAM haemodialysis care service"
              className="w-full max-w-4xl rounded-2xl border border-border/80 object-cover aspect-[16/7] shadow-sm"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-muted/20 border-b border-border/80">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <article className="rounded-2xl border border-border/80 bg-card p-6 md:p-7">
            <h2 className="text-xl font-semibold mb-3">Service Background</h2>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                In 1996, a major fundraising campaign supported expansion of the Klang premise
                (Station 01), adding more dialysis machines contributed by corporate and public
                sectors.
              </p>
              <p>
                As patient needs grew, SJAM-KPS continued to expand operations and staffing to
                maintain quality care and efficient service delivery.
              </p>
              <p>
                On 14 October 2016, Yayasan St. John Ambulans Malaysia - Kawasan Pantai Selangor
                took over haemodialysis operations.
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-6 md:p-7">
            <h2 className="text-xl font-semibold mb-3 inline-flex items-center gap-2">
              <Activity className="size-5 text-primary" />
              Current Service Scale
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                SJAM-KPS is reported to operate 13 haemodialysis centres nationwide with more than
                230 dialysis machines and over 800 dialysis patients under care.
              </p>
              <p>
                Expansion plans were outlined for additional centres, with emphasis on extending
                access in rural areas to reduce travel burden and treatment costs for patients.
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-6 md:p-7">
            <h2 className="text-xl font-semibold mb-3">Centre Locations</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Current operating haemodialysis centres include the following stations. Each station
              has a direct Google Maps search link:
            </p>
            <div className="grid sm:grid-cols-2 gap-2.5 text-sm text-muted-foreground">
              {haemodialysisStations.map((station) => (
                <div
                  key={station.station}
                  className="rounded-lg border border-border/70 bg-muted/30 px-3 py-2"
                >
                  <p className="font-semibold text-foreground">{station.station}</p>
                  <p>{station.location}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`SJAM haemodialysis ${station.location}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    <MapPin className="size-3.5" />
                    Open in Google Maps
                  </a>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] via-card to-secondary/[0.04] p-6 md:p-7">
            <h2 className="text-xl font-semibold mb-3">Important Notes</h2>
            <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc pl-5">
              <li>Service priority is for low and middle income kidney failure patients.</li>
              <li>For treatment intake, please submit the official application form.</li>
              <li>
                For enquiries, contact the SJAM Selangor haemodialysis service line at 03-3373 5005.
              </li>
            </ul>
          </article>
        </div>
      </section>
    </SiteLayout>
  );
}
