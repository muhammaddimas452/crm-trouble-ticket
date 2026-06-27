import { getToken, logoutUser } from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function request(endpoint, options = {}) {
  const token = getToken();
  
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && endpoint !== "/login") {
    logoutUser();
    // Redirect to login if path is not already login page
    if (window.location.pathname !== "/" && window.location.pathname !== "/crm-trouble-ticket/") {
      window.location.href = "/";
    }
    throw new Error("Session expired. Please log in again.");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || "Terjadi kesalahan pada server");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const apiGet = (endpoint) => request(endpoint, { method: "GET" });
export const apiPost = (endpoint, body) => request(endpoint, { method: "POST", body: JSON.stringify(body) });
export const apiPut = (endpoint, body) => request(endpoint, { method: "PUT", body: JSON.stringify(body) });
export const apiPatch = (endpoint, body) => request(endpoint, { method: "PATCH", body: JSON.stringify(body) });
export const apiDelete = (endpoint) => request(endpoint, { method: "DELETE" });

