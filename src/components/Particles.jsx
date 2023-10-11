import React, {useRef, useEffect, useState} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {useGameStore} from "../store.js";

const ParticleSystem = ({position, color, callBack}) => {
  const particleRef = useRef();
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.2,
    color: color,
  });

  console.log(particlesMaterial);

  const particleCount = 100; // Number of particles
  const positions = [];

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 0.2; // Adjust the spread of particles
    const y = (Math.random() - 0.5) * 0.2;
    const z = (Math.random() - 0.5) * 0.2;
    positions.push(x, y, z);
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  // Use the useFrame hook for particle animation
  useFrame(() => {
    if (particleRef.current) {
      let particlePositions =
        particleRef.current.geometry.attributes.position.array;
      const particleCount = particlePositions.length / 3; // Number of particles

      for (let i = 0; i < particleCount; i++) {
        // Update particle positions for outward movement
        const x = particlePositions[i * 3];
        const y = particlePositions[i * 3 + 1];
        const z = particlePositions[i * 3 + 2];

        // Adjust the speed and direction of particle movement as needed
        const speed = 0.5;
        particlePositions[i * 3] += x * speed;
        particlePositions[i * 3 + 1] += y * speed;
        particlePositions[i * 3 + 2] += z * speed;
      }

      // Update the particle positions in the geometry
      particleRef.current.geometry.attributes.position.needsUpdate = true;

      
      // Example:
      if (particlePositions[0] > 2) {
        console.log(particlePositions);
        // Remove the old particle system
        // particleRef.current.geometry.dispose();
        // particleRef.current.material.dispose();
        // scene.remove(particleRef.current);
        // particleRef.current = null;
        particleRef.current.removeFromParent()
        console.log("callback");
        console.log(callBack);
        if (callBack) callBack();
        console.log("fin callback");
      }
    }
  });

  return (
    <points ref={particleRef} position={position} material={particlesMaterial}>
      <primitive object={particlesGeometry} />
    </points>
  );
};

const CongratulationsEffect = () => {
  const {particle, restartParticles} = useGameStore((state) => ({
    particle: state.gameData["GAME1"].particle,
    restartParticles: state.gameData["GAME1"].restartParticles,
  }));

  const [showParticle, setShowParticle] = useState(false);
  const [hideParticle, setHideParticle] = useState(false);
  const [currentColor, setCurrentColor] = useState(new THREE.Color());

  useEffect(() => {
    console.log(particle);
    if (particle?.isCorrect != null) {
      setShowParticle(true);
      setCurrentColor(
        particle?.isCorrect
          ? new THREE.Color(0x00ff00)
          : new THREE.Color(0xff0000)
      );
      // restartParticles();
    } else {
      setShowParticle(false);
    }
  }, [particle]);

  useEffect(() => {
    setShowParticle(false);
    setHideParticle(false); // Reset hideParticle to false after hiding the particle effect
    // This code will run when hideParticle is set to true
    if (hideParticle) {
      // setTimeout(() => {
      // }, 1000); // Hide the particle effect after 3 seconds
    }
  }, [hideParticle]);

  // Function to hide the particle effect when needed
  const hideParticleEffect = () => {
    // Set hideParticle to true to start the hiding process
    setHideParticle(true);
  
    // Use setTimeout to hide the particle effect after a delay (e.g., 1000 milliseconds or 1 second)
    setTimeout(() => {
      setHideParticle(false); // Reset hideParticle to false after hiding the particle effect
      restartParticles(); // Restart particles or perform any other necessary actions
    }, 1000); // Adjust the delay time as needed
  };
  // const explosionColor = particle?.isCorrect
  //   ? new THREE.Color(0x00ff00)
  //   : new THREE.Color(0xff0000); // Green for correct, red for wrong

  // console.log("CongratulationsEffect");
  // console.log(particle);
  console.log(showParticle);

  // if (!particle) return null;

  return (
    <>
      {showParticle && (
        <ParticleSystem
          position={new THREE.Vector3().addVectors(
            new THREE.Vector3(0, 5, 0),
            particle?.position || new THREE.Vector3(0, 0, 0)
          )}
          color={currentColor}
          callBack={hideParticleEffect}
        />
      )}
    </>
  );
};

export default CongratulationsEffect;
