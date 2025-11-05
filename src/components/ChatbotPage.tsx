import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { chatMessages } from "../data/mockData";

interface ChatbotPageProps {
  onNavigate: (page: string) => void;
}

interface Message {
  id: number;
  sender: "AKA" | "user";
  message: string;
  timestamp: Date;
}

export function ChatbotPage({ onNavigate }: ChatbotPageProps) {
  const [messages, setMessages] = useState<Message[]>(chatMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = "";
      const query = inputMessage.toLowerCase();
      
      if (query.includes("code") || query.includes("example")) {
        response = "Here's a simple Mediator pattern example:\n\n```\nclass ChatRoom {\n  sendMessage(msg, user) {\n    users.forEach(u => {\n      if (u !== user) u.receive(msg);\n    });\n  }\n}\n```\n\nThe ChatRoom is the mediator that coordinates message delivery between users!";
      } else if (query.includes("when") || query.includes("use")) {
        response = "Use the Mediator pattern when:\n\n• Objects communicate in complex but well-defined ways\n• Reusing objects is difficult due to many dependencies\n• You want to customize behavior distributed between several classes\n• You need a central point of control for interactions";
      } else if (query.includes("observer") || query.includes("vs") || query.includes("difference")) {
        response = "Great question! **Mediator** vs **Observer**:\n\n**Mediator**: Two-way communication through a central coordinator. Objects send AND receive through the mediator.\n\n**Observer**: One-way notification. Subject notifies observers of state changes, but observers don't communicate back through the subject.";
      } else if (query.includes("train") || query.includes("conductor")) {
        response = "In our train simulation, you act as the Mediator (traffic controller)! Trains don't communicate directly - they go through you. You coordinate signals and commands to prevent collisions. This demonstrates how the mediator reduces coupling between objects.";
      } else {
        response = "The Mediator pattern is perfect for situations where you have multiple objects that need to communicate in complex ways. Think of it like an air traffic controller - planes don't talk to each other directly, they communicate through the controller who coordinates everything!";
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        sender: "AKA",
        message: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="pb-24 px-4 pt-6 max-w-4xl mx-auto h-screen flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-6"
      >
        <Button
          variant="ghost"
          onClick={() => onNavigate("home")}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-10 h-10 bg-[#5865F2]">
              <AvatarFallback className="bg-[#5865F2] text-white">
                <Bot className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#23272A]" />
          </div>
          <div>
            <h2 className="text-white">AKA Assistant</h2>
            <p className="text-xs text-gray-400">Always here to help</p>
          </div>
        </div>
      </motion.div>

      {/* Messages Container */}
      <Card className="flex-1 bg-[#2C2F33] border-[#2F3136] p-4 card-shadow mb-4 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                <Avatar className={`w-8 h-8 flex-shrink-0 ${
                  msg.sender === "AKA" ? "bg-[#5865F2]" : "bg-[#43B581]"
                }`}>
                  <AvatarFallback className={`${
                    msg.sender === "AKA" ? "bg-[#5865F2]" : "bg-[#43B581]"
                  } text-white`}>
                    {msg.sender === "AKA" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>

                <div className={`flex flex-col gap-1 max-w-[70%] ${
                  msg.sender === "user" ? "items-end" : ""
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {msg.sender === "AKA" ? "AKA" : "You"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`rounded-2xl px-4 py-3 ${
                      msg.sender === "AKA"
                        ? "bg-[#23272A] text-gray-200"
                        : "bg-[#5865F2] text-white"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-3"
              >
                <Avatar className="w-8 h-8 bg-[#5865F2]">
                  <AvatarFallback className="bg-[#5865F2] text-white">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-[#23272A] rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </Card>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2"
      >
        <Input
          placeholder="Ask me anything about design patterns..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-[#2C2F33] border-[#2F3136] text-white placeholder:text-gray-500 focus:border-[#5865F2]"
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white glow-effect"
          >
            <Send className="w-5 h-5" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Quick Suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex gap-2 mt-3 overflow-x-auto pb-2"
      >
        {[
          "Explain Mediator Pattern",
          "Show code example",
          "When to use Mediator?",
          "Mediator vs Observer"
        ].map((suggestion, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setInputMessage(suggestion)}
            className="px-3 py-1.5 bg-[#2C2F33] text-gray-300 text-sm rounded-full border border-[#2F3136] hover:border-[#5865F2] transition-all whitespace-nowrap"
          >
            {suggestion}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
