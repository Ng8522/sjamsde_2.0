const STORAGE_KEY = "sjamsde_donation_admin_token";

const API_BASE = import.meta.env.DONATION_API_URL ?? "";

function donationApiUrl(path: string) {
  return API_BASE ? `${API_BASE.replace(/\/$/, "")}${path}` : path;
}

export function getAdminToken() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(STORAGE_KEY);
}

export function setAdminToken(token: string) {
  sessionStorage.setItem(STORAGE_KEY, token);
}

export function clearAdminToken() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function isAdminLoggedIn() {
  return Boolean(getAdminToken());
}

export function adminAuthHeaders() {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function loginAdmin(username: string, password: string) {
  const response = await fetch(donationApiUrl("/api/admin/login"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    let message = `Login failed (${response.status})`;
    try {
      const data = (await response.json()) as { error?: string };
      if (data.error) message = data.error;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  const data = (await response.json()) as { token: string };
  setAdminToken(data.token);
}

export async function verifyAdminSession() {
  const token = getAdminToken();
  if (!token) return false;

  const response = await fetch(donationApiUrl("/api/admin/session"), {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    clearAdminToken();
    return false;
  }

  const data = (await response.json()) as { authenticated?: boolean };
  if (!data.authenticated) {
    clearAdminToken();
    return false;
  }

  return true;
}
