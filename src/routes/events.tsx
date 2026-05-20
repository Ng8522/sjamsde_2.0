import { useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";

import { ScheduleCalendarBoard } from "@/components/schedule-calendar-board";
import { SiteLayout } from "@/components/site-layout";
import { getEventScheduleEntries, type ScheduleEntry } from "@/lib/calendar-schedule";

export const Route = createFileRoute("/events")({
  component: EventsPage,
  head: () => ({
    meta: [{ title: "Events — SJAM Selangor" }],
  }),
});

function EventsPage() {
  const navigate = useNavigate();
  const entries = useMemo(() => getEventScheduleEntries(), []);

  return (
    <SiteLayout>
      <section className="bg-muted/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase flex items-center gap-2">
            <CalendarDays className="size-3.5" />
            Community events
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3">Upcoming events</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl">
            Blood drives, outreach clinics and one-day activities. Pick a date to see what is on, then register for an
            event.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground mt-3">
            <Link to="/gallery" className="text-primary font-medium hover:underline">
              Past event gallery
            </Link>
            <span className="hidden sm:inline text-border">·</span>
            <Link to="/courses" className="text-primary font-medium hover:underline">
              View courses
            </Link>
          </div>
        </div>
      </section>

      <ScheduleCalendarBoard
        entries={entries}
        kindLabel="events"
        emptyDayMessage="No events on this date. Try another day or browse courses for training intakes."
        onSelectEntry={(entry: ScheduleEntry) => {
          if (entry.eventId) {
            navigate({ to: "/events/$eventId", params: { eventId: entry.eventId } });
          }
        }}
      />
    </SiteLayout>
  );
}
