import { Arrow } from "react-konva";
import type { ArrowShape as ArrowShapeData } from "../../types/shapes";

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
