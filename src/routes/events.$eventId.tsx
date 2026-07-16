import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Download, Mail, MapPin, Phone } from "lucide-react";

import { MockSuccess, SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getEventById } from "@/lib/mock-data";

export const Route = createFileRoute("/events/$eventId")({
  component: EventDetailPage,
  head: ({ params }) => {
    const event = getEventById(params.eventId);
    return {
      meta: [
        {
          title: event
            ? `${event.title} — SJAM Selangor`
            : "Activity — SJAM Selangor",
        },
      ],
    };
  },
});

function EventDetailPage() {
  const { eventId } = Route.useParams();
  const event = getEventById(eventId);
  const [registered, setRegistered] = useState(false);

  if (!event) {
    return (
      <SiteLayout>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-semibold">Activity not found</h1>
          <Button asChild className="mt-6">
            <Link to="/events">Back to activity</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  if (registered) {
    return (
      <SiteLayout>
        <section className="max-w-7xl mx-auto px-6 py-16">
          <MockSuccess
            title="You're registered (mock)"
            description={`Confirmation for "${event.title}" would be emailed in production. Push notifications are for SSMP members in the mobile app only.`}
          >
            <Button asChild variant="outline">
              <Link to="/events">Back to activity</Link>
            </Button>
          </MockSuccess>
        </section>
      </SiteLayout>
    );
  }

  const [day, month] = event.date.split(" ");
  const showMockRegistration = !event.hideMockRegistration;

  return (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link to="/events" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="size-4" />
          Back to activity
        </Link>

        <div className="flex gap-4 items-start mb-6">
          <div className="bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-xl p-4 text-center min-w-[80px]">
            <div className="text-2xl font-medium">{day}</div>
            <div className="text-[10px] uppercase tracking-widest">{month}</div>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-secondary">{event.tag}</span>
            <h1 className="text-2xl md:text-3xl font-semibold mt-1">{event.title}</h1>
          </div>
        </div>

        <p className="text-muted-foreground mb-6 whitespace-pre-wrap">{event.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <MapPin className="size-4 text-primary" />
            {event.location}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="size-4 text-primary" />
            {event.time}
          </span>
        </div>

        {event.documentUrl && (
          <div className="mb-8">
            <Button asChild className="gap-2">
              <a href={event.documentUrl} target="_blank" rel="noopener noreferrer">
                <Download className="size-4" />
                {event.documentLabel ?? "Download guidelines (PDF)"}
              </a>
            </Button>
          </div>
        )}

        {event.detailSections && event.detailSections.length > 0 && (
          <div className="space-y-4 mb-8">
            {event.detailSections.map((section) => (
              <Card key={section.title}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {(event.contactEmail || event.contactPhone) && (
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {event.contactPhone && (
                <a
                  href={`tel:${event.contactPhone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <Phone className="size-4 text-primary" />
                  {event.contactPhone}
                </a>
              )}
              {event.contactEmail && (
                <a
                  href={`mailto:${event.contactEmail}`}
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <Mail className="size-4 text-primary" />
                  {event.contactEmail}
                </a>
              )}
            </CardContent>
          </Card>
        )}

        {showMockRegistration ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Register for this activity</CardTitle>
              <p className="text-sm text-muted-foreground">
                {event.spots - event.registered} of {event.spots} spots available
              </p>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setRegistered(true);
                }}
              >
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Mobile</Label>
                  <Input id="phone" required className="mt-1.5" />
                </div>
                <Button type="submit" className="w-full">
                  Confirm registration (mock)
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How to join</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                This activity uses the official SJAM circular / entry form — not online registration on
                this website.
              </p>
              <p>
                Open <strong>View details</strong> sections above for eligibility and steps, then
                download the PDF for the full guidelines and forms.
              </p>
              {event.documentUrl && (
                <Button asChild variant="outline" className="gap-2">
                  <a href={event.documentUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="size-4" />
                    {event.documentLabel ?? "Download PDF"}
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </SiteLayout>
  );
}
