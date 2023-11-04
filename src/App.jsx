import {Canvas} from "@react-three/fiber";
import {Leva} from "leva";
import Experience from "./components/Experience.jsx";
import {Menu} from "./components/menu/Index";
import {useGameStore} from "./store.js";
import {Suspense} from "react";

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
        raycaster={{
          computeOffsets: (event, state) => {
            const {gl} = state;

            let offsetX, offsetY;
            if (event.target.nodeName !== "CANVAS") {
              const glContainerRect = gl.domElement.getBoundingClientRect();

              offsetX = event.nativeEvent.clientX - glContainerRect.x;
              offsetY = event.nativeEvent.clientY - glContainerRect.y;
            } else {
              offsetX = event.nativeEvent.offsetX;
              offsetY = event.nativeEvent.offsetY;
            }
            return {offsetX, offsetY};
          },
        }}
        shadows
        camera={{
          fov: 65,
          near: 0.1,
          far: 1000,
          position: cameraPosition,
        }}
      >
        <Experience />
      </Canvas>
      <Menu />
    </>
  );
}

export default App;
