import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  elements: [],
};

const diagramSlice = createSlice({
  name: 'diagram',
  initialState,
  reducers: {
    addElement: (state, action) => {
      state.elements.push(action.payload);
    },
    removeElement: (state, action) => {
      state.elements = state.elements.filter((element) => element.id !== action.payload);
    },
    updateElement: (state, action) => {
      const index = state.elements.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.elements[index] = action.payload;
      }
    },
  },
});

export const { addElement, removeElement, updateElement } = diagramSlice.actions;
export default diagramSlice.reducer;
