import { Ellipse } from "react-konva";
import type { EllipseShape as EllipseShapeData } from "../../core/shapes/types";

interface Props {
  shape: EllipseShapeData;
}

const EllipseShape = ({ shape }: Props) => (
  <Ellipse
    x={shape.x}
    y={shape.y}
    radiusX={shape.radiusX}
    radiusY={shape.radiusY}
    fill={shape.fill}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
  />
);

export default EllipseShape;
