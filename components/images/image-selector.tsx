import { useScenario } from "@/lib/context/scenario-context";
import { useEffect, useState } from "react";
import { ImageDetails } from "./image-details";

interface ImageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImageSelector({ isOpen, onClose }: ImageSelectorProps) {
  const { scenario } = useScenario();
  const images = scenario.images || [];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedImage) {
          setSelectedImage(null);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, selectedImage, onClose]);

  const handleImageSelect = (imageName: string) => {
    setSelectedImage(imageName);
  };

  const handleCloseDetails = () => {
    setSelectedImage(null);
  };

  if (!isOpen) return null;

  // If no images are defined for this scenario, show a message
  if (images.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60]">
        <div className="bg-black border-2 border-primary p-4 rounded-lg max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold mb-4 text-primary">SELECT IMAGE</h2>
          <p className="text-primary mb-4">
            No images available for this scenario.
          </p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-primary hover:bg-primary/20 rounded"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60]">
        <div className="bg-black border-2 border-primary p-4 rounded-lg max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold mb-4 text-primary">SELECT IMAGE</h2>
          <div className="grid grid-cols-2 gap-2">
            {images.map((image) => (
              <button
                key={image.title}
                onClick={() => handleImageSelect(image.title)}
                className="p-2 border border-primary text-primary hover:bg-primary/10 rounded"
              >
                {image.title.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-primary hover:bg-primary/20 rounded"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>

      {selectedImage && (
        <ImageDetails
          image={images.find((c) => c.title === selectedImage)!}
          isOpen={!!selectedImage}
          onClose={handleCloseDetails}
        />
      )}
    </>
  );
}
