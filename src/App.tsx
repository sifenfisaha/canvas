import Canvas from "./components/Canvas";
import Sidebar from "./components/Sidebar";

const App = () => (
  <div className="relative h-screen w-screen overflow-hidden bg-linear-to-br from-slate-50 via-white to-indigo-50">
    <Sidebar />
    <Canvas />
  </div>
);

export default App;
