export function formatDonorName(row: { title: string; name: string }) {
  return row.title ? `${row.title} ${row.name}` : row.name;
}

export function formatDonationRm(amount: number) {
  return `RM${amount.toLocaleString("en-MY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
