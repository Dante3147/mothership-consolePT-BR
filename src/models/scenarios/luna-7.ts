import { Scenario } from "../scenario";
import { StationGraphMap } from "../station-graph-map";

/**
 * Estação Mineradora Luna-7 - Lua gelada de Saturno
 * 
 * Uma instalação de mineração criogênica operando em uma lua congelada.
 * Especializada em extração de gelo d'água e minerais raros.
 */
export const luna7 = (): Scenario => {
  const baseMap = new StationGraphMap({
    levels: [
      {
        rooms: ["DOCKING_A", null, "DOCKING_B"],
      },
      {
        rooms: [
          {
            id: "AIRLOCK_ALPHA",
            type: "airlock",
            pressureLossRisk: false,
          },
          null,
          {
            id: "AIRLOCK_BETA",
            type: "airlock",
            pressureLossRisk: false,
          },
        ],
      },
      { rooms: ["CONTROL_CENTER", "CORRIDOR_MAIN", "LAB_CRYO"] },
      { rooms: ["POWER_CORE", "MESS_HALL", "MEDICAL"] },
      { rooms: ["QUARTERS_A", "QUARTERS_B", "STORAGE"] },
      { rooms: ["GARAGE", null, "ICE_DRILL_ACCESS"] },
      { rooms: [null, "MINING_SHAFT", null] },
    ],
    connections: [
      { from: "DOCKING_A", to: "AIRLOCK_ALPHA", password: "7193" },
      { from: "DOCKING_B", to: "AIRLOCK_BETA", defaultOpen: true },
      { from: "AIRLOCK_ALPHA", to: "CONTROL_CENTER" },
      { from: "AIRLOCK_BETA", to: "CORRIDOR_MAIN", defaultOpen: true },
      { from: "CONTROL_CENTER", to: "CORRIDOR_MAIN" },
      { from: "CORRIDOR_MAIN", to: "LAB_CRYO" },
      { from: "CONTROL_CENTER", to: "POWER_CORE" },
      { from: "CORRIDOR_MAIN", to: "MESS_HALL" },
      { from: "LAB_CRYO", to: "MEDICAL" },
      { from: "POWER_CORE", to: "QUARTERS_A" },
      { from: "MESS_HALL", to: "QUARTERS_B" },
      { from: "MEDICAL", to: "STORAGE" },
      { from: "QUARTERS_A", to: "GARAGE" },
      { from: "QUARTERS_B", to: "GARAGE" },
      { from: "STORAGE", to: "ICE_DRILL_ACCESS" },
      { from: "GARAGE", to: "MINING_SHAFT" },
      { from: "ICE_DRILL_ACCESS", to: "MINING_SHAFT" },
    ],
    diagnostics: {
      title: "Diagnóstico - Luna-7",
      messages: [
        { type: "notice", message: "=========================" },
        {
          type: "check",
          message: "Checagem térmica da instalação",
          status: "Ok",
          delay: 3000,
        },
        {
          type: "notice",
          message: "Temperatura externa: -178°C. Isolamento funcional.",
        },
        {
          type: "notice",
          message: `${Math.floor(Math.random() * 15) + 5} aquecedores em manutenção programada.`,
        },
        {
          type: "notice",
          message: "Sistemas térmicos operacionais.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem do equipamento de perfuração",
          status: "Ok",
          delay: 2000,
        },
        {
          type: "notice",
          message: "Broca criogênica operando a 87% de capacidade.",
        },
        {
          type: "warning",
          message: "Lâminas de perfuração precisam substituição em 45 dias.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem do sistema de extração",
          status: "Concluído",
          delay: 1500,
        },
        {
          type: "notice",
          message: "Taxa de extração de gelo: 147 tons/dia.",
        },
        {
          type: "warning",
          message: "Reservatório criogênico 3 em 94% de capacidade.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem das docas",
          status: "Concluído",
          delay: 1000,
        },
        {
          type: "warning",
          message: "Docking A com pressurização lenta. Verificar selantes.",
        },
        {
          type: "notice",
          message: "Docking B operacional.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "summary",
          message: "Todos os sistemas operando dentro dos parâmetros aceitáveis.",
        },
      ],
    },
  });

  const scenario: Scenario = {
    id: "LUNA-7",
    name: "LUNA-7",
    type: "planet",
    crew: { current: 12, capacity: 15 },
    adminCredentials: { username: "CRYO-ADMIN", password: "ICE2184" },
    charts: ["oxygen", "temperature"],
    stats: {
      massa: "Superfície",
      diâmetro: "N/A",
      pressão: "0.98 bar",
    },
    exteriorStats: [
      {
        type: "surfaceTemp",
        label: "TEMPERATURA EXTERNA",
        unit: "°C",
        defaultValue: Array(30).fill(-178),
        min: -185,
        max: -170,
        isArray: true,
      },
      {
        type: "atmosphericAnalysis",
        label: "TEMPERATURA INTERNA",
        unit: "°C",
        defaultValue: Array(30).fill(21),
        min: 18,
        max: 24,
        isArray: true,
      },
      {
        type: "resourcesExtracted",
        label: "GELO EXTRAÍDO (HOJE)",
        unit: "tons",
        defaultValue: 147,
      },
      {
        type: "anomalyReadings",
        label: "CONSUMO ENERGÉTICO",
        unit: "%",
        defaultValue: 73,
        isAlert: true,
        alertThreshold: 90,
      },
      {
        type: "remainingDeposits",
        label: "PROFUNDIDADE ATUAL",
        unit: "m",
        defaultValue: 2847,
      },
    ],
    map: baseMap,
    systemLogs: [
      { time: "08.12.9000 06:15", message: "Turno de mineração iniciado" },
      { time: "08.12.9000 09:33", message: "Broca criogênica atingiu nova camada de gelo" },
      { time: "08.12.9000 12:47", message: "Veículo de transporte retornou do poço 7" },
      { time: "09.12.9000 03:22", message: `ARQUIVO thermal_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.log CRIADO` },
      { time: "09.12.9000 07:15", message: "Manutenção preventiva agendada para aquecedor 8" },
      { time: "10.12.9000 14:28", message: `BACKUP cryo_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.dat CONCLUÍDO` },
      { time: "11.12.9000 11:09", message: "Tempestade de gelo detectada. Operações externas suspensas" },
      { time: "12.12.9000 05:44", message: "Reservatório 3 atingindo capacidade máxima" },
    ],
    controlButtons: [
      {
        label: "AQUECIMENTO",
        defaultState: true,
        restricted: false,
        type: "toggle",
        linkedRoom: "QUARTERS_A",
      },
      {
        label: "BROCA CRIOGÊNICA",
        defaultState: true,
        restricted: true,
        type: "toggle",
        linkedRoom: "MINING_SHAFT",
      },
      {
        label: "PURGA EMERGENCIAL",
        defaultState: false,
        restricted: true,
        type: "action",
        function: "emergency",
      },
      {
        label: "DOCA A",
        defaultState: false,
        restricted: true,
        type: "toggle",
        toggleStates: {
          true: "DESTRANCADO",
          false: "TRANCADO",
        },
        linkedRoom: "DOCKING_A",
      },
      {
        label: "DADOS-ESTAÇÃO",
        defaultState: false,
        restricted: false,
        type: "action",
      },
    ],
    theme: "cyan",
  };

  return scenario;
};
