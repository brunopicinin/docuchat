'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function ImagePicker({ onImageSelected }) {
  const [selectedImage, setSelectedImage] = useState(null);

  function handleChange(event) {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onImageSelected(file);
    }
  }

  return (
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
            onChange={handleChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
