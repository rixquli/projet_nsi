import {Html} from "@react-three/drei";
import React, {useEffect, useState} from "react";
import {useGameStore} from "../../../store.js";
import {useScoreMultiplierStore} from "../useScoreMultiplier";

const HUD = () => {
  const {gameStateInGame, playAgain, goToMenu, localGet} = useGameStore(
    (state) => ({
      gameStateInGame: state.gameData["GAME1"].gameStateInGame,
      playAgain: state.gameData["GAME1"].playAgain,
      goToMenu: state.goToMenu,
      localGet: state.localGet,
    })
  );

  const {
    scoreMultiplierBar,
    setScoreMultiplierBar,
    scoreMultiplier,
    setScoreMultiplier,
    itemInTrash,
    setItemInTrash,
  } = useScoreMultiplierStore();
  const [time, setTime] = useState(0);

  useEffect(() => {
    const scoreMultiplierTimer = setTimeout(() => {
      console.log(time);
      if (time <= 0) {
        clearTimeout(scoreMultiplierTimer);
        setScoreMultiplier(1);
        setScoreMultiplierBar(0);
        return;
      }
      setScoreMultiplierBar(time / 30);
      setTime((e) => e - 10);
    }, 10);

    return () => {
      clearTimeout(scoreMultiplierTimer);
    };
  }, [time]);

  useEffect(() => {
    console.log(itemInTrash);
    if (itemInTrash) {
      setItemInTrash(false);
      if (time > 0) setScoreMultiplier(scoreMultiplier + 1);
      // setNeedTimer(true);
      setTime(3000);
    }
  }, [itemInTrash]);

  return (
    <Html pointerEvents="none" position={"absolute"}>
      <div
        className={`hud text-6xl ${
          gameStateInGame !== "GAME" ? "menu--hidden" : ""
        }`}>
        <div className="score">
          <h1>{localGet()?.score || "0"}</h1>
          <h4 className="text-lg">
            Meilleur Score:{" "}
            {JSON.parse(localStorage.getItem("GAME1"))?.bestScore || "0"}
          </h4>
          <div className="w-52 h-8 p-1 bg-gray-500 rounded-full flex items-center text-lg text-white ">
            <p className="absolute left-1/2 -translate-x-1/2">
              x{scoreMultiplier}
            </p>
            <div
              style={{width: `${scoreMultiplierBar.toFixed(0)}%`}}
              className={`scoreMultiplier h-full bg-red-500 rounded-full `}></div>
          </div>
        </div>
        <h2 className="nameOfItemToThrow">
          {localGet()?.itemToThrow.displayName}
        </h2>
        {/* <button className="restartPosition">
          Restart <br /> Position
        </button> */}
      </div>
      <div
        className={`gameOver text-6xl ${
          gameStateInGame !== "GAME_OVER" ? "menu--hidden" : ""
        }`}>
        <h1 className="text-red-700 font-bold">Game Over</h1>
        <h2>Score: {localGet()?.score || "0"}</h2>
        <h3 className="text-center">
          Meilleur Score:{" "}
          {JSON.parse(localStorage.getItem("GAME1"))?.bestScore || "0"}
        </h3>
        <button onClick={playAgain} disabled={gameStateInGame !== "GAME_OVER"}>
          Play again
        </button>
        <button
          onClick={() =>
            goToMenu({game: "GAME1", score: localGet()?.score || "0"})
          }
          disabled={gameStateInGame !== "GAME_OVER"}>
          Go to menu
        </button>
      </div>
    </Html>
  );
};

export default HUD;
