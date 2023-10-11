import {useFrame, useThree} from "@react-three/fiber";
import {BallCollider, RigidBody, vec3} from "@react-three/rapier";
import {useEffect, useRef, useState} from "react";
import {Plane, Raycaster, Vector3} from "three";
import {playAudio, useGameStore} from "../../store.js";
import {useGLTF, useKeyboardControls} from "@react-three/drei";
// import {Controls} from "../../App.jsx";

export function Items() {
  const {camera} = useThree();
  const {gameState, gameData} = useGameStore((state) => ({
    gameState: state.gameState,
    games: state.games,
    gameData: state.gameData["GAME1"],
  }));
  const restartPressed = useKeyboardControls((state) => state.forward);

  const [itemPos, setItemPos] = useState(null);
  const [itemCanMove, setItemCanMove] = useState(true);
  const [canMove, setCanMove] = useState(false);
  const [touchPosition, setTouchPosition] = useState(null);
  const [isTouching, setIsTouching] = useState(false);
  const {scene} = useGLTF("/models/low_poly_recycle_props.glb");
  const body = useRef();
  // const [touchCup, setTouchCup] = useState(false);
  // viewport = canvas in 3d units (meters)

  const {isMouseDown} = useGameStore();

  const intersectionPoint = new Vector3();
  const planeNormal = new Vector3();
  const plane = new Plane();
  const raycaster = new Raycaster();

  const handleTouchMove = (event) => {
    // if (!canMove) return;

    // Obtenez la position du toucher
    const touch = event.touches[0];
    if (touch) {
      const {clientX, clientY} = touch;

      // Convertissez les coordonnées de l'écran en coordonnées relatives au canvas
      const canvas = document.querySelector("canvas"); // Remplacez le sélecteur par le vôtre
      const rect = canvas.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = (-(clientY - rect.top) / rect.height) * 2 + 1;

      // Mettez à jour la position du toucher
      setTouchPosition({x, y});
    }
  };

  const resetPosition = () => {
    const position = new Vector3().addVectors(
      camera.position,
      new Vector3(0, -5, 5)
    );
    body.current.setTranslation(vec3(position));
    body.current.setRotation(vec3({x: 0, y: 0, z: 0}));
    body.current.setAngvel(vec3({x: 0, y: 0, z: 0}));
    body.current.setEnabled(false);
    setItemCanMove(true);
    setCanMove(true);
  };

  useFrame(({pointer}) => {
    if (!body.current || !canMove) return;

    if (isMouseDown || isTouching) {
      const inputPosition = isTouching ? touchPosition : pointer;
      if (!inputPosition) return;

      setItemCanMove(false);

      if (!body.current.isEnabled()) {
        body.current.setEnabled(true);
      }

      if (itemPos !== body.current.translation()) {
        planeNormal.copy(camera.position).normalize();
        plane.setFromNormalAndCoplanarPoint(
          planeNormal,
          new Vector3().addVectors(camera.position, new Vector3(0, -5, 3))
        );

        raycaster.setFromCamera(inputPosition, camera);
        raycaster.ray.intersectPlane(plane, intersectionPoint);

        const force = intersectionPoint
          .sub(body.current.translation())
          .multiplyScalar(9);

        // Apply the force to move the RigidBody
        body.current.setLinvel(force, {wakeUp: true});

        // Prevent default behavior for touch events to avoid scrolling or zooming
        // if (isTouching) {
        //   event.preventDefault();
        // }

        setItemPos(body.current.translation());
      }
    } else {
      if (body.current.isEnabled() && canMove) {
        setCanMove(false);
      }
    }
  });

  useEffect(() => {
    if (restartPressed) resetPosition();
  }, [restartPressed]);

  const handleTouchStart = () => {
    setIsTouching(true);
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
  };

  useEffect(() => {
    // Add touch event listeners
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      // Remove touch event listeners when the component is unmounted
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.addEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useEffect(() => {
    console.log(gameState);
    if (!canMove && gameState === "GAME") {
      setTimeout(() => {
        resetPosition();
        setCanMove(true);
      }, 500);
    } else if (gameState === "RESTART_ITEM") {
      gameData.restartItemDone();
      resetPosition();
    } else if (gameState === "MENU") {
      resetPosition();
    }
    if (body.current && body.current?.isEnabled() && itemCanMove) {
      body.current.setEnabled(false);
    }
  }, [gameState]);

  return scene.children.map((child) => {
    if (child.name != gameData.itemToThrow.name) {
      return null; // Retourne null pour les tasses qui ne sont plus dans la liste cups
    }
    return (
      <group position={new Vector3(0, 5, -5)}>
        <RigidBody
          mass={0.25}
          friction={0.01}
          ref={body}
          colliders="ball"
          restitution={1.5}
          name="item"
          onCollisionEnter={(e) => {
            if (e.rigidBodyObject.name === "floor") {
              resetPosition();
              // playAudio("pong_sound");
            }
          }}>
          <primitive object={child.clone()} />
        </RigidBody>
      </group>
    );
  });
}
