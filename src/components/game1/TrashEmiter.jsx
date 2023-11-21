import {Html, PointMaterial, Points, useTexture} from "@react-three/drei";
import {useState} from "react";
import {MathUtils, Vector3} from "three";
import {TrashEmitterSpark} from "./TrashEmitterSpark";
import StarTexture from "/images/green_star.png";

const TrashEmiter = ({position, score}) => {
  const [sparkCount] = useState(50);
  const [opacity, setOpacity] = useState(1);
  const texture = useTexture(StarTexture);
  return (
    <group position={position} scale={3}>
      <Points>
        <PointMaterial size={0.5} transparent opacity={opacity} map={texture} />
        {Array.from({length: sparkCount}, (_, i) => (
          <TrashEmitterSpark
            key={`TrashEmitterSpark_${i}_positionY_${position.y}_positionX_${position.x}`}
            sparkCount={sparkCount}
            index={i}
            setOpacity={setOpacity}
          />
        ))}
      </Points>
      <Html style={{opacity: MathUtils.clamp(opacity * 1.3, 0, 2)}}>
        |<span style={{color: "white", fontSize: "1.75rem"}}>{score}</span>
      </Html>
    </group>
  );
};
export default TrashEmiter;
