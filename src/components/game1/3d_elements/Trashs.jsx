import {CuboidCollider, RigidBody} from "@react-three/rapier";
import {useGLTF} from "@react-three/drei";
import {useEffect, useState} from "react";
import * as THREE from "three";
import {itemToThrow, useGameStore} from "../../../store.js";
import {useLoader} from "@react-three/fiber";
import TrashEmiter from "../TrashEmiter.jsx";

export default function Trash({name, pos}) {
  // Load models
  const {gameData} = useGameStore((state) => ({
    gameData: state.gameData["GAME1"],
  }));
  const object = useGLTF(`/models/${name}.glb`);
  const [itemIsInTrash, setItemIsInTrash] = useState(null);

  useEffect(() => {
    console.log(itemIsInTrash);
    if (itemIsInTrash!==null) {
      setTimeout(() => setItemIsInTrash(null), 500);
    }
  }, [itemIsInTrash]);

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

  // Create materials with textures
  const [colorMap, roughnessMap, normalMap] = useLoader(THREE.TextureLoader, [
    "/textures/15_-_Default_baseColor.png",
    "/textures/15_-_Default_metallicRoughness.png",
    "/textures/15_-_Default_normal.png",
  ]);

  return (
    <>
      <group position={pos}>
        <RigidBody type="fixed" colliders="trimesh" rotation={[0, Math.PI, 0]}>
          <primitive object={object.scene} />
        </RigidBody>
        <RigidBody
          colliders={false}
          type="fixed"
          name="inTrash"
          onIntersectionEnter={(e) => {
            if (e.colliderObject.name == "item") {
              console.log(name);
              console.log(e);
              // playAudio("ball_in_cup");
              gameData.itemEnterTrash(name);
              setItemIsInTrash(
                itemToThrow.find((e) => e.name == gameData.itemToThrow.name)
                  .trash == name
              );
            }
          }}>
          <mesh
            position={[0, 4, 0.5]}
            rotation={[-Math.PI / 2, 0, 0]}
            visible={true}>
            <planeGeometry args={[2.4, 2.5]} />
            <meshStandardMaterial
              map={colorMap}
              normalMap={normalMap}
              roughnessMap={roughnessMap}
            />
          </mesh>
          <CuboidCollider
            position={[0, 4, 0.5]}
            args={[1.2, 0.1, 1.25]}
            sensor
          />
        </RigidBody>
      </group>
      {itemIsInTrash && (
        <TrashEmiter
          score={20}
          position={new THREE.Vector3().addVectors(
            new THREE.Vector3(...pos),
            new THREE.Vector3(0, 5, 0)
          )}
        />
      )}
    </>
  );
}
