import { Scenario } from "../scenario";
import { StationGraphMap } from "../station-graph-map";

/**
 * Nexus Station - Hub Comercial Orbital
 * 
 * Estação comercial massiva servindo como porto livre e centro de
 * comércio inter-sistêmico. Centenas de naves atracam diariamente.
 */
export const nexus = (): Scenario => {
  const baseMap = new StationGraphMap({
    levels: [
      {
        rooms: ["DOCKING_1", "DOCKING_2", "DOCKING_3"],
      },
      {
        rooms: [
          {
            id: "AIRLOCK_1",
            type: "airlock",
            pressureLossRisk: false,
          },
          {
            id: "AIRLOCK_2",
            type: "airlock",
            pressureLossRisk: false,
          },
          {
            id: "AIRLOCK_3",
            type: "airlock",
            pressureLossRisk: false,
          },
        ],
      },
      { rooms: ["CUSTOMS", "MAIN_PLAZA", "SECURITY"] },
      { rooms: ["MARKET_EAST", "PROMENADE", "MARKET_WEST"] },
      { rooms: ["RESTAURANT", "HOTEL_RECEPTION", "CASINO"] },
      { rooms: ["HOTEL_ROOMS", "CORRIDOR_CENTRAL", "STORAGE_LEASE"] },
      { rooms: ["ADMIN_OFFICES", "CONTROL_CENTER", "TECH_SUPPORT"] },
      { rooms: ["POWER_STATION", "LIFE_SUPPORT", "MAINTENANCE_BAY"] },
      { rooms: [null, "CARGO_PROCESSING", null] },
    ],
    connections: [
      { from: "DOCKING_1", to: "AIRLOCK_1", defaultOpen: true },
      { from: "DOCKING_2", to: "AIRLOCK_2", defaultOpen: true },
      { from: "DOCKING_3", to: "AIRLOCK_3", password: "VIP7744" },
      { from: "AIRLOCK_1", to: "CUSTOMS" },
      { from: "AIRLOCK_2", to: "MAIN_PLAZA" },
      { from: "AIRLOCK_3", to: "SECURITY" },
      { from: "CUSTOMS", to: "MAIN_PLAZA" },
      { from: "MAIN_PLAZA", to: "SECURITY" },
      { from: "MAIN_PLAZA", to: "PROMENADE" },
      { from: "CUSTOMS", to: "MARKET_EAST" },
      { from: "PROMENADE", to: "MARKET_EAST" },
      { from: "PROMENADE", to: "MARKET_WEST" },
      { from: "SECURITY", to: "MARKET_WEST" },
      { from: "MARKET_EAST", to: "RESTAURANT" },
      { from: "PROMENADE", to: "HOTEL_RECEPTION" },
      { from: "MARKET_WEST", to: "CASINO" },
      { from: "RESTAURANT", to: "HOTEL_RECEPTION" },
      { from: "HOTEL_RECEPTION", to: "CASINO" },
      { from: "RESTAURANT", to: "HOTEL_ROOMS" },
      { from: "HOTEL_RECEPTION", to: "CORRIDOR_CENTRAL" },
      { from: "CASINO", to: "STORAGE_LEASE" },
      { from: "HOTEL_ROOMS", to: "ADMIN_OFFICES" },
      { from: "CORRIDOR_CENTRAL", to: "CONTROL_CENTER" },
      { from: "STORAGE_LEASE", to: "TECH_SUPPORT" },
      { from: "ADMIN_OFFICES", to: "CONTROL_CENTER" },
      { from: "CONTROL_CENTER", to: "TECH_SUPPORT" },
      { from: "ADMIN_OFFICES", to: "POWER_STATION" },
      { from: "CONTROL_CENTER", to: "LIFE_SUPPORT" },
      { from: "TECH_SUPPORT", to: "MAINTENANCE_BAY" },
      { from: "POWER_STATION", to: "CARGO_PROCESSING" },
      { from: "LIFE_SUPPORT", to: "CARGO_PROCESSING" },
      { from: "MAINTENANCE_BAY", to: "CARGO_PROCESSING" },
    ],
    diagnostics: {
      title: "Diagnóstico - Nexus Station",
      messages: [
        { type: "notice", message: "=========================" },
        {
          type: "check",
          message: "Checagem das docas comerciais",
          status: "Ok",
          delay: 3000,
        },
        {
          type: "notice",
          message: `${Math.floor(Math.random() * 40) + 110} naves atracadas atualmente.`,
        },
        {
          type: "notice",
          message: "Docas 1 e 2: operacionais.",
        },
        {
          type: "notice",
          message: "Doca 3 (VIP): reservada para cargueira diplomática.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem do sistema de segurança",
          status: "Concluído",
          delay: 2500,
        },
        {
          type: "notice",
          message: "Scanners de segurança: ativos.",
        },
        {
          type: "warning",
          message: `${Math.floor(Math.random() * 15) + 5} itens contrabandeados confiscados hoje.`,
        },
        {
          type: "notice",
          message: "Patrulhas de segurança: 12 agentes em serviço.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem do sistema comercial",
          status: "Ok",
          delay: 2000,
        },
        {
          type: "notice",
          message: "Volume de transações hoje: 2.847.193 créditos.",
        },
        {
          type: "notice",
          message: "Mercado Leste: 34 vendedores ativos.",
        },
        {
          type: "notice",
          message: "Mercado Oeste: 28 vendedores ativos.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem dos sistemas de hospitalidade",
          status: "Concluído",
          delay: 1500,
        },
        {
          type: "notice",
          message: "Hotel: 89 de 120 quartos ocupados (74%).",
        },
        {
          type: "notice",
          message: "Restaurante: operando normalmente.",
        },
        {
          type: "warning",
          message: "Casino: sistema de apostas teve 3 travamentos hoje.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem do processamento de carga",
          status: "Ok",
          delay: 1000,
        },
        {
          type: "notice",
          message: "1.247 containeres processados nas últimas 24h.",
        },
        {
          type: "notice",
          message: "Armazéns de aluguel: 78% de ocupação.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "summary",
          message: "Estação operando com tráfego intenso. Todos os sistemas funcionais.",
        },
      ],
    },
  });

  const scenario: Scenario = {
    id: "NEXUS",
    name: "NEXUS STATION",
    type: "ship",
    crew: { current: 284, capacity: 350 },
    adminCredentials: { username: "STATION-MASTER", password: "NEXUS1234" },
    charts: ["oxygen", "temperature"],
    stats: {
      massa: "Órbita Terrestre",
      diâmetro: "420m",
      pressão: "1.00 bar",
    },
    exteriorStats: [
      {
        type: "composition",
        label: "NAVES ATRACADAS",
        unit: "naves",
        defaultValue: 142,
      },
      {
        type: "rotationSpeed",
        label: "TRÁFEGO DIÁRIO",
        unit: "naves",
        defaultValue: 287,
      },
      {
        type: "resourcesExtracted",
        label: "VOLUME COMERCIAL",
        unit: "k cr.",
        defaultValue: 2847,
      },
      {
        type: "remainingDeposits",
        label: "OCUPAÇÃO HOTEL",
        unit: "%",
        defaultValue: 74,
      },
      {
        type: "anomalyReadings",
        label: "ALERTAS SEGURANÇA",
        unit: "hoje",
        defaultValue: Array(30).fill(3),
        min: 0,
        max: 12,
        isArray: true,
        isAlert: true,
        alertThreshold: 15,
      },
    ],
    map: baseMap,
    systemLogs: [
      { time: "10.12.9000 08:22", message: "Nave de carga 'Stellar Wanderer' atracou na Doca 1" },
      { time: "10.12.9000 14:47", message: `BACKUP trade_logs_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.dat CONCLUÍDO` },
      { time: "11.12.9000 03:11", message: "Incidente menor no Casino - segurança interveio" },
      { time: "11.12.9000 09:38", message: "Embaixador chegou na Doca 3 (VIP)" },
      { time: "11.12.9000 17:55", message: "Manutenção programada do scanner de segurança" },
      { time: "12.12.9000 06:29", message: `ARQUIVO customs_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.log CRIADO` },
      { time: "12.12.9000 12:14", message: "Novo recorde de transações: 3.2 milhões de créditos" },
      { time: "13.12.9000 04:33", message: "Limpeza e manutenção da Promenade concluída" },
    ],
    controlButtons: [
      {
        label: "ILUMINAÇÃO PLAZA",
        defaultState: true,
        restricted: false,
        type: "toggle",
        linkedRoom: "MAIN_PLAZA",
      },
      {
        label: "MERCADOS",
        defaultState: true,
        restricted: false,
        type: "toggle",
        toggleStates: {
          true: "ABERTOS",
          false: "FECHADOS",
        },
        linkedRoom: "PROMENADE",
      },
      {
        label: "DOCA VIP",
        defaultState: false,
        restricted: true,
        type: "toggle",
        toggleStates: {
          true: "DESTRANCADA",
          false: "TRANCADA",
        },
        linkedRoom: "DOCKING_3",
      },
      {
        label: "ALERTA SEGURANÇA",
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
    theme: "cyan",
  };

  return scenario;
};
