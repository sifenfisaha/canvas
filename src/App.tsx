import { Layer, Stage, Rect } from "react-konva";
import { useRef, useState } from "react";
import type Konva from "konva";
import Sidebar from "./components/Sidebar";

interface RectType {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
}

const App = () => {
  const [rectangles, setRectangles] = useState<RectType[]>([]);
  const [newRec, setNewRec] = useState<RectType | null>();
  const [isDrawing, setIsDrawing] = useState(false);
  const statfeRef = useRef<Konva.Stage | null>(null);

  const handleMouseDown = () => {
    const stage = statfeRef.current;

    if (!stage) {
      return;
    }
    const { x, y } = stage.getPointerPosition() || { x: 0, y: 0 };
    setNewRec({
      x,
      y,
      width: 0,
      height: 0,
      id: Math.random().toString(),
    });
    setIsDrawing(true);
  };

  const handleMouseMove = () => {
    if (!isDrawing || !newRec) {
      return;
    }
    const stage = statfeRef.current;

    if (!stage) {
      return;
    }

    const { x, y } = stage.getPointerPosition() || { x: 0, y: 0 };
    const width = x - newRec.x;
    const height = y - newRec.y;
    setNewRec({ ...newRec, width, height });
  };

  const handleMouseUp = () => {
    if (newRec) {
      setRectangles([...rectangles, newRec]);
      console.log(rectangles);
      setNewRec(null);
    }
    setIsDrawing(false);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Sidebar />
      <Stage
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={statfeRef}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Layer>
          {rectangles.map((rec) => (
            <Rect
              key={rec.id}
              x={rec.x}
              y={rec.y}
              width={rec.width}
              height={rec.height}
              fill={"rgba(0, 0, 255, 0.5)"}
            />
          ))}

          {newRec && (
            <Rect
              x={newRec.x}
              y={newRec.y}
              width={newRec.width}
              height={newRec.height}
              fill={"rgba(0, 0, 255, 0.5)"}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
