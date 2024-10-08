'use client';

import Chat from '@/components/Chat';
import Header from '@/components/Header';
import ImagePicker from '@/components/ImagePicker';
import { getChatCompletion } from '@/lib/openai';
import { detectTextInImage } from '@/lib/roboflow';
import { useState } from 'react';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [messages, setMessages] = useState([]);

  async function handleImageSelect(image) {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(',')[1];
      try {
        const text = await detectTextInImage(base64String);
        if (text) {
          setMessages([...messages, { role: 'assistant', content: `Here's the text from the document:\n\n${text}` }]);
        } else {
          setMessages([...messages, { role: 'assistant', content: 'No text found in the document. You can try refreshing the page and selecting a different image.' }]);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };
    reader.readAsDataURL(image);
  }

  async function handleSubmitMessage(text) {
    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    const message = await getChatCompletion(newMessages);
    setMessages([...newMessages, { role: 'assistant', content: message.content }]);
  }

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col">
        <Header />
        <main className="w-full max-w-3xl mx-auto p-4">
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <ImagePicker onImageSelected={handleImageSelect} />
            <Chat messages={messages} onSubmitMessage={handleSubmitMessage} />
          </div>
        </main>
      </div>
    </div>
  )
}
