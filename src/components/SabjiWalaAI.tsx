
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Info, ChevronDown, ChevronUp, HelpCircle, Leaf, Cooking2, Truck, ThumbsUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { vegetables } from "@/data/vegetables";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'vegetable-card';
  vegetableData?: any;
};

type ChatOption = {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  suggestedQuestions: string[];
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
  "Always wash vegetables thoroughly before cooking or eating.",
  "Steaming vegetables preserves more nutrients than boiling them.",
  "Roasting brings out natural sweetness in vegetables.",
  "Add salt to vegetables at the end of cooking for leafy greens.",
  "Store vegetables properly to maintain freshness and extend shelf life.",
  "Use vegetable scraps to make homemade stock for soups and sauces."
];

const chatOptions: ChatOption[] = [
  {
    id: 'vegetables',
    icon: <Leaf className="h-5 w-5 text-emerald-600" />,
    label: 'Vegetable Info',
    description: 'Learn about nutritional benefits and origins',
    suggestedQuestions: [
      'Tell me about spinach',
      'What are the benefits of kale?',
      'How to store tomatoes?'
    ]
  },
  {
    id: 'cooking',
    icon: <Cooking2 className="h-5 w-5 text-amber-600" />,
    label: 'Cooking Tips',
    description: 'Get recipe ideas and cooking advice',
    suggestedQuestions: [
      'How to cook broccoli?',
      'Easy vegetable curry recipe',
      'Best way to prepare leafy greens'
    ]
  },
  {
    id: 'delivery',
    icon: <Truck className="h-5 w-5 text-blue-600" />,
    label: 'Delivery Help',
    description: 'Questions about delivery and orders',
    suggestedQuestions: [
      'Do you deliver to my area?',
      'What are delivery hours?',
      'How to track my order?'
    ]
  },
  {
    id: 'feedback',
    icon: <ThumbsUp className="h-5 w-5 text-purple-600" />,
    label: 'Feedback',
    description: 'Share your thoughts with us',
    suggestedQuestions: [
      'How can I rate my order?',
      'Where to report quality issues?',
      'Suggest improvements'
    ]
  }
];

const SabjiWalaAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Namaste! I'm Mishra, your friendly vegetable expert at SabjiWala. How can I help you today? Ask me anything about vegetables, recipes, or our services!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeOption, setActiveOption] = useState<string>('vegetables');
  const { toast } = useToast();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    if (!isMinimized) scrollToBottom();
  }, [messages, isMinimized]);

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
    
    // Process the message
    setTimeout(() => {
      processUserMessage(message.trim());
      setIsTyping(false);
    }, 1000);
  };

  const processUserMessage = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Check if message contains vegetable names
    const matchingVegetable = vegetables.find(veg => 
      lowerCaseMessage.includes(veg.name.toLowerCase())
    );
    
    let response: string;
    let messageType: 'text' | 'suggestion' | 'vegetable-card' = 'text';
    let vegetableData = null;
    
    if (matchingVegetable) {
      response = `${matchingVegetable.name}:\n\n${matchingVegetable.description}\n\nNutritional Info: ${matchingVegetable.nutritionalInfo}\n\nOrigin: ${matchingVegetable.origin}`;
      messageType = 'vegetable-card';
      vegetableData = matchingVegetable;
    } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('namaste')) {
      response = "Namaste! I'm Mishra, your SabjiWala assistant. How can I help you today? Feel free to ask about any vegetables, cooking tips, or our services!";
    } else if (lowerCaseMessage.includes('recipe') || lowerCaseMessage.includes('cook')) {
      response = "I'd be happy to help with recipes! Here are some cooking tips:\n\n";
      response += cookingTips.slice(0, 3).join('\n\n');
      response += "\n\nWould you like a specific recipe for any vegetable?";
    } else if (lowerCaseMessage.includes('benefit') || lowerCaseMessage.includes('health')) {
      response = "Vegetables offer numerous health benefits:\n\n• Rich in essential vitamins and minerals\n• High in dietary fiber which aids digestion\n• Contains antioxidants that fight free radicals\n• Help maintain healthy weight\n• Reduce risk of chronic diseases\n• Improve gut health and immunity";
    } else if (lowerCaseMessage.includes('store') || lowerCaseMessage.includes('keep') || lowerCaseMessage.includes('fresh')) {
      response = "Tips for storing vegetables:\n\n• Keep leafy greens wrapped in paper towels in airtight containers\n• Store root vegetables in cool, dark places\n• Don't wash vegetables until you're ready to use them\n• Keep potatoes and onions separate\n• Store tomatoes at room temperature\n• Most vegetables stay fresher in the crisper drawer";
    } else if (lowerCaseMessage.includes('deliver') || lowerCaseMessage.includes('shipping') || lowerCaseMessage.includes('order')) {
      response = "About our delivery service:\n\n• We deliver to most areas in Delhi NCR\n• Standard delivery hours are 9 AM - 9 PM\n• Minimum order value is ₹250\n• Free delivery on orders above ₹500\n• Same-day delivery available for orders placed before 1 PM\n\nYou can track your order through the 'My Orders' section after logging in.";
    } else if (lowerCaseMessage.includes('help') || lowerCaseMessage.includes('support')) {
      response = "I'm here to help! You can:\n\n• Ask about any vegetable's benefits or storage tips\n• Get cooking ideas and recipes\n• Learn about our delivery services\n• Get help with your order\n\nJust let me know what you need assistance with!";
    } else if (lowerCaseMessage.includes('thank')) {
      response = "You're very welcome! It's my pleasure to help. Is there anything else you'd like to know about vegetables or our services?";
    } else {
      // Random vegetable fact
      response = "I'm not sure I understood that completely. Here's an interesting fact though:\n\n";
      response += vegetableFacts[Math.floor(Math.random() * vegetableFacts.length)];
      response += "\n\nFeel free to ask me about specific vegetables, cooking tips, or our delivery services!";
    }
    
    const aiMessage: Message = {
      id: messages.length + 2,
      text: response,
      sender: 'ai',
      timestamp: new Date(),
      type: messageType,
      vegetableData: vegetableData
    };
    
    setMessages(prev => [...prev, aiMessage]);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Namaste! I'm Mishra, your friendly vegetable expert at SabjiWala. How can I help you today? Ask me anything about vegetables, recipes, or our services!",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
    toast({
      title: "Chat cleared",
      description: "All previous messages have been cleared",
    });
  };

  const handleSendSuggestion = (suggestion: string) => {
    setMessage(suggestion);
    // Automatically send after a brief delay
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSend(fakeEvent);
    }, 100);
  };

  const handleOptionChange = (optionId: string) => {
    setActiveOption(optionId);
    // Add a helper message when changing tabs
    const option = chatOptions.find(opt => opt.id === optionId);
    if (option) {
      const helperMessage: Message = {
        id: messages.length + 1,
        text: `You've selected ${option.label}. ${option.description}. Here are some suggestions to get started:`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'suggestion'
      };
      setMessages(prev => [...prev, helperMessage]);
    }
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
              height: isMinimized ? 60 : 520
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Chat Header */}
            <div 
              className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white p-3 flex justify-between items-center cursor-pointer"
              onClick={toggleMinimize}
            >
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/logo-circle.png" alt="Mishra" />
                  <AvatarFallback className="bg-emerald-800 text-white">M</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium flex items-center">
                    Mishra <Badge variant="outline" className="ml-2 text-xs bg-white/20 text-white border-none">AI</Badge>
                  </h3>
                  <p className="text-xs text-emerald-100">Your SabjiWala assistant</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-emerald-800/20" onClick={toggleMinimize}>
                {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Button>
            </div>

            {/* Chat Messages */}
            {!isMinimized && (
              <>
                <div className="p-0.5 bg-emerald-600">
                  <Tabs value={activeOption} onValueChange={handleOptionChange} className="w-full">
                    <TabsList className="grid grid-cols-4 h-auto bg-emerald-600 p-0">
                      {chatOptions.map((option) => (
                        <TabsTrigger
                          key={option.id}
                          value={option.id}
                          className="py-2 px-1 data-[state=active]:bg-emerald-700 data-[state=active]:text-white text-emerald-50 text-xs"
                        >
                          <div className="flex flex-col items-center">
                            {option.icon}
                            <span className="mt-1">{option.label}</span>
                          </div>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>

                <div className="h-[340px] overflow-y-auto p-4 bg-gray-50">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`mb-3 ${
                        msg.sender === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {msg.sender === 'ai' && msg.type === 'suggestion' ? (
                        <div className="inline-block p-3 rounded-lg max-w-[90%] bg-emerald-50 border border-emerald-100 text-gray-800">
                          <p className="whitespace-pre-line text-sm">{msg.text}</p>
                          <div className="mt-3 space-y-2">
                            {chatOptions.find(opt => opt.id === activeOption)?.suggestedQuestions.map((q, i) => (
                              <Button 
                                key={i} 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleSendSuggestion(q)}
                                className="text-xs mr-1 border-emerald-200 hover:bg-emerald-100 text-emerald-800"
                              >
                                {q}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ) : msg.sender === 'ai' && msg.type === 'vegetable-card' ? (
                        <div className="inline-block p-3 rounded-lg max-w-[90%] bg-white border border-gray-200 text-gray-800 shadow-sm">
                          <div className="flex items-start">
                            {msg.vegetableData?.images?.[0] && (
                              <img 
                                src={msg.vegetableData.images[0].url} 
                                alt={msg.vegetableData.name} 
                                className="w-16 h-16 object-cover rounded-md mr-3"
                              />
                            )}
                            <div>
                              <h4 className="font-medium text-emerald-700">{msg.vegetableData?.name}</h4>
                              <p className="text-xs text-gray-600 mb-2">₹{msg.vegetableData?.price}/kg</p>
                              <p className="text-xs">{msg.vegetableData?.nutritionalInfo}</p>
                            </div>
                          </div>
                          <Separator className="my-2" />
                          <p className="text-xs whitespace-pre-line">{msg.vegetableData?.description}</p>
                        </div>
                      ) : (
                        <div
                          className={`inline-block p-3 rounded-lg max-w-[90%] ${
                            msg.sender === 'user'
                              ? 'bg-emerald-600 text-white rounded-br-none'
                              : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                          }`}
                        >
                          <p className="whitespace-pre-line text-sm">{msg.text}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-center mb-3">
                      <div className="bg-white border border-gray-200 rounded-full px-4 py-2 flex items-center">
                        <span className="inline-block mr-2">Mishra</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="p-2 bg-gray-50 border-t border-gray-200 flex gap-2 overflow-x-auto">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleSendSuggestion("Show me popular vegetables")}
                    className="whitespace-nowrap text-xs h-7 border-emerald-200"
                  >
                    <Leaf size={12} className="mr-1" /> Popular items
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleSendSuggestion("Need help with storing vegetables")}
                    className="whitespace-nowrap text-xs h-7 border-emerald-200"
                  >
                    <HelpCircle size={12} className="mr-1" /> Storage tips
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleSendSuggestion("Delivery information")}
                    className="whitespace-nowrap text-xs h-7 border-emerald-200"
                  >
                    <Truck size={12} className="mr-1" /> Delivery
                  </Button>
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200">
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask Mishra anything..."
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

