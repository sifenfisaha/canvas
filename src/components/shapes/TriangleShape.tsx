import { RegularPolygon } from "react-konva";
import type { TriangleShape as TriangleShapeData } from "../../types/shapes";

interface Props {
  shape: TriangleShapeData;
}

const TriangleShape = ({ shape }: Props) => (
  <RegularPolygon
    x={shape.x}
    y={shape.y}
    sides={3}
    radius={shape.radius}
    fill={shape.fill}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
  />
);

export default TriangleShape;
