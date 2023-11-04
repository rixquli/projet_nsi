import {Html} from "@react-three/drei";
import React from "react";
import {useGameStore} from "../../store.js";

const HUD = () => {
  const {gameStateInGame, playAgain, goToMenu, localGet} = useGameStore(
    (state) => ({
      gameStateInGame: state.gameData["GAME1"].gameStateInGame,
      playAgain: state.gameData["GAME1"].playAgain,
      goToMenu: state.goToMenu,
      localGet: state.localGet,
    })
  );
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
