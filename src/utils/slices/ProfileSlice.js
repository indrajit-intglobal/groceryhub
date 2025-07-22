import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile, updateProfileData } from "../../service/ProfileService";

const initialState = {
  loading: false,
  profile: null,
  error: null,
  updateSuccess: false,
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (user_id, thunkAPI) => {
    try {
      const response = await getProfile(user_id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateFullProfile = createAsyncThunk(
  "profile/updateFullProfile",
  async ({ user_id, data }, thunkAPI) => {
    try {
      const response = await updateProfileData(user_id, data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileState: (state) => {
      state.updateSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch profile";
      })
      .addCase(updateFullProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateFullProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.updateSuccess = true;
        state.error = null;
      })
      .addCase(updateFullProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update profile";
        state.updateSuccess = false;
      });
  },
});

export const { clearProfileState } = ProfileSlice.actions;
export default ProfileSlice.reducer; 