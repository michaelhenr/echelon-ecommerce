import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm the Echelon Society AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Simple AI responses based on keywords
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Welcome to Echelon Society. How can I assist you today?";
    }
    
    if (message.includes('product') || message.includes('item')) {
      return "We have a wide range of premium products including our signature V Crew Sweatshirt (700 EGP) and Echelon Quarter Hoodie (800 EGP). You can browse all products in our Products section.";
    }
    
    if (message.includes('price') || message.includes('cost')) {
      return "Our products are priced competitively. The V Crew Sweatshirt is 700 EGP and the Echelon Quarter Hoodie is 800 EGP. We also offer free shipping on orders over 500 EGP.";
    }
    
    if (message.includes('shipping') || message.includes('delivery')) {
      return "We offer shipping across Egypt. Shipping costs are 70 EGP for Cairo and Alexandria, and 100 EGP for other cities. Free shipping is available on orders over 500 EGP.";
    }
    
    if (message.includes('brand') || message.includes('echelon')) {
      return "Echelon Society was established in 2017. We started as a sportswear company and have evolved into a premium fashion brand. We donate 50% of our profits to help the less fortunate in our community.";
    }
    
    if (message.includes('order') || message.includes('purchase') || message.includes('buy')) {
      return "To place an order, simply browse our products, add them to your cart, and proceed to checkout. We accept various payment methods and will process your order within 1-2 business days.";
    }
    
    if (message.includes('return') || message.includes('refund')) {
      return "We offer a 30-day return policy for unused items in original packaging. Please contact our customer service for return instructions.";
    }
    
    if (message.includes('contact') || message.includes('help')) {
      return "You can reach us through our contact form or email. Our customer service team is available Monday to Friday, 9 AM to 6 PM.";
    }
    
    if (message.includes('size') || message.includes('fit')) {
      return "We provide detailed size charts for all our products. Please check the product page for specific measurements. If you need help with sizing, feel free to ask!";
    }
    
    if (message.includes('discount') || message.includes('sale') || message.includes('promo')) {
      return "We occasionally run promotions and sales. Sign up for our newsletter to be the first to know about special offers and discounts.";
    }
    
    if (message.includes('quality') || message.includes('material')) {
      return "All our products are made with high-quality materials and attention to detail. We believe in 'A Higher Standard' and ensure every item meets our quality expectations.";
    }
    
    if (message.includes('about') || message.includes('company')) {
      return "Echelon Society is a premium fashion brand established in 2017. We're committed to quality, social responsibility, and helping our community. 50% of our profits go to charitable causes.";
    }
    
    // Default response
    return "I understand you're asking about that. For more specific information, please visit our About page or contact our customer service team. Is there anything else I can help you with?";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          className="chatbot-button"
          onClick={() => setIsOpen(true)}
          title="Chat with AI Assistant"
        >
          <FaRobot />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <FaRobot />
              <span>Echelon AI Assistant</span>
            </div>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender}`}
              >
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="chatbot-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="chatbot-input-field"
            />
            <button
              type="submit"
              className="chatbot-send"
              disabled={!inputMessage.trim()}
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
