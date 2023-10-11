import React, {useEffect} from "react";
import {Items} from "./Items.jsx";
import Trash from "./3d_elements/Trashs";
import {gameStates, useGameStore} from "../../store.js";

const Game1 = () => {
  // const {initialization, gameState} = useGameStore((state) => ({
  //   initialization: state.gameData["GAME1"].initialization,
  //   gameState: state.gameState,
  // }));

  const crashTest = (n) => {
    let result = [];
    for (let i = 0; i < n; i++) {
      result.push(<Trash name={"trash_green"} pos={[0, 0, 0]} />);
    }
    return result;
  };

  // useEffect(() => {
  //   if (gameState === gameStates.MENU) initialization();
  // }, [gameState]);

  return (
    <>
      <Trash name={"trash_black"} pos={[-3, 0, 0]} />
      <Trash name={"trash_yellow"} pos={[3, 0, 0]} />
      <Trash name={"trash_green"} pos={[0, 0, 0]} />

      {/* {crashTest(500)} */}

      <Items />

      {/* <CongratulationsEffect /> */}
    </>
  );
};

export default Game1;
