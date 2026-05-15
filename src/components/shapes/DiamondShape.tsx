import { RegularPolygon } from "react-konva";
import type { DiamondShape as DiamondShapeData } from "../../core/shapes/types";

interface Props {
  shape: DiamondShapeData;
}

const DiamondShape = ({ shape }: Props) => (
  <RegularPolygon
    x={shape.x}
    y={shape.y}
    sides={4}
    radius={shape.radius}
    fill={shape.fill}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
  />
);

export default DiamondShape;
