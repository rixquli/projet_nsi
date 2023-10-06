import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function ExampleObject() {
  // Load models
  const object = useGLTF("/models/low_poly_city.glb");

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
    <RigidBody type="fixed" colliders="trimesh" position={[0, 0, 0]} scale={[0.01,0.01,0.01]} >
      <primitive object={object.scene} />
    </RigidBody>
  );
}
