import { useState } from "react";
import { ArrowLeft, Code, Download, Lightbulb, CheckCircle2, XCircle, Shuffle, Ticket } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { toast } from "sonner@2.0.3";
import { challenges } from "../data/mockData";

interface CodeArenaPageProps {
  onNavigate: (page: string) => void;
}

interface Challenge {
  id: number;
  title: string;
  scenario: string;
  hint: string;
  type: "fill" | "drag";
  code: string;
  blanks?: { id: string; answer: string }[];
  dragItems?: { id: string; text: string; correctPosition: number }[];
  correctCode: string;
}

// Syntax highlighting helper
const highlightCppSyntax = (code: string) => {
  const keywords = ['class', 'private', 'public', 'void', 'for', 'if', 'return', 'auto', 'vector', 'string', 'cout', 'endl', 'this'];
  const types = ['vector', 'string', 'int', 'bool', 'char', 'double', 'float'];
  
  const leadingWhitespace = code.match(/^(\s*)/)?.[0] || '';
  const trimmedCode = code.trimStart();
  
  let highlighted = trimmedCode;
  
  highlighted = highlighted.replace(/\/\/(.*)/g, '<span class="text-gray-500 italic">// $1</span>');
  highlighted = highlighted.replace(/"([^"]*)"/g, '<span class="text-green-400">// "$1"</span>');
  
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
    highlighted = highlighted.replace(regex, '<span class="text-purple-400">$1</span>');
  });
  
  types.forEach(type => {
    const regex = new RegExp(`\\b(${type})\\b`, 'g');
    highlighted = highlighted.replace(regex, '<span class="text-blue-400">$1</span>');
  });
  
  highlighted = highlighted.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="text-yellow-400">$1</span>(');
  
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
    <div ref={(node) => drag(drop(node))}>
      <motion.div
        whileHover={{ scale: 1.02, x: 4 }}
        className={`bg-[#1E2124] border border-[#2F3136] rounded-lg p-3 cursor-move flex items-center gap-3 mb-2 ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        <div className="flex flex-col gap-1">
          <div className="w-1 h-1 bg-gray-600 rounded-full" />
          <div className="w-1 h-1 bg-gray-600 rounded-full" />
          <div className="w-1 h-1 bg-gray-600 rounded-full" />
        </div>
        <code
          className="text-sm text-gray-300 font-mono flex-1"
          dangerouslySetInnerHTML={{ __html: highlightCppSyntax(item.text) }}
        />
      </motion.div>
    </div>
  );
};

export function CodeArenaPage({ onNavigate }: CodeArenaPageProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [fillAnswers, setFillAnswers] = useState<{ [key: string]: string }>({});
  const [draggedItems, setDraggedItems] = useState<{ id: string; text: string }[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setFillAnswers({});
    setShowHint(false);
    setIsSubmitted(false);
    setIsCorrect(false);
    
    if (challenge.type === "drag" && challenge.dragItems) {
      const shuffled = [...challenge.dragItems].sort(() => Math.random() - 0.5);
      setDraggedItems(shuffled);
    }
  };

  const handleBackToSelection = () => {
    setSelectedChallenge(null);
    setFillAnswers({});
    setShowHint(false);
    setIsSubmitted(false);
    setIsCorrect(false);
  };

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
    if (selectedChallenge?.dragItems) {
      const shuffled = [...selectedChallenge.dragItems].sort(() => Math.random() - 0.5);
      setDraggedItems(shuffled);
      setIsSubmitted(false);
    }
  };

  const handleSubmit = () => {
    if (!selectedChallenge) return;

    if (selectedChallenge.type === "fill") {
      const allCorrect = selectedChallenge.blanks?.every(
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
    } else if (selectedChallenge.type === "drag") {
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
    if (!selectedChallenge) return;
    
    const blob = new Blob([selectedChallenge.correctCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mediator_${selectedChallenge.title.toLowerCase().replace(/\s+/g, "_")}.cpp`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully!", {
      description: "The solution code has been saved to your device."
    });
  };

  const getDifficultyFromTitle = (title: string): string => {
    const easyKeywords = ["chat", "smart home", "airport"];
    const hardKeywords = ["banking", "iot", "video conference"];
    
    if (easyKeywords.some(keyword => title.toLowerCase().includes(keyword))) return "Easy";
    if (hardKeywords.some(keyword => title.toLowerCase().includes(keyword))) return "Hard";
    return "Medium";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-400 border-green-500/30 bg-green-500/10";
      case "Medium": return "text-yellow-400 border-yellow-500/30 bg-yellow-500/10";
      case "Hard": return "text-red-400 border-red-500/30 bg-red-500/10";
      default: return "text-gray-400 border-gray-500/30 bg-gray-500/10";
    }
  };

  // Ticket Selection View
  if (!selectedChallenge) {
    return (
      <div className="pb-24 px-4 pt-6 max-w-7xl mx-auto min-h-screen">
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
              <div className="w-10 h-10 bg-[#5865F2] rounded-lg flex items-center justify-center glow-effect">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white">Code Arena</h1>
                <p className="text-xs text-gray-400">Choose your coding challenge</p>
              </div>
            </div>
          </div>
          <Badge className="bg-[#5865F2] text-white">
            {challenges.length} Challenges
          </Badge>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-10"
        >
          <h2 className="text-xl text-white mb-2">🎫 Select Your Challenge Ticket</h2>
          <p className="text-gray-400 text-sm">Pick any challenge to start coding</p>
        </motion.div>

        {/* Train Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {challenges.map((challenge, index) => {
            const difficulty = getDifficultyFromTitle(challenge.title);
            
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03, y: -4 }}
                onClick={() => handleSelectChallenge(challenge)}
                className="cursor-pointer"
              >
                {/* Train Ticket Card */}
                <div className="relative bg-gradient-to-br from-amber-100 to-amber-50 overflow-hidden border-2 border-amber-200 shadow-xl"
                     style={{
                       boxShadow: '0 0px 0 rgba(217, 119, 6, 0.2), 0 0px 0px rgba(0, 0, 0, 0.3)'
                     }}>
                  {/* Ticket Header */}
                  <div className="bg-[#5865F2] from-amber-600 to-amber-700 px-4 py-3 border-b-2 border-dashed border-black">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Ticket className="w-5 h-5 text-amber-100" />
                        <span className="text-amber-100 text-xs font-bold">TICKET #{challenge.id}</span>
                      </div>
                      <Badge className={`text-xs ${getDifficultyColor(difficulty)}`}>
                        {difficulty}
                      </Badge>
                    </div>
                  </div>

                  {/* Ticket Content */}
                  <div className="p-5">
                    <h3 className="text-gray-900 font-bold text-lg mb-3 min-h-[56px]">
                      {challenge.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        challenge.type === "fill" 
                          ? "bg-blue-500 text-white" 
                          : "bg-purple-500 text-white"
                      }`}>
                        {challenge.type === "fill" ? "Fill in the Blanks" : "Drag & Drop"}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600 border-t border-dashed border-black pt-3">
                      <span>🚂 MEDIATOR EXPRESS</span>
                      <span>PLATFORM {challenge.id}</span>
                    </div>
                  </div>

                  {/* Torn bottom edge */}
                  <div className="relative h-5 overflow-hidden">
                    {/* straight top edge */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-amber-200" />

                    

                    {/* ticket background behind torn section */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-50 -z-10" />
                  </div>

                  {/* Punch holes */}
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-black" />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-black" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

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
              onClick={handleBackToSelection}
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
                <p className="text-xs text-gray-400">Ticket #{selectedChallenge.id}</p>
              </div>
            </div>
          </div>
          
        </motion.div>

        {/* Challenge Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-[#2C2F33] border-[#2F3136] p-6 card-shadow mb-6">
            {/* Title */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-white mb-2">{selectedChallenge.title}</h2>
                <Badge variant="outline" className="border-[#5865F2] text-[#5865F2]">
                  {selectedChallenge.type === "fill" ? "Fill in the Blanks" : "Drag & Drop"}
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
                {selectedChallenge.scenario}
              </p>
            </div>

            {/* Code Section */}
            {selectedChallenge.type === "fill" ? (
              <div className="bg-[#1E2124] rounded-lg p-4 border border-[#2F3136] mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 text-sm font-mono">mediator.cpp</span>
                </div>
                <div className="space-y-1 font-mono text-sm">
                  {selectedChallenge.code.split("\n").map((line, index) => {
                    const blankMatch = line.match(/___BLANK(\d+)___/);
                    if (blankMatch) {
                      const blankId = `BLANK${blankMatch[1]}`;
                      const blank = selectedChallenge.blanks?.find(b => b.id === blankId);
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-gray-600 select-none w-8 text-right">{index + 1}</span>
                          <code className="flex-1 flex items-center gap-2">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: highlightCppSyntax(line.substring(0, line.indexOf("___BLANK")))
                              }}
                            />
                            <Input
                              value={fillAnswers[blankId] || ""}
                              onChange={(e) => handleFillAnswer(blankId, e.target.value)}
                              disabled={isSubmitted}
                              className={`inline-block w-40 h-8 px-2 text-sm bg-[#2C2F33] border ${
                                isSubmitted
                                  ? fillAnswers[blankId]?.trim().toLowerCase() === blank?.answer.toLowerCase()
                                    ? "border-green-500 bg-green-500/10"
                                    : "border-red-500 bg-red-500/10"
                                  : "border-[#5865F2]"
                              } text-white`}
                              placeholder=""
                            />
                            <span
                              dangerouslySetInnerHTML={{
                                __html: highlightCppSyntax(line.substring(line.indexOf("___BLANK") + `___BLANK${blankMatch[1]}___`.length))
                              }}
                            />
                          </code>
                        </div>
                      );
                    }
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-gray-600 select-none w-8 text-right">{index + 1}</span>
                        <code
                          className="text-gray-300"
                          dangerouslySetInnerHTML={{ __html: highlightCppSyntax(line) }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-gray-300 flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#5865F2]/20 rounded flex items-center justify-center">
                      <span className="text-[#5865F2]">🧩</span>
                    </div>
                    Drag to arrange in correct order
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={shuffleItems}
                    className="bg-[#2C2F33] border-[#2F3136] text-white hover:bg-[#5865F2]"
                  >
                    <Shuffle className="w-4 h-4 mr-2" />
                    Shuffle
                  </Button>
                </div>
                <div className="bg-[#23272A] rounded-lg p-4 border border-[#2F3136]">
                  {draggedItems.map((item, index) => (
                    <DraggableItem
                      key={item.id}
                      item={item}
                      index={index}
                      moveItem={moveItem}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitted}
                  className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white glow-effect"
                >
                  {isSubmitted ? (isCorrect ? "Correct!" : "Try Again") : "Check Solution"}
                </Button>
              </motion.div>
              <Button
                  variant="outline"
                  onClick={() => setShowHint(!showHint)}
                  className="bg-[#2C2F33] border-[#2F3136] hover:bg-[#5865F2] text-white"
                >
                  <Lightbulb />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  disabled={!isSubmitted}
                  className={`bg-[#2C2F33] border-[#2F3136] text-white hover:bg-[#5865F2] ${
                    !isSubmitted ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Solution
                </Button>
            </div>
          </Card>
        </motion.div>

        {/* Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Card className="bg-[#5865F2]/10 border-[f] p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-[#5865F2] mt-0.5" />
                  <div>
                    <h4 className="text-[#5865F2] mb-1">Hint</h4>
                    <p className="text-gray-300 text-sm">{selectedChallenge.hint}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Feedback */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className={`p-6 border-2 ${
                isCorrect
                  ? "bg-green-500/10 border-green-500"
                  : "bg-red-500/10 border-red-500"
              }`}>
                <div className="flex items-center gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-400" />
                  )}
                  <div>
                    <h3 className={`text-lg font-bold mb-1 ${
                      isCorrect ? "text-green-400" : "text-red-400"
                    }`}>
                      {isCorrect ? "Perfect! 🎉" : "Not quite right"}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {isCorrect
                        ? "You've successfully implemented the Mediator pattern!"
                        : "Review the hint and try again. You're close!"}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DndProvider>
  );
}