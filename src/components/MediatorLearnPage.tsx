import { useState } from "react";
import { ArrowLeft, ArrowRight, Video, FileText, Headphones, CheckCircle, Users, GitBranch, Target, AlertCircle, Lightbulb, CirclePlay } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import { designPatterns } from "../data/mockData";

interface MediatorLearnPageProps {
  patternId?: number;
  onNavigate: (page: string) => void;
}

export function MediatorLearnPage({ patternId = 1, onNavigate }: MediatorLearnPageProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(15);
  
  const pattern = designPatterns.find(p => p.id === patternId) || designPatterns[0];
  const micIcon = <CirclePlay className="w-6 h-6 text-[#5865F2]" />;
  
  const sections = [
    {
      title: "Introduction",
      icon: <Lightbulb className="w-6 h-6 text-[#5865F2]" />,
      content: `The Mediator design pattern extends the observer pattern. Where the observer registers observers that get updated whenever the subject changes, the mediator registers colleagues that get updated whenever one of the other colleagues notifies the mediator. This promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently.`,
      keyPoints: [
        "Extends the observer pattern with colleague registration",
        "Colleagues get updated when one notifies the mediator",
        "Promotes loose coupling between objects",
        "Objects don't refer to each other explicitly",
        "Allows independent variation of interactions"
      ]
    },
    {
      title: "Identification",
      icon: <Target className="w-6 h-6 text-[#5865F2]" />,
      content: `The Mediator pattern is classified as a Behavioral design pattern that uses the Delegation strategy. It defines an object that encapsulates how a set of objects interact.`,
      details: {
        name: "Mediator",
        classification: "Behavioral",
        strategy: "Delegation"
      },
      keyPoints: [
        "Classification: Behavioral Pattern",
        "Strategy: Delegation-based approach",
        "Encapsulates object interactions",
        "Centralizes complex communications",
        "Reduces object dependencies"
      ]
    },
    {
      title: "Intent",
      icon: <Target className="w-6 h-6 text-[#5865F2]" />,
      content: `Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently.`,
      keyPoints: [
        "Encapsulates object interaction patterns",
        "Promotes loose coupling between colleagues",
        "Prevents direct object-to-object references",
        "Enables independent variation of interactions",
        "Centralizes control logic in one place"
      ]
    },
    {
      title: "Structure",
      icon: <GitBranch className="w-6 h-6 text-[#5865F2]" />,
      content: `The Mediator pattern consists of a Mediator interface, ConcreteMediator implementations, and Colleague classes. The ConcreteMediator knows and maintains its colleagues, while Colleagues communicate only through the Mediator.`,
      structure: true,
      keyPoints: [
        "Mediator: Interface for communicating with Colleague objects",
        "ConcreteMediator: Implements cooperative behavior by coordinating colleagues",
        "Colleague classes: Each communicates with its mediator",
        "Colleagues send and receive requests from the mediator",
        "The mediator knows all colleagues and coordinates them"
      ]
    },
    {
      title: "Participants",
      icon: <Users className="w-6 h-6 text-[#5865F2]" />,
      content: `The pattern involves three main types of participants: the Mediator the ConcreteMediator and the Colleague.`,
      participants: [
        {
          name: "Mediator",
          role: "Defines an interface for communicating with Colleague objects"
        },
        {
          name: "ConcreteMediator",
          role: "Implements cooperative behavior for coordinating Colleague objects",
          details: "Knows and maintains its colleagues"
        },
        {
          name: "Colleague Classes",
          role: "Each Colleague class knows its Mediator object",
          details: "Each colleague communicates with its mediator whenever it would have otherwise communicated with another colleague"
        }
      ],
      keyPoints: [
        "Mediator provides the communication interface",
        "ConcreteMediator coordinates all colleague interactions",
        "Colleagues only know their mediator, not each other",
        "All communication flows through the mediator",
        "Reduces many-to-many to one-to-many relationships"
      ]
    },
    {
      title: "Problem",
      icon: <AlertCircle className="w-6 h-6 text-[#5865F2]" />,
      content: `We want to design reusable components, but dependencies between the potentially reusable pieces of code demonstrate this system's inflexibility. When we try to modify only one element to use it in another project, we have to take along the others too. If each object needed to communicate directly with every other object, the result is an all-or-nothing reuse.`,
      keyPoints: [
        "Direct dependencies prevent component reusability",
        "Changing one component affects all connected components",
        "Tight coupling creates an \"all-or-nothing\" reuse problem",
        "Hard to modify individual components independently",
        "Communication complexity grows exponentially with objects",
        "Each new object must know about all existing objects"
      ]
    },
    {
      title: "Mediator Pattern Explained",
      icon: <Lightbulb className="w-6 h-6 text-[#5865F2]" />,
      content: `Through partitioning a system into many objects generally enhances reusability, proliferating interconnections tend to reduce it again. When you have lots of interconnections, then it is less likely that an object can work without the support of others. The system acts as though it were monolithic. Moreover, it can be difficult to change the system's behavior in any significant way, since behavior is distributed among many objects. As a result, you may be forced to define many subclasses to customize the system's behavior.`,
      keyPoints: [
        "Many interconnections reduce reusability despite object partitioning",
        "Objects become dependent on the support of many others",
        "System behavior becomes difficult to change",
        "Distributed behavior makes modifications complex",
        "Without mediator, customization requires many subclasses"
      ]
    },
    {
      title: "Benefits",
      icon: <CheckCircle className="w-6 h-6 text-[#5865F2]" />,
      content: `A mediator is responsible for controlling and coordinating the interactions of a group of objects. The mediator serves as an intermediary that keeps objects in the group from referring to each other explicitly. The objects only know the mediator, thereby reducing the number of interconnections.`,
      keyPoints: [
        "Controls and coordinates group interactions centrally",
        "Acts as intermediary between colleague objects",
        "Eliminates explicit object-to-object references",
        "Dramatically reduces number of interconnections",
        "Simplifies object protocols and dependencies",
        "Makes the system easier to understand and maintain",
        "Centralizes control logic in one place",
        "Enables dynamic changes to interaction patterns"
      ]
    },
    {
      title: "Implementation Example",
      icon: <FileText className="w-6 h-6 text-[#5865F2]" />,
      content: "Let's look at how to implement the Mediator pattern in a real-world scenario. Consider an air traffic control system where the control tower acts as a mediator between aircraft.",
      codeExample: true,
      keyPoints: [
        "Create a Mediator interface for communication",
        "Implement ConcreteMediator to coordinate colleagues",
        "Design Colleague classes that reference the mediator",
        "Colleagues notify mediator instead of each other",
        "Mediator routes messages and coordinates responses"
      ]
    },
    {
      title: "Improvements Achieved",
      icon: <CheckCircle className="w-6 h-6 text-[#5865F2]" />,
      content: "The Mediator pattern provides several key improvements to system design and code maintainability.",
      improvements: [
        {
          title: "Simplification of Code Updates",
          description: "If the pattern is not applied and the behaviour of one of the classes in a group is changed, it potentially necessitates the update of each class in the group to accommodate the changes made to this one element. The same applies when an element is added to the group or removed from the group. However, if the pattern is applied, such changes will only require an update in the mediator class and none of the other classes in the group.",
          benefit: "Changes isolated to mediator only"
        },
        {
          title: "Increased Reusability of Code",
          description: "The decoupling of the colleagues from one another increases their individual cohesiveness contributing to their reusability.",
          benefit: "Higher cohesion, better reusability"
        },
        {
          title: "Simplification of Object Protocol",
          description: "When refactoring into the mediator pattern, a many-to-many relationship that exists between the elements in a group of objects is changed to a one-to-many relationship which is easier to understand and maintain.",
          benefit: "Many-to-many becomes one-to-many"
        }
      ],
      keyPoints: [
        "Changes only require updating the mediator class",
        "No need to update other colleague classes",
        "Decoupled colleagues are more cohesive and reusable",
        "Converts complex many-to-many to simple one-to-many",
        "Easier to add or remove elements from the group"
      ]
    },
    {
      title: "Implementation Issues",
      icon: <FileText className="w-6 h-6 text-[#5865F2]" />,
      content: "Understanding the key methods and their implementation is crucial for correctly applying the Mediator pattern.",
      implementationMethods: [
        {
          name: "changed()",
          description: "The changed() method is implemented in the colleague interface to allow each concrete colleague to call it. This method is used to notify the mediator of changes. It is the responsibility of each concrete colleague to call this method whenever it executes code that may impact on the other colleagues.",
          implementation: "mediator->notify(this);"
        },
        {
          name: "notify()",
          description: "The notify() method is called every time one of the concrete colleagues executes the changed() method. A pointer to the concrete colleague is sent as a parameter to allow the mediator to have knowledge about the originator of the notification. It is not desirable to send the content or nature of an update of a colleague to the mediator as a parameter of the notify() message. This is to ensure that this interface is stable and generic enough to allow for different kinds of colleagues.",
          pseudoCode: `Mediator::notify(originator: Colleague)
  resultOfChange = originator->get();
  for (all colleagues)
    set(resultOfChange);`
        }
      ],
      keyPoints: [
        "changed() is called by colleagues when their state changes",
        "changed() delegates to mediator with notify(this)",
        "notify() receives a pointer to the originating colleague",
        "Keep notify() interface stable and generic",
        "Mediator queries originator and updates other colleagues",
        "Don't pass update content as parameter - query instead"
      ]
    },
    {
      title: "Related Patterns",
      icon: <GitBranch className="w-6 h-6 text-[#5865F2]" />,
      content: "The Mediator pattern relates to and can be combined with other design patterns.",
      relatedPatterns: [
        {
          name: "Facade",
          relationship: "Facade differs from Mediator in that it abstracts a subsystem of objects to provide a more convenient interface. Its protocol is unidirectional; that is, Facade objects make requests of the subsystem classes but not vice versa. In contrast, Mediator enables cooperative behaviour that colleague objects don't or can't provide, and the protocol is multidirectional."
        },
        {
          name: "Observer",
          relationship: "Colleagues can communicate with the mediator using the Observer pattern. The mediator acts as an observer of colleague changes and coordinates the updates."
        }
      ],
      keyPoints: [
        "Facade: Unidirectional protocol, abstracts subsystem",
        "Mediator: Multidirectional protocol, enables cooperation",
        "Observer: Can be used for colleague-mediator communication",
        "Facade simplifies interface, Mediator coordinates behavior",
        "Patterns can be combined for complex scenarios"
      ]
    },
    {
      title: "Practical Example: File Dialog",
      icon: <FileText className="w-6 h-6 text-[#5865F2]" />,
      content: "A simulation of the interaction between widgets on a file dialog. The FileSelectionDialog acts as the mediator for all Widget siblings, coordinating their interactions without them knowing about each other.",
      exampleMapping: [
        { participant: "Mediator", entity: "Dialog", method: "widgetChanged(:Widget)" },
        { participant: "ConcreteMediator", entity: "FileSelectionDialog", method: "widgetChanged(:Widget)" },
        { participant: "Colleague", entity: "Widget", method: "changed()" },
        { participant: "Concrete Colleagues", entity: "List, Edit", method: "queryWidget(), updateWidget()" }
      ],
      exampleCode: true,
      showDiagrams: true,
      keyPoints: [
        "FileSelectionDialog is the mediator for all Widget siblings",
        "Widget::changed() signals user interaction to mediator",
        "changed() delegates with mediator->widgetChanged(this)",
        "Mediator receives pointer to originating widget",
        "FileSelectionDialog encapsulates all collective behaviour",
        "Mediator queries status and propagates to all dependants",
        "User changes filter:Edit → mediator updates all widgets"
      ]
    }
  ];

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setProgress(Math.min(100, Math.round(((currentSection + 2) / sections.length) * 100)));
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setProgress(Math.min(100, Math.round(((currentSection) / sections.length) * 100)));
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
  <TabsTrigger
    value="video"
    className="data-[state=active]:bg-[#5865F2] data-[state=active]:text-white"
  >
    <Video className="w-4 h-4 mr-2" />
    Video
  </TabsTrigger>

  <TabsTrigger
    value="text"
    className="data-[state=active]:bg-[#5865F2] data-[state=active]:text-white"
  >
    <FileText className="w-4 h-4 mr-2" />
    Theory
  </TabsTrigger>

  <TabsTrigger
    value="cpp"
    className="data-[state=active]:bg-[#5865F2] data-[state=active]:text-white"
  >
    <FileText className="w-4 h-4 mr-2" />
    C++ Knowledge
  </TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="mt-6">
            <Card className="bg-[#2C2F33] border-[#2F3136] p-6 card-shadow">
              <div className="aspect-video bg-[#23272A] rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Video className="w-16 h-16 text-[#5865F2] mx-auto mb-4" />
                  <p className="text-gray-400">Video Tutorials</p>
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
                <div className="flex items-center gap-3 mb-4">
                  {sections[currentSection].icon}
                  <h2 className="text-white flex-1">{sections[currentSection].title}</h2>
                  {micIcon}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {sections[currentSection].content}
                </p>

                {/* Identification Details Table */}
                {sections[currentSection].details && (
                  <div className="bg-[#1E2124] rounded-lg p-6 mb-6 border border-[#2F3136]">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-[#23272A] rounded-lg">
                        <p className="text-sm text-gray-400 mb-2">Name</p>
                        <p className="text-white">{sections[currentSection].details.name}</p>
                      </div>
                      <div className="text-center p-4 bg-[#23272A] rounded-lg">
                        <p className="text-sm text-gray-400 mb-2">Classification</p>
                        <p className="text-[#5865F2]">{sections[currentSection].details.classification}</p>
                      </div>
                      <div className="text-center p-4 bg-[#23272A] rounded-lg">
                        <p className="text-sm text-gray-400 mb-2">Strategy</p>
                        <p className="text-green-400">{sections[currentSection].details.strategy}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Structure Diagram */}
                {sections[currentSection].structure && (
                  <div className="bg-[#1E2124] rounded-lg p-8 mb-6 border border-[#2F3136] overflow-x-auto">
                    <svg viewBox="0 0 900 350" className="w-full h-auto">
                      {/* Mediator (top left) */}
                      <rect x="40" y="20" width="160" height="95" rx="4" fill="#7DD3FC" stroke="#000" strokeWidth="1"/>
                      <text x="120" y="40" textAnchor="middle" fill="#000" fontSize="14">Mediator</text>
                      <line x1="40" y1="48" x2="200" y2="48" stroke="#000" strokeWidth="1"/>
                      <text x="50" y="63" fill="#000" fontSize="11">implements Colleague</text>
                      <text x="50" y="77" fill="#000" fontSize="11">+notify()</text>
                      <text x="50" y="91" fill="#000" fontSize="11">+get()</text>
                      <text x="50" y="105" fill="#000" fontSize="11">+set()</text>
                      
                      {/* Colleague (center) */}
                      <rect x="360" y="20" width="160" height="80" rx="4" fill="#7DD3FC" stroke="#000" strokeWidth="1"/>
                      <text x="440" y="40" textAnchor="middle" fill="#000" fontSize="14">Colleague</text>
                      <line x1="360" y1="48" x2="520" y2="48" stroke="#000" strokeWidth="1"/>
                      <text x="370" y="63" fill="#000" fontSize="11">+Mediator</text>
                      <text x="370" y="77" fill="#000" fontSize="11">+send()</text>
                      <text x="370" y="91" fill="#000" fontSize="11">+query()</text>
                      
                      {/* concl:Colleague1 (top right) */}
                      <rect x="680" y="20" width="160" height="60" rx="4" fill="#7DD3FC" stroke="#000" strokeWidth="1"/>
                      <text x="760" y="40" textAnchor="middle" fill="#000" fontSize="14">concl:Colleague1</text>
                      <line x1="680" y1="48" x2="840" y2="48" stroke="#000" strokeWidth="1"/>
                      <text x="690" y="63" fill="#000" fontSize="11">indicates</text>
                      <text x="690" y="75" fill="#000" fontSize="11">notify(this)</text>
                      
                      {/* ConcreteMediator (bottom left) */}
                      <rect x="40" y="200" width="180" height="95" rx="4" fill="#7DD3FC" stroke="#000" strokeWidth="1"/>
                      <text x="130" y="220" textAnchor="middle" fill="#000" fontSize="14">ConcreteMediator</text>
                      <line x1="40" y1="228" x2="220" y2="228" stroke="#000" strokeWidth="1"/>
                      <text x="50" y="243" fill="#000" fontSize="11">Colleague* Colleague</text>
                      <text x="50" y="257" fill="#000" fontSize="11">+notify() : Colleague1</text>
                      <text x="50" y="271" fill="#000" fontSize="11">+get() : Colleague2</text>
                      <text x="50" y="285" fill="#000" fontSize="11">+set() : Colleague2</text>
                      
                      {/* ConcreteColleague1 (bottom center left) */}
                      <rect x="300" y="200" width="160" height="60" rx="4" fill="#7DD3FC" stroke="#000" strokeWidth="1"/>
                      <text x="380" y="220" textAnchor="middle" fill="#000" fontSize="14">ConcreteColleague1</text>
                      <line x1="300" y1="228" x2="460" y2="228" stroke="#000" strokeWidth="1"/>
                      <text x="310" y="243" fill="#000" fontSize="11">+send()</text>
                      <text x="310" y="255" fill="#000" fontSize="11">+query()</text>
                      
                      {/* ConcreteColleague2 (bottom center right) */}
                      <rect x="520" y="200" width="160" height="60" rx="4" fill="#7DD3FC" stroke="#000" strokeWidth="1"/>
                      <text x="600" y="220" textAnchor="middle" fill="#000" fontSize="14">ConcreteColleague2</text>
                      <line x1="520" y1="228" x2="680" y2="228" stroke="#000" strokeWidth="1"/>
                      <text x="530" y="243" fill="#000" fontSize="11">+send()</text>
                      <text x="530" y="255" fill="#000" fontSize="11">+query()</text>
                      
                      {/* Arrows */}
                      {/* Mediator to ConcreteMediator (inheritance) */}
                      <line x1="120" y1="115" x2="120" y2="200" stroke="#000" strokeWidth="2"/>
                      <polygon points="120,115 115,125 125,125" fill="#fff" stroke="#000" strokeWidth="1"/>
                      
                      {/* Colleague to ConcreteColleague1 (inheritance) */}
                      <line x1="380" y1="100" x2="380" y2="200" stroke="#000" strokeWidth="2"/>
                      <polygon points="380,100 375,110 385,110" fill="#fff" stroke="#000" strokeWidth="1"/>
                      
                      {/* Colleague to ConcreteColleague2 (inheritance) */}
                      <line x1="470" y1="100" x2="600" y2="200" stroke="#000" strokeWidth="2"/>
                      <polygon points="470,100 465,110 475,108" fill="#fff" stroke="#000" strokeWidth="1"/>
                      
                      {/* Mediator to Colleague (bidirectional arrow) */}
                      <line x1="200" y1="60" x2="360" y2="60" stroke="#000" strokeWidth="2" markerEnd="url(#arrow-black)"/>
                      <line x1="360" y1="70" x2="200" y2="70" stroke="#000" strokeWidth="2" markerEnd="url(#arrow-black)"/>
                      
                      {/* Colleague to concl:Colleague1 (dotted arrow) */}
                      <line x1="520" y1="50" x2="680" y2="50" stroke="#000" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow-black)"/>
                      
                      {/* ConcreteMediator to Colleague (dotted dependency) */}
                      <line x1="220" y1="240" x2="360" y2="100" stroke="#000" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow-black)"/>
                      
                      {/* Arrow markers */}
                      <defs>
                        <marker id="arrow-black" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                          <polygon points="0 0, 10 3, 0 6" fill="#000" />
                        </marker>
                      </defs>
                    </svg>
                    <p className="text-center text-sm text-gray-400 mt-4">Figure 1: The structure of the Mediator Design Pattern</p>
                  </div>
                )}

                {/* Participants Details */}
                {sections[currentSection].participants && (
                  <div className="space-y-4 mb-6">
                    {sections[currentSection].participants.map((participant, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="bg-[#1E2124] rounded-lg p-5 border border-[#2F3136]"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            participant.name === 'Mediator' ? 'bg-[#5865F2]' : 
                            participant.name === 'ConcreteMediator' ? 'bg-green-400' : 
                            'bg-orange-400'
                          }`} />
                          <div className="flex-1">
                            <h4 className="text-white mb-1">{participant.name}</h4>
                            <p className="text-gray-300 text-sm mb-2">{participant.role}</p>
                            {participant.details && (
                              <p className="text-gray-400 text-sm italic">• {participant.details}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Code Example */}
                {sections[currentSection].codeExample && (
                  <div className="bg-[#1E2124] rounded-lg p-6 mb-6 border border-[#2F3136]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{`// Mediator Interface
interface AirTrafficControl {
  notify(aircraft: Aircraft, event: string): void;
}

// ConcreteMediator
class ControlTower implements AirTrafficControl {
  private aircraft: Aircraft[] = [];
  
  register(aircraft: Aircraft) {
    this.aircraft.push(aircraft);
  }
  
  notify(aircraft: Aircraft, event: string) {
    if (event === 'landing') {
      // Coordinate with other aircraft
      this.aircraft.forEach(a => {
        if (a !== aircraft) {
          a.receive(\`\${aircraft.name} is landing\`);
        }
      });
    }
  }
}

// Colleague
class Aircraft {
  constructor(
    private name: string,
    private mediator: AirTrafficControl
  ) {}
  
  requestLanding() {
    this.mediator.notify(this, 'landing');
  }
  
  receive(message: string) {
    console.log(\`\${this.name} received: \${message}\`);
  }
}`}</code>
                    </pre>
                  </div>
                )}

                {/* Improvements Achieved */}
                {sections[currentSection].improvements && (
                  <div className="space-y-4 mb-6">
                    <h3 className="text-white">Improvements Achieved:</h3>
                    {sections[currentSection].improvements.map((improvement, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="bg-[#1E2124] rounded-lg p-5 border border-[#2F3136]"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full mt-2 bg-[#5865F2]" />
                          <div className="flex-1">
                            <h4 className="text-white mb-1">{improvement.title}</h4>
                            <p className="text-gray-300 text-sm mb-2">{improvement.description}</p>
                            <p className="text-gray-400 text-sm italic">• {improvement.benefit}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Implementation Issues */}
                {sections[currentSection].implementationMethods && (
                  <div className="space-y-4 mb-6">
                    <h3 className="text-white">Implementation Issues:</h3>
                    {sections[currentSection].implementationMethods.map((method, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="bg-[#1E2124] rounded-lg p-5 border border-[#2F3136]"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full mt-2 bg-[#5865F2]" />
                          <div className="flex-1">
                            <h4 className="text-white mb-1">{method.name}</h4>
                            <p className="text-gray-300 text-sm mb-2">{method.description}</p>
                            {method.implementation && (
                              <p className="text-gray-400 text-sm italic">• {method.implementation}</p>
                            )}
                            {method.pseudoCode && (
                              <pre className="text-sm text-gray-300 overflow-x-auto">
                                <code>{method.pseudoCode}</code>
                              </pre>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Related Patterns */}
                {sections[currentSection].relatedPatterns && (
                  <div className="space-y-4 mb-6">
                    <h3 className="text-white">Related Patterns:</h3>
                    {sections[currentSection].relatedPatterns.map((pattern, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="bg-[#1E2124] rounded-lg p-5 border border-[#2F3136]"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full mt-2 bg-[#5865F2]" />
                          <div className="flex-1">
                            <h4 className="text-white mb-1">{pattern.name}</h4>
                            <p className="text-gray-300 text-sm mb-2">{pattern.relationship}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Practical Example */}
                {sections[currentSection].exampleMapping && (
                  <div className="space-y-4 mb-6">
                    <h3 className="text-white">Practical Example:</h3>
                    <div className="bg-[#1E2124] rounded-lg p-5 border border-[#2F3136]">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full mt-2 bg-[#5865F2]" />
                        <div className="flex-1">
                          <h4 className="text-white mb-1">File Dialog Simulation</h4>
                          <p className="text-gray-300 text-sm mb-2">The FileSelectionDialog acts as the mediator for all Widget siblings, coordinating their interactions without them knowing about each other.</p>
                          {sections[currentSection].exampleMapping.map((mapping, idx) => (
                            <p key={idx} className="text-gray-400 text-sm italic">• {mapping.participant}: {mapping.entity} - {mapping.method}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                    {sections[currentSection].exampleCode && (
                      <div className="bg-[#1E2124] rounded-lg p-6 mb-6 border border-[#2F3136]">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          <code>{`// Mediator Interface
interface Dialog {
  widgetChanged(widget: Widget): void;
}

// ConcreteMediator
class FileSelectionDialog implements Dialog {
  private widgets: Widget[] = [];
  
  register(widget: Widget) {
    this.widgets.push(widget);
  }
  
  widgetChanged(widget: Widget) {
    // Coordinate with other widgets
    this.widgets.forEach(w => {
      if (w !== widget) {
        w.updateWidget(widget.queryWidget());
      }
    });
  }
}

// Colleague
class Widget {
  constructor(
    private mediator: Dialog
  ) {}
  
  changed() {
    this.mediator.widgetChanged(this);
  }
  
  queryWidget(): string {
    // Return the current state of the widget
    return "current state";
  }
  
  updateWidget(state: string) {
    // Update the widget with the new state
    console.log(\`Widget updated to: \${state}\`);
  }
}

// Concrete Colleagues
class List extends Widget {
  constructor(mediator: Dialog) {
    super(mediator);
  }
  
  queryWidget(): string {
    return "list state";
  }
  
  updateWidget(state: string) {
    console.log(\`List updated to: \${state}\`);
  }
}

class Edit extends Widget {
  constructor(mediator: Dialog) {
    super(mediator);
  }
  
  queryWidget(): string {
    return "edit state";
  }
  
  updateWidget(state: string) {
    console.log(\`Edit updated to: \${state}\`);
  }
}`}</code>
                        </pre>
                      </div>
                    )}
                    {sections[currentSection].showDiagrams && (
                      <div className="bg-[#1E2124] rounded-lg p-8 mb-6 border border-[#2F3136] overflow-x-auto">
                        <svg viewBox="0 0 800 400" className="w-full h-auto">
                          {/* Client */}
                          <rect x="20" y="30" width="140" height="80" rx="8" fill="#2C2F33" stroke="#5865F2" strokeWidth="2"/>
                          <text x="90" y="75" textAnchor="middle" fill="#fff" fontSize="16">Client</text>
                          
                          {/* Mediator Interface */}
                          <rect x="330" y="30" width="140" height="80" rx="8" fill="#2C2F33" stroke="#5865F2" strokeWidth="2"/>
                          <text x="400" y="60" textAnchor="middle" fill="#5865F2" fontSize="14" fontStyle="italic">«interface»</text>
                          <text x="400" y="85" textAnchor="middle" fill="#fff" fontSize="16">Dialog</text>
                          
                          {/* ConcreteMediator */}
                          <rect x="330" y="160" width="140" height="100" rx="8" fill="#2C2F33" stroke="#4ade80" strokeWidth="2"/>
                          <text x="400" y="190" textAnchor="middle" fill="#4ade80" fontSize="16">FileSelectionDialog</text>
                          <line x1="330" y1="200" x2="470" y2="200" stroke="#4ade80" strokeWidth="1"/>
                          <text x="400" y="220" textAnchor="middle" fill="#9ca3af" fontSize="12">+widgets</text>
                          <text x="400" y="240" textAnchor="middle" fill="#9ca3af" fontSize="12">+widgetChanged()</text>
                          
                          {/* Colleague A */}
                          <rect x="560" y="30" width="140" height="100" rx="8" fill="#2C2F33" stroke="#f59e0b" strokeWidth="2"/>
                          <text x="630" y="60" textAnchor="middle" fill="#f59e0b" fontSize="16">WidgetA</text>
                          <line x1="560" y1="70" x2="700" y2="70" stroke="#f59e0b" strokeWidth="1"/>
                          <text x="630" y="90" textAnchor="middle" fill="#9ca3af" fontSize="12">+mediator</text>
                          <text x="630" y="110" textAnchor="middle" fill="#9ca3af" fontSize="12">+changed()</text>
                          
                          {/* Colleague B */}
                          <rect x="560" y="160" width="140" height="100" rx="8" fill="#2C2F33" stroke="#f59e0b" strokeWidth="2"/>
                          <text x="630" y="190" textAnchor="middle" fill="#f59e0b" fontSize="16">WidgetB</text>
                          <line x1="560" y1="200" x2="700" y2="200" stroke="#f59e0b" strokeWidth="1"/>
                          <text x="630" y="220" textAnchor="middle" fill="#9ca3af" fontSize="12">+mediator</text>
                          <text x="630" y="240" textAnchor="middle" fill="#9ca3af" fontSize="12">+queryWidget()</text>
                          
                          {/* Colleague C */}
                          <rect x="560" y="290" width="140" height="80" rx="8" fill="#2C2F33" stroke="#f59e0b" strokeWidth="2"/>
                          <text x="630" y="320" textAnchor="middle" fill="#f59e0b" fontSize="16">WidgetC</text>
                          <line x1="560" y1="330" x2="700" y2="330" stroke="#f59e0b" strokeWidth="1"/>
                          <text x="630" y="350" textAnchor="middle" fill="#9ca3af" fontSize="12">+mediator</text>
                          
                          {/* Arrows */}
                          {/* Client to Mediator */}
                          <line x1="160" y1="70" x2="330" y2="70" stroke="#5865F2" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                          
                          {/* Mediator to ConcreteMediator (inheritance) */}
                          <line x1="400" y1="110" x2="400" y2="160" stroke="#5865F2" strokeWidth="2" strokeDasharray="5,5"/>
                          <polygon points="400,110 395,120 405,120" fill="#5865F2"/>
                          
                          {/* ConcreteMediator to Colleagues */}
                          <line x1="470" y1="180" x2="560" y2="80" stroke="#9ca3af" strokeWidth="2" strokeDasharray="3,3"/>
                          <line x1="470" y1="210" x2="560" y2="210" stroke="#9ca3af" strokeWidth="2" strokeDasharray="3,3"/>
                          <line x1="470" y1="240" x2="560" y2="330" stroke="#9ca3af" strokeWidth="2" strokeDasharray="3,3"/>
                          
                          {/* Colleagues to Mediator */}
                          <path d="M 560 100 Q 500 100 470 90" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-orange)"/>
                          <path d="M 560 230 Q 520 200 470 150" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-orange)"/>
                          
                          {/* Arrow markers */}
                          <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                              <polygon points="0 0, 10 3, 0 6" fill="#5865F2" />
                            </marker>
                            <marker id="arrowhead-orange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                              <polygon points="0 0, 10 3, 0 6" fill="#f59e0b" />
                            </marker>
                          </defs>
                        </svg>
                        <p className="text-center text-sm text-gray-400 mt-4">Class Diagram: File Dialog Pattern Structure</p>
                      </div>
                    )}
                    {sections[currentSection].showDiagrams && (
                      <div className="bg-[#1E2124] rounded-lg p-8 mb-6 border border-[#2F3136] overflow-x-auto">
                        <h4 className="text-white mb-4">Sequence Diagram: Widget Interaction Flow</h4>
                        <svg viewBox="0 0 900 500" className="w-full h-auto">
                          {/* Lifelines */}
                          <rect x="50" y="20" width="120" height="60" rx="8" fill="#2C2F33" stroke="#f59e0b" strokeWidth="2"/>
                          <text x="110" y="55" textAnchor="middle" fill="#f59e0b" fontSize="14">filter:Edit</text>
                          <line x1="110" y1="80" x2="110" y2="460" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5"/>
                          
                          <rect x="290" y="20" width="180" height="60" rx="8" fill="#2C2F33" stroke="#4ade80" strokeWidth="2"/>
                          <text x="380" y="55" textAnchor="middle" fill="#4ade80" fontSize="14">FileSelectionDialog</text>
                          <line x1="380" y1="80" x2="380" y2="460" stroke="#4ade80" strokeWidth="2" strokeDasharray="5,5"/>
                          
                          <rect x="590" y="20" width="120" height="60" rx="8" fill="#2C2F33" stroke="#f59e0b" strokeWidth="2"/>
                          <text x="650" y="55" textAnchor="middle" fill="#f59e0b" fontSize="14">list:List</text>
                          <line x1="650" y1="80" x2="650" y2="460" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5"/>
                          
                          <rect x="750" y="20" width="120" height="60" rx="8" fill="#2C2F33" stroke="#f59e0b" strokeWidth="2"/>
                          <text x="810" y="55" textAnchor="middle" fill="#f59e0b" fontSize="14">button:Button</text>
                          <line x1="810" y1="80" x2="810" y2="460" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5"/>
                          
                          {/* Step 1: User changes filter */}
                          <rect x="20" y="100" width="30" height="40" fill="#23272A" stroke="#fff" strokeWidth="1"/>
                          <text x="10" y="125" fill="#9ca3af" fontSize="12">User</text>
                          <line x1="50" y1="120" x2="110" y2="120" stroke="#5865F2" strokeWidth="2" markerEnd="url(#arrow-seq)"/>
                          <text x="60" y="110" fill="#9ca3af" fontSize="11">changes text</text>
                          
                          {/* Step 2: filter calls changed() */}
                          <rect x="100" y="140" width="20" height="60" fill="#f59e0b" opacity="0.3"/>
                          <line x1="110" y1="160" x2="380" y2="160" stroke="#5865F2" strokeWidth="2" markerEnd="url(#arrow-seq)"/>
                          <text x="200" y="150" fill="#9ca3af" fontSize="11">changed()</text>
                          
                          {/* Step 3: mediator calls widgetChanged */}
                          <rect x="370" y="180" width="20" height="180" fill="#4ade80" opacity="0.3"/>
                          <line x1="380" y1="200" x2="110" y2="200" stroke="#5865F2" strokeWidth="2" markerEnd="url(#arrow-seq)"/>
                          <text x="200" y="190" fill="#9ca3af" fontSize="11">queryWidget()</text>
                          
                          {/* Step 4: filter returns state */}
                          <line x1="110" y1="220" x2="380" y2="220" stroke="#5865F2" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrow-seq)"/>
                          <text x="200" y="210" fill="#9ca3af" fontSize="11">return filterText</text>
                          
                          {/* Step 5: mediator updates list */}
                          <line x1="380" y1="250" x2="650" y2="250" stroke="#5865F2" strokeWidth="2" markerEnd="url(#arrow-seq)"/>
                          <text x="450" y="240" fill="#9ca3af" fontSize="11">updateWidget(filterText)</text>
                          <rect x="640" y="260" width="20" height="40" fill="#f59e0b" opacity="0.3"/>
                          
                          {/* Step 6: mediator updates button */}
                          <line x1="380" y1="310" x2="810" y2="310" stroke="#5865F2" strokeWidth="2" markerEnd="url(#arrow-seq)"/>
                          <text x="530" y="300" fill="#9ca3af" fontSize="11">updateWidget(filterText)</text>
                          <rect x="800" y="320" width="20" height="40" fill="#f59e0b" opacity="0.3"/>
                          
                          {/* Step 7: Return to mediator */}
                          <line x1="380" y1="380" x2="110" y2="380" stroke="#5865F2" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrow-seq)"/>
                          <text x="200" y="370" fill="#9ca3af" fontSize="11">return</text>
                          
                          {/* Labels */}
                          <text x="20" y="430" fill="#9ca3af" fontSize="12">1. User changes filter text</text>
                          <text x="20" y="450" fill="#9ca3af" fontSize="12">2. Edit widget notifies mediator</text>
                          <text x="20" y="470" fill="#9ca3af" fontSize="12">3. Mediator queries filter and updates all widgets</text>
                          
                          {/* Arrow marker for sequence diagram */}
                          <defs>
                            <marker id="arrow-seq" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                              <polygon points="0 0, 10 3, 0 6" fill="#5865F2" />
                            </marker>
                          </defs>
                        </svg>
                        <p className="text-center text-sm text-gray-400 mt-4">Sequence Diagram: User changes filter → Mediator updates all widgets</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Key Points */}
                <div className="space-y-3">
                  <h3 className="text-white">Key Points:</h3>
                  <div className="space-y-2">
                    {sections[currentSection].keyPoints.map((point, idx) => (
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

       <TabsContent value="cpp" className="mt-6">
  <Card className="bg-[#2C2F33] border-[#2F3136] p-8 card-shadow">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <FileText className="w-6 h-6 text-[#5865F2]" />
        <h2 className="text-white text-xl">C++ Fundamentals for Mediator Pattern</h2>
      </div>

      <p className="text-gray-300 leading-relaxed mb-6">
        To implement the <strong>Mediator Design Pattern</strong> in C++, it’s important to
        understand the following core language features and OOP principles. These concepts
        enable efficient communication between objects while maintaining loose coupling.
      </p>

      <ul className="list-disc pl-6 text-gray-300 space-y-3">
        <li>
          <strong>Abstract Classes and Pure Virtual Functions:</strong><br />
          The Mediator interface is usually declared as an abstract base class with 
          <code>virtual</code> methods, for example:
          <pre className="bg-[#1E2124] text-gray-200 p-3 rounded mt-2 text-sm overflow-x-auto">
{`class Mediator {
public:
    virtual void notify(class Colleague* sender, const std::string& event) = 0;
};`}
          </pre>
          This allows flexibility and enforces a consistent interface across different mediators.
        </li>

        <li>
          <strong>Object Composition and References:</strong><br />
          Each <code>Colleague</code> class keeps a reference or pointer to a <code>Mediator</code>
          instead of directly referencing other colleagues:
          <pre className="bg-[#1E2124] text-gray-200 p-3 rounded mt-2 text-sm overflow-x-auto">
{`class Colleague {
protected:
    Mediator* mediator;
public:
    Colleague(Mediator* m) : mediator(m) {}
    virtual void changed() { mediator->notify(this, "update"); }
};`}
          </pre>
          This enables all interactions to go through the mediator, preventing tight coupling.
        </li>

        <li>
          <strong>Polymorphism and Virtual Dispatch:</strong><br />
          Polymorphism allows the mediator to call <code>notify()</code> or 
          <code>changed()</code> without knowing the concrete class type at compile time.
          This makes the mediator’s behavior flexible and extendable.
        </li>

        <li>
          <strong>Encapsulation and Access Control:</strong><br />
          Use <code>protected</code> and <code>private</code> members to hide direct
          object interactions. Only the mediator should manage coordination.
        </li>

        <li>
          <strong>Memory Management:</strong><br />
          Because colleagues and mediators often reference each other, it’s important to avoid
          raw pointers leading to memory leaks or dangling references. Modern C++ uses smart pointers:
          <pre className="bg-[#1E2124] text-gray-200 p-3 rounded mt-2 text-sm overflow-x-auto">
{`#include <memory>
std::shared_ptr<Mediator> mediator = std::make_shared<ConcreteMediator>();`}
          </pre>
          Use <code>std::weak_ptr</code> when colleagues hold references back to the mediator
          to prevent circular ownership.
        </li>

        <li>
          <strong>Header and Implementation Separation:</strong><br />
          Declare abstract interfaces in header files (<code>.h</code>) and
          define behavior in implementation files (<code>.cpp</code>) to keep the mediator and
          colleague logic modular and reusable.
        </li>

        <li>
          <strong>Use of Delegation:</strong><br />
          The pattern’s essence lies in delegating behavior. Each colleague delegates
          coordination responsibility to the mediator:
          <pre className="bg-[#1E2124] text-gray-200 p-3 rounded mt-2 text-sm overflow-x-auto">
{`void ConcreteColleague::changed() {
    mediator->notify(this, "data_updated");
}`}
          </pre>
        </li>

        <li>
          <strong>Design Principle:</strong><br />
          Apply the <em>Single Responsibility Principle</em> — colleagues handle internal logic,
          while mediators handle inter-object communication.
        </li>
      </ul>

      <div className="mt-6">
        <h3 className="text-white mb-3">💡 Example Summary</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          In a C++ Mediator implementation, define a <code>Mediator</code> interface, a
          <code>ConcreteMediator</code> that coordinates actions, and several
          <code>Colleague</code> classes that notify the mediator when their state changes.
          The mediator then propagates updates appropriately — just as in the 
          <em>FileSelectionDialog</em> or <em>AirTrafficControl</em> examples.
        </p>
      </div>
    </motion.div>
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

  {/* Removed the Check Your Knowledge button */}

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