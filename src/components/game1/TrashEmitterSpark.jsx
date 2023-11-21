import {Point, PositionPoint} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {Dispatch, SetStateAction, useRef, useState} from "react";

const TrashEmitterSpark = ({index, sparkCount, setOpacity}) => {
  const [timeLived, setTimeLived] = useState(0);
  const ref = useRef(null);

  const x = (Math.random() - 0.5) * 0.2; // Adjust the spread of particles
  const y = (Math.random() - 0.5) * 0.2;
  const z = (Math.random() - 0.5) * 0.2;
  useFrame(() => {
    setTimeLived((tt) => tt + 0.1 + tt * 0.1);
    setOpacity(easeOutExpo(2 - timeLived));
    if (!ref.current) {
      return;
    }
    const timeLivedToExpo = easeOutExpo(timeLived) * 20;
    ref.current.position.x = (1 + timeLivedToExpo * 0.3) * x;
    // Math.cos((2 / sparkCount) * index * Math.PI);
    ref.current.position.y = (1 + timeLivedToExpo * 0.3) * y;
    // Math.sin((2 / sparkCount) * index * Math.PI);
    ref.current.position.z = (1 + timeLivedToExpo * 0.3) * z;
  });
  return <Point ref={ref} />;
};

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -1 * x);
}
export {TrashEmitterSpark};
