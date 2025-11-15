interface MessageBubbleProps {
  sender: 'me' | 'other';
  content: string;
  time: string;
}

export default function MessageBubble({ sender, content, time }: MessageBubbleProps) {
  const isMe = sender === 'me';

  return (
    <div
      className={`flex ${isMe ? 'justify-end' : 'justify-start'} fade-in`}
    >
      <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} gap-1.5`}>
        <div
          className={`px-4 py-2.5 rounded-2xl max-w-xs lg:max-w-md break-words ${
            isMe
              ? 'bg-primary text-primary-foreground rounded-br-sm'
              : 'bg-muted text-foreground rounded-bl-sm'
          }`}
        >
          <p className="text-sm">{content}</p>
        </div>
        <span className="text-xs text-muted-foreground px-2">{time}</span>
      </div>
    </div>
  );
}
