import React from "react";
import {gamesAssets} from "../../store.js";
import GameCard from "./GameCard.jsx";

const GamesList = () => {
  return (
    <div className="fixed top-0 left-0 m-12 mt-24 ">
      <h1 className="text-5xl text-center" >Liste des jeux</h1>
      <div className="grid grid-cols-4 gap-4 p-5 mt-5 bg-slate-500 rounded-md">
        {gamesAssets.map((game, index) => (
          <GameCard game={game} key={index} />
        ))}
      </div>
    </div>
  );
};

export default GamesList;
