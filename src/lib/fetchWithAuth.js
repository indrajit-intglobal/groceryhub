import { getValidAccessToken } from "../service/AuthService";

export async function fetchWithAuth(url, options = {}) {
  const token = await getValidAccessToken();
  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };
  return fetch(url, { ...options, headers });
} 