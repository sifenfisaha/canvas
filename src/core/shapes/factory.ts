import type {
  DrawStyle,
  Point,
  Shape,
  ShapeOfType,
  ShapeType,
} from "./types";

type ShapeFactories = {
  [T in ShapeType]: (pos: Point, style: DrawStyle) => ShapeOfType<T>;
};

const fillFrom = (color: string) => `${color}33`;

export const shapeFactories: ShapeFactories = {
  rectangle: (pos, style) => ({
    id: crypto.randomUUID(),
    type: "rectangle",
    x: pos.x,
    y: pos.y,
    width: 0,
    height: 0,
    fill: fillFrom(style.color),
    stroke: style.color,
    strokeWidth: style.strokeWidth,
  }),
  square: (pos, style) => ({
    id: crypto.randomUUID(),
    type: "square",
    x: pos.x,
    y: pos.y,
    size: 0,
    fill: fillFrom(style.color),
    stroke: style.color,
    strokeWidth: style.strokeWidth,
  }),
  circle: (pos, style) => ({
    id: crypto.randomUUID(),
    type: "circle",
    x: pos.x,
    y: pos.y,
    radius: 0,
    fill: fillFrom(style.color),
    stroke: style.color,
    strokeWidth: style.strokeWidth,
  }),
  ellipse: (pos, style) => ({
    id: crypto.randomUUID(),
    type: "ellipse",
    x: pos.x,
    y: pos.y,
    radiusX: 0,
    radiusY: 0,
    fill: fillFrom(style.color),
    stroke: style.color,
    strokeWidth: style.strokeWidth,
  }),
  triangle: (pos, style) => ({
    id: crypto.randomUUID(),
    type: "triangle",
    x: pos.x,
    y: pos.y,
    radius: 0,
    fill: fillFrom(style.color),
    stroke: style.color,
    strokeWidth: style.strokeWidth,
  }),
  line: (pos, style) => ({
    id: crypto.randomUUID(),
    type: "line",
    points: [pos.x, pos.y, pos.x, pos.y],
    stroke: style.color,
    strokeWidth: style.strokeWidth,
  }),
  arrow: (pos, style) => ({
    id: crypto.randomUUID(),
    type: "arrow",
    points: [pos.x, pos.y, pos.x, pos.y],
    fill: style.color,
    stroke: style.color,
    strokeWidth: style.strokeWidth,
  }),
};

export const isShapeType = (value: string): value is ShapeType =>
  value in shapeFactories;

export const createDraft = (
  tool: string,
  pos: Point,
  style: DrawStyle,
): Shape | null =>
  isShapeType(tool) ? shapeFactories[tool](pos, style) : null;
