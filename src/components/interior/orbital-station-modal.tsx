"use client";

import { useScenario } from "@/src/context/scenario-context";
import type { RoomId } from "@/src/models/station-graph-map";
import { useState } from "react";

interface OrbitalStationModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Modal com mapa da Estação Orbital Smith-Shimano
 */
export function OrbitalStationModal({ open, onClose }: OrbitalStationModalProps) {
  const { scenario } = useScenario();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  if (!open) return null;

  // Estrutura da estação orbital
  const orbitalRooms = [
    { id: "DOCKING_ALPHA", name: "Doca Alpha", x: 200, y: 100, type: "airlock" },
    { id: "DOCKING_BETA", name: "Doca Beta", x: 600, y: 100, type: "airlock" },
    { id: "CENTRO_COMANDO_ORB", name: "Centro de Comando", x: 400, y: 200, type: "command" },
    { id: "LAB_XENOBIO_ORB", name: "Lab. Xenobiologia", x: 200, y: 300, type: "lab" },
    { id: "LAB_MINERAL_ORB", name: "Lab. Mineralogia", x: 400, y: 300, type: "lab" },
    { id: "LAB_ARTEFATOS", name: "Lab. Artefatos", x: 600, y: 300, type: "lab" },
    { id: "COMUNICACOES_ORB", name: "Comunicações", x: 200, y: 400, type: "comm" },
    { id: "DATACENTER_ORB", name: "Datacenter", x: 400, y: 400, type: "tech" },
    { id: "OBSERVATORIO", name: "Observatório", x: 600, y: 400, type: "obs" },
    { id: "ALOJAMENTOS_ORB", name: "Alojamentos", x: 300, y: 500, type: "living" },
    { id: "REFEITORIO_ORB", name: "Refeitório", x: 500, y: 500, type: "living" },
    { id: "GERADORES_ORB", name: "Geradores", x: 400, y: 600, type: "power" },
  ];

  const orbitalConnections = [
    { from: "DOCKING_ALPHA", to: "CENTRO_COMANDO_ORB" },
    { from: "DOCKING_BETA", to: "CENTRO_COMANDO_ORB" },
    { from: "CENTRO_COMANDO_ORB", to: "LAB_XENOBIO_ORB" },
    { from: "CENTRO_COMANDO_ORB", to: "LAB_MINERAL_ORB" },
    { from: "CENTRO_COMANDO_ORB", to: "LAB_ARTEFATOS" },
    { from: "LAB_XENOBIO_ORB", to: "COMUNICACOES_ORB" },
    { from: "LAB_MINERAL_ORB", to: "DATACENTER_ORB" },
    { from: "LAB_ARTEFATOS", to: "OBSERVATORIO" },
    { from: "COMUNICACOES_ORB", to: "DATACENTER_ORB" },
    { from: "DATACENTER_ORB", to: "OBSERVATORIO" },
    { from: "COMUNICACOES_ORB", to: "ALOJAMENTOS_ORB" },
    { from: "OBSERVATORIO", to: "REFEITORIO_ORB" },
    { from: "ALOJAMENTOS_ORB", to: "REFEITORIO_ORB" },
    { from: "ALOJAMENTOS_ORB", to: "GERADORES_ORB" },
    { from: "REFEITORIO_ORB", to: "GERADORES_ORB" },
  ];

  const getRoomColor = (type: string) => {
    switch (type) {
      case "airlock":
        return { stroke: "stroke-red-500", fill: "fill-red-900" };
      case "command":
        return { stroke: "stroke-yellow-500", fill: "fill-yellow-900" };
      case "lab":
        return { stroke: "stroke-cyan-500", fill: "fill-cyan-900" };
      case "comm":
        return { stroke: "stroke-blue-500", fill: "fill-blue-900" };
      case "tech":
        return { stroke: "stroke-purple-500", fill: "fill-purple-900" };
      case "obs":
        return { stroke: "stroke-indigo-500", fill: "fill-indigo-900" };
      case "living":
        return { stroke: "stroke-green-500", fill: "fill-green-900" };
      case "power":
        return { stroke: "stroke-orange-500", fill: "fill-orange-900" };
      default:
        return { stroke: "stroke-amber-400", fill: "fill-black" };
    }
  };

  const roomDescriptions: Record<string, string> = {
    DOCKING_ALPHA: "Porta de atracação principal para naves de transporte e carga.",
    DOCKING_BETA: "Porta de atracação secundária. Acesso VIP e emergências.",
    CENTRO_COMANDO_ORB: "Centro de operações da estação. Monitoramento de todos os sistemas.",
    LAB_XENOBIO_ORB: "Análise de amostras biológicas alienígenas. Nível de biossegurança 4.",
    LAB_MINERAL_ORB: "Espectrometria e análise de terras raras. Equipamento de precisão nanométrica.",
    LAB_ARTEFATOS: "Estudo de artefatos piramidais. Sala blindada contra radiação anômala.",
    COMUNICACOES_ORB: "Sistema de comunicação quântica. Uplink direto com a matriz Smith-Shimano.",
    DATACENTER_ORB: "Processamento de dados em escala petabyte. IA de análise preditiva.",
    OBSERVATORIO: "Telescópios de longo alcance. Monitoramento de órbitas e ameaças espaciais.",
    ALOJAMENTOS_ORB: "Acomodações para 450 cientistas. Gravidade artificial ajustável.",
    REFEITORIO_ORB: "Área de alimentação e lazer. Hidroponia integrada.",
    GERADORES_ORB: "Reatores de fusão compacta. Autonomia energética de 25 anos.",
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="border-2 border-primary bg-black p-4 md:p-6 max-w-5xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-primary">
              CENTRO ORBITAL DE PESQUISA SMITH-SHIMANO
            </h3>
            <p className="text-xs md:text-sm text-primary/70 mt-1">
              ÓRBITA BAIXA - ALTITUDE: 450km // CAPACIDADE: 450 CIENTISTAS
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-primary hover:text-primary/70 text-2xl font-bold ml-4"
          >
            ×
          </button>
        </div>

        <div className="border border-primary/40 bg-black p-2 mb-4">
          <svg className="w-full h-[500px]" viewBox="0 0 800 700">
            {/* Conexões */}
            <g>
              {orbitalConnections.map((conn, idx) => {
                const fromRoom = orbitalRooms.find((r) => r.id === conn.from);
                const toRoom = orbitalRooms.find((r) => r.id === conn.to);
                if (!fromRoom || !toRoom) return null;

                return (
                  <line
                    key={idx}
                    x1={fromRoom.x}
                    y1={fromRoom.y}
                    x2={toRoom.x}
                    y2={toRoom.y}
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                );
              })}
            </g>

            {/* Salas */}
            <g>
              {orbitalRooms.map((room) => {
                const colors = getRoomColor(room.type);
                const isSelected = selectedRoom === room.id;

                return (
                  <g
                    key={room.id}
                    transform={`translate(${room.x - 70}, ${room.y - 25})`}
                    onClick={() => setSelectedRoom(room.id)}
                    style={{ cursor: "pointer" }}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <rect
                      width="140"
                      height="50"
                      rx="5"
                      className={`stroke-2 ${colors.stroke} ${colors.fill} ${
                        isSelected ? "opacity-100" : ""
                      }`}
                    />
                    <text
                      x="70"
                      y="30"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`font-bold text-xs ${colors.stroke.replace(
                        "stroke",
                        "fill"
                      )}`}
                      style={{ pointerEvents: "none" }}
                    >
                      {room.name}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Legenda */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>AIRLOCK</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
            <span>LABORATÓRIO</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>HABITAÇÃO</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>ENERGIA</span>
          </div>
        </div>

        {/* Informações da sala selecionada */}
        {selectedRoom && (
          <div className="border border-primary/40 bg-black/60 p-4 mt-4">
            <h4 className="text-lg font-bold text-primary mb-2">
              {orbitalRooms.find((r) => r.id === selectedRoom)?.name}
            </h4>
            <p className="text-sm text-primary/80">
              {roomDescriptions[selectedRoom] || "Área operacional."}
            </p>
            <div className="mt-2 text-xs text-primary/60">
              ID: {selectedRoom}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full border border-primary text-primary hover:bg-primary hover:text-black transition-colors py-2 mt-4"
        >
          FECHAR
        </button>
      </div>
    </div>
  );
}
