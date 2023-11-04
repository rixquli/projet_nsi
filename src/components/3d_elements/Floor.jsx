import { RigidBody } from "@react-three/rapier";

export default function Floor() {
  return (
    <RigidBody name="floor" type="fixed">
      <mesh receiveShadow position={[0, -3.5, 0]}>
        <boxGeometry args={[300, 5, 300]} />
        <meshStandardMaterial visible={false} />
      </mesh>
    </RigidBody>
  );
}