"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

/**
 * Componente TAO-095: Planeta com 7 luas orbitando
 * Cor customizada: #126127 (verde escuro COMP/CON)
 */

const HORUS_COLOR = "#126127";

export function Tao095Planet() {
  const planetRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.001;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group>
      {/* Atmosfera do planeta */}
      <mesh ref={atmosphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshBasicMaterial
          color={HORUS_COLOR}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Planeta principal TAO-095 */}
      <mesh ref={planetRef} position={[0, 0, 0]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color={HORUS_COLOR} wireframe />
      </mesh>

      {/* Anéis equatoriais */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.02, 16, 64]} />
        <meshBasicMaterial color={HORUS_COLOR} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.8, 0.015, 16, 64]} />
        <meshBasicMaterial color={HORUS_COLOR} opacity={0.5} transparent />
      </mesh>
    </group>
  );
}

interface MoonProps {
  name: string;
  distance: number;
  size: number;
  speed: number;
  tilt?: number;
}

export function Moon({ name, distance, size, speed, tilt = 0 }: MoonProps) {
  const moonRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const labelRef = useRef<THREE.Sprite>(null);

  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += speed;
    }
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.02;
    }
  });

  // Criar textura do canvas para o label
  const createLabelTexture = (text: string) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return null;

    canvas.width = 256;
    canvas.height = 64;

    context.fillStyle = HORUS_COLOR;
    context.font = "bold 24px monospace";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, 128, 32);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  const labelTexture = createLabelTexture(name);

  return (
    <group ref={orbitRef} rotation={[tilt, 0, 0]}>
      {/* Órbita da lua */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[distance, 0.01, 8, 64]} />
        <meshBasicMaterial color={HORUS_COLOR} opacity={0.3} transparent />
      </mesh>

      {/* Lua */}
      <mesh ref={moonRef} position={[distance, 0, 0]}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={HORUS_COLOR} wireframe />
      </mesh>

      {/* Label da lua */}
      {labelTexture && (
        <sprite ref={labelRef} position={[distance, size + 0.3, 0]} scale={[1, 0.25, 1]}>
          <spriteMaterial map={labelTexture} transparent opacity={0.8} />
        </sprite>
      )}
    </group>
  );
}

export function Tao095System() {
  const moons = [
    { name: "ANUBIS", distance: 5, size: 0.25, speed: 0.008, tilt: 0 },
    { name: "OSIRIS", distance: 6.5, size: 0.3, speed: 0.006, tilt: 0.1 },
    { name: "SETH", distance: 8, size: 0.22, speed: 0.005, tilt: -0.08 },
    { name: "THOTH", distance: 9.5, size: 0.28, speed: 0.004, tilt: 0.12 },
    { name: "RA", distance: 11, size: 0.35, speed: 0.0035, tilt: -0.05 },
    { name: "ISIS", distance: 12.8, size: 0.27, speed: 0.003, tilt: 0.15 },
    { name: "NEPHTHYS", distance: 14.5, size: 0.24, speed: 0.0025, tilt: -0.1 },
  ];

  return (
    <group>
      <Tao095Planet />
      {moons.map((moon) => (
        <Moon
          key={moon.name}
          name={moon.name}
          distance={moon.distance}
          size={moon.size}
          speed={moon.speed}
          tilt={moon.tilt}
        />
      ))}
    </group>
  );
}
