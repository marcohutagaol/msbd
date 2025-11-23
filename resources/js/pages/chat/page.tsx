'use client';

import { useState } from 'react';
import Sidebar from '@/components/chat/sidebar';
import ChatWindow from '@/components/chat/chat-window';
import MobileNav from '@/components/chat/mobile-nav';

export default function Home() {
  const [selectedChat, setSelectedChat] = useState<string>('1');
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts' | 'status'>('chats');

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block md:w-96 border-r border-border">
        <Sidebar
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        <ChatWindow selectedChat={selectedChat} />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <MobileNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
        />
      </div>
    </div>
  );
}
