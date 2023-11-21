import {Vector3} from "three";
import {create} from "zustand";
import {subscribeWithSelector} from "zustand/middleware";
import {useScoreMultiplierStore} from "./components/game1/useScoreMultiplier.jsx";

// Définition des états possibles du jeu
export const gameStates = {
  HOME_PAGE: "HOME_PAGE",
  GAMES_LIST: "GAMES_LIST",
  MENU: "MENU",
  GAME: "GAME",
};

// Définition des noms des jeux (uniquement "GAME1" dans cet exemple)
export const games = {
  ["GAME1"]: "GAME1",
};

// Informations sur les actifs des jeux (images, etc.)
export const gamesAssets = [
  {
    name: "GAME1",
    img: "/images/game1.jfif",
  },
];

// Fonction pour jouer un fichier audio
export const playAudio = (path, callback) => {
  const audio = new Audio(`./sounds/${path}.mp3`);
  if (callback) {
    audio.addEventListener("ended", callback);
  }
  audio.play();
};

// Positions de la poubelle pour différents types de déchets
const trashPosition = {
  trash_yellow: new Vector3(0, 3, 0),
  trash_green: new Vector3(0, 0, 0),
  trash_black: new Vector3(0, 3, 0),
};

// Liste des objets à lancer
export const itemToThrow = [
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

// Création d'un magasin de données avec Zustand
export const useGameStore = create(
  // Utilisation de subscribeWithSelector pour gérer l'état
  subscribeWithSelector((set, get) => ({
    // État initial du jeu
    gameState: gameStates.HOME_PAGE,
    cameraPosition: [0, 10, -10],

    // Fonction pour démarrer un jeu spécifique
    startGame: (game) => {
      set({
        gameState: gameStates.GAME,
        games: games[game],
      });
      get().localSet({gameStateInGame: "INITIALIZATION"});
    },

    // Fonction pour passer à la liste des jeux
    goToGamesList: () => {
      set({
        gameState: gameStates.GAMES_LIST,
      });
    },

    // Fonction pour revenir au menu principal
    goToMenu: () => {
      set({
        gameState: gameStates.HOME_PAGE,
      });
    },

    // Fonction pour définir l'état de la souris enfoncée
    setIsMouseDown: (bool) => {
      set({isMouseDown: bool});
    },

    // Fonction pour définir l'état local du jeu
    localSet: (props) => {
      const game = get().games;
      set((state) => {
        const newGameData = {
          ...state.gameData,
          [game]: {...state.gameData[game], ...props},
        };
        const newState = {...state, gameData: newGameData};
        return newState;
      });
    },

    // Fonction pour obtenir l'état local du jeu
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
          get().localGet().bestScore();
          get().localSet({
            score: 0,
            itemToThrow:
              itemToThrow[Math.floor(Math.random() * itemToThrow.length)],
            gameStateInGame: "RESTART_ITEM",
          });
        },
        bestScore: () => {
          let score = get().localGet().score;
          if (score > 0) {
            // Récupérer les données du meilleur score depuis le stockage local
            const bestScoreData = JSON.parse(
              localStorage.getItem("GAME1")
            ).bestScore;

            // Si aucune donnée n'existe pour ce jeu ou si le score actuel est supérieur au meilleur score enregistré
            if (!bestScoreData || score > bestScoreData) {
              // Mettre à jour le meilleur score dans le stockage local
              localStorage.setItem("GAME1", JSON.stringify({bestScore: score}));
            }
          }
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
          const goodTrash =
            itemToThrow.find((e) => e.name == get().localGet().itemToThrow.name)
              .trash == trash;
          if (goodTrash) {
            console.log(
              itemToThrow[Math.floor(Math.random() * itemToThrow.length)]
            );

            let score = get().localGet().score;
            get().localSet({
              itemToThrow:
                itemToThrow[Math.floor(Math.random() * itemToThrow.length)],
              score: score + useScoreMultiplierStore.getState().scoreMultiplier,
            });
            get().localGet().bestScore();
            get().localGet().restartItem();
            useScoreMultiplierStore.getState().setItemInTrash(true);
            // get().localGet().doParticle(trash, true);
          } else {
            get().localGet().gameOver();
          }

          // To prevent bugs
          setTimeout(() => {
            get().localSet({
              itemInTrash: false,
              particle: {
                position: trashPosition[trash],
                isCorrect: goodTrash,
              },
            });
          }, 100);
        },
        doParticle: (trash, isCorrect) => {
          console.log(trashPosition[trash]);
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
