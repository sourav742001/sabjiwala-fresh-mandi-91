
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Info, ChevronDown, ChevronUp, Image, Trash2, Copy, Search, Leaf, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { vegetables } from "@/data/vegetables";

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const vegetableFacts = [
  "Tomatoes are technically fruits, but are commonly used as vegetables.",
  "Spinach contains high levels of iron and vitamin K.",
  "Carrots are rich in beta-carotene which is good for your eyes.",
  "Bell peppers have more vitamin C than oranges.",
  "Onions can help reduce inflammation and have antibacterial properties.",
  "Cauliflower is packed with vitamins, minerals, and fiber.",
  "Cucumbers are 96% water and help keep you hydrated.",
  "Potatoes are a good source of potassium, vitamin C, and vitamin B6.",
];

const cookingTips = [
  "Always add salt to vegetables at the end of cooking for maximum flavor.",
  "Roasting vegetables at high heat caramelizes their natural sugars.",
  "Steaming vegetables preserves more nutrients than boiling.",
  "Add acid (lemon juice or vinegar) to brighten the flavor of cooked vegetables.",
  "Refresh wilted greens by soaking them in ice water for 5-10 minutes.",
  "Cook dense vegetables first and add tender ones later for even cooking.",
];

const storageTips = [
  "Store tomatoes at room temperature, not in the refrigerator.",
  "Keep potatoes in a cool, dark place away from onions to prevent sprouting.",
  "Store leafy greens with a paper towel to absorb excess moisture.",
  "Keep herbs fresh by placing stems in water like flowers.",
  "Separate ethylene-producing fruits (like bananas) from ethylene-sensitive produce.",
  "Don't wash vegetables until you're ready to use them.",
];

const predefinedQuestions = [
  { id: 1, text: "What are the benefits of spinach?", category: "health" },
  { id: 2, text: "How to store tomatoes?", category: "storage" },
  { id: 3, text: "Best cooking tips for vegetables", category: "cooking" },
  { id: 4, text: "Tell me about seasonal vegetables", category: "general" },
  { id: 5, text: "Nutritional benefits of carrots", category: "health" },
  { id: 6, text: "How to keep herbs fresh?", category: "storage" },
];

const SabjiWalaAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm SabjiWala AI, your vegetable expert. Ask me anything about vegetables, their benefits, cooking tips, or storage advice!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: message.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    // Simulate AI thinking
    setIsTyping(true);
    
    // Find vegetable in data
    setTimeout(() => {
      const lowerCaseMessage = message.toLowerCase();
      
      // Check if message contains vegetable names
      const matchingVegetable = vegetables.find(veg => 
        lowerCaseMessage.includes(veg.name.toLowerCase())
      );
      
      let response: string;
      
      if (matchingVegetable) {
        response = `${matchingVegetable.name}:\n\n${matchingVegetable.description}\n\nNutritional Info: ${matchingVegetable.nutritionalInfo}\n\nOrigin: ${matchingVegetable.origin}`;
      } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
        response = "Hello! How can I help you with vegetables today?";
      } else if (lowerCaseMessage.includes('benefit') || lowerCaseMessage.includes('health')) {
        response = "Vegetables offer numerous health benefits:\n\n• Rich in essential vitamins and minerals\n• High in dietary fiber which aids digestion\n• Contains antioxidants that fight free radicals\n• Help maintain healthy weight\n• Reduce risk of chronic diseases\n• Improve gut health and immunity";
      } else if (lowerCaseMessage.includes('store') || lowerCaseMessage.includes('keep') || lowerCaseMessage.includes('fresh')) {
        response = "Tips for storing vegetables:\n\n• Keep leafy greens wrapped in paper towels in airtight containers\n• Store root vegetables in cool, dark places\n• Don't wash vegetables until you're ready to use them\n• Keep potatoes and onions separate\n• Store tomatoes at room temperature\n• Most vegetables stay fresher in the crisper drawer";
      } else if (lowerCaseMessage.includes('cook') || lowerCaseMessage.includes('recipe')) {
        response = "Some quick cooking tips:\n\n• Roasting brings out natural sweetness in vegetables\n• Steaming preserves most nutrients\n• Don't overcrowd the pan when sautéing\n• Cut vegetables in uniform sizes for even cooking\n• Add salt to vegetables at the end of cooking for leafy greens\n• Use vegetable scraps to make homemade stock";
      } else {
        // Random vegetable fact
        response = vegetableFacts[Math.floor(Math.random() * vegetableFacts.length)];
        response += "\n\nFeel free to ask about specific vegetables, cooking tips, or storage advice!";
      }
      
      const aiMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm SabjiWala AI, your vegetable expert. Ask me anything about vegetables, their benefits, cooking tips, or storage advice!",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
    toast({
      title: "Chat cleared",
      description: "All previous messages have been cleared",
    });
  };

  const handleCopyToClipboard = () => {
    const chatText = messages
      .map((msg) => `${msg.sender === 'user' ? 'You' : 'SabjiWala AI'}: ${msg.text}`)
      .join('\n\n');
    
    navigator.clipboard.writeText(chatText);
    
    toast({
      title: "Chat copied to clipboard",
      description: "You can now paste it anywhere",
    });
  };

  const handlePredefinedQuestion = (question: string) => {
    setMessage(question);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={toggleChat}
          className={`rounded-full w-14 h-14 shadow-lg flex items-center justify-center ${
            isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-700 hover:bg-emerald-800'
          }`}
        >
          {isOpen ? <X size={24} /> : <Bot size={24} />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 md:w-96 rounded-xl shadow-2xl z-40 overflow-hidden border border-emerald-100"
            initial={{ opacity: 0, y: 20, height: 480 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              height: isMinimized ? 60 : 480
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{
              background: "linear-gradient(to bottom, #ffffff, #f0fdf9)",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
          >
            {/* Chat Header */}
            <div 
              className="bg-emerald-700 text-white p-3 flex justify-between items-center cursor-pointer"
              onClick={toggleMinimize}
            >
              <div className="flex items-center">
                <div className="bg-white p-1.5 rounded-full mr-2">
                  <Bot size={20} className="text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-medium">SabjiWala AI</h3>
                  <p className="text-xs text-emerald-100">Your vegetable expert</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={toggleMinimize}>
                {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Button>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-2 py-1 bg-emerald-50">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="chat" className="text-xs">Chat</TabsTrigger>
                    <TabsTrigger value="tips" className="text-xs">Tips</TabsTrigger>
                    <TabsTrigger value="help" className="text-xs">Help</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="chat" className="flex flex-col h-[380px] pt-0 m-0">
                  {/* Messages */}
                  <div className="h-[320px] overflow-y-auto p-4 bg-transparent">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`mb-3 ${
                          msg.sender === 'user' ? 'text-right' : 'text-left'
                        }`}
                      >
                        <div
                          className={`inline-block p-3 rounded-xl max-w-[85%] ${
                            msg.sender === 'user'
                              ? 'bg-emerald-600 text-white rounded-tr-none shadow-sm'
                              : 'bg-white text-gray-800 border border-emerald-100 rounded-tl-none shadow-sm'
                          }`}
                        >
                          <p className="whitespace-pre-line text-sm">{msg.text}</p>
                          <p className="text-xs mt-1 opacity-70 text-right">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex items-center mb-3">
                        <div className="bg-emerald-100 rounded-full p-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                        <span className="ml-2 text-xs text-gray-500">SabjiWala is thinking...</span>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-3 border-t border-emerald-100">
                    <form onSubmit={handleSend} className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Input
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Ask about any vegetable..."
                          className="flex-grow border-emerald-200 focus-visible:ring-emerald-500"
                        />
                        <Button 
                          type="submit" 
                          className="bg-emerald-700 hover:bg-emerald-800"
                          disabled={!message.trim() || isTyping}
                        >
                          <Send size={18} />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center mt-1">
                        <div className="flex gap-1">
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm"
                            className="h-8 text-xs text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 p-2"
                            onClick={handleClearChat}
                          >
                            <Trash2 size={14} className="mr-1" /> Clear
                          </Button>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm"
                            className="h-8 text-xs text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 p-2"
                            onClick={handleCopyToClipboard}
                          >
                            <Copy size={14} className="mr-1" /> Copy
                          </Button>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-emerald-600 font-medium">SabjiWala AI</span>
                        </div>
                      </div>
                    </form>
                  </div>
                </TabsContent>

                <TabsContent value="tips" className="h-[380px] overflow-y-auto p-4 m-0">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="p-1.5 bg-emerald-100 rounded-full">
                          <Leaf size={16} className="text-emerald-700" />
                        </span>
                        <h3 className="font-medium text-emerald-800">Storage Tips</h3>
                      </div>
                      <ul className="space-y-2">
                        {storageTips.map((tip, index) => (
                          <li key={index} className="bg-white p-3 rounded-lg border border-emerald-100 text-sm">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="p-1.5 bg-emerald-100 rounded-full">
                          <Clock size={16} className="text-emerald-700" />
                        </span>
                        <h3 className="font-medium text-emerald-800">Cooking Tips</h3>
                      </div>
                      <ul className="space-y-2">
                        {cookingTips.map((tip, index) => (
                          <li key={index} className="bg-white p-3 rounded-lg border border-emerald-100 text-sm">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="help" className="h-[380px] overflow-y-auto p-4 m-0">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-emerald-800 mb-2">Popular Questions</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {predefinedQuestions.map((q) => (
                        <Button
                          key={q.id}
                          variant="outline"
                          className="justify-start h-auto py-2 px-3 text-left border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                          onClick={() => handlePredefinedQuestion(q.text)}
                        >
                          <Search size={14} className="mr-2 text-emerald-600" />
                          <span className="text-sm truncate">{q.text}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-emerald-800 mb-2">What can I help with?</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2 items-start">
                        <span className="bg-emerald-100 text-emerald-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">1</span>
                        <span>Ask about any vegetable or fruit properties</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="bg-emerald-100 text-emerald-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">2</span>
                        <span>Get storage tips for keeping produce fresh</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="bg-emerald-100 text-emerald-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">3</span>
                        <span>Learn cooking suggestions and preparation methods</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="bg-emerald-100 text-emerald-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">4</span>
                        <span>Discover nutritional benefits of different produce</span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SabjiWalaAI;
