import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  MarkerType,
} from "reactflow";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useMemo, useState } from "react";
import "reactflow/dist/style.css";
import { ClassNode, InterfaceNode } from "../Nodes/Nodes";
import {
  updateElementPosition,
  removeElement,
} from "../../Redux/Slices/DiagramSlice";
import { addEdge } from "../../Redux/Slices/EdgesSlice";

// Edge types available in the dropdown
const edgeTypes = ["association", "aggregation", "composition"];

const Diagram = () => {
  const dispatch = useDispatch();

  // Redux state for elements and edges
  const elements = useSelector((state) => state.diagram.elements);
  const edges = useSelector((state) => state.edges.edges);

  // State for edge type selection
  const [selectedEdgeType, setSelectedEdgeType] = useState(edgeTypes[0]);

  // Custom node types
  const nodeTypes = useMemo(
    () => ({
      class: ClassNode,
      interface: InterfaceNode,
    }),
    []
  );

  // Memoized nodes with default positions
  const nodesWithDefaults = useMemo(
    () =>
      elements.map((node) => ({
        ...node,
        position: node.position || { x: 0, y: 0 }, // Default to (0, 0) if position is missing
      })),
    [elements]
  );

  // Handle node position changes
  const onNodesChange = useCallback(
    (changes) => {
      changes.forEach((change) => {
        if (change.type === "position" && change.position) {
          dispatch(
            updateElementPosition({ id: change.id, position: change.position })
          );
        }
      });
    },
    [dispatch]
  );

  // Handle node deletion
  const onNodesDelete = useCallback(
    (nodes) => {
      nodes.forEach((node) => dispatch(removeElement(node.id)));
    },
    [dispatch]
  );

  // Handle edge connections
  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: selectedEdgeType,
        markerEnd:
          selectedEdgeType === "aggregation"
            ? { type: MarkerType.ArrowClosed, color: "gray" }
            : selectedEdgeType === "composition"
            ? { type: MarkerType.ArrowClosed, color: "black" }
            : null,
        style: {
          stroke: selectedEdgeType === "composition" ? "black" : "gray",
          strokeWidth: 2,
        },
      };

      dispatch(addEdge(newEdge)); // Add edge to Redux
    },
    [dispatch, selectedEdgeType]
  );

  return (
    <div className="flex-1 p-4 bg-gray-100">
      {/* Edge Type Selector */}
      <div style={{ padding: "10px" }}>
        <label>Choose Relationship: </label>
        <select
          onChange={(e) => setSelectedEdgeType(e.target.value)}
          value={selectedEdgeType}
        >
          {edgeTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* ReactFlow Diagram */}
      <ReactFlow
        nodes={nodesWithDefaults}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onNodesDelete={onNodesDelete}
        onConnect={onConnect}
        fitView
        style={{ width: "100%", height: "100%" }}
        deleteKeyCode={["Delete", "Backspace"]}
      >
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default Diagram;
