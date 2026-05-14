import { Rect } from "react-konva";
import type { SquareShape as SquareShapeData } from "../../types/shapes";

interface Props {
  shape: SquareShapeData;
}

const SquareShape = ({ shape }: Props) => (
  <Rect
    x={shape.x}
    y={shape.y}
    width={shape.size}
    height={shape.size}
    fill={shape.fill}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
  />
);

export default SquareShape;
