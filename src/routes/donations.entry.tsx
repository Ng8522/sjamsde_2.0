import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Loader2, LogOut, PlusCircle } from "lucide-react";
import { useState } from "react";

import { SiteLayout } from "@/components/site-layout";
import { clearAdminToken, isAdminLoggedIn } from "@/lib/admin-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createDonation, fetchDonationRecent, fetchDonationSummary } from "@/lib/donation-api";
import {
  DEFAULT_DONOR_TITLE,
  DONOR_TITLE_OPTIONS,
  resolveDonorTitle,
} from "@/lib/donor-titles";
import { formatDonationRm } from "@/lib/donation-leaderboard";

export const Route = createFileRoute("/donations/entry")({
  beforeLoad: () => {
    if (!isAdminLoggedIn()) {
      throw redirect({
        to: "/donations/login",
        search: { redirect: "/donations/entry" },
      });
    }
  },
  component: DonationEntryPage,
  head: () => ({
    meta: [
      { title: "Record Donation — SJAM Selangor" },
      {
        name: "description",
        content: "Record incoming DuitNow and bank transfer donations.",
      },
    ],
  }),
});

function toDateTimeLocalValue(date = new Date()) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatDonationDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-MY", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function emptyForm() {
  return {
    title: DEFAULT_DONOR_TITLE,
    customTitle: "",
    name: "",
    transactionRef: "",
    amount: "",
    transactionTime: toDateTimeLocalValue(),
  };
}

function DonationEntryPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const summaryQuery = useQuery({
    queryKey: ["donation-summary"],
    queryFn: fetchDonationSummary,
    refetchInterval: 15_000,
  });

  const recentQuery = useQuery({
    queryKey: ["donation-recent"],
    queryFn: fetchDonationRecent,
    refetchInterval: 15_000,
  });

  const createMutation = useMutation({
    mutationFn: createDonation,
    onSuccess: async () => {
      setForm(emptyForm());
      setFormError("");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["donation-summary"] }),
        queryClient.invalidateQueries({ queryKey: ["donation-recent"] }),
      ]);
    },
    onError: (error: Error) => {
      setFormError(error.message);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFormError("");

    const amount = Number(form.amount);
    const title = resolveDonorTitle(form.title, form.customTitle);

    if (!form.name.trim()) {
      setFormError("Donor name is required.");
      return;
    }
    if (form.title === "Lain-lain" && !title) {
      setFormError("Please enter a custom title.");
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setFormError("Amount must be a positive number.");
      return;
    }

    createMutation.reset();
    createMutation.mutate({
      title: title || undefined,
      name: form.name.trim(),
      transactionRef: form.transactionRef.trim() || undefined,
      amount,
      transactionTime: formatDonationDateTime(form.transactionTime),
    });
  };

  const summary = summaryQuery.data;
  const recentRows = recentQuery.data?.rows ?? [];

  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <Link
            to="/donate"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to donate page
          </Link>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Record Donation</h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Key in DuitNow, TNG, or bank transfer details when a payment arrives. Duplicates
                with the same transaction reference are skipped automatically.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="shrink-0"
              onClick={async () => {
                clearAdminToken();
                await navigate({ to: "/donations/login" });
              }}
            >
              <LogOut aria-hidden />
              Sign out
            </Button>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total raised</CardDescription>
                <CardTitle className="text-2xl tabular-nums">
                  {summary ? formatDonationRm(summary.raised) : "—"}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Target</CardDescription>
                <CardTitle className="text-2xl tabular-nums">
                  {summary ? formatDonationRm(summary.target) : "—"}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Donors recorded</CardDescription>
                <CardTitle className="text-2xl tabular-nums">
                  {summary?.donationCount ?? "—"}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="size-5 text-primary" aria-hidden />
                  New transaction
                </CardTitle>
                <CardDescription>Fill in details from your bank app or statement.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formError ? (
                    <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {formError}
                    </div>
                  ) : null}

                  {createMutation.isSuccess ? (
                    <div className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      Donation saved. It will appear on the public leaderboard shortly.
                    </div>
                  ) : null}

                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Select
                      value={form.title}
                      onValueChange={(value) =>
                        setForm((current) => ({
                          ...current,
                          title: value,
                          customTitle: value === "Lain-lain" ? current.customTitle : "",
                        }))
                      }
                    >
                      <SelectTrigger id="title">
                        <SelectValue placeholder="Select title" />
                      </SelectTrigger>
                      <SelectContent>
                        {DONOR_TITLE_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {form.title === "Lain-lain" ? (
                    <div className="space-y-2">
                      <Label htmlFor="customTitle">Custom title</Label>
                      <Input
                        id="customTitle"
                        value={form.customTitle}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, customTitle: event.target.value }))
                        }
                        placeholder="Enter title"
                        autoComplete="honorific-prefix"
                        required
                      />
                    </div>
                  ) : null}

                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, name: event.target.value }))
                      }
                      placeholder="Donor name"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transactionRef">Transaction reference</Label>
                    <Input
                      id="transactionRef"
                      value={form.transactionRef}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, transactionRef: event.target.value }))
                      }
                      placeholder="Transaction reference"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (RM)</Label>
                    <Input
                      id="amount"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={form.amount}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, amount: event.target.value }))
                      }
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transactionTime">Transaction time</Label>
                    <Input
                      id="transactionTime"
                      type="datetime-local"
                      value={form.transactionTime}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, transactionTime: event.target.value }))
                      }
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                    {createMutation.isPending ? (
                      <>
                        <Loader2 className="animate-spin" aria-hidden />
                        Saving…
                      </>
                    ) : (
                      "Save donation"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent donations</CardTitle>
                <CardDescription>Latest entries in the database.</CardDescription>
              </CardHeader>
              <CardContent>
                {recentQuery.isLoading ? (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                ) : recentRows.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No donations recorded yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[28rem] text-left text-sm">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground">
                          <th className="pb-2 pr-3 font-medium">Title</th>
                          <th className="pb-2 pr-3 font-medium">Name</th>
                          <th className="pb-2 pr-3 font-medium">Transaction time</th>
                          <th className="pb-2 pr-3 font-medium">Reference</th>
                          <th className="pb-2 text-right font-medium">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentRows.slice(0, 20).map((row, index) => (
                          <tr
                            key={`${row.name}-${row.transactionTime}-${index}`}
                            className="border-b border-border/60"
                          >
                            <td className="py-2.5 pr-3 text-muted-foreground">{row.title || "—"}</td>
                            <td className="py-2.5 pr-3 font-medium">{row.name}</td>
                            <td className="py-2.5 pr-3 whitespace-nowrap text-muted-foreground">
                              {row.transactionTime}
                            </td>
                            <td className="py-2.5 pr-3 text-muted-foreground">
                              {row.transactionRef ?? "—"}
                            </td>
                            <td className="py-2.5 text-right tabular-nums font-medium">
                              {formatDonationRm(row.amount)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
