import {create} from "zustand";
import {subscribeWithSelector} from "zustand/middleware";

export const gameStates = {
  MENU: "MENU",
  GAME: "GAME",
  RESTART_ITEM: "RESTART_ITEM",
  GAME_OVER: "GAME_OVER",
};

export const games = {
  ["GAME1"]: "GAME1",
};

export const playAudio = (path, callback) => {
  const audio = new Audio(`./sounds/${path}.mp3`);
  if (callback) {
    audio.addEventListener("ended", callback);
  }
  audio.play();
};

export const itemToThrowId = [
  "bucket_5",
  "cardboard_box_2",
  "glass_bottle_3",
  "glass_shards_4",
  "jar_8",
  "newspaper_0",
  "paper_bag_7",
  "plastic_container_6",
  "water_bottle_1",
];

const itemToThrow = [
  {
    name: "bucket_5",
    trash: "trash_yellow",
  },
  {
    name: "cardboard_box_2",
    trash: "trash_green",
  },
  {
    name: "glass_bottle_3",
    trash: "trash_green",
  },
  {
    name: "glass_shards_4",
    trash: "trash_black",
  },
  {
    name: "jar_8",
    trash: "trash_green",
  },
  {
    name: "newspaper_0",
    trash: "trash_green",
  },
  {
    name: "paper_bag_7",
    trash: "trash_green",
  },
  {
    name: "plastic_container_6",
    trash: "trash_green",
  },
  {
    name: "water_bottle_1",
    trash: "trash_green",
  },
];

export const useGameStore = create(
  subscribeWithSelector((set, get) => ({
    gameState: gameStates.MENU,
    cameraPosition: [0, 10, -10],
    startGame: () => {
      set({
        gameState: gameStates.GAME,
        games: games["GAME1"],
      });
    },
    goToMenu: () => {
      set({
        gameState: gameStates.MENU,
      });
    },
    setIsMouseDown: (bool) => {
      set({isMouseDown: bool});
    },
    localSet: (props) => {
      const game = get().games;
      set((state) => {
        // Update the GAME1 object within gameData
        const newGameData = {
          ...state.gameData,
          [game]: {...state.gameData[game], ...props},
        };

        // Merge the updated gameData into the existing state
        const newState = {...state, gameData: newGameData};

        return newState;
      });
    },
    localGet: () => {
      const game = get().games;
      const gameData = get().gameData[game];
      return gameData ? gameData : undefined;
    },
    gameData: {
      ["GAME1"]: {
        score: 0,
        itemToThrowId:
        itemToThrow[Math.round(Math.random() * (itemToThrow.length - 1))].name,
        itemEnterTrash: (trash) => {
          console.log("enter");

          get().localSet({itemInTrash: true});
          setTimeout(() => {
            if (get().localGet().itemInTrash) {
              get().localSet({itemInTrash: false});
              // playAudio("congratulations");
              get().localGet().nextItem(trash);
            }
          }, 1000);
        },
        itemExitCup: () => {
          console.log("exit");
          get().localSet({itemInTrash: false});
        },
        nextItem: (trash) => {
          console.log("next");
          // Si bonne poubelle alors ajoute 1 point
          if (itemToThrow.find((e) => e.name == get().localGet().itemToThrowId).trash == trash) {
            get().localSet({
              itemToThrowId:
              itemToThrow[
                  Math.round(Math.random() * (itemToThrow.length - 1))
                ].name,
              score: get().localGet().score + 1,
            }); // Update the state with the modified array
          } else {
            get().localSet({
              itemToThrowId:
              itemToThrow[
                  Math.round(Math.random() * (itemToThrow.length - 1))
                ].name,
              score: get().localGet().score - 1,
            }); // Update the state with the modified array
          }
          get().localGet().restartItem();
        },
        restartItem: () => {
          set({gameState: gameStates.RESTART_ITEM});
        },
        restartItemDone: () => {
          set({gameState: gameStates.GAME});
        },
      },
    },
  }))
);
