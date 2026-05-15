import { Rect } from "react-konva";
import type { RectangleShape as RectangleShapeData } from "../../core/shapes/types";

interface Props {
  shape: RectangleShapeData;
}

const RectangleShape = ({ shape }: Props) => (
  <Rect
    x={shape.x}
    y={shape.y}
    width={shape.width}
    height={shape.height}
    fill={shape.fill}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
  />
);

export default RectangleShape;
