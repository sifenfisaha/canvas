import { Circle } from "react-konva";
import type { CircleShape as CircleShapeData } from "../../types/shapes";

interface Props {
  shape: CircleShapeData;
}

const CircleShape = ({ shape }: Props) => (
  <Circle
    x={shape.x}
    y={shape.y}
    radius={shape.radius}
    fill={shape.fill}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
  />
);

export default CircleShape;
