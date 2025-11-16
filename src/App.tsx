/**
 * Mediator Pattern Educational App
 * 
 * A gamified learning platform focused on teaching the Mediator Design Pattern
 * with interactive features, train simulation, and Discord-inspired dark theme.
 * 
 * Features:
 * - Interactive learning modules with visual diagrams
 * - Train conductor simulator (gamified mediator demonstration)
 * - Quiz system with multiple question types
 * - AI chatbot (AKA) for contextual help
 * - Scoreboard with leaderboard and achievements
 */

import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { MediatorLearnPage } from "./components/MediatorLearnPage";
import { QuizPage } from "./components/QuizPage";
import { ChatbotPage } from "./components/ChatbotPage";
import { CodeArenaPage } from "./components/CodeArenaPage";
import { ConductorPage } from "./components/ConductorPage";
import { ScoreboardPage } from "./components/ScoreboardPage";
import { LoginPage } from "./components/LoginPage";
import { BottomNav } from "./components/BottomNav";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleLogin = (user: string) => {
    setUsername(user);
    setIsLoggedIn(true);
    setCurrentPage("home");
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#23272A]">
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#23272A]">
      {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
      {currentPage === "learn" && <MediatorLearnPage onNavigate={handleNavigate} />}
      {currentPage === "quiz" && <QuizPage onNavigate={handleNavigate} />}
      {currentPage === "codearena" && <CodeArenaPage onNavigate={handleNavigate} />}
      {currentPage === "chatbot" && <ChatbotPage onNavigate={handleNavigate} />}
      {currentPage === "conductor" && <ConductorPage onNavigate={handleNavigate} />}
      {currentPage === "scoreboard" && <ScoreboardPage onNavigate={handleNavigate} />}
      
      {currentPage !== "home" && <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />}
      <Toaster />
    </div>
  );
}