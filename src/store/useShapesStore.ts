import { create } from "zustand";
import type { Shape } from "../core/shapes/types";

interface ShapesState {
  shapes: Shape[];
  draft: Shape | null;
  setDraft: (shape: Shape | null) => void;
  commitDraft: () => void;
}

export const useShapesStore = create<ShapesState>((set, get) => ({
  shapes: [],
  draft: null,
  setDraft: (shape) => set({ draft: shape }),
  commitDraft: () => {
    const { draft, shapes } = get();
    if (!draft) return;
    set({ shapes: [...shapes, draft], draft: null });
  },
}));
