import {useControls} from "leva";
import React, {Suspense, useEffect} from "react";
import {Perf} from "r3f-perf";
import {KeyboardControls} from "@react-three/drei";
import {Physics} from "@react-three/rapier";
import Floor from "./3d_elements/Floor";
import Lights from "./Lights.jsx";
import Game1 from "./game1/Index.jsx";
import {useGameStore} from "../store.js";
import LoadingScreen from "./LoadingScreen.jsx";
import {Background} from "./menu/Background.jsx";
import Skybox from "./helpers/Skybox.jsx";

const Experience = () => {
  // Debug settings
  const {physics} = useControls("World Settings", {
    physics: false,
  });

  // Keyboard control preset
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

  const gamesComponents = [{name: "GAME1", component: <Game1 />}];

  const {gameState, games} = useGameStore();

  const homeBackground = () => {
    const dirPath = "/skyboxs/space/";
    const paths = ["right", "left", "top", "bottom", "front", "back"].map(
      (img) => dirPath + img + ".png"
    );
    return (
      <>
        {/*<Background scale={0.0015} />*/}
        <Lights />
        <Skybox paths={paths} />
      </>
    );
  };

  return (
    <>
      <Perf position="top-left" />
      {/* Affiche les performances */}

      {/* <Lights /> */}
      {/* Initialise les lumières */}

      {/* <Grid
        args={[300, 300]}
        sectionColor={"lightgray"}
        cellColor={"gray"}
        position={[0, -0.99, 0]}
        userData={{camExcludeCollision: true}} // this won't be collide by camera ray
      /> */}
      {/* Initialise la grille au sol */}

      {/* <Model scale={5} /> */}
        {(gameState === "HOME_PAGE" || gameState === "GAMES_LIST") &&
          homeBackground()}

      <Physics debug={physics} timeStep="vary" gravity={[0, -20, 0]}>
        {/* Keyboard preset */}
        <KeyboardControls map={keyboardMap}>
          {/* changement de jeu */}
          <Suspense fallback={<LoadingScreen />}>
            {gameState === "GAME" &&
              gamesComponents.find((e) => e.name === games).component}
          </Suspense>
        </KeyboardControls>

        {/* 3D Ojects */}
        {/* <ExampleObject /> */}

        {/* Floor */}
        <Floor />

        {/* Shoting cubes */}
        {/* <ShotCube /> */}
      </Physics>
    </>
  );
};

export default Experience;
