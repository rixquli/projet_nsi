import React, {useEffect} from "react";
import {Items} from "./Items.jsx";
import Trash from "./3d_elements/Trashs";
import {gameStates, useGameStore} from "../../store.js";
import {Background} from "./3d_elements/Background.jsx";
import HUD from "./HUD";
import Lights from "../Lights.jsx";

const Game1 = () => {
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
    <>
      <HUD />

      <Background scale={0.03} position={[137, 0, 61]} />
      <Lights />

      <Trash name={"trash_black"} pos={[-3, 0, 0]} />
      <Trash name={"trash_yellow"} pos={[3, 0, 0]} />
      <Trash name={"trash_green"} pos={[0, 0, 0]} />

      <Items />
    </>
  );
};

export default Game1;
