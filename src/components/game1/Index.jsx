import React from "react";
import {Items} from "./Items.jsx";
import Trash from "./3d_elements/Trashs";

const Game1 = () => {
  return (
    <>
      <Trash name={"trash_black"} pos={[-3, 0, 0]} />
      <Trash name={"trash_blue"} pos={[3, 0, 0]} />
      <Trash name={"trash_green"} pos={[0, 0, 0]} />

      <Items />
    </>
  );
};

export default Game1;
