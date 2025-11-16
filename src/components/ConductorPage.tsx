import { useState, useEffect, useRef } from "react";
import { ArrowLeft, RotateCcw, Radio, AlertTriangle, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

interface ConductorPageProps {
  onNavigate: (page: string) => void;
}

interface Train {
  id: string;
  name: string;
  color: string;
  status: "approaching" | "requesting" | "assigned" | "departed";
  assignedPlatform?: number;
  requestTime?: number;
}

interface Platform {
  id: number;
  occupied: boolean;
  trainId?: string;
}

interface LogEntry {
  time: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
}

const TRAIN_NAMES = [
  "Thunder Zeta", "Comet Mu", "Express Alpha", "Lightning Beta", 
  "Storm Gamma", "Blaze Delta", "Swift Epsilon", "Meteor Sigma",
  "Velocity Omega", "Horizon Nova", "Phoenix Prime", "Dragon Express"
];

const TRAIN_COLORS = [
  "#3B82F6", "#EF4444", "#10B981", "#F59E0B", 
  "#8B5CF6", "#EC4899", "#14B8A6", "#F97316"
];

const PLATFORM_REQUEST_TIME = 8; // seconds to assign platform

export function ConductorPage({ onNavigate }: ConductorPageProps) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [mediator, setMediator] = useState<GameMediator | null>(null);
  const [turn, setTurn] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const [message, setMessage] = useState("");
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [trains, setTrains] = useState<Train[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: 1, occupied: false },
    { id: 2, occupied: false },
    { id: 3, occupied: false },
    { id: 4, occupied: false },
  ]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [requestingTrain, setRequestingTrain] = useState<Train | null>(null);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [countdown, setCountdown] = useState<number>(PLATFORM_REQUEST_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [collisionMessage, setCollisionMessage] = useState("");
  const [stats, setStats] = useState({
    trainsManaged: 0,
    collisionsAvoided: 0,
    nearMisses: 0,
  });
  const [showPatternExplanation, setShowPatternExplanation] = useState(false);

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const trainSpawnRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startGame();
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      if (trainSpawnRef.current) clearTimeout(trainSpawnRef.current);
    };
  }, []);

  // Check for too many requesting trains (max 4 = game over)
  useEffect(() => {
    const requestingCount = trains.filter(t => t.status === "requesting").length;
    if (requestingCount >= 4 && !gameOver) {
      setCollisionMessage("Too many trains requesting at once! The station is overwhelmed!");
      addLog("⚠️ SYSTEM OVERLOAD! 4 trains requesting simultaneously!", "error");
      setGameOver(true);
      setRequestingTrain(null);
      if (countdownRef.current) clearInterval(countdownRef.current);
      if (trainSpawnRef.current) clearTimeout(trainSpawnRef.current);
    }
  }, [trains, gameOver]);

  const startGame = () => {
    setTrains([]);
    setPlatforms([
      { id: 1, occupied: false },
      { id: 2, occupied: false },
      { id: 3, occupied: false },
      { id: 4, occupied: false },
    ]);
    setLogs([]);
    setRequestingTrain(null);
    setGameOver(false);
    setStats({
      trainsManaged: 0,
      collisionsAvoided: 0,
      nearMisses: 0,
    });

    addLog("System initialized. Ready to manage trains.", "success");
    
    // Spawn first train after 2 seconds
    trainSpawnRef.current = setTimeout(() => {
      spawnNewTrain();
    }, 2000);
  };

  const spawnNewTrain = () => {
    if (gameOver) return;

    const usedNames = trains.map(t => t.name);
    const availableNames = TRAIN_NAMES.filter(name => !usedNames.includes(name));
    
    if (availableNames.length === 0) return;

    const name = availableNames[Math.floor(Math.random() * availableNames.length)];
    const color = TRAIN_COLORS[Math.floor(Math.random() * TRAIN_COLORS.length)];
    
    const newTrain: Train = {
      id: `train-${Date.now()}`,
      name,
      color,
      status: "approaching",
    };

    setTrains(prev => [...prev, newTrain]);
    addLog(`${name} approaching station...`, "info");

    // After 3-5 seconds, train requests platform
    setTimeout(() => {
      if (!gameOver) {
        requestPlatform(newTrain.id);
      }
    }, 3000 + Math.random() * 2000);

    // Spawn next train after 5-8 seconds
    const nextSpawnDelay = 5000 + Math.random() * 3000;
    trainSpawnRef.current = setTimeout(() => {
      spawnNewTrain();
    }, nextSpawnDelay);
  };

  const requestPlatform = (trainId: string) => {
    setTrains(prev => {
      const train = prev.find(t => t.id === trainId);
      if (train && !gameOver) {
        setRequestingTrain({ ...train, status: "requesting", requestTime: Date.now() });
        setCountdown(PLATFORM_REQUEST_TIME);
        addLog(`${train.name} requesting platform assignment!`, "warning");

        // Start countdown
        let timeLeft = PLATFORM_REQUEST_TIME;
        if (countdownRef.current) clearInterval(countdownRef.current);
        
        countdownRef.current = setInterval(() => {
          timeLeft -= 1;
          setCountdown(timeLeft);

          if (timeLeft <= 0) {
            if (countdownRef.current) clearInterval(countdownRef.current);
            handleTimeout(trainId);
          }
        }, 1000);
      }
      
      return prev.map(t => 
        t.id === trainId ? { ...t, status: "requesting", requestTime: Date.now() } : t
      );
    });
  };

  const handleTimeout = (trainId: string) => {
    const train = trains.find(t => t.id === trainId);
    if (train) {
      setCollisionMessage(`${train.name} collided due to missing platform assignment!`);
      addLog(`⚠️ COLLISION! ${train.name} crashed!`, "error");
      setGameOver(true);
      setRequestingTrain(null);
    }
  };

  const assignPlatform = (platformId: number) => {
    if (!requestingTrain || gameOver) return;

    // Check if platform is occupied
    const platform = platforms.find(p => p.id === platformId);
    if (platform?.occupied) {
      setCollisionMessage(`${requestingTrain.name} collided with another train on Platform ${platformId}!`);
      addLog(`⚠️ COLLISION! ${requestingTrain.name} crashed on Platform ${platformId}!`, "error");
      setGameOver(true);
      setRequestingTrain(null);
      if (countdownRef.current) clearInterval(countdownRef.current);
      return;
    }

    // Successful assignment
    if (countdownRef.current) clearInterval(countdownRef.current);

    // Check for near miss (assigned with < 2 seconds left)
    const isNearMiss = countdown <= 2;
    if (isNearMiss) {
      setStats(prev => ({ ...prev, nearMisses: prev.nearMisses + 1 }));
      addLog(`⚠️ Near miss! ${requestingTrain.name} assigned to Platform ${platformId} with ${countdown}s left!`, "warning");
    } else {
      addLog(`✓ ${requestingTrain.name} assigned to Platform ${platformId}`, "success");
    }

    setStats(prev => ({ ...prev, trainsManaged: prev.trainsManaged + 1 }));

    // Update train status
    setTrains(prev => prev.map(t => 
      t.id === requestingTrain.id 
        ? { ...t, status: "assigned", assignedPlatform: platformId }
        : t
    ));

    // Occupy platform
    setPlatforms(prev => prev.map(p => 
      p.id === platformId 
        ? { ...p, occupied: true, trainId: requestingTrain.id }
        : p
    ));

    setRequestingTrain(null);

    // After 4-6 seconds, train departs
    setTimeout(() => {
      departTrain(requestingTrain.id, platformId);
    }, 4000 + Math.random() * 2000);
  };

  const departTrain = (trainId: string, platformId: number) => {
    const train = trains.find(t => t.id === trainId);
    if (train) {
      addLog(`${train.name} departing from Platform ${platformId}`, "info");
      setStats(prev => ({ ...prev, collisionsAvoided: prev.collisionsAvoided + 1 }));
    }

    // Free platform
    setPlatforms(prev => prev.map(p => 
      p.id === platformId 
        ? { ...p, occupied: false, trainId: undefined }
        : p
    ));

    // Remove train
    setTrains(prev => prev.filter(t => t.id !== trainId));
  };

  const addLog = (message: string, type: LogEntry["type"]) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [{ time, message, type }, ...prev].slice(0, 20));
  };

  const handleRestart = () => {
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    if (trainSpawnRef.current) clearTimeout(trainSpawnRef.current);
    
    setSelectedTrain(null);
    setGameOver(false);
    setCollisionMessage("");
    
    startGame();
  };

  const getLogIcon = (type: LogEntry["type"]) => {
    switch (type) {
      case "error": return "💥";
      case "warning": return "⚠️";
      case "success": return "✓";
      default: return "→";
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1d29] pb-24 px-6 pt-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => onNavigate("home")}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Radio className="w-8 h-8 text-[#5B9FED]" />
              <div>
                <h1 className="text-white text-3xl">Train Station Control Center</h1>
                <p className="text-gray-400">You are the Conductor - Prevent Collisions!</p>
              </div>
            </div>
          </div>
          <Button
            onClick={handleRestart}
            variant="outline"
            className="bg-[#2C3142] border-[#3d4359] text-white hover:bg-[#3d4359]"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart Game
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-[#2C3142] border-[#3d4359] p-4">
            <p className="text-gray-400 text-sm mb-1">Trains Managed</p>
            <p className="text-green-400 text-3xl">{stats.trainsManaged}</p>
          </Card>
          <Card className="bg-[#2C3142] border-[#3d4359] p-4">
            <p className="text-gray-400 text-sm mb-1">Collisions Avoided</p>
            <p className="text-green-400 text-3xl">{stats.collisionsAvoided}</p>
          </Card>
          <Card className="bg-[#2C3142] border-[#3d4359] p-4">
            <p className="text-gray-400 text-sm mb-1">Near Misses</p>
            <p className="text-red-400 text-3xl">{stats.nearMisses}</p>
          </Card>
        </div>

        <Button
          onClick={() => setShowPatternExplanation(true)}
          variant="outline"
          className="bg-[#2C3142] border-[#3d4359] text-white hover:bg-[#3d4359]"
        >
          Show Pattern Explanation
        </Button>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Incoming Trains */}
        <Card className="bg-[#2C3142] border-[#3d4359] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Radio className="w-5 h-5 text-gray-400" />
            <h3 className="text-white">Incoming Trains</h3>
            {requestingTrain && (
              <Badge className="bg-yellow-600 ml-auto">
                {countdown}s
              </Badge>
            )}
          </div>
          <div className="space-y-3">
            {trains.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">
                Waiting for trains...
              </p>
            ) : (
              trains.map(train => (
                <motion.div
                  key={train.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={() => {
                    if (train.status === "requesting" && !gameOver) {
                      setSelectedTrain(train);
                    }
                  }}
                  className={`flex items-center gap-3 rounded-lg p-3 transition-all cursor-pointer ${
                    selectedTrain?.id === train.id
                      ? "bg-[#5B9FED] border-2 border-white shadow-lg"
                      : train.status === "requesting"
                      ? "bg-yellow-600/20 border-2 border-yellow-600 animate-pulse"
                      : "bg-[#1a1d29] border-2 border-transparent"
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded flex items-center justify-center text-2xl"
                    style={{ backgroundColor: train.color }}
                  >
                    🚂
                  </div>
                  <div className="flex-1">
                    <p className="text-white">{train.name}</p>
                    <Badge
                      className={`text-xs ${
                        train.status === "approaching" ? "bg-blue-600" :
                        train.status === "requesting" ? "bg-yellow-600" :
                        train.status === "assigned" ? "bg-green-600" :
                        "bg-gray-600"
                      }`}
                    >
                      {train.status === "approaching" ? "Approaching" :
                       train.status === "requesting" ? "⚠️ REQUESTING" :
                       train.status === "assigned" ? `Platform ${train.assignedPlatform}` :
                       "Departed"}
                    </Badge>
                  </div>
                  {train.status === "requesting" && (
                    <div className="text-yellow-400 text-sm font-mono">
                      {countdown}s
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
          
          {/* Instructions when train is requesting */}
          {requestingTrain && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-yellow-600/20 border border-yellow-600 rounded-lg"
            >
              <p className="text-yellow-400 text-sm">
                👆 Click the requesting train, then assign it to a platform below!
              </p>
            </motion.div>
          )}
        </Card>

        {/* Right: Mediator Communication Log */}
        <Card className="lg:col-span-2 bg-[#2C3142] border-[#3d4359] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Radio className="w-5 h-5 text-gray-400" />
            <h3 className="text-white">Mediator Communication Log</h3>
          </div>
          <div className="bg-[#1a1d29] rounded-lg p-4 h-[400px] overflow-y-auto font-mono text-sm">
            {logs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-2 ${
                  log.type === "error" ? "text-red-400" :
                  log.type === "warning" ? "text-yellow-400" :
                  log.type === "success" ? "text-green-400" :
                  "text-gray-400"
                }`}
              >
                [{log.time}] {getLogIcon(log.type)} {log.message}
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Platform Status - Now Interactive */}
      <div className="max-w-7xl mx-auto mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white">Platform Assignment</h3>
          {selectedTrain && (
            <div className="flex items-center gap-2 bg-[#5B9FED] px-4 py-2 rounded-lg">
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: selectedTrain.color }}
              />
              <span className="text-white">Selected: {selectedTrain.name}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedTrain(null)}
                className="text-white hover:text-gray-300 ml-2"
              >
                ✕
              </Button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.map(platform => {
            const assignedTrain = trains.find(t => t.assignedPlatform === platform.id && t.status === "assigned");
            const canAssign = selectedTrain && !platform.occupied && !gameOver;
            
            return (
              <motion.div
                key={platform.id}
                whileHover={canAssign ? { scale: 1.05 } : {}}
                whileTap={canAssign ? { scale: 0.95 } : {}}
              >
                <Card
                  onClick={() => {
                    if (canAssign && selectedTrain) {
                      assignPlatform(platform.id);
                      setSelectedTrain(null);
                    }
                  }}
                  className={`bg-[#2C3142] border-2 p-6 transition-all ${
                    platform.occupied
                      ? "border-red-500 cursor-not-allowed"
                      : canAssign
                      ? "border-green-500 cursor-pointer hover:bg-green-500/20 shadow-lg shadow-green-500/50"
                      : "border-[#3d4359]"
                  }`}
                >
                  <h4 className="text-white text-xl mb-2">Platform {platform.id}</h4>
                  {platform.occupied && assignedTrain ? (
                    <div>
                      <p className="text-red-400 text-sm mb-2">🚫 Occupied</p>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: assignedTrain.color }}
                        />
                        <p className="text-gray-300 text-sm">{assignedTrain.name}</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-green-400 text-sm mb-2">✓ Available</p>
                      {canAssign && (
                        <p className="text-xs text-gray-400">Click to assign</p>
                      )}
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Platform Assignment Dialog */}
      <Dialog open={!!requestingTrain && !gameOver} onOpenChange={() => {}}>
        <DialogContent className="bg-[#2C3142] border-[#3d4359] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-yellow-400">
              <AlertTriangle className="w-6 h-6" />
              URGENT: Platform Assignment Required
            </DialogTitle>
            {requestingTrain && (
              <DialogDescription className="text-gray-300">
                <div className="flex items-center gap-3 mt-4 mb-6 bg-[#1a1d29] rounded-lg p-3">
                  <div
                    className="w-12 h-12 rounded"
                    style={{ backgroundColor: requestingTrain.color }}
                  />
                  <div>
                    <p className="text-white">{requestingTrain.name}</p>
                    <p className="text-sm text-gray-400">Requesting platform access</p>
                  </div>
                </div>
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="text-center mb-6">
            <motion.div
              key={countdown}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className={`text-6xl ${countdown <= 3 ? "text-red-400" : "text-yellow-400"}`}
            >
              {countdown}
            </motion.div>
            <p className="text-gray-400 text-sm mt-2">seconds remaining</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {platforms.map(platform => (
              <Button
                key={platform.id}
                onClick={() => assignPlatform(platform.id)}
                disabled={platform.occupied}
                className={`h-24 text-lg ${
                  platform.occupied
                    ? "bg-red-900/20 border-2 border-red-500 text-red-400 cursor-not-allowed"
                    : "bg-[#1a1d29] border-2 border-[#5B9FED] text-white hover:bg-[#5B9FED]"
                }`}
              >
                <div>
                  <p className="text-xl">Platform {platform.id}</p>
                  <p className="text-xs">
                    {platform.occupied ? "Occupied" : "Available"}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Game Over Dialog */}
      <Dialog open={gameOver} onOpenChange={() => {}}>
        <DialogContent className="bg-[#2C3142] border-4 border-red-500 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-400 text-2xl justify-center">
              💥 COLLISION!
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-center mt-4">
              {collisionMessage}
            </DialogDescription>
          </DialogHeader>

          <div className="my-6 space-y-3">
            <div className="text-center">
              <p className="text-xl text-white mb-2">Final Score: {stats.trainsManaged}</p>
              <div className="space-y-1 text-sm text-gray-400">
                <p>Trains Managed: {stats.trainsManaged}</p>
                <p>Collisions Avoided: {stats.collisionsAvoided}</p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleRestart}
            className="w-full bg-[#5B9FED] hover:bg-[#4a8fd9] text-white"
            size="lg"
          >
            Restart Game
          </Button>
        </DialogContent>
      </Dialog>

      {/* Pattern Explanation Dialog */}
      <Dialog open={showPatternExplanation} onOpenChange={setShowPatternExplanation}>
        <DialogContent className="bg-[#2C3142] border-[#3d4359] text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#5B9FED]" />
              Mediator Pattern Demonstration
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-gray-300">
            <p>
              In this game, <strong className="text-white">you are the Mediator</strong>. 
              The trains don't communicate directly with the platforms. Instead, they send 
              requests to you (the mediator), and you coordinate the assignments.
            </p>
            
            <div className="bg-[#1a1d29] rounded-lg p-4">
              <p className="text-sm">
                <strong className="text-[#5B9FED]">Without Mediator:</strong><br />
                Trains would need to check all platforms, communicate with each other, 
                and handle conflicts independently (complex and error-prone).
              </p>
            </div>

            <div className="bg-[#1a1d29] rounded-lg p-4">
              <p className="text-sm">
                <strong className="text-green-400">With Mediator:</strong><br />
                Trains simply request platform access. The mediator (you) has a central 
                view of all platforms, prevents conflicts, and coordinates assignments efficiently.
              </p>
            </div>

            <p className="text-sm">
              This centralized coordination reduces complexity and makes the system 
              easier to maintain and extend!
            </p>
          </div>

          <Button
            onClick={() => setShowPatternExplanation(false)}
            className="w-full bg-[#5B9FED] hover:bg-[#4a8fd9] text-white"
          >
            Got it!
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}