import { useToolStore } from "../store/useToolStore";
import type { ToolId } from "../types/tools";

interface Tool {
  id: ToolId;
  label: string;
  icon: React.ReactNode;
}

const tools: Tool[] = [
  {
    id: "select",
    label: "Select",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 3l6 17 2.5-7L21 11z" />
      </svg>
    ),
  },
  {
    id: "rectangle",
    label: "Rectangle",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="6" width="16" height="12" rx="1.5" />
      </svg>
    ),
  },
  {
    id: "square",
    label: "Square",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="5" width="14" height="14" rx="1.5" />
      </svg>
    ),
  },
  {
    id: "circle",
    label: "Circle",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="7.5" />
      </svg>
    ),
  },
  {
    id: "ellipse",
    label: "Ellipse",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="12" cy="12" rx="9" ry="6" />
      </svg>
    ),
  },
  {
    id: "triangle",
    label: "Triangle",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 4l8.5 15h-17z" />
      </svg>
    ),
  },
  {
    id: "line",
    label: "Line",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 19L19 5" />
      </svg>
    ),
  },
  {
    id: "arrow",
    label: "Arrow",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 19L19 5" />
        <path d="M11 5h8v8" />
      </svg>
    ),
  },
  {
    id: "pen",
    label: "Pen",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 4.5l4 4L8 20H4v-4z" />
        <path d="M13.5 6.5l4 4" />
      </svg>
    ),
  },
  {
    id: "text",
    label: "Text",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 6V4h14v2" />
        <path d="M12 4v16" />
        <path d="M9 20h6" />
      </svg>
    ),
  },
  {
    id: "eraser",
    label: "Eraser",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16.5 3.5l4 4a2 2 0 010 2.8L10 21H5l-2-2v-2L13.7 3.5a2 2 0 012.8 0z" />
        <path d="M9 21l-6-6" />
      </svg>
    ),
  },
];

const colors = [
  "#111827",
  "#ef4444",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#ffffff",
];

const Sidebar = () => {
  const activeTool = useToolStore((s) => s.activeTool);
  const setActiveTool = useToolStore((s) => s.setActiveTool);
  const activeColor = useToolStore((s) => s.activeColor);
  const setActiveColor = useToolStore((s) => s.setActiveColor);
  const strokeWidth = useToolStore((s) => s.strokeWidth);
  const setStrokeWidth = useToolStore((s) => s.setStrokeWidth);

  return (
    <aside
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 select-none max-h-[calc(100vh-2rem)]"
      aria-label="Drawing tools sidebar"
    >
      <div className="flex flex-col items-center gap-1.5 rounded-xl border border-white/40 bg-white/70 p-1.5 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.25)] backdrop-blur-xl ring-1 ring-black/5">
        <div className="flex flex-col gap-1">
          {tools.map((tool) => {
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveTool(tool.id)}
                className={`group relative flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-150 ${
                  isActive
                    ? "bg-purple-100"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                aria-label={tool.label}
                aria-pressed={isActive}
              >
                <span className="h-4 w-4">{tool.icon}</span>

                <span className="pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-md bg-gray-900 px-1.5 py-0.5 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                  {tool.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="h-px w-6 bg-gray-200" />

        <div className="grid grid-cols-2 gap-1">
          {colors.map((color) => {
            const isActive = activeColor === color;
            return (
              <button
                key={color}
                type="button"
                onClick={() => setActiveColor(color)}
                className={`h-3.5 w-3.5 rounded-full ring-2 ring-offset-1 ring-offset-white/70 transition-all duration-150 hover:scale-110 ${
                  isActive ? "ring-gray-900" : "ring-transparent"
                } ${color === "#ffffff" ? "border border-gray-200" : ""}`}
                style={{ backgroundColor: color }}
                aria-label={`Color ${color}`}
              />
            );
          })}
        </div>

        <div className="h-px w-6 bg-gray-200" />

        <div className="flex flex-col items-center gap-1">
          {[2, 4, 7].map((size) => {
            const isActive = strokeWidth === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => setStrokeWidth(size)}
                className={`flex h-5 w-5 items-center justify-center rounded-md transition-all duration-150 ${
                  isActive ? "bg-gray-900" : "bg-gray-100 hover:bg-gray-200"
                }`}
                aria-label={`Stroke ${size}`}
              >
                <span
                  className={`block rounded-full ${
                    isActive ? "bg-white" : "bg-gray-700"
                  }`}
                  style={{ width: size + 1, height: size + 1 }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
