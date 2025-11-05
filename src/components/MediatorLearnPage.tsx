import { useState } from "react";
import { ArrowLeft, ArrowRight, Video, FileText, Headphones, CheckCircle, Network, Users, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface MediatorLearnPageProps {
  onNavigate: (page: string) => void;
}

export function MediatorLearnPage({ onNavigate }: MediatorLearnPageProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(25);

  const sections = [
    {
      title: "What is the Mediator Pattern?",
      diagram: "intro",
      content: `The Mediator Pattern is a behavioral design pattern that defines an object (the mediator) that encapsulates how a set of objects interact with each other.

Instead of objects communicating directly (which creates tight coupling), they communicate through the mediator. This promotes loose coupling by keeping objects from referring to each other explicitly.`,
      keyPoints: [
        "Centralizes complex communications between objects",
        "Reduces dependencies between communicating objects",
        "Makes the system easier to understand and maintain",
        "Simplifies object protocols and reduces subclassing"
      ]
    },
    {
      title: "The Problem",
      diagram: "problem",
      content: `Imagine a chat application with multiple users. Without a mediator:

• Each user would need to know about every other user
• User A wants to send a message to User B, C, and D
• This creates N² connections as the system grows
• Adding or removing users becomes increasingly complex
• The system is tightly coupled and hard to maintain`,
      keyPoints: [
        "Direct communication creates tight coupling",
        "Hard to add new participants",
        "Difficult to modify communication protocols",
        "Objects have too many dependencies"
      ]
    },
    {
      title: "The Solution",
      diagram: "solution",
      content: `The Mediator Pattern solves this by introducing a central mediator:

• Users don't communicate directly with each other
• All communication goes through the ChatRoom (mediator)
• Users only know about the mediator, not other users
• The mediator handles routing messages to recipients
• Adding new users only requires connecting to the mediator`,
      keyPoints: [
        "One central communication hub",
        "Colleagues only know the mediator",
        "Easy to add new participants",
        "Communication logic is centralized"
      ]
    },
    {
      title: "Real-World Examples",
      diagram: "examples",
      content: `The Mediator Pattern appears in many real-world scenarios:

🛫 Air Traffic Control
Planes don't communicate directly with each other. The control tower (mediator) coordinates all aircraft movements.

💬 Chat Rooms
Users send messages to the chat room, which distributes them to other participants.

🚦 Traffic Control System
Traffic lights coordinate through a central system rather than communicating directly.

🏢 Enterprise Service Bus
Services in a microservices architecture communicate through a message bus.`,
      keyPoints: [
        "Air traffic control tower",
        "Chat room coordinator",
        "Traffic light management system",
        "Enterprise service bus"
      ]
    }
  ];

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setProgress(Math.min(100, progress + 25));
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const renderDiagram = (type: string) => {
    switch (type) {
      case "intro":
        return (
          <div className="flex items-center justify-center gap-8 py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-24 h-24 rounded-full bg-[#5865F2]/20 border-2 border-[#5865F2] flex items-center justify-center mb-2">
                <Network className="w-12 h-12 text-[#5865F2]" />
              </div>
              <p className="text-sm text-gray-300">Mediator</p>
            </motion.div>
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-2 h-0.5 bg-[#5865F2]" />
                  <div className="w-16 h-16 rounded-lg bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                    <Users className="w-8 h-8 text-green-400" />
                  </div>
                  <p className="text-xs text-gray-400">Colleague {i}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      case "problem":
        return (
          <div className="py-8">
            <div className="relative">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="absolute"
                  style={{
                    left: `${25 + (i % 2) * 50}%`,
                    top: `${(Math.floor(i / 2)) * 100}px`
                  }}
                >
                  <div className="w-20 h-20 rounded-lg bg-red-500/20 border-2 border-red-500 flex items-center justify-center relative">
                    <Users className="w-10 h-10 text-red-400" />
                  </div>
                </motion.div>
              ))}
              {/* Messy connection lines */}
              <svg className="absolute inset-0 w-full h-52" style={{ zIndex: -1 }}>
                {[
                  [[30, 50], [70, 50]],
                  [[30, 50], [70, 150]],
                  [[30, 50], [30, 150]],
                  [[70, 50], [30, 150]],
                  [[70, 50], [70, 150]],
                  [[70, 150], [30, 150]]
                ].map((line, i) => (
                  <motion.line
                    key={i}
                    x1={`${line[0][0]}%`}
                    y1={line[0][1]}
                    x2={`${line[1][0]}%`}
                    y2={line[1][1]}
                    stroke="#F04747"
                    strokeWidth="2"
                    strokeDasharray="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  />
                ))}
              </svg>
            </div>
            <p className="text-center text-red-400 text-sm mt-56">❌ Tightly Coupled - Hard to Maintain</p>
          </div>
        );

      case "solution":
        return (
          <div className="flex items-center justify-center gap-8 py-8">
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-lg bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                    <Users className="w-8 h-8 text-green-400" />
                  </div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                    className="text-[#5865F2]"
                  >
                    →
                  </motion.div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-32 h-32 rounded-full bg-[#5865F2]/20 border-4 border-[#5865F2] flex items-center justify-center mb-2 glow-effect">
                <Network className="w-16 h-16 text-[#5865F2]" />
              </div>
              <p className="text-sm text-[#5865F2]">Mediator</p>
            </motion.div>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    animate={{ x: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                    className="text-[#5865F2]"
                  >
                    ←
                  </motion.div>
                  <div className="w-16 h-16 rounded-lg bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                    <Users className="w-8 h-8 text-green-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "examples":
        return (
          <div className="grid grid-cols-2 gap-4 py-8">
            {[
              { icon: "🛫", title: "Air Traffic", bg: "bg-blue-500/10", border: "border-blue-500" },
              { icon: "💬", title: "Chat Room", bg: "bg-green-500/10", border: "border-green-500" },
              { icon: "🚦", title: "Traffic Lights", bg: "bg-yellow-500/10", border: "border-yellow-500" },
              { icon: "🏢", title: "Service Bus", bg: "bg-purple-500/10", border: "border-purple-500" }
            ].map((example, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-xl ${example.bg} border-2 ${example.border} text-center`}
              >
                <div className="text-4xl mb-2">{example.icon}</div>
                <p className="text-sm text-gray-300">{example.title}</p>
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pb-24 px-4 pt-6 max-w-4xl mx-auto">
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
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚂</span>
            <div>
              <h1 className="text-white">Mediator Pattern</h1>
              <p className="text-sm text-gray-400">Behavioral Design Pattern</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Learning Progress</span>
          <span className="text-sm text-[#5865F2]">{progress}%</span>
        </div>
        <Progress value={progress} className="h-3" />
      </motion.div>

      {/* Tabs for Content Type */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="text" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-[#2C2F33]">
            <TabsTrigger value="video" className="data-[state=active]:bg-[#5865F2] data-[state=active]:text-white">
              <Video className="w-4 h-4 mr-2" />
              Video
            </TabsTrigger>
            <TabsTrigger value="text" className="data-[state=active]:bg-[#5865F2] data-[state=active]:text-white">
              <FileText className="w-4 h-4 mr-2" />
              Text
            </TabsTrigger>
            <TabsTrigger value="audio" className="data-[state=active]:bg-[#5865F2] data-[state=active]:text-white">
              <Headphones className="w-4 h-4 mr-2" />
              Audio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="mt-6">
            <Card className="bg-[#2C2F33] border-[#2F3136] p-6 card-shadow">
              <div className="aspect-video bg-[#23272A] rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Video className="w-16 h-16 text-[#5865F2] mx-auto mb-4" />
                  <p className="text-gray-400">Mediator Pattern Video Tutorial</p>
                  <p className="text-sm text-gray-500 mt-2">Coming Soon</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="text" className="mt-6">
            <Card className="bg-[#2C2F33] border-[#2F3136] p-8 card-shadow">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="border-[#5865F2] text-[#5865F2]">
                    Section {currentSection + 1} of {sections.length}
                  </Badge>
                </div>

                <h2 className="text-white mb-6">{sections[currentSection].title}</h2>

                {/* Diagram */}
                <div className="bg-[#23272A] rounded-lg p-6 mb-6 border border-[#2F3136]">
                  {renderDiagram(sections[currentSection].diagram)}
                </div>

                {/* Content */}
                <div className="prose prose-invert max-w-none mb-6">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {sections[currentSection].content}
                  </p>
                </div>

                {/* Key Points */}
                <div className="space-y-3">
                  <h3 className="text-white flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#5865F2]" />
                    Key Points:
                  </h3>
                  <div className="space-y-2">
                    {sections[currentSection].keyPoints.map((point, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="flex items-start gap-2 bg-[#23272A] p-3 rounded-lg"
                      >
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Code Example for last section */}
                {currentSection === sections.length - 1 && (
                  <div className="mt-6">
                    <h3 className="text-white mb-3">Code Example: Chat Room</h3>
                    <div className="bg-[#1E2124] rounded-lg p-6 border border-[#2F3136]">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        <code>{`// Mediator
class ChatRoom {
  sendMessage(msg: string, user: User) {
    this.users.forEach(u => {
      if (u !== user) {
        u.receive(msg, user);
      }
    });
  }
}

// Colleague
class User {
  constructor(private mediator: ChatRoom) {}
  
  send(msg: string) {
    this.mediator.sendMessage(msg, this);
  }
  
  receive(msg: string, from: User) {
    console.log(\`\${from.name}: \${msg}\`);
  }
}`}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </motion.div>
            </Card>
          </TabsContent>

          <TabsContent value="audio" className="mt-6">
            <Card className="bg-[#2C2F33] border-[#2F3136] p-8 card-shadow">
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Headphones className="w-16 h-16 text-[#5865F2] mx-auto mb-4" />
                  <p className="text-gray-400">Audio Explanation</p>
                  <p className="text-sm text-gray-500 mt-2">Learn on the go - Coming Soon</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Navigation and Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between gap-4"
      >
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentSection === 0}
          className="bg-[#2C2F33] border-[#2F3136] text-white hover:bg-[#5865F2] disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => onNavigate("quiz")}
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white glow-effect"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Check Your Knowledge
          </Button>
        </motion.div>

        <Button
          onClick={handleNext}
          disabled={currentSection === sections.length - 1}
          className="bg-[#2C2F33] border-[#2F3136] text-white hover:bg-[#5865F2] disabled:opacity-50"
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>

      {/* Section Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {sections.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => {
              setCurrentSection(idx);
              setProgress(25 + (idx * 25));
            }}
            className={`h-2 rounded-full transition-all ${
              idx === currentSection 
                ? "w-8 bg-[#5865F2]" 
                : "w-2 bg-[#2C2F33] hover:bg-[#5865F2]/50"
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
}
