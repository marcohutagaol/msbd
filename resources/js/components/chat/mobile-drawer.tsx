'use client';

import { X } from 'lucide-react';
import ChatListItem from './chat-list-item';
import { useEffect } from 'react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedChat: string;
  onSelectChat: (chatId: string) => void;
  activeTab: 'chats' | 'contacts' | 'status';
  onTabChange: (tab: 'chats' | 'contacts' | 'status') => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  selectedChat,
  onSelectChat,
}: MobileDrawerProps) {
  const chats = [
    { id: '1', name: 'Sarah Anderson', avatar: '/woman-avatar.png', lastMessage: 'Hey! How are you?', time: '2:30 PM', unread: 2, type: 'direct' as const },
    { id: '2', name: 'Project Team', avatar: '/group-avatar.jpg', lastMessage: 'Meeting at 3 PM', time: '1:15 PM', unread: 0, type: 'group' as const },
    { id: '3', name: 'Alex Johnson', avatar: '/man-avatar.png', lastMessage: 'Thanks for the update', time: 'Yesterday', unread: 0, type: 'direct' as const },
    { id: '4', name: 'Design Squad', avatar: '/design-group.jpg', lastMessage: 'New mockups uploaded', time: 'Yesterday', unread: 3, type: 'group' as const },
    { id: '5', name: 'Emma Wilson', avatar: '/woman-avatar-2.png', lastMessage: 'Sounds good!', time: '5 days ago', unread: 0, type: 'direct' as const },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed left-0 top-0 bottom-0 w-80 bg-card z-50 md:hidden slide-in-from-bottom flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold">Conversations</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              {...chat}
              isSelected={selectedChat === chat.id}
              onClick={() => {
                onSelectChat(chat.id);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
