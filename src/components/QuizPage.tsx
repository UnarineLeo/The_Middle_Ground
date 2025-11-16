import { useState } from "react";
import {
  ArrowLeft,
  Award,
  Lock,
  CheckCircle,
  Trophy,
  Train,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { quizQuestions } from "../data/mockData";

interface QuizNode {
  id: number;
  question: (typeof quizQuestions)[0];
  position: { x: number; y: number };
  completed: boolean;
  locked: boolean;
}

interface QuizPageProps {
  onNavigate: (page: string) => void;
}

export function QuizPage({ onNavigate }: QuizPageProps) {
  const [showPath, setShowPath] = useState(true);
  const [selectedNode, setSelectedNode] =
    useState<QuizNode | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<
    number | null
  >(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completedNodes, setCompletedNodes] = useState<
    Set<number>
  >(new Set());

  // Limit to 10 quizzes
  const limitedQuestions = quizQuestions.slice(0, 20);

  // Create quiz nodes with railway winding path
  const createQuizNodes = (): QuizNode[] => {
    const nodes: QuizNode[] = [];

    limitedQuestions.forEach((question, index) => {
      // Railway winding pattern
      const positions = [
        50, 35, 25, 35, 50, 65, 75, 65, 50, 35,
      ];
      const x = positions[index % positions.length];
      const y = index * 160 + 200; // Start after train station

      nodes.push({
        id: index,
        question,
        position: { x, y },
        completed: completedNodes.has(index),
        locked: index > 0 && !completedNodes.has(index - 1), // Strict: need previous completed
      });
    });

    return nodes;
  };

  const quizNodes = createQuizNodes();

  const handleNodeClick = (node: QuizNode) => {
    if (!node.locked) {
      setSelectedNode(node);
      setSelectedAnswer(null);
      setUserAnswer("");
      setShowFeedback(false);
      setShowPath(false);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedNode) return;

    setShowFeedback(true);
    const question = selectedNode.question;
    let isCorrect = false;

    if (question.type === "fill-in") {
      isCorrect =
        userAnswer.toLowerCase().trim() ===
        question.answer.toLowerCase();
    } else {
      isCorrect = selectedAnswer === question.correctAnswer;
    }

    if (isCorrect) {
      const points =
        question.difficulty === "Easy"
          ? 25
          : question.difficulty === "Medium"
            ? 50
            : 100;
      setScore(score + points);

      // Only mark current as completed (strict mode)
      const newCompleted = new Set(completedNodes);
      newCompleted.add(selectedNode.id);
      setCompletedNodes(newCompleted);
    }
  };

  const handleContinue = () => {
    setShowPath(true);
    setSelectedNode(null);
    setSelectedAnswer(null);
    setUserAnswer("");
    setShowFeedback(false);
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setUserAnswer("");
    setShowFeedback(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "Easy")
      return "bg-green-500/20 text-green-400 border-green-500/30";
    if (difficulty === "Medium")
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  if (!showPath && selectedNode) {
    // Quiz Question View
    const question = selectedNode.question;

    return (
      <div className="pb-24 px-4 pt-6 max-w-7xl mx-auto min-h-screen bg-gradient-to-b from-[#23272A] to-[#1a1d20]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <Button
            variant="ghost"
            onClick={handleContinue}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Railway
          </Button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#5865F2]" />
              <span className="text-white">{score} XP</span>
            </div>
            <Badge
              className={getDifficultyColor(
                question.difficulty,
              )}
            >
              {question.difficulty}
            </Badge>
          </div>
        </motion.div>

        {/* Question Number */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-6"
        >
          <p className="text-gray-400 text-sm mb-1">
            Station {selectedNode.id + 1} of{" "}
            {limitedQuestions.length}
          </p>
          <div className="flex justify-center gap-1 mt-2">
            {Array.from({
              length: Math.min(10, limitedQuestions.length),
            }).map((_, i) => (
              <div
                key={i}
                className={`h-1 w-8 rounded-full ${
                  i <= selectedNode.id
                    ? "bg-[#5865F2]"
                    : "bg-[#2C2F33]"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-[#2C2F33] border-[#2F3136] p-6 card-shadow mb-6">
              <div className="mb-6">
                <Badge
                  variant="outline"
                  className="border-[#5865F2] text-[#5865F2] mb-4"
                >
                  {question.pattern}
                </Badge>
                <h2 className="text-white text-xl mb-6">
                  {question.question}
                </h2>
              </div>

              {/* Answer Options */}
              {question.type === "fill-in" ? (
                <div className="mb-6">
                  <Input
                    placeholder="Type your answer here..."
                    value={userAnswer}
                    onChange={(e) =>
                      setUserAnswer(e.target.value)
                    }
                    className="bg-[#23272A] border-[#2F3136] text-white text-lg p-6"
                    disabled={showFeedback}
                    autoFocus
                  />
                </div>
              ) : (
                <RadioGroup
                  value={selectedAnswer?.toString()}
                  onValueChange={(value) =>
                    setSelectedAnswer(parseInt(value))
                  }
                  className="space-y-3 mb-6"
                  disabled={showFeedback}
                >
                  {question.options.map((option, index) => (
                    <motion.div
                      key={index}
                      whileHover={{
                        scale: showFeedback ? 1 : 1.02,
                      }}
                      className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer ${
                        showFeedback &&
                        index === question.correctAnswer
                          ? "border-green-500 bg-green-500/10"
                          : showFeedback &&
                              index === selectedAnswer
                            ? "border-red-500 bg-red-500/10"
                            : selectedAnswer === index
                              ? "border-[#5865F2] bg-[#5865F2]/10"
                              : "border-[#2F3136] bg-[#23272A] hover:border-[#5865F2]/50"
                      }`}
                    >
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${index}`}
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer text-gray-200"
                      >
                        {option}
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              )}

              {/* Submit Button */}
              {!showFeedback && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={
                      question.type === "fill-in"
                        ? !userAnswer
                        : selectedAnswer === null
                    }
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-6 text-lg glow-effect"
                  >
                    Check Answer
                  </Button>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card
                className={`p-6 mb-6 border-2 ${
                  (
                    question.type === "fill-in"
                      ? userAnswer.toLowerCase().trim() ===
                        question.answer.toLowerCase()
                      : selectedAnswer ===
                        question.correctAnswer
                  )
                    ? "bg-green-500/10 border-green-500"
                    : "bg-red-500/10 border-red-500"
                }`}
              >
                <h3
                  className={`mb-3 flex items-center gap-2 text-xl ${
                    (
                      question.type === "fill-in"
                        ? userAnswer.toLowerCase().trim() ===
                          question.answer.toLowerCase()
                        : selectedAnswer ===
                          question.correctAnswer
                    )
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {(
                    question.type === "fill-in"
                      ? userAnswer.toLowerCase().trim() ===
                        question.answer.toLowerCase()
                      : selectedAnswer ===
                        question.correctAnswer
                  )
                    ? "🎉 Correct!"
                    : "❌ Not quite"}
                </h3>
                <p className="text-gray-300 mb-4">
                  {question.explanation}
                </p>
                <p className="text-xs text-gray-500 mb-6">
                  Source: {question.source}
                </p>

                {/* Show different buttons based on correct/incorrect answer */}
                {(
                  question.type === "fill-in"
                    ? userAnswer.toLowerCase().trim() ===
                      question.answer.toLowerCase()
                    : selectedAnswer ===
                      question.correctAnswer
                ) ? (
                  // Correct answer - show Continue button
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleContinue}
                      className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-6"
                    >
                      Continue Journey
                    </Button>
                  </motion.div>
                ) : (
                  // Incorrect answer - show Retry and Continue buttons
                  <div className="space-y-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleRetry}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6"
                      >
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Try Again
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleContinue}
                        variant="outline"
                        className="w-full border-[#2F3136] bg-[#23272A] hover:bg-[#2C2F33] text-gray-300 py-6"
                      >
                        Continue Journey
                      </Button>
                    </motion.div>
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Railway Path View
  return (
    <div className="pb-24 px-4 pt-6 min-h-screen bg-gradient-to-b from-[#23272A] to-[#1a1d20]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 max-w-md mx-auto"
      >
        <Button
          variant="ghost"
          onClick={() => onNavigate("home")}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-2 bg-[#2C2F33] px-4 py-2 rounded-lg border border-[#2F3136]">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-white">{score} XP</span>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-8 max-w-md mx-auto"
      >
        <h1 className="text-2xl text-white mb-1">
          🚂 Mediator Pattern Railway
        </h1>
        <p className="text-gray-400 text-sm">
          Complete each station to unlock the next
        </p>
      </motion.div>

      {/* Railway Path Container */}
      <div className="relative max-w-md mx-auto">
        {/* Railway Tracks Background */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-16"
          style={{
            height: `${quizNodes.length * 160 + 400}px`,
            top: "100px",
          }}
        >
          {/* Wooden sleepers */}
          {Array.from({
            length: Math.floor(
              (quizNodes.length * 160 + 400) / 20,
            ),
          }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-2 bg-gradient-to-r from-amber-900 to-amber-800 rounded"
              style={{ top: `${i * 20}px` }}
            />
          ))}
          {/* Rails */}
          <div className="absolute left-2 w-2 h-full bg-gradient-to-b from-gray-400 to-gray-500 rounded-full shadow-lg" />
          <div className="absolute right-2 w-2 h-full bg-gradient-to-b from-gray-400 to-gray-500 rounded-full shadow-lg" />
        </div>

        <div>
          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-6 mt-12 max-w-md mx-auto"
            style={{ paddingBottom: "20px" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-b from-green-500 to-green-700 rounded border-2 border-green-800 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-400 text-sm">
                Completed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-b from-[#5865F2] to-[#4752C4] rounded border-2 border-[#3b4a9e] flex items-center justify-center">
                <Train className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-400 text-sm">
                Available
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-b from-gray-600 to-gray-800 rounded border-2 border-gray-900 flex items-center justify-center">
                <Lock className="w-4 h-4 text-gray-400" />
              </div>
              <span className="text-gray-400 text-sm">
                Locked
              </span>
            </div>
          </motion.div>
        </div>

        <div></div>

        {/* Train Station (Start) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mb-8"
          style={{ paddingTop: "20px" }}
        >
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gradient-to-b from-red-600 to-red-800 rounded-lg border-4 border-red-900 shadow-2xl flex items-center justify-center relative">
              {/* Roof */}
              <div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-gradient-to-b from-gray-700 to-gray-800 border-t-4 border-gray-900"
                style={{
                  clipPath:
                    "polygon(10% 100%, 90% 100%, 100% 0%, 0% 0%)",
                }}
              />
              {/* Windows */}
              <div className="absolute top-4 left-4 w-6 h-6 bg-yellow-200 border-2 border-yellow-900 rounded" />
              <div className="absolute top-4 right-4 w-6 h-6 bg-yellow-200 border-2 border-yellow-900 rounded" />
              <div className="text-white text-4xl">🏛️</div>
            </div>
            <div className="mt-4 bg-[#2C2F33] px-4 py-2 rounded-lg border border-[#2F3136]">
              <p className="text-white font-bold">
                Start Station
              </p>
              <p className="text-gray-400 text-xs">
                Begin your journey
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quiz Nodes (Trains) */}
        <div
          className="relative"
          style={{
            height: `${quizNodes.length * 160 + 200}px`,
          }}
        >
          {quizNodes.map((node, index) => {
            const isCurrent = !node.completed && !node.locked;

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                className="absolute"
                style={{
                  left: `${node.position.x}%`,
                  top: `${node.position.y}px`,
                  transform: "translateX(-50%)",
                }}
              >
                {/* Train Node */}
                <motion.button
                  onClick={() => handleNodeClick(node)}
                  disabled={node.locked}
                  whileHover={
                    node.locked ? {} : { scale: 1.05, y: -5 }
                  }
                  whileTap={node.locked ? {} : { scale: 0.95 }}
                  className={`relative ${node.locked ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {/* Train Body */}
                  <div className="relative">
                    {/* Main Train Car */}
                    <div
                      className={`w-24 h-20 rounded-lg border-4 shadow-2xl flex items-center justify-center relative overflow-hidden ${
                        node.completed
                          ? "bg-gradient-to-b from-green-500 to-green-700 border-green-800"
                          : node.locked
                            ? "bg-gradient-to-b from-gray-600 to-gray-800 border-gray-900"
                            : "bg-gradient-to-b from-[#5865F2] to-[#4752C4] border-[#3b4a9e]"
                      }`}
                      style={{
                        boxShadow: node.completed
                          ? "0 8px 0 #15803d, 0 12px 24px rgba(0,0,0,0.4)"
                          : !node.locked
                            ? "0 8px 0 #3b4a9e, 0 12px 24px rgba(88, 101, 242, 0.4)"
                            : "0 8px 0 #374151, 0 12px 24px rgba(0,0,0,0.4)",
                      }}
                    >
                      {/* Windows */}
                      <div className="absolute top-2 left-2 w-5 h-5 bg-blue-200 border-2 border-blue-900 rounded" />
                      <div className="absolute top-2 right-2 w-5 h-5 bg-blue-200 border-2 border-blue-900 rounded" />

                      {/* Icon */}
                      {node.completed ? (
                        <CheckCircle
                          className="w-8 h-8 text-white z-10"
                          fill="white"
                        />
                      ) : node.locked ? (
                        <Lock className="w-8 h-8 text-gray-400 z-10" />
                      ) : (
                        <Train className="w-8 h-8 text-white z-10" />
                      )}
                    </div>

                    {/* Train Wheels */}
                    <div className="absolute -bottom-3 left-2 w-6 h-6 rounded-full bg-gray-800 border-4 border-gray-900" />
                    <div className="absolute -bottom-3 right-2 w-6 h-6 rounded-full bg-gray-800 border-4 border-gray-900" />

                    {/* Smoke animation for current train */}
                    {isCurrent && (
                      <motion.div
                        animate={{
                          y: [-10, -30, -50],
                          opacity: [0.8, 0.4, 0],
                          scale: [0.8, 1, 1.2],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                        }}
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-4xl"
                      >
                        💨
                      </motion.div>
                    )}
                  </div>

                  {/* Station Number */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-[#2C2F33] rounded-lg px-3 py-1 border border-[#2F3136]">
                    <span
                      className={`text-xs font-bold ${node.locked ? "text-gray-600" : "text-white"}`}
                    >
                      Station {node.id + 1}
                    </span>
                  </div>

                  {/* Pulse for current */}
                  {isCurrent && (
                    <motion.div
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                      }}
                      className="absolute inset-0 rounded-lg bg-[#5865F2]"
                      style={{ zIndex: -1 }}
                    />
                  )}
                </motion.button>

                {/* Train after 5th quiz */}
                {index === 4 && (
                  <motion.div
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 1,
                      type: "spring",
                      stiffness: 50,
                    }}
                    className="absolute -bottom-32 left-1/2 transform -translate-x-1/2"
                  ></motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Completion Celebration */}
        {completedNodes.size === limitedQuestions.length && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              delay: 0.5,
            }}
            className="flex flex-col items-center justify-center mt-16 mb-8"
          >
            <div
              className="w-32 h-32 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-8 border-yellow-300"
              style={{
                boxShadow:
                  "0 12px 0 #d4a800, 0 15px 30px rgba(0,0,0,0.4)",
              }}
            >
              <Trophy className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-2xl text-white mt-8">
              Journey Complete! 🎉
            </h2>
            <p className="text-gray-400 mt-2 text-center">
              You've mastered all stations
            </p>
            <div className="mt-6 flex items-center gap-2 bg-[#5865F2] px-6 py-3 rounded-2xl glow-effect">
              <Trophy className="w-5 h-5 text-white" />
              <span className="text-white text-lg">
                {score} XP earned
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}