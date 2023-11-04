import {Vector3} from "three";
import {create} from "zustand";
import {subscribeWithSelector} from "zustand/middleware";

export const gameStates = {
  HOME_PAGE: "HOME_PAGE",
  GAMES_LIST: "GAMES_LIST",
  MENU: "MENU",
  GAME: "GAME",
};

export const games = {
  ["GAME1"]: "GAME1",
};

export const gamesAssets = [
  {
    name: "GAME1",
    img: "/images/game1.jfif",
  },
];

export const playAudio = (path, callback) => {
  const audio = new Audio(`./sounds/${path}.mp3`);
  if (callback) {
    audio.addEventListener("ended", callback);
  }
  audio.play();
};

const trashPosition = {
  trash_blue: new Vector3(0, 3, 0),
  trash_green: new Vector3(0, 0, 0),
  trash_black: new Vector3(0, 3, 0),
};

const itemToThrow = [
  {
    name: "bucket_5",
    trash: "trash_yellow",
    displayName: "Seau",
  },
  {
    name: "cardboard_box_2",
    trash: "trash_yellow",
    displayName: "Boîte en carton",
  },
  {
    name: "glass_bottle_3",
    trash: "trash_green",
    displayName: "Bouteille en verre",
  },
  {
    name: "glass_shards_4",
    trash: "trash_black",
    displayName: "Éclats de verre",
  },
  {
    name: "jar_8",
    trash: "trash_green",
    displayName: "Pot en verre",
  },
  {
    name: "newspaper_0",
    trash: "trash_yellow",
    displayName: "Journal",
  },
  {
    name: "paper_bag_7",
    trash: "trash_yellow",
    displayName: "Sac en papier",
  },
  {
    name: "plastic_container_6",
    trash: "trash_yellow",
    displayName: "Contenant en plastique",
  },
  {
    name: "water_bottle_1",
    trash: "trash_yellow",
    displayName: "Bouteille d'eau",
  },
];

export const useGameStore = create(
  subscribeWithSelector((set, get) => ({
    gameState: gameStates.HOME_PAGE,
    cameraPosition: [0, 10, -10],
    startGame: (game) => {
      set({
        gameState: gameStates.GAME,
        games: games[game],
      });
      get().localSet({gameStateInGame: "INITIALIZATION"});
    },
    goToGamesList: () => {
      set({
        gameState: gameStates.GAMES_LIST,
      });
    },
    goToMenu: () => {
      set({
        gameState: gameStates.HOME_PAGE,
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
        gameStateInGame: "GAME",
        itemInTrash: false,
        itemToThrow:
          itemToThrow[Math.floor(Math.random() * itemToThrow.length)],
        initialization: () => {
          if (get().localGet().score > 0) {
            // Récupérer les données du meilleur score depuis le stockage local
            const bestScoreData = JSON.parse(localStorage.getItem("GAME1"));

            // Si aucune donnée n'existe pour ce jeu ou si le score actuel est supérieur au meilleur score enregistré
            if (!bestScoreData || score > bestScoreData.bestScore) {
              // Mettre à jour le meilleur score dans le stockage local
              localStorage.setItem("GAME1", JSON.stringify({bestScore: score}));
            }
          }
          get().localSet({
            score: 0,
            itemToThrow:
              itemToThrow[Math.floor(Math.random() * itemToThrow.length)],
            gameStateInGame: "GAME",
          });
        },
        itemEnterTrash: (trash) => {
          // if (get().localGet().itemInTrash) {
          // playAudio("congratulations");
          if (!get().localGet().itemInTrash) {
            get().localSet({itemInTrash: true});
            get().localGet().nextItem(trash);
          }
        },
        nextItem: (trash) => {
          console.log("nextItem");
          // Si bonne poubelle alors ajoute 1 point
          if (
            itemToThrow.find((e) => e.name == get().localGet().itemToThrow.name)
              .trash == trash
          ) {
            get().localSet({
              itemToThrow:
                itemToThrow[Math.floor(Math.random() * itemToThrow.length)],
              score: get().localGet().score + 1,
            });
            // get().localGet().doParticle(trash, true);
            get().localGet().restartItem();
          } else {
            get().localGet().gameOver();
          }

          // To prevent bugs
          setTimeout(() => {
            get().localSet({itemInTrash: false});
          }, 100);
        },
        doParticle: (trash, isCorrect) => {
          get().localSet({
            particle: {position: trashPosition[trash], isCorrect: isCorrect},
          });
        },
        restartParticles: () => {
          get().localSet({
            particle: {position: [0, 0, 0], isCorrect: null},
          });
        },
        restartItem: () => {
          get().localSet({gameStateInGame: "RESTART_ITEM"});
        },
        restartItemDone: () => {
          get().localSet({gameStateInGame: "GAME"});
        },
        gameOver: () => {
          console.log("Game Over!");
          get().localSet({gameStateInGame: "GAME_OVER"});
        },
        playAgain: () => {
          console.log("Play Again!");
          get().localSet({gameStateInGame: "INITIALIZATION"});
        },
      },
    },
  }))
);
