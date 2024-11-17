import { createSlice } from "@reduxjs/toolkit";
import { MarkerType } from "reactflow"; // Import MarkerType

const EdgeSlice = createSlice({
  name: "edges",
  initialState: {
    edges: [
      {
        id: 'edge-1',
        source: 'node-1', // Start node ID
        target: 'node-2', // End node ID
        type: 'association', // Edge type
        markerEnd: { type: MarkerType.ArrowClosed, color: 'gray' },
        style: { stroke: 'gray', strokeWidth: 2 },
      },
    ],
  },
  reducers: {
    addEdge(state, action) {
      state.edges.push(action.payload);
    },
    setEdges(state, action) {
      state.edges = action.payload; // Overwrite edges
    },
    clearEdges(state) {
      state.edges = []; // Clear all edges
    },
  },
});

export const { addEdge, setEdges, clearEdges } = EdgeSlice.actions;

export default EdgeSlice.reducer;
