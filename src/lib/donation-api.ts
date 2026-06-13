export type DonationLeaderboardRow = {
  id: string;
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

export type DonationListResponse = {
  rows: DonationLeaderboardRow[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type DonationListParams = {
  page?: number;
  pageSize?: number;
  q?: string;
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

export type UpdateDonationInput = CreateDonationInput & {
  id: string;
};

export type DonationImportResult = {
  ok: boolean;
  imported: number;
  skipped: number;
  found: number;
  raised: number;
  donationCount: number;
};

import { adminAuthHeaders } from "@/lib/admin-auth";
import { normalizeDonationDate } from "@/lib/donation-date";

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
          id: String(row.id ?? ""),
          title,
          name,
          amount: Number(row.amount ?? 0),
          transactionTime: normalizeDonationDate(
            String(row.transactionTime ?? row.dateTime ?? ""),
          ),
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

export async function fetchDonationList(
  params: DonationListParams = {},
): Promise<DonationListResponse> {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.pageSize) search.set("pageSize", String(params.pageSize));
  if (params.q?.trim()) search.set("q", params.q.trim());

  const query = search.toString();
  const response = await fetch(
    donationApiUrl(`/api/donations${query ? `?${query}` : ""}`),
    { headers: { Accept: "application/json" } },
  );

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  const data = (await response.json()) as Partial<DonationListResponse> & {
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
          id: String(row.id ?? ""),
          title,
          name,
          amount: Number(row.amount ?? 0),
          transactionTime: normalizeDonationDate(
            String(row.transactionTime ?? row.dateTime ?? ""),
          ),
          total: Number(row.total ?? 0),
          transactionRef: row.transactionRef,
        };
      })
    : [];

  const pageSize = Number(data.pageSize ?? params.pageSize ?? 15);
  const total = Number(data.total ?? rows.length);

  return {
    rows,
    total,
    page: Number(data.page ?? params.page ?? 1),
    pageSize,
    totalPages: Number(data.totalPages ?? (total > 0 ? Math.ceil(total / pageSize) : 0)),
  };
}

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

export async function updateDonation(input: UpdateDonationInput): Promise<DonorRecord> {
  const response = await fetch(donationApiUrl(`/api/donations/${encodeURIComponent(input.id)}`), {
    method: "PUT",
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

export async function deleteDonation(id: string): Promise<void> {
  const response = await fetch(donationApiUrl(`/api/donations/${encodeURIComponent(id)}`), {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      ...adminAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }
}

export function donationImportTemplateUrl() {
  return donationApiUrl("/api/donations/import/template.xlsx");
}

export async function downloadDonationImportTemplate() {
  const response = await fetch(donationImportTemplateUrl(), {
    headers: {
      ...adminAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "donation-import-template.xlsx";
  link.click();
  URL.revokeObjectURL(url);
}

export async function importDonationsFromFile(file: File): Promise<DonationImportResult> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(donationApiUrl("/api/donations/import"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...adminAuthHeaders(),
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as DonationImportResult;
}
