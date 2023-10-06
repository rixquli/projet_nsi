import {BallCollider, CuboidCollider, RigidBody} from "@react-three/rapier";
import {useGLTF} from "@react-three/drei";
import {useEffect} from "react";
import * as THREE from "three";
import {useGameStore} from "../../../store.js";

export default function Trash({name, pos}) {
  // Load models
  const {gameData} = useGameStore((state) => ({
    gameData: state.gameData["GAME1"],
  }));
  const object = useGLTF(`/models/${name}.glb`);

  useEffect(() => {
    // Receive Shadows
    object.scene.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.receiveShadow = true;
      }
    });
  }, []);

  return (
    <group position={pos}>
      <RigidBody type="fixed" colliders="trimesh" rotation={[0, Math.PI, 0]}>
        <primitive object={object.scene} />
      </RigidBody>
      <RigidBody
        colliders={false}
        type="fixed"
        restitution={-9}
        friction={0}
        name={name}
        onCollisionEnter={(e) => {
          if (e.colliderObject.name == "item") {
            // playAudio("ball_in_cup");
            gameData.itemEnterTrash(name);
          }
        }}
        onCollisionExit={(e) => {
          if (e.colliderObject.name == "ball") {
            gameData.itemExitTrash(name);
          }
        }}>
        <CuboidCollider args={[0.7, 3, 0.7]} position={[0, 0.2, 1]} />
      </RigidBody>
    </group>
  );
}
