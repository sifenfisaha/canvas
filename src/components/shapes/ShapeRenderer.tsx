import type { Shape } from "../../types/shapes";
import RectangleShape from "./RectangleShape";
import CircleShape from "./CircleShape";
import SquareShape from "./SquareShape";
import EllipseShape from "./EllipseShape";
import TriangleShape from "./TriangleShape";
import LineShape from "./LineShape";
import ArrowShape from "./ArrowShape";

interface Props {
  shape: Shape;
}

const ShapeRenderer = ({ shape }: Props) => {
  switch (shape.type) {
    case "rectangle":
      return <RectangleShape shape={shape} />;
    case "circle":
      return <CircleShape shape={shape} />;
    case "square":
      return <SquareShape shape={shape} />;
    case "ellipse":
      return <EllipseShape shape={shape} />;
    case "triangle":
      return <TriangleShape shape={shape} />;
    case "line":
      return <LineShape shape={shape} />;
    case "arrow":
      return <ArrowShape shape={shape} />;
    default:
      return null;
  }
};

export default ShapeRenderer;
