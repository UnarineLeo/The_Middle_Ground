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
    progress: 0,
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
    progress: 0,
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
    progress: 0,
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
    progress: 0,
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
    progress: 0,
    completed: false,
    featured: false
  }
];

export const quizQuestions = [
  {
    id: 1,
    pattern: "Mediator Pattern",
    difficulty: "Easy",
    type: "multiple-choice",
    question: "What is the main intent of the Mediator design pattern?",
    options: [
      "To define one-to-one communication between objects",
      "To define an object that encapsulates how a set of objects interact",
      "To simplify inheritance among related classes",
      "To hide object creation details from clients"
    ],
    correctAnswer: 1,
    explanation: "The Mediator defines an object that encapsulates how a set of objects interact, promoting loose coupling between them.",
    source: "Chapter 17, Section 17.2.1 - Intent",
    hint: "It focuses on coordinating interactions between multiple objects."
  },
  {
    id: 2,
    pattern: "Mediator Pattern",
    difficulty: "Medium",
    type: "fill-in",
    question: "The Mediator pattern promotes _____ by keeping objects from referring to each other explicitly.",
    answer: "loose coupling",
    explanation: "By removing direct references between colleagues, the Mediator pattern promotes loose coupling and flexibility.",
    source: "Section 17.2.1 - Intent",
    hint: "Think about the opposite of tight interdependence."
  },
  {
    id: 3,
    pattern: "Mediator Pattern",
    difficulty: "Medium",
    type: "multiple-choice",
    question: "Which of the following best describes the role of a ConcreteMediator?",
    options: [
      "It implements cooperative behavior by coordinating Colleague objects.",
      "It defines an interface for communicating with subsystems.",
      "It creates new colleagues dynamically.",
      "It observes state changes in the system and notifies others."
    ],
    correctAnswer: 0,
    explanation: "The ConcreteMediator coordinates and maintains communication between its colleagues.",
    source: "Section 17.2.3 - Participants",
    hint: "It’s responsible for coordinating all colleagues."
  },
  {
    id: 4,
    pattern: "Mediator Pattern",
    difficulty: "Medium",
    type: "multiple-choice",
    question: "What does each Colleague class know in the Mediator pattern?",
    options: [
      "Only the Mediator object",
      "All other colleagues",
      "Both Mediator and all other colleagues",
      "No other object at all"
    ],
    correctAnswer: 0,
    explanation: "Each Colleague knows only its Mediator and communicates through it rather than directly with other colleagues.",
    source: "Section 17.2.3 - Participants",
    hint: "Direct communication between colleagues is avoided."
  },
  {
    id: 5,
    pattern: "Mediator Pattern",
    difficulty: "Easy",
    type: "multiple-choice",
    question: "What programming issue does the Mediator pattern help prevent?",
    options: [
      "Object redundancy",
      "Spaghetti code phenomenon",
      "Excessive memory usage",
      "Data inconsistency"
    ],
    correctAnswer: 1,
    explanation: "By reducing dependencies among classes, the Mediator pattern prevents tightly coupled spaghetti code.",
    source: "Section 17.2.4 - Problem",
    hint: "It solves a problem that arises from too many interconnections between classes."
  },
  {
    id: 6,
    pattern: "Mediator Pattern",
    difficulty: "Medium",
    type: "fill-in",
    question: "A mediator is responsible for controlling and _____ the interactions of a group of objects.",
    answer: "coordinating",
    explanation: "The mediator centralizes control and coordination among related objects.",
    source: "Section 17.3.1 - Purpose",
    hint: "It doesn’t just control, it also synchronizes activities."
  },
  {
    id: 7,
    pattern: "Mediator Pattern",
    difficulty: "Medium",
    type: "multiple-choice",
    question: "Which of the following is an improvement achieved by applying the Mediator pattern?",
    options: [
      "Increased inheritance depth",
      "Simplified update process",
      "More direct communication",
      "Tighter coupling between objects"
    ],
    correctAnswer: 1,
    explanation: "Updates to behavior require changes only in the mediator, not all colleagues, simplifying maintenance.",
    source: "Section 17.3.2 - Improvements achieved",
    hint: "It makes future code updates easier."
  },
  {
    id: 8,
    pattern: "Mediator Pattern",
    difficulty: "Easy",
    type: "multiple-choice",
    question: "How does the Mediator pattern increase code reusability?",
    options: [
      "By making all colleagues depend on each other",
      "By tightly coupling mediator and colleagues",
      "By decoupling colleagues from each other",
      "By inheriting behavior from a single superclass"
    ],
    correctAnswer: 2,
    explanation: "Decoupling colleagues allows them to be reused in other contexts independently.",
    source: "Section 17.3.2 - Improvements achieved",
    hint: "When components don’t depend directly on others, they’re easier to reuse."
  },
  {
    id: 9,
    pattern: "Mediator Pattern",
    difficulty: "Medium",
    type: "fill-in",
    question: "When refactoring into the Mediator pattern, a many-to-many relationship is changed to a _____ relationship.",
    answer: "one-to-many",
    explanation: "The mediator centralizes communication, simplifying a many-to-many network into a one-to-many structure.",
    source: "Section 17.3.2 - Simplification of object protocol",
    hint: "Think about how communication becomes centralized."
  },
  {
    id: 10,
    pattern: "Mediator Pattern",
    difficulty: "Medium",
    type: "multiple-choice",
    question: "What is the purpose of the changed() method in the colleague interface?",
    options: [
      "To directly modify other colleagues",
      "To notify the mediator that a change has occurred",
      "To reset the mediator state",
      "To destroy outdated objects"
    ],
    correctAnswer: 1,
    explanation: "The changed() method notifies the mediator whenever a colleague changes, so it can propagate updates.",
    source: "Section 17.3.3 - Implementation issues",
    hint: "It’s the colleague’s way of signaling an update."
  },
  {
    id: 11,
    pattern: "Mediator Pattern",
    difficulty: "Medium",
    type: "multiple-choice",
    question: "In the Mediator’s notify() method, what parameter is passed to indicate the source of the change?",
    options: [
      "The type of update",
      "The originator colleague",
      "The mediator object itself",
      "The system log"
    ],
    correctAnswer: 1,
    explanation: "A pointer or reference to the originator colleague is passed, allowing the mediator to identify who triggered the update.",
    source: "Section 17.3.3 - notify()",
    hint: "It identifies which colleague caused the event."
  },
  {
    id: 12,
    pattern: "Mediator Pattern",
    difficulty: "Medium",
    type: "scenario",
    question: "If a colleague’s state changes and you want all other colleagues updated automatically, which method should the colleague call?",
    options: ["notify()", "changed()", "update()", "propagate()"],
    correctAnswer: 1,
    explanation: "Each colleague calls changed() to signal the mediator, which then notifies other colleagues.",
    source: "Section 17.3.3",
    hint: "It’s a method defined in the colleague interface."
  },
  {
    id: 13,
    pattern: "Mediator Pattern",
    difficulty: "Hard",
    type: "multiple-choice",
    question: "Why should the mediator’s notify() method avoid sending the content of an update as a parameter?",
    options: [
      "To keep the interface stable and generic",
      "Because it increases memory use",
      "To ensure updates are irreversible",
      "Because colleagues cannot interpret data"
    ],
    correctAnswer: 0,
    explanation: "Avoiding detailed parameters keeps the interface flexible for various colleague types.",
    source: "Section 17.3.3 - notify() discussion",
    hint: "It’s about interface design stability."
  },
  {
    id: 14,
    pattern: "Mediator Pattern",
    difficulty: "Easy",
    type: "fill-in",
    question: "The Mediator pattern’s protocol is _____, unlike the Facade pattern’s unidirectional protocol.",
    answer: "multidirectional",
    explanation: "Mediator enables two-way communication, while Facade only sends requests in one direction.",
    source: "Section 17.3.4 - Related patterns",
    hint: "Think of communication direction."
  },
  {
    id: 15,
    pattern: "Mediator Pattern",
    difficulty: "Medium",
    type: "multiple-choice",
    question: "How does the Mediator pattern differ from the Facade pattern?",
    options: [
      "Mediator centralizes communication; Facade simplifies interfaces.",
      "Mediator creates objects; Facade manages memory.",
      "Mediator hides complexity; Facade promotes coupling.",
      "They are identical in behavior."
    ],
    correctAnswer: 0,
    explanation: "Mediator coordinates object interaction, while Facade provides a simplified interface to a subsystem.",
    source: "Section 17.3.4 - Related patterns",
    hint: "One focuses on communication, the other on interface simplification."
  },
  {
    id: 16,
    pattern: "Mediator Pattern",
    difficulty: "Easy",
    type: "multiple-choice",
    question: "Which pattern can colleagues use to communicate with the mediator?",
    options: ["Observer", "Command", "Strategy", "Decorator"],
    correctAnswer: 0,
    explanation: "The Observer pattern is often used so colleagues can notify the mediator of changes.",
    source: "Section 17.3.4 - Related patterns",
    hint: "Think of a pattern used for notifications."
  },
  {
    id: 17,
    pattern: "Mediator Pattern",
    difficulty: "Medium",
    type: "scenario",
    question: "In a file dialog example, which class acts as the ConcreteMediator?",
    options: ["Dialog", "Widget", "FileSelectionDialog", "List"],
    correctAnswer: 2,
    explanation: "FileSelectionDialog implements cooperative behavior between widget components, acting as the ConcreteMediator.",
    source: "Section 17.4 - Example",
    hint: "It coordinates all widgets in the dialog."
  },
  {
    id: 18,
    pattern: "Mediator Pattern",
    difficulty: "Medium",
    type: "multiple-choice",
    question: "In the example, which class represents the Colleague interface?",
    options: ["Dialog", "Widget", "Edit", "FileSelectionDialog"],
    correctAnswer: 1,
    explanation: "Widget serves as the abstract colleague in the example, while List and Edit are its concrete colleagues.",
    source: "Section 17.4 - Example",
    hint: "It’s the parent class of List and Edit."
  },
  {
    id: 19,
    pattern: "Mediator Pattern",
    difficulty: "Medium",
    type: "fill-in",
    question: "In the file dialog example, the method widgetChanged() in FileSelectionDialog acts as the _____ of communication.",
    answer: "hub",
    explanation: "widgetChanged() is the central hub for all interaction logic among widgets.",
    source: "Section 17.4 - Example",
    hint: "Think of a central connection point."
  },
  {
    id: 20,
    pattern: "Mediator Pattern",
    difficulty: "Hard",
    type: "multiple-choice",
    question: "What does the sequence diagram in the example illustrate?",
    options: [
      "The instantiation order of abstract classes",
      "The time ordering of mediator-coordinated widget interactions",
      "Memory allocation of widget objects",
      "The class inheritance hierarchy"
    ],
    correctAnswer: 1,
    explanation: "It shows the chronological order of interactions governed by the mediator when widgets update.",
    source: "Section 17.4 - Example, Figure 3",
    hint: "It focuses on message order and timing."
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
  name: "Wandile Mathebula",
  avatar: "WM",
  level: 8,
  xp: 2847,
  nextLevelXp: 3000,
  badges: [
    { id: 1, name: "Quick Learner", icon: "⚡", earned: true },
    { id: 2, name: "Quiz Champion", icon: "🎯", earned: true },
    { id: 3, name: "Mediator Master", icon: "🚂", earned: false },
    { id: 4, name: "Train Conductor", icon: "🎮", earned: false },
    { id: 5, name: "Perfect Score", icon: "💯", earned: false }
  ],
  completedPatterns: 4,
  totalPatterns: 23,
  quizScore: 89
};

export const leaderboard = [
  { rank: 1, name: "Emma Wilson", score: 4250, badges: 15, avatar: "EW", status: "winner" },
  { rank: 2, name: "Musa Ntyatyamba", score: 3890, badges: 12, avatar: "MC", status: "winner" },
  { rank: 3, name: "Sarah Davis", score: 3645, badges: 11, avatar: "SD", status: "winner" },
  { rank: 4, name: "Wandile Mathebula", score: 2847, badges: 8, avatar: "AJ", status: "winner" },
  { rank: 5, name: "James Brown", score: 2430, badges: 7, avatar: "JB", status: "winner" },
  { rank: 6, name: "Monna KeVan", score: 2180, badges: 6, avatar: "LA", status: "loser" },
  { rank: 7, name: "David Martinez", score: 1920, badges: 5, avatar: "DM", status: "loser" },
  { rank: 8, name: "Tlaba Obewete", score: 1650, badges: 4, avatar: "ST", status: "loser" }
];

export const conductorNodes = [
  { id: 1, type: "pattern", name: "Observer", x: 100, y: 100 },
  { id: 2, type: "component", name: "Subject", x: 300, y: 50 },
  { id: 3, type: "component", name: "Observer", x: 300, y: 150 },
  { id: 4, type: "action", name: "Notify", x: 500, y: 100 }
];

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


export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Airport Traffic Control System",
    scenario: "You're building an airport traffic control system where multiple runways need to coordinate with aircraft. The control tower acts as a mediator, managing all communication between runways and planes to prevent conflicts. Without the mediator pattern, each runway would need to directly communicate with every other runway to check availability, creating a complex web of dependencies. Instead, the control tower centralizes all communication - when a runway requests to land an aircraft, the tower notifies all other runways about the request. This way, runways only know about the control tower, not about each other. Your task is to implement the key methods that enable this coordinated communication flow.",
    hint: "The mediator (ControlTower) needs a method to handle notifications from colleagues. This method should be called 'notify' and it receives both the sender runway and the message. When the tower receives a notification, it should forward the message to all other runways by calling their 'receive' method. Each Runway needs to maintain a reference to its mediator using a pointer variable, typically named 'mediator', so it can send notifications when needed.",
    type: "fill",
    code: `class ControlTower {
private:
    vector<Runway*> runways;
    
public:
    void registerRunway(Runway* runway) {
        runways.push_back(runway);
    }
    
    void ___BLANK1___(Runway* runway, string message) {
        for (auto r : runways) {
            if (r != runway) {
                r->___BLANK2___(message);
            }
        }
    }
};

class Runway {
private:
    ControlTower* ___BLANK3___;
    string name;
    
public:
    Runway(ControlTower* tower, string n) : mediator(tower), name(n) {
        tower->registerRunway(this);
    }
    
    void requestLanding() {
        mediator->notify(this, name + " requesting landing");
    }
    
    void receive(string message) {
        cout << name << " received: " << message << endl;
    }
};`,
    blanks: [
      { id: "BLANK1", answer: "notify" },
      { id: "BLANK2", answer: "receive" },
      { id: "BLANK3", answer: "mediator" }
    ],
    correctCode: `class ControlTower {
private:
    vector<Runway*> runways;
    
public:
    void registerRunway(Runway* runway) {
        runways.push_back(runway);
    }
    
    void notify(Runway* runway, string message) {
        for (auto r : runways) {
            if (r != runway) {
                r->receive(message);
            }
        }
    }
};

class Runway {
private:
    ControlTower* mediator;
    string name;
    
public:
    Runway(ControlTower* tower, string n) : mediator(tower), name(n) {
        tower->registerRunway(this);
    }
    
    void requestLanding() {
        mediator->notify(this, name + " requesting landing");
    }
    
    void receive(string message) {
        cout << name << " received: " << message << endl;
    }
};`
  },
  {
    id: 2,
    title: "Smart Home System",
    scenario: "Design a smart home where devices communicate through a central hub. When motion is detected, the hub coordinates the lights, thermostat, and security camera without devices talking directly to each other. In a traditional approach, each smart device would need direct connections to every other device - the motion sensor would call the lights directly, the thermostat directly, and the camera directly. This creates tight coupling and makes it difficult to add new devices. With the Mediator pattern, the SmartHomeHub sits in the middle: when the motion sensor detects movement, it notifies the hub, and the hub then coordinates all other devices' responses. Your task is to arrange the code lines in the correct order to build a properly structured mediator class following C++ conventions.",
    hint: "In C++, class structure follows a specific order: First comes the class declaration, then access specifiers (private before public is conventional), followed by member variables in the private section, and finally public methods. The SmartHomeHub needs to store a vector of devices in its private section, provide a registerDevice() method to add devices, and implement a notify() method that loops through all devices and calls handleEvent() on each one except the sender. Make sure the loop logic checks if the current device is not the sender before forwarding the event.",
    type: "drag",
    code: "",
    dragItems: [
      { id: "1", text: "class SmartHomeHub {", correctPosition: 0 },
      { id: "2", text: "private:", correctPosition: 1 },
      { id: "3", text: "    vector<SmartDevice*> devices;", correctPosition: 2 },
      { id: "4", text: "public:", correctPosition: 3 },
      { id: "5", text: "    void registerDevice(SmartDevice* device) {", correctPosition: 4 },
      { id: "6", text: "        devices.push_back(device);", correctPosition: 5 },
      { id: "7", text: "    }", correctPosition: 6 },
      { id: "8", text: "    void notify(SmartDevice* sender, string event) {", correctPosition: 7 },
      { id: "9", text: "        for (auto device : devices) {", correctPosition: 8 },
      { id: "10", text: "            if (device != sender) {", correctPosition: 9 },
      { id: "11", text: "                device->handleEvent(event);", correctPosition: 10 },
      { id: "12", text: "            }", correctPosition: 11 },
      { id: "13", text: "        }", correctPosition: 12 },
      { id: "14", text: "    }", correctPosition: 13 },
      { id: "15", text: "};", correctPosition: 14 }
    ],
    correctCode: `class SmartHomeHub {
private:
    vector<SmartDevice*> devices;
public:
    void registerDevice(SmartDevice* device) {
        devices.push_back(device);
    }
    void notify(SmartDevice* sender, string event) {
        for (auto device : devices) {
            if (device != sender) {
                device->handleEvent(event);
            }
        }
    }
};`
  },
  {
    id: 3,
    title: "Online Chat Room",
    scenario: "Create a chat room where users can send messages. The chat room mediator receives messages from one user and broadcasts them to all other users, preventing direct user-to-user communication. Imagine building a messaging application where you have many users who want to communicate. Without a mediator, User A would need to maintain references to Users B, C, D, and E to send messages directly to each of them. If a new user F joins, every existing user needs to be updated with this new reference. This becomes unmanageable as the system grows. The Mediator pattern solves this by introducing a ChatRoom that acts as the central hub. Users only need to know about the ChatRoom, not about each other. When a user wants to send a message, they send it to the ChatRoom, and the ChatRoom handles broadcasting it to all other participants. Your task is to complete the implementation by filling in the missing method names that establish this communication flow.",
    hint: "The relationship between users and the chat room involves three key methods. First, when a user is added to the chat room, the chat room needs to give that user a reference to itself - this is done through a method called 'setChatRoom'. Second, when a user wants to communicate, they call a method on the ChatRoom that handles message distribution - this should be called 'sendMessage' and takes both the sender and the message content. Third, the User class needs a private member variable to store its reference to the ChatRoom mediator - this should be the 'chatRoom' pointer. Think about the flow: user sends → mediator receives → mediator broadcasts to others.",
    type: "fill",
    code: `class ChatRoom {
private:
    vector<User*> users;
    
public:
    void addUser(User* user) {
        users.push_back(user);
        user->___BLANK1___(this);
    }
    
    void ___BLANK2___(User* sender, string message) {
        for (auto user : users) {
            if (user != sender) {
                user->receive(sender->getName() + ": " + message);
            }
        }
    }
};

class User {
private:
    ChatRoom* chatRoom;
    string name;
    
public:
    User(string n) : name(n), chatRoom(nullptr) {}
    
    void setChatRoom(ChatRoom* room) {
        ___BLANK3___ = room;
    }
    
    void send(string message) {
        chatRoom->sendMessage(this, message);
    }
    
    void receive(string message) {
        cout << name << " received: " << message << endl;
    }
    
    string getName() { return name; }
};`,
    blanks: [
      { id: "BLANK1", answer: "setChatRoom" },
      { id: "BLANK2", answer: "sendMessage" },
      { id: "BLANK3", answer: "chatRoom" }
    ],
    correctCode: `class ChatRoom {
private:
    vector<User*> users;
    
public:
    void addUser(User* user) {
        users.push_back(user);
        user->setChatRoom(this);
    }
    
    void sendMessage(User* sender, string message) {
        for (auto user : users) {
            if (user != sender) {
                user->receive(sender->getName() + ": " + message);
            }
        }
    }
};

class User {
private:
    ChatRoom* chatRoom;
    string name;
    
public:
    User(string n) : name(n), chatRoom(nullptr) {}
    
    void setChatRoom(ChatRoom* room) {
        chatRoom = room;
    }
    
    void send(string message) {
        chatRoom->sendMessage(this, message);
    }
    
    void receive(string message) {
        cout << name << " received: " << message << endl;
    }
    
    string getName() { return name; }
};`
  },
  {
    id: 4,
    title: "Restaurant Order Management",
    scenario: "Build a restaurant system where customers place orders and the kitchen fulfills them. The OrderManager acts as a mediator between customers and kitchen stations, routing orders to appropriate stations. In a traditional restaurant without this pattern, each customer would need to know which kitchen station handles their specific order - the grill for steaks, the salad station for appetizers, the dessert station for sweets. This creates chaos and confusion. The OrderManager mediator centralizes all order routing - customers simply place orders with the manager, and the manager intelligently routes each order to the correct kitchen station while tracking order status. Your task is to arrange the mediator class code in proper C++ structure.",
    hint: "The OrderManager class follows standard C++ conventions: declare the class, define private members first (a vector to store kitchen stations), then public methods. You need a registerStation() method to add stations to the manager, and a routeOrder() method that loops through all stations and calls their appropriate handling method. Remember that access specifiers (private:, public:) come before their respective members.",
    type: "drag",
    code: "",
    dragItems: [
      { id: "1", text: "class OrderManager {", correctPosition: 0 },
      { id: "2", text: "private:", correctPosition: 1 },
      { id: "3", text: "    vector<KitchenStation*> stations;", correctPosition: 2 },
      { id: "4", text: "public:", correctPosition: 3 },
      { id: "5", text: "    void registerStation(KitchenStation* station) {", correctPosition: 4 },
      { id: "6", text: "        stations.push_back(station);", correctPosition: 5 },
      { id: "7", text: "    }", correctPosition: 6 },
      { id: "8", text: "    void routeOrder(string dish, int tableNumber) {", correctPosition: 7 },
      { id: "9", text: "        for (auto station : stations) {", correctPosition: 8 },
      { id: "10", text: "            station->prepareOrder(dish, tableNumber);", correctPosition: 9 },
      { id: "11", text: "        }", correctPosition: 10 },
      { id: "12", text: "    }", correctPosition: 11 },
      { id: "13", text: "};", correctPosition: 12 }
    ],
    correctCode: `class OrderManager {
private:
    vector<KitchenStation*> stations;
public:
    void registerStation(KitchenStation* station) {
        stations.push_back(station);
    }
    void routeOrder(string dish, int tableNumber) {
        for (auto station : stations) {
            station->prepareOrder(dish, tableNumber);
        }
    }
};`
  },
  {
    id: 5,
    title: "Stock Trading Exchange",
    scenario: "Design a stock exchange where traders buy and sell stocks through a central exchange mediator. The exchange matches buy and sell orders without traders communicating directly. In financial markets, having traders negotiate directly with each other for every transaction would be impossibly slow and chaotic. The StockExchange mediator solves this by collecting all buy and sell orders, matching them based on price and quantity, and executing trades automatically. Traders only interact with the exchange, not with each other, ensuring fair pricing and efficient order execution. Your task is to implement the mediator methods that handle order placement and trader registration.",
    hint: "The StockExchange mediator needs three key components: a 'registerTrader' method that takes a Trader pointer and gives that trader a reference to the exchange (using the trader's 'setExchange' method), a 'placeOrder' method that handles incoming orders from traders, and the Trader class needs a private member variable to store its exchange reference (call it 'exchange'). The flow is: trader → exchange → order processing → notification to relevant traders.",
    type: "fill",
    code: `class StockExchange {
private:
    vector<Trader*> traders;
    
public:
    void ___BLANK1___(Trader* trader) {
        traders.push_back(trader);
        trader->setExchange(this);
    }
    
    void ___BLANK2___(Trader* trader, string stock, int quantity, double price) {
        cout << "Order placed: " << stock << " x" << quantity << " at $" << price << endl;
        // Match and execute orders
        for (auto t : traders) {
            if (t != trader) {
                t->notifyOrder(stock, quantity, price);
            }
        }
    }
};

class Trader {
private:
    StockExchange* ___BLANK3___;
    string name;
    
public:
    Trader(string n) : name(n), exchange(nullptr) {}
    
    void setExchange(StockExchange* ex) {
        exchange = ex;
    }
    
    void buyStock(string stock, int quantity, double price) {
        exchange->placeOrder(this, stock, quantity, price);
    }
    
    void notifyOrder(string stock, int quantity, double price) {
        cout << name << " notified of order: " << stock << endl;
    }
};`,
    blanks: [
      { id: "BLANK1", answer: "registerTrader" },
      { id: "BLANK2", answer: "placeOrder" },
      { id: "BLANK3", answer: "exchange" }
    ],
    correctCode: `class StockExchange {
private:
    vector<Trader*> traders;
    
public:
    void registerTrader(Trader* trader) {
        traders.push_back(trader);
        trader->setExchange(this);
    }
    
    void placeOrder(Trader* trader, string stock, int quantity, double price) {
        cout << "Order placed: " << stock << " x" << quantity << " at $" << price << endl;
        // Match and execute orders
        for (auto t : traders) {
            if (t != trader) {
                t->notifyOrder(stock, quantity, price);
            }
        }
    }
};

class Trader {
private:
    StockExchange* exchange;
    string name;
    
public:
    Trader(string n) : name(n), exchange(nullptr) {}
    
    void setExchange(StockExchange* ex) {
        exchange = ex;
    }
    
    void buyStock(string stock, int quantity, double price) {
        exchange->placeOrder(this, stock, quantity, price);
    }
    
    void notifyOrder(string stock, int quantity, double price) {
        cout << name << " notified of order: " << stock << endl;
    }
};`
  },
    {
    id: 6,
    title: "Airline Booking Coordination",
    scenario: "You're building a flight booking system where multiple booking agents need to coordinate seat availability through a central FlightMediator. Without the mediator, each agent would query every other agent to verify available seats, causing redundant network calls. With the mediator, the FlightMediator keeps a central record of available seats and informs all agents whenever a booking is made. Your task is to fill in the missing parts of the mediator and agent classes to establish communication.",
    hint: "The FlightMediator class needs a 'notifyAgents' method that broadcasts updates. Agents call 'bookSeat' on the mediator to reserve seats, and the mediator then calls 'update' on other agents.",
    type: "fill",
    code: `class FlightMediator {
private:
    vector<BookingAgent*> agents;
public:
    void registerAgent(BookingAgent* agent) {
        agents.push_back(agent);
    }

    void ___BLANK1___(BookingAgent* sender, string flight) {
        for (auto agent : agents) {
            if (agent != sender) {
                agent->___BLANK2___(flight);
            }
        }
    }
};

class BookingAgent {
private:
    FlightMediator* mediator;
    string name;
public:
    BookingAgent(string n, FlightMediator* m) : name(n), mediator(m) {
        m->registerAgent(this);
    }

    void bookSeat(string flight) {
        cout << name << " booked seat on " << flight << endl;
        mediator->___BLANK3___(this, flight);
    }

    void update(string flight) {
        cout << name << " notified: " << flight << " seat count changed" << endl;
    }
};`,
    blanks: [
      { id: "BLANK1", answer: "notifyAgents" },
      { id: "BLANK2", answer: "update" },
      { id: "BLANK3", answer: "notifyAgents" }
    ],
    correctCode: `class FlightMediator {
private:
    vector<BookingAgent*> agents;
public:
    void registerAgent(BookingAgent* agent) {
        agents.push_back(agent);
    }

    void notifyAgents(BookingAgent* sender, string flight) {
        for (auto agent : agents) {
            if (agent != sender) {
                agent->update(flight);
            }
        }
    }
};

class BookingAgent {
private:
    FlightMediator* mediator;
    string name;
public:
    BookingAgent(string n, FlightMediator* m) : name(n), mediator(m) {
        m->registerAgent(this);
    }

    void bookSeat(string flight) {
        cout << name << " booked seat on " << flight << endl;
        mediator->notifyAgents(this, flight);
    }

    void update(string flight) {
        cout << name << " notified: " << flight << " seat count changed" << endl;
    }
};`
  },
  {
    id: 7,
    title: "Traffic Light System",
    scenario: "At an intersection, traffic lights coordinate through a central mediator so no two lights turn green simultaneously. Without a mediator, each light would need to monitor all others. Implement a TrafficMediator that ensures only one green light at a time.",
    hint: "The mediator manages multiple TrafficLight objects and receives 'changeToGreen' requests from them. It sets all others to red.",
    type: "fill",
    code: `class TrafficMediator {
private:
    vector<TrafficLight*> lights;
public:
    void registerLight(TrafficLight* light) {
        lights.push_back(light);
    }

    void ___BLANK1___(TrafficLight* requester) {
        for (auto light : lights) {
            if (light != requester) {
                light->___BLANK2___();
            }
        }
        requester->___BLANK3___();
    }
};

class TrafficLight {
private:
    TrafficMediator* mediator;
    string location;
public:
    TrafficLight(string loc, TrafficMediator* med) : location(loc), mediator(med) {
        mediator->registerLight(this);
    }

    void requestGreen() {
        mediator->grantGreen(this);
    }

    void turnGreen() {
        cout << location << " light is GREEN" << endl;
    }

    void turnRed() {
        cout << location << " light is RED" << endl;
    }
};`,
    blanks: [
      { id: "BLANK1", answer: "grantGreen" },
      { id: "BLANK2", answer: "turnRed" },
      { id: "BLANK3", answer: "turnGreen" }
    ],
    correctCode: `class TrafficMediator {
private:
    vector<TrafficLight*> lights;
public:
    void registerLight(TrafficLight* light) {
        lights.push_back(light);
    }

    void grantGreen(TrafficLight* requester) {
        for (auto light : lights) {
            if (light != requester) {
                light->turnRed();
            }
        }
        requester->turnGreen();
    }
};

class TrafficLight {
private:
    TrafficMediator* mediator;
    string location;
public:
    TrafficLight(string loc, TrafficMediator* med) : location(loc), mediator(med) {
        mediator->registerLight(this);
    }

    void requestGreen() {
        mediator->grantGreen(this);
    }

    void turnGreen() {
        cout << location << " light is GREEN" << endl;
    }

    void turnRed() {
        cout << location << " light is RED" << endl;
    }
};`
  },
  {
    id: 8,
    title: "Chat Support System",
    scenario: "Customer support agents communicate through a central SupportMediator that routes client messages to available agents. Without it, every agent would need to manage all client connections. Arrange the mediator structure correctly.",
    hint: "Maintain agents in a private list, and in the 'dispatchMessage' method, call 'receiveMessage' on agents except the sender.",
    type: "drag",
    code: "",
    dragItems: [
      { id: "1", text: "class SupportMediator {", correctPosition: 0 },
      { id: "2", text: "private:", correctPosition: 1 },
      { id: "3", text: "    vector<SupportAgent*> agents;", correctPosition: 2 },
      { id: "4", text: "public:", correctPosition: 3 },
      { id: "5", text: "    void registerAgent(SupportAgent* agent) {", correctPosition: 4 },
      { id: "6", text: "        agents.push_back(agent);", correctPosition: 5 },
      { id: "7", text: "    }", correctPosition: 6 },
      { id: "8", text: "    void dispatchMessage(SupportAgent* sender, string msg) {", correctPosition: 7 },
      { id: "9", text: "        for (auto agent : agents) {", correctPosition: 8 },
      { id: "10", text: "            if (agent != sender) agent->receiveMessage(msg);", correctPosition: 9 },
      { id: "11", text: "        }", correctPosition: 10 },
      { id: "12", text: "    }", correctPosition: 11 },
      { id: "13", text: "};", correctPosition: 12 }
    ],
    correctCode: `class SupportMediator {
private:
    vector<SupportAgent*> agents;
public:
    void registerAgent(SupportAgent* agent) {
        agents.push_back(agent);
    }
    void dispatchMessage(SupportAgent* sender, string msg) {
        for (auto agent : agents) {
            if (agent != sender) agent->receiveMessage(msg);
        }
    }
};`
  },
  {
    id: 9,
    title: "Classroom Communication App",
    scenario: "Design a classroom app where students communicate through a Teacher mediator. When a student sends a question, the teacher relays it to all others.",
    hint: "Use 'sendQuestion' in Student and 'relayMessage' in TeacherMediator.",
    type: "fill",
    code: `class TeacherMediator {
private:
    vector<Student*> students;
public:
    void addStudent(Student* s) { students.push_back(s); }

    void ___BLANK1___(Student* sender, string msg) {
        for (auto s : students)
            if (s != sender)
                s->___BLANK2___(msg);
    }
};

class Student {
private:
    TeacherMediator* mediator;
    string name;
public:
    Student(string n, TeacherMediator* m) : name(n), mediator(m) { m->addStudent(this); }

    void sendQuestion(string msg) {
        mediator->___BLANK3___(this, msg);
    }

    void receive(string msg) {
        cout << name << " received: " << msg << endl;
    }
};`,
    blanks: [
      { id: "BLANK1", answer: "relayMessage" },
      { id: "BLANK2", answer: "receive" },
      { id: "BLANK3", answer: "relayMessage" }
    ],
    correctCode: `class TeacherMediator {
private:
    vector<Student*> students;
public:
    void addStudent(Student* s) { students.push_back(s); }

    void relayMessage(Student* sender, string msg) {
        for (auto s : students)
            if (s != sender)
                s->receive(msg);
    }
};

class Student {
private:
    TeacherMediator* mediator;
    string name;
public:
    Student(string n, TeacherMediator* m) : name(n), mediator(m) { m->addStudent(this); }

    void sendQuestion(string msg) {
        mediator->relayMessage(this, msg);
    }

    void receive(string msg) {
        cout << name << " received: " << msg << endl;
    }
};`
  },
  {
    id: 10,
    title: "Game Lobby Communication",
    scenario: "Players in an online lobby communicate via a GameLobbyMediator. When a player sends a chat, the mediator broadcasts it to others. Without the mediator, every player would need direct references to all others.",
    hint: "Focus on 'notifyPlayers' in the mediator and 'receiveChat' in the Player class.",
    type: "fill",
    code: `class GameLobbyMediator {
private:
    vector<Player*> players;
public:
    void registerPlayer(Player* p) { players.push_back(p); }

    void ___BLANK1___(Player* sender, string msg) {
        for (auto p : players) {
            if (p != sender)
                p->___BLANK2___(msg);
        }
    }
};

class Player {
private:
    GameLobbyMediator* mediator;
    string name;
public:
    Player(string n, GameLobbyMediator* m) : name(n), mediator(m) {
        m->registerPlayer(this);
    }

    void sendChat(string msg) {
        mediator->___BLANK3___(this, msg);
    }

    void receiveChat(string msg) {
        cout << name << " sees message: " << msg << endl;
    }
};`,
    blanks: [
      { id: "BLANK1", answer: "notifyPlayers" },
      { id: "BLANK2", answer: "receiveChat" },
      { id: "BLANK3", answer: "notifyPlayers" }
    ],
    correctCode: `class GameLobbyMediator {
private:
    vector<Player*> players;
public:
    void registerPlayer(Player* p) { players.push_back(p); }

    void notifyPlayers(Player* sender, string msg) {
        for (auto p : players) {
            if (p != sender)
                p->receiveChat(msg);
        }
    }
};

class Player {
private:
    GameLobbyMediator* mediator;
    string name;
public:
    Player(string n, GameLobbyMediator* m) : name(n), mediator(m) {
        m->registerPlayer(this);
    }

    void sendChat(string msg) {
        mediator->notifyPlayers(this, msg);
    }

    void receiveChat(string msg) {
        cout << name << " sees message: " << msg << endl;
    }
};`
  },

];

