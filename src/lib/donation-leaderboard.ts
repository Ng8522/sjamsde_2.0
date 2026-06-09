export type DonationLeaderboardEntry = {
  dateTime: string;
  donor: string;
  amount: number;
};

/** Mock leaderboard for the donate page (public-facing summary only). */
export const donationLeaderboard: DonationLeaderboardEntry[] = [
  {
    dateTime: "08 Jun 2026, 15:42",
    donor: "Lee Family Trust",
    amount: 5000,
  },
  {
    dateTime: "07 Jun 2026, 11:18",
    donor: "Anonymous",
    amount: 2500,
  },
  {
    dateTime: "06 Jun 2026, 09:05",
    donor: "Petaling Jaya Community Group",
    amount: 2000,
  },
  {
    dateTime: "05 Jun 2026, 16:30",
    donor: "A. Rahman",
    amount: 1500,
  },
  {
    dateTime: "04 Jun 2026, 13:22",
    donor: "Klang Valley Rotaract",
    amount: 1200,
  },
  {
    dateTime: "03 Jun 2026, 10:47",
    donor: "Anonymous",
    amount: 1000,
  },
  {
    dateTime: "02 Jun 2026, 08:15",
    donor: "Shah Alam Youth Club",
    amount: 800,
  },
  {
    dateTime: "01 Jun 2026, 19:03",
    donor: "S. Tan",
    amount: 650,
  },
  {
    dateTime: "31 May 2026, 14:56",
    donor: "Subang Jaya Residents Assoc.",
    amount: 500,
  },
  {
    dateTime: "30 May 2026, 12:08",
    donor: "Anonymous",
    amount: 300,
  },
];

/** Running total from oldest (no. 10) upward — each row adds its amount to the previous total. */
export function getDonationLeaderboardRows() {
  const oldestFirst = [...donationLeaderboard].reverse();
  let running = 0;

  const oldestFirstWithTotals = oldestFirst.map((entry) => {
    running += entry.amount;
    return { ...entry, total: running };
  });

  return [...oldestFirstWithTotals].reverse();
}
