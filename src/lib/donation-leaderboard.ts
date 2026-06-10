export type DonationLeaderboardEntry = {
  dateTime: string;
  donor: string;
  amount: number;
};

/** Summary totals shown on the donate page footer. */
export const DONATION_PAGE_TOTAL_RAISED = 150_888;
export const DONATION_PAGE_TARGET = 200_000;

/** Mock leaderboard for the donate page (public-facing summary only). */
export const donationLeaderboard: DonationLeaderboardEntry[] = [
  { dateTime: "10 Jun 2026, 09:12", donor: "Dato Lim", amount: 500 },
  { dateTime: "10 Jun 2026, 08:45", donor: "Mr. Adam", amount: 100 },
  { dateTime: "10 Jun 2026, 08:30", donor: "anonymous", amount: 100 },
  { dateTime: "09 Jun 2026, 17:22", donor: "Lee Family Trust", amount: 5_000 },
  { dateTime: "09 Jun 2026, 11:18", donor: "Anonymous", amount: 2_500 },
  { dateTime: "08 Jun 2026, 16:30", donor: "Petaling Jaya Community Group", amount: 2_000 },
  { dateTime: "08 Jun 2026, 13:05", donor: "A. Rahman", amount: 1_500 },
  { dateTime: "07 Jun 2026, 10:47", donor: "Klang Valley Rotaract", amount: 1_200 },
];

/** Running total from oldest upward — each row adds its amount to the previous total. */
export function getDonationLeaderboardRows() {
  const oldestFirst = [...donationLeaderboard].reverse();
  let running = 0;

  const oldestFirstWithTotals = oldestFirst.map((entry) => {
    running += entry.amount;
    return { ...entry, total: running };
  });

  return [...oldestFirstWithTotals].reverse();
}

export function formatDonationRm(amount: number) {
  return `RM${amount.toLocaleString("en-MY")}`;
}
