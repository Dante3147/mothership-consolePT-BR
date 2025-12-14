import { Scenario } from "../scenario";
import { StationGraphMap } from "../station-graph-map";

/**
 * Estação de Pesquisa Helios - Órbita Solar Próxima
 * 
 * Observatório e laboratório científico avançado em órbita perigosamente
 * próxima ao Sol para estudar física solar e testar tecnologia de fusão.
 */
export const helios = (): Scenario => {
  const baseMap = new StationGraphMap({
    levels: [
      {
        rooms: ["DOCKING_ALPHA", null, "DOCKING_BETA"],
      },
      {
        rooms: [
          {
            id: "AIRLOCK_PRIMARY",
            type: "airlock",
            pressureLossRisk: false,
          },
          null,
          {
            id: "AIRLOCK_SECONDARY",
            type: "airlock",
            pressureLossRisk: false,
          },
        ],
      },
      { rooms: ["OBSERVATION_DOME", "MAIN_CORRIDOR", "LAB_FUSION"] },
      { rooms: ["LAB_ASTROPHYSICS", "CONTROL_CENTER", "LAB_MATERIALS"] },
      { rooms: ["DATA_ARCHIVE", "QUARTERS", "MEDICAL"] },
      { rooms: ["MESS_HALL", "GREENHOUSE", "WORKSHOP"] },
      { rooms: ["SHIELD_CONTROL", "REACTOR", "COOLING_SYSTEMS"] },
      { rooms: [null, "THERMAL_MANAGEMENT", null] },
    ],
    connections: [
      { from: "DOCKING_ALPHA", to: "AIRLOCK_PRIMARY", password: "SUN2847" },
      { from: "DOCKING_BETA", to: "AIRLOCK_SECONDARY", defaultOpen: true },
      { from: "AIRLOCK_PRIMARY", to: "MAIN_CORRIDOR" },
      { from: "AIRLOCK_SECONDARY", to: "MAIN_CORRIDOR" },
      { from: "MAIN_CORRIDOR", to: "OBSERVATION_DOME" },
      { from: "MAIN_CORRIDOR", to: "LAB_FUSION" },
      { from: "OBSERVATION_DOME", to: "LAB_ASTROPHYSICS" },
      { from: "MAIN_CORRIDOR", to: "CONTROL_CENTER" },
      { from: "LAB_FUSION", to: "LAB_MATERIALS" },
      { from: "LAB_ASTROPHYSICS", to: "CONTROL_CENTER" },
      { from: "CONTROL_CENTER", to: "LAB_MATERIALS" },
      { from: "LAB_ASTROPHYSICS", to: "DATA_ARCHIVE" },
      { from: "CONTROL_CENTER", to: "QUARTERS" },
      { from: "LAB_MATERIALS", to: "MEDICAL" },
      { from: "DATA_ARCHIVE", to: "MESS_HALL" },
      { from: "QUARTERS", to: "GREENHOUSE" },
      { from: "MEDICAL", to: "WORKSHOP" },
      { from: "MESS_HALL", to: "SHIELD_CONTROL" },
      { from: "GREENHOUSE", to: "REACTOR" },
      { from: "WORKSHOP", to: "COOLING_SYSTEMS" },
      { from: "SHIELD_CONTROL", to: "THERMAL_MANAGEMENT" },
      { from: "REACTOR", to: "THERMAL_MANAGEMENT" },
      { from: "COOLING_SYSTEMS", to: "THERMAL_MANAGEMENT" },
    ],
    diagnostics: {
      title: "Diagnóstico - Estação Helios",
      messages: [
        { type: "notice", message: "=========================" },
        {
          type: "check",
          message: "Checagem dos escudos térmicos",
          status: "CRÍTICO",
          delay: 3000,
        },
        {
          type: "warning",
          message: "ATENÇÃO: Temperatura externa alcançando 1.847°C.",
        },
        {
          type: "notice",
          message: "Escudos refletivos operando a 98% de eficiência.",
        },
        {
          type: "warning",
          message: `${Math.floor(Math.random() * 8) + 3} painéis de escudo com degradação detectada.`,
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem do sistema de refrigeração",
          status: "Ok",
          delay: 2500,
        },
        {
          type: "notice",
          message: "Refrigeração primária: funcional.",
        },
        {
          type: "notice",
          message: "Refrigeração secundária: funcional.",
        },
        {
          type: "warning",
          message: "Bomba de calor 7 operando 12% abaixo da eficiência nominal.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem dos experimentos ativos",
          status: "Concluído",
          delay: 2000,
        },
        {
          type: "notice",
          message: "Experimento de fusão solar: coletando dados.",
        },
        {
          type: "notice",
          message: "Observação de erupções coronais: ativa.",
        },
        {
          type: "notice",
          message: "Teste de materiais resistentes ao calor: em progresso.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem da cúpula de observação",
          status: "Ok",
          delay: 1500,
        },
        {
          type: "notice",
          message: "Filtros de radiação solar: funcionais.",
        },
        {
          type: "notice",
          message: "Vidros inteligentes operacionais.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem dos sistemas de suporte à vida",
          status: "Concluído",
          delay: 1000,
        },
        {
          type: "notice",
          message: "Oxigênio: níveis normais.",
        },
        {
          type: "notice",
          message: "Estufa: produzindo alimentos conforme programado.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "summary",
          message: "ALERTA: Exposição solar extrema. Monitoramento constante necessário.",
        },
      ],
    },
  });

  const scenario: Scenario = {
    id: "HELIOS",
    name: "HELIOS",
    type: "planet",
    crew: { current: 18, capacity: 22 },
    adminCredentials: { username: "SOLAR-ADMIN", password: "CORONA3847" },
    charts: ["oxygen", "temperature", "radiation"],
    stats: {
      massa: "Órbita Solar",
      diâmetro: "190m",
      pressão: "1.02 bar",
    },
    exteriorStats: [
      {
        type: "surfaceTemp",
        label: "TEMP. SOLAR (EXTERNA)",
        unit: "°C",
        defaultValue: Array(30).fill(1847),
        min: 1780,
        max: 1920,
        isArray: true,
        isAlert: true,
        alertThreshold: 1900,
      },
      {
        type: "atmosphericAnalysis",
        label: "TEMP. INTERNA",
        unit: "°C",
        defaultValue: Array(30).fill(22),
        min: 20,
        max: 25,
        isArray: true,
      },
      {
        type: "composition",
        label: "INTEGRIDADE ESCUDOS",
        unit: "%",
        defaultValue: 98,
        isAlert: true,
        alertThreshold: 80,
      },
      {
        type: "radiationLevel",
        label: "RADIAÇÃO DETECTADA",
        unit: "mSv/h",
        defaultValue: Array(30).fill(2.4),
        min: 2.0,
        max: 3.5,
        isArray: true,
        isAlert: true,
        alertThreshold: 4.0,
      },
      {
        type: "researchProgress",
        label: "DISTÂNCIA DO SOL",
        unit: "milhões km",
        defaultValue: 12.8,
      },
    ],
    map: baseMap,
    systemLogs: [
      { time: "07.12.9000 04:33", message: "Erupção solar classe X detectada - Escudos compensaram" },
      { time: "08.12.9000 12:18", message: `BACKUP solar_data_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.dat CONCLUÍDO` },
      { time: "09.12.9000 09:47", message: "Experimento de fusão atingiu temperatura de 15 milhões °C" },
      { time: "10.12.9000 15:22", message: "Substituição de painéis de escudo degradados iniciada" },
      { time: "11.12.9000 06:11", message: `ARQUIVO corona_obs_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.log CRIADO` },
      { time: "11.12.9000 21:44", message: "Bomba de calor 7 em manutenção corretiva" },
      { time: "12.12.9000 08:29", message: "Nova coleta de dados do vento solar concluída" },
      { time: "13.12.9000 03:15", message: "Tempestade solar prevista para próximas 48h" },
    ],
    controlButtons: [
      {
        label: "ESCUDOS TÉRMICOS",
        defaultState: true,
        restricted: true,
        type: "toggle",
        linkedRoom: "SHIELD_CONTROL",
      },
      {
        label: "REFRIGERAÇÃO MAX",
        defaultState: false,
        restricted: false,
        type: "toggle",
        toggleStates: {
          true: "MÁXIMA",
          false: "NORMAL",
        },
        linkedRoom: "COOLING_SYSTEMS",
      },
      {
        label: "CÚPULA OBSERVAÇÃO",
        defaultState: true,
        restricted: false,
        type: "toggle",
        toggleStates: {
          true: "ABERTA",
          false: "FECHADA",
        },
        linkedRoom: "OBSERVATION_DOME",
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
