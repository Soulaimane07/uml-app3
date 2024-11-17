import { configureStore } from '@reduxjs/toolkit';
import diagramReducer from './Slices/DiagramSlice';
import edgeReducer from './Slices/EdgesSlice';

const Store = configureStore({
  reducer: {
    diagram: diagramReducer,
    edges: edgeReducer,
  },
});

export default Store;
