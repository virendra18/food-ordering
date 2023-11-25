import { create } from "zustand";

interface ImageUploadState {
  imageUrl: string | null;
  imageId: string | null;
  setImageUrl: (imageUrl: string) => void;
  setImageId: (imageUrl: string) => void;
  removeImageInfo: () => void;
}

const useImageUploadStore = create<ImageUploadState>((set) => ({
  imageUrl: null,
  imageId: null,
  setImageUrl: (imageUrl) => set({ imageUrl }),
  setImageId: (imageId) => set({ imageId }),
  removeImageInfo: () => {
    set({ imageUrl: null });
    set({ imageId: null });
  },
}));

export default useImageUploadStore;
