import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isAdminLoggedIn, loginAdmin } from "@/lib/admin-auth";

type LoginSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/donations/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : "/donations/entry",
  }),
  beforeLoad: () => {
    if (isAdminLoggedIn()) {
      throw redirect({ to: "/donations/entry" });
    }
  },
  component: DonationAdminLoginPage,
  head: () => ({
    meta: [
      { title: "Admin Login — SJAM Selangor" },
      {
        name: "description",
        content: "Sign in to record donations.",
      },
    ],
  }),
});

function DonationAdminLoginPage() {
  const navigate = useNavigate();
  const { redirect: redirectTo } = Route.useSearch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await loginAdmin(username.trim(), password);
      await navigate({ to: redirectTo });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setIsLoading(false);
    }
  };

  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-md items-center px-6 py-12">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="size-5 text-primary" aria-hidden />
                Admin login
              </CardTitle>
              <CardDescription>
                Sign in to record donations. This page is for SJAM staff only.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error ? (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                  </div>
                ) : null}

                <div className="space-y-2">
                  <Label htmlFor="username">Email</Label>
                  <Input
                    id="username"
                    type="email"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="admin@gmail.com"
                    autoComplete="username"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" aria-hidden />
                      Signing in…
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                <Link to="/donate" className="text-primary hover:underline">
                  Back to public donate page
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}
