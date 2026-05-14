export interface RectangleShape {
  id: string;
  type: "rectangle";
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface SquareShape {
  id: string;
  type: "square";
  x: number;
  y: number;
  size: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface CircleShape {
  id: string;
  type: "circle";
  x: number;
  y: number;
  radius: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface EllipseShape {
  id: string;
  type: "ellipse";
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface TriangleShape {
  id: string;
  type: "triangle";
  x: number;
  y: number;
  radius: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface LineShape {
  id: string;
  type: "line";
  points: [number, number, number, number];
  stroke: string;
  strokeWidth: number;
}

export interface ArrowShape {
  id: string;
  type: "arrow";
  points: [number, number, number, number];
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export type Shape =
  | RectangleShape
  | SquareShape
  | CircleShape
  | EllipseShape
  | TriangleShape
  | LineShape
  | ArrowShape;
