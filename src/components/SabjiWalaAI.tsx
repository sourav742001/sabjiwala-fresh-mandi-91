
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
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
  const { toast } = useToast();

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
            isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
        >
          {isOpen ? <X size={24} /> : <Bot size={24} />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl z-40 overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: 20, height: 480 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              height: isMinimized ? 60 : 480
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Chat Header */}
            <div 
              className="bg-emerald-600 text-white p-3 flex justify-between items-center cursor-pointer"
              onClick={toggleMinimize}
            >
              <div className="flex items-center">
                <Bot size={20} className="mr-2" />
                <div>
                  <h3 className="font-medium">SabjiWala AI</h3>
                  <p className="text-xs text-emerald-100">Your vegetable expert</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={toggleMinimize}>
                {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Button>
            </div>

            {/* Chat Messages */}
            {!isMinimized && (
              <>
                <div className="h-[340px] overflow-y-auto p-4 bg-gray-50">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`mb-3 ${
                        msg.sender === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <div
                        className={`inline-block p-3 rounded-lg max-w-[85%] ${
                          msg.sender === 'user'
                            ? 'bg-emerald-500 text-white rounded-br-none'
                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                        }`}
                      >
                        <p className="whitespace-pre-line text-sm">{msg.text}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-center mb-3">
                      <div className="bg-gray-200 rounded-full p-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">SabjiWala is typing...</span>
                    </div>
                  )}
                </div>

                {/* Suggestions */}
                <div className="p-2 bg-gray-50 border-t border-gray-200 flex gap-2 overflow-x-auto">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setMessage("What are the benefits of spinach?")}
                    className="whitespace-nowrap text-xs h-7"
                  >
                    About spinach
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setMessage("How to store tomatoes?")}
                    className="whitespace-nowrap text-xs h-7"
                  >
                    Store tomatoes
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setMessage("Cooking tips for vegetables")}
                    className="whitespace-nowrap text-xs h-7"
                  >
                    Cooking tips
                  </Button>
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200">
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask about any vegetable..."
                      className="flex-grow"
                    />
                    <Button 
                      type="submit" 
                      className="bg-emerald-600 hover:bg-emerald-700"
                      disabled={!message.trim() || isTyping}
                    >
                      <Send size={18} />
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-6 text-xs text-gray-500"
                      onClick={handleClearChat}
                    >
                      Clear chat
                    </Button>
                    <div className="flex items-center">
                      <Info size={12} className="text-gray-400 mr-1" />
                      <span className="text-xs text-gray-400">Powered by SabjiWala AI</span>
                    </div>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SabjiWalaAI;
