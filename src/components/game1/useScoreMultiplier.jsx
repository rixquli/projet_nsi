import React, {useEffect} from "react";
import {create} from "zustand";

export const useScoreMultiplierStore = create((set) => ({
  scoreMultiplierBar: 0,
  scoreMultiplier: 1,
  itemInTrash: false,
  setScoreMultiplierBar: (nb) => set({scoreMultiplierBar: nb}),
  setScoreMultiplier: (nb) => set({scoreMultiplier: Math.min(nb, 10)}),
  setItemInTrash: (bol) => set({itemInTrash: bol}),
}));
