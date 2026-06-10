import { getDonationLeaderboardRows } from "@/lib/donation-leaderboard";

export type DonationLeaderboardRow = {
  dateTime: string;
  donor: string;
  amount: number;
  total: number;
};

const API_BASE = import.meta.env.DONATION_API_URL ?? "";
const RECENT_PATH = "/api/donations/recent";

export async function fetchDonationLeaderboard(): Promise<{
  rows: DonationLeaderboardRow[];
  source: "api" | "mock";
}> {
  if (!API_BASE && !import.meta.env.DEV) {
    return { rows: getDonationLeaderboardRows(), source: "mock" };
  }

  const url = API_BASE ? `${API_BASE.replace(/\/$/, "")}${RECENT_PATH}` : RECENT_PATH;

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Donation API ${response.status}`);
    }

    const data = (await response.json()) as { rows: DonationLeaderboardRow[] };
    if (!Array.isArray(data.rows) || data.rows.length === 0) {
      return { rows: getDonationLeaderboardRows(), source: "mock" };
    }

    return { rows: data.rows, source: "api" };
  } catch {
    return { rows: getDonationLeaderboardRows(), source: "mock" };
  }
}
