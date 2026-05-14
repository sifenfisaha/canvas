import { Layer, Stage } from "react-konva";
import { useRef } from "react";
import type Konva from "konva";
import { useShapesStore } from "../store/useShapesStore";
import { useDrawing } from "../hooks/useDrawing";
import ShapeRenderer from "./shapes/ShapeRenderer";

const Canvas = () => {
  const stageRef = useRef<Konva.Stage | null>(null);
  const shapes = useShapesStore((s) => s.shapes);
  const draft = useShapesStore((s) => s.draft);
  const { handleMouseDown, handleMouseMove, handleMouseUp } =
    useDrawing(stageRef);

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {shapes.map((shape) => (
          <ShapeRenderer key={shape.id} shape={shape} />
        ))}
        {draft && <ShapeRenderer shape={draft} />}
      </Layer>
    </Stage>
  );
};

export default Canvas;
