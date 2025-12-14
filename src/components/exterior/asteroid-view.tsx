"use client";

import { useScenario } from "@/src/context/scenario-context";
import { useMobile } from "@/src/use-mobile";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const orbitRadius = 400;

/**
 * Renders a 3D view of an asteroid with a mining facility.
 *
 * The view allows switching between free cam mode and orbital cam mode.
 */
export function AsteroidView() {
  const [isFreeCam, setIsFreeCam] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const { scenario: currentMap } = useScenario();

  // Handle touch events to prevent scrolling issues on mobile
  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const preventScroll = (e: TouchEvent) => {
      if (isFreeCam) {
        // Only prevent default if in free cam mode
        e.preventDefault();
      }
    };

    // Add touch event listeners
    canvasElement.addEventListener("touchmove", preventScroll, {
      passive: false,
    });

    return () => {
      // Clean up event listeners
      canvasElement.removeEventListener("touchmove", preventScroll);
    };
  }, [isFreeCam]);

  return (
    <div className="border border-primary p-2 md:p-4 w-full h-full relative overflow-hidden">
      <div className="absolute top-2 left-2 z-10">
        <h2 className="text-lg md:text-xl font-bold">
          {currentMap.name} - Visão Exterior
        </h2>
        <p className="text-xs md:text-sm">Posição Orbital: 248.32° / 45.18°</p>
      </div>

      <div
        ref={canvasRef}
        className="w-full h-full"
        style={{ touchAction: isFreeCam ? "none" : "auto" }}
      >
        <Canvas
          gl={{
            powerPreference: "high-performance",
            antialias: true,
            stencil: false,
            depth: true,
            failIfMajorPerformanceCaveat: false,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color("#000000"));
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />

          <AsteroidWithMining />
          <OrbitalSystem />
          <MeteorShower />
          <UFOs />
          <group position={[orbitRadius, 0, 0]}>
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={8}
              saturation={0}
              fade
              speed={1}
            />
          </group>

          <PerspectiveCamera
            makeDefault
            position={[orbitRadius + 50, 30, 0]}
            fov={isMobile ? 40 : 30}
          />
          {!isFreeCam && <CameraController />}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.2}
            target={[orbitRadius, 0, 0]}
            enabled={isFreeCam}
            // Prevent OrbitControls from capturing all touch events
            enableDamping={false}
          />
        </Canvas>
      </div>

      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={() => setIsFreeCam(!isFreeCam)}
          className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm font-bold ${
            isFreeCam
              ? "bg-primary text-black"
              : "bg-black text-primary border border-primary"
          }`}
        >
          {isFreeCam ? "CÂMERA ORBITAL" : "CÂMERA LIVRE"}
        </button>
      </div>

      <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 border border-primary bg-black/90 p-2 md:p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm md:text-lg">OPERAÇÕES DE MINERAÇÃO</h3>
          <div className="px-1 md:px-2 py-0.5 md:py-1 rounded bg-green-500 text-black uppercase font-bold text-[10px] md:text-xs">
            ativo
          </div>
        </div>
        <p className="text-xs md:text-base mt-1 md:mt-2">
          Taxa de extração atual: 24.7 tons/hr. Materiais primários: Ferro (62%),
          Níquel (14%), Cobalto (8%).
        </p>
      </div>
    </div>
  );
}

/**
 * Renders an asteroid with a mining facility.
 */
function AsteroidWithMining() {
  const groupRef = useRef<THREE.Group>(null);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    // Create a simplified asteroid geometry with impact craters
    const createAsteroidGeometry = () => {
      // Start with a slightly higher poly shape but still low-poly
      const baseGeometry = new THREE.OctahedronGeometry(5, 1);

      // Convert to buffer geometry
      const bufferGeometry = baseGeometry.clone();

      // Get position attribute
      const positionAttribute = bufferGeometry.getAttribute("position");
      const positions = positionAttribute.array;

      // Create a more irregular, misshapen form
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];

        // Calculate distance from center
        const distance = Math.sqrt(x * x + y * y + z * z);

        // Normalize to get direction
        const nx = x / distance;
        const ny = y / distance;
        const nz = z / distance;

        // Add varied deformation to create impact craters and irregular shape
        // Use different noise values for different areas to create asymmetry
        let noise =
          0.7 +
          Math.sin(nx * 3) * 0.2 +
          Math.cos(ny * 4) * 0.15 +
          Math.sin(nz * 2) * 0.25;

        // Create a large impact crater on one side
        const distFromImpact = Math.sqrt(
          Math.pow(nx - 0.5, 2) + Math.pow(ny - 0.2, 2) + Math.pow(nz - 0.3, 2)
        );

        if (distFromImpact < 0.8) {
          noise -= (0.8 - distFromImpact) * 0.6;
        }

        // Create another smaller impact on different side
        const distFromImpact2 = Math.sqrt(
          Math.pow(nx + 0.4, 2) + Math.pow(ny - 0.5, 2) + Math.pow(nz + 0.2, 2)
        );

        if (distFromImpact2 < 0.5) {
          noise -= (0.5 - distFromImpact2) * 0.4;
        }

        // Update position with irregular shape
        positions[i] = nx * 5 * noise;
        positions[i + 1] = ny * 5 * noise;
        positions[i + 2] = nz * 5 * noise;
      }

      // Update the position attribute
      positionAttribute.needsUpdate = true;

      // Compute normals
      bufferGeometry.computeVertexNormals();

      return bufferGeometry;
    };

    setGeometry(createAsteroidGeometry());
  }, []);

  // Use useFrame hook to rotate only around Y axis
  useFrame(() => {
    if (groupRef.current) {
      // Only rotate around Y axis
      groupRef.current.rotation.y += 0.001;
    }
  });

  if (!geometry) return null;

  return (
    <group ref={groupRef} position={[orbitRadius, 0, 0]}>
      {/* Asteroid */}
      <mesh>
        {geometry && <primitive object={geometry} attach="geometry" />}
        <meshBasicMaterial
          color="#ffb300"
          wireframe={true}
          wireframeLinewidth={1}
        />
      </mesh>

      {/* Mining facility - redesigned to be simpler but more detailed */}
      <group position={[3, 2, 1]}>
        {/* Main structure - a modified box with beveled edges */}
        <mesh>
          <boxGeometry args={[1.5, 0.8, 1.2]} />
          <meshBasicMaterial color="#00ff00" wireframe={true} />
        </mesh>

        {/* Secondary structure - smaller box on top */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1, 0.4, 0.8]} />
          <meshBasicMaterial color="#00ff00" wireframe={true} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Renders a large orbital path with a central planet.
 */
function OrbitalSystem() {
  // Define the orbital parameters
  const segments = 100; // Enough segments to make it look smooth
  const planetSize = 60; // Size of the central planet
  const planetRef = useRef<THREE.Mesh>(null);

  // Create points for a horizontal circle in XZ plane
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    // Ensure we're creating valid numbers for the coordinates
    const x = Math.cos(theta) * orbitRadius;
    const z = Math.sin(theta) * orbitRadius;
    points.push(new THREE.Vector3(x, 0, z));
  }

  // Add rotation animation
  useFrame(() => {
    if (planetRef.current) {
      // Rotate around Y axis
      planetRef.current.rotation.y -= 0.0002;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Orbital path - using simple line instead of LineSegmentsGeometry */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
            count={points.length}
            itemSize={3}
            args={[new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#8f6901" opacity={0.5} transparent={true} />
      </line>

      {/* Central planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[planetSize, 12, 12]} />
        <meshBasicMaterial color="#C64523" wireframe={true} />
      </mesh>
    </group>
  );
}

/**
 * Controls the camera movement for the orbital cam mode.
 */
function CameraController() {
  const { camera } = useThree();
  const [cameraAngle, setCameraAngle] = useState(0);
  const [panPhase, setPanPhase] = useState(0);

  // Modified easing function that spends most time near minimum
  const modifiedEase = (t: number) => {
    // Convert input to 0-1 range
    const normalized = (Math.sin(t) + 1) / 2;
    // Create a steep curve that spends most time near 0
    return Math.pow(normalized, 4);
  };

  useFrame(() => {
    // Slowly increase the angle
    setCameraAngle((prev) => prev + 0.0005);
    // Update pan phase
    setPanPhase((prev) => prev + 0.0001);

    // Calculate camera position in a circle around the asteroid
    const minRadius = 20; // Minimum distance from asteroid
    const maxRadius = 200; // Maximum distance from asteroid
    const range = maxRadius - minRadius;

    // Apply modified easing function
    const easedPhase = modifiedEase(panPhase);
    const radius = minRadius + easedPhase * range;

    // Calculate height based on distance from asteroid
    const minHeight = 5;
    const maxHeight = 50;
    const height = minHeight + easedPhase * (maxHeight - minHeight);

    // Calculate position in a circle around the asteroid
    const x = orbitRadius + Math.cos(cameraAngle) * radius;
    const y = height; // Dynamic height based on distance
    const z = Math.sin(cameraAngle) * radius;

    camera.position.set(x, y, z);
    camera.lookAt(orbitRadius, 0, 0);
  });

  return null;
}

/**
 * Chuva de meteoros no fundo - estilo estrelas cadentes wireframe
 */
function MeteorShower() {
  const meteorsRef = useRef<THREE.Group>(null);
  const meteors = useRef<
    Array<{
      mesh: THREE.Mesh;
      trail: THREE.Line;
      velocity: THREE.Vector3;
      size: number;
    }>
  >([]);

  useEffect(() => {
    if (!meteorsRef.current) return;

    // Criar 25 meteoros
    for (let i = 0; i < 25; i++) {
      // Tamanho aleatório entre 0.2 e 1.0
      const size = 0.2 + Math.random() * 0.8;
      
      // Cabeça do meteoro - tetraedro wireframe com tamanho variado
      const meteorGeometry = new THREE.TetrahedronGeometry(size, 0);
      const meteorMaterial = new THREE.MeshBasicMaterial({
        color: 0xffa500,
        wireframe: true,
      });
      const meteor = new THREE.Mesh(meteorGeometry, meteorMaterial);

      // Criar rastro do meteoro (linha longa)
      const trailGeometry = new THREE.BufferGeometry();
      const trailMaterial = new THREE.LineBasicMaterial({
        color: 0xffa500,
        transparent: true,
        opacity: 0.6,
      });
      const positions = new Float32Array(6);
      trailGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      const trail = new THREE.Line(trailGeometry, trailMaterial);

      // Posição inicial aleatória (área maior)
      meteor.position.set(
        orbitRadius + Math.random() * 400 - 200,
        Math.random() * 180 + 50,
        Math.random() * 400 - 200
      );

      // Velocidade varia com o tamanho (maiores são um pouco mais rápidos)
      const speedFactor = 0.3 + size * 0.3;
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * speedFactor,
        -Math.random() * speedFactor - 0.2,
        (Math.random() - 0.5) * speedFactor
      );

      meteorsRef.current.add(meteor);
      meteorsRef.current.add(trail);

      meteors.current.push({ mesh: meteor, trail, velocity, size });
    }
  }, []);

  useFrame(() => {
    meteors.current.forEach(({ mesh, trail, velocity, size }) => {
      // Atualizar posição do meteoro
      mesh.position.add(velocity);
      
      // Rotacionar o meteoro (menores giram mais rápido)
      const rotationSpeed = 0.04 / size;
      mesh.rotation.x += rotationSpeed;
      mesh.rotation.y += rotationSpeed * 1.5;

      // Atualizar rastro (comprimento proporcional ao tamanho)
      const positions = trail.geometry.attributes.position.array as Float32Array;
      const trailLength = 20 + size * 10;
      
      // Ponta do rastro (onde está o meteoro)
      positions[0] = mesh.position.x;
      positions[1] = mesh.position.y;
      positions[2] = mesh.position.z;
      
      // Cauda do rastro (atrás)
      positions[3] = mesh.position.x - velocity.x * trailLength;
      positions[4] = mesh.position.y - velocity.y * trailLength;
      positions[5] = mesh.position.z - velocity.z * trailLength;
      
      trail.geometry.attributes.position.needsUpdate = true;

      // Resetar quando sair da tela
      if (mesh.position.y < -50) {
        mesh.position.set(
          orbitRadius + Math.random() * 400 - 200,
          Math.random() * 180 + 50,
          Math.random() * 400 - 200
        );
      }
    });
  });

  return <group ref={meteorsRef} />;
}

/**
 * Discos voadores em estilo wireframe com portais
 */
function UFOs() {
  const ufosRef = useRef<THREE.Group>(null);
  const ufos = useRef<
    Array<{
      group: THREE.Group;
      portal: THREE.Group;
      angle: number;
      speed: number;
      distance: number;
      height: number;
      state: "hidden" | "appearing" | "visible" | "entering" | "closing";
      stateTimer: number;
      nextAppearance: number;
      portalScale: number;
      portalRotation: number;
    }>
  >([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!ufosRef.current) return;

    // Criar 3 UFOs
    for (let i = 0; i < 3; i++) {
      const ufoGroup = new THREE.Group();
      ufoGroup.visible = false;

      // Corpo principal (disco) - wireframe
      const bodyGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 8);
      const bodyMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);

      // Cúpula superior - wireframe
      const domeGeometry = new THREE.SphereGeometry(1.2, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2);
      const domeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
      });
      const dome = new THREE.Mesh(domeGeometry, domeMaterial);
      dome.position.y = 0.25;

      // Linhas de luz ao redor
      const ringGeometry = new THREE.TorusGeometry(2, 0.05, 4, 8);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;

      ufoGroup.add(body);
      ufoGroup.add(dome);
      ufoGroup.add(ring);

      // Criar portal wireframe
      const portalGroup = new THREE.Group();
      portalGroup.visible = false;

      // Anel externo do portal
      const portalRingGeometry = new THREE.TorusGeometry(4, 0.1, 8, 16);
      const portalRingMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
      });
      const portalRing = new THREE.Mesh(portalRingGeometry, portalRingMaterial);

      // Linhas radiais do portal
      for (let j = 0; j < 8; j++) {
        const angle = (j / 8) * Math.PI * 2;
        const lineGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array([
          0, 0, 0,
          Math.cos(angle) * 4, Math.sin(angle) * 4, 0
        ]);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        portalGroup.add(line);
      }

      // Anel interno pulsante
      const innerRingGeometry = new THREE.TorusGeometry(2, 0.08, 6, 12);
      const innerRingMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
      });
      const innerRing = new THREE.Mesh(innerRingGeometry, innerRingMaterial);
      portalGroup.add(innerRing);

      portalGroup.add(portalRing);

      ufosRef.current.add(ufoGroup);
      ufosRef.current.add(portalGroup);

      const nextAppearance = Math.random() * 12 + 3;

      ufos.current.push({
        group: ufoGroup,
        portal: portalGroup,
        angle: (i / 3) * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.015,
        distance: 30 + Math.random() * 20,
        height: Math.random() * 20 - 10,
        state: "hidden",
        stateTimer: 0,
        nextAppearance: nextAppearance,
        portalScale: 0,
        portalRotation: 0,
      });
    }
  }, []);

  useFrame((state, delta) => {
    setTime((prev) => prev + delta);

    ufos.current.forEach((ufo, index) => {
      const { group, portal, angle, speed, distance, height, state, stateTimer, nextAppearance } = ufo;

      // Atualizar ângulo
      ufos.current[index].angle += speed;
      const currentAngle = ufos.current[index].angle;

      // Calcular posição orbital
      const x = orbitRadius + Math.cos(currentAngle) * distance;
      const z = Math.sin(currentAngle) * distance;
      const y = height + Math.sin(currentAngle * 3) * 3;

      group.position.set(x, y, z);
      group.rotation.y += 0.03;
      group.lookAt(orbitRadius, 0, 0);

      // Atualizar rotação do portal
      ufos.current[index].portalRotation += delta * 2;
      portal.rotation.z = ufos.current[index].portalRotation;

      // Máquina de estados
      ufos.current[index].stateTimer += delta;

      switch (state) {
        case "hidden":
          if (time >= nextAppearance) {
            // Começar a aparecer - abrir portal
            ufos.current[index].state = "appearing";
            ufos.current[index].stateTimer = 0;
            ufos.current[index].portalScale = 0;
            portal.visible = true;
            portal.position.set(x, y, z);
            portal.lookAt(orbitRadius, 0, 0);
          }
          break;

        case "appearing":
          // Animação de abertura do portal (1.5 segundos)
          ufos.current[index].portalScale = Math.min(stateTimer / 1.5, 1);
          portal.scale.setScalar(ufos.current[index].portalScale);
          portal.position.set(x, y, z);
          portal.lookAt(orbitRadius, 0, 0);

          if (stateTimer >= 1.5) {
            // Portal aberto, UFO aparece
            group.visible = true;
            ufos.current[index].state = "visible";
            ufos.current[index].stateTimer = 0;
            ufos.current[index].nextAppearance = time + Math.random() * 15 + 15;
          }
          break;

        case "visible":
          portal.visible = false;
          if (time >= nextAppearance) {
            // Hora de partir - abrir portal novamente
            ufos.current[index].state = "entering";
            ufos.current[index].stateTimer = 0;
            ufos.current[index].portalScale = 0;
            portal.visible = true;
            portal.position.set(x, y, z);
            portal.lookAt(orbitRadius, 0, 0);
          }
          break;

        case "entering":
          // Abrir portal (1 segundo)
          if (stateTimer < 1) {
            ufos.current[index].portalScale = stateTimer;
            portal.scale.setScalar(ufos.current[index].portalScale);
          } else if (stateTimer < 2.5) {
            // UFO entra no portal (1.5 segundos)
            const enterProgress = (stateTimer - 1) / 1.5;
            const scale = 1 - enterProgress * 0.8;
            group.scale.setScalar(scale);
          } else {
            // UFO entrou, começar a fechar portal
            group.visible = false;
            group.scale.setScalar(1);
            ufos.current[index].state = "closing";
            ufos.current[index].stateTimer = 0;
          }
          portal.position.set(x, y, z);
          portal.lookAt(orbitRadius, 0, 0);
          break;

        case "closing":
          // Fechar portal (1 segundo)
          ufos.current[index].portalScale = Math.max(1 - stateTimer, 0);
          portal.scale.setScalar(ufos.current[index].portalScale);
          portal.position.set(x, y, z);
          portal.lookAt(orbitRadius, 0, 0);

          if (stateTimer >= 1) {
            portal.visible = false;
            ufos.current[index].state = "hidden";
            ufos.current[index].stateTimer = 0;
            ufos.current[index].nextAppearance = time + Math.random() * 12 + 8;
          }
          break;
      }
    });
  });

  return <group ref={ufosRef} />;
}
