export type DonationSummary = {
  target: number;
  raised: number;
  donationCount: number;
};

export type DonorRecord = {
  id: string;
  donorName: string;
  transactionRef?: string;
  amount: number;
  dateTime: string;
  createdAt: string;
};

export type DonationLeaderboardRow = {
  dateTime: string;
  donor: string;
  amount: number;
  total: number;
  transactionRef?: string;
};
