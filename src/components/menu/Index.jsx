import React from "react";
import {gameStates, useGameStore} from "../../store.js";

export const Menu = () => {
  const {startGame, gameState, goToMenu, score,localGet, restartBall} = useGameStore();
  
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
      <div
        className={`hud text-6xl ${gameState !== gameStates.GAME ? "hud--hidden" : ""}`}>
        <h1 className="score">{localGet()?.score || "0"}</h1>
        {/* <button className="restartPosition">
          Restart <br /> Position
        </button> */}
      </div>
      <div
        className={`scores ${
          gameState !== gameStates.GAME_OVER ? "scores--hidden" : ""
        }`}>
        <h1>Congratulations you are becoming a true master</h1>
        <button
          onClick={goToMenu}
          disabled={gameState !== gameStates.GAME_OVER}>
          Play again
        </button>
      </div>
    </>
  );
};

export default Menu;
