import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "projectSlice",
  initialState: {
    drawer: false,
  },
  reducers: {
    openDrawer: (state, action) => {
      console.log(action.payload);
      state.drawer = action.payload;
    },
  },
});

export const { openDrawer } = projectSlice.actions;
export default projectSlice.reducer;
