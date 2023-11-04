import React from "react";
import {useGameStore} from "../../store.js";

const GameCard = ({game}) => {
  const {startGame} = useGameStore();
  return (
      <button
        className="gameCard rounded-md p-0 hover:scale-110 transition"
        onClick={() => startGame(game.name)}>
        <img className="h-full" src={game.img} />
      </button>
  );
};

export default GameCard;
