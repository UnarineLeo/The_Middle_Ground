import { useState } from "react";
import { ArrowLeft, ArrowRight, Video, FileText, Headphones, CheckCircle, Bot } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import { designPatterns } from "../data/mockData";

interface LearnPageProps {
  patternId?: number;
  onNavigate: (page: string) => void;
}

export function LearnPage({ patternId = 1, onNavigate }: LearnPageProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(35);
  
  const pattern = designPatterns.find(p => p.id === patternId) || designPatterns[0];
  
  const sections = [
    {
      title: "Introduction",
      content: `The ${pattern.name} is a ${pattern.category.toLowerCase()} design pattern that plays a crucial role in software architecture.`
    },
    {
      title: "Problem Statement",
      content: `When building complex applications, you often need to ${pattern.description.toLowerCase()}`
    },
    {
      title: "Solution",
      content: "This pattern provides an elegant solution by introducing a clear separation of concerns and promoting loose coupling between components."
    },
    {
      title: "Implementation",
      content: "Let's look at how to implement this pattern in a real-world scenario with practical examples."
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
            <span className="text-3xl">{pattern.icon}</span>
            <div>
              <h1 className="text-white">{pattern.name}</h1>
              <p className="text-sm text-gray-400">{pattern.category} Pattern</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("chatbot")}
            className="p-2 rounded-lg bg-[#2C2F33] text-[#5865F2] hover:bg-[#5865F2] hover:text-white transition-all glow-effect"
          >
            <Bot className="w-5 h-5" />
          </motion.button>
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
          <span className="text-sm text-gray-400">Overall Progress</span>
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
                  <p className="text-gray-400">Video Tutorial Coming Soon</p>
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
                <h2 className="text-white mb-4">{sections[currentSection].title}</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {sections[currentSection].content}
                </p>

                {/* Code Example */}
                <div className="bg-[#1E2124] rounded-lg p-6 mb-6 border border-[#2F3136]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{`class ${pattern.name.replace(' Pattern', '')} {
  // Pattern implementation
  constructor() {
    this.state = {};
  }
  
  execute() {
    // Core logic here
    console.log('${pattern.name} in action');
  }
}`}</code>
                  </pre>
                </div>

                {/* Key Points */}
                <div className="space-y-3">
                  <h3 className="text-white">Key Points:</h3>
                  <div className="space-y-2">
                    {["Promotes code reusability", "Enhances maintainability", "Follows SOLID principles"].map((point, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle className="w-5 h-5 text-[#5865F2] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Card>
          </TabsContent>

          <TabsContent value="audio" className="mt-6">
            <Card className="bg-[#2C2F33] border-[#2F3136] p-8 card-shadow">
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Headphones className="w-16 h-16 text-[#5865F2] mx-auto mb-4" />
                  <p className="text-gray-400">Audio Explanation Coming Soon</p>
                  <p className="text-sm text-gray-500 mt-2">Listen and learn on the go</p>
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
            Check Your Knowledge
          </Button>
        </motion.div>

        if(progress === 100){
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onNavigate("quiz")}
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white glow-effect"
            >
              Check Your Knowledge
            </Button>
          </motion.div>
        } else{
          <Button
          onClick={handleNext}
          disabled={currentSection === sections.length - 1}
          className="bg-[#2C2F33] border-[#2F3136] text-white hover:bg-[#5865F2] disabled:opacity-50"
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        }
        
      </motion.div>

      {/* Section Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {sections.map((_, idx) => (
          <motion.div
            key={idx}
            className={`h-2 rounded-full transition-all ${
              idx === currentSection 
                ? "w-8 bg-[#5865F2]" 
                : "w-2 bg-[#2C2F33]"
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
}
