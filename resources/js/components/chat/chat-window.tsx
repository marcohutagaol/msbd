'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, Info, ArrowLeft } from 'lucide-react';
import MessageBubble from './message-bubble';

interface ChatWindowProps {
  selectedChat: string;
}

interface Message {
  id: string;
  sender: 'me' | 'other';
  content: string;
  time: string;
}

export default function ChatWindow({ selectedChat }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'other', content: 'Hey! How are you?', time: '2:25 PM' },
    { id: '2', sender: 'me', content: "Hi! I'm doing great, thanks for asking!", time: '2:26 PM' },
    { id: '3', sender: 'other', content: "That's awesome! Want to grab coffee later?", time: '2:27 PM' },
    { id: '4', sender: 'me', content: 'How about 4 PM at the usual place?', time: '2:28 PM' },
    { id: '5', sender: 'other', content: 'Perfect! See you then 😊', time: '2:29 PM' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'me',
        content: inputValue,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const chatNames: Record<string, string> = {
    '1': 'Sarah Anderson',
    '2': 'Project Team',
    '3': 'Alex Johnson',
    '4': 'Design Squad',
    '5': 'Emma Wilson',
  };

  return (
    <div className="flex flex-col h-full w-full">

      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-blue-300 bg-blue-100">
        <div className="flex items-center gap-3">
          <button className="p-2 lg:hidden bg-blue-200 hover:bg-blue-300 rounded-full transition-all">
            <ArrowLeft className="w-5 h-5 text-blue-900" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-blue-900">{chatNames[selectedChat] || 'Chat'}</h2>
            <p className="text-xs text-green-700 font-medium">Active now</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2.5 bg-blue-200 hover:bg-blue-300 rounded-full transition-all">
            <Phone className="w-5 h-5 text-blue-700" />
          </button>
          <button className="p-2.5 bg-blue-200 hover:bg-blue-300 rounded-full transition-all">
            <Video className="w-5 h-5 text-blue-700" />
          </button>
          <button className="p-2.5 bg-blue-200 hover:bg-blue-300 rounded-full transition-all">
            <Info className="w-5 h-5 text-blue-700" />
          </button>
        </div>
      </div>

      {/* MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            sender={message.sender}
            content={message.content}
            time={message.time}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      <div className="px-6 py-4 border-t border-blue-300 bg-blue-100">
        <div className="flex items-end gap-3">
          
          {/* Input Wrapper */}
          <div className="flex-1 flex items-center gap-2 bg-blue-50 rounded-2xl px-4 py-3 border border-blue-300 focus-within:ring-2 focus-within:ring-blue-500 transition-all shadow-sm">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-blue-50 text-blue-900 placeholder-blue-400 focus:outline-none"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            className="p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all shadow-md hover:shadow-lg scale-in hover:scale-105"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
}
