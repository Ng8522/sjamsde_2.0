import { courses, portalEvents, type Course, type PortalEvent } from "@/lib/mock-data";

export type ScheduleEntry = {
  entryKey: string;
  kind: "event" | "course"; 
  startsAt: Date;
  title: string;
  tag: string;
  time: string;
  location: string;
  detail: string;
  eventId?: string;
  courseId?: string;
  sessionId?: string;
};

export function parseMockDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function isSameCalendarDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function eventToEntries(event: PortalEvent & { startsAt: string }): ScheduleEntry[] {
  return [
    {
      entryKey: `event-${event.id}`,
      kind: "event",
      startsAt: parseMockDate(event.startsAt),
      title: event.title,
      tag: event.tag,
      time: event.time,
      location: event.location,
      detail: `${event.spots - event.registered} spots left`,
      eventId: event.id,
    },
  ];
}

export function courseToEntries(course: Course & { sessions: string[] }): ScheduleEntry[] {
  return course.sessions.map((iso) => ({
    entryKey: `course-${course.id}-${iso}`,
    kind: "course" as const,
    startsAt: parseMockDate(iso),
    title: course.title,
    tag: course.level,
    time: course.time,
    location: course.location,
    detail: `RM ${course.fee} · ${course.seats - course.enrolled} seats`,
    courseId: course.id,
    sessionId: iso,
  }));
}

export function getEventScheduleEntries(): ScheduleEntry[] {
  return portalEvents.flatMap((e) => eventToEntries(e as PortalEvent & { startsAt: string }));
}

export function getCourseScheduleEntries(): ScheduleEntry[] {
  return courses.flatMap((c) => courseToEntries(c as Course & { sessions: string[] }));
}

export function getAllScheduleEntries(): ScheduleEntry[] {
  return [...getEventScheduleEntries(), ...getCourseScheduleEntries()].sort(
    (a, b) => a.startsAt.getTime() - b.startsAt.getTime(),
  );
}

export function entriesOnDate(entries: ScheduleEntry[], date: Date) {
  return entries.filter((e) => isSameCalendarDay(e.startsAt, date));
}

export function datesWithEntries(entries: ScheduleEntry[]) {
  return entries.map((e) => e.startsAt);
}
