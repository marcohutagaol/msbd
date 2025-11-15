'use client';

import { useState } from 'react';
import {
  Search,
  UserPlus,
  UsersRound,
  MessagesSquare,
  MessageSquareText,
  UserRound,
  Activity,
} from 'lucide-react';

import ChatListItem from './chat-list-item';
import ContactsSection from './contacts-section';
import StatusSection from './status-section';
import AddContactModal from './modals/add-contact-modal';
import AddGroupModal from './modals/add-group-modal';

interface SidebarProps {
  selectedChat: string;
  onSelectChat: (chatId: string) => void;
  activeTab: 'chats' | 'contacts' | 'status';
  onTabChange: (tab: 'chats' | 'contacts' | 'status') => void;
}

export default function Sidebar({
  selectedChat,
  onSelectChat,
  activeTab,
  onTabChange,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);

  const chats = [
    { id: '1', name: 'Sarah Anderson', avatar: '/woman-avatar.png', lastMessage: 'Hey! How are you?', time: '2:30 PM', unread: 2, type: 'direct' },
    { id: '2', name: 'Project Team', avatar: '/group-avatar.jpg', lastMessage: 'Meeting at 3 PM', time: '1:15 PM', unread: 0, type: 'group' },
    { id: '3', name: 'Alex Johnson', avatar: '/man-avatar.png', lastMessage: 'Thanks for the update', time: 'Yesterday', unread: 0, type: 'direct' },
    { id: '4', name: 'Design Squad', avatar: '/design-group.jpg', lastMessage: 'New mockups uploaded', time: 'Yesterday', unread: 3, type: 'group' },
    { id: '5', name: 'Emma Wilson', avatar: '/woman-avatar-2.png', lastMessage: 'Sounds good!', time: '5 days ago', unread: 0, type: 'direct' },
  ];

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // reusable tab styles
  const tabBase =
    'flex-1 py-2 px-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors';
  const tabActive =
    'bg-primary text-primary-foreground shadow-md';
  const tabInactive =
    'bg-muted text-foreground border border-primary hover:bg-primary/20';

  return (
    <div className="flex flex-col h-full bg-sidebar">
      {/* Header */}
      <div className="pt-5 pb-4 px-4 border-b border-primary/30 bg-sidebar">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-md">
            <MessageSquareText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Messages</h1>
            <p className="text-xs text-primary font-medium">Stay connected</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-input border border-primary text-foreground placeholder-primary/60 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition-colors"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => onTabChange('chats')}
            className={`${tabBase} ${activeTab === 'chats' ? tabActive : tabInactive}`}
          >
            <MessagesSquare className="w-4 h-4" />
            Chats
          </button>

          <button
            onClick={() => onTabChange('contacts')}
            className={`${tabBase} ${activeTab === 'contacts' ? tabActive : tabInactive}`}
          >
            <UserRound className="w-4 h-4" />
            Contacts
          </button>

          <button
            onClick={() => onTabChange('status')}
            className={`${tabBase} ${activeTab === 'status' ? tabActive : tabInactive}`}
          >
            <Activity className="w-4 h-4" />
            Status
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'chats' && (
          <div className="flex flex-col">
            {/* Quick Actions */}
            <div className="flex gap-2 border-b border-primary/30 bg-sidebar px-3 py-3">
              <button
                onClick={() => setShowAddContact(true)}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                Contact
              </button>

              <button
                onClick={() => setShowAddGroup(true)}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
              >
                <UsersRound className="w-4 h-4" />
                Group
              </button>
            </div>

            {/* Chat List */}
            <div className="flex flex-col">
              {filteredChats.map((chat) => (
                <ChatListItem
                  key={chat.id}
                  {...chat}
                  isSelected={selectedChat === chat.id}
                  onClick={() => onSelectChat(chat.id)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <ContactsSection onAddContact={() => setShowAddContact(true)} />
        )}

        {activeTab === 'status' && <StatusSection />}
      </div>

      {/* Modals */}
      {showAddContact && (
        <AddContactModal onClose={() => setShowAddContact(false)} />
      )}
      {showAddGroup && (
        <AddGroupModal onClose={() => setShowAddGroup(false)} />
      )}
    </div>
  );
}
