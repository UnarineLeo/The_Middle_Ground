import { useState } from "react";
import { Lightbulb, Download, ArrowLeft, ArrowRight, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { quizQuestions } from "../data/mockData";

interface QuizPageProps {
  onNavigate: (page: string) => void;
}

export function QuizPage({ onNavigate }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleSubmitAnswer = () => {
    setShowFeedback(true);
    setAnsweredQuestions(answeredQuestions + 1);
    
    if (question.type === "fill-in") {
      if (userAnswer.toLowerCase().trim() === question.answer.toLowerCase()) {
        setScore(score + 100);
      }
    } else if (selectedAnswer === question.correctAnswer) {
      setScore(score + 100);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setUserAnswer("");
      setShowFeedback(false);
      setShowHint(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setUserAnswer("");
      setShowFeedback(false);
      setShowHint(false);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([question.skeletonCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mediator_pattern_skeleton.cpp`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pb-24 px-4 pt-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <Button
          variant="ghost"
          onClick={() => onNavigate("home")}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#5865F2]" />
              <span className="text-white">Score: {score}</span>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className={`${
              question.difficulty === "Easy" 
                ? "bg-green-500/20 text-green-400" 
                : question.difficulty === "Medium"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {question.difficulty}
          </Badge>
        </div>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
          <span className="text-sm text-[#5865F2]">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-3" />
      </motion.div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-[#2C2F33] border-[#2F3136] p-6 card-shadow mb-6">
            <div className="mb-4">
              <Badge variant="outline" className="border-[#5865F2] text-[#5865F2] mb-3">
                {question.pattern}
              </Badge>
              <h2 className="text-white mb-6">{question.question}</h2>
            </div>

            {/* Answer Options */}
            {question.type === "fill-in" ? (
              <div className="mb-6">
                <Input
                  placeholder="Type your answer here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="bg-[#23272A] border-[#2F3136] text-white"
                  disabled={showFeedback}
                />
              </div>
            ) : (
              <RadioGroup
                value={selectedAnswer?.toString()}
                onValueChange={(value) => setSelectedAnswer(parseInt(value))}
                className="space-y-3 mb-6"
                disabled={showFeedback}
              >
                {question.options.map((option, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all ${
                      showFeedback && index === question.correctAnswer
                        ? "border-green-500 bg-green-500/10"
                        : showFeedback && index === selectedAnswer
                        ? "border-red-500 bg-red-500/10"
                        : selectedAnswer === index
                        ? "border-[#5865F2] bg-[#5865F2]/10"
                        : "border-[#2F3136] bg-[#23272A] hover:border-[#5865F2]/50"
                    }`}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
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

            {/* Actions */}
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={showFeedback || (question.type === "fill-in" ? !userAnswer : selectedAnswer === null)}
                  className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white glow-effect"
                >
                  Submit Answer
                </Button>
              </motion.div>
              
              <Button
                variant="outline"
                onClick={() => setShowHint(!showHint)}
                className="bg-[#2C2F33] border-[#2F3136] text-[#5865F2] hover:bg-[#5865F2] hover:text-white"
              >
                <Lightbulb className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="bg-[#5865F2]/10 border-[#5865F2] p-4 mb-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[#5865F2] mt-0.5" />
                <div>
                  <h4 className="text-[#5865F2] mb-1">Hint</h4>
                  <p className="text-gray-300 text-sm">{question.hint}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className={`p-4 mb-6 border ${
              (question.type === "fill-in" 
                ? userAnswer.toLowerCase().trim() === question.answer.toLowerCase()
                : selectedAnswer === question.correctAnswer)
                ? "bg-green-500/10 border-green-500"
                : "bg-red-500/10 border-red-500"
            }`}>
              <h4 className={`mb-2 ${
                (question.type === "fill-in"
                  ? userAnswer.toLowerCase().trim() === question.answer.toLowerCase()
                  : selectedAnswer === question.correctAnswer)
                  ? "text-green-400"
                  : "text-red-400"
              }`}>
                {(question.type === "fill-in"
                  ? userAnswer.toLowerCase().trim() === question.answer.toLowerCase()
                  : selectedAnswer === question.correctAnswer)
                  ? "Correct! 🎉"
                  : "Not quite right"}
              </h4>
              <p className="text-gray-300 text-sm mb-2">{question.explanation}</p>
              <p className="text-xs text-gray-400">Source: {question.source}</p>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skeleton Code */}
      <Card className="bg-[#2C2F33] border-[#2F3136] p-6 card-shadow mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white">Skeleton Code</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadCode}
            className="bg-[#23272A] border-[#2F3136] text-[#5865F2] hover:bg-[#5865F2] hover:text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download .cpp
          </Button>
        </div>
        <div className="bg-[#1E2124] rounded-lg p-4 border border-[#2F3136]">
          <pre className="text-sm text-gray-300 overflow-x-auto">
            <code>{question.skeletonCode}</code>
          </pre>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevQuestion}
          disabled={currentQuestion === 0}
          className="bg-[#2C2F33] border-[#2F3136] text-white hover:bg-[#5865F2] disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          {quizQuestions.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full ${
                idx === currentQuestion 
                  ? "bg-[#5865F2]" 
                  : idx < currentQuestion
                  ? "bg-green-500"
                  : "bg-[#2C2F33]"
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleNextQuestion}
          disabled={currentQuestion === quizQuestions.length - 1}
          className="bg-[#2C2F33] border-[#2F3136] text-white hover:bg-[#5865F2] disabled:opacity-50"
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
