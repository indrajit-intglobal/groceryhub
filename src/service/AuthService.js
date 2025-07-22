  import axios from "axios";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Store tokens and expiry in sessionStorage after login
export const storeSession = (data) => {
  sessionStorage.setItem("session_token", data.access_token);
  sessionStorage.setItem("refresh_token", data.refresh_token);
  // expires_in is in seconds
  const expires_at = Date.now() + data.expires_in * 1000;
  sessionStorage.setItem("expires_at", expires_at.toString());
};

export const userLogin = async (data) => {
  try {
    const response = await axios.post(
      `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
      {
        email: data.email,
        password: data.password,
      },
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    storeSession(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Refresh token logic
export const refreshToken = async () => {
  const refresh_token = sessionStorage.getItem("refresh_token");
  if (!refresh_token) throw new Error("No refresh token available");
  const response = await axios.post(
    `${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
    { refresh_token },
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    }
  );
  storeSession(response.data);
  return response.data;
};

// Helper to get a valid access token (refresh if needed)
export const getValidAccessToken = async () => {
  const expires_at = parseInt(sessionStorage.getItem("expires_at"), 10);
  if (isNaN(expires_at) || Date.now() > expires_at - 60000) {
    await refreshToken();
  }
  return sessionStorage.getItem("session_token");
};

export const userSignup = async (data) => {
  try {
    const response = await axios.post(
      `${SUPABASE_URL}/auth/v1/signup`,
      {
        email: data.email,
        password: data.password,
      },
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Fetch the current user's profile from Supabase
export const getUserProfile = async () => {
  const access_token = sessionStorage.getItem("session_token");
  if (!access_token) throw new Error("No access token available");
  const response = await axios.get(
    `${SUPABASE_URL}/auth/v1/user`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return response.data;
};

export const signInWithGoogle = () => {
  const redirectTo = window.location.origin + "/"; 
  window.location.href = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}&apikey=${SUPABASE_ANON_KEY}`;
};
