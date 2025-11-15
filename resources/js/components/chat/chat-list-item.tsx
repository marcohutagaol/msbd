'use client';

interface ChatListItemProps {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  type: 'direct' | 'group';
  isSelected: boolean;
  onClick: () => void;
}

export default function ChatListItem({
  name,
  avatar,
  lastMessage,
  time,
  unread,
  isSelected,
  onClick,
}: ChatListItemProps) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onClick}
      className={[
        'w-full text-left py-3 px-3 flex items-center gap-3 transition-all border-b border-blue-100/30',
        // default background explicit so it won't "flash" to white on active
        'bg-transparent',
        // hover + active states
        'hover:bg-blue-50/50 active:bg-blue-100/60',
        // focus styles (keyboard & visibility)
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/30 focus-visible:ring-offset-1',
        // selected state
        isSelected ? 'bg-blue-100/40 border-l-4 border-l-blue-500' : '',
      ].join(' ')}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img
          src={avatar || '/placeholder.svg'}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="font-semibold text-foreground truncate">{name}</h3>
          <span className="text-xs text-muted-foreground flex-shrink-0">{time}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{lastMessage}</p>
      </div>

      {/* Unread Badge */}
      {unread > 0 && (
        <div className="w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full flex-shrink-0">
          {unread}
        </div>
      )}
    </button>
  );
}
