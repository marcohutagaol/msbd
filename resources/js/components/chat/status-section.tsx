'use client';

import { Plus } from 'lucide-react';

export default function StatusSection() {
  const statuses = [
    { id: '1', user: 'Sarah Anderson', avatar: '/woman-avatar.png', time: '2 hours ago' },
    { id: '2', user: 'Alex Johnson', avatar: '/man-avatar.png', time: '5 hours ago' },
    { id: '3', user: 'Emma Wilson', avatar: '/woman-avatar-2.png', time: 'Yesterday' },
    { id: '4', user: 'Michael Chen', avatar: '/man-avatar-2.png', time: '2 days ago' },
  ];

  return (
    <div>
      {/* Add Status Button */}
      <button className="w-full px-4 py-4 flex items-center gap-3 border-b border-border hover:bg-muted/50 transition-all">
        <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center flex-shrink-0">
          <Plus className="w-6 h-6 text-primary" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold text-foreground">Add Status</h3>
          <p className="text-xs text-muted-foreground">Share your moment</p>
        </div>
      </button>

      {/* Status List */}
      {statuses.map((status) => (
        <button
          key={status.id}
          className="w-full px-4 py-3 flex items-center gap-3 border-b border-border hover:bg-muted/50 transition-all text-left group"
        >
          <div className="relative">
            <img
              src={status.avatar || "/placeholder.svg"}
              alt={status.user}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 border-2 border-background"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground text-sm">{status.user}</h3>
            <p className="text-xs text-muted-foreground">{status.time}</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-primary"></div>
        </button>
      ))}
    </div>
  );
}
