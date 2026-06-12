import type { DonationLeaderboardRow, DonorRecord } from "./types.js";

/** Newest first, with running total from oldest donation upward. */
export function toLeaderboardRows(donors: DonorRecord[]): DonationLeaderboardRow[] {
  const chronological = [...donors].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  let running = 0;
  const withTotals = new Map(
    chronological.map((entry) => {
      running += entry.amount;
      return [
        entry.id,
        {
          dateTime: entry.dateTime,
          donor: entry.donorName,
          amount: entry.amount,
          total: running,
          transactionRef: entry.transactionRef,
        },
      ] as const;
    }),
  );

  return [...donors]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((entry) => withTotals.get(entry.id)!);
}
