import { Arrow } from "react-konva";
import type { ArrowShape as ArrowShapeData } from "../../core/shapes/types";

interface Props {
  shape: ArrowShapeData;
}

const ArrowShape = ({ shape }: Props) => (
  <Arrow
    points={shape.points}
    fill={shape.fill}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
  />
);

export default ArrowShape;
