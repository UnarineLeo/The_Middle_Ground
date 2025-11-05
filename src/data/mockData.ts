export const designPatterns = [
  {
    id: 1,
    name: "Mediator Pattern",
    category: "Behavioral",
    difficulty: "Intermediate",
    description: "Define an object that encapsulates how a set of objects interact. Promotes loose coupling by keeping objects from referring to each other explicitly.",
    icon: "🚂",
    progress: 45,
    completed: false,
    featured: true
  },
  {
    id: 2,
    name: "Observer Pattern",
    category: "Behavioral",
    difficulty: "Intermediate",
    description: "Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified.",
    icon: "👁️",
    progress: 75,
    completed: false,
    featured: false
  },
  {
    id: 3,
    name: "Strategy Pattern",
    category: "Behavioral",
    difficulty: "Beginner",
    description: "Define a family of algorithms, encapsulate each one, and make them interchangeable.",
    icon: "🎯",
    progress: 100,
    completed: true,
    featured: false
  },
  {
    id: 4,
    name: "Decorator Pattern",
    category: "Structural",
    difficulty: "Intermediate",
    description: "Attach additional responsibilities to an object dynamically.",
    icon: "🎨",
    progress: 45,
    completed: false,
    featured: false
  },
  {
    id: 5,
    name: "Adapter Pattern",
    category: "Structural",
    difficulty: "Beginner",
    description: "Convert the interface of a class into another interface clients expect.",
    icon: "🔌",
    progress: 30,
    completed: false,
    featured: false
  },
  {
    id: 6,
    name: "Command Pattern",
    category: "Behavioral",
    difficulty: "Intermediate",
    description: "Encapsulate a request as an object, thereby letting you parameterize clients with different requests.",
    icon: "⚡",
    progress: 60,
    completed: false,
    featured: false
  }
];

export const quizQuestions = [
  {
    id: 1,
    pattern: "Mediator Pattern",
    difficulty: "Medium",
    type: "multiple-choice",
    question: "Which of the following best describes the Mediator pattern?",
    options: [
      "A pattern that creates objects without specifying their exact classes",
      "A pattern where an object encapsulates how a set of objects interact",
      "A pattern that allows incompatible interfaces to work together",
      "A pattern where objects are notified of state changes"
    ],
    correctAnswer: 1,
    explanation: "The Mediator pattern defines an object that encapsulates how a set of objects interact. It promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently.",
    source: "Design Patterns: Elements of Reusable Object-Oriented Software",
    hint: "Think about an air traffic controller - they coordinate communication between multiple planes without the planes talking directly to each other.",
    skeletonCode: `class TrafficControlMediator {
  private trains: Train[] = [];
  
  registerTrain(train: Train) {
    // TODO: Add train to mediator
    this.trains.push(train);
  }
  
  sendSignal(sender: Train, message: string) {
    // TODO: Coordinate between trains
  }
}`
  },
  {
    id: 2,
    pattern: "Mediator Pattern",
    difficulty: "Medium",
    type: "scenario",
    question: "You're building a chat application where users can send messages in a room. Which component would be the Mediator?",
    options: [
      "The User object",
      "The Message object",
      "The ChatRoom that coordinates message delivery",
      "The Network connection"
    ],
    correctAnswer: 2,
    explanation: "The ChatRoom acts as the Mediator by coordinating how users (colleagues) communicate with each other. Users don't send messages directly to other users; they send them through the ChatRoom mediator.",
    source: "Head First Design Patterns",
    hint: "The mediator is the central coordinator that manages interactions between participants.",
    skeletonCode: `class ChatRoom {
  private users: User[] = [];
  
  registerUser(user: User) {
    this.users.push(user);
  }
  
  sendMessage(message: string, from: User) {
    // TODO: Distribute message to all users
  }
}`
  },
  {
    id: 3,
    pattern: "Mediator Pattern",
    difficulty: "Easy",
    type: "fill-in",
    question: "In the Mediator pattern, objects communicate through the _____ instead of directly with each other.",
    answer: "mediator",
    explanation: "The Mediator pattern centralizes complex communications and control logic between objects in a system. The mediator acts as an intermediary that handles all communication.",
    source: "Gang of Four Design Patterns",
    hint: "What is the name of the central coordinator in this pattern?",
    skeletonCode: `interface Colleague {
  send(message: string): void;
  receive(message: string): void;
}

class ConcreteColleague implements Colleague {
  constructor(private mediator: Mediator) {}
  
  send(message: string) {
    this.mediator.notify(this, message);
  }
}`
  }
];

export const chatMessages = [
  {
    id: 1,
    sender: "AKA",
    message: "Hi there! I'm AKA, your AI learning assistant. I'm here to help you master the Mediator Design Pattern! 🚂",
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    id: 2,
    sender: "user",
    message: "What exactly is the Mediator pattern and when should I use it?",
    timestamp: new Date(Date.now() - 3500000)
  },
  {
    id: 3,
    sender: "AKA",
    message: "Excellent question! The Mediator pattern is like a traffic controller at a busy intersection:\n\n**What it does**: Defines an object that controls how a set of objects interact with each other.\n\n**Key benefit**: Objects don't communicate directly - they go through the mediator. This reduces dependencies and makes your code more maintainable.\n\n**Real-world example**: Think of an air traffic controller coordinating planes, or a chat room managing messages between users.\n\n**Use it when**: You have many objects that need to communicate in complex ways, and you want to avoid tight coupling between them.",
    timestamp: new Date(Date.now() - 3400000)
  }
];

export const userProfile = {
  name: "Alex Johnson",
  avatar: "AJ",
  level: 12,
  xp: 2847,
  nextLevelXp: 3000,
  badges: [
    { id: 1, name: "Mediator Master", icon: "🚂", earned: false },
    { id: 2, name: "Quick Learner", icon: "⚡", earned: true },
    { id: 3, name: "Quiz Champion", icon: "🎯", earned: true },
    { id: 4, name: "Train Conductor", icon: "🎮", earned: false },
    { id: 5, name: "Perfect Score", icon: "💯", earned: false }
  ],
  completedPatterns: 4,
  totalPatterns: 23,
  quizScore: 89
};

export const leaderboard = [
  { rank: 1, name: "Emma Wilson", score: 4250, badges: 15, avatar: "EW", status: "winner" },
  { rank: 2, name: "Michael Chen", score: 3890, badges: 12, avatar: "MC", status: "winner" },
  { rank: 3, name: "Sarah Davis", score: 3645, badges: 11, avatar: "SD", status: "winner" },
  { rank: 4, name: "Alex Johnson", score: 2847, badges: 8, avatar: "AJ", status: "winner" },
  { rank: 5, name: "James Brown", score: 2430, badges: 7, avatar: "JB", status: "winner" },
  { rank: 6, name: "Lisa Anderson", score: 2180, badges: 6, avatar: "LA", status: "loser" },
  { rank: 7, name: "David Martinez", score: 1920, badges: 5, avatar: "DM", status: "loser" },
  { rank: 8, name: "Sophie Taylor", score: 1650, badges: 4, avatar: "ST", status: "loser" }
];

export const conductorNodes = [
  { id: 1, type: "pattern", name: "Observer", x: 100, y: 100 },
  { id: 2, type: "component", name: "Subject", x: 300, y: 50 },
  { id: 3, type: "component", name: "Observer", x: 300, y: 150 },
  { id: 4, type: "action", name: "Notify", x: 500, y: 100 }
];
