import { useEffect, useMemo, useState } from "react";
import { Clock, Filter, MapPin } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      {/* Calendar */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-border bg-muted/30 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="text-lg">Calendar</CardTitle>
              <CardDescription className="mt-1.5">
                Days with activities are marked. Choose month and year to change the view.
              </CardDescription>
            </div>
            <p className="text-sm text-muted-foreground sm:text-right sm:pt-1 shrink-0">
              {monthEntries.length} activit{monthEntries.length === 1 ? "y" : "ies"} this month
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="space-y-1.5 min-w-[140px] flex-1 sm:flex-none">
              <label htmlFor="activity-month" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Month
              </label>
              <Select value={String(viewMonth)} onValueChange={(v) => setViewMonth(Number(v))}>
                <SelectTrigger id="activity-month" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTH_NAMES.map((name, index) => (
                    <SelectItem key={name} value={String(index)}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 min-w-[120px] flex-1 sm:flex-none">
              <label htmlFor="activity-year" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Year
              </label>
              <Select value={String(viewYear)} onValueChange={(v) => setViewYear(Number(v))}>
                <SelectTrigger id="activity-year" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="p-5 md:p-8 flex justify-center md:justify-center bg-muted/10">
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
                  month: "w-full gap-4",
                  month_caption: "h-11 mb-2",
                  caption_label: "sr-only",
                  table: "w-full",
                  weekdays: "mb-2",
                  weekday: "text-sm font-medium flex-1",
                  week: "w-full mt-1",
                  day: "flex-1",
                  day_button: "text-base",
                  button_previous: "size-11",
                  button_next: "size-11",
                }}
                modifiers={{ booked: bookedDays }}
                modifiersClassNames={{
                  booked:
                    "[&_button]:font-semibold [&_button]:relative [&_button]:after:absolute [&_button]:after:bottom-1.5 [&_button]:after:left-1/2 [&_button]:after:-translate-x-1/2 [&_button]:after:size-2 [&_button]:after:rounded-full [&_button]:after:bg-primary",
                }}
              />
              <p className="sr-only">Days with a dot have scheduled activities.</p>
            </div>

            <div className="p-4 md:p-6 flex flex-col min-h-[280px] md:min-h-0">
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

              <div className="flex-1 space-y-3 overflow-y-auto max-h-[min(24rem,50vh)] md:max-h-88 pr-1">
                {selectedDayEntries.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-6 text-center border border-dashed border-border rounded-lg bg-muted/20">
                    {emptyDayMessage}
                  </p>
                ) : (
                  selectedDayEntries.map((entry) => (
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
                      <p className="text-xs text-muted-foreground mt-2">Register →</p>
                    </button>
                  ))
                )}
              </div>

              <p className="mt-4 text-xs text-muted-foreground flex items-center gap-2 pt-2 border-t border-border/60">
                <span className="size-2 rounded-full bg-primary shrink-0" aria-hidden />
                Dot on a date = activity scheduled
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* List by area */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{listHeading}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {scopedEntries.length} activit{scopedEntries.length === 1 ? "y" : "ies"} shown, grouped by area
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
            <Select value={areaFilter} onValueChange={(v) => setAreaFilter(v as SjamAreaId | "all")}>
              <SelectTrigger id="filter-area" className="bg-background">
                <SelectValue placeholder="All areas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All areas</SelectItem>
                {SJAM_ACTIVITY_AREAS.map((area) => (
                  <SelectItem key={area.id} value={area.id}>
                    {area.shortLabel} — {area.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              <section key={areaKey} className="rounded-xl border border-primary/15 overflow-hidden bg-white/60">
                <div className="px-4 py-3 bg-primary/5 border-b border-primary/10 flex items-center justify-between gap-2">
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
                          "w-full text-left px-4 py-4 transition-colors",
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
                        <p className="text-xs text-muted-foreground mt-2">Register →</p>
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
