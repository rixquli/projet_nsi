import React, {useEffect} from "react";
import {Items} from "./Items.jsx";
import Trash from "./3d_elements/Trashs";
import {useGameStore} from "../../store.js";
import {Background} from "./3d_elements/Background.jsx";
import HUD from "./HUD/index";
import Lights from "../Lights.jsx";
import { useControls } from "leva";
import { Physics } from "@react-three/rapier";
import Floor from './../3d_elements/Floor';

const Game1 = () => {
  // Debug settings
  const {physics} = useControls("World Settings", {
    physics: false,
  });

  const {initialization, gameStateInGame} = useGameStore((state) => ({
    initialization: state.gameData["GAME1"].initialization,
    gameStateInGame: state.gameData["GAME1"].gameStateInGame,
  }));

  useEffect(() => {
    if (gameStateInGame === "INITIALIZATION") {
      initialization();
    }
  }, [gameStateInGame]);

  return (
    <Physics debug={physics} timeStep="vary" gravity={[0, -10, 0]}>
      <HUD />

      {/* <Background scale={0.03} position={[137, 0, 61]} /> */}
      <Lights />

      <Trash name={"trash_black"} pos={[-3, 0, 0]} />
      <Trash name={"trash_yellow"} pos={[3, 0, 0]} />
      <Trash name={"trash_green"} pos={[0, 0, 0]} />

      <Items />

      <Floor />
    </Physics>
  );
};

export default Game1;
