import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStar: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signFailure: (state, action) => {
      state.err = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state,action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state,action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart:(state) => {
      state.loading = true;
    },
    deleteUserSuccess:(state,action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure:(state,action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart:(state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state,action) => {
      state.error = null;
      state.loading = false;
      state.currentUser = null;
    },
    signOutUserFailure:(state,action) => {
      state.error = action.payload;
      state.loading = false;
    }
  },
});

export const {
  signInStar,
  signInSuccess,
  signFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure
} = userSlice.actions;
export default userSlice.reducer;
