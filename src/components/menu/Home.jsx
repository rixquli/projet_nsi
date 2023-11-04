import React from "react";
import {useGameStore} from "../../store.js";

const Home = () => {
  const {goToGamesList} = useGameStore();
  return (
    <div className="menu">
      <h1>Best Game</h1>
      <button onClick={goToGamesList}>Jouer</button>
      <button>Autre</button>
    </div>
  );
};

export default Home;
