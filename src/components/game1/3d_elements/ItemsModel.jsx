import {useGLTF} from "@react-three/drei";
import {useEffect} from "react";

export default function ItemsModel({id}) {
  // Load models
  const {scene} = useGLTF("/models/low_poly_recycle_props.glb");
  scene.children = [scene.children[0]];

  const getObject = () => {
    const children = scene.children[0].children[0].children[0].children;
    console.log(children);

    // Loop through all children and set their visibility
    children.forEach((child) => {
      if (child.name === id) {
        // Show the child with a matching name
        child.visible = true;
      } else {
        // Hide all other children
        child.visible = false;
      }
    });
  };

  useEffect(() => {
    getObject();
  }, [id]);

  // console.log(scene);

  return <primitive object={scene} />;
}
