import { useEffect, useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Filter, MapPin } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  entriesInMonth,
  entriesOnDate,
  isSameCalendarDay,
  type ScheduleEntry,
} from "@/lib/calendar-schedule";
import { SJAM_ACTIVITY_AREAS, type SjamAreaId } from "@/lib/sjam-areas";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Matches native form controls used elsewhere — easy to hand off to WP theme CSS */
const FILTER_SELECT_CLASS =
  "w-full px-4 py-2.5 border-2 border-primary/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white text-foreground text-sm font-medium shadow-sm";

type ActivityCalendarBoardProps = {
  entries: ScheduleEntry[];
  emptyDayMessage: string;
  onSelectEntry: (entry: ScheduleEntry) => void;
};

function buildYearOptions(entries: ScheduleEntry[]) {
  const years = new Set(entries.map((e) => e.startsAt.getFullYear()));
  const current = new Date().getFullYear();
  years.add(current);
  return [...years].sort((a, b) => a - b);
}

export function ActivityCalendarBoard({
  entries,
  emptyDayMessage,
  onSelectEntry,
}: ActivityCalendarBoardProps) {
  const yearOptions = useMemo(() => buildYearOptions(entries), [entries]);

  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());
  const [selected, setSelected] = useState<Date | undefined>(() => new Date());
  const [areaFilter, setAreaFilter] = useState<SjamAreaId | "all">("all");

  const viewMonthDate = useMemo(() => new Date(viewYear, viewMonth, 1), [viewYear, viewMonth]);

  useEffect(() => {
    if (!selected) return;
    if (selected.getFullYear() !== viewYear || selected.getMonth() !== viewMonth) {
      setSelected(new Date(viewYear, viewMonth, 1));
    }
  }, [viewYear, viewMonth, selected]);

  const monthEntries = useMemo(
    () => entriesInMonth(entries, viewYear, viewMonth),
    [entries, viewYear, viewMonth],
  );

  const scopedEntries = useMemo(() => {
    const list =
      areaFilter === "all"
        ? monthEntries
        : monthEntries.filter((e) => e.areaId === areaFilter);
    return [...list].sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
  }, [monthEntries, areaFilter]);

  const groupedByArea = useMemo(() => {
    const groups = new Map<string, ScheduleEntry[]>();
    for (const area of SJAM_ACTIVITY_AREAS) {
      const areaItems = scopedEntries.filter((e) => e.areaId === area.id);
      if (areaItems.length > 0) {
        groups.set(area.id, areaItems);
      }
    }
    const unassigned = scopedEntries.filter((e) => !e.areaId || !groups.has(e.areaId));
    if (unassigned.length > 0) {
      groups.set("other", unassigned);
    }
    return groups;
  }, [scopedEntries]);

  const bookedDays = useMemo(() => monthEntries.map((e) => e.startsAt), [monthEntries]);

  const selectedDayEntries = useMemo(() => {
    if (!selected) return [];
    const onDay = entriesOnDate(monthEntries, selected);
    if (areaFilter === "all") return onDay;
    return onDay.filter((e) => e.areaId === areaFilter);
  }, [monthEntries, selected, areaFilter]);

  const listHeading = `${MONTH_NAMES[viewMonth]} ${viewYear}`;

  function goToPreviousMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
      return;
    }
    setViewMonth((m) => m - 1);
  }

  function goToNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
      return;
    }
    setViewMonth((m) => m + 1);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      {/* WP: Group block — Activity calendar (plugin: events calendar or custom block) */}
      <Card className="overflow-hidden border border-border shadow-sm">
        <CardHeader className="border-b border-border bg-muted/40 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <CalendarDays className="size-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Activity Calendar</CardTitle>
                <CardDescription className="mt-1.5">
                  Days with activities are marked. Choose month and year to change the view.
                </CardDescription>
              </div>
            </div>
            <p className="text-sm text-muted-foreground sm:text-right sm:pt-1 shrink-0">
              {monthEntries.length} activit{monthEntries.length === 1 ? "y" : "ies"} this month
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="space-y-1.5 min-w-[140px] flex-1 sm:flex-none">
              <label
                htmlFor="activity-month"
                className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                Month
              </label>
              <select
                id="activity-month"
                value={viewMonth}
                onChange={(e) => setViewMonth(Number(e.target.value))}
                className={FILTER_SELECT_CLASS}
              >
                {MONTH_NAMES.map((name, index) => (
                  <option key={name} value={index}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5 min-w-[120px] flex-1 sm:flex-none">
              <label
                htmlFor="activity-year"
                className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                Year
              </label>
              <select
                id="activity-year"
                value={viewYear}
                onChange={(e) => setViewYear(Number(e.target.value))}
                className={FILTER_SELECT_CLASS}
              >
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] divide-y md:divide-y-0 md:divide-x divide-border">
            {/* WP: Calendar column — month grid widget / plugin shortcode */}
            <div className="p-5 md:p-8 flex flex-col items-center bg-muted/20">
              <div className="mb-5 flex w-full max-w-sm items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  aria-label="Previous month"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ChevronLeft className="size-4" strokeWidth={2.5} />
                </button>
                <div className="min-w-0 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {MONTH_NAMES[viewMonth]} {viewYear}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={goToNextMonth}
                  aria-label="Next month"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ChevronRight className="size-4" strokeWidth={2.5} />
                </button>
              </div>
              <div className="w-full rounded-xl border border-border bg-card p-4 md:p-6">
                <Calendar
                  mode="single"
                  month={viewMonthDate}
                  onMonthChange={(date) => {
                    setViewYear(date.getFullYear());
                    setViewMonth(date.getMonth());
                  }}
                  selected={selected}
                  onSelect={setSelected}
                  className="w-full max-w-none [--cell-size:clamp(2.75rem,5vw,3.75rem)] p-0"
                  classNames={{
                    root: "w-full",
                    months: "w-full",
                    month: "w-full gap-2",
                    month_caption: "hidden",
                    caption_label: "sr-only",
                    nav: "hidden",
                    button_previous: "hidden",
                    button_next: "hidden",
                    table: "w-full",
                    weekdays: "mb-2 rounded-md bg-primary/5 py-1",
                    weekday: "text-xs font-semibold uppercase text-primary flex-1",
                    week: "w-full mt-1",
                    day: "flex-1",
                    today: "ring-2 ring-secondary/50 ring-offset-1 rounded-md",
                  }}
                  modifiers={{ booked: bookedDays }}
                  modifiersClassNames={{
                    booked:
                      "[&_button]:font-semibold [&_button]:bg-primary/10 [&_button]:text-primary [&_button]:relative [&_button]:after:absolute [&_button]:after:bottom-1 [&_button]:after:left-1/2 [&_button]:after:-translate-x-1/2 [&_button]:after:size-1.5 [&_button]:after:rounded-full [&_button]:after:bg-secondary",
                  }}
                />
              </div>
              <p className="sr-only">Days with a dot have scheduled activities.</p>
            </div>

            {/* WP: Sidebar — selected day detail list */}
            <div className="p-4 md:p-6 flex flex-col min-h-[280px] md:min-h-0 bg-card">
              <div className="mb-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Selected day
                </p>
                <h3 className="text-lg font-semibold text-foreground mt-1">
                  {selected
                    ? selected.toLocaleDateString("en-MY", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Pick a date"}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedDayEntries.length > 0
                    ? `${selectedDayEntries.length} activit${selectedDayEntries.length === 1 ? "y" : "ies"} on this day`
                    : emptyDayMessage}
                </p>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto max-h-[min(24rem,50vh)] md:max-h-88">
                {selectedDayEntries.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-8 text-center border border-dashed border-border rounded-lg bg-muted/30">
                    {emptyDayMessage}
                  </p>
                ) : (
                  selectedDayEntries.map((entry) => (
                    <button
                      key={entry.entryKey}
                      type="button"
                      onClick={() => onSelectEntry(entry)}
                      className={cn(
                        "w-full text-left rounded-lg border border-border bg-background p-4",
                        "hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      )}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-semibold leading-snug">{entry.title}</span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider shrink-0 px-2 py-0.5 rounded bg-secondary/15 text-secondary">
                          {entry.tag}
                        </span>
                      </div>
                      {entry.areaLabel ? (
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                          {entry.areaLabel}
                        </p>
                      ) : null}
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                        <Clock className="size-3.5 shrink-0" />
                        {entry.time}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-2">
                        <MapPin className="size-3.5 shrink-0" />
                        {entry.location}
                      </p>
                      <p className="text-sm font-medium text-primary">{entry.detail}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {entry.tag === "Competition" ? "View details →" : "Register →"}
                      </p>
                    </button>
                  ))
                )}
              </div>

              <p className="mt-4 text-xs text-muted-foreground flex items-center gap-4 pt-3 border-t border-border">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-secondary shrink-0" aria-hidden />
                  Activity day
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-3 rounded ring-2 ring-secondary/50 shrink-0" aria-hidden />
                  Today
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* WP: Group block — Monthly activity list by area */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 rounded-xl border border-border bg-muted/30 px-5 py-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{listHeading}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {scopedEntries.length} activit{scopedEntries.length === 1 ? "y" : "ies"} shown, grouped
              by area
            </p>
          </div>
          <div className="space-y-1.5 w-full sm:max-w-xs">
            <label
              htmlFor="filter-area"
              className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"
            >
              <Filter className="size-3.5 text-primary" />
              Area
            </label>
            <select
              id="filter-area"
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value as SjamAreaId | "all")}
              className={FILTER_SELECT_CLASS}
            >
              <option value="all">All areas</option>
              {SJAM_ACTIVITY_AREAS.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.shortLabel} — {area.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {scopedEntries.length === 0 ? (
          <p className="text-sm text-muted-foreground py-10 text-center border border-dashed border-border rounded-xl bg-muted/20">
            {emptyDayMessage}
          </p>
        ) : (
          [...groupedByArea.entries()].map(([areaKey, areaEntries]) => {
            const areaMeta =
              areaKey === "other"
                ? { label: "Other", shortLabel: "—" }
                : SJAM_ACTIVITY_AREAS.find((a) => a.id === areaKey)!;

            return (
              <section
                key={areaKey}
                className="rounded-xl border border-border overflow-hidden bg-card shadow-sm"
              >
                <div className="px-4 py-3 bg-primary/5 border-b border-border flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                      {areaMeta.shortLabel}
                    </p>
                    <p className="text-sm font-semibold text-foreground">{areaMeta.label}</p>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {areaEntries.length} item{areaEntries.length === 1 ? "" : "s"}
                  </span>
                </div>
                <ul className="divide-y divide-border">
                  {areaEntries.map((entry) => (
                    <li key={entry.entryKey}>
                      <button
                        type="button"
                        onClick={() => onSelectEntry(entry)}
                        className={cn(
                          "w-full text-left px-4 py-4",
                          "hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                          selected && isSameCalendarDay(entry.startsAt, selected) && "bg-primary/5",
                        )}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <div>
                            <p className="text-xs font-medium text-primary tabular-nums">
                              {entry.startsAt.toLocaleDateString("en-MY", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                              })}
                            </p>
                            <p className="font-semibold text-foreground leading-snug mt-0.5">
                              {entry.title}
                            </p>
                          </div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider shrink-0 px-2 py-0.5 rounded bg-secondary/15 text-secondary">
                            {entry.tag}
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
                        <p className="text-xs text-muted-foreground mt-2">
                        {entry.tag === "Competition" ? "View details →" : "Register →"}
                      </p>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })
        )}
      </div>
    </div>
  );
}
