'use client';

import { MessageCircle, Users, Clock, Menu } from 'lucide-react';
import { useState } from 'react';
import MobileDrawer from './mobile-drawer';

interface MobileNavProps {
  activeTab: 'chats' | 'contacts' | 'status';
  onTabChange: (tab: 'chats' | 'contacts' | 'status') => void;
  selectedChat: string;
  onSelectChat: (chatId: string) => void;
}

export default function MobileNav({
  activeTab,
  onTabChange,
  selectedChat,
  onSelectChat,
}: MobileNavProps) {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={() => setShowDrawer(true)}
          className="p-2 hover:bg-muted rounded-lg transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>

        <h1 className="text-lg font-bold">Messages</h1>

        <div className="w-10"></div>
      </div>

      <div className="flex gap-2 px-4 pb-3">
        <button
          onClick={() => onTabChange('chats')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'chats'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-foreground'
          }`}
        >
          <MessageCircle className="w-4 h-4 mx-auto" />
        </button>
        <button
          onClick={() => onTabChange('contacts')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'contacts'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-foreground'
          }`}
        >
          <Users className="w-4 h-4 mx-auto" />
        </button>
        <button
          onClick={() => onTabChange('status')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'status'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-foreground'
          }`}
        >
          <Clock className="w-4 h-4 mx-auto" />
        </button>
      </div>

      <MobileDrawer
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
        selectedChat={selectedChat}
        onSelectChat={onSelectChat}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </>
  );
}
