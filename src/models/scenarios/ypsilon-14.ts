import { Scenario } from "../scenario";
import { StationGraphMap } from "../station-graph-map";

/**
 * A scenario for the Ypsilon 14 station from "The Haunting of Ypsilon 14".
 *
 * https://www.tuesdayknightgames.com/collections/mothership-starter-modules/products/the-haunting-of-ypsilon-14
 *
 * Source book credits:
 * - Written by D G Chapman (GoGoGolf!, Bastard Magic, The Graverobbe's Guide)
 * - Layout by Sean McCoy (Mothership, Dead Planet, A Pound of Flesh)
 * - Tuesday Knight Games
 */
export const ypsilon14 = (): Scenario => {
  const baseMap = new StationGraphMap({
    levels: [
      {
        rooms: ["DOCKING_BAY_1", null, "DOCKING_BAY_2"],
      },
      {
        rooms: [
          {
            id: "AIRLOCK_1",
            type: "airlock",
            pressureLossRisk: false,
          },
          null,
          {
            id: "AIRLOCK_2",
            type: "airlock",
            pressureLossRisk: false,
          },
        ],
      },
      { rooms: [null, "WORKSPACE", null] },
      { rooms: ["MINE_ELEVATOR", null, "MESS"] },
      { rooms: ["MINE_ENTRANCE", "QUARTERS", null] },
      { rooms: ["MINE_AIRLOCK", null, "WASHROOMS"] },
      { rooms: [null, "MINE_TUNNELS", null] },
    ],
    connections: [
      //nesta parte você podera definir o codigo de acesso manual para portas trancadas
      { from: "DOCKING_BAY_1", to: "AIRLOCK_1", password: "0389" },
      //nesta parte você podera definir o codigo de acesso manual para portas trancadas
      { from: "DOCKING_BAY_2", to: "AIRLOCK_2", defaultOpen: true },
      { from: "AIRLOCK_1", to: "WORKSPACE" },
      { from: "AIRLOCK_2", to: "WORKSPACE", defaultOpen: true },
      { from: "WORKSPACE", to: "QUARTERS" },
      { from: "WORKSPACE", to: "MINE_ELEVATOR" },
      { from: "QUARTERS", to: "MESS" },
      { from: "QUARTERS", to: "WASHROOMS" },
      { from: "MESS", to: "WASHROOMS" },
      { from: "MINE_ELEVATOR", to: "MINE_ENTRANCE" },
      { from: "MINE_ENTRANCE", to: "MINE_AIRLOCK" },
      { from: "MINE_AIRLOCK", to: "MINE_TUNNELS" },
    ],
    diagnostics: {
      title: "Diagnóstico",
      messages: [
        { type: "notice", message: "=========================" },
        {
          type: "check",
          message: "Checagem do suporte à vida",
          status: "Ok",
          delay: 3000,
        },
        {
          type: "notice",
          message: "Filtros de ar substituídos há 455 dias.",
        },
        {
          type: "notice",
          message: `${Math.floor(Math.random() * 80) + 1} banheiros entupidos no total, responsável desconhecido.`,
        },
        {
          type: "notice",
          message: "Sistemas de suporte à vida operacionais",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem dos sistemas de mineração",
          status: "Ok",
          delay: 2000,
        },
        {
          type: "notice",
          message: `${Math.floor(Math.random() * 10) + 1} P.N.H CICLADA EM MODO MANUAL...AUTOR DESCONHECIDO.`,
        },
        {
          type: "notice",
          message: "Elevador da mina mantido há 455 dia(s).",
        },
        {
          type: "notice",
          message: "Sistemas de mineração operacionais.",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem da integridade do habitat",
          status: "Concluído",
          delay: 1000,
        },
        {
          type: "warning",
          message: "Fluxo de ar O2.4%. Verifique os dutos dos alojamentos da tripulação para bloqueios.",
        },
        {
          type: "warning",
          message: "Chuveiro #5 não funcional há 1 dia(s).",
        },
        { type: "notice", message: "\n=========================" },
        {
          type: "check",
          message: "Checagem da(s) doca(s)",
          status: "Concluído",
          delay: 1500,
        },
        {
          type: "warning",
          message: "Airlock 1 manualmente substituído para TRANCADO",
        },
        {
          type: "notice",
          message: "Airlock 2 operacional",
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
    id: "YPSILON 14",
    name: "YPSILON 14",
    type: "asteroid",
    crew: { current: 9, capacity: 10 },
    adminCredentials: { username: "UNIÃO", password: "PRIME" },
    //nesta parte aqui você pode adicionar as credenciais de admin para acessar areas restritas 
    charts: ["oxygen", "temperature"],
    stats: {
      massa: "4.8 × 10^12 kg",
      diâmetro: "3.2 km",
      pressão: "1.2 bar",
    },
    exteriorStats: [
      {
        type: "composition",
        label: "COMPOSITION ANALYSIS",
      },
      {
        type: "rotationSpeed",
        label: "VELOCIDADE DE ROTAÇÃO",
        unit: "RPM",
        defaultValue: Array(30).fill(1.2),
        min: 1.0,
        max: 1.4,
        isArray: true,
      },
      {
        type: "surfaceTemp",
        label: "TEMPERATURA DA SUPERFÍCIE",
        unit: "°C",
        defaultValue: Array(30).fill(-145),
        min: -155,
        max: -135,
        isArray: true,
      },
      {
        type: "radiationLevel",
        label: "NÍVEL DE RADIAÇÃO",
        unit: "mSv",
        defaultValue: 142,
        isAlert: true,
        alertThreshold: 200,
      },
      {
        type: "resourcesExtracted",
        label: "RECURSOS EXTRAÍDOS",
        unit: "tons",
        defaultValue: 3842,
      },
      {
        type: "remainingDeposits",
        label: "DEPÓSITOS REMANESCENTES",
        unit: "tons",
        defaultValue: 18475,
      },
    ],
    map: baseMap,
    systemLogs: [
      //Exemplo para editar os logs da estação
      { time: "13.07.2184 13:20", message: "personagem ENTROU NA DOCA 1" },
      {
        time: "04.08.2184 15:20",
        message: "personagem ENTROU NA DOCA 2",
      },
      //nesta parte você pode digitar ao relacionado a lore ira aparecer no log da estação
      { time: "05.08.2184 08:15", message: `ARQUIVO system_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.log CRIADO` },
      { time: "05.08.2184 09:42", message: `BACKUP backup_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.dat CONCLUÍDO` },
      { time: "05.08.2184 11:23", message: `SCAN scan_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.tmp PROCESSADO` },
      { time: "05.08.2184 08:15", message: `ARQUIVO system_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.log CRIADO` },
      { time: "05.08.2184 09:42", message: `BACKUP backup_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.dat CONCLUÍDO` },
      { time: "05.08.2184 11:23", message: `SCAN scan_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.tmp PROCESSADO` },
      { time: "05.08.2184 08:15", message: `ARQUIVO system_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.log CRIADO` },
      { time: "05.08.2184 09:42", message: `BACKUP backup_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.dat CONCLUÍDO` },
      { time: "05.08.2184 11:23", message: `SCAN scan_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.tmp PROCESSADO` },
      { time: "05.08.2184 08:15", message: `ARQUIVO system_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.log CRIADO` },
      { time: "05.08.2184 09:42", message: `BACKUP backup_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.dat CONCLUÍDO` },
      { time: "05.08.2184 11:23", message: `SCAN scan_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.tmp PROCESSADO` },


    ],
    controlButtons: [
      {
        label: "CHUVEIROS",
        defaultState: false,
        restricted: false,
        type: "toggle",
        linkedRoom: "WASHROOMS",
      },
      {
        label: "AUTODESTRUIÇÃO",
        defaultState: false,
        restricted: true,
        type: "action",
        function: "self-destruct",
      },
      {
        label: "DOCA 1",
        defaultState: false,
        restricted: true,
        type: "toggle",
        toggleStates: {
          true: "DESTRANCADO",
          false: "TRANCADO",
        },
        linkedRoom: "DOCKING_BAY_1",
      },
      {
        label: "DOCA 2",
        defaultState: false,
        restricted: true,
        type: "toggle",
        toggleStates: {
          true: "DESTRANCADO",
          false: "TRANCADO",
        },
        linkedRoom: "DOCKING_BAY_2",
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

/**
 * A scenario for the Ypsilon 14 station from "The Haunting of Ypsilon 14" including the underground mine.
 *
 * https://www.tuesdayknightgames.com/collections/mothership-starter-modules/products/the-haunting-of-ypsilon-14
 *
 * Source book credits:
 * - Written by D G Chapman (GoGoGolf!, Bastard Magic, The Graverobbe's Guide)
 * - Layout by Sean McCoy (Mothership, Dead Planet, A Pound of Flesh)
 * - Tuesday Knight Games
 */
export const ypsilon14WithTunnels = (): Scenario => {
  const baseScenario = ypsilon14();
  const baseMap = baseScenario.map;

  const newMap =
    baseMap !== undefined
      ? new StationGraphMap({
          ...baseMap,
          levels: [
            ...baseMap.levels,
            { rooms: ["MINE_DEPTHS", null, "MINE_ANTECHAMBER"] },
          ],
          connections: [
            ...baseMap.connections,
            { from: "MINE_TUNNELS", to: "MINE_DEPTHS" },
            { from: "MINE_TUNNELS", to: "MINE_ANTECHAMBER" },
          ],
        })
      : undefined;

  return {
    ...baseScenario,
    name: "YPSILON 14",
    id: "YPSILON 14 - UNDERGROUND",
    map: newMap,
  };
};
