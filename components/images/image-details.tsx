import { Image } from "@/lib/models/image";
import { useEffect, useState } from "react";

interface ImageDetailsProps {
  image: Image;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageDetails({ image, isOpen, onClose }: ImageDetailsProps) {
  const [showAlt, setShowAlt] = useState(false);

  useEffect(() => {
    if (!image.pathAlt) {
      setShowAlt(false);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const triggerFlash = () => {
      setShowAlt(true);
      // Flash for 1-2 seconds
      const flashDuration = 1000 + Math.random() * 1000;
      timeoutId = setTimeout(endFlash, flashDuration);
    };

    const endFlash = () => {
      setShowAlt(false);
      // Wait for 5-10 seconds before next flash
      const normalDuration = 5000 + Math.random() * 5000;
      timeoutId = setTimeout(triggerFlash, normalDuration);
    };

    // Start with normal duration
    const initialDelay = 5000 + Math.random() * 5000;
    timeoutId = setTimeout(triggerFlash, initialDelay);

    return () => clearTimeout(timeoutId);
  }, [image.pathAlt]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60]">
      <div className="bg-black border-2 border-primary p-4 rounded-lg w-[75vw] h-[90vh] flex flex-col mx-4">
        <h2 className="text-2xl font-bold mb-4 text-primary flex-shrink-0">
          {image.title.toUpperCase()}
        </h2>
        <div className="flex-1 min-h-0 flex flex-col gap-4 overflow-hidden">
          <div className="relative flex-1 min-h-0 w-full rounded border-2 border-primary overflow-hidden flex items-center justify-center">
            <img
              src={showAlt && image.pathAlt ? image.pathAlt : image.path}
              alt={image.title}
              className="w-auto h-auto max-w-full max-h-full object-contain"
            />
          </div>
          {image.description && (
            <p className="text-primary text-xl text-center flex-shrink-0 max-h-[20%] overflow-y-auto">
              {image.description}
            </p>
          )}
        </div>
        <div className="mt-4 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-primary text-primary hover:bg-primary/20 rounded"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
