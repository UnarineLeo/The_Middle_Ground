import { Home, MessageCircle, Trophy, Book, Gamepad2, Code, Bug } from "lucide-react";
import { motion } from "motion/react";

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "quiz", icon: Trophy, label: "Quiz" },
    { id: "codearena", icon: Bug, label: "Debug" },
    { id: "learn", icon: Book, label: "Learn The Pattern" },
    { id: "conductor", icon: Gamepad2, label: "Conductor" }
  ];

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-[#2C2F33] border-t border-[#2F3136] px-4 py-3 card-shadow z-50"
    >
      <div className="max-w-6xl mx-auto flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                isActive 
                  ? "text-[#5865F2]" 
                  : "text-gray-400 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Icon className={`w-6 h-6 ${isActive ? "glow-effect" : ""}`} />
              </motion.div>
              <span className="text-xs">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
