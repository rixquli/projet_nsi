import {useControls} from "leva";
import React from "react";
import {Perf} from "r3f-perf";
import {Grid, KeyboardControls} from "@react-three/drei";
import {Physics} from "@react-three/rapier";
import Floor from "./3d_elements/Floor";
import ExampleObject from "./3d_elements/Example";
import Lights from "./Lights.jsx";
import Game1 from "./game1/Index.jsx";
import { Suspense } from "react";

const Experience = () => {
  /**
   * Debug settings
   */
  const {physics} = useControls("World Settings", {
    physics: false,
  });

  /**
   * Keyboard control preset
   */
  const keyboardMap = [
    {name: "forward", keys: ["ArrowUp", "KeyW"]},
    {name: "backward", keys: ["ArrowDown", "KeyS"]},
    {name: "leftward", keys: ["ArrowLeft", "KeyA"]},
    {name: "rightward", keys: ["ArrowRight", "KeyD"]},
    {name: "jump", keys: ["Space"]},
    {name: "run", keys: ["Shift"]},
    {name: "action1", keys: ["1"]},
    {name: "action2", keys: ["2"]},
    {name: "action3", keys: ["3"]},
    {name: "action4", keys: ["KeyF"]},
  ];

  return (
    <>
      <Perf position="top-left" />
      {/* Affiche les performances */}

      <Lights />
      {/* Initialise les lumières */}

      <Grid
        args={[300, 300]}
        sectionColor={"lightgray"}
        cellColor={"gray"}
        position={[0, -0.99, 0]}
        userData={{camExcludeCollision: true}} // this won't be collide by camera ray
      />
      {/* Initialise la grille au sol */}

      <Suspense>
        <Physics debug={physics} timeStep="vary" gravity={[0, -20, 0]}>
          {/* Keyboard preset */}
          <KeyboardControls map={keyboardMap}>
            {/* Character Control */}
            <Game1 />
          </KeyboardControls>

          {/* 3D Ojects */}
          {/* <ExampleObject /> */}

          {/* Floor */}
          <Floor />

          {/* Shoting cubes */}
          {/* <ShotCube /> */}
        </Physics>
      </Suspense>
    </>
  );
};

export default Experience;
