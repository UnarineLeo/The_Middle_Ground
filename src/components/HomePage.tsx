import { useState } from "react";
import { Search, Filter, LogOut, MessageCircle, Award, ChevronRight, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { designPatterns, userProfile } from "../data/mockData";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Behavioral", "Structural", "Creational"];
  
  const filteredPatterns = designPatterns.filter(pattern => {
    const matchesSearch = pattern.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || pattern.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-24 px-4 pt-6 max-w-6xl mx-auto">
      {/* Header with Profile */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <Avatar className="w-14 h-14 border-2 border-[#5865F2]">
            <AvatarFallback className="bg-[#5865F2] text-white">
              {userProfile.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-white">{userProfile.name}</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Level {userProfile.level}</span>
              <div className="w-24 h-2 bg-[#2C2F33] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(userProfile.xp / userProfile.nextLevelXp) * 100}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-[#5865F2] to-[#7289DA]"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("scoreboard")}
            className="p-2 rounded-lg bg-[#2C2F33] text-yellow-400 hover:bg-yellow-500 hover:text-white transition-all"
          >
            <Trophy className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("chatbot")}
            className="p-2 rounded-lg bg-[#2C2F33] text-[#5865F2] hover:bg-[#5865F2] hover:text-white transition-all glow-effect"
          >
            <MessageCircle className="w-5 h-5" />
          </motion.button>
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Featured Pattern Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-r from-[#5865F2]/20 via-purple-500/20 to-blue-500/20 border-[#5865F2] p-6 card-shadow glow-effect">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🚂</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-white">Now Learning: Mediator Pattern</h3>
                <Badge className="bg-yellow-500 text-black">Featured</Badge>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                Master how objects communicate through a central coordinator. Control train traffic, chat rooms, and more!
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => onNavigate("learn")}
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
                >
                  Start Learning
                </Button>
                <Button
                  onClick={() => onNavigate("conductor")}
                  variant="outline"
                  className="border-[#5865F2] hover:bg-[#5865F2] text-white"
                >
                  Try the Simulator
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Badges Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-[#5865F2]" />
          <h3 className="text-white">Your Badges</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {userProfile.badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className={`flex flex-col items-center gap-1 min-w-20 p-3 rounded-xl ${
                badge.earned 
                  ? "bg-[#2C2F33] border border-[#5865F2] glow-effect" 
                  : "bg-[#2C2F33] opacity-50"
              }`}
            >
              <span className="text-2xl">{badge.icon}</span>
              <span className="text-xs text-center text-gray-300">{badge.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 flex gap-2"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search patterns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#2C2F33] border-[#2F3136] text-white placeholder:text-gray-500"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-[#2C2F33] border-[#2F3136] text-white hover:bg-[#5865F2] hover:text-white">
              <Filter className="w-5 h-5 mr-2" />
              {selectedCategory}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#2C2F33] border-[#2F3136]">
            {categories.map(category => (
              <DropdownMenuItem
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="text-white hover:bg-[#5865F2] cursor-pointer"
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      {/* Pattern Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatterns.map((pattern, index) => {
          const isMediator = pattern.id === 1;
          const isDisabled = !isMediator;
          
          return (
            <motion.div
              key={pattern.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={isMediator ? { y: -4 } : {}}
              className={isDisabled ? "opacity-40" : ""}
            >
              <Card
                className={`bg-[#2C2F33] border-[#2F3136] p-5 card-shadow transition-all group ${
                  isMediator 
                    ? "cursor-pointer hover:border-[#5865F2] ring-2 ring-[#5865F2] ring-offset-2 ring-offset-[#23272A]" 
                    : "cursor-not-allowed grayscale"
                }`}
                onClick={() => isMediator && onNavigate("learn")}
              >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{pattern.icon}</div>
                <div className="flex gap-2">
                  {isMediator && (
                    <Badge className="bg-[#5865F2] text-white">
                      Featured ⭐
                    </Badge>
                  )}
                  {isDisabled && (
                    <div>
                      <Badge className="bg-[#5865F2] text-white">
                        Coming Soon
                      </Badge>
                    </div>
                  )}
                  <Badge 
                    variant="secondary" 
                    className={`${
                      pattern.difficulty === "Beginner" 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {pattern.difficulty}
                  </Badge>
                </div>
              </div>
              
              <h3 className={`mb-2 ${isMediator ? "text-white" : "text-gray-500"}`}>{pattern.name}</h3>
              <p className={`text-sm mb-4 line-clamp-2 ${isMediator ? "text-gray-400" : "text-gray-600"}`}>
                {pattern.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className={isMediator ? "text-gray-400" : "text-gray-600"}>Progress</span>
                  <span className={isMediator ? "text-[#5865F2]" : "text-gray-600"}>{pattern.progress}%</span>
                </div>
                <Progress value={pattern.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between mt-4">
                <Badge variant="outline" className={isMediator ? "border-[#5865F2] text-[#5865F2]" : "border-gray-600 text-gray-600"}>
                  {pattern.category}
                </Badge>
                <ChevronRight className={`w-5 h-5 transition-all ${
                  isMediator 
                    ? "text-gray-400 group-hover:text-[#5865F2] group-hover:translate-x-1" 
                    : "text-gray-600"
                }`} />
              </div>
            </Card>
          </motion.div>
        );
        })}
      </div>
    </div>
  );
}
