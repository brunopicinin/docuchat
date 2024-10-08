'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

const MAX_FILE_SIZE = 1024 * 1024; // 1 MB

export default function ImagePicker({ onImageSelected }) {
  const [selectedImage, setSelectedImage] = useState(null);

  function handleChange(event) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert('Error: File size exceeds 1 MB limit!');
        return;
      }

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
            Choose an image of a document (max 1 MB), then ask questions about it.
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
