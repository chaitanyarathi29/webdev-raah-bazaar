'use client';

import { useEffect, useState, useRef } from 'react';
import socket from '@/utils/socketClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [showChat, setShowChat] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Set up Socket.io listeners
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

  // Render button to open chat if closed
  if (!showChat) {
    return (
      <div className="flex justify-center p-4">
        <Button onClick={() => setShowChat(true)}>Open Chat</Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col h-[500px]">
      {/* Header with dropdown and close button */}
      <div className="flex justify-between items-center p-2 border-b border-gray-200 rounded-t-lg">
        <span className="font-semibold text-xl">💬 Chat Box</span>
        <div className="flex items-center gap-2">
          {/* Dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setMessages([])}>
                Clear Chat
              </DropdownMenuItem>
              {/* You can add more menu actions here */}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Close chat box button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowChat(false)}
            aria-label="Close chat"
            className="text-gray-500 hover:text-red-600 text-2xl font-bold leading-none"
          >
            &times;
          </Button>
        </div>
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
