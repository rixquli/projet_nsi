import React from "react";
import {gameStates, useGameStore} from "../../store.js";

export const Menu = () => {
  const {startGame, games, gameState, goToMenu, localGet} = useGameStore();

  console.log(gameState);

  return (
    <>
      <div
        className={`menu ${
          gameState !== gameStates.MENU ? "menu--hidden" : ""
        }`}>
        <h1>Best Game</h1>
        <button
          disabled={gameState !== gameStates.MENU}
          onClick={() => startGame({mode: "solo"})}>
          Solo
        </button>
        <button
          disabled={gameState !== gameStates.MENU}
          onClick={() => startGame({mode: "multiplayer"})}>
          Multijoueur
        </button>
      </div>
      {games == "GAME1" && (
        <>
          <div
            className={`hud text-6xl ${
              gameState !== gameStates.GAME ? "menu--hidden" : ""
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
              gameState !== gameStates.GAME_OVER ? "menu--hidden" : ""
            }`}>
            <h1 className="text-red-700 font-bold" >Game Over</h1>
            <h2>Score: {localGet()?.score || "0"}</h2>
            <h3 className="text-center" >
              Meilleur Score:{" "}
              {JSON.parse(localStorage.getItem("GAME1"))?.bestScore || "0"}
            </h3>
            <button
              onClick={() =>
                goToMenu({game: "GAME1", score: localGet()?.score || "0"})
              }
              disabled={gameState !== gameStates.GAME_OVER}>
              Play again
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Menu;
