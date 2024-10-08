import { Button } from '@/components/ui/button';

export default function ImagePicker({ selectedImage, onImageSelected }) {
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
            onChange={onImageSelected}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
