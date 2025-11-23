'use client';

import { MessageCircle, Trash2 } from 'lucide-react';

interface ContactsSectionProps {
  onAddContact: () => void;
}

export default function ContactsSection({ onAddContact }: ContactsSectionProps) {
  const contacts = [
    { id: '1', name: 'Sarah Anderson', status: 'Available', avatar: '/woman-avatar.png' },
    { id: '2', name: 'Alex Johnson', status: 'Away', avatar: '/man-avatar.png' },
    { id: '3', name: 'Emma Wilson', status: 'Do not disturb', avatar: '/woman-avatar-2.png' },
    { id: '4', name: 'Michael Chen', status: 'Available', avatar: '/man-avatar-2.png' },
    { id: '5', name: 'Jessica Lee', status: 'Available', avatar: '/woman-avatar-3.png' },
  ];

  return (
    <div className="divide-y divide-border">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="px-4 py-3 flex items-center justify-between 
          hover:bg-blue-50/80 transition-colors group"
        >
          {/* Avatar + Info */}
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <img
                src={contact.avatar || '/placeholder.svg'}
                alt={contact.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background"></div>
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{contact.name}</h3>
              <p className="text-xs text-muted-foreground">{contact.status}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-primary" />
            </button>

            <button
              className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
