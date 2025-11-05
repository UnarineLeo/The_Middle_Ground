import { useState } from "react";
import { ArrowLeft, Music, Zap, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface ConductorPageProps {
  onNavigate: (page: string) => void;
}

interface Node {
  id: number;
  type: "pattern" | "component" | "action";
  name: string;
  connected: boolean;
}

export function ConductorPage({ onNavigate }: ConductorPageProps) {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 1, type: "pattern", name: "Observer", connected: false },
    { id: 2, type: "component", name: "Subject", connected: false },
    { id: 3, type: "component", name: "Observer", connected: false },
    { id: 4, type: "action", name: "Notify", connected: false }
  ]);

  const [draggedNode, setDraggedNode] = useState<number | null>(null);
  const [connections, setConnections] = useState<[number, number][]>([]);
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDragStart = (nodeId: number) => {
    setDraggedNode(nodeId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: number) => {
    if (draggedNode !== null && draggedNode !== targetId) {
      // Check if connection is valid (simplified logic)
      const isValidConnection = 
        (draggedNode === 1 && targetId === 2) ||
        (draggedNode === 2 && targetId === 3) ||
        (draggedNode === 3 && targetId === 4);

      if (isValidConnection && !connections.some(conn => 
        (conn[0] === draggedNode && conn[1] === targetId) ||
        (conn[0] === targetId && conn[1] === draggedNode)
      )) {
        setConnections([...connections, [draggedNode, targetId]]);
        setNodes(nodes.map(node => 
          node.id === draggedNode || node.id === targetId
            ? { ...node, connected: true }
            : node
        ));
        setScore(score + 50);
        
        // Play success sound effect (simulated)
        if (connections.length + 1 === 3) {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        }
      }
    }
    setDraggedNode(null);
  };

  const resetBoard = () => {
    setNodes(nodes.map(node => ({ ...node, connected: false })));
    setConnections([]);
    setScore(0);
    setShowSuccess(false);
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case "pattern": return "bg-purple-500/20 border-purple-500 text-purple-400";
      case "component": return "bg-blue-500/20 border-blue-500 text-blue-400";
      case "action": return "bg-green-500/20 border-green-500 text-green-400";
      default: return "bg-gray-500/20 border-gray-500 text-gray-400";
    }
  };

  return (
    <div className="pb-24 px-4 pt-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate("home")}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 text-[#5865F2]" />
            <div>
              <h1 className="text-white">Be a Conductor</h1>
              <p className="text-sm text-gray-400">Connect the pieces to orchestrate the pattern</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-white">Score: {score}</span>
            </div>
          </div>
          <Button
            onClick={resetBoard}
            variant="outline"
            className="bg-[#2C2F33] border-[#2F3136] text-white hover:bg-[#5865F2]"
          >
            Reset
          </Button>
        </div>
      </motion.div>

      {/* Success Animation */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-[#2C2F33] border-2 border-[#5865F2] rounded-2xl p-8 card-shadow glow-effect">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-[#5865F2] mx-auto mb-4" />
                </motion.div>
                <h2 className="text-white mb-2">Perfect Connection! 🎉</h2>
                <p className="text-gray-400">You've mastered the Observer Pattern</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-[#2C2F33] border-[#2F3136] p-4 card-shadow mb-8">
          <div className="flex items-start gap-3">
            <Music className="w-5 h-5 text-[#5865F2] mt-0.5" />
            <div>
              <h3 className="text-white mb-2">How to Play</h3>
              <p className="text-sm text-gray-400">
                Drag and drop the components to connect them in the correct order. 
                Complete the pattern flow to earn points and unlock achievements!
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Game Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="flex flex-col items-center"
          >
            <Badge variant="outline" className="mb-3 border-[#5865F2] text-[#5865F2]">
              Step {index + 1}
            </Badge>
            
            <motion.div
              draggable
              onDragStart={() => handleDragStart(node.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(node.id)}
              whileHover={{ scale: 1.05, rotate: draggedNode === node.id ? 5 : 0 }}
              whileDrag={{ scale: 1.1, rotate: 10, cursor: "grabbing" }}
              className={`relative w-full aspect-square rounded-2xl border-2 flex items-center justify-center cursor-grab active:cursor-grabbing transition-all ${
                getNodeColor(node.type)
              } ${
                node.connected ? "glow-effect shadow-lg" : ""
              } ${
                draggedNode === node.id ? "opacity-50" : ""
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">
                  {node.type === "pattern" && "🎯"}
                  {node.type === "component" && "🔷"}
                  {node.type === "action" && "⚡"}
                </div>
                <h3 className="font-semibold">{node.name}</h3>
                <p className="text-xs opacity-75 mt-1 capitalize">{node.type}</p>
              </div>

              {node.connected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Connections Visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-[#2C2F33] border-[#2F3136] p-6 card-shadow">
          <h3 className="text-white mb-4">Your Connections</h3>
          {connections.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              Start dragging components to make connections
            </p>
          ) : (
            <div className="space-y-3">
              {connections.map((conn, idx) => {
                const from = nodes.find(n => n.id === conn[0]);
                const to = nodes.find(n => n.id === conn[1]);
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 bg-[#23272A] rounded-lg p-3"
                  >
                    <Badge className={getNodeColor(from?.type || "")}>
                      {from?.name}
                    </Badge>
                    <div className="flex-1 h-0.5 bg-[#5865F2] relative">
                      <motion.div
                        className="absolute right-0 top-1/2 -translate-y-1/2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </div>
                    <Badge className={getNodeColor(to?.type || "")}>
                      {to?.name}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
          )}
        </Card>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6"
      >
        <Card className="bg-gradient-to-r from-[#5865F2]/10 to-purple-500/10 border-[#5865F2]/30 p-4">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-[#5865F2] mt-0.5" />
            <div>
              <h4 className="text-white mb-1">Pro Tip</h4>
              <p className="text-sm text-gray-300">
                The Observer pattern flows from Pattern → Subject → Observer → Notify. 
                Think about how notifications work in social media!
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
