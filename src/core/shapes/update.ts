import type { Point, Shape, ShapeOfType, ShapeType } from "./types";

type ShapeUpdaters = {
  [T in ShapeType]: (shape: ShapeOfType<T>, pos: Point) => ShapeOfType<T>;
};

const shapeUpdaters: ShapeUpdaters = {
  rectangle: (shape, pos) => ({
    ...shape,
    width: pos.x - shape.x,
    height: pos.y - shape.y,
  }),
  square: (shape, pos) => {
    const dx = pos.x - shape.x;
    const dy = pos.y - shape.y;
    const size = Math.abs(dx) > Math.abs(dy) ? dx : dy;
    return { ...shape, size };
  },
  circle: (shape, pos) => {
    const dx = pos.x - shape.x;
    const dy = pos.y - shape.y;
    return { ...shape, radius: Math.hypot(dx, dy) };
  },
  ellipse: (shape, pos) => {
    const dx = pos.x - shape.x;
    const dy = pos.y - shape.y;
    return { ...shape, radiusX: Math.abs(dx), radiusY: Math.abs(dy) };
  },
  triangle: (shape, pos) => {
    const dx = pos.x - shape.x;
    const dy = pos.y - shape.y;
    return { ...shape, radius: Math.hypot(dx, dy) };
  },
  line: (shape, pos) => ({
    ...shape,
    points: [shape.points[0], shape.points[1], pos.x, pos.y],
  }),
  arrow: (shape, pos) => ({
    ...shape,
    points: [shape.points[0], shape.points[1], pos.x, pos.y],
  }),
};

export const updateShape = (shape: Shape, pos: Point): Shape => {
  const updater = shapeUpdaters[shape.type] as (
    s: Shape,
    p: Point,
  ) => Shape;
  return updater(shape, pos);
};
