import {useThree} from "@react-three/fiber";
import {useEffect} from "react";
import {CubeTextureLoader} from "three";

const Skybox = ({ paths }) => {
  const { scene } = useThree();

  useEffect(() => {
    const loader = new CubeTextureLoader();
    const mat = loader.load(paths);
    scene.background = mat;
    scene.environment = mat;
  }, [paths, scene.background]);

  return null;
};

export default Skybox;
