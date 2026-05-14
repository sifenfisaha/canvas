import { Line } from "react-konva";
import type { LineShape as LineShapeData } from "../../types/shapes";

interface Props {
  shape: LineShapeData;
}

const LineShape = ({ shape }: Props) => (
  <Line
    points={shape.points}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
    lineCap="round"
  />
);

export default LineShape;
