import React, {useRef, useEffect} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";

const ParticleSystem = ({position, color}) => {
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
      const particlePositions =
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
        particleRef.current.removeFromParent();
      }
    }
  });

  return (
    <points ref={particleRef} position={position} material={particlesMaterial}>
      <primitive object={particlesGeometry} />
    </points>
  );
};

const CongratulationsEffect = ({isCorrect, position}) => {
  const explosionColor = isCorrect
    ? new THREE.Color(0x00ff00)
    : new THREE.Color(0xff0000); // Green for correct, red for wrong

  return <ParticleSystem position={position} color={explosionColor} />;
};

export default CongratulationsEffect;
