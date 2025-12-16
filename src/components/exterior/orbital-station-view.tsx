"use client";

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { SmithShimanoSystem } from "./smith-shimano-view";

const stationOrbitRadius = 62;

type CameraMode = "orbital" | "livre";

/**
 * Vista exterior da Estação Orbital Smith-Shimano em órbita ao redor de DELTA-369
 * Com foco na estação, mostrando o planeta e sistema completo ao fundo
 */
export function OrbitalStationView() {
  const [cameraMode, setCameraMode] = useState<CameraMode>("orbital");

  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px] bg-black relative border border-primary">
      <Canvas>
        <PerspectiveCamera makeDefault position={[100, 60, 100]} />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          enabled={cameraMode === "livre"}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.2}
          minDistance={50}
          maxDistance={200}
          target={[0, 0, 0]}
        />
        <ambientLight intensity={0.4} />

        {/* Sistema DELTA-369 completo (planeta, sóis, luas, satélites) */}
        <SmithShimanoSystem />

        {/* Estação Orbital em destaque */}
        <OrbitalStationHighlight cameraMode={cameraMode} />

        {/* Estrelas de fundo */}
        <StarsBackground />
      </Canvas>

      {/* Botões de câmera */}
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={() =>
            setCameraMode(cameraMode === "livre" ? "orbital" : "livre")
          }
          className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm font-bold ${
            cameraMode === "orbital"
              ? "bg-primary text-black"
              : "bg-black text-primary border border-primary"
          }`}
        >
          {cameraMode === "orbital" ? "CAM ORBITAL" : "CAM LIVRE"}
        </button>
      </div>

      <div className="absolute top-2 left-2 text-primary text-xs md:text-sm pointer-events-none">
        <p>DELTA-369 // ESTAÇÃO ESPACIAL SHIMANO</p>
        <p className="text-primary/70">ALTITUDE: 450km | VELOCIDADE: 7.8 km/s</p>
      </div>
    </div>
  );
}

function OrbitalStationHighlight(props: { cameraMode: CameraMode }) {
  const stationRef = useRef<THREE.Group>(null);
  const cameraMode = props.cameraMode;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (stationRef.current) {
      // Órbita da estação (órbita mais alta)
      stationRef.current.position.x = Math.cos(time * 0.2) * stationOrbitRadius;
      stationRef.current.position.z = Math.sin(time * 0.2) * stationOrbitRadius;
      stationRef.current.position.y = Math.sin(time * 0.12) * 6;
      stationRef.current.rotation.y = time * 0.15;

      // CAM-ORBITAL: câmera segue a estação mantendo distância
      if (cameraMode === "orbital") {
        const stationPos = stationRef.current.position;
        const cameraDistance = 40;
        const cameraX = stationPos.x + Math.cos(time * 0.1) * cameraDistance;
        const cameraY = stationPos.y + 20;
        const cameraZ = stationPos.z + Math.sin(time * 0.1) * cameraDistance;

        state.camera.position.lerp(
          new THREE.Vector3(cameraX, cameraY, cameraZ),
          0.05
        );
        state.camera.lookAt(stationPos.x, stationPos.y, stationPos.z);
      }
    }
  });

  return (
    <group ref={stationRef}>
      {/* Toro externo - aumentado para destaque */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.35, 16, 64]} />
        <meshBasicMaterial color="#00ffff" wireframe={true} opacity={1} transparent />
      </mesh>

      {/* Hub central */}
      <mesh>
        <cylinderGeometry args={[1, 1, 2.5, 16]} />
        <meshBasicMaterial color="#00ffff" wireframe={true} />
      </mesh>

      {/* Painéis radiais - aumentados */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={`panel-${i}`} rotation={[0, (i * Math.PI) / 2, 0]} position={[0, 0, 0]}>
          <boxGeometry args={[0.3, 1, 6.5]} />
          <meshBasicMaterial color="#00ff88" wireframe={true} opacity={0.9} transparent />
        </mesh>
      ))}

      {/* Módulos de acoplagem - maiores */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const r = 5;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        return (
          <mesh key={`dock-${i}`} position={[x, 0, z]} rotation={[0, angle, 0]}>
            <boxGeometry args={[0.8, 0.6, 1.5]} />
            <meshBasicMaterial color="#00ffcc" wireframe={true} />
          </mesh>
        );
      })}

      {/* Antenas / feixes - mais visíveis */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={`antenna-${i}`} rotation={[0, (i * Math.PI * 2) / 4, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 8, 8]} />
          <meshBasicMaterial color="#00ff00" wireframe={true} />
        </mesh>
      ))}

      {/* Painéis solares */}
      <mesh position={[6, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.3, 3, 8]} />
        <meshBasicMaterial color="#ffff00" wireframe={true} />
      </mesh>
      <mesh position={[-6, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.3, 3, 8]} />
        <meshBasicMaterial color="#ffff00" wireframe={true} />
      </mesh>

      {/* Estrutura de suporte - mais detalhada */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`support-${i}`} rotation={[0, (i * Math.PI) / 3, Math.PI / 6]}>
          <cylinderGeometry args={[0.15, 0.15, 4, 4]} />
          <meshBasicMaterial color="#00ccff" wireframe={true} />
        </mesh>
      ))}
    </group>
  );
}

function StarsBackground() {
  const starsRef = useRef<THREE.Points>(null);
  const starPositions = new Float32Array(1500 * 3);

  for (let i = 0; i < 1500; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 500;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 500;
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 500;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(starPositions, 3)
  );

  return (
    <points ref={starsRef} geometry={geometry}>
      <pointsMaterial size={0.4} color="#ffffff" transparent opacity={0.9} />
    </points>
  );
}
