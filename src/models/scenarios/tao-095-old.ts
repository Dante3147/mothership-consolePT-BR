import { Scenario } from "../scenario";
import { StationGraphMap } from "../station-graph-map";

/**
 * TAO-095 - Base HORUS
 * 
 * Planeta classe-M com 7 luas em órbita.
 * Base militar/científica HORUS na superfície.
 * Interface estilo COMP/CON do sistema Lancer.
 */
export const tao095 = (): Scenario => {
  const baseMap = new StationGraphMap({
    levels: [
      {
        rooms: ["HANGAR_PRINCIPAL", null, "HANGAR_SECUNDARIO"],
      },
      {
        rooms: [
          {
            id: "AIRLOCK_NORTE",
            type: "airlock",
            pressureLossRisk: false,
          },
          null,
          {
            id: "AIRLOCK_SUL",
            type: "airlock",
            pressureLossRisk: false,
          },
        ],
      },
      { rooms: ["COMANDO", "CORREDOR_PRINCIPAL", "COMUNICACOES"] },
      { rooms: ["OBSERVATORIO", "SALA_OPS", "LAB_PRINCIPAL"] },
      { rooms: ["ALOJAMENTOS_A", "REFEITORIO", "ALOJAMENTOS_B"] },
      { rooms: ["ARMORY", "DEPOSITO", "ENFERMARIA"] },
      { rooms: ["GERADORES", "SALA_CONTROLE", "MANUTENCAO"] },
      { rooms: [null, "NUCLEO_REATOR", null] },
      { rooms: [null, "SUBTERRÂNEO", null] },
    ],
    connections: [
      { from: "HANGAR_PRINCIPAL", to: "AIRLOCK_NORTE", password: "HORUS-TAO" },
      { from: "HANGAR_SECUNDARIO", to: "AIRLOCK_SUL", defaultOpen: true },
      { from: "AIRLOCK_NORTE", to: "CORREDOR_PRINCIPAL" },
      { from: "AIRLOCK_SUL", to: "CORREDOR_PRINCIPAL" },
      { from: "CORREDOR_PRINCIPAL", to: "COMANDO" },
      { from: "CORREDOR_PRINCIPAL", to: "COMUNICACOES" },
      { from: "COMANDO", to: "OBSERVATORIO" },
      { from: "CORREDOR_PRINCIPAL", to: "SALA_OPS" },
      { from: "COMUNICACOES", to: "LAB_PRINCIPAL" },
      { from: "OBSERVATORIO", to: "SALA_OPS" },
      { from: "SALA_OPS", to: "LAB_PRINCIPAL" },
      { from: "OBSERVATORIO", to: "ALOJAMENTOS_A" },
      { from: "SALA_OPS", to: "REFEITORIO" },
      { from: "LAB_PRINCIPAL", to: "ALOJAMENTOS_B" },
      { from: "ALOJAMENTOS_A", to: "REFEITORIO" },
      { from: "REFEITORIO", to: "ALOJAMENTOS_B" },
      { from: "ALOJAMENTOS_A", to: "ARMORY" },
      { from: "REFEITORIO", to: "DEPOSITO" },
      { from: "ALOJAMENTOS_B", to: "ENFERMARIA" },
      { from: "ARMORY", to: "DEPOSITO" },
      { from: "DEPOSITO", to: "ENFERMARIA" },
      { from: "ARMORY", to: "GERADORES" },
      { from: "DEPOSITO", to: "SALA_CONTROLE" },
      { from: "ENFERMARIA", to: "MANUTENCAO" },
      { from: "GERADORES", to: "SALA_CONTROLE" },
      { from: "SALA_CONTROLE", to: "MANUTENCAO" },
      { from: "SALA_CONTROLE", to: "NUCLEO_REATOR", password: "REACTOR-ACCESS" },
      { from: "NUCLEO_REATOR", to: "SUBTERRÂNEO", password: "DEEP-VAULT" },
    ],
    diagnostics: {
      title: "Sistema de Diagnóstico - BASE HORUS // TAO-095",
      messages: [
        { type: "notice", message: "╔═══════════════════════════════════════════════════════════════════╗" },
        { type: "notice", message: "║           SISTEMA DE DIAGNÓSTICO - BASE HORUS v3.6c              ║" },
        { type: "notice", message: "║                    PLANETA TAO-095 // 7 LUAS                      ║" },
        { type: "notice", message: "╚═══════════════════════════════════════════════════════════════════╝" },
        { type: "notice", message: "" },
        {
          type: "check",
          message: ">>> INICIALIZANDO SISTEMAS DA BASE HORUS",
          status: "OK",
          delay: 2000,
        },
        { type: "notice", message: "" },
        { type: "notice", message: "┌─ CANAL DE COMUNICAÇÃO ATIVO ─────────────────────────────────────┐" },
        { type: "notice", message: "│ [DR. HELENA]: Os símbolos na lua THOTH... são hieróglifos       │" },
        { type: "notice", message: "│               egípcios ou algo mais antigo?                      │" },
        { type: "notice", message: "│ [ENG. KLAUS]: Impossível. Datação indica 50 mil anos.            │" },
        { type: "notice", message: "│ [PILOTO AKIRA]: Meu mecha detectou campos eletromagnéticos       │" },
        { type: "notice", message: "│                 anômalos próximo à lua ISIS.                      │" },
        { type: "notice", message: "└──────────────────────────────────────────────────────────────────┘" },
        { type: "notice", message: "" },
        { type: "notice", message: "" },
        { type: "notice", message: "┌─────────────────────────────────────────────────────────────────┐" },
        { type: "notice", message: "│ PLANET: TAO-095                                                 │" },
        { type: "notice", message: "│ FACILITY: HORUS BASE                                            │" },
        { type: "notice", message: "│ OPERATOR: [CLASSIFIED]                                          │" },
        { type: "notice", message: "│ CLEARANCE: LEVEL-7                                              │" },
        { type: "notice", message: "└─────────────────────────────────────────────────────────────────┘" },
        { type: "notice", message: "" },
        {
          type: "check",
          message: ">> Verificando integridade estrutural da base",
          status: "OK",
          delay: 1500,
        },
        {
          type: "notice",
          message: "   └─ Casco pressurizado: 100%",
        },
        {
          type: "notice",
          message: "   └─ Escudos atmosféricos: OPERACIONAIS",
        },
        {
          type: "notice",
          message: "   └─ Sensores sísmicos: ATIVOS",
        },
        { type: "notice", message: "" },
        {
          type: "check",
          message: ">> Checagem do sistema de energia",
          status: "ONLINE",
          delay: 1800,
        },
        {
          type: "notice",
          message: "   └─ Reator de fusão: 94% capacidade",
        },
        {
          type: "notice",
          message: "   └─ Células de backup: 100% carga",
        },
        {
          type: "notice",
          message: `   └─ Consumo atual: ${Math.floor(Math.random() * 15) + 65}% da capacidade total`,
        },
        { type: "notice", message: "" },
        {
          type: "check",
          message: ">> Monitoramento das luas de TAO-095",
          status: "TRACKING",
          delay: 2000,
        },
        {
          type: "notice",
          message: "   ├─ LUA-01 [ANUBIS]: Órbita estável - Período: 8.3 dias",
        },
        {
          type: "notice",
          message: "   ├─ LUA-02 [OSIRIS]: Órbita estável - Período: 12.7 dias",
        },
        {
          type: "notice",
          message: "   ├─ LUA-03 [SETH]: Órbita estável - Período: 18.2 dias",
        },
        {
          type: "notice",
          message: "   ├─ LUA-04 [THOTH]: Órbita estável - Período: 24.9 dias",
        },
        {
          type: "notice",
          message: "   ├─ LUA-05 [RA]: Órbita estável - Período: 31.4 dias",
        },
        {
          type: "notice",
          message: "   ├─ LUA-06 [ISIS]: Órbita estável - Período: 39.8 dias",
        },
        {
          type: "notice",
          message: "   └─ LUA-07 [NEPHTHYS]: Órbita estável - Período: 47.1 dias",
        },
        { type: "notice", message: "" },
        {
          type: "check",
          message: ">> Sistemas de comunicação",
          status: "NOMINAL",
          delay: 1200,
        },
        {
          type: "notice",
          message: "   └─ Uplink orbital: CONECTADO",
        },
        {
          type: "notice",
          message: "   └─ Array de long-range: OPERACIONAL",
        },
        {
          type: "notice",
          message: "   └─ Quantum-comm: SINCRONIZADO",
        },
        { type: "notice", message: "" },
        {
          type: "check",
          message: ">> Sistemas de defesa",
          status: "ARMED",
          delay: 1500,
        },
        {
          type: "warning",
          message: "   ├─ Ponto de defesa #3: Manutenção agendada",
        },
        {
          type: "notice",
          message: "   ├─ Sistema anti-orbital: PRONTO",
        },
        {
          type: "notice",
          message: "   └─ Blindagem eletromagnética: 87% eficiência",
        },
        { type: "notice", message: "" },
        {
          type: "check",
          message: ">> Verificação de tripulação",
          status: "OK",
          delay: 1000,
        },
        {
          type: "notice",
          message: "   └─ Pessoal presente: 47 de 65",
        },
        {
          type: "notice",
          message: "   └─ Equipes ativas: 4",
        },
        {
          type: "notice",
          message: `   └─ Missões em campo: ${Math.floor(Math.random() * 3) + 1}`,
        },
        { type: "notice", message: "" },
        { type: "notice", message: "╔═══════════════════════════════════════════════════════════════════╗" },
        {
          type: "summary",
          message: "║  STATUS: TODOS OS SISTEMAS OPERACIONAIS - BASE HORUS ONLINE       ║",
        },
        { type: "notice", message: "╚═══════════════════════════════════════════════════════════════════╝" },
        { type: "notice", message: "" },
        { type: "notice", message: "// run ./usr/startup/autoconnect.sh" },
        {
          type: "notice",
          message: `// Connecting to ${(Math.random() * 2000 + 1000).toFixed(0)}.${Math.floor(Math.random() * 9000 + 1000)}.${Math.floor(Math.random() * 9000 + 1000)}.1`,
        },
        { type: "notice", message: "" },
        { type: "notice", message: "┌─────────────────────────────────────────────────────────────────┐" },
        { type: "notice", message: "│ PLANET: TAO-095                                                 │" },
        { type: "notice", message: "│ FACILITY: HORUS BASE                                            │" },
        { type: "notice", message: "│ OPERATOR: [CLASSIFIED]                                          │" },
        { type: "notice", message: "│ CLEARANCE: LEVEL-7                                              │" },
        { type: "notice", message: "└─────────────────────────────────────────────────────────────────┘" },
        { type: "notice", message: "" },
        {
          type: "check",
          message: ">> Verificando integridade estrutural da base",
          status: "OK",
          delay: 1500,
        },
        {
          type: "notice",
          message: "   └─ Casco pressurizado: 100%",
        },
        {
          type: "notice",
          message: "   └─ Escudos atmosféricos: OPERACIONAIS",
        },
        {
          type: "notice",
          message: "   └─ Sensores sísmicos: ATIVOS",
        },
        { type: "notice", message: "" },
        {
          type: "check",
          message: ">> Checagem do sistema de energia",
          status: "ONLINE",
          delay: 1800,
        },
        {
          type: "notice",
          message: "   └─ Reator de fusão: 94% capacidade",
        },
        {
          type: "notice",
          message: "   └─ Células de backup: 100% carga",
        },
        {
          type: "notice",
          message: `   └─ Consumo atual: ${Math.floor(Math.random() * 15) + 65}% da capacidade total`,
        },
        { type: "notice", message: "" },
        {
          type: "check",
          message: ">> Monitoramento das luas de TAO-095",
          status: "TRACKING",
          delay: 2000,
        },
        {
          type: "notice",
          message: "   ├─ LUA-01 [ANUBIS]: Órbita estável - Período: 8.3 dias",
        },
        {
          type: "notice",
          message: "   ├─ LUA-02 [OSIRIS]: Órbita estável - Período: 12.7 dias",
        },
        {
          type: "notice",
          message: "   ├─ LUA-03 [SETH]: Órbita estável - Período: 18.2 dias",
        },
        {
          type: "notice",
          message: "   ├─ LUA-04 [THOTH]: Órbita estável - Período: 24.9 dias",
        },
        {
          type: "notice",
          message: "   ├─ LUA-05 [RA]: Órbita estável - Período: 31.4 dias",
        },
        {
          type: "notice",
          message: "   ├─ LUA-06 [ISIS]: Órbita estável - Período: 39.8 dias",
        },
        {
          type: "notice",
          message: "   └─ LUA-07 [NEPHTHYS]: Órbita estável - Período: 47.1 dias",
        },
        { type: "notice", message: "" },
        {
          type: "check",
          message: ">> Sistemas de comunicação",
          status: "NOMINAL",
          delay: 1200,
        },
        {
          type: "notice",
          message: "   └─ Uplink orbital: CONECTADO",
        },
        {
          type: "notice",
          message: "   └─ Array de long-range: OPERACIONAL",
        },
        {
          type: "notice",
          message: "   └─ Quantum-comm: SINCRONIZADO",
        },
        { type: "notice", message: "" },
        {
          type: "check",
          message: ">> Sistemas de defesa",
          status: "ARMED",
          delay: 1500,
        },
        {
          type: "warning",
          message: "   ├─ Ponto de defesa #3: Manutenção agendada",
        },
        {
          type: "notice",
          message: "   ├─ Sistema anti-orbital: PRONTO",
        },
        {
          type: "notice",
          message: "   └─ Blindagem eletromagnética: 87% eficiência",
        },
        { type: "notice", message: "" },
        {
          type: "check",
          message: ">> Verificação de tripulação",
          status: "OK",
          delay: 1000,
        },
        {
          type: "notice",
          message: "   └─ Pessoal presente: 47 de 65",
        },
        {
          type: "notice",
          message: "   └─ Equipes ativas: 4",
        },
        {
          type: "notice",
          message: `   └─ Missões em campo: ${Math.floor(Math.random() * 3) + 1}`,
        },
        { type: "notice", message: "" },
        { type: "notice", message: "╔═══════════════════════════════════════════════════════════════════╗" },
        {
          type: "summary",
          message: "║  STATUS: TODOS OS SISTEMAS OPERACIONAIS - BASE HORUS ONLINE       ║",
        },
        { type: "notice", message: "╚═══════════════════════════════════════════════════════════════════╝" },
        { type: "notice", message: "" },
        { type: "notice", message: "// run ./usr/startup/autoconnect.sh" },
        {
          type: "notice",
          message: `// Connecting to ${(Math.random() * 2000 + 1000).toFixed(0)}.${Math.floor(Math.random() * 9000 + 1000)}.${Math.floor(Math.random() * 9000 + 1000)}.1`,
        },
      ],
    },
  });

  const scenario: Scenario = {
    id: "TAO-095",
    name: "TAO-095 // HORUS",
    type: "planet",
    crew: { current: 47, capacity: 65 },
    adminCredentials: { username: "HORUS-ADMIN", password: "COMP-CON-7" },
    charts: ["oxygen", "temperature", "pressure"],
    stats: {
      planeta: "TAO-095 (Classe-M)",
      diâmetro: "12.742 km",
      gravidade: "1.02 g",
      atmosfera: "Respirável (N2/O2)",
      luas: "7 satélites naturais",
      pressão: "1.01 bar",
    },
    exteriorStats: [
      {
        type: "surfaceTemp",
        label: "TEMPERATURA SUPERFÍCIE",
        unit: "°C",
        defaultValue: Array(30).fill(22),
        min: 18,
        max: 28,
        isArray: true,
      },
      {
        type: "atmosphericAnalysis",
        label: "COMPOSIÇÃO ATM.",
        unit: "%",
        defaultValue: 78,
      },
      {
        type: "radiationLevel",
        label: "RADIAÇÃO SOLAR",
        unit: "mSv/h",
        defaultValue: Array(30).fill(0.3),
        min: 0.2,
        max: 0.5,
        isArray: true,
      },
      {
        type: "windSpeed",
        label: "VELOCIDADE VENTO",
        unit: "km/h",
        defaultValue: Array(30).fill(15),
        min: 5,
        max: 35,
        isArray: true,
      },
      {
        type: "humidity",
        label: "UMIDADE",
        unit: "%",
        defaultValue: Array(30).fill(62),
        min: 45,
        max: 75,
        isArray: true,
      },
      {
        type: "rotationSpeed",
        label: "LUAS RASTREADAS",
        unit: "sat",
        defaultValue: 7,
      },
    ],
    map: baseMap,
    systemLogs: [
      { time: "09.12.9000 08:15", message: "Base HORUS - Inicialização de turno concluída" },
      { time: "09.12.9000 12:44", message: "LUA-05 [RA] - Alinhamento orbital detectado" },
      { time: "10.12.9000 03:22", message: `BACKUP horus_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.dat CONCLUÍDO` },
      { time: "10.12.9000 14:17", message: "Equipe de reconhecimento retornou - setor norte" },
      { time: "11.12.9000 07:38", message: `ARQUIVO orbital_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}.log CRIADO` },
      { time: "11.12.9000 19:55", message: "Manutenção preventiva - ponto de defesa #3" },
      { time: "12.12.9000 06:11", message: "Tempestade magnética detectada - sistemas compensando" },
      { time: "13.12.9000 04:29", message: "Uplink com satélite orbital restabelecido" },
    ],
    controlButtons: [
      {
        label: "ESCUDOS BASE",
        defaultState: true,
        restricted: true,
        type: "toggle",
        linkedRoom: "SALA_CONTROLE",
      },
      {
        label: "SENSORES ORBITAIS",
        defaultState: true,
        restricted: false,
        type: "toggle",
        linkedRoom: "OBSERVATORIO",
      },
      {
        label: "DEFESAS ATIVAS",
        defaultState: true,
        restricted: true,
        type: "toggle",
        toggleStates: {
          true: "ARMADO",
          false: "DESARMADO",
        },
        linkedRoom: "ARMORY",
      },
      {
        label: "HANGAR PRINCIPAL",
        defaultState: false,
        restricted: true,
        type: "toggle",
        toggleStates: {
          true: "DESTRANCADO",
          false: "TRANCADO",
        },
        linkedRoom: "HANGAR_PRINCIPAL",
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
    theme: "horus",
  };

  return scenario;
};
