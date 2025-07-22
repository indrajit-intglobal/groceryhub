import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userSignup, userLogin, storeSession, getUserProfile } from "../../service/AuthService";
import { toast } from "@/hooks/use-toast";

const initialState = {
  loading: false,
  user: null,
  session_token: null,
  refresh_token: null,
  error: null,
  authInitialized: false, 
};

export const handleUserSignUp = createAsyncThunk(
  "auth/signup",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await userSignup({ email, password });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const handleUserLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await userLogin({ email, password });
      const user = await getUserProfile();
      return { ...response, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, thunkAPI) => {
    try {
      const session_token = sessionStorage.getItem("session_token");
      const refresh_token = sessionStorage.getItem("refresh_token");
      if (!session_token) return null;
      const user = await getUserProfile();
      return { session_token, refresh_token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleUserSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleUserSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast({
          title: "Check your email",
          description: "Please confirm your email to verify your account.",
        });
      })
      .addCase(handleUserSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
        toast({
          title: "Signup Error",
          description: typeof action.payload === 'string' ? action.payload : (action.payload?.message || "Signup failed"),
          variant: "destructive",
        });
      })
      .addCase(handleUserLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleUserLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.session_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.user = action.payload.user;
        state.error = null;
        // Store session (access, refresh, expires_at)
        storeSession(action.payload);
      })
      .addCase(handleUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.session_token = action.payload.session_token;
          state.refresh_token = action.payload.refresh_token;
          state.user = action.payload.user;
          state.error = null;
        }
        state.authInitialized = true; // <-- set to true
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.authInitialized = true; // <-- set to true even if failed
      });
  },
});

export default AuthSlice.reducer;
