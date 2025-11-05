import { useState, useEffect } from "react";
import { ArrowLeft, Play, Pause, RotateCcw, Zap, Users, AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface TrainConductorPageProps {
  onNavigate: (page: string) => void;
}

interface Train {
  id: number;
  name: string;
  position: number;
  status: "waiting" | "moving" | "stopped" | "arrived";
  color: string;
  passengers: number;
  destination: string;
}

interface Signal {
  id: number;
  position: number;
  state: "red" | "yellow" | "green";
}

export function TrainConductorPage({ onNavigate }: TrainConductorPageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [collisions, setCollisions] = useState(0);
  const [successfulTrips, setSuccessfulTrips] = useState(0);
  const [selectedTrain, setSelectedTrain] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [showTutorial, setShowTutorial] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const [trains, setTrains] = useState<Train[]>([
    { id: 1, name: "Express A", position: 10, status: "waiting", color: "#5865F2", passengers: 45, destination: "Station C" },
    { id: 2, name: "Local B", position: 10, status: "waiting", color: "#43B581", passengers: 30, destination: "Station B" },
    { id: 3, name: "Freight C", position: 10, status: "waiting", color: "#FAA61A", passengers: 0, destination: "Station D" }
  ]);

  const [signals, setSignals] = useState<Signal[]>([
    { id: 1, position: 30, state: "red" },
    { id: 2, position: 50, state: "red" },
    { id: 3, position: 70, state: "red" }
  ]);

  const [interactions, setInteractions] = useState<string[]>([]);

  // Game loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTrains(prevTrains => {
        return prevTrains.map(train => {
          if (train.status === "moving" && train.position < 90) {
            const newPosition = train.position + 2;
            
            // Check for collisions
            const collision = prevTrains.some(
              otherTrain => 
                otherTrain.id !== train.id && 
                Math.abs(otherTrain.position - newPosition) < 8 &&
                otherTrain.status !== "arrived"
            );

            if (collision) {
              setCollisions(prev => prev + 1);
              setMessage("⚠️ Collision detected! Communication failed!");
              setTimeout(() => setMessage(""), 3000);
              return { ...train, status: "stopped" as const };
            }

            // Check if arrived
            if (newPosition >= 90) {
              setSuccessfulTrips(prev => {
                const newCount = prev + 1;
                if (newCount === 3) {
                  setMessage("🎉 Perfect! All trains arrived safely through mediator coordination!");
                  setTimeout(() => setMessage(""), 4000);
                }
                return newCount;
              });
              setScore(prev => prev + 100);
              logInteraction(`${train.name} arrived safely! The mediator coordinated successfully.`);
              return { ...train, position: newPosition, status: "arrived" as const };
            }

            return { ...train, position: newPosition };
          }
          return train;
        });
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const toggleSignal = (signalId: number) => {
    setSignals(signals.map(signal => 
      signal.id === signalId 
        ? { ...signal, state: signal.state === "red" ? "green" : "red" as const }
        : signal
    ));
    
    const signal = signals.find(s => s.id === signalId);
    logInteraction(`Mediator changed Signal ${signalId} to ${signal?.state === "red" ? "GREEN" : "RED"}`);
    setScore(score + 10);
  };

  const controlTrain = (trainId: number, action: "start" | "stop") => {
    setTrains(trains.map(train => {
      if (train.id === trainId) {
        const newStatus = action === "start" ? "moving" : "stopped";
        logInteraction(
          `Mediator sent command to ${train.name}: ${action.toUpperCase()}. Other trains notified.`
        );
        setScore(score + 20);
        return { ...train, status: newStatus as const };
      }
      return train;
    }));
    setSelectedTrain(trainId);
  };

  const logInteraction = (interaction: string) => {
    setInteractions(prev => [interaction, ...prev].slice(0, 5));
  };

  const resetSimulation = () => {
    setTrains([
      { id: 1, name: "Express A", position: 10, status: "waiting", color: "#5865F2", passengers: 45, destination: "Station C" },
      { id: 2, name: "Local B", position: 10, status: "waiting", color: "#43B581", passengers: 30, destination: "Station B" },
      { id: 3, name: "Freight C", position: 10, status: "waiting", color: "#FAA61A", passengers: 0, destination: "Station D" }
    ]);
    setSignals([
      { id: 1, position: 30, state: "red" },
      { id: 2, position: 50, state: "red" },
      { id: 3, position: 70, state: "red" }
    ]);
    setIsPlaying(false);
    setSelectedTrain(null);
    setInteractions([]);
    setMessage("");
  };

  return (
    <div className="pb-24 px-4 pt-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
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
            <div className="text-4xl">🚂</div>
            <div>
              <h1 className="text-white">Be a Conductor</h1>
              <p className="text-sm text-gray-400">Act as the Mediator controlling train traffic</p>
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
            onClick={() => {
              setIsPlaying(!isPlaying);
              if (!gameStarted) setGameStarted(true);
            }}
            className={`${isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-[#5865F2] hover:bg-[#4752C4]"} text-white glow-effect`}
          >
            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isPlaying ? "Pause" : "Start"}
          </Button>
          <Button
            onClick={resetSimulation}
            variant="outline"
            className="bg-[#2C2F33] border-[#2F3136] text-white hover:bg-[#5865F2]"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Tutorial */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-gradient-to-r from-[#5865F2]/20 to-purple-500/20 border-[#5865F2] p-4 mb-6 card-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-2xl">🎓</div>
                  <div>
                    <h3 className="text-white mb-2">How the Mediator Pattern Works</h3>
                    <p className="text-sm text-gray-300 mb-2">
                      You are the <span className="text-[#5865F2]">Mediator (Train Controller)</span>. The trains are <span className="text-green-400">Colleagues</span> that need to communicate.
                    </p>
                    <p className="text-sm text-gray-300">
                      Instead of trains talking directly to each other (causing tight coupling), they communicate through YOU. 
                      Control signals and send commands to prevent collisions!
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setShowTutorial(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        <Card className="bg-[#2C2F33] border-[#2F3136] p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
            <div>
              <div className="text-2xl text-white">{successfulTrips}</div>
              <div className="text-xs text-gray-400">Safe Arrivals</div>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2C2F33] border-[#2F3136] p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <div>
              <div className="text-2xl text-white">{collisions}</div>
              <div className="text-xs text-gray-400">Collisions</div>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2C2F33] border-[#2F3136] p-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-400" />
            <div>
              <div className="text-2xl text-white">{trains.reduce((acc, t) => acc + t.passengers, 0)}</div>
              <div className="text-xs text-gray-400">Passengers</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Message Display */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-6"
          >
            <Card className={`${
              message.includes("🎉") ? "bg-green-500/20 border-green-500" : "bg-red-500/20 border-red-500"
            } p-4 text-center`}>
              <p className="text-white">{message}</p>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Train Track Simulation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-[#2C2F33] border-[#2F3136] p-8 card-shadow mb-6">
          <h3 className="text-white mb-4">Railway Track</h3>
          
          {/* Track */}
          <div className="relative h-64 bg-[#23272A] rounded-lg border-2 border-[#2F3136] overflow-hidden">
            {/* Track lines */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-600 -translate-y-1/2" />
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-500 -translate-y-4" />
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-500 translate-y-3" />

            {/* Stations */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <div className="bg-[#5865F2] px-3 py-1 rounded text-xs text-white">Start</div>
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <div className="bg-green-500 px-3 py-1 rounded text-xs text-white">End</div>
            </div>

            {/* Signals */}
            {signals.map((signal, idx) => (
              <motion.div
                key={signal.id}
                className="absolute top-4 cursor-pointer"
                style={{ left: `${signal.position}%` }}
                whileHover={{ scale: 1.2 }}
                onClick={() => toggleSignal(signal.id)}
              >
                <div className={`w-6 h-6 rounded-full border-2 border-white ${
                  signal.state === "red" ? "bg-red-500 glow-effect" : 
                  signal.state === "yellow" ? "bg-yellow-500" : 
                  "bg-green-500 glow-effect"
                }`} />
                <div className="text-xs text-gray-400 mt-1 text-center">S{signal.id}</div>
              </motion.div>
            ))}

            {/* Trains */}
            {trains.map((train) => (
              <motion.div
                key={train.id}
                className="absolute top-1/2 cursor-pointer"
                style={{ 
                  left: `${train.position}%`,
                  transform: `translateY(${train.id * 25 - 50}px)`
                }}
                animate={{ 
                  left: `${train.position}%`,
                  scale: selectedTrain === train.id ? 1.1 : 1
                }}
                transition={{ duration: 0.1 }}
                whileHover={{ scale: 1.15 }}
              >
                <div 
                  className={`px-4 py-2 rounded-lg border-2 ${
                    train.status === "moving" ? "glow-effect" : ""
                  }`}
                  style={{ 
                    backgroundColor: train.color,
                    borderColor: selectedTrain === train.id ? "#fff" : train.color
                  }}
                >
                  <div className="text-white text-xs whitespace-nowrap">
                    {train.name}
                    {train.status === "moving" && " 🚄"}
                    {train.status === "stopped" && " 🛑"}
                    {train.status === "arrived" && " ✅"}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Train Controls */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-[#2C2F33] border-[#2F3136] p-6 card-shadow">
            <h3 className="text-white mb-4">Mediator Controls</h3>
            <div className="space-y-3">
              {trains.map((train) => (
                <div
                  key={train.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedTrain === train.id 
                      ? "border-[#5865F2] bg-[#5865F2]/10" 
                      : "border-[#2F3136] bg-[#23272A]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: train.color }}
                      />
                      <div>
                        <h4 className="text-white text-sm">{train.name}</h4>
                        <p className="text-xs text-gray-400">
                          {train.passengers} passengers → {train.destination}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        train.status === "moving" ? "border-green-500 text-green-400" :
                        train.status === "stopped" ? "border-red-500 text-red-400" :
                        train.status === "arrived" ? "border-blue-500 text-blue-400" :
                        "border-gray-500 text-gray-400"
                      }
                    >
                      {train.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => controlTrain(train.id, "start")}
                      disabled={train.status === "moving" || train.status === "arrived"}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
                    >
                      Start
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => controlTrain(train.id, "stop")}
                      disabled={train.status !== "moving"}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
                    >
                      Stop
                    </Button>
                  </div>
                  <Progress 
                    value={train.position} 
                    className="h-1 mt-2" 
                  />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Communication Log */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-[#2C2F33] border-[#2F3136] p-6 card-shadow">
            <h3 className="text-white mb-4">Mediator Communication Log</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {interactions.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-8">
                  No interactions yet. Start controlling trains!
                </p>
              ) : (
                interactions.map((interaction, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-[#23272A] p-3 rounded-lg border border-[#2F3136]"
                  >
                    <p className="text-sm text-gray-300">{interaction}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date().toLocaleTimeString()}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Learning Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <Card className="bg-gradient-to-r from-purple-500/10 to-[#5865F2]/10 border-purple-500/30 p-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl">💡</div>
            <div>
              <h3 className="text-white mb-2">Mediator Pattern in Action</h3>
              <p className="text-sm text-gray-300 mb-2">
                Notice how trains never communicate directly with each other! As the mediator (controller), you:
              </p>
              <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                <li>Centralize complex communication logic</li>
                <li>Reduce coupling between trains (colleagues)</li>
                <li>Coordinate interactions through signals and commands</li>
                <li>Make the system easier to maintain and extend</li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
