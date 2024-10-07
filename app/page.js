"use client"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CornerDownLeft } from "lucide-react";
import { useEffect, useState } from 'react';

function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

export default function Home() {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'assistant' },
    { text: 'What is this document about?', sender: 'user' },
    { text: 'This document is about the history of the internet.', sender: 'assistant' },
    { text: 'What is the purpose of this document?', sender: 'user' },
    { text: 'The purpose of this document is to provide information about the internet. The purpose of this document is to provide information about the internet.', sender: 'assistant' },
    { text: 'What is the main topic of this document?', sender: 'user' },
    { text: 'The main topic of this document is the history of the internet.', sender: 'assistant' },
    { text: 'What is the author of this document?', sender: 'user' },
    { text: 'The author of this document is John Doe.', sender: 'assistant' },
    { text: 'What is the publication date of this document? What is the publication date of this document? What is the publication date of this document?', sender: 'user' },
    { text: 'The publication date of this document is 2023-01-01.', sender: 'assistant' },
  ]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend(event);
    }
  }

  function handleSend(event) {
    event.preventDefault();
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);
      setTimeout(() => {
        setMessages([...newMessages, { text: 'AI response', sender: 'assistant' }]);
      }, 500);
      setInput('');
    }
  }

  function handleImageSelect(event) {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  }

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">DocuChat</h1>
        </header>
        <main className="w-full max-w-3xl mx-auto p-4">
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            {/* image picker */}
            <div className="flex items-center justify-center rounded-lg border border-dashed h-64 mb-4">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  className="object-contain w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight mt-4">
                    No document selected
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Choose an image of a document, then ask questions about it.
                  </p>
                  <Button className="my-4" onClick={() => document.getElementById('image-input').click()}>
                    Select Document
                  </Button>
                  <input
                    id="image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>
              )}
            </div>
            {/* chat messages */}
            <div className="flex-1 overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} pt-4`}>
                  <div className={`rounded-md text-sm ${message.sender === 'user' ? 'bg-popover text-popover-foreground shadow' : ''} max-w-[80%] px-4 py-2 mt-2`}>
                    <span dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br />') }} />
                  </div>
                </div>
              ))}
            </div>
            {/* spacer */}
            <div className="flex-1" />
            {/* chat input */}
            <form
              onSubmit={handleSend}
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
          </div>
        </main>
      </div>
    </div>
  )
}
