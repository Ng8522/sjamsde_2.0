import { useMemo, useState } from "react";
import { Clock, MapPin } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  entriesOnDate,
  isSameCalendarDay,
  type ScheduleEntry,
} from "@/lib/calendar-schedule";

type ScheduleCalendarBoardProps = {
  entries: ScheduleEntry[];
  kindLabel: string;
  emptyDayMessage: string;
  onSelectEntry: (entry: ScheduleEntry) => void;
  footerNote?: React.ReactNode;
  /** Events + courses on one calendar */
  combined?: boolean;
};

export function ScheduleCalendarBoard({
  entries,
  kindLabel,
  emptyDayMessage,
  onSelectEntry,
  footerNote,
  combined = false,
}: ScheduleCalendarBoardProps) {
  const defaultDate = useMemo(() => {
    const sorted = [...entries].sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
    return sorted[0]?.startsAt ?? new Date(2026, 5, 1);
  }, [entries]);

  const [month, setMonth] = useState<Date>(defaultDate);
  const [selected, setSelected] = useState<Date | undefined>(defaultDate);

  const dayEntries = useMemo(
    () => (selected ? entriesOnDate(entries, selected) : []),
    [entries, selected],
  );

  const bookedDays = useMemo(() => entries.map((e) => e.startsAt), [entries]);

  const hasEventOnDay = (date: Date) =>
    entries.some((e) => e.kind === "event" && isSameCalendarDay(e.startsAt, date));
  const hasCourseOnDay = (date: Date) =>
    entries.some((e) => e.kind === "course" && isSameCalendarDay(e.startsAt, date));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-8 items-start">
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-border bg-muted/30">
          <CardTitle className="text-lg">Select a date</CardTitle>
          <CardDescription>
            {combined
              ? "Green dot = event, blue dot = course. Click a date to see both."
              : `Days with ${kindLabel} are highlighted. Click a date to see what's on that day.`}
          </CardDescription>
          {combined ? (
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-1">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-secondary" />
                Community event
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-primary" />
                Training course
              </span>
            </div>
          ) : null}
        </CardHeader>
        <CardContent className="p-4 md:p-6 flex justify-center">
          <Calendar
            mode="single"
            month={month}
            onMonthChange={setMonth}
            selected={selected}
            onSelect={setSelected}
            defaultMonth={defaultDate}
            className="w-full max-w-none [--cell-size:clamp(2.75rem,6vw,4.25rem)] p-0"
            classNames={{
              months: "w-full",
              month: "w-full gap-4",
              month_caption: "h-12 mb-2",
              caption_label: "text-lg font-semibold",
              table: "w-full",
              weekdays: "mb-2",
              weekday: "text-sm font-medium flex-1",
              week: "w-full mt-1",
              day: "flex-1",
              button_previous: "size-10",
              button_next: "size-10",
            }}
            modifiers={
              combined
                ? {
                    hasEvent: hasEventOnDay,
                    hasCourse: hasCourseOnDay,
                  }
                : { booked: bookedDays }
            }
            modifiersClassNames={
              combined
                ? {
                    hasEvent:
                      "[&_button]:font-semibold [&_button]:relative [&_button]:after:absolute [&_button]:after:bottom-1 [&_button]:after:left-[calc(50%-5px)] [&_button]:after:size-1.5 [&_button]:after:rounded-full [&_button]:after:bg-secondary",
                    hasCourse:
                      "[&_button]:font-semibold [&_button]:relative [&_button]:after:absolute [&_button]:after:bottom-1 [&_button]:after:left-[calc(50%+5px)] [&_button]:after:size-1.5 [&_button]:after:rounded-full [&_button]:after:bg-primary",
                  }
                : {
                    booked:
                      "[&_button]:font-semibold [&_button]:relative [&_button]:after:absolute [&_button]:after:bottom-1.5 [&_button]:after:left-1/2 [&_button]:after:-translate-x-1/2 [&_button]:after:size-2 [&_button]:after:rounded-full [&_button]:after:bg-primary",
                  }
            }
          />
        </CardContent>
        {footerNote ? (
          <div className="px-6 pb-6 text-xs text-muted-foreground">{footerNote}</div>
        ) : null}
      </Card>

      <Card className="lg:sticky lg:top-28">
        <CardHeader>
          <CardTitle className="text-lg">
            {selected
              ? selected.toLocaleDateString("en-MY", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Pick a date"}
          </CardTitle>
          <CardDescription>
            {dayEntries.length > 0
              ? `${dayEntries.length} ${kindLabel}${dayEntries.length > 1 ? "s" : ""} on this day`
              : emptyDayMessage}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {dayEntries.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center border border-dashed border-border rounded-lg">
              {emptyDayMessage}
            </p>
          ) : (
            dayEntries.map((entry) => (
              <button
                key={entry.entryKey}
                type="button"
                onClick={() => onSelectEntry(entry)}
                className={cn(
                  "w-full text-left rounded-xl border border-border p-4 transition-colors",
                  "hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-semibold leading-snug">{entry.title}</span>
                  <span
                    className={cn(
                      "text-[10px] font-semibold uppercase tracking-wider shrink-0 px-2 py-0.5 rounded",
                      entry.kind === "event"
                        ? "bg-secondary/15 text-secondary"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    {combined ? (entry.kind === "event" ? "Event" : "Course") : entry.tag}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                  <Clock className="size-3.5 shrink-0" />
                  {entry.time}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-2">
                  <MapPin className="size-3.5 shrink-0" />
                  {entry.location}
                </p>
                <p className="text-sm font-medium text-primary">{entry.detail}</p>
                <p className="text-xs text-muted-foreground mt-2">Click to register →</p>
              </button>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
