import { create } from "zustand";
import type { ToolId } from "../core/tools/types";

interface ToolState {
  activeTool: ToolId;
  activeColor: string;
  strokeWidth: number;
  setActiveTool: (tool: ToolId) => void;
  setActiveColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
}

export const useToolStore = create<ToolState>((set) => ({
  activeTool: "select",
  activeColor: "#3b82f6",
  strokeWidth: 3,
  setActiveTool: (tool) => set({ activeTool: tool }),
  setActiveColor: (color) => set({ activeColor: color }),
  setStrokeWidth: (width) => set({ strokeWidth: width }),
}));
