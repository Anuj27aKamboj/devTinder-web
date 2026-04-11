import { createSlice } from "@reduxjs/toolkit";

const requestlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) => {
      return state.filter((req) => req.requestId !== action.payload);
    },
  },
});

export const { addRequests, removeRequest } = requestlice.actions;
export default requestlice.reducer;
