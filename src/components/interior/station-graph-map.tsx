"use client";

import { useScenario } from "@/src/context/scenario-context";
import { useEncryption } from "@/src/context/encryption-context";
import type { RoomDefinition, RoomId } from "@/src/models/station-graph-map";
import { DecryptionKeyButton } from "@/src/components/decryption-key-button";
import { type JSX, useEffect, useState } from "react";

/**
 * Renders a graph map of the station.
 *
 * Uses the scenario.map property to display the graph map.
 */
export function StationGraphMap() {
  const { scenario, map, activeRooms, airlockStates } = useScenario();
  const { randomRoom } = useEncryption();
  const isHorus = scenario?.id === "TAO-095";
  const [selectedRoom, setSelectedRoom] = useState<RoomId | null>(null);
  
  if (!map) return <div>Loading...</div>;

  const getRoomInfo = (roomId: RoomId) => {
    const roomNames: Record<string, string> = {
      PORTO_ALPHA: "01 BASE CENTRAL SMITH-SHIMANO",
      PORTO_BETA: "02 PORTO ESPACIAL ALPHA",
      CENTRO_COMANDO: "Centro de Comando",
      COMUNICACOES: "Comunicações",
      CORREDOR_PRINCIPAL: "Corredor Principal",
      XENOBIOLOGIA: "05 LABORATÓRIO DE XENOBIOLOGIA",
      DATACENTER: "Datacenter",
      ARQUEOLOGIA: "Arqueologia",
      ALOJAMENTOS_EXEC: "Alojamentos Executivos",
      ATRIUM_CENTRAL: "Atrium Central",
      ALOJAMENTOS_TECH: "Alojamentos Técnicos",
      MINERACAO_HQ: "07 ESTAÇÃO DE MINERAÇÃO TITAN-9",
      REFEITORIO: "Refeitório",
      LABORATORIO_RAROS: "Laboratório de Terras Raras",
      DEPOSITO_MINERAL: "Depósito Mineral",
      HANGAR_MINERACAO: "Hangar de Mineração",
      ENFERMARIA: "06 CENTRO MÉDICO SHIMANO",
      GERADORES: "Geradores",
      SALA_CONTROLE: "Sala de Controle",
      PIRAMIDE_SETHOS: "03 COMPLEXO PIRAMIDAL SETHOS",
      SITIO_OMEGA7: "04 SÍTIO ARQUEOLÓGICO OMEGA-7",
      AIRLOCK_NORTE: "Airlock Norte",
      AIRLOCK_SUL: "Airlock Sul",
    };

    const roomDescriptions: Record<string, string> = {
      PORTO_ALPHA: "Sede corporativa e centro de comando. Operações de mineração e pesquisa arqueológica.",
      PORTO_BETA: "Docking para naves de grande porte. Taxa: 5kcr/semana.",
      XENOBIOLOGIA: "Pesquisa de formas de vida nativas. Amostras: 4,783 catalogadas.",
      MINERACAO_HQ: "Extração de metais raros. Produção: 850 toneladas/dia.",
      ENFERMARIA: "Tratamento avançado. Gravidade ajustável: 0.8g-2.4g.",
      PIRAMIDE_SETHOS: "Maior estrutura piramidal. 2.8km de altura. Fonte de energia desconhecida ativa.",
      SITIO_OMEGA7: "Ruínas antigas com tecnologia alienígena. Acesso restrito - Nível 5.",
      LABORATORIO_RAROS: "Análise de neodímio, disprósio e ítrio. Concentração: 87%.",
      CENTRO_COMANDO: "Controle de operações planetárias. Monitoramento de todos os sistemas.",
      DATACENTER: "Processamento de dados arqueológicos e mineração. IA de análise ativa.",
      ARQUEOLOGIA: "Pesquisa de artefatos alienígenas. 23 sítios ativos.",
      DEPOSITO_MINERAL: "Armazenamento de terras raras. Capacidade: 45,000 toneladas.",
    };

    return {
      name: roomNames[roomId] || roomId.replace(/_/g, " "),
      description: roomDescriptions[roomId] || "Área operacional.",
    };
  };

  const [connections, setConnections] = useState<
    Array<{ from: RoomId; to: RoomId }>
  >([]);
  const [roomPositions, setRoomPositions] = useState<
    Map<RoomId, { x: number; y: number }>
  >(new Map());

  const [availableSpace, setAvailableSpace] = useState<{
    width: number;
    height: number;
  }>({ width: 1000, height: 800 });

  // Update available space when container size changes
  useEffect(() => {
    const updateSize = () => {
      const container = document.querySelector(".station-map-container");
      if (container) {
        // Account for the container's padding
        setAvailableSpace({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Calculate the total grid size needed
  const cellSize = map.calculateCellSize(
    availableSpace.width,
    availableSpace.height
  );

  // Calculate the total grid size needed - adjusted to match grid
  const gridWidth = cellSize.width * map.layout.gridSize.columns;

  // Calculate centering offsets based purely on available space
  const xOffset = availableSpace.width - gridWidth;

  // Update room positions with offset
  useEffect(() => {
    const mapConnections = map.connections;
    setConnections(mapConnections);

    const newPositions = new Map<RoomId, { x: number; y: number }>();

    for (const room of map.rooms) {
      const basePos = map.getRoomPosition(
        room.id,
        availableSpace.width,
        availableSpace.height
      );
      if (basePos) {
        newPositions.set(room.id, {
          x: xOffset + basePos.x,
          y: basePos.y,
        });
      }
    }

    setRoomPositions(newPositions);
  }, [map, availableSpace, xOffset, cellSize.width]);

  // Draw connections between rooms
  const renderConnections = () => {
    const connectionLines: JSX.Element[] = [];

    connections.forEach((conn) => {
      const fromPos = roomPositions.get(conn.from);
      const toPos = roomPositions.get(conn.to);
      if (!fromPos || !toPos) return;

      // Determine connection type
      const isFromAirlock = map.isAirlock(conn.from);
      const isToAirlock = map.isAirlock(conn.to);
      const isHallwayConnection =
        map.isHallway(conn.from) && map.isHallway(conn.to);

      // Get door state if this is an airlock connection
      let isDoorOpen = false;
      if (isFromAirlock) {
        isDoorOpen = airlockStates.get(conn.from)?.doors.get(conn.to) ?? false;
      } else if (isToAirlock) {
        isDoorOpen = airlockStates.get(conn.to)?.doors.get(conn.from) ?? false;
      }

      // Determine connection color
      const getConnectionColor = () => {
        if (isDoorOpen) return "#00ff00"; // Green for open doors
        if (isFromAirlock || isToAirlock) return "#ff5500"; // Orange for closed airlock doors
        if (isHallwayConnection) return "#5FA5F9"; // Blue for hallways
        return "hsl(var(--amber-400))"; // Amber for other connections
      };

      connectionLines.push(
        <line
          key={`line-${conn.from}-${conn.to}`}
          x1={fromPos.x}
          y1={fromPos.y}
          x2={toPos.x}
          y2={toPos.y}
          stroke={getConnectionColor()}
          strokeWidth={isFromAirlock || isToAirlock ? 3 : 2}
        />
      );
    });

    return connectionLines;
  };

  const renderRoom = (roomDef: RoomDefinition) => {
    const pos = roomPositions.get(roomDef.id);
    if (!pos) return null;

    // Use consistent cell sizes for all rooms
    const roomSize = map.calculateRoomSize(
      availableSpace.width,
      availableSpace.height
    );
    const roomWidth = roomSize.width;
    const roomHeight = roomSize.height;
    const fontSize = "text-2xl";

    const linkedButton = scenario.controlButtons?.find(
      (button) => button.linkedRoom === roomDef.id
    );
    const isActive =
      linkedButton !== undefined &&
      activeRooms?.has(roomDef.id) !== linkedButton.defaultState;
    
    const hasDecryptionKey = isHorus && roomDef.id === randomRoom;

    // Always use amber color for rooms regardless of emergency mode
    let strokeColor = "stroke-amber-400";
    let fillColor = "fill-black";
    let textColor = "fill-amber-400";

    if (isActive) {
      strokeColor = "stroke-green-500";
      fillColor = "fill-green-900";
      textColor = "fill-green-400";
    }

    const isSelected = selectedRoom === roomDef.id;
    if (isSelected) {
      strokeColor = "stroke-yellow-400";
      fillColor = "fill-yellow-900/30";
    }

    return (
      <g
        key={roomDef.id}
        transform={`translate(${pos.x - roomWidth / 2}, ${
          pos.y - roomHeight / 2
        })`}
        onClick={() => setSelectedRoom(roomDef.id)}
        style={{ cursor: "pointer" }}
        className="hover:opacity-80 transition-opacity"
      >
        <rect
          width={roomWidth}
          height={roomHeight}
          rx="5"
          className={`stroke-2 ${strokeColor} ${fillColor}`}
        />
        <text
          x={roomWidth / 2}
          y={roomHeight / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className={`font-bold ${fontSize} ${textColor}`}
          style={{ pointerEvents: "none" }}
        >
          {roomDef.id.replace(/_/g, " ")}
        </text>
        
        {/* Botão de chave de decodificação (muito sutil) */}
        {hasDecryptionKey && (
          <foreignObject
            x={roomWidth * 0.1}
            y={roomHeight * 0.75}
            width={roomWidth * 0.8}
            height={roomHeight * 0.2}
            style={{ pointerEvents: 'all' }}
          >
            <div 
              className="flex justify-center items-center h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <DecryptionKeyButton />
            </div>
          </foreignObject>
        )}
      </g>
    );
  };

  const renderHallway = (roomDef: RoomDefinition) => {
    const pos = roomPositions.get(roomDef.id);
    if (!pos) return null;

    const roomSize = map.calculateRoomSize(
      availableSpace.width,
      availableSpace.height
    );
    const roomWidth = roomSize.width;
    const roomHeight = roomSize.height;
    const fontSize = "text-2xl";

    const isSelected = selectedRoom === roomDef.id;
    const strokeColor = isSelected ? "stroke-yellow-400" : "stroke-blue-400";
    const fillColor = isSelected ? "fill-yellow-900/30" : "fill-black";

    return (
      <g
        key={roomDef.id}
        transform={`translate(${pos.x - roomWidth / 2}, ${
          pos.y - roomHeight / 2
        })`}
        onClick={() => setSelectedRoom(roomDef.id)}
        style={{ cursor: "pointer" }}
        className="hover:opacity-80 transition-opacity"
      >
        <rect
          width={roomWidth}
          height={roomHeight}
          rx="5"
          className={`stroke-2 ${strokeColor} ${fillColor}`}
        />
        <text
          x={roomWidth / 2}
          y={roomHeight / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className={`font-bold ${fontSize} fill-blue-400`}
          style={{ pointerEvents: "none" }}
        >
          {roomDef.id.replace(/_/g, " ")}
        </text>
      </g>
    );
  };

  const renderAirlock = (roomDef: RoomDefinition) => {
    const pos = roomPositions.get(roomDef.id);
    if (!pos) return null;

    const airlockSize = map.calculateAirlockSize(
      availableSpace.width,
      availableSpace.height
    );
    const airlockWidth = airlockSize.width;
    const airlockHeight = airlockSize.height;
    const fontSize = "text-xl";

    const airlockState = airlockStates.get(roomDef.id);
    const isUnlocked = airlockState?.doors.size
      ? Array.from(airlockState.doors.values()).some((isOpen) => isOpen)
      : false;

    const isSelected = selectedRoom === roomDef.id;
    let strokeClass = isUnlocked ? "stroke-green-500" : "stroke-red-500";
    let fillClass = isUnlocked ? "fill-green-900" : "fill-red-900";
    
    if (isSelected) {
      strokeClass = "stroke-yellow-400";
      fillClass = "fill-yellow-900/30";
    }

    return (
      <g
        key={roomDef.id}
        transform={`translate(${pos.x - airlockWidth / 2}, ${
          pos.y - airlockHeight / 2
        })`}
        className={`crt-effect`}
        onClick={() => setSelectedRoom(roomDef.id)}
        style={{ cursor: "pointer" }}
      >
        <rect
          width={airlockWidth}
          height={airlockHeight}
          rx="5"
          className={`stroke-2 ${strokeClass} ${fillClass} hover:opacity-80 transition-opacity`}
        />
        <text
          x={airlockWidth / 2}
          y={airlockHeight / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className={`font-bold ${fontSize} ${
            isUnlocked ? "fill-green-400" : "fill-red-400"
          }`}
          style={{ pointerEvents: "none" }}
        >
          {roomDef.id.replace(/_/g, " ")}
        </text>
      </g>
    );
  };

  const gridLineColor = "border-primary/20";

  return (
    <div
      className="station-map-container border border-primary p-4 md:p-8 h-[500px] md:h-[800px] relative overflow-hidden"
      style={{ userSelect: "none" }}
    >
      <div className="absolute top-2 left-2 z-10">
        <h2 className="text-lg md:text-xl font-bold">
          {scenario.name} - VISÃO INTERIOR
        </h2>
        <p className="text-xs md:text-sm">SOMENTE ACESSO AUTORIZADO</p>
      </div>

      <div className="absolute top-2 right-2 z-10 flex flex-wrap justify-end gap-1 md:gap-2 text-[10px] md:text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 md:w-3 h-2 md:h-3 bg-green-500 rounded-full"></div>
          <span>DESBLOQUEADO</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 md:w-3 h-2 md:h-3 bg-amber-400 rounded-full"></div>
          <span>SALA</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 md:w-3 h-2 md:h-3 bg-red-500 rounded-full"></div>
          <span>TRANCADO</span>
        </div>
        {map.rooms.some((room) => room.type === "hallway") && (
          <div className="flex items-center gap-1">
            <div className="w-2 md:w-3 h-2 md:h-3 bg-blue-400 rounded-full"></div>
            <span>HALLWAY</span>
          </div>
        )}
      </div>

      <div className="absolute inset-0 grid grid-cols-11 grid-rows-10">
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={`col-${i}`}
            className={`border-r ${gridLineColor} h-full`}
          />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={`row-${i}`}
            className={`border-b ${gridLineColor} w-full`}
          />
        ))}
      </div>

      <svg
        className="w-full h-full"
        viewBox={`0 0 ${availableSpace.width} ${availableSpace.height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ position: "relative", zIndex: 1 }}
      >
        <g>
          {renderConnections()}
          {map.rooms.map((room) => {
            switch (room.type) {
              case "room":
                return renderRoom(room);
              case "hallway":
                return renderHallway(room);
              case "airlock":
                return renderAirlock(room);
            }
          })}
        </g>
      </svg>

      {/* Modal de Informações da Sala */}
      {selectedRoom && (
        <div
          className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedRoom(null)}
        >
          <div
            className="border-2 border-primary bg-black p-6 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-primary">
                {getRoomInfo(selectedRoom).name}
              </h3>
              <button
                onClick={() => setSelectedRoom(null)}
                className="text-primary hover:text-primary/70 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-primary/90">
                {getRoomInfo(selectedRoom).description}
              </p>
              <div className="border-t border-primary/30 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-primary/70">ID DA SALA:</span>
                  <span className="text-primary font-mono">{selectedRoom}</span>
                </div>
                {map.isAirlock(selectedRoom) && (
                  <div className="flex justify-between text-sm">
                    <span className="text-primary/70">TIPO:</span>
                    <span className="text-red-400 font-bold">AIRLOCK - REQUER SENHA</span>
                  </div>
                )}
                {activeRooms?.has(selectedRoom) && (
                  <div className="flex justify-between text-sm">
                    <span className="text-primary/70">STATUS:</span>
                    <span className="text-green-400 font-bold">ATIVO</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedRoom(null)}
                className="w-full border border-primary text-primary hover:bg-primary hover:text-black transition-colors py-2 mt-4"
              >
                FECHAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
