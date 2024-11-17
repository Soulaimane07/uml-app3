import { configureStore } from '@reduxjs/toolkit';
import diagramReducer from './Slices/DiagramSlice';

const Store = configureStore({
  reducer: {
    diagram: diagramReducer,
  },
});

export default Store;
