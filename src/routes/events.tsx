import { useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";

import { ActivityCalendarBoard } from "@/components/activity-calendar-board";
import { SiteLayout } from "@/components/site-layout";
import { getEventScheduleEntries, type ScheduleEntry } from "@/lib/calendar-schedule";

export const Route = createFileRoute("/events")({
  component: EventsPage,
  head: () => ({
    meta: [{ title: "Activity — SJAM Selangor" }],
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
            Community activity
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3">
            SJAM SDE <em className="italic">Rancangan Tahunan</em>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl">
            SJAM Selangor Darul Ehsan annual programme calendar. Choose a month and year, then filter
            by SJAM area.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground mt-3">
            <Link to="/gallery" className="text-primary font-medium hover:underline">
              Past activity gallery
            </Link>
            <span className="hidden sm:inline text-border">·</span>
            <Link to="/courses" className="text-primary font-medium hover:underline">
              View courses
            </Link>
          </div>
        </div>
      </section>

      <ActivityCalendarBoard
        entries={entries}
        emptyDayMessage="No activities for this month and area. Try another month or select All areas."
        onSelectEntry={(entry: ScheduleEntry) => {
          if (entry.eventId) {
            navigate({ to: "/events/$eventId", params: { eventId: entry.eventId } });
          }
        }}
      />
    </SiteLayout>
  );
}
