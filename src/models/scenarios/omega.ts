import { Scenario } from "../scenario";
import { StationGraphMap } from "../station-graph-map";

/**
 * Instalação Omega - Base Militar Abandonada
 * 
 * Complexo militar experimental em órbita de planeta morto.
 * Experimentos secretos. Comunicações cortadas há 3 anos.
 * Status: Abandonada. Motivo: Desconhecido.
 */
export const omega = (): Scenario => {
  const baseMap = new StationGraphMap({
    levels: [
      {
        rooms: ["HANGAR_MAIN", null, "HANGAR_EMERGENCY"],
      },
      {
        rooms: [
          {
            id: "AIRLOCK_ALPHA",
            type: "airlock",
            pressureLossRisk: true,
          },
          null,
          {
            id: "AIRLOCK_OMEGA",
            type: "airlock",
            pressureLossRisk: true,
          },
        ],
      },
      { rooms: ["SECURITY_CHECKPOINT", "MAIN_CORRIDOR", "ARMORY"] },
      { rooms: ["BARRACKS", "COMMAND_CENTER", "COMM_ARRAY"] },
      { rooms: ["MESS_HALL", "CORRIDOR_LOWER", "MEDICAL_BAY"] },
      { rooms: ["LAB_ALPHA", "LAB_BETA", "CONTAINMENT"] },
      { rooms: ["REACTOR", "POWER_CONTROL", "BACKUP_GENERATORS"] },
      { rooms: [null, "RESTRICTED_ZONE", null] },
      { rooms: [null, "CLASSIFIED_LAB", null] },
    ],
    connections: [
      { from: "HANGAR_MAIN", to: "AIRLOCK_ALPHA", defaultOpen: true },
      { from: "HANGAR_EMERGENCY", to: "AIRLOCK_OMEGA", password: "OMEGA-666" },
      { from: "AIRLOCK_ALPHA", to: "SECURITY_CHECKPOINT" },
      { from: "AIRLOCK_OMEGA", to: "MAIN_CORRIDOR" },
      { from: "SECURITY_CHECKPOINT", to: "MAIN_CORRIDOR" },
      { from: "MAIN_CORRIDOR", to: "ARMORY" },
      { from: "SECURITY_CHECKPOINT", to: "BARRACKS" },
      { from: "MAIN_CORRIDOR", to: "COMMAND_CENTER" },
      { from: "ARMORY", to: "COMM_ARRAY" },
      { from: "BARRACKS", to: "COMMAND_CENTER" },
      { from: "COMMAND_CENTER", to: "COMM_ARRAY" },
      { from: "BARRACKS", to: "MESS_HALL" },
      { from: "COMMAND_CENTER", to: "CORRIDOR_LOWER" },
      { from: "COMM_ARRAY", to: "MEDICAL_BAY" },
      { from: "MESS_HALL", to: "LAB_ALPHA" },
      { from: "CORRIDOR_LOWER", to: "LAB_BETA" },
      { from: "MEDICAL_BAY", to: "CONTAINMENT" },
      { from: "LAB_ALPHA", to: "LAB_BETA", password: "CLEARANCE-9" },
      { from: "LAB_BETA", to: "CONTAINMENT" },
      { from: "LAB_ALPHA", to: "REACTOR" },
      { from: "LAB_BETA", to: "POWER_CONTROL" },
      { from: "CONTAINMENT", to: "BACKUP_GENERATORS" },
      { from: "REACTOR", to: "POWER_CONTROL" },
      { from: "POWER_CONTROL", to: "BACKUP_GENERATORS" },
      { from: "POWER_CONTROL", to: "RESTRICTED_ZONE", password: "RED-EYES-13" },
      { from: "RESTRICTED_ZONE", to: "CLASSIFIED_LAB", password: "TERMINUS" },
    ],
    diagnostics: {
      title: "Diagnóstico - Instalação Omega",
      messages: [
        { type: "notice", message: "=========================" },
        {
          type: "check",
          message: "Checagem de integridade estrutural",
          status: "AVISO",
          delay: 3000,
        },
        {
          type: "warning",
          message: "ALERTA: Casco comprometido em múltiplas seções.",
        },
        {
          type: "warning",
          message: `${Math.floor(Math.random() * 20) + 15} brechas detectadas. Despressurização parcial.`,
        },
        {
          type: "warning",
          message: "Airlock Alpha: integridade do selo em 34%.",
        },
        {
          type: "warning",
          message: "Airlock Omega: integridade do selo em 12% - CRÍTICO.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem do sistema de energia",
          status: "DEGRADADO",
          delay: 2500,
        },
        {
          type: "warning",
          message: "Reator principal em modo de espera - apenas 23% de saída.",
        },
        {
          type: "notice",
          message: "Geradores de backup: operacionais.",
        },
        {
          type: "warning",
          message: "Sistema de distribuição: 7 painéis queimados.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem dos sistemas de segurança",
          status: "OFFLINE",
          delay: 2000,
        },
        {
          type: "warning",
          message: "Câmeras de vigilância: 84% offline.",
        },
        {
          type: "warning",
          message: "Portas de segurança: travadas em posições aleatórias.",
        },
        {
          type: "warning",
          message: "Arsenal: inventário não verificado há 1.094 dias.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem dos laboratórios",
          status: "DESCONHECIDO",
          delay: 1500,
        },
        {
          type: "warning",
          message: "ERRO: Acesso aos registros de experimentos negado.",
        },
        {
          type: "warning",
          message: "Lab Beta: sinais biométricos anômalos detectados.",
        },
        {
          type: "warning",
          message: "Zona de Contenção: VIOLAÇÃO DE PROTOCOLO registrada.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem de comunicações",
          status: "FALHA",
          delay: 1000,
        },
        {
          type: "warning",
          message: "Array de comunicações: sem sinal há 1.094 dias.",
        },
        {
          type: "warning",
          message: "Última transmissão: [DADOS CORROMPIDOS]",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "summary",
          message: "CRÍTICO: Instalação em estado de abandono. Perigos múltiplos detectados.",
        },
      ],
    },
  });

  const scenario: Scenario = {
    id: "OMEGA",
    name: "INSTALAÇÃO OMEGA",
    type: "ship",
    crew: { current: 0, capacity: 45 },
    adminCredentials: { username: "COMMAND", password: "BLACKSITE" },
    charts: ["oxygen", "temperature", "radiation"],
    stats: {
      massa: "Órbita planetária",
      diâmetro: "310m",
      pressão: "0.67 bar",
    },
    exteriorStats: [
      {
        type: "composition",
        label: "INTEGRIDADE CASCO",
        unit: "%",
        defaultValue: Array(30).fill(34),
        min: 28,
        max: 40,
        isArray: true,
        isAlert: true,
        alertThreshold: 50,
      },
      {
        type: "remainingDeposits",
        label: "SAÍDA DE ENERGIA",
        unit: "%",
        defaultValue: 23,
        isAlert: true,
        alertThreshold: 40,
      },
      {
        type: "radiationLevel",
        label: "VAZAMENTO RADIAÇÃO",
        unit: "mSv/h",
        defaultValue: Array(30).fill(7.8),
        min: 6.5,
        max: 9.2,
        isArray: true,
        isAlert: true,
        alertThreshold: 5.0,
      },
      {
        type: "rotationSpeed",
        label: "DIAS ABANDONADA",
        unit: "dias",
        defaultValue: 1094,
      },
      {
        type: "anomalyReadings",
        label: "ANOMALIAS DETECTADAS",
        unit: "sinais",
        defaultValue: Array(30).fill(12),
        min: 8,
        max: 18,
        isArray: true,
        isAlert: true,
        alertThreshold: 0,
      },
    ],
    map: baseMap,
    systemLogs: [
      { time: "04.09.8997 23:47", message: "[ÚLTIMO LOG] Experimento Fase-7 iniciado" },
      { time: "04.09.8997 23:52", message: "ALERTA: Violação de contenção no Lab Beta" },
      { time: "04.09.8997 23:54", message: "EMERGÊNCIA: Evacuação geral ordenada" },
      { time: "04.09.8997 23:59", message: "CRÍTICO: [DADOS CORROMPIDOS] ███████ ███" },
      { time: "05.09.8997 00:00", message: "Sistema entrando em modo de quarentena" },
      { time: "05.09.8997 00:01", message: `ARQUIVO classified_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.enc CRIADO` },
      { time: "05.09.8997 00:02", message: "[TRANSMISSÃO FINAL] ███ ████ ████ █████" },
      { time: "13.12.9000 [ATUAL]", message: "Sistema de backup reativado - origem desconhecida" },
    ],
    controlButtons: [
      {
        label: "LUZES EMERGÊNCIA",
        defaultState: true,
        restricted: false,
        type: "toggle",
        linkedRoom: "MAIN_CORRIDOR",
      },
      {
        label: "CONTENÇÃO LAB BETA",
        defaultState: true,
        restricted: true,
        type: "toggle",
        toggleStates: {
          true: "TRANCADO",
          false: "DESTRANCADO",
        },
        linkedRoom: "CONTAINMENT",
      },
      {
        label: "ZONA RESTRITA",
        defaultState: false,
        restricted: true,
        type: "toggle",
        toggleStates: {
          true: "ACESSÍVEL",
          false: "SELADO",
        },
        linkedRoom: "RESTRICTED_ZONE",
      },
      {
        label: "PROTOCOLO PURGA",
        defaultState: false,
        restricted: true,
        type: "action",
        function: "emergency",
      },
      {
        label: "DADOS-ESTAÇÃO",
        defaultState: false,
        restricted: false,
        type: "action",
      },
    ],
    theme: "pink",
  };

  return scenario;
};
