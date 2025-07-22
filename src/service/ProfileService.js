import axios from "axios";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const getProfile = async (user_id) => {
  const access_token = sessionStorage.getItem("session_token");
  if (!access_token) throw new Error("No access token available");
  const response = await axios.get(
    `${SUPABASE_URL}/rest/v1/profiles?id=eq.${user_id}`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return response.data[0];
};

export const updateProfile = async (user_id, profileData) => {
  const access_token = sessionStorage.getItem("session_token");
  if (!access_token) throw new Error("No access token available");
  const response = await axios.patch(
    `${SUPABASE_URL}/rest/v1/profiles?id=eq.${user_id}`,
    profileData,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
    }
  );
  return response.data[0];
};

export const updateProfileData = async (user_id, data) => {
  const access_token = sessionStorage.getItem("session_token");
  if (!access_token) throw new Error("No access token available");
  const { email, ...rest } = data;
  const response = await axios.patch(
    `${SUPABASE_URL}/rest/v1/profiles?id=eq.${user_id}`,
    rest,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
    }
  );
  return response.data[0];
};

export const logoutUser = async () => {
  const access_token = sessionStorage.getItem("session_token");
  if (!access_token) return;
  try {
    await axios.post(
      `${SUPABASE_URL}/auth/v1/logout`,
      {},
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {

  }
  sessionStorage.removeItem("session_token");
  sessionStorage.removeItem("refresh_token");
  sessionStorage.removeItem("expires_at");
};

export const uploadProfileImage = async (file, user_id) => {
  const access_token = sessionStorage.getItem("session_token");
  if (!access_token) throw new Error("No access token available");
  const filePath = `${user_id}/${Date.now()}_${file.name}`;
  const formData = new FormData();
  formData.append("file", file);
  await axios.post(
    `${SUPABASE_URL}/storage/v1/object/avatars/${filePath}`,
    formData,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return `${SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`;
};