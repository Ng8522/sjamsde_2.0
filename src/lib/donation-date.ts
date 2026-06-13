export function formatDonationDate(value: string) {
  const datePart = value.slice(0, 10);
  const parsed = new Date(`${datePart}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString("en-MY", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function normalizeDonationDate(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;

  const comma = trimmed.indexOf(",");
  if (comma > 0) return trimmed.slice(0, comma).trim();

  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    return formatDonationDate(trimmed);
  }

  return trimmed;
}

export function toDateInputValue(date = new Date()) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function toDateInputValueFromDonationDate(value: string) {
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    return trimmed.slice(0, 10);
  }

  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    return toDateInputValue(parsed);
  }

  return toDateInputValue();
}
