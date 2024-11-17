import { createSlice } from "@reduxjs/toolkit";

const diagramSlice = createSlice({
  name: "diagram",
  initialState: {
    elements: [
      {
        id: 'node-1',
        type: 'class', // Node type (e.g., ClassNode or InterfaceNode)
        position: { x: 100, y: 100 }, // Position on the diagram
        data: { label: 'ClassA' }, // Node label
      },
      {
        id: 'node-2',
        type: 'class',
        position: { x: 400, y: 100 },
        data: { label: 'ClassB' },
      },
      
      
    ], // List of elements
    selectedElement: null, // Track selected element
  },
  reducers: {
    addElement(state, action) {
      state.elements.push(action.payload);
    },
    removeElement(state, action) {
      state.elements = state.elements.filter((el) => el.id !== action.payload);
      state.selectedElement = null
    },
    updateElement(state, action) {
      const index = state.elements.findIndex((el) => el.id === action.payload.id);
      if (index !== -1) {
        state.elements[index] = action.payload.data;
      }
    },
    updateElementPosition(state, action) {
      const { id, position } = action.payload;
      const element = state.elements.find((el) => el.id === id);
      if (element) {
        element.position = position;
      }
    },
    selectElement(state, action) {
      state.selectedElement = action.payload; // Set selected element
    },
    selectNotElement(state, action) {
      state.selectedElement = null; // Set selected element
    },


    importElements(state, action){
      state.elements = action.payload
    },




    updateElementLabel: (state, action) => {
      const { id, label } = action.payload;
      const element = state.elements.find((el) => el.id === id);
      if (element) {
        element.data.label = label; // Update the label of the selected element
      }
    },
    addAttributeToElement: (state, action) => {
      const { elementId, attribute } = action.payload;
    
      const element = state.elements.find((el) => el.id === elementId);
    
      if (element) {
        if (!element.data.attributes) {
          element.data.attributes = [];
        }
        element.data.attributes.push(attribute);
        state.selectedElement.data.attributes.push(attribute)
      }
    },
    removeAttributeFromElement: (state, action) => {
      const { elementId, attributeName } = action.payload;
    
      // Find the element by ID
      const element = state.elements.find((el) => el.id === elementId);
      
      if (element && element.data?.attributes) {
        // Remove the attribute by name
        element.data.attributes = element.data.attributes.filter(
          (attr) => attr.name !== attributeName
        );
        
        // If the selected element is the same, update its attributes as well
        if (state.selectedElement?.id === elementId) {
          state.selectedElement.data.attributes = element.data.attributes;
        }
      }
    },
    addMethodToElement: (state, action) => {
      const { elementId, method } = action.payload;
    
      const element = state.elements.find((el) => el.id === elementId);
    
      if (element) {
        if (!element.data.methods) {
          element.data.methods = [];
        }
        element.data.methods.push(method);
        state.selectedElement.data.methods.push(method)
      }
    },
    removeMethodFromElement: (state, action) => {
      const { elementId, methodName } = action.payload;
    
      // Find the element by ID
      const element = state.elements.find((el) => el.id === elementId);
      
      if (element && element.data?.methods) {
        element.data.methods = element.data.methods.filter(
          (attr) => attr.name !== methodName
        );
        
        if (state.selectedElement?.id === elementId) {
          state.selectedElement.data.methods = element.data.methods;
        }
      }
    },
    
    
  },
});


export const {
  addElement,
  removeElement,
  updateElementPosition,
  updateElement,
  selectElement,
  selectNotElement,
  updateElementLabel,
  addAttributeToElement,
  removeAttributeFromElement,
  addMethodToElement,
  removeMethodFromElement,
  importElements
} = diagramSlice.actions;

export default diagramSlice.reducer;




