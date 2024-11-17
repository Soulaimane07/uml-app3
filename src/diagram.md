import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  MarkerType,
} from "reactflow";
import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback, useMemo } from "react";
import "reactflow/dist/style.css";
import { addEdge } from "../../Redux/Slices/EdgesSlice";
import { addNode } from "../../Redux/Slices/DiagramSlice";

const Diagram = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.diagram.elements); // Get nodes from Redux
  const edges = useSelector((state) => state.edges.edges); // Get edges from Redux
  const [selectedEdgeType, setSelectedEdgeType] = useState('association'); // Default edge type

  const onNodesChange = useCallback(
    (changes) => {
      // Handle node position changes
      changes.forEach((change) => {
        if (change.type === 'position' && change.position) {
          // Update node position in Redux if necessary
        }
      });
    },
    []
  );

  const onConnect = useCallback(
    (params) => {
      // Handle edge creation (when two nodes are connected)
      const newEdge = {
        ...params,
        type: selectedEdgeType,
        markerEnd: selectedEdgeType === 'aggregation'
          ? { type: MarkerType.ArrowClosed, color: 'gray' }
          : { type: MarkerType.ArrowClosed, color: 'black' },
        style: {
          stroke: selectedEdgeType === 'composition' ? 'black' : 'gray',
          strokeWidth: 2,
        },
      };
      dispatch(addEdge(newEdge)); // Add edge to Redux
    },
    [dispatch, selectedEdgeType]
  );

  const nodeTypes = useMemo(
    () => ({
      class: 'class', // Use custom node types if necessary
    }),
    []
  );

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={elements}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        fitView
        style={{ width: "100%", height: "100%" }}
        deleteKeyCode={['Delete', 'Backspace']}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

      {/* Select edge type */}
      <div style={{ padding: "10px" }}>
        <label>Choose Relationship: </label>
        <select
          onChange={(e) => setSelectedEdgeType(e.target.value)}
          value={selectedEdgeType}
        >
          <option value="association">Association</option>
          <option value="aggregation">Aggregation</option>
          <option value="composition">Composition</option>
        </select>
      </div>
    </div>
  );
};

export default Diagram;
