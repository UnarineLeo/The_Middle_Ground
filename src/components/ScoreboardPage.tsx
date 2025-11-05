import { useState, useEffect } from "react";
import { ArrowLeft, Trophy, Award, TrendingUp, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { leaderboard } from "../data/mockData";

interface ScoreboardPageProps {
  onNavigate: (page: string) => void;
}

export function ScoreboardPage({ onNavigate }: ScoreboardPageProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"all" | "winners" | "losers">("all");

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const winners = leaderboard.filter(p => p.status === "winner");
  const losers = leaderboard.filter(p => p.status === "loser");
  
  const displayedUsers = selectedTab === "all" 
    ? leaderboard 
    : selectedTab === "winners" 
    ? winners 
    : losers;

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "text-yellow-400 bg-yellow-500/20";
      case 2: return "text-gray-300 bg-gray-500/20";
      case 3: return "text-orange-400 bg-orange-500/20";
      default: return "text-gray-400 bg-gray-500/10";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return `#${rank}`;
    }
  };

  return (
    <div className="pb-24 px-4 pt-6 max-w-4xl mx-auto">
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: Math.random() * 360
                }}
                animate={{ 
                  y: window.innerHeight + 20,
                  rotate: Math.random() * 720
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2,
                  ease: "linear"
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: ["#5865F2", "#43B581", "#FAA61A", "#F04747"][Math.floor(Math.random() * 4)]
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <Button
          variant="ghost"
          onClick={() => onNavigate("home")}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <div>
            <h1 className="text-white">Scoreboard</h1>
            <p className="text-sm text-gray-400">Top performers this week</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 p-4 card-shadow">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <div>
              <div className="text-2xl text-white">{winners.length}</div>
              <div className="text-xs text-gray-400">Winners</div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-[#5865F2]/20 to-[#5865F2]/10 border-[#5865F2]/30 p-4 card-shadow">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-[#5865F2]" />
            <div>
              <div className="text-2xl text-white">156</div>
              <div className="text-xs text-gray-400">Total Badges</div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30 p-4 card-shadow">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <div>
              <div className="text-2xl text-white">87%</div>
              <div className="text-xs text-gray-400">Avg Score</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 mb-6"
      >
        {[
          { id: "all", label: "All Players", icon: Trophy },
          { id: "winners", label: "Winners", icon: Award },
          { id: "losers", label: "Rising Stars", icon: Zap }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                selectedTab === tab.id
                  ? "bg-[#5865F2] text-white glow-effect"
                  : "bg-[#2C2F33] text-gray-400 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-[#2C2F33] border-[#2F3136] card-shadow overflow-hidden">
          <div className="p-4 bg-[#23272A] border-b border-[#2F3136]">
            <h3 className="text-white">Rankings</h3>
          </div>

          <div className="divide-y divide-[#2F3136]">
            <AnimatePresence mode="wait">
              {displayedUsers.map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 hover:bg-[#23272A] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getRankColor(user.rank)}`}>
                      <span className="font-semibold">
                        {getRankIcon(user.rank)}
                      </span>
                    </div>

                    {/* Avatar & Info */}
                    <Avatar className="w-12 h-12 border-2 border-[#5865F2]">
                      <AvatarFallback className="bg-[#5865F2] text-white">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-white">{user.name}</h4>
                        {user.rank <= 3 && (
                          <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                            Top {user.rank}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Zap className="w-3 h-3" />
                          {user.score} pts
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Award className="w-3 h-3" />
                          {user.badges} badges
                        </div>
                      </div>
                    </div>

                    {/* Score Animation */}
                    <motion.div
                      className="text-right"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-2xl text-[#5865F2]">
                        {user.score}
                      </div>
                      <div className="text-xs text-gray-400">points</div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>

      {/* Your Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <Card className="bg-gradient-to-r from-[#5865F2]/20 to-purple-500/20 border-[#5865F2] p-6 card-shadow glow-effect">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14 border-2 border-[#5865F2]">
                <AvatarFallback className="bg-[#5865F2] text-white">
                  AJ
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-white">Your Rank: #4</h3>
                <p className="text-sm text-gray-400">Keep learning to climb higher!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl text-[#5865F2]">2847</div>
              <div className="text-sm text-gray-400">points</div>
            </div>
          </div>

          <Separator className="my-4 bg-[#2F3136]" />

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl text-white">8</div>
              <div className="text-xs text-gray-400">Badges Earned</div>
            </div>
            <div>
              <div className="text-xl text-white">23</div>
              <div className="text-xs text-gray-400">Patterns Learned</div>
            </div>
            <div>
              <div className="text-xl text-white">89%</div>
              <div className="text-xs text-gray-400">Quiz Average</div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
