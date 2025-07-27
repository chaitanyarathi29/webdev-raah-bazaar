'use client';

import { useEffect, useState, useRef } from 'react';
// Import your socket client (update the URL inside your socketClient if needed)
import socket from '@/utils/socketClient';
// If you have shadcn UI components installed, import them (optional)
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [showChat, setShowChat] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Listen to incoming messages
  useEffect(() => {
    const handleMessage = (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    };
    socket.on('chat-message', handleMessage);

    return () => {
      socket.off('chat-message', handleMessage);
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('chat-message', input.trim());
      setInput('');
    }
  };

  if (!showChat) {
    return (
      <div className="flex justify-center p-4">
        <Button onClick={() => setShowChat(true)}>Open Chat</Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col h-[500px]">
      {/* Close button */}
      <div className="flex justify-end p-2 border-b border-gray-200">
        <button
          aria-label="Close chat"
          onClick={() => setShowChat(false)}
          className="text-gray-500 hover:text-red-600 text-2xl font-bold leading-none"
          style={{ lineHeight: 1 }}
        >
          &times;
        </button>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400">
        {messages.length === 0 && (
          <p className="text-gray-400 italic text-center">No messages yet</p>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="bg-gray-100 px-4 py-2 rounded max-w-[80%] break-words"
          >
            {msg}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex p-3 border-t border-gray-200 gap-2"
      >
        {/* If you don't have shadcn Input, replace with <input /> */}
        <Input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={!input.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
}
