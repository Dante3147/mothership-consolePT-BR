"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const planetRadius = 12; // Mega planeta maior
const moonRadius = 1.2;
const satelliteRadius = 0.5;

// Distâncias orbitais
const redSunDistance = 150;
const yellowSunDistance = 200;
const moonOrbitRadius1 = 20;
const moonOrbitRadius2 = 28;
const moonOrbitRadius3 = 35;
const satelliteOrbitRadius1 = 42;
const satelliteOrbitRadius2 = 48;
const satelliteOrbitRadius3 = 54;
const stationOrbitRadius = 62;

/**
 * Sistema Smith-Shimano Mega-Planet C
 * Planeta gigante com dois sóis (vermelho e amarelo), luas naturais e satélites artificiais
 */
export function SmithShimanoSystem() {
  const planetRef = useRef<THREE.Mesh>(null);
  const redSunRef = useRef<THREE.Mesh>(null);
  const yellowSunRef = useRef<THREE.Mesh>(null);
  
  // Referências das luas naturais
  const moon1Ref = useRef<THREE.Mesh>(null);
  const moon2Ref = useRef<THREE.Mesh>(null);
  const moon3Ref = useRef<THREE.Mesh>(null);
  
  // Referências dos satélites artificiais
  const satellite1Ref = useRef<THREE.Mesh>(null);
  const satellite2Ref = useRef<THREE.Mesh>(null);
  const satellite3Ref = useRef<THREE.Mesh>(null);
  const stationRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotação do planeta
    if (planetRef.current) {
      planetRef.current.rotation.y = time * 0.15;
    }

    // Rotação dos sóis
    if (redSunRef.current) {
      redSunRef.current.rotation.y = time * 0.1;
    }
    if (yellowSunRef.current) {
      yellowSunRef.current.rotation.y = time * 0.12;
    }

    // Órbita das luas naturais
    if (moon1Ref.current) {
      moon1Ref.current.position.x = Math.cos(time * 0.5) * moonOrbitRadius1;
      moon1Ref.current.position.z = Math.sin(time * 0.5) * moonOrbitRadius1;
      moon1Ref.current.position.y = Math.sin(time * 0.3) * 2;
    }
    if (moon2Ref.current) {
      moon2Ref.current.position.x = Math.cos(time * 0.4 + 2) * moonOrbitRadius2;
      moon2Ref.current.position.z = Math.sin(time * 0.4 + 2) * moonOrbitRadius2;
      moon2Ref.current.position.y = Math.cos(time * 0.35) * 3;
    }
    if (moon3Ref.current) {
      moon3Ref.current.position.x = Math.cos(time * 0.35 + 4) * moonOrbitRadius3;
      moon3Ref.current.position.z = Math.sin(time * 0.35 + 4) * moonOrbitRadius3;
      moon3Ref.current.position.y = Math.sin(time * 0.4) * 4;
    }

    // Órbita dos satélites artificiais
    if (satellite1Ref.current) {
      satellite1Ref.current.position.x = Math.cos(time * 0.8) * satelliteOrbitRadius1;
      satellite1Ref.current.position.z = Math.sin(time * 0.8) * satelliteOrbitRadius1;
      satellite1Ref.current.rotation.z = time * 2;
    }
    if (satellite2Ref.current) {
      satellite2Ref.current.position.x = Math.cos(time * 0.7 + 2.1) * satelliteOrbitRadius2;
      satellite2Ref.current.position.z = Math.sin(time * 0.7 + 2.1) * satelliteOrbitRadius2;
      satellite2Ref.current.rotation.z = time * 2;
    }
    if (satellite3Ref.current) {
      satellite3Ref.current.position.x = Math.cos(time * 0.65 + 4.2) * satelliteOrbitRadius3;
      satellite3Ref.current.position.z = Math.sin(time * 0.65 + 4.2) * satelliteOrbitRadius3;
      satellite3Ref.current.rotation.z = time * 2;
    }

    // Órbita da estação espacial (órbita mais alta)
    if (stationRef.current) {
      stationRef.current.position.x = Math.cos(time * 0.2) * stationOrbitRadius;
      stationRef.current.position.z = Math.sin(time * 0.2) * stationOrbitRadius;
      stationRef.current.position.y = Math.sin(time * 0.12) * 6;
      stationRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <group>
      {/* Sol Vermelho (Alpha) - Anã Vermelha */}
      <mesh ref={redSunRef} position={[-redSunDistance, 15, 0]}>
        <sphereGeometry args={[25, 20, 20]} />
        <meshBasicMaterial
          color="#ff3300"
          wireframe={true}
        />
      </mesh>
      <pointLight position={[-redSunDistance, 15, 0]} intensity={1.5} color="#ff3300" distance={200} />

      {/* Sol Amarelo (Beta) - Gigante Amarela */}
      <mesh ref={yellowSunRef} position={[yellowSunDistance, -10, 20]}>
        <sphereGeometry args={[32, 20, 20]} />
        <meshBasicMaterial
          color="#ffdd00"
          wireframe={true}
        />
      </mesh>
      <pointLight position={[yellowSunDistance, -10, 20]} intensity={2} color="#ffdd00" distance={250} />

      {/* Estação espacial em órbita alta */}
      <group ref={stationRef}>
        {/* Toro externo */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3, 0.25, 16, 64]} />
          <meshBasicMaterial color="#7cf0ff" wireframe={true} opacity={0.6} transparent />
        </mesh>

        {/* Hub central */}
        <mesh>
          <cylinderGeometry args={[0.8, 0.8, 2, 16]} />
          <meshBasicMaterial color="#7cf0ff" wireframe={true} />
        </mesh>

        {/* Painéis radiais */}
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={`panel-${i}`} rotation={[0, (i * Math.PI) / 2, 0]} position={[0, 0, 0]}>
            <boxGeometry args={[0.2, 0.8, 5]} />
            <meshBasicMaterial color="#b8f7ff" wireframe={true} opacity={0.8} transparent />
          </mesh>
        ))}

        {/* Módulos de acoplagem */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const r = 4.2;
          const x = Math.cos(angle) * r;
          const z = Math.sin(angle) * r;
          return (
            <mesh key={`dock-${i}`} position={[x, 0, z]} rotation={[0, angle, 0]}>
              <boxGeometry args={[0.6, 0.4, 1.2]} />
              <meshBasicMaterial color="#7cf0ff" wireframe={true} />
            </mesh>
          );
        })}

        {/* Antenas / feixes */}
        {Array.from({ length: 3 }).map((_, i) => (
          <mesh key={`antenna-${i}`} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 5, 8]} />
            <meshBasicMaterial color="#00e0ff" wireframe={true} />
          </mesh>
        ))}
      </group>

      {/* Mega Planeta C com pirâmides */}
      <group position={[0, 0, 0]}>
        <mesh ref={planetRef}>
          <sphereGeometry args={[planetRadius, 32, 32]} />
          <meshBasicMaterial
            color="#049492"
            wireframe={true}
          />
        </mesh>

        {/* Pirâmides na superfície - Reduzido para 35 */}
        {Array.from({ length: 35 }).map((_, i) => {
          const phi = Math.acos(-1 + (2 * i) / 35);
          const theta = Math.sqrt(35 * Math.PI) * phi;
          
          const x = planetRadius * Math.cos(theta) * Math.sin(phi);
          const y = planetRadius * Math.sin(theta) * Math.sin(phi);
          const z = planetRadius * Math.cos(phi);

          const scale = 0.3 + Math.random() * 0.4;
          
          return (
            <mesh
              key={i}
              position={[x, y, z]}
              rotation={[
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI,
              ]}
              scale={scale}
            >
              <coneGeometry args={[0.5, 1.2, 4]} />
              <meshBasicMaterial
                color="#2c03a6"
                wireframe={true}
              />
            </mesh>
          );
        })}

        {/* Prédios - Torres altas */}
        {Array.from({ length: 60 }).map((_, i) => {
          const phi = Math.acos(-1 + (2 * i) / 60);
          const theta = Math.sqrt(60 * Math.PI) * phi + 1.5;
          
          const x = (planetRadius + 0.02) * Math.cos(theta) * Math.sin(phi);
          const y = (planetRadius + 0.02) * Math.sin(theta) * Math.sin(phi);
          const z = (planetRadius + 0.02) * Math.cos(phi);

          const height = 0.6 + Math.random() * 0.8;
          const width = 0.15 + Math.random() * 0.1;
          
          return (
            <mesh
              key={`building-${i}`}
              position={[x, y, z]}
              rotation={[
                Math.atan2(y, Math.sqrt(x * x + z * z)),
                Math.atan2(x, z),
                0
              ]}
            >
              <boxGeometry args={[width, height, width]} />
              <meshBasicMaterial
                color="#049492"
                wireframe={true}
              />
            </mesh>
          );
        })}

        {/* Casas - Construções pequenas */}
        {Array.from({ length: 80 }).map((_, i) => {
          const phi = Math.acos(-1 + (2 * i) / 80);
          const theta = Math.sqrt(80 * Math.PI) * phi + 3;
          
          const x = (planetRadius + 0.01) * Math.cos(theta) * Math.sin(phi);
          const y = (planetRadius + 0.01) * Math.sin(theta) * Math.sin(phi);
          const z = (planetRadius + 0.01) * Math.cos(phi);

          const size = 0.12 + Math.random() * 0.08;
          
          return (
            <mesh
              key={`house-${i}`}
              position={[x, y, z]}
              rotation={[
                Math.atan2(y, Math.sqrt(x * x + z * z)),
                Math.atan2(x, z),
                0
              ]}
            >
              <boxGeometry args={[size, size * 0.8, size]} />
              <meshBasicMaterial
                color="#666666"
                wireframe={true}
              />
            </mesh>
          );
        })}

        {/* Mineradoras - Estruturas industriais */}
        {Array.from({ length: 25 }).map((_, i) => {
          const phi = Math.acos(-1 + (2 * i) / 25);
          const theta = Math.sqrt(25 * Math.PI) * phi + 4.5;
          
          const x = (planetRadius + 0.03) * Math.cos(theta) * Math.sin(phi);
          const y = (planetRadius + 0.03) * Math.sin(theta) * Math.sin(phi);
          const z = (planetRadius + 0.03) * Math.cos(phi);

          return (
            <group
              key={`mining-${i}`}
              position={[x, y, z]}
              rotation={[
                Math.atan2(y, Math.sqrt(x * x + z * z)),
                Math.atan2(x, z),
                0
              ]}
            >
              {/* Base da mineradora */}
              <mesh>
                <boxGeometry args={[0.35, 0.25, 0.35]} />
                <meshBasicMaterial
                  color="#666666"
                  wireframe={true}
                />
              </mesh>
              {/* Torre de perfuração */}
              <mesh position={[0, 0.3, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
                <meshBasicMaterial
                  color="#ff6600"
                  wireframe={true}
                />
              </mesh>
              {/* Luz de aviso */}
              <mesh position={[0, 0.65, 0]}>
                <sphereGeometry args={[0.05, 6, 6]} />
                <meshBasicMaterial
                  color="#ffff00"
                  wireframe={true}
                />
              </mesh>
            </group>
          );
        })}

        {/* Pirâmide Sethos - A maior (2.8km de altura) */}
        <mesh position={[0, planetRadius + 1.5, 0]} scale={2}>
          <coneGeometry args={[0.8, 2.5, 4]} />
          <meshBasicMaterial
            color="#4d1fc7"
            wireframe={true}
          />
        </mesh>
        <pointLight position={[0, planetRadius + 2, 0]} intensity={0.8} color="#2c03a6" distance={10} />

        {/* Construções - Bases */}
        {Array.from({ length: 15 }).map((_, i) => {
          const angle = (i / 15) * Math.PI * 2;
          const distance = planetRadius + 0.05;
          const x = Math.cos(angle) * distance;
          const z = Math.sin(angle) * distance;
          
          return (
            <group key={`base-${i}`} position={[x, 0, z]}>
              <mesh>
                <boxGeometry args={[0.4, 0.3, 0.4]} />
                <meshBasicMaterial
                  color="#c4c4c4"
                  wireframe={true}
                />
              </mesh>
              <mesh position={[0, 0.3, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
                <meshBasicMaterial
                  color="#2c03a6"
                  wireframe={true}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Luas Naturais */}
      <mesh ref={moon1Ref}>
        <sphereGeometry args={[moonRadius, 12, 12]} />
        <meshBasicMaterial color="#888888" wireframe={true} />
      </mesh>
      
      <mesh ref={moon2Ref}>
        <sphereGeometry args={[moonRadius * 0.8, 12, 12]} />
        <meshBasicMaterial color="#999999" wireframe={true} />
      </mesh>
      
      <mesh ref={moon3Ref}>
        <sphereGeometry args={[moonRadius * 1.1, 12, 12]} />
        <meshBasicMaterial color="#777777" wireframe={true} />
      </mesh>

      {/* Satélites Artificiais */}
      <group ref={satellite1Ref}>
        <mesh>
          <boxGeometry args={[satelliteRadius, satelliteRadius * 0.4, satelliteRadius]} />
          <meshBasicMaterial
            color="#00ff00"
            wireframe={true}
          />
        </mesh>
        <mesh position={[satelliteRadius * 0.7, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[satelliteRadius * 1.5, 0.05, satelliteRadius * 0.3]} />
          <meshBasicMaterial color="#00ff00" wireframe={true} />
        </mesh>
      </group>

      <group ref={satellite2Ref}>
        <mesh>
          <boxGeometry args={[satelliteRadius, satelliteRadius * 0.4, satelliteRadius]} />
          <meshBasicMaterial
            color="#ff0000"
            wireframe={true}
          />
        </mesh>
        <mesh position={[-satelliteRadius * 0.7, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[satelliteRadius * 1.5, 0.05, satelliteRadius * 0.3]} />
          <meshBasicMaterial color="#ff0000" wireframe={true} />
        </mesh>
      </group>

      <group ref={satellite3Ref}>
        <mesh>
          <boxGeometry args={[satelliteRadius, satelliteRadius * 0.4, satelliteRadius]} />
          <meshBasicMaterial
            color="#ffff00"
            wireframe={true}
          />
        </mesh>
        <mesh position={[0, 0, satelliteRadius * 0.7]} rotation={[Math.PI / 4, 0, 0]}>
          <boxGeometry args={[satelliteRadius * 0.3, 0.05, satelliteRadius * 1.5]} />
          <meshBasicMaterial color="#ffff00" wireframe={true} />
        </mesh>
      </group>

      {/* Anéis de órbita (guias visuais) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[moonOrbitRadius1 - 0.1, moonOrbitRadius1 + 0.1, 64]} />
        <meshBasicMaterial color="#2c03a6" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[moonOrbitRadius2 - 0.1, moonOrbitRadius2 + 0.1, 64]} />
        <meshBasicMaterial color="#030e70" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[satelliteOrbitRadius1 - 0.05, satelliteOrbitRadius1 + 0.05, 64]} />
        <meshBasicMaterial color="#2c03a6" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[stationOrbitRadius - 0.1, stationOrbitRadius + 0.1, 64]} />
        <meshBasicMaterial color="#7cf0ff" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
