export function formatDonorName(row: { title: string; name: string }) {
  return row.title ? `${row.title} ${row.name}` : row.name;
}

export function isAnonymousDonor(row: { title: string; name: string }) {
  const name = row.name.trim().toLowerCase();
  if (!name || name === "anonymous") return true;
  return name.startsWith("anonymous ");
}

/** Donors for the public ticker: skip anonymous, highest amount first. */
export function tickerDonorRows<T extends { title: string; name: string; amount: number }>(rows: T[]) {
  return [...rows]
    .filter((row) => !isAnonymousDonor(row))
    .sort((a, b) => b.amount - a.amount);
}

export function formatDonationRm(amount: number) {
  return `RM${amount.toLocaleString("en-MY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
