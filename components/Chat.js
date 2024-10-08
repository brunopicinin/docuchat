'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CornerDownLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

export default function Chat({ messages, onSubmitMessage }) {
  const [input, setInput] = useState('');

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const text = input.trim();
      if (text) {
        setInput('');
        onSubmitMessage(text);
      }
    }
  }

  return (
    <>
      {/* chat messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} pt-4`}>
            <div className={`rounded-md text-sm ${message.role === 'user' ? 'bg-popover text-popover-foreground shadow' : ''} max-w-[80%] px-4 py-2 mt-2`}>
              <span dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br />') }} />
            </div>
          </div>
        ))}
      </div>
      {/* spacer */}
      <div className="flex-1" />
      {/* chat input */}
      <form
        onSubmit={onSubmitMessage}
        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring mt-6"
      >
        <Textarea
          placeholder="Type your message here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="flex items-center p-3 pt-0">
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </>
  );
}
