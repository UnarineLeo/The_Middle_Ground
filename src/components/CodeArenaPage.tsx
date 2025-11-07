import { useState } from "react";
import { ArrowLeft, Code, Download, Lightbulb, CheckCircle2, XCircle, Shuffle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { toast } from "sonner@2.0.3";

interface CodeArenaPageProps {
  onNavigate: (page: string) => void;
}
import { challenges } from "../data/mockData";

// Syntax highlighting helper
const highlightCppSyntax = (code: string) => {
  const keywords = ['class', 'private', 'public', 'void', 'for', 'if', 'return', 'auto', 'vector', 'string', 'cout', 'endl', 'this'];
  const types = ['vector', 'string', 'int', 'bool', 'char', 'double', 'float'];
  
  // Preserve leading whitespace
  const leadingWhitespace = code.match(/^(\s*)/)?.[0] || '';
  const trimmedCode = code.trimStart();
  
  let highlighted = trimmedCode;
  
  // Highlight comments
  highlighted = highlighted.replace(/\/\/(.*)/g, '<span class="text-gray-500 italic">// $1</span>');
  
  // Highlight strings (be careful not to break HTML)
  highlighted = highlighted.replace(/"([^"]*)"/g, '<span class="text-green-400">"$1"</span>');
  
  // Highlight keywords
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
    highlighted = highlighted.replace(regex, '<span class="text-purple-400">$1</span>');
  });
  
  // Highlight types
  types.forEach(type => {
    const regex = new RegExp(`\\b(${type})\\b`, 'g');
    highlighted = highlighted.replace(regex, '<span class="text-blue-400">$1</span>');
  });
  
  // Highlight function calls
  highlighted = highlighted.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="text-yellow-400">$1</span>(');
  
  // Convert leading whitespace to non-breaking spaces to preserve indentation
  const preservedWhitespace = leadingWhitespace.replace(/ /g, '&nbsp;');
  
  return preservedWhitespace + highlighted;
};


interface DraggableItemProps {
  item: { id: string; text: string };
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableItem = ({ item, index, moveItem }: DraggableItemProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CODE_LINE",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CODE_LINE",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <motion.div
      ref={(node) => drag(drop(node))}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isDragging ? 0.5 : 1, x: 0 }}
      className={`bg-[#23272A] border border-[#2F3136] rounded-lg hover:border-[#5865F2] transition-all overflow-hidden ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex cursor-move">
        {/* Line Number */}
        <div className="bg-[#1E1F22] px-4 py-3 border-r border-[#2F3136] select-none">
          <span className="text-gray-600 text-sm font-mono">{index + 1}</span>
        </div>
        {/* Code Content */}
        <div className="flex-1 px-4 py-3">
          <code 
            className="text-sm text-gray-300 font-mono"
            dangerouslySetInnerHTML={{ __html: highlightCppSyntax(item.text) }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export function CodeArenaPage({ onNavigate }: CodeArenaPageProps) {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [fillAnswers, setFillAnswers] = useState<{ [key: string]: string }>({});
  const [draggedItems, setDraggedItems] = useState<{ id: string; text: string }[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentChallenge = challenges[currentChallengeIndex];

  // Initialize dragged items when challenge changes
  useState(() => {
    if (currentChallenge.type === "drag" && currentChallenge.dragItems) {
      // Shuffle items
      const shuffled = [...currentChallenge.dragItems].sort(() => Math.random() - 0.5);
      setDraggedItems(shuffled);
    }
  });

  const handleFillAnswer = (blankId: string, value: string) => {
    setFillAnswers({ ...fillAnswers, [blankId]: value });
    setIsSubmitted(false);
  };

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const newItems = [...draggedItems];
    const [removed] = newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, removed);
    setDraggedItems(newItems);
    setIsSubmitted(false);
  };

  const shuffleItems = () => {
    if (currentChallenge.dragItems) {
      const shuffled = [...currentChallenge.dragItems].sort(() => Math.random() - 0.5);
      setDraggedItems(shuffled);
      setIsSubmitted(false);
    }
  };

  const handleSubmit = () => {
    if (currentChallenge.type === "fill") {
      // Check fill-in-the-blank answers
      const allCorrect = currentChallenge.blanks?.every(
        (blank) => fillAnswers[blank.id]?.trim().toLowerCase() === blank.answer.toLowerCase()
      );
      setIsCorrect(allCorrect || false);
      setIsSubmitted(true);
      
      if (allCorrect) {
        toast.success("Perfect! You've mastered this pattern!", {
          description: "Your understanding of the Mediator pattern is excellent."
        });
      } else {
        toast.error("Not quite right. Check the hint and try again!", {
          description: "Pay attention to the method names and relationships."
        });
      }
    } else if (currentChallenge.type === "drag") {
      // Check drag and drop order
      const allCorrect = draggedItems.every(
        (item, index) => item.correctPosition === index
      );
      setIsCorrect(allCorrect);
      setIsSubmitted(true);
      
      if (allCorrect) {
        toast.success("Excellent work! Code structure is perfect!", {
          description: "You understand how the Mediator pattern is structured."
        });
      } else {
        toast.error("The order isn't quite right. Try again!", {
          description: "Think about the logical flow of the class structure."
        });
      }
    }
  };

  const handleDownload = () => {
    const blob = new Blob([currentChallenge.correctCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mediator_${currentChallenge.title.toLowerCase().replace(/\s+/g, "_")}.cpp`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!", {
      description: "The solution code has been saved to your device."
    });
  };

  const nextChallenge = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1);
      setFillAnswers({});
      setShowHint(false);
      setIsSubmitted(false);
      setIsCorrect(false);
      if (challenges[currentChallengeIndex + 1].type === "drag" && challenges[currentChallengeIndex + 1].dragItems) {
        const shuffled = [...challenges[currentChallengeIndex + 1].dragItems!].sort(() => Math.random() - 0.5);
        setDraggedItems(shuffled);
      }
    }
  };

  const previousChallenge = () => {
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex(currentChallengeIndex - 1);
      setFillAnswers({});
      setShowHint(false);
      setIsSubmitted(false);
      setIsCorrect(false);
      if (challenges[currentChallengeIndex - 1].type === "drag" && challenges[currentChallengeIndex - 1].dragItems) {
        const shuffled = [...challenges[currentChallengeIndex - 1].dragItems!].sort(() => Math.random() - 0.5);
        setDraggedItems(shuffled);
      }
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="pb-24 px-4 pt-6 max-w-5xl mx-auto min-h-screen">
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
              <div className="w-10 h-10 bg-[#5865F2] rounded-lg flex items-center justify-center glow-effect">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white">Code Arena</h1>
                <p className="text-xs text-gray-400">Test your Mediator pattern skills</p>
              </div>
            </div>
          </div>
          <Badge className="bg-[#5865F2] text-white">
            {currentChallengeIndex + 1} / {challenges.length}
          </Badge>
        </motion.div>

        {/* Challenge Card */}
        <motion.div
          key={currentChallengeIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-[#2C2F33] border-[#2F3136] p-6 card-shadow mb-6">
            {/* Title */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-white mb-2">{currentChallenge.title}</h2>
                <Badge variant="outline" className="border-[#5865F2] text-[#5865F2]">
                  {currentChallenge.type === "fill" ? "Fill in the Blanks" : "Drag & Drop"}
                </Badge>
              </div>
            </div>

            {/* Scenario */}
            <div className="mb-6">
              <h3 className="text-gray-300 mb-2 flex items-center gap-2">
                <div className="w-6 h-6 bg-[#5865F2]/20 rounded flex items-center justify-center">
                  <span className="text-[#5865F2]">📋</span>
                </div>
                Scenario
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed bg-[#23272A] p-4 rounded-lg border border-[#2F3136]">
                {currentChallenge.scenario}
              </p>
            </div>

            {/* Hint */}
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => setShowHint(!showHint)}
                className="text-gray-300 hover:text-white mb-2 p-0 h-auto"
              >
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                {showHint ? "Hide Hint" : "Show Hint"}
              </Button>
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-400 text-sm bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                      💡 {currentChallenge.hint}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Activity */}
            <div className="mb-6">
              <h3 className="text-gray-300 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-[#5865F2]/20 rounded flex items-center justify-center">
                  <Code className="w-4 h-4 text-[#5865F2]" />
                </div>
                Activity
              </h3>

              {currentChallenge.type === "fill" ? (
                <div className="bg-[#1E1F22] rounded-lg border border-[#2F3136] overflow-hidden">
                  <div className="flex">
                    {/* Line Numbers */}
                    <div className="bg-[#23272A] px-4 py-4 border-r border-[#2F3136] select-none">
                      {currentChallenge.code.split("\n").map((_, idx) => (
                        <div key={idx} className="text-gray-600 text-sm font-mono leading-relaxed text-right">
                          {idx + 1}
                        </div>
                      ))}
                    </div>
                    
                    {/* Code Content */}
                    <div className="flex-1 px-4 py-4 overflow-x-auto">
                      {currentChallenge.code.split("\n").map((line, idx) => {
                        const blankMatch = line.match(/___BLANK(\d+)___/);
                        if (blankMatch) {
                          const blankId = `BLANK${blankMatch[1]}`;
                          const blank = currentChallenge.blanks?.find(b => b.id === blankId);
                          const parts = line.split(/___BLANK\d+___/);
                          
                          return (
                            <div key={idx} className="leading-relaxed flex items-center gap-2 min-h-[24px]">
                              <code 
                                className="text-gray-300 font-mono text-sm"
                                dangerouslySetInnerHTML={{ __html: highlightCppSyntax(parts[0]) }}
                              />
                              <div className="relative inline-block">
                                <Input
                                  value={fillAnswers[blankId] || ""}
                                  onChange={(e) => handleFillAnswer(blankId, e.target.value)}
                                  className="bg-[#2C2F33] border-[#5865F2] text-white w-40 h-7 text-sm px-2 font-mono"
                                  placeholder="Type here..."
                                  disabled={isSubmitted && isCorrect}
                                />
                                {isSubmitted && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -right-8 top-1/2 -translate-y-1/2"
                                  >
                                    {fillAnswers[blankId]?.trim().toLowerCase() === blank?.answer.toLowerCase() ? (
                                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    ) : (
                                      <XCircle className="w-5 h-5 text-red-500" />
                                    )}
                                  </motion.div>
                                )}
                              </div>
                              <code 
                                className="text-gray-300 font-mono text-sm"
                                dangerouslySetInnerHTML={{ __html: highlightCppSyntax(parts[1] || '') }}
                              />
                            </div>
                          );
                        }
                        return (
                          <div key={idx} className="leading-relaxed min-h-[24px]">
                            <code 
                              className="text-gray-300 font-mono text-sm"
                              dangerouslySetInnerHTML={{ __html: highlightCppSyntax(line) }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-400">Drag to reorder the code lines</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={shuffleItems}
                      className="text-gray-400 hover:text-white"
                    >
                      <Shuffle className="w-4 h-4 mr-2" />
                      Shuffle
                    </Button>
                  </div>
                  {draggedItems.map((item, index) => (
                    <DraggableItem
                      key={item.id}
                      item={item}
                      index={index}
                      moveItem={moveItem}
                    />
                  ))}
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 mt-4"
                    >
                      {isCorrect ? (
                        <div className="flex items-center gap-2 text-green-500">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="text-sm">Perfect order!</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-500">
                          <XCircle className="w-5 h-5" />
                          <span className="text-sm">Try reordering the lines</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleSubmit}
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white glow-effect"
                  disabled={isSubmitted && isCorrect}
                >
                  {isSubmitted ? (isCorrect ? "Completed ✓" : "Try Again") : "Submit Answer"}
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="border-[#5865F2] hover:bg-[#5865F2] text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download .cpp
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between"
        >
          <Button
            variant="ghost"
            onClick={previousChallenge}
            disabled={currentChallengeIndex === 0}
            className="text-gray-400 hover:text-white disabled:opacity-50"
          >
            ← Previous Challenge
          </Button>
          <Button
            variant="ghost"
            onClick={nextChallenge}
            disabled={currentChallengeIndex === challenges.length - 1}
            className="text-gray-400 hover:text-white disabled:opacity-50"
          >
            Next Challenge →
          </Button>
        </motion.div>
      </div>
    </DndProvider>
  );
}