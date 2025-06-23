import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  ReactFlowProvider,
} from "reactflow";
import type { Connection, Edge, Node, OnConnect } from "reactflow";
import "reactflow/dist/style.css";

export default function App() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onConnect = useCallback<OnConnect>(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDoubleClick = (evt: React.MouseEvent) => {
    const id = crypto.randomUUID();
    const newNode: Node = {
      id,
      position: { x: evt.clientX, y: evt.clientY },
      data: { label: `Tarea ${nodes.length + 1}` },
      type: "default",
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <ReactFlowProvider>
      <div
        onDoubleClick={onDoubleClick}
        style={{ width: "100vw", height: "100vh" }}
      >
        <ReactFlow nodes={nodes} edges={edges} onConnect={onConnect}>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
