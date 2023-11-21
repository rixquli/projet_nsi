import * as THREE from "three";
import React, {useRef, useEffect, useState, memo} from "react";
import {useFrame} from "@react-three/fiber";
import {useGameStore} from "../store.js";

const areEqual = (a, b) => true;

const ParticleSystem = ({position, color, callBack}) => {
  const particleRef = useRef();
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.2,
    color: color,
  });

  // console.log(particlesMaterial);

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
  useFrame(({scene}) => {
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
        // console.log(particlePositions);
        // Remove the old particle system
        particleRef.current.geometry.dispose();
        particleRef.current.material.dispose();
        scene.remove(particleRef.current);
        particleRef.current.removeFromParent();
        particleRef.current = null;
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

  const [currentColor, setCurrentColor] = useState(new THREE.Color());
  useEffect(() => {
    console.log("e");
  });

  // useEffect(() => {
  //   console.log(particle);
  //   // restartParticles();
  //   setCurrentColor()
  // }, [particle]);

  // const [showParticle, setShowParticle] = useState(false);

  useEffect(() => {
    console.log(particle);
    if (particle?.isCorrect != null) {
      setCurrentColor(
        particle?.isCorrect
          ? new THREE.Color(0x00ff00)
          : new THREE.Color(0xff0000)
      );
      // restartParticles();
    }
  }, [particle]);

  // console.log(showParticle);

  // if (!particle) return null;

  return (
    <>
      <ParticleSystem
        position={new THREE.Vector3().addVectors(
          new THREE.Vector3(0, 5, 0),
          particle?.position || new THREE.Vector3(0, 0, 0)
        )}
        color={currentColor}
      />
    </>
  );
};

const ExplosionParticles = ({position}) => {
  const particlesRef = useRef();
  const particles = [];
  const numParticles = 100;
  const positions = new Float32Array(numParticles * 3);
  const colors = new Float32Array(numParticles * 3);
  const lifetimes = new Float32Array(numParticles);
  const [go, setGo] = useState(false);

  // Initialisez les particules avec des positions, couleurs et durées de vie aléatoires

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("color", new BufferAttribute(colors, 3));

  const material = new PointsMaterial({size: 0.1, vertexColors: true});

  useFrame(() => {
    if (!go) return;
    // console.log("e");
    const time = performance.now();

    for (let i = 0; i < numParticles; i++) {
      lifetimes[i] = Math.random() * 3;
    }

    for (let i = 0; i < numParticles; i++) {
      if (lifetimes[i] > 0) {
        // Réduisez la durée de vie de la particule
        lifetimes[i] -= 0.01;

        // Calculez la nouvelle position de la particule (mouvement)
        positions[i * 3] += Math.random() * 0.1 - 0.05; // Variation aléatoire en x
        positions[i * 3 + 1] += Math.random() * 0.1 - 0.05; // Variation aléatoire en y
        positions[i * 3 + 2] += Math.random() * 0.1 - 0.05; // Variation aléatoire en z

        // console.log(positions);

        // Mettez à jour la couleur de la particule si nécessaire
        // ...
      } else {
        positions.splice(3, i);
        colors.splice(3, i);
      }
    }

    // Mettez à jour les attributs de la géométrie en fonction des particules
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  });

  useEffect(() => {
    setGo(true);
    return () => setGo(false);
  }, []);

  useEffect(() => {
    console.log("e");
  });

  return (
    <points
      ref={particlesRef}
      geometry={geometry}
      material={material}
      position={position}
    />
  );
};

export default ParticleSystem;
