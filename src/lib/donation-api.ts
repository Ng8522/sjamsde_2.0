export type DonationLeaderboardRow = {
  title: string;
  name: string;
  amount: number;
  transactionTime: string;
  total: number;
  transactionRef?: string;
};

export type DonationSummary = {
  target: number;
  raised: number;
  donationCount: number;
};

export type DonationRecentResponse = DonationSummary & {
  rows: DonationLeaderboardRow[];
};

export type DonorRecord = {
  id: string;
  title: string;
  name: string;
  transactionRef?: string;
  amount: number;
  transactionTime: string;
  createdAt: string;
};

export type CreateDonationInput = {
  title?: string;
  name: string;
  transactionRef?: string;
  amount: number;
  transactionTime?: string;
};

import { adminAuthHeaders } from "@/lib/admin-auth";

const API_BASE = import.meta.env.DONATION_API_URL ?? "";

function donationApiUrl(path: string) {
  return API_BASE ? `${API_BASE.replace(/\/$/, "")}${path}` : path;
}

async function parseApiError(response: Response) {
  try {
    const data = (await response.json()) as { error?: string };
    if (data.error) return data.error;
  } catch {
    // ignore
  }
  return `Donation API ${response.status}`;
}

export async function fetchDonationRecent(): Promise<DonationRecentResponse> {
  const response = await fetch(donationApiUrl("/api/donations/recent"), {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  const data = (await response.json()) as Partial<DonationRecentResponse> & {
    rows?: Array<
      Partial<DonationLeaderboardRow> & {
        donor?: string;
        dateTime?: string;
      }
    >;
  };

  const rows = Array.isArray(data.rows)
    ? data.rows.map((row) => {
        const title = String(row.title ?? "").trim();
        const name = String(row.name ?? row.donor ?? "").trim();
        return {
          title,
          name,
          amount: Number(row.amount ?? 0),
          transactionTime: String(row.transactionTime ?? row.dateTime ?? ""),
          total: Number(row.total ?? 0),
          transactionRef: row.transactionRef,
        };
      })
    : [];

  return {
    rows,
    target: Number(data.target ?? 0),
    raised: Number(data.raised ?? 0),
    donationCount: Number(data.donationCount ?? rows.length),
  };
}

/** @deprecated Use fetchDonationRecent */
export const fetchDonationLeaderboard = fetchDonationRecent;

export async function fetchDonationSummary(): Promise<DonationSummary> {
  const response = await fetch(donationApiUrl("/api/donations/summary"), {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as DonationSummary;
}

export async function createDonation(input: CreateDonationInput): Promise<DonorRecord> {
  const response = await fetch(donationApiUrl("/api/donations"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...adminAuthHeaders(),
    },
    body: JSON.stringify({
      title: input.title,
      name: input.name,
      transactionRef: input.transactionRef,
      amount: input.amount,
      transactionTime: input.transactionTime,
    }),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  const data = (await response.json()) as { donor: DonorRecord };
  return data.donor;
}
