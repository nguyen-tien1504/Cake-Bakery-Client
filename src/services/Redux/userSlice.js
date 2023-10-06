import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../FireBase";
import { signOut } from "firebase/auth";

export const logoutUser = createAsyncThunk("logout user", async () => {
  await signOut(auth);
  return auth.currentUser;
});

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login: (state, { payload }) => {
      return payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state, { payload }) => payload);
  },
});
export const { login } = userSlice.actions;
export default userSlice.reducer;
