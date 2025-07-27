// components/ChatBox.tsx

'use client';

import { useEffect, useState, useRef } from 'react';
import socket from '@/utils/socketClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  text: string;
  sender?: string;
}

interface ChatBoxProps {
  onClose?: () => void;
}

export default function ChatBox({ onClose }: ChatBoxProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    socket.on('chat-message', (msg: string) => {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), text: msg },
      ]);
    });
    return () => {
      socket.off('chat-message');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('chat-message', input.trim());
      setInput('');
    }
  };

  return (
    <div className="relative max-w-md mx-auto mt-8 border border-gray-200 rounded-lg shadow bg-white flex flex-col h-[500px]">
      {/* Cross Close Button */}
      {onClose && (
        <button
          aria-label="Close chat"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold z-10"
          style={{ lineHeight: 1, padding: '0 6px' }}
        >
          &times;
        </button>
      )}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-gray-100 rounded-lg px-4 py-2 w-fit max-w-[80%]"
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex items-center p-3 border-t"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 mr-2"
        />
        <Button type="submit" disabled={!input.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
}
