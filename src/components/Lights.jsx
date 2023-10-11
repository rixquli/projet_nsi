import {useHelper} from "@react-three/drei";
import {useControls} from "leva";
import {useRef} from "react";
import * as THREE from "three";

export default function Lights() {
  /**
   * Debug settings
   */
  const {intensity, position} = useControls("Lights Settings", {
    intensity: import.meta.env.production ? 2 : 1,
    position: import.meta.env.production ? [20, 30, -15] : [20, 30, -3],
  });
  const directionalLightRef = useRef();

  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  return (
    <>
      <directionalLight
        castShadow
        shadow-normalBias={0.06}
        position={position}
        intensity={intensity}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-camera-top={50}
        shadow-camera-right={50}
        shadow-camera-bottom={-50}
        shadow-camera-left={-50}
        ref={directionalLightRef}
      />
      <ambientLight intensity={1} />
    </>
  );
}
