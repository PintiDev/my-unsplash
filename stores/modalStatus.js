import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addImageModal: false,
  areYouSure: false,
  areYouSureData: null,
};
const modalStatus = createSlice({
  name: "modalStatus",
  initialState,
  reducers: {
    toggleAddImageModal: (state) => {
      state.addImageModal = !state.addImageModal;
    },
    toggleareYouSure: (state) => {
      state.areYouSure = !state.areYouSure;
    },
    setAreYouSureData: (state, action) => {
      state.areYouSureData = action.payload;
    },
  },
});

export default modalStatus.reducer;
export const { toggleAddImageModal, toggleareYouSure, setAreYouSureData } =
  modalStatus.actions;
