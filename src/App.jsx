import {Canvas} from "@react-three/fiber";
import {Leva} from "leva";
import Experience from "./components/Experience.jsx";
import {Menu} from "./components/menu/Index";
import {useGameStore} from "./store.js";

function App() {
  const {cameraPosition, setIsMouseDown} = useGameStore();
  return (
    <>
      <Leva collapsed />
      <Canvas
        onMouseDown={() => {
          setIsMouseDown(true); // Set isMouseDown to true when the mouse button is pressed
        }}
        onMouseUp={() => {
          setIsMouseDown(false); // Set isMouseDown to false when the mouse button is released
        }}
        shadows
        camera={{
          fov: 65,
          near: 0.1,
          far: 1000,
          position: cameraPosition, 
        }}
        // onPointerDown={(e) => {
        //   e.target.requestPointerLock();
        // }}
      >
        <Experience />
      </Canvas>
      <Menu />
    </>
  );
}

export default App;
