import axios from "axios";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;



export const addUserCart = async (cartData) => {
  const accessToken = sessionStorage.getItem("session_token");
  const userId = cartData.id;

  for (let i = 0; i < cartData.data.length; i++) {
    const product = cartData.data[i];

    const data = {
      user_id: userId,
      product_id: product.id,
      quantity: product.quantity,
    };

    try {
      const response = await axios.post(
        `${SUPABASE_URL}/rest/v1/cart_items`,
        data,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Cart item added:", response.data);
    } catch (error) {
      console.error(
        "Error adding cart item:",
        error.response?.data || error.message
      );
    }
  }
};

export const getProfilecart = async (user_id) => {
  const access_token = sessionStorage.getItem("session_token");
  if (!access_token) throw new Error("No access token available");
  const response = await axios.get(
    `${SUPABASE_URL}/rest/v1/cart_items?user_id=eq.${user_id}&select=*,product:products(*)`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return response.data;
};

