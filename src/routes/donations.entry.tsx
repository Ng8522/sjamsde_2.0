import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, FileSpreadsheet, Loader2, LogOut, Pencil, PlusCircle, Search, Trash2, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  createDonation,
  deleteDonation,
  downloadDonationImportTemplate,
  fetchDonationList,
  fetchDonationSummary,
  importDonationsFromFile,
  updateDonation,
  type DonationImportResult,
  type DonationLeaderboardRow,
} from "@/lib/donation-api";
import {
  DEFAULT_DONOR_TITLE,
  DONOR_TITLE_OPTIONS,
  donorTitleLabel,
  donorTitleToForm,
  resolveDonorTitle,
} from "@/lib/donor-titles";
import { formatDonationRm } from "@/lib/donation-leaderboard";
import {
  formatDonationDate,
  toDateInputValue,
  toDateInputValueFromDonationDate,
} from "@/lib/donation-date";

const DONOR_PAGE_SIZE = 15;

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

function emptyForm() {
  return {
    title: DEFAULT_DONOR_TITLE,
    customTitle: "",
    name: "",
    transactionRef: "",
    amount: "",
    transactionTime: toDateInputValue(),
  };
}

function rowToForm(row: DonationLeaderboardRow) {
  const { title, customTitle } = donorTitleToForm(row.title);
  return {
    title,
    customTitle,
    name: row.name,
    transactionRef: row.transactionRef ?? "",
    amount: String(row.amount),
    transactionTime: toDateInputValueFromDonationDate(row.transactionTime),
  };
}

function DonationEntryPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DonationLeaderboardRow | null>(null);
  const [formError, setFormError] = useState("");
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<DonationImportResult | null>(null);
  const [importError, setImportError] = useState("");
  const [templateError, setTemplateError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchQuery(searchInput.trim());
      setPage(1);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const summaryQuery = useQuery({
    queryKey: ["donation-summary"],
    queryFn: fetchDonationSummary,
    refetchInterval: 15_000,
  });

  const recentQuery = useQuery({
    queryKey: ["donation-list", page, searchQuery, DONOR_PAGE_SIZE],
    queryFn: () =>
      fetchDonationList({ page, pageSize: DONOR_PAGE_SIZE, q: searchQuery || undefined }),
    refetchInterval: 15_000,
  });

  const invalidateDonations = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ["donation-summary"] }),
      queryClient.invalidateQueries({ queryKey: ["donation-list"] }),
      queryClient.invalidateQueries({ queryKey: ["donation-recent"] }),
    ]);

  const createMutation = useMutation({
    mutationFn: createDonation,
    onSuccess: async () => {
      setForm(emptyForm());
      setEditingId(null);
      setFormError("");
      updateMutation.reset();
      await invalidateDonations();
    },
    onError: (error: Error) => {
      setFormError(error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateDonation,
    onSuccess: async () => {
      setForm(emptyForm());
      setEditingId(null);
      setFormError("");
      createMutation.reset();
      await invalidateDonations();
    },
    onError: (error: Error) => {
      setFormError(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDonation,
    onSuccess: async () => {
      setDeleteTarget(null);
      if (editingId && deleteTarget?.id === editingId) {
        setForm(emptyForm());
        setEditingId(null);
      }
      await invalidateDonations();
    },
    onError: (error: Error) => {
      setFormError(error.message);
      setDeleteTarget(null);
    },
  });

  const importMutation = useMutation({
    mutationFn: importDonationsFromFile,
    onSuccess: async (result) => {
      setImportResult(result);
      setImportError("");
      setImportFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await invalidateDonations();
    },
    onError: (error: Error) => {
      setImportResult(null);
      setImportError(error.message);
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

    const payload = {
      title: title,
      name: form.name.trim(),
      transactionRef: form.transactionRef.trim() || undefined,
      amount,
      transactionTime: formatDonationDate(form.transactionTime),
    };

    if (editingId) {
      updateMutation.reset();
      updateMutation.mutate({ id: editingId, ...payload });
      return;
    }

    createMutation.reset();
    createMutation.mutate(payload);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm());
    setFormError("");
    createMutation.reset();
    updateMutation.reset();
  };

  const handleEditRow = (row: DonationLeaderboardRow) => {
    setEditingId(row.id);
    setForm(rowToForm(row));
    setFormError("");
    createMutation.reset();
    updateMutation.reset();
  };

  const handleImport = () => {
    setImportError("");
    setImportResult(null);
    if (!importFile) {
      setImportError("Choose an Excel or CSV file first.");
      return;
    }
    importMutation.mutate(importFile);
  };

  const summary = summaryQuery.data;
  const listData = recentQuery.data;
  const donorRows = listData?.rows ?? [];
  const totalDonors = listData?.total ?? 0;
  const totalPages = listData?.totalPages ?? 0;
  const pageStart = totalDonors === 0 ? 0 : (page - 1) * DONOR_PAGE_SIZE + 1;
  const pageEnd = Math.min(page * DONOR_PAGE_SIZE, totalDonors);

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

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="size-5 text-primary" aria-hidden />
                Import from Excel
              </CardTitle>
              <CardDescription>
                Upload a spreadsheet with columns: Title, Name, Amount, Transaction Date,
                TransactionRef. Bank statements (CSV/Excel) are also supported.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {importError ? (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {importError}
                </div>
              ) : null}

              {importResult ? (
                <div className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  Imported {importResult.imported} of {importResult.found} rows
                  {importResult.skipped > 0 ? ` (${importResult.skipped} duplicates skipped)` : ""}.
                  Total raised: {formatDonationRm(importResult.raised)}.
                </div>
              ) : null}

              {templateError ? (
                <p className="text-sm text-destructive">{templateError}</p>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="min-w-0 flex-1 space-y-2">
                  <Label htmlFor="importFile">Excel / CSV file</Label>
                  <Input
                    ref={fileInputRef}
                    id="importFile"
                    type="file"
                    accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                    onChange={(event) => {
                      setImportFile(event.target.files?.[0] ?? null);
                      setImportResult(null);
                      setImportError("");
                    }}
                  />
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={async () => {
                      setTemplateError("");
                      try {
                        await downloadDonationImportTemplate();
                      } catch (error) {
                        setTemplateError(
                          error instanceof Error ? error.message : "Could not download template",
                        );
                      }
                    }}
                  >
                    Download template
                  </Button>
                  <Button
                    type="button"
                    disabled={importMutation.isPending || !importFile}
                    onClick={handleImport}
                  >
                    {importMutation.isPending ? (
                      <>
                        <Loader2 className="animate-spin" aria-hidden />
                        Importing…
                      </>
                    ) : (
                      <>
                        <Upload aria-hidden />
                        Upload
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {editingId ? (
                    <Pencil className="size-5 text-primary" aria-hidden />
                  ) : (
                    <PlusCircle className="size-5 text-primary" aria-hidden />
                  )}
                  {editingId ? "Edit transaction" : "New transaction"}
                </CardTitle>
                <CardDescription>
                  {editingId
                    ? "Update details for the selected donation."
                    : "Fill in details from your bank app or statement."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formError ? (
                    <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {formError}
                    </div>
                  ) : null}

                  {createMutation.isSuccess && !editingId ? (
                    <div className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      Donation saved. It will appear on the public leaderboard shortly.
                    </div>
                  ) : null}

                  {updateMutation.isSuccess ? (
                    <div className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      Donation updated.
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
                            {donorTitleLabel(option)}
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
                    <Label htmlFor="transactionTime">Transaction date</Label>
                    <Input
                      id="transactionTime"
                      type="date"
                      value={form.transactionTime}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, transactionTime: event.target.value }))
                      }
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={createMutation.isPending || updateMutation.isPending}
                    >
                      {createMutation.isPending || updateMutation.isPending ? (
                        <>
                          <Loader2 className="animate-spin" aria-hidden />
                          Saving…
                        </>
                      ) : editingId ? (
                        "Update donation"
                      ) : (
                        "Save donation"
                      )}
                    </Button>
                    {editingId ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancelEdit}
                        disabled={createMutation.isPending || updateMutation.isPending}
                      >
                        Cancel
                      </Button>
                    ) : null}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All donations</CardTitle>
                <CardDescription>
                  Search and browse every donor record in the database.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative max-w-md">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                  <Input
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    placeholder="Search by title, name, reference, or date…"
                    className="pl-9"
                    aria-label="Search donations"
                  />
                </div>

                {recentQuery.isLoading ? (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                ) : donorRows.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {searchQuery
                      ? `No donations match "${searchQuery}".`
                      : "No donations recorded yet."}
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[28rem] text-left text-sm">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground">
                          <th className="pb-2 pr-3 font-medium">Title</th>
                          <th className="pb-2 pr-3 font-medium">Name</th>
                          <th className="pb-2 pr-3 font-medium">Transaction date</th>
                          <th className="pb-2 pr-3 font-medium">Reference</th>
                          <th className="pb-2 text-right font-medium">Amount</th>
                          <th className="pb-2 pl-3 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {donorRows.map((row) => (
                          <tr
                            key={row.id}
                            className={`border-b border-border/60 ${editingId === row.id ? "bg-primary/5" : ""}`}
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
                            <td className="py-2.5 pl-3 text-right">
                              <div className="inline-flex gap-1">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="size-8"
                                  aria-label={`Edit ${row.name}`}
                                  onClick={() => handleEditRow(row)}
                                >
                                  <Pencil className="size-4" aria-hidden />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="size-8 text-destructive hover:text-destructive"
                                  aria-label={`Delete ${row.name}`}
                                  onClick={() => setDeleteTarget(row)}
                                >
                                  <Trash2 className="size-4" aria-hidden />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {totalDonors > 0 ? (
                  <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground">
                      Showing {pageStart}–{pageEnd} of {totalDonors.toLocaleString()}
                      {searchQuery ? ` matching "${searchQuery}"` : ""}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={page <= 1 || recentQuery.isFetching}
                        onClick={() => setPage((current) => Math.max(1, current - 1))}
                      >
                        Previous
                      </Button>
                      <span className="min-w-[7rem] text-center text-sm tabular-nums text-muted-foreground">
                        Page {page} of {Math.max(totalPages, 1)}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={page >= totalPages || recentQuery.isFetching}
                        onClick={() => setPage((current) => current + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete donation?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes {deleteTarget?.name ?? "this donation"} ({deleteTarget ? formatDonationRm(deleteTarget.amount) : ""})
              from the database and public totals. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteMutation.isPending || !deleteTarget}
              onClick={(event) => {
                event.preventDefault();
                if (deleteTarget) deleteMutation.mutate(deleteTarget.id);
              }}
            >
              {deleteMutation.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SiteLayout>
  );
}
