import type { RefObject } from "react";
import type Konva from "konva";
import { useToolStore } from "../store/useToolStore";
import { useShapesStore } from "../store/useShapesStore";

export const useDrawing = (stageRef: RefObject<Konva.Stage | null>) => {
  const activeTool = useToolStore((s) => s.activeTool);
  const activeColor = useToolStore((s) => s.activeColor);
  const strokeWidth = useToolStore((s) => s.strokeWidth);

  const draft = useShapesStore((s) => s.draft);
  const setDraft = useShapesStore((s) => s.setDraft);
  const commitDraft = useShapesStore((s) => s.commitDraft);

  const handleMouseDown = () => {
    const stage = stageRef.current;
    if (!stage) return;
    const pos = stage.getPointerPosition();
    if (!pos) return;

    if (activeTool === "rectangle") {
      setDraft({
        id: crypto.randomUUID(),
        type: "rectangle",
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        fill: `${activeColor}33`,
        stroke: activeColor,
        strokeWidth,
      });
    } else if (activeTool === "circle") {
      setDraft({
        id: crypto.randomUUID(),
        type: "circle",
        x: pos.x,
        y: pos.y,
        radius: 0,
        fill: `${activeColor}33`,
        stroke: activeColor,
        strokeWidth,
      });
    } else if (activeTool === "square") {
      setDraft({
        id: crypto.randomUUID(),
        type: "square",
        x: pos.x,
        y: pos.y,
        size: 0,
        fill: `${activeColor}33`,
        stroke: activeColor,
        strokeWidth,
      });
    } else if (activeTool === "ellipse") {
      setDraft({
        id: crypto.randomUUID(),
        type: "ellipse",
        x: pos.x,
        y: pos.y,
        radiusX: 0,
        radiusY: 0,
        fill: `${activeColor}33`,
        stroke: activeColor,
        strokeWidth,
      });
    } else if (activeTool === "triangle") {
      setDraft({
        id: crypto.randomUUID(),
        type: "triangle",
        x: pos.x,
        y: pos.y,
        radius: 0,
        fill: `${activeColor}33`,
        stroke: activeColor,
        strokeWidth,
      });
    } else if (activeTool === "line") {
      setDraft({
        id: crypto.randomUUID(),
        type: "line",
        points: [pos.x, pos.y, pos.x, pos.y],
        stroke: activeColor,
        strokeWidth,
      });
    } else if (activeTool === "arrow") {
      setDraft({
        id: crypto.randomUUID(),
        type: "arrow",
        points: [pos.x, pos.y, pos.x, pos.y],
        fill: activeColor,
        stroke: activeColor,
        strokeWidth,
      });
    }
  };

  const handleMouseMove = () => {
    if (!draft) return;
    const stage = stageRef.current;
    if (!stage) return;
    const pos = stage.getPointerPosition();
    if (!pos) return;

    if (draft.type === "rectangle") {
      setDraft({
        ...draft,
        width: pos.x - draft.x,
        height: pos.y - draft.y,
      });
    } else if (draft.type === "circle") {
      const dx = pos.x - draft.x;
      const dy = pos.y - draft.y;
      setDraft({
        ...draft,
        radius: Math.hypot(dx, dy),
      });
    } else if (draft.type === "square") {
      const dx = pos.x - draft.x;
      const dy = pos.y - draft.y;

      const size = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      setDraft({
        ...draft,
        size,
      });
    } else if (draft.type === "ellipse") {
      const dx = pos.x - draft.x;
      const dy = pos.y - draft.y;
      setDraft({
        ...draft,
        radiusX: Math.abs(dx),
        radiusY: Math.abs(dy),
      });
    } else if (draft.type === "triangle") {
      const dx = pos.x - draft.x;
      const dy = pos.y - draft.y;
      setDraft({
        ...draft,
        radius: Math.hypot(dx, dy),
      });
    } else if (draft.type === "line" || draft.type === "arrow") {
      setDraft({
        ...draft,
        points: [draft.points[0], draft.points[1], pos.x, pos.y],
      });
    }
  };

  const handleMouseUp = () => {
    if (!draft) return;
    commitDraft();
  };

  return { handleMouseDown, handleMouseMove, handleMouseUp };
};
