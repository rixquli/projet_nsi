import React from "react";
import {gameStates, useGameStore} from "../../store.js";
import Home from "./Home.jsx";
import GamesList from "./GamesList.jsx";

export const Menu = () => {
  const {startGame, games, gameState, goToMenu, localGet} = useGameStore();

  const components = {
       [gameStates.HOME_PAGE]:<Home />,
       [gameStates.GAMES_LIST]: <GamesList/>,
  }

  return components[gameState];
};

export default Menu;
