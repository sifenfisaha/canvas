import type { RefObject } from "react";
import type Konva from "konva";
import { useToolStore } from "../store/useToolStore";
import { useShapesStore } from "../store/useShapesStore";
import { createDraft } from "../core/shapes/factory";
import { updateShape } from "../core/shapes/update";

export const useDrawing = (stageRef: RefObject<Konva.Stage | null>) => {
  const activeTool = useToolStore((s) => s.activeTool);
  const activeColor = useToolStore((s) => s.activeColor);
  const strokeWidth = useToolStore((s) => s.strokeWidth);

  const draft = useShapesStore((s) => s.draft);
  const setDraft = useShapesStore((s) => s.setDraft);
  const commitDraft = useShapesStore((s) => s.commitDraft);

  const handleMouseDown = () => {
    const pos = stageRef.current?.getPointerPosition();
    if (!pos) return;
    const next = createDraft(activeTool, pos, {
      color: activeColor,
      strokeWidth,
    });
    console.log("Creating draft:", next);
    if (next) setDraft(next);
  };

  const handleMouseMove = () => {
    if (!draft) return;
    const pos = stageRef.current?.getPointerPosition();
    if (!pos) return;
    setDraft(updateShape(draft, pos));
  };

  const handleMouseUp = () => {
    if (!draft) return;
    commitDraft();
  };

  return { handleMouseDown, handleMouseMove, handleMouseUp };
};
