import { Scenario } from "../scenario";
import { StationGraphMap } from "../station-graph-map";

/**
 * Nave Cargueira Titan-Class - "MERCATOR"
 * 
 * Supercargueira de longa distância capaz de transportar
 * 50.000 toneladas de carga entre sistemas estelares.
 */
export const titanClass = (): Scenario => {
  const baseMap = new StationGraphMap({
    levels: [
      {
        rooms: ["BRIDGE", "NAV_CONTROL", "COMMS"],
      },
      {
        rooms: ["CAPTAIN_QUARTERS", "CORRIDOR_UPPER", "OFFICER_DECK"],
      },
      {
        rooms: [
          {
            id: "AIRLOCK_PORT",
            type: "airlock",
            pressureLossRisk: false,
          },
          "CREW_QUARTERS",
          {
            id: "AIRLOCK_STARBOARD",
            type: "airlock",
            pressureLossRisk: false,
          },
        ],
      },
      { rooms: ["MESS_HALL", "CORRIDOR_MID", "MEDICAL"] },
      { rooms: ["ENGINEERING", "REACTOR_ROOM", "MAINTENANCE"] },
      { rooms: ["CARGO_BAY_1", "CARGO_BAY_2", "CARGO_BAY_3"] },
      { rooms: ["HOLD_LOWER_A", "HOLD_LOWER_B", "HOLD_LOWER_C"] },
      { rooms: [null, "CARGO_LIFT", null] },
    ],
    connections: [
      { from: "BRIDGE", to: "NAV_CONTROL" },
      { from: "NAV_CONTROL", to: "COMMS" },
      { from: "BRIDGE", to: "CAPTAIN_QUARTERS" },
      { from: "NAV_CONTROL", to: "CORRIDOR_UPPER" },
      { from: "COMMS", to: "OFFICER_DECK" },
      { from: "CAPTAIN_QUARTERS", to: "CORRIDOR_UPPER" },
      { from: "CORRIDOR_UPPER", to: "OFFICER_DECK" },
      { from: "CORRIDOR_UPPER", to: "CREW_QUARTERS" },
      { from: "AIRLOCK_PORT", to: "CREW_QUARTERS", password: "8844" },
      { from: "CREW_QUARTERS", to: "AIRLOCK_STARBOARD", defaultOpen: true },
      { from: "CREW_QUARTERS", to: "CORRIDOR_MID" },
      { from: "CORRIDOR_MID", to: "MESS_HALL" },
      { from: "CORRIDOR_MID", to: "MEDICAL" },
      { from: "CORRIDOR_MID", to: "REACTOR_ROOM" },
      { from: "MESS_HALL", to: "ENGINEERING" },
      { from: "ENGINEERING", to: "REACTOR_ROOM" },
      { from: "REACTOR_ROOM", to: "MAINTENANCE" },
      { from: "MEDICAL", to: "MAINTENANCE" },
      { from: "ENGINEERING", to: "CARGO_BAY_1" },
      { from: "REACTOR_ROOM", to: "CARGO_BAY_2" },
      { from: "MAINTENANCE", to: "CARGO_BAY_3" },
      { from: "CARGO_BAY_1", to: "HOLD_LOWER_A" },
      { from: "CARGO_BAY_2", to: "HOLD_LOWER_B" },
      { from: "CARGO_BAY_3", to: "HOLD_LOWER_C" },
      { from: "HOLD_LOWER_A", to: "CARGO_LIFT" },
      { from: "HOLD_LOWER_B", to: "CARGO_LIFT" },
      { from: "HOLD_LOWER_C", to: "CARGO_LIFT" },
    ],
    diagnostics: {
      title: "Diagnóstico - MERCATOR (Titan-Class)",
      messages: [
        { type: "notice", message: "=========================" },
        {
          type: "check",
          message: "Checagem do sistema de propulsão",
          status: "Ok",
          delay: 3000,
        },
        {
          type: "notice",
          message: "Motores de fusão operando a 95% de eficiência.",
        },
        {
          type: "notice",
          message: "Combustível suficiente para mais 18 meses de viagem.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem dos porões de carga",
          status: "Ok",
          delay: 2500,
        },
        {
          type: "notice",
          message: "Carga atual: 42.187 toneladas (84% de capacidade).",
        },
        {
          type: "warning",
          message: `${Math.floor(Math.random() * 30) + 10} containeres com selagem comprometida - Inspeção necessária.`,
        },
        { type: "notice", message: "Pressurização dos porões estável." },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem de navegação",
          status: "Concluído",
          delay: 2000,
        },
        {
          type: "notice",
          message: "Rota plotada: 147 dias até destino.",
        },
        {
          type: "notice",
          message: "Sistemas de navegação autônoma ativos.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem dos airlocks",
          status: "Concluído",
          delay: 1500,
        },
        {
          type: "notice",
          message: "Airlock Port: selado e pressurizado.",
        },
        {
          type: "notice",
          message: "Airlock Starboard: selado e pressurizado.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem do reator de fusão",
          status: "Ok",
          delay: 1000,
        },
        {
          type: "warning",
          message: "Refrigeração primária operando 3°C acima do ideal.",
        },
        {
          type: "notice",
          message: "Sistema de contenimento estável.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "summary",
          message: "Nave operando normalmente. ETA: 147 dias.",
        },
      ],
    },
  });

  const scenario: Scenario = {
    id: "TITAN-CLASS",
    name: "MERCATOR",
    type: "ship",
    crew: { current: 28, capacity: 35 },
    adminCredentials: { username: "CAPTAIN", password: "TITAN9000" },
    charts: ["oxygen", "temperature", "pressure"],
    stats: {
      massa: "89.500 toneladas",
      diâmetro: "280m (comprimento)",
      pressão: "1.01 bar",
    },
    exteriorStats: [
      {
        type: "rotationSpeed",
        label: "VELOCIDADE ATUAL",
        unit: "km/s",
        defaultValue: 147.3,
      },
      {
        type: "resourcesExtracted",
        label: "CARGA TOTAL",
        unit: "tons",
        defaultValue: 42187,
      },
      {
        type: "remainingDeposits",
        label: "COMBUSTÍVEL",
        unit: "%",
        defaultValue: 78,
        isAlert: true,
        alertThreshold: 25,
      },
      {
        type: "surfaceTemp",
        label: "TEMP. REATOR",
        unit: "°C",
        defaultValue: Array(30).fill(1847),
        min: 1820,
        max: 1890,
        isArray: true,
        isAlert: true,
        alertThreshold: 1950,
      },
      {
        type: "anomalyReadings",
        label: "DIAS ATÉ DESTINO",
        unit: "dias",
        defaultValue: 147,
      },
    ],
    map: baseMap,
    systemLogs: [
      { time: "05.12.9000 14:22", message: "Saída do sistema Kepler-442" },
      { time: "06.12.9000 08:15", message: "Inspeção de rotina dos porões de carga concluída" },
      { time: "07.12.9000 03:44", message: `BACKUP cargo_manifest_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.dat CONCLUÍDO` },
      { time: "08.12.9000 19:37", message: "Micro-ajuste de curso executado" },
      { time: "09.12.9000 11:28", message: "Manutenção preventiva do reator agendada" },
      { time: "10.12.9000 22:11", message: `ARQUIVO nav_log_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.log CRIADO` },
      { time: "11.12.9000 06:55", message: "Sistema de refrigeração operando acima do normal" },
      { time: "12.12.9000 17:03", message: "Troca de turno da ponte - Capitão assumiu comando" },
    ],
    controlButtons: [
      {
        label: "LUZES CABINES",
        defaultState: true,
        restricted: false,
        type: "toggle",
        linkedRoom: "CREW_QUARTERS",
      },
      {
        label: "GRAV. ARTIFICIAL",
        defaultState: true,
        restricted: true,
        type: "toggle",
        linkedRoom: "ENGINEERING",
      },
      {
        label: "ELEVADOR DE CARGA",
        defaultState: false,
        restricted: false,
        type: "toggle",
        toggleStates: {
          true: "ATIVO",
          false: "INATIVO",
        },
        linkedRoom: "CARGO_LIFT",
      },
      {
        label: "PURGA EMERGENCIAL",
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
    theme: "amber",
  };

  return scenario;
};
