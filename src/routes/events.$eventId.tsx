import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin } from "lucide-react";

import { MockSuccess, SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getEventById } from "@/lib/mock-data";

export const Route = createFileRoute("/events/$eventId")({
  component: EventDetailPage,
});

function EventDetailPage() {
  const { eventId } = Route.useParams();
  const event = getEventById(eventId);
  const [registered, setRegistered] = useState(false);

  if (!event) {
    return (
      <SiteLayout>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-semibold">Event not found</h1>
          <Button asChild className="mt-6">
            <Link to="/events">Back to events</Link>
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
              <Link to="/events">Back to events</Link>
            </Button>
          </MockSuccess>
        </section>
      </SiteLayout>
    );
  }

  const [day, month] = event.date.split(" ");

  return (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link to="/events" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="size-4" />
          Back to events
        </Link>

        <div className="flex gap-4 items-start mb-6">
          <div className="bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-xl p-4 text-center min-w-[80px]">
            <div className="text-2xl font-bold">{day}</div>
            <div className="text-[10px] uppercase tracking-widest">{month}</div>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-secondary">{event.tag}</span>
            <h1 className="text-2xl md:text-3xl font-semibold mt-1">{event.title}</h1>
          </div>
        </div>

        <p className="text-muted-foreground mb-6">{event.description}</p>
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

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Register for this event</CardTitle>
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
      </div>
    </SiteLayout>
  );
}
